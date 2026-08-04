import { Reader } from '@maxmind/geoip2-node';
import fs from 'fs';
import path from 'path';
import { isCloudflareIp, isPrivateIp, normalizeIp, resolveClientIp } from './clientIp';

// Type assertion for Reader with country method
type GeoIPReader = Reader & {
  country: (ip: string) => {
    country?: {
      isoCode?: string;
      names?: {
        en?: string;
      };
    };
  } | null;
};

let geoReader: GeoIPReader | null = null;

function resolveDatabasePath(): string | null {
  const candidates: string[] = [];

  if (process.env.GEOIP_DB_PATH) {
    candidates.push(process.env.GEOIP_DB_PATH);
  }

  candidates.push(path.resolve(process.cwd(), 'lib', 'GeoLite2-Country.mmdb'));
  
  // Check in root
  candidates.push(path.resolve(process.cwd(), 'GeoLite2-Country.mmdb'));
  
  // Check in public folder (fallback)
  candidates.push(path.resolve(process.cwd(), 'public', 'GeoLite2-Country.mmdb'));
  
  // Check in Utils folder (if copied)
  candidates.push(path.resolve(process.cwd(), 'Utils', 'GeoLite2-Country.mmdb'));
  
  // Check backend Utils folder (fallback for development)
  candidates.push(path.resolve(process.cwd(), '..', 'flashfire-backend', 'Utils', 'GeoLite2-Country.mmdb'));

  for (const p of candidates) {
    try {
      if (p && fs.existsSync(p)) {
        return p;
      }
    } catch {
      // ignore
    }
  }

  return null;
}

export async function initGeoIp(): Promise<void> {
  try {
    const dbPath = resolveDatabasePath();
    if (!dbPath) {
      console.warn('[GeoIP] Database not found. Set GEOIP_DB_PATH or place GeoLite2-Country.mmdb in public folder. Falling back to default.');
      return;
    }
    const buffer = fs.readFileSync(dbPath);
    geoReader = (await Reader.openBuffer(buffer)) as GeoIPReader;
    console.log(`✅ [GeoIP] Database loaded from: ${dbPath}`);
  } catch (error) {
    console.error('❌ [GeoIP] Failed to load database:', error instanceof Error ? error.message : error);
  }
}

/**
 * Re-exported from the Edge-safe module so middleware and API routes resolve
 * the client IP identically. Reading `x-forwarded-for` first — as this
 * function used to — geolocated Cloudflare's own edge IP on this deployment
 * (Cloudflare in front of Vercel, which rewrites `x-forwarded-for` to its
 * connecting peer), producing random NL/SG/GB answers for real visitors.
 */
export function getClientIp(headers: Headers): string | null {
  return resolveClientIp(headers);
}

/**
 * Looks up a country for `ip`.
 *
 * Returns `null` when the country genuinely cannot be determined. The old
 * behaviour of defaulting to `US` was hiding failures: a caller could not
 * tell "this visitor really is in the US" apart from "the lookup failed", and
 * the caller in `middleware.ts` needs that distinction to decide whether a
 * redirect is safe.
 */
export function detectCountryFromIp(
  ip: string | null
): { countryCode: string; country: string } | null {
  if (!ip) {
    console.warn('[GeoIP] No usable client IP on request');
    return null;
  }

  const normalizedIp = normalizeIp(ip);

  if (isCloudflareIp(normalizedIp)) {
    // Never geolocate our own proxy — this is the exact bug that sent Indian
    // visitors to /en-gb.
    console.warn(`[GeoIP] Refusing to geolocate Cloudflare edge IP ${normalizedIp}`);
    return null;
  }

  if (isPrivateIp(normalizedIp)) {
    return { countryCode: 'US', country: 'United States (Local)' };
  }

  if (!geoReader) {
    console.warn('[GeoIP] Database not loaded; cannot resolve country');
    return null;
  }

  try {
    const lookup = geoReader.country(normalizedIp);
    const isoCode = lookup?.country?.isoCode;
    if (!isoCode) {
      console.warn(`[GeoIP] No country in database for ${normalizedIp}`);
      return null;
    }
    const result = {
      countryCode: isoCode,
      country: lookup?.country?.names?.en || isoCode,
    };
    console.log(`[GeoIP] Lookup for ${normalizedIp}: ${result.countryCode}`);
    return result;
  } catch (e) {
    console.warn('[GeoIP] Lookup error:', normalizedIp, e instanceof Error ? e.message : e);
    return null;
  }
}

// Initialize on module load (for API routes)
if (typeof window === 'undefined') {
  initGeoIp().catch(console.error);
}

