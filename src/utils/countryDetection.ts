import { apiUrl } from './apiBase';
import { UK_EU_COUNTRY_CODES } from './locale';

const STORAGE_KEY = 'ff_country_code_v1';
const CANADA_CODE = 'CA';

export function getCachedCountryCode(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v;
  } catch {
    return null;
  }
}

export function cacheCountryCode(code: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // ignore storage errors
  }
}

export async function fetchCountryCode(): Promise<string | null> {
  try {
    const res = await fetch(apiUrl('/api/geo'), {
      headers: { 'ngrok-skip-browser-warning': 'true' }
    });
    if (!res.ok) {
      console.warn('[CountryDetection] Backend response not ok:', res.status);
      return null;
    }
    const data = await res.json();
    return (data?.countryCode as string) || null;
  } catch (e) {
    console.error('[CountryDetection] Fetch failed:', e);
    return null;
  }
}

export function detectCountryFallback(): string {
  if (typeof window === 'undefined') return 'US';
  
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || navigator.languages?.[0] || '';
    
    // Check timezone for Canada
    const canadaTimezones = [
      'America/Toronto', 'America/Vancouver', 'America/Montreal',
      'America/Edmonton', 'America/Winnipeg', 'America/Halifax',
      'America/St_Johns', 'America/Regina', 'America/Yellowknife',
      'America/Goose_Bay', 'America/Glace_Bay', 'America/Moncton',
      'America/Nipigon', 'America/Thunder_Bay', 'America/Atikokan',
      'America/Rainy_River', 'America/Cambridge_Bay', 'America/Creston',
      'America/Dawson', 'America/Dawson_Creek', 'America/Fort_Nelson',
      'America/Inuvik', 'America/Whitehorse'
    ];
    
    if (canadaTimezones.some(tz => timezone.includes(tz))) {
      return 'CA';
    }

    // Check language for Canada (French Canadian)
    if (language.startsWith('fr-CA')) {
      return 'CA';
    }

    // Check timezone for the UK / EU. Europe/* covers every member state, so
    // exclude the handful of non-EU Europe/* zones rather than listing all 27.
    if (timezone.startsWith('Europe/') && !NON_EU_EUROPE_TIMEZONES.has(timezone)) {
      return 'GB';
    }

    // Check language for the UK / EU
    if (UK_EU_LANGUAGE_TAGS.some(tag => language.startsWith(tag))) {
      return 'GB';
    }

    return 'US';
  } catch {
    return 'US';
  }
}

/** Europe/* zones that are NOT in the UK or the EU, so they keep the US site. */
const NON_EU_EUROPE_TIMEZONES = new Set([
  'Europe/Moscow', 'Europe/Kaliningrad', 'Europe/Samara', 'Europe/Volgograd',
  'Europe/Saratov', 'Europe/Ulyanovsk', 'Europe/Astrakhan', 'Europe/Kirov',
  'Europe/Kyiv', 'Europe/Kiev', 'Europe/Uzhgorod', 'Europe/Zaporozhye',
  'Europe/Minsk', 'Europe/Istanbul', 'Europe/Zurich', 'Europe/Oslo',
  'Europe/Reykjavik', 'Europe/Vaduz', 'Europe/Belgrade', 'Europe/Sarajevo',
  'Europe/Skopje', 'Europe/Podgorica', 'Europe/Tirane', 'Europe/Chisinau',
  'Europe/Gibraltar', 'Europe/Guernsey', 'Europe/Jersey', 'Europe/Isle_of_Man',
  'Europe/Andorra', 'Europe/Monaco', 'Europe/San_Marino', 'Europe/Vatican',
  'Europe/Busingen', 'Europe/Mariehamn',
]);

/** Language tags that imply a UK or EU visitor. */
const UK_EU_LANGUAGE_TAGS = [
  'en-GB', 'en-IE',
  'de-DE', 'de-AT', 'fr-FR', 'fr-BE', 'fr-LU', 'nl-NL', 'nl-BE', 'it-IT',
  'es-ES', 'pt-PT', 'pl-PL', 'sv-SE', 'da-DK', 'fi-FI', 'el-GR', 'cs-CZ',
  'sk-SK', 'hu-HU', 'ro-RO', 'bg-BG', 'hr-HR', 'sl-SI', 'et-EE', 'lv-LV',
  'lt-LT', 'mt-MT', 'ga-IE',
];

export function shouldRedirectToCanada(pathname: string, countryCode: string | null): boolean {
  if (countryCode === CANADA_CODE && pathname === '/') {
    return true;
  }
  return false;
}

export function shouldRedirectToUK(pathname: string, countryCode: string | null): boolean {
  if (countryCode && pathname === '/' && UK_EU_COUNTRY_CODES.has(countryCode)) {
    return true;
  }
  return false;
}

