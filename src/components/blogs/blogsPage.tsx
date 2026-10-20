import { blogPosts, type BlogPost } from "@/src/data/blogsData";
import BlogsPageView, { type RelatedPost } from "./blogsPageView";

// Server component: picks the related/recent/most-viewed posts here so the
// full blog dataset (every post's HTML content) is never shipped to the browser.

// Only the fields the sidebar and related cards render
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
    readTime: p.readTime,
  };
}

export default function BlogsPage({ post }: { post: BlogPost }) {
  // Get related articles (same category preferred; allow more than 3 to enable scroll)
  // Support both `category` (string) and `categories` (array) fields
  const postCategories: string[] = post.categories || (post.category ? [post.category] : []);

  const sameCategory = blogPosts.filter((p) => {
    if (p.id === post.id) return false;
    const pCategories: string[] = p.categories || (p.category ? [p.category] : []);
    return postCategories.some((c) => pCategories.includes(c));
  });

  // If none in same category, fall back to recent posts
  const relatedArticles =
    sameCategory.length === 0
      ? blogPosts.filter((p) => p.id !== post.id).slice(-6).reverse()
      : sameCategory;

  // Get recent posts (exclude current)
  const recentPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 5);

  // Get most viewed posts (exclude current and recent posts)
  const excludeIds = new Set([post.id, ...recentPosts.map((p) => p.id)]);
  const mostViewedPosts = blogPosts
    .filter((p) => !excludeIds.has(p.id))
    .sort((a, b) => {
      // Sort by date descending (newer first) as a proxy for "most viewed"
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <BlogsPageView
      post={post}
      relatedArticles={relatedArticles.map(toRelatedPost)}
      recentPosts={recentPosts.map(toRelatedPost)}
      mostViewedPosts={mostViewedPosts.map(toRelatedPost)}
    />
  );
}
