import { NextRequest, NextResponse } from 'next/server';
import { getClientIp, detectCountryFromIp, initGeoIp } from '@/src/utils/geoip';
import { getCloudflareCountry } from '@/src/utils/clientIp';

let initialized = false;

export async function GET(request: NextRequest) {
  try {
    if (!initialized) {
      await initGeoIp();
      initialized = true;
    }

    const queryIp = request.nextUrl.searchParams.get('ip');
    const debugIp = request.nextUrl.searchParams.get('debugIp');

    // Cloudflare's edge geolocation wins when the caller did not pin a
    // specific IP. It reflects the real visitor, whereas any IP we can read
    // at the origin may be a proxy hop.
    if (!debugIp && !queryIp) {
      const cfCountry = getCloudflareCountry(request.headers);
      if (cfCountry) {
        return jsonNoStore({
          success: true,
          countryCode: cfCountry,
          country: cfCountry,
          detectionMethod: 'cf-ipcountry',
          diagnostics: diagnostics(request),
        });
      }
    }

    const ip = debugIp || queryIp || getClientIp(request.headers);
    const geo = detectCountryFromIp(ip);

    if (!geo) {
      // Unknown is a real, distinct answer — callers must not treat it as US
      // and must not redirect on it.
      return jsonNoStore({
        success: true,
        countryCode: null,
        country: null,
        ip: ip || undefined,
        detectionMethod: 'unknown',
        diagnostics: diagnostics(request),
      });
    }

    return jsonNoStore({
      success: true,
      countryCode: geo.countryCode,
      country: geo.country,
      ip: ip || undefined,
      detectionMethod: 'ip-geolocation',
      diagnostics: diagnostics(request),
    });
  } catch (error: unknown) {
    console.error('[GeoAPI] Geo detection error:', error);
    return jsonNoStore({
      success: false,
      countryCode: null,
      country: null,
      detectionMethod: 'error',
    });
  }
}

/**
 * Which proxy headers actually reached the origin. This is what proves
 * whether Cloudflare's visitor headers are getting through — without it the
 * only way to diagnose a bad redirect is to guess at the deployment topology.
 * Contains no secrets: these are all request-routing headers.
 */
function diagnostics(request: NextRequest) {
  const h = request.headers;
  return {
    cfIpCountry: h.get('cf-ipcountry'),
    cfConnectingIp: h.get('cf-connecting-ip'),
    trueClientIp: h.get('true-client-ip'),
    xForwardedFor: h.get('x-forwarded-for'),
    xRealIp: h.get('x-real-ip'),
    xVercelIpCountry: h.get('x-vercel-ip-country'),
  };
}

/** Geo answers are per-visitor and must never be stored in a shared cache. */
function jsonNoStore(body: unknown) {
  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
      'CDN-Cache-Control': 'no-store',
    },
  });
}
