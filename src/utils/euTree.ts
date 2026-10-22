import type { Metadata } from "next";
import { EU_TREES, SITE_URL } from "./locale";

/**
 * Helpers for pages in `app/[country]`, the one tree behind every EU locale
 * (`/en-ie`, `/en-de`, ...; see EU_TREES). `country` is the URL segment,
 * e.g. "en-de".
 */
export interface EUPageProps {
  params: Promise<{ country: string }>;
}

/** Builds absolute URLs inside one EU tree: url("/pricing") -> https://www.flashfirejobs.com/en-de/pricing */
export type EUUrl = (subPath?: string) => string;

export function euUrl(country: string): EUUrl {
  return (subPath = "/") => `${SITE_URL}/${country}${subPath === "/" ? "" : subPath}`;
}

const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

/** Swaps the generic "EU" / "European" wording for the country, e.g. "Flashfire EU" -> "Flashfire France". */
function nameCountry(text: string, name: string): string {
  return text
    .replace(/\bEuropean (job seekers|recruiters)/gi, (_, noun: string) => `${noun} in ${name}`)
    .replace(/\b(?:EU|Europe|European)\b/g, name);
}

function titleFor(title: string, name: string): string {
  const named = nameCountry(title, name);
  return named.includes(name) ? named : `${named} | ${name}`;
}

function descriptionFor(description: string, name: string): string {
  const named = nameCountry(description, name);
  if (named.includes(name)) return named;
  return `${named}${/[.!?]$/.test(named) ? "" : "."} Built for job seekers in ${name}.`;
}

/**
 * Turns a metadata builder into `generateMetadata` for the tree being rendered.
 * Every tree gets the country in title, description, og:title, og:description
 * and twitter tags, og:url equal to the self canonical, and no leftover
 * root-layout tags (which would say "Job Search UK" and point at the homepage).
 */
export function euMetadata(build: (url: EUUrl) => Metadata) {
  return async ({ params }: EUPageProps): Promise<Metadata> => {
    const { country } = await params;
    const meta = build(euUrl(country));
    const name = EU_TREES.find((tree) => tree.prefix === `/${country}`)?.name;
    if (!name || typeof meta.title !== "string" || !meta.description) return meta;

    const title = titleFor(meta.title, name);
    const description = descriptionFor(meta.description, name);
    const og = meta.openGraph;
    const ogTitle = typeof og?.title === "string" ? titleFor(og.title, name) : title;
    const ogDescription = og?.description ? descriptionFor(og.description, name) : description;
    const canonical = meta.alternates?.canonical;

    return {
      ...meta,
      title,
      description,
      openGraph: {
        type: "website",
        siteName: "FLASHFIRE",
        images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "FLASHFIRE" }],
        ...og,
        title: ogTitle,
        description: ogDescription,
        ...(typeof canonical === "string" ? { url: canonical } : {}),
      },
      twitter: {
        card: "summary_large_image",
        images: [OG_IMAGE],
        ...meta.twitter,
        title: ogTitle,
        description: ogDescription,
      },
    };
  };
}
