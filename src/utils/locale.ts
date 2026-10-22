/**
 * Locale routing helpers.
 *
 * `/` serves the default (US) content and is the only US URL: it is the
 * canonical, indexed page and the x-default. There is no `/en-us` tree;
 * `next.config.ts` 308s `/en-us/*` to `/*`. CA, UK and AU visitors are
 * geo-redirected to their trees by the middleware; the EU trees are never
 * reached by IP. Everything that needs to build a country-aware
 * link or pick country-specific content should go through here rather than
 * hard-coding `"/en-ca"` checks, so adding a locale stays a one-line change.
 */

export type Locale = "us" | "ca" | "uk" | "au" | "eu";

export const CANADA_PREFIX = "/en-ca";
export const UK_PREFIX = "/en-gb";
export const AU_PREFIX = "/en-au";
/**
 * Euro-priced country trees, one per European country except GB. "EU" is not
 * a valid hreflang region, so Europe is served one URL tree per country, but
 * they all render the same pages from `app/[country]` (which builds one static
 * copy per entry here) with the same EUR pricing. Only the URLs, canonical and hreflang tag differ. Adding a
 * country is one line here.
 */
export const EU_TREES = [
  { prefix: "/en-ie", country: "IE", hreflang: "en-IE", name: "Ireland" },
  { prefix: "/en-de", country: "DE", hreflang: "en-DE", name: "Germany" },
  { prefix: "/en-nl", country: "NL", hreflang: "en-NL", name: "Netherlands" },
  { prefix: "/en-fr", country: "FR", hreflang: "en-FR", name: "France" },
  { prefix: "/en-es", country: "ES", hreflang: "en-ES", name: "Spain" },
  { prefix: "/en-se", country: "SE", hreflang: "en-SE", name: "Sweden" },
  { prefix: "/en-ch", country: "CH", hreflang: "en-CH", name: "Switzerland" },
  { prefix: "/en-pl", country: "PL", hreflang: "en-PL", name: "Poland" },
  { prefix: "/en-be", country: "BE", hreflang: "en-BE", name: "Belgium" },
  // The rest of the EU
  { prefix: "/en-at", country: "AT", hreflang: "en-AT", name: "Austria" },
  { prefix: "/en-bg", country: "BG", hreflang: "en-BG", name: "Bulgaria" },
  { prefix: "/en-hr", country: "HR", hreflang: "en-HR", name: "Croatia" },
  { prefix: "/en-cy", country: "CY", hreflang: "en-CY", name: "Cyprus" },
  { prefix: "/en-cz", country: "CZ", hreflang: "en-CZ", name: "Czechia" },
  { prefix: "/en-dk", country: "DK", hreflang: "en-DK", name: "Denmark" },
  { prefix: "/en-ee", country: "EE", hreflang: "en-EE", name: "Estonia" },
  { prefix: "/en-fi", country: "FI", hreflang: "en-FI", name: "Finland" },
  { prefix: "/en-gr", country: "GR", hreflang: "en-GR", name: "Greece" },
  { prefix: "/en-hu", country: "HU", hreflang: "en-HU", name: "Hungary" },
  { prefix: "/en-it", country: "IT", hreflang: "en-IT", name: "Italy" },
  { prefix: "/en-lv", country: "LV", hreflang: "en-LV", name: "Latvia" },
  { prefix: "/en-lt", country: "LT", hreflang: "en-LT", name: "Lithuania" },
  { prefix: "/en-lu", country: "LU", hreflang: "en-LU", name: "Luxembourg" },
  { prefix: "/en-mt", country: "MT", hreflang: "en-MT", name: "Malta" },
  { prefix: "/en-pt", country: "PT", hreflang: "en-PT", name: "Portugal" },
  { prefix: "/en-ro", country: "RO", hreflang: "en-RO", name: "Romania" },
  { prefix: "/en-sk", country: "SK", hreflang: "en-SK", name: "Slovakia" },
  { prefix: "/en-si", country: "SI", hreflang: "en-SI", name: "Slovenia" },
  // The rest of Europe (GB has its own GBP tree; Russia and Belarus are left out)
  { prefix: "/en-no", country: "NO", hreflang: "en-NO", name: "Norway" },
  { prefix: "/en-is", country: "IS", hreflang: "en-IS", name: "Iceland" },
  { prefix: "/en-li", country: "LI", hreflang: "en-LI", name: "Liechtenstein" },
  { prefix: "/en-al", country: "AL", hreflang: "en-AL", name: "Albania" },
  { prefix: "/en-ad", country: "AD", hreflang: "en-AD", name: "Andorra" },
  { prefix: "/en-ba", country: "BA", hreflang: "en-BA", name: "Bosnia and Herzegovina" },
  { prefix: "/en-md", country: "MD", hreflang: "en-MD", name: "Moldova" },
  { prefix: "/en-mc", country: "MC", hreflang: "en-MC", name: "Monaco" },
  { prefix: "/en-me", country: "ME", hreflang: "en-ME", name: "Montenegro" },
  { prefix: "/en-mk", country: "MK", hreflang: "en-MK", name: "North Macedonia" },
  { prefix: "/en-rs", country: "RS", hreflang: "en-RS", name: "Serbia" },
  { prefix: "/en-sm", country: "SM", hreflang: "en-SM", name: "San Marino" },
  { prefix: "/en-ua", country: "UA", hreflang: "en-UA", name: "Ukraine" },
] as const;

