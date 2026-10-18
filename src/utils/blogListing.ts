import { blogPosts } from "@/src/data/blogsData";
import { categoryToSlug, tagToSlug } from "@/src/utils/blogCategoryUtils";

type ListingPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  tags?: string[];
};

function allPosts(): ListingPost[] {
  return (blogPosts as unknown as Array<Record<string, unknown>>)
    .filter((p) => p && typeof p.slug === "string" && p.slug && p.slug !== "undefined")
    .map((p) => {
      const categories = p.categories as string[] | undefined;
      return {
        slug: p.slug as string,
        title: (p.title as string) || "",
        excerpt: p.excerpt as string | undefined,
        category: (p.category as string) || categories?.[0] || "Career Advice",
        tags: (p.tags as string[] | undefined) || categories || [],
      };
    });
}

/** Posts whose category matches the slug (same rule the client listing uses). */
export function getPostsForCategorySlug(slug: string): ListingPost[] {
  return allPosts().filter((p) => categoryToSlug(p.category || "") === slug);
}

/** Posts carrying the tag (or category) that matches the slug. */
export function getPostsForTagSlug(slug: string): ListingPost[] {
  return allPosts().filter(
    (p) =>
      tagToSlug(p.category || "") === slug ||
      (p.tags || []).some((t) => t && tagToSlug(t) === slug)
  );
}

/** Keeps a string within [max] characters, cutting at a word boundary. */
export function fitText(text: string, max: number): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:–-]+$/, "")}…`;
}
