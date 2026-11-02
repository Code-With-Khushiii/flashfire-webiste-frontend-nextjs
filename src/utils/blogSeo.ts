// SEO values shared by the blog page metadata (og:image, twitter) and the BlogPosting
// JSON-LD, so both always point at the same image, alt text and description.
// Kept free of the blog dataset so the client view can import it without pulling
// every post into the browser bundle.

export const SITE_URL = "https://www.flashfirejobs.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.png`;

type SeoPost = {
  title: string;
  excerpt?: string;
  metaDescription?: string;
  image?: string;
  coverImage?: string;
  imageAlt?: string;
};

/** Keeps a string within [max] characters, cutting at a word boundary. */
export function fitText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–-]+$/, "")}…`;
}

/** Turns a site-relative path into an absolute URL; absolute URLs pass through. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}

/** The post's featured image as an absolute URL (falls back to the site OG image). */
export function getBlogImageUrl(post: SeoPost): string {
  const src = post.image || post.coverImage;
  return src ? absoluteUrl(src) : DEFAULT_OG_IMAGE;
}

/** Alt text for the featured image: the post's own description, else its title. */
export function getBlogImageAlt(post: SeoPost): string {
  return post.imageAlt || post.title;
}

/** The meta description (not the on-page summary), trimmed to Google's snippet limit. */
export function getBlogMetaDescription(post: SeoPost): string {
  return fitText(post.metaDescription || post.excerpt || post.title, 155);
}
