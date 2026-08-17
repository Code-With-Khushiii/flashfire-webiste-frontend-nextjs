/**
 * Trusted client-IP and country resolution.
 *
 * This module is Edge-runtime safe (no `fs`, no Node built-ins) so both
 * `middleware.ts` and the Node-side `geoip.ts` can share it.
 *
 * ## Why this exists
 *
 * The site runs behind Cloudflare, which proxies to Vercel. Vercel REPLACES
 * `x-forwarded-for` with its own connecting peer — and that peer is a
 * Cloudflare edge server, not the visitor. So `x-forwarded-for` at the origin
 * looks like `172.71.102.248` or `104.23.170.33`, which GeoLite2 resolves to
 * whatever country that particular Cloudflare POP is registered in (observed:
 * NL, SG, US, GB — it varies per request because Cloudflare's egress is
 * anycast). `NL` and `GB` are both in `UK_EU_COUNTRY_CODES`, which is why
 * visitors in India were being redirected to `/en-gb` at random.
 *
 * The fix has two parts:
 *   1. Prefer `cf-ipcountry` — Cloudflare's own geolocation of the real
 *      visitor, added to every proxied origin request. No lookup, no latency,
 *      and it cannot be confused by the proxy hop.
 *   2. When falling back to an IP lookup, REJECT addresses that belong to
 *      Cloudflare or to private/reserved ranges. Those are infrastructure
 *      hops, never a visitor, and geolocating them produces exactly the bug
 *      above.
 *
 * Anything we cannot positively attribute returns `null`, and a `null`
 * country must never trigger a redirect — see `middleware.ts`.
 */

/** Official Cloudflare IPv4 egress ranges — https://www.cloudflare.com/ips-v4 */
const CLOUDFLARE_IPV4_CIDRS = [
  '173.245.48.0/20',
  '103.21.244.0/22',
  '103.22.200.0/22',
  '103.31.4.0/22',
  '141.101.64.0/18',
  '108.162.192.0/18',
  '190.93.240.0/20',
  '188.114.96.0/20',
  '197.234.240.0/22',
  '198.41.128.0/17',
  '162.158.0.0/15',
  '104.16.0.0/13',
  '104.24.0.0/14',
  '172.64.0.0/13',
  '131.0.72.0/22',
];

/** Official Cloudflare IPv6 ranges — https://www.cloudflare.com/ips-v6 */
const CLOUDFLARE_IPV6_PREFIXES = [
  '2400:cb00:',
  '2606:4700:',
  '2803:f800:',
  '2405:b500:',
  '2405:8100:',
  '2a06:98c0:',
  '2c0f:f248:',
];

/** RFC1918 + loopback + link-local + CGNAT. Never a real visitor. */
const PRIVATE_IPV4_CIDRS = [
  '10.0.0.0/8',
  '172.16.0.0/12',
  '192.168.0.0/16',
  '127.0.0.0/8',
  '169.254.0.0/16',
  '100.64.0.0/10',
  '0.0.0.0/8',
];

function ipv4ToInt(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length !== 4) return null;
  let value = 0;
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    value = value * 256 + octet;
  }
  return value;
}

function ipv4InCidr(ip: string, cidr: string): boolean {
  const [range, bitsRaw] = cidr.split('/');
  const bits = Number(bitsRaw);
  if (!Number.isInteger(bits) || bits < 0 || bits > 32) return false;
  const ipInt = ipv4ToInt(ip);
  const rangeInt = ipv4ToInt(range);
  if (ipInt === null || rangeInt === null) return false;
  if (bits === 0) return true;
  // `>>> 0` keeps the mask unsigned; a plain `<<` would go negative at /1.
  const mask = (-1 << (32 - bits)) >>> 0;
  return ((ipInt & mask) >>> 0) === ((rangeInt & mask) >>> 0);
}

