import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { CANADA_PREFIX, UK_PREFIX, US_PREFIX, LOCALE_PREFIXES, UK_EU_COUNTRY_CODES } from '@/src/utils/locale';
import { getCloudflareCountry, resolveClientIp } from '@/src/utils/clientIp';

const CANADA_CODE = 'CA';
const US_CODE = 'US';

async function fetchCountryFromLocalApi(ip: string, request: NextRequest): Promise<string | null> {
  try {
    const url = new URL('/api/geo', request.url);
    if (ip) {
      url.searchParams.set('ip', ip);
    }
    
    const response = await fetch(url.toString(), {
      headers: {
        'x-forwarded-for': ip || '',
        'x-real-ip': ip || '',
      },
      cache: 'no-store' // Don't cache in middleware
    });

    if (!response.ok) {
      console.warn('[Middleware] Local geo API not ok:', response.status);
      return null;
    }

    const data = await response.json();
    return data?.countryCode || null;
  } catch (error) {
    console.error('[Middleware] Failed to fetch country from local API:', error);
    return null;
  }
}

/**
 * Search engine / crawler user agents. These must NEVER receive the geo
 * redirect below — a crawler that gets 307'd from "/" to "/en-gb" or
 * "/en-ca" will index the redirect target as the canonical page, which is
 * exactly how Google ended up serving /en-gb for searches that should land
 * on the plain homepage. Real visitors still get geo-routed; crawlers always
 * see and index the URL they actually requested.
 */
const CRAWLER_USER_AGENTS = [
  'googlebot', 'google-inspectiontool', 'adsbot-google', 'mediapartners-google',
  'bingbot', 'yandex', 'baiduspider', 'duckduckbot', 'applebot',
  'facebookexternalhit', 'twitterbot', 'linkedinbot', 'slackbot', 'discordbot',
  'whatsapp', 'telegrambot', 'pinterest', 'redditbot',
  'ahrefsbot', 'semrushbot', 'mj12bot', 'dotbot',
  'gptbot', 'chatgpt-user', 'claudebot', 'perplexitybot', 'ccbot',
];

function isCrawler(request: NextRequest): boolean {
  const ua = (request.headers.get('user-agent') || '').toLowerCase();
  if (!ua) return false;
  return CRAWLER_USER_AGENTS.some((token) => ua.includes(token));
}

/**
 * Resolves the visitor's country, or `null` when it cannot be determined.
 *
 * Order matters:
 *  1. `cf-ipcountry` — Cloudflare geolocates the real TCP peer at its edge,
 *     before any proxy hop can obscure it. Free, instant, and correct.
 *  2. A MaxMind lookup via `/api/geo`, but ONLY for an IP that survived the
 *     `resolveClientIp` trust filter. Middleware runs on the Edge runtime and
 *     cannot read the .mmdb file itself, hence the subrequest.
 *
 * There is deliberately NO `Accept-Language` fallback. Language is not
 * location: Android and Chrome in India very commonly send
 * `Accept-Language: en-GB`, and the previous fallback turned that straight
 * into a `/en-gb` redirect. An unknown country must leave the visitor on `/`.
 */
async function resolveCountry(request: NextRequest): Promise<string | null> {
  const cfCountry = getCloudflareCountry(request.headers);
  if (cfCountry) {
    return cfCountry;
  }

  const ip = resolveClientIp(request.headers);
  if (!ip) {
    return null;
  }

  return fetchCountryFromLocalApi(ip, request);
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Add noindex header for Next.js image optimization routes (crawlable but not indexable)
  if (pathname.startsWith('/_next/image')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }
  
  // Skip middleware for API routes, static files, and other _next routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Never geo-redirect crawlers — a search engine that gets bounced to
  // /en-gb or /en-ca will index that URL instead of the page it actually
  // asked for. Let bots see and index exactly the URL they requested.
  if (isCrawler(request)) {
    return NextResponse.next();
  }

  // If already inside a locale tree (/en-ca, /en-gb), allow it
  if (LOCALE_PREFIXES.some(prefix => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return NextResponse.next();
  }

  // Only check for redirect on root path
  if (pathname === '/') {
    // Always do a fresh lookup — no in-memory cache. The cache Map was
    // per-server-instance and not shared, so the same visitor could get a
    // different answer depending on which instance handled their request.
    const countryCode = await resolveCountry(request);

    // Fail safe: an unknown or unmatched country (anything not US/CA/GB/EU —
    // e.g. India, Australia) stays on `/`. `/` is the canonical indexed URL
    // and content is identical to /en-us, so leaving someone there is always
    // harmless — whereas guessing wrong strands an Indian visitor on the UK
    // pricing page.
    if (countryCode === CANADA_CODE) {
      return localeRedirect(request, CANADA_PREFIX, countryCode);
    }

    if (countryCode && UK_EU_COUNTRY_CODES.has(countryCode)) {
      return localeRedirect(request, UK_PREFIX, countryCode);
    }

    if (countryCode === US_CODE) {
      return localeRedirect(request, US_PREFIX, countryCode);
    }
  }

  return NextResponse.next();
}

/**
 * Builds the geo redirect with caching disabled.
 *
 * `/` is served from the Vercel/Cloudflare edge cache (`x-vercel-cache: HIT`),
 * and a redirect whose target depends on the visitor's country must never be
 * stored in a shared cache — one UK visitor's 307 would otherwise be replayed
 * to everyone who follows.
 */
function localeRedirect(request: NextRequest, prefix: string, countryCode: string) {
  const url = request.nextUrl.clone();
  url.pathname = prefix;
  console.log(`[Middleware] Redirecting to ${prefix} for ${countryCode} visitor`);

  const response = NextResponse.redirect(url);
  response.headers.set('Cache-Control', 'private, no-store, max-age=0, must-revalidate');
  response.headers.set('CDN-Cache-Control', 'no-store');
  response.headers.set('Vary', 'CF-IPCountry');
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * Note: _next/image is included to add noindex headers
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
};

