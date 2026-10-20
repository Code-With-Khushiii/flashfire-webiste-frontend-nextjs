"use client";

import { useEffect, useState, useMemo } from "react";
import styles from "./blogsPage.module.css";
import CachedBlogImage from "./CachedBlogImage";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/src/utils/PostHogTracking";
import posthog from "posthog-js";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaTwitter } from "react-icons/fa";
import { categoryToSlug, tagToSlug } from "@/src/utils/blogCategoryUtils";

type BlogPost = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  category?: string;
  categories?: string[];
  categoryColor?: string;
  date?: string;
  lastUpdated?: string;
  readTime?: string;
  content?: string;
  tags?: string[];
  author?: {
    name: string;
    bio?: string;
    image?: string;
  };
};

export type RelatedPost = {
  id: number;
  slug?: string;
  title: string;
  excerpt?: string;
  image?: string;
  coverImage?: string;
  category?: string;
  date?: string;
  readTime?: string;
};

type TableOfContentsItem = {
  title: string;
  anchor: string;
  level: number;
};

export default function BlogsPageView({
  post,
  relatedArticles,
  recentPosts,
  mostViewedPosts,
}: {
  post: BlogPost;
  relatedArticles: RelatedPost[];
  recentPosts: RelatedPost[];
  mostViewedPosts: RelatedPost[];
}) {
  const [activeSection, setActiveSection] = useState<string>("");
  // Tags for this post - show default tags on every blog for UI consistency
  // But filtering will only match blogs that actually have that tag in their data
  const defaultDisplayTags = [
    "Career Advice",
    "Job Search Strategy",
    "Success Stories",
    "Visa & Immigration",
    "Career Planning",
    "International Students"
  ];
  const postTags = useMemo(() => {
    // Always show default tags on every blog page for UI consistency
    // The actual filtering in blogsClient.tsx will use the blog's real tags
    return defaultDisplayTags;
  }, []);

  const overviewText = post.excerpt || "";

  // Split overview into paragraphs for first 3 blogs (deterministic, no client-side checks)
  const overviewParagraphs = useMemo(() => {
    if (!overviewText) return null;
    
    // Only split for first 3 blogs with the specific content pattern
    if (post.id <= 3 && overviewText.includes("You're not the only one")) {
      // Split into 3 paragraphs based on content structure
      const p1End = overviewText.indexOf("mental health.");
      const p2Start = overviewText.indexOf("This Flashfirejobs");
      const p3Start = overviewText.indexOf("You will also learn");
      
      // Ensure all markers are found and in correct order
      if (p1End > 0 && p2Start > p1End && p3Start > p2Start) {
        const para1 = overviewText.substring(0, p1End + "mental health.".length).trim();
        const para2 = overviewText.substring(p2Start, p3Start).trim();
        const para3 = overviewText.substring(p3Start).trim();
        
        // Return only if all paragraphs are non-empty
        if (para1 && para2 && para3) {
          return [para1, para2, para3];
        }
      }
    }
    return null;
  }, [overviewText, post.id]);

  // The page template already renders the post title as the single H1, so any
  // <h1> authored inside the post body is demoted to <h2>.
  const demotedContent = useMemo(
    () => {
      const html = (post?.content || "").replace(/<h1(\b[^>]*)>/gi, "<h2$1>").replace(/<\/h1>/gi, "</h2>");
      // Never skip a heading level (e.g. H2 -> H4): the H1 is the post title, so
      // the first heading may be an H2 and each later one at most one level deeper.
      let prev = 1;
      const levels: number[] = [];
      return html
        .replace(/<(\/?)h([2-6])(\b[^>]*)>/gi, (_m, slash: string, lvl: string, rest: string) => {
          if (!slash) {
            const wanted = Number(lvl);
            const used = Math.min(wanted, prev + 1);
            levels.push(used);
            prev = used;
            return `<h${used}${rest}>`;
          }
          return `</h${levels[levels.length - 1] ?? lvl}>`;
        });
    },
    [post?.content]
  );

  // Process content and generate table of contents (client-side only)
  const [processedContent, setProcessedContent] = useState<string>(demotedContent);
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);

  useEffect(() => {
    if (!demotedContent || typeof window === "undefined") {
      setProcessedContent(demotedContent);
      return;
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(demotedContent, "text/html");
      // Only include H2 headings (main sections), exclude H3 (sub-sections, questions)
      const headings = doc.querySelectorAll("h2");
      const toc: TableOfContentsItem[] = [];

      headings.forEach((heading, index) => {
        const text = heading.textContent || "";
        const anchor = `section-${index + 1}`;
        
        // Add ID to heading for anchor links
        heading.id = anchor;
        
        toc.push({
          title: text,
          anchor: anchor,
          level: 2,
        });
      });

      // Wrap tables so wide ones scroll horizontally on small screens
      doc.querySelectorAll("table").forEach((table) => {
        const wrapper = doc.createElement("div");
        wrapper.className = styles.tableScroll;
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });

      doc.querySelectorAll("ol").forEach((ol) => {
        const items = Array.from(ol.children).filter((el) => el.tagName === "LI");
        if (items.length === 0) return;
        // Items whose text already starts with "1.", "2." etc. shouldn't get a second number
        if (items.every((li) => /^\s*\d+[.)]/.test(li.textContent || ""))) {
          ol.classList.add(styles.selfNumbered);
        // Question/answer lists (each item opens with a heading) get the number inline
        // with the heading so the answers can sit flush with the article text
        } else if (items.every((li) => /^H[3-6]$/.test(li.firstElementChild?.tagName || ""))) {
          ol.classList.add(styles.qaList);
        }
      });

      // Add Overview at the top of the TOC if overview text exists
      const finalToc =
        overviewText && overviewText.trim().length > 0
          ? [
              {
                title: "Overview",
                anchor: "overview-section",
                level: 2,
              },
              ...toc,
            ]
          : toc;

      setProcessedContent(doc.body.innerHTML);
      setTableOfContents(finalToc);
    } catch (error) {
      // Fallback to original content if parsing fails
      setProcessedContent(demotedContent);
      setTableOfContents([]);
    }
  }, [demotedContent, overviewText]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = tableOfContents.map((item) => {
        const element = document.getElementById(item.anchor);
        return element ? { element, anchor: item.anchor } : null;
      }).filter(Boolean) as { element: HTMLElement; anchor: string }[];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].anchor);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [tableOfContents]);

  useEffect(() => {
    if (!post) return;

    // Scroll to top when blog page loads
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToTop();
      // Also scroll after a short delay to catch any late scrolls
      setTimeout(() => {
        scrollToTop();
      }, 50);
      // One more check after layout
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToTop();
        }, 100);
      });
    });

    const startedAt = Date.now();

    try {
      posthog.capture?.("blog_view", {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
        blog_category: post.category,
        blog_read_time: post.readTime,
        blog_date: post.date,
        page_url: window.location.href,
      });

      trackPageView("blog_detail", undefined, {
        blog_id: post.id,
        blog_slug: post.slug,
        blog_title: post.title,
      });
    } catch {}

    const marks = new Set<number>();
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const percent = Math.min(100, Math.round((scrollTop / height) * 100));
      [25, 50, 75, 100].forEach((t) => {
        if (percent >= t && !marks.has(t)) {
          marks.add(t);
          trackScrollDepth(t, "blog_detail", { blog_slug: post.slug });
        }
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      const timeSpentSec = Math.round((Date.now() - startedAt) / 1000);
      trackTimeOnPage(timeSpentSec, "blog_detail", { blog_slug: post.slug });
    };
  }, [post]);

  // Social sharing functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post.title;

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    };

    if (urls[platform]) {
      window.open(urls[platform], "_blank", "width=600,height=400");
    }
  };

  const scrollToSection = (anchor: string) => {
    const element = document.getElementById(anchor);
    if (element) {
      const offset = 150; // Increased offset to ensure heading is fully visible
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper function to convert date to ISO format (YYYY-MM-DD)
  const convertToISODate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString; // Return original if invalid
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  // Extract FAQ questions and answers from content. Done with plain string
  // parsing (no DOMParser) so the FAQ schema renders on the server with the
  // rest of the JSON-LD and is never injected a second time after hydration.
  const extractFAQ = useMemo(() => {
    const content = post?.content;
    if (!content) return [] as Array<{ question: string; answer: string }>;
    const strip = (html: string) =>
      html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    const faqItems: Array<{ question: string; answer: string }> = [];
    const blocks = content.match(/<(h2|h3|p)\b[^>]*>[\s\S]*?<\/\1>/gi) || [];
    const start = blocks.findIndex(
      (b) => /^<h2/i.test(b) && strip(b).toLowerCase().includes("faq")
    );
    if (start === -1) return faqItems;
    for (let i = start + 1; i < blocks.length; i++) {
      const block = blocks[i];
      if (/^<h2/i.test(block)) break;
      if (/^<h3/i.test(block)) {
        const question = strip(block).replace(/^\d+\.\s*/, "");
        const next = blocks[i + 1];
        if (question && next && /^<p/i.test(next)) {
          const answer = strip(next);
          if (answer) faqItems.push({ question, answer });
        }
      }
    }
    return faqItems;
  }, [post?.content]);

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.flashfirejobs.com/blog/${post.slug}`,
    },
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image || post.coverImage || "",
    author: {
      "@type": "Person",
      name: post.author?.name || "Arjun Sharma",
      ...(post.author?.name && {
        url: `https://www.flashfirejobs.com/author/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "FlashFire Jobs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.flashfirejobs.com/favicon.ico",
      },
    },
    datePublished: convertToISODate(post.date || ""),
    dateModified: convertToISODate(post.lastUpdated || post.date || ""),
  };

  // Generate FAQ schema if FAQ items exist (use empty array to avoid hydration issues)
  const faqStructuredData = extractFAQ && extractFAQ.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extractFAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;

  const breadcrumbCategory = post.category || post.categories?.[0];

  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.flashfirejobs.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://www.flashfirejobs.com/blog",
    },
    ...(breadcrumbCategory
      ? [
          {
            "@type": "ListItem",
            position: 3,
            name: breadcrumbCategory,
            item: `https://www.flashfirejobs.com/blog/${categoryToSlug(breadcrumbCategory)}`,
          },
        ]
      : []),
    {
      "@type": "ListItem",
      position: breadcrumbCategory ? 4 : 3,
      name: post.title,
      item: `https://www.flashfirejobs.com/blog/${post.slug}`,
    },
  ];

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const renderShareButtons = () => (
    <div className={styles.socialShare}>
      <button
        onClick={() => handleShare("facebook")}
        className={styles.socialButton}
        aria-label="Share on Facebook"
      >
        <FaFacebookF />
      </button>
      <button
        onClick={() => handleShare("twitter")}
        className={styles.socialButton}
        aria-label="Share on Twitter"
      >
        <FaTwitter />
      </button>
      <button
        onClick={() => handleShare("linkedin")}
        className={styles.socialButton}
        aria-label="Share on LinkedIn"
      >
        <FaLinkedinIn />
      </button>
    </div>
  );

  const renderTocList = () => (
    <ol className={styles.tocList}>
      {tableOfContents.map((item, index) => (
        <li
          key={index}
          className={`${styles.tocItem} ${
            activeSection === item.anchor ? styles.tocItemActive : ""
          }`}
        >
          <button
            onClick={() => scrollToSection(item.anchor)}
            className={styles.tocLink}
          >
            {item.title}
          </button>
        </li>
      ))}
    </ol>
  );

  const renderPostList = (posts: RelatedPost[]) => (
    <ul className={styles.recentPostsList}>
      {posts.map((listPost) => (
        <li key={listPost.id} className={styles.recentPostItem}>
          <Link
            href={`/blog/${listPost.slug}`}
            className={styles.recentPostLink}
          >
            <div className={styles.recentPostImage}>
              <CachedBlogImage
                src={listPost.image || listPost.coverImage || ""}
                alt={listPost.title}
                width={80}
                height={60}
                className={styles.recentPostImg}
                sizes="80px"
              />
            </div>
            <div className={styles.recentPostContent}>
              <h3 className={styles.recentPostTitle}>
                {listPost.title}
              </h3>
              <span className={styles.recentPostDate}>
                {listPost.date}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}
      <Navbar />
      <main className={styles.pageWrapper}>
        {/* === HERO: breadcrumb, date, title, author | cover image === */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
              <Link href="/blog">Blog</Link>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
              <Link href={`/blog/${categoryToSlug(post.category || "")}`}>{post.category}</Link>
              <span className={styles.breadcrumbSeparator}> &gt; </span>
              <span className={styles.breadcrumbCurrent} title={post.title}>{post.title}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <div className={styles.dateInfo}>
                  <span className={styles.dateLabel}>Published:</span>
                  <time dateTime={post.date} itemProp="datePublished">{post.date}</time>
                  {post.lastUpdated && post.lastUpdated !== post.date && (
                    <>
                      <span className={styles.dateSeparator}>|</span>
                      <span className={styles.dateLabel}>Updated:</span>
                      <time dateTime={post.lastUpdated} itemProp="dateModified">{post.lastUpdated}</time>
                    </>
                  )}
                  <span className={styles.readTime}>⏱️ {post.readTime}</span>
                </div>

                <h1 className={styles.title} itemProp="headline">{post.title}</h1>

                {/* === AUTHOR === */}
                <div className={styles.authorInfo} itemScope itemType="https://schema.org/Person">
                  {post.author?.image && (
                    <CachedBlogImage
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className={styles.authorImage}
                      itemProp="image"
                      sizes="40px"
                    />
                  )}
                  <div>
                    {post.author?.name ? (
                      <Link
                        href={`/author/${post.author.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className={styles.authorNameLink}
                      >
                        <div className={styles.authorName} itemProp="name">
                          By {post.author.name}
                        </div>
                      </Link>
                    ) : (
                      <div className={styles.authorName} itemProp="name">
                        By Debashri Mandal
                      </div>
                    )}
                    {post.author?.bio && (
                      <div className={styles.authorBio} itemProp="description">{post.author.bio}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* === HERO IMAGE === */}
              <div className={styles.imageWrapper}>
                <CachedBlogImage
                  src={post.image || post.coverImage || ""}
                  alt={post.title}
                  width={1200}
                  height={630}
                  className={styles.image}
                  priority
                  itemProp="image"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
            </div>
          </div>
        </section>

        {/* === BODY: article | sticky sidebar === */}
        <div className={styles.bodyGrid}>
          <div className={styles.mainColumn}>
            {/* === BLOG OVERVIEW === */}
            {overviewText && (
              <div id="overview-section" className={styles.overviewBox}>
                <p className={styles.overviewTitle}>Summary:</p>
                {overviewParagraphs ? (
                  <div className={styles.overviewText}>
                    <p
                      style={{ marginBottom: "0.75rem" }}
                      dangerouslySetInnerHTML={{ __html: overviewParagraphs[0] }}
                    />
                    <p
                      style={{ marginBottom: "0.75rem" }}
                      dangerouslySetInnerHTML={{ __html: overviewParagraphs[1] }}
                    />
                    <p
                      style={{ marginBottom: 0 }}
                      dangerouslySetInnerHTML={{ __html: overviewParagraphs[2] }}
                    />
                  </div>
                ) : overviewText.includes('\n\n') ? (
                  <div className={styles.overviewText}>
                    {overviewText.split('\n\n').map((para, index, array) => (
                      <p
                        key={index}
                        style={{ marginBottom: index < array.length - 1 ? "0.75rem" : 0 }}
                        dangerouslySetInnerHTML={{ __html: para.trim() }}
                      />
                    ))}
                  </div>
                ) : (
                  <p
                    className={styles.overviewText}
                    dangerouslySetInnerHTML={{ __html: overviewText }}
                  />
                )}
              </div>
            )}

            {/* === TABLE OF CONTENTS (mobile/tablet: collapsible, above the article) === */}
            {tableOfContents.length > 0 && (
              <details className={styles.mobileToc}>
                <summary className={styles.mobileTocSummary}>In this article</summary>
                {renderTocList()}
              </details>
            )}

            {/* === ARTICLE CONTENT === */}
            <article
              className={styles.content}
              itemScope
              itemType="https://schema.org/Article"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* === TAGS (clickable to filter blogs by tag) === */}
            {postTags && postTags.length > 0 && (
              <div className={styles.tagsWrapper}>
                {postTags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className={styles.tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* === BOTTOM SOCIAL SHARE === */}
            <div className={styles.bottomShareSection}>
              <span className={styles.shareLabel}>Share this article</span>
              {renderShareButtons()}
            </div>
          </div>

          {/* === RIGHT: STICKY SIDEBAR === */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarShare}>
              <span className={styles.shareLabel}>Share this article</span>
              {renderShareButtons()}
            </div>

            {tableOfContents.length > 0 && (
              <nav className={styles.tableOfContents} aria-label="In this article">
                <p className={styles.tocTitle}>In this article</p>
                {renderTocList()}
              </nav>
            )}

            {/* === LEAD MAGNET === */}
            <div className={styles.leadMagnet}>
              <h2 className={styles.leadMagnetTitle}>Free ATS Resume Check</h2>
              <p>See how your resume scores against applicant tracking systems before you apply.</p>
              <Link href="/ats-score-checker" className={styles.ctaButton}>
                Check my resume
              </Link>
            </div>
          </aside>
        </div>

        {/* === RECENT + MOST VIEWED POSTS === */}
        <div className={styles.moreSection}>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sidebarTitle}>Recent Posts</h2>
            {renderPostList(recentPosts)}
          </div>
          {mostViewedPosts.length > 0 && (
            <div className={styles.sidebarSection}>
              <h2 className={styles.sidebarTitle}>Most Viewed Blogs</h2>
              {renderPostList(mostViewedPosts)}
            </div>
          )}
        </div>

        {/* === RELATED ARTICLES === */}
        {relatedArticles.length > 0 && (
          <section className={styles.relatedSection}>
            <h2 className={styles.relatedTitle}>Related Articles</h2>
            <div
              className={`${styles.relatedGrid} ${
                relatedArticles.length > 3 ? styles.relatedGridScroll : ""
              }`}
            >
              {relatedArticles.map((relatedPost) => (
                <article key={relatedPost.id} className={styles.relatedCard}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className={styles.relatedImage}>
                      <CachedBlogImage
                        src={relatedPost.image || relatedPost.coverImage || ""}
                        alt={relatedPost.title}
                        width={400}
                        height={250}
                        className={styles.relatedImg}
                        sizes="(max-width: 768px) 85vw, 380px"
                      />
                    </div>
                    <div className={styles.relatedContent}>
                      <span className={styles.relatedCategory}>
                        {relatedPost.category}
                      </span>
                      <h3 className={styles.relatedCardTitle}>
                        {relatedPost.title}
                      </h3>
                      {relatedPost.excerpt && (
                        <p className={styles.relatedExcerpt}>
                          {relatedPost.excerpt}
                        </p>
                      )}
                      <div className={styles.relatedMeta}>
                        <span>{relatedPost.date}</span>
                        <span>•</span>
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* === CTA === */}
        <div className={styles.ctaBox}>
          <h3>Ready to accelerate your job search?</h3>
          <p>
            Join thousands of international students landing their dream jobs
            in the U.S.
          </p>
          <a
            href="https://www.flashfirejobs.com"
            className={styles.ctaButton}
          >
            Visit FlashFire Jobs
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}

