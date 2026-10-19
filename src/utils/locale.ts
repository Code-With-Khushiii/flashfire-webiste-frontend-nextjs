/**
 * Locale routing helpers.
 *
 * `/` serves the default (US) content and stays the canonical, indexed URL —
 * it's what crawlers always see (middleware never geo-redirects bots) and
 * what any visitor whose country can't be determined lands on. `/en-us` is
 * an explicit mirror of the exact same content (every page re-exports its
 * root counterpart) for parity with `/en-ca`, `/en-gb`, `/en-au` and the EU trees, and real
 * US visitors ARE redirected there by the middleware, same as CA, UK/EU and
 * AU visitors get sent to their trees. Its pages still canonicalize back to the
 * root URL, so it never competes with `/` for search ranking even though it
 * now carries real traffic. Everything that needs to build a country-aware
 * link or pick country-specific content should go through here rather than
 * hard-coding `"/en-ca"` checks, so adding a locale stays a one-line change.
 */

export type Locale = "us" | "ca" | "uk" | "au" | "eu";

export const US_PREFIX = "/en-us";
export const CANADA_PREFIX = "/en-ca";
export const UK_PREFIX = "/en-gb";
export const AU_PREFIX = "/en-au";
export const IRELAND_PREFIX = "/en-ie";
export const GERMANY_PREFIX = "/en-de";
export const NETHERLANDS_PREFIX = "/en-nl";
export const FRANCE_PREFIX = "/en-fr";
/**
 * Pan-European tree for links and ads that say "Europe" rather than a country.
 * Same content and EUR pricing as the country trees, but it sits outside the
 * hreflang cluster ("en-EU" is not a valid region) and its pages canonicalize
 * to the matching `/en-ie` page.
 */
export const EUROPE_PREFIX = "/en-eu";

/**
 * "EU" is not a valid hreflang region, so the Europe content is served from one
 * tree per country. They share the same EU content and EUR pricing.
 * `EU_PREFIX` is the default for EU countries without a tree of their own.
 */
export const EU_PREFIXES = [IRELAND_PREFIX, GERMANY_PREFIX, NETHERLANDS_PREFIX, FRANCE_PREFIX, EUROPE_PREFIX] as const;
export const EU_PREFIX = IRELAND_PREFIX;

/**
 * Every non-default locale prefix. Matching is on segment boundaries (see
 * getLocalePrefix), so order does not matter: `/en-ca` never matches `/en-cash`.
 */
export const LOCALE_PREFIXES = [CANADA_PREFIX, UK_PREFIX, AU_PREFIX, ...EU_PREFIXES, US_PREFIX] as const;

export type LocalePrefix = (typeof LOCALE_PREFIXES)[number] | "";

/** Country codes served the UK tree (`/en-gb`). */
export const UK_COUNTRY_CODES = new Set(["GB"]);

/** Country codes served the Europe trees (`/en-ie`, `/en-de`, `/en-nl`, `/en-fr`): the EU member states other than GB. */
export const EU_COUNTRY_CODES = new Set([
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

/** GB + the EU member states: every country that used to be served the UK tree. */
export const UK_EU_COUNTRY_CODES = new Set([...UK_COUNTRY_CODES, ...EU_COUNTRY_CODES]);

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
  if (prefix === AU_PREFIX) return "au";
  if ((EU_PREFIXES as readonly string[]).includes(prefix)) return "eu";
  return "us";
}

/**
 * The tree a path belongs to as a tag, e.g. "en-de" or "en-eu"; "en-us" for
 * the root tree. Analytics use this so each EU tree reports separately even
 * though they all share the "eu" content and pricing locale.
 */
export function getLocaleTag(pathname: string | null | undefined): string {
  const prefix = getLocalePrefix(pathname);
  return prefix ? prefix.slice(1) : "en-us";
}

/** Country each tree serves. The pan-European /en-eu tree has no single country. */
const COUNTRY_BY_PREFIX: Record<Exclude<LocalePrefix, "">, string> = {
  [US_PREFIX]: "US",
  [CANADA_PREFIX]: "CA",
  [UK_PREFIX]: "GB",
  [AU_PREFIX]: "AU",
  [IRELAND_PREFIX]: "IE",
  [GERMANY_PREFIX]: "DE",
  [NETHERLANDS_PREFIX]: "NL",
  [FRANCE_PREFIX]: "FR",
  [EUROPE_PREFIX]: "EU",
};

/** Fallback country code for a path when the visitor's real country is unknown. */
export function getLocaleCountryCode(pathname: string | null | undefined): string {
  const prefix = getLocalePrefix(pathname);
  return prefix ? COUNTRY_BY_PREFIX[prefix] : "US";
}

export function isCanadaPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === CANADA_PREFIX;
}

export function isUKPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === UK_PREFIX;
}

export function isAUPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === AU_PREFIX;
}

export function isEUPath(pathname: string | null | undefined): boolean {
  return (EU_PREFIXES as readonly string[]).includes(getLocalePrefix(pathname));
}

export function isUSPath(pathname: string | null | undefined): boolean {
  return getLocalePrefix(pathname) === US_PREFIX;
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