/** Strips an IPv6-mapped IPv4 prefix and any `[...]`/port decoration. */
export function normalizeIp(raw: string): string {
  let ip = raw.trim();
  if (ip.startsWith('[')) {
    const close = ip.indexOf(']');
    ip = close === -1 ? ip.slice(1) : ip.slice(1, close);
  }
  if (ip.toLowerCase().startsWith('::ffff:')) {
    ip = ip.slice(7);
  }
  // `1.2.3.4:5678` — only strip a port when it is unambiguously IPv4:port.
  const ipv4WithPort = /^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/.exec(ip);
  if (ipv4WithPort) {
    ip = ipv4WithPort[1];
  }
  return ip;
}

export function isCloudflareIp(ip: string): boolean {
  const normalized = normalizeIp(ip).toLowerCase();
  if (normalized.includes(':')) {
    return CLOUDFLARE_IPV6_PREFIXES.some((prefix) => normalized.startsWith(prefix));
  }
  return CLOUDFLARE_IPV4_CIDRS.some((cidr) => ipv4InCidr(normalized, cidr));
}

export function isPrivateIp(ip: string): boolean {
  const normalized = normalizeIp(ip).toLowerCase();
  if (normalized === '::1' || normalized === 'localhost') return true;
  if (normalized.includes(':')) {
    // fc00::/7 (unique local) and fe80::/10 (link local)
    return /^f[cd]/.test(normalized) || /^fe[89ab]/.test(normalized);
  }
  return PRIVATE_IPV4_CIDRS.some((cidr) => ipv4InCidr(normalized, cidr));
}

/**
 * True when `ip` could plausibly be a real visitor — i.e. it is a routable
 * public address that is not one of our own proxy hops.
 */
export function isUsableClientIp(ip: string | null | undefined): ip is string {
  if (!ip) return false;
  const normalized = normalizeIp(ip);
  if (!normalized) return false;
  return !isPrivateIp(normalized) && !isCloudflareIp(normalized);
}

type HeaderSource = Headers | { get(name: string): string | null };

/**
 * Resolves the visitor's IP from proxy headers, in descending order of trust.
 *
 * `cf-connecting-ip` and `true-client-ip` are written by Cloudflare's edge
 * from the actual TCP connection and cannot be spoofed by the client (the
 * edge overwrites whatever the client sent). `x-forwarded-for` is checked
 * last and only if it yields a usable address, because on this deployment it
 * is rewritten by Vercel to the Cloudflare edge IP.
 */
export function resolveClientIp(headers: HeaderSource): string | null {
  const cfIp = headers.get('cf-connecting-ip');
  if (isUsableClientIp(cfIp)) return normalizeIp(cfIp);

  const trueClientIp = headers.get('true-client-ip');
  if (isUsableClientIp(trueClientIp)) return normalizeIp(trueClientIp);

  // Walk x-forwarded-for left to right: the leftmost entry is the original
  // client, and later entries are proxies. Skip anything that is one of our
  // own hops so a Cloudflare/Vercel address is never mistaken for a visitor.
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    for (const candidate of forwarded.split(',')) {
      if (isUsableClientIp(candidate)) return normalizeIp(candidate);
    }
  }

  const realIp = headers.get('x-real-ip');
  if (isUsableClientIp(realIp)) return normalizeIp(realIp);

  return null;
}

/** ISO-3166-1 alpha-2, or the sentinel values Cloudflare uses for "unknown". */
function sanitizeCountryCode(value: string | null | undefined): string | null {
  if (!value) return null;
  const code = value.trim().toUpperCase();
  // `XX` = could not determine, `T1` = Tor exit node.
  if (code === 'XX' || code === 'T1' || code.length !== 2) return null;
  if (!/^[A-Z]{2}$/.test(code)) return null;
  return code;
}

/**
 * Cloudflare's own geolocation of the visitor, when available.
 *
 * This is the authoritative signal on this deployment. Note that
 * `x-vercel-ip-country` is deliberately NOT consulted: Vercel derives it from
 * its connecting peer, which is the Cloudflare edge, so it carries the same
 * wrong answer that caused the original bug.
 */
export function getCloudflareCountry(headers: HeaderSource): string | null {
  return sanitizeCountryCode(headers.get('cf-ipcountry'));
}
