import type { Metadata } from "next";
import { SITE_URL } from "./locale";

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

/** Turns a metadata builder into `generateMetadata` for the tree being rendered. */
export function euMetadata(build: (url: EUUrl) => Metadata) {
  return async ({ params }: EUPageProps): Promise<Metadata> => {
    const { country } = await params;
    return build(euUrl(country));
  };
}
