import { blogPosts, type BlogPost } from "@/src/data/blogsData";
import BlogsPageView, { type RelatedPost } from "./blogsPageView";
import { getReadTime } from "@/src/utils/blogContent";

// Server component: picks the related posts here so the full blog dataset
// (every post's HTML content) is never shipped to the browser.

// Links rendered in the page HTML (4 visible, the rest reached with the arrows)
const MAX_RELATED = 6;

// Only the fields the related cards render
function toRelatedPost(p: BlogPost): RelatedPost {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    image: p.image,
    coverImage: p.coverImage,
    category: p.category,
    date: p.date,
    readTime: getReadTime(p.content, p.readTime),
  };
}

const postTime = (p: BlogPost) => new Date(p.date || 0).getTime() || 0;
const newestFirst = (a: BlogPost, b: BlogPost) => postTime(b) - postTime(a);

// Posts sharing the most tags chosen at publish time come first (newest first on
// ties). Same-category posts only fill the remaining slots.
function getRelatedPosts(post: BlogPost): BlogPost[] {
  const others = blogPosts.filter((p) => p && p.id !== post.id && p.slug);

  const postTags = new Set((post.tags || []).map((t) => t.toLowerCase()));
  const tagMatches = others
    .map((p) => ({
      p,
      shared: (p.tags || []).filter((t) => postTags.has(t.toLowerCase())).length,
    }))
    .filter((m) => m.shared > 0)
    .sort((a, b) => b.shared - a.shared || newestFirst(a.p, b.p))
    .map((m) => m.p);

  if (tagMatches.length >= MAX_RELATED) return tagMatches.slice(0, MAX_RELATED);

  const picked = new Set(tagMatches.map((p) => p.id));
  const postCategories = post.categories || (post.category ? [post.category] : []);
  const sameCategory = others
    .filter((p) => {
      if (picked.has(p.id)) return false;
      const pCategories = p.categories || (p.category ? [p.category] : []);
      return postCategories.some((c) => pCategories.includes(c));
    })
    .sort(newestFirst);

  return [...tagMatches, ...sameCategory].slice(0, MAX_RELATED);
}

export default function BlogsPage({ post }: { post: BlogPost }) {
  return (
    <BlogsPageView
      post={{ ...post, readTime: getReadTime(post.content, post.readTime) }}
      relatedArticles={getRelatedPosts(post).map(toRelatedPost)}
    />
  );
}