export type EUPrefix = (typeof EU_TREES)[number]["prefix"];

export const EU_PREFIXES: readonly EUPrefix[] = EU_TREES.map((tree) => tree.prefix);

/**
 * Every non-default locale prefix. Matching is on segment boundaries (see
 * getLocalePrefix), so order does not matter: `/en-ca` never matches `/en-cash`.
 */
export const LOCALE_PREFIXES = [CANADA_PREFIX, UK_PREFIX, AU_PREFIX, ...EU_PREFIXES] as const;

export type LocalePrefix = (typeof LOCALE_PREFIXES)[number] | "";

/** Country codes served the UK tree (`/en-gb`). */
export const UK_COUNTRY_CODES = new Set(["GB"]);

/** EU member states. Every one of them also has its own entry in EU_TREES. */
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
 * The tree a path belongs to as a tag, e.g. "en-de"; "en-us" for
 * the root tree. Analytics use this so each EU tree reports separately even
 * though they all share the "eu" content and pricing locale.
 */
export function getLocaleTag(pathname: string | null | undefined): string {
  const prefix = getLocalePrefix(pathname);
  return prefix ? prefix.slice(1) : "en-us";
}

/** Country each tree serves. */
const COUNTRY_BY_PREFIX: Record<Exclude<LocalePrefix, "">, string> = {
  [CANADA_PREFIX]: "CA",
  [UK_PREFIX]: "GB",
  [AU_PREFIX]: "AU",
  ...(Object.fromEntries(EU_TREES.map((tree) => [tree.prefix, tree.country])) as Record<EUPrefix, string>),
};

/** Country name for the page copy of an EU tree ("France"), or null outside the EU trees. */
export function getEUCountryName(pathname: string | null | undefined): string | null {
  const prefix = getLocalePrefix(pathname);
  return EU_TREES.find((tree) => tree.prefix === prefix)?.name ?? null;
}

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

export const SITE_URL = "https://www.flashfirejobs.com";

const HREFLANG_TREES: ReadonlyArray<readonly [string, string]> = [
  ["en-CA", CANADA_PREFIX],
  ["en-GB", UK_PREFIX],
  ["en-AU", AU_PREFIX],
  ...EU_TREES.map((tree) => [tree.hreflang, tree.prefix] as const),
];

/**
 * The hreflang cluster for one page, for `alternates.languages`. Every tree
 * lists the same map so the annotations stay reciprocal. `rootPath` is the
 * US/x-default URL when the root page lives at a different path than the
 * locale trees' copies (e.g. /offer-and-salary-negotiation-advisor).
 */
export function hreflangLanguages(subPath: string, rootPath: string = subPath): Record<string, string> {
  const suffix = subPath === "/" ? "" : subPath;
  const root = `${SITE_URL}${rootPath}`;
  return {
    "en-US": root,
    ...Object.fromEntries(HREFLANG_TREES.map(([tag, prefix]) => [tag, `${SITE_URL}${prefix}${suffix}`])),
    "x-default": root,
  };
}
