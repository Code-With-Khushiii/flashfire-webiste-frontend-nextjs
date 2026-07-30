/**
 * Locale routing helpers.
 *
 * The site serves a default (US) tree at `/` and country trees under a locale
 * prefix: `/en-ca` for Canada and `/en-gb` for the United Kingdom & the EU.
 * Everything that needs to build a country-aware link or pick country-specific
 * content should go through here rather than hard-coding `"/en-ca"` checks, so
 * adding a locale stays a one-line change.
 */

export type Locale = "us" | "ca" | "uk";

export const CANADA_PREFIX = "/en-ca";
export const UK_PREFIX = "/en-gb";

/** Every non-default locale prefix, longest-first so matching is unambiguous. */
export const LOCALE_PREFIXES = [CANADA_PREFIX, UK_PREFIX] as const;

export type LocalePrefix = (typeof LOCALE_PREFIXES)[number] | "";

/** Country codes that should be served the UK tree: GB + the 27 EU member states. */
export const UK_EU_COUNTRY_CODES = new Set([
  "GB", // United Kingdom
  "AT", // Austria
  "BE", // Belgium
  "BG", // Bulgaria
  "HR", // Croatia
  "CY", // Cyprus
  "CZ", // Czechia
  "DK", // Denmark
  "EE", // Estonia
  "FI", // Finland
  "FR", // France
  "DE", // Germany
  "GR", // Greece
  "HU", // Hungary
  "IE", // Ireland
  "IT", // Italy
  "LV", // Latvia
  "LT", // Lithuania
  "LU", // Luxembourg
  "MT", // Malta
  "NL", // Netherlands
  "PL", // Poland
  "PT", // Portugal
  "RO", // Romania
  "SK", // Slovakia
  "SI", // Slovenia
  "ES", // Spain
  "SE", // Sweden
]);

/**
 * Returns the locale prefix a path is served under, or `""` for the default
 * (US) tree. Matches on segment boundaries so `/en-cash` is not treated as
 * `/en-ca`.
 */
export function getLocalePrefix(pathname: string | null | undefined): LocalePrefix {
  if (!pathname) return "";
  for (const prefix of LOCALE_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return prefix;
    }
  }
  return "";
}

export function getLocale(pathname: string | null | undefined): Locale {
  const prefix = getLocalePrefix(pathname);
  if (prefix === CANADA_PREFIX) return "ca";
  if (prefix === UK_PREFIX) return "uk";
  return "us";
}

export function isCanadaPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === CANADA_PREFIX;
}

export function isUKPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === UK_PREFIX;
}

/** True for any non-default locale tree. */
export function isLocalizedPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) !== "";
}

/** Strips a leading locale prefix, so `/en-gb/pricing` becomes `/pricing`. */
export function stripLocalePrefix(pathname: string | null | undefined): string {
  if (!pathname) return "/";
  const prefix = getLocalePrefix(pathname);
  if (!prefix) return pathname;
  const rest = pathname.slice(prefix.length);
  return rest === "" ? "/" : rest;
}

/**
 * Rewrites an internal href into the locale tree the user is currently in.
 * External links and already-prefixed paths are returned untouched.
 */
export function localizeHref(href: string, pathname: string | null | undefined): string {
  if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return href;
  }
  const prefix = getLocalePrefix(pathname);
  if (!prefix) return href;
  if (getLocalePrefix(href)) return href;
  return `${prefix}${href}`;
}

/** True when the path is the home page of whichever tree it belongs to. */
export function isLocaleHome(pathname: string | null | undefined): boolean {
  if (!pathname) return false;
  const prefix = getLocalePrefix(pathname);
  return pathname === "/" || pathname === prefix || pathname === `${prefix}/`;
}
