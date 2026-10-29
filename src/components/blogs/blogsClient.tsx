import { blogPosts } from "@/src/data/blogsData";
import BlogsClientView, { type BlogListItem } from "./blogsClientView";
import { getReadTime } from "@/src/utils/blogContent";

// Server component: builds the slim post list here so the full blog dataset
// (every post's HTML content) is never shipped to the browser.

type BlogsClientProps = {
  categorySlug?: string;
  tagSlug?: string;
  heading?: string;
};

// Function to generate default tags based on category and content
function getDefaultTags(category: string, title: string, excerpt: string): string[] {
  const categoryTags: Record<string, string[]> = {
    "Career Advice": ["Career Tips", "Job Search", "Professional Development"],
    "Job Search Strategy": ["Job Search", "Career Strategy", "Job Hunting"],
    "Success Stories": ["Success Stories", "Career Growth", "Job Search"],
  };

  // Extract keywords from title and excerpt to determine relevant tags
  const content = (title + " " + excerpt).toLowerCase();
  const relevantTags: string[] = [];

  // Add tags based on content analysis
  if (content.includes("resume") || content.includes("cv") || content.includes("curriculum vitae")) {
    relevantTags.push("Resume Writing");
  }
  if (content.includes("ats") || content.includes("applicant tracking") || content.includes("keyword")) {
    relevantTags.push("ATS Optimization");
  }
  if (content.includes("interview") || content.includes("interviewing")) {
    relevantTags.push("Interview Preparation");
  }
  if (content.includes("job search") || content.includes("job hunting") || content.includes("applying")) {
    relevantTags.push("Job Search");
  }
  if (content.includes("career") || content.includes("professional") || content.includes("growth")) {
    relevantTags.push("Career Tips");
  }

  // Add category-specific tags
  const categorySpecificTags = categoryTags[category] || ["Career Tips", "Job Search"];

  // Merge and remove duplicates
  const allTags = [...new Set([...relevantTags, ...categorySpecificTags])];
  return allTags.length > 0 ? allTags : ["Career Tips", "Job Search"]; // Fallback if no tags found
}

// Compute once per server process and cache
let blogListCache: BlogListItem[] | null = null;

function getBlogList(): BlogListItem[] {
  if (blogListCache) {
    return blogListCache;
  }

  blogListCache = blogPosts
    .filter((blog) => blog && blog.slug && blog.slug !== "undefined")
    .map((blog) => {
      // Support both `category` (old, string) and `categories` (new, string[]) field names
      const categoriesArray = blog.categories;
      const category =
        blog.category || (categoriesArray && categoriesArray.length > 0 ? categoriesArray[0] : "Career Advice");
      const existingTags =
        blog.tags && blog.tags.length > 0
          ? blog.tags
          : categoriesArray && categoriesArray.length > 0
          ? categoriesArray
          : [];

      // Always include the blog's category as a tag for filtering. If the blog
      // has no tags, generate relevant ones from its title and excerpt.
      const baseTags =
        existingTags.length > 0
          ? existingTags
          : getDefaultTags(category, blog.title, blog.excerpt || "");
      const tags = [...new Set([...baseTags, category])];

      return {
        id: blog.id,
        slug: blog.slug as string,
        title: blog.title,
        excerpt: blog.excerpt || "",
        date: blog.date || "",
        ...(blog.lastUpdated ? { lastUpdated: blog.lastUpdated } : {}),
        readTime: getReadTime(blog.content, blog.readTime),
        category,
        tags,
        ...(blog.author?.name ? { author: { name: blog.author.name } } : {}),
        // Support both `image` (old) and `coverImage` (new) field names
        image: blog.image || blog.coverImage || "",
      };
    });

  return blogListCache;
}

export default function BlogsClient({ categorySlug, tagSlug, heading }: BlogsClientProps = {}) {
  return (
    <BlogsClientView
      posts={getBlogList()}
      categorySlug={categorySlug}
      tagSlug={tagSlug}
      heading={heading}
    />
  );
}
