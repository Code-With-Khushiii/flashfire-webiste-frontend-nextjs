"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import Image, { getImageProps } from "next/image";
import styles from "./blogsPage.module.css";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
} from "@/src/utils/PostHogTracking";
import posthog from "posthog-js";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Link from "next/link";
import { FaLinkedinIn, FaFacebookF, FaTwitter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { categoryToSlug, tagToSlug } from "@/src/utils/blogCategoryUtils";
import { toIsoDate } from "@/src/utils/blogDates";
import { classifyOrderedLists } from "@/src/utils/blogContent";

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
}: {
  post: BlogPost;
  relatedArticles: RelatedPost[];
}) {
  const [activeSection, setActiveSection] = useState<string>("");
  // The tags chosen for this post when it was published
  const postTags = useMemo(
    () => Array.from(new Set((post.tags || []).map((t) => t.trim()).filter(Boolean))),
    [post.tags]
  );

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
      const html = (post?.content || "")
        .replace(/<h1(\b[^>]*)>/gi, "<h2$1>")
        .replace(/<\/h1>/gi, "</h2>")
        // Body images sit below the hero, so the browser fetches them only near the viewport
        .replace(/<img\b(?![^>]*\bloading=)/gi, '<img loading="lazy"');
      // Never skip a heading level (e.g. H2 -> H4): the H1 is the post title, so
      // the first heading may be an H2 and each later one at most one level deeper.
      let prev = 1;
      const levels: number[] = [];
      const leveled = html
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
      return classifyOrderedLists(leveled, {
        selfNumbered: styles.selfNumbered,
        qaList: styles.qaList,
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

  const lastUpdated = post.lastUpdated || post.date;
  const publishedIso = toIsoDate(post.date);
  const updatedIso = toIsoDate(lastUpdated);

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
      name: post.author?.name || "Flashfire",
      ...(post.author?.name && {
        url: `https://www.flashfirejobs.com/author/${post.author.name.toLowerCase().replace(/\s+/g, "-")}`,
      }),
    },
    publisher: {
      "@type": "Organization",
      name: "FlashFire Jobs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.flashfirejobs.com/images/flashfire-logo.png",
        width: 472,
        height: 472,
      },
    },
    datePublished: publishedIso,
    dateModified: updatedIso,
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

  // Keep the active item visible inside the sidebar TOC while the article scrolls
  const sidebarTocRef = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const list = sidebarTocRef.current;
    const active = list?.querySelector<HTMLElement>('[data-toc-active="true"]');
    if (!list || !active) return;
    const top = active.offsetTop - list.offsetTop;
    if (top < list.scrollTop || top + active.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTo({ top: top - list.clientHeight / 3, behavior: "smooth" });
    }
  }, [activeSection]);

  const renderTocList = (ref?: React.Ref<HTMLOListElement>) => (
    <ol className={styles.tocList} ref={ref}>
      {tableOfContents.map((item, index) => (
        <li
          key={index}
          data-toc-active={activeSection === item.anchor}
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

  // Hero image is a real <img> in the server HTML. On desktop it is fetched with
  // high priority; on phones the <source> swaps in a blank inline GIF, so the
  // browser never requests the cover image at all.
  const heroSrc = post.image || post.coverImage || "";
  const heroImgProps = heroSrc
    ? getImageProps({
        src: heroSrc,
        alt: post.title,
        width: 1200,
        height: 630,
        quality: 85,
        sizes: "(max-width: 1024px) 100vw, 600px",
        loading: "eager",
        fetchPriority: "high",
      }).props
    : null;

  // Related articles carousel: 4 cards visible, arrows scroll through the rest
  // The sticky sidebar sits below the sticky promo bar + navbar, whose height
  // changes with the viewport, so it is measured rather than hard-coded
  const pageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = document.querySelector<HTMLElement>(".sticky.top-0");
    const page = pageRef.current;
    if (!header || !page) return;
    const update = () => page.style.setProperty("--sticky-header", `${header.offsetHeight}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const relatedTrackRef = useRef<HTMLDivElement>(null);
  const [relatedScroll, setRelatedScroll] = useState({ prev: false, next: false });
  const updateRelatedScroll = useCallback(() => {
    const track = relatedTrackRef.current;
    if (!track) return;
    setRelatedScroll({
      prev: track.scrollLeft > 4,
      next: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  }, []);

  useEffect(() => {
    updateRelatedScroll();
    window.addEventListener("resize", updateRelatedScroll);
    return () => window.removeEventListener("resize", updateRelatedScroll);
  }, [updateRelatedScroll, relatedArticles.length]);

  const scrollRelated = (direction: 1 | -1) => {
    const track = relatedTrackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0") : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: "smooth" });
  };

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
      <main ref={pageRef} className={styles.pageWrapper}>
        {/* === HERO: breadcrumb, date, title, author | cover image === */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <nav className={styles.breadcrumb} aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true"> &gt; </span>
              <Link href="/blog">Blog</Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true"> &gt; </span>
              <Link href={`/blog/${categoryToSlug(post.category || "")}`}>{post.category}</Link>
              <span className={styles.breadcrumbSeparator} aria-hidden="true"> &gt; </span>
              <span className={styles.breadcrumbCurrent} title={post.title}>{post.title}</span>
            </nav>

            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <div className={styles.dateInfo}>
                  <span className={styles.dateItem}>
                    <span className={styles.dateLabel}>Published:</span>{" "}
                    <time dateTime={publishedIso}>{post.date}</time>
                  </span>
                  {lastUpdated && (
                    <>
                      <span className={styles.dateSeparator} aria-hidden="true">|</span>
                      <span className={styles.dateItem}>
                        <span className={styles.dateLabel}>Last updated:</span>{" "}
                        <time dateTime={updatedIso}>{lastUpdated}</time>
                      </span>
                    </>
                  )}
                  {post.readTime && (
                    <>
                      <span className={styles.dateSeparator} aria-hidden="true">|</span>
                      <span className={styles.readTime}>{post.readTime} read</span>
                    </>
                  )}
                </div>

                <h1 className={styles.title}>{post.title}</h1>

                {/* === AUTHOR === */}
                <div className={styles.authorInfo}>
                  {post.author?.image && (
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      loading="eager"
                      className={styles.authorImage}
                      sizes="40px"
                    />
                  )}
                  <div>
                    {post.author?.name ? (
                      <Link
                        href={`/author/${post.author.name.replace(/\s+/g, "-").toLowerCase()}`}
                        className={styles.authorNameLink}
                      >
                        <span className={styles.authorName}>By {post.author.name}</span>
                      </Link>
                    ) : (
                      <span className={styles.authorName}>By Debashri Mandal</span>
                    )}
                    {post.author?.bio && (
                      <p className={styles.authorBio}>{post.author.bio}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* === HERO IMAGE (desktop/tablet only) === */}
              {heroImgProps && (
                <div className={styles.imageWrapper}>
                  <picture>
                    <source
                      media="(max-width: 768px)"
                      srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    />
                    {/* alt comes from heroImgProps */}
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    <img {...heroImgProps} className={styles.image} />
                  </picture>
                </div>
              )}
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
                <nav aria-label="In this article">{renderTocList()}</nav>
              </details>
            )}

            {/* === ARTICLE CONTENT === */}
            <article
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* === TAGS (the post's own tags; each links to its tag listing) === */}
            {postTags.length > 0 && (
              <div className={styles.tagsWrapper}>
                {postTags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tagToSlug(tag)}`}
                    className={styles.tag}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
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
                {renderTocList(sidebarTocRef)}
              </nav>
            )}

            {/* === LEAD MAGNET === */}
            <div className={styles.leadMagnet}>
              <p className={styles.leadMagnetTitle}>Free ATS Resume Check</p>
              <p>See how your resume scores against applicant tracking systems before you apply.</p>
              <Link href="/ats-score-checker" className={styles.ctaButton}>
                Check my resume
              </Link>
            </div>
          </aside>
        </div>

        {/* === RELATED ARTICLES === */}
        {relatedArticles.length > 0 && (
          <aside className={styles.relatedSection} aria-label="Related articles">
            <div className={styles.relatedHeader}>
              <p className={styles.relatedTitle}>Related Articles</p>
              {(relatedScroll.prev || relatedScroll.next) && (
                <div className={styles.relatedArrows}>
                  <button
                    type="button"
                    className={styles.relatedArrow}
                    onClick={() => scrollRelated(-1)}
                    disabled={!relatedScroll.prev}
                    aria-label="Previous related articles"
                  >
                    <FaChevronLeft aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.relatedArrow}
                    onClick={() => scrollRelated(1)}
                    disabled={!relatedScroll.next}
                    aria-label="Next related articles"
                  >
                    <FaChevronRight aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
            <div
              ref={relatedTrackRef}
              className={styles.relatedTrack}
              onScroll={updateRelatedScroll}
            >
              {relatedArticles.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className={styles.relatedCard}
                >
                  <div className={styles.relatedImage}>
                    {(relatedPost.image || relatedPost.coverImage) && (
                      <Image
                        src={relatedPost.image || relatedPost.coverImage || ""}
                        alt={relatedPost.title}
                        width={400}
                        height={250}
                        loading="lazy"
                        className={styles.relatedImg}
                        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 300px"
                      />
                    )}
                  </div>
                  <div className={styles.relatedContent}>
                    {relatedPost.category && (
                      <span className={styles.relatedCategory}>
                        {relatedPost.category}
                      </span>
                    )}
                    <p className={styles.relatedCardTitle}>{relatedPost.title}</p>
                    {relatedPost.excerpt && (
                      <p className={styles.relatedExcerpt}>{relatedPost.excerpt}</p>
                    )}
                    <div className={styles.relatedMeta}>
                      <span>{relatedPost.date}</span>
                      {relatedPost.readTime && (
                        <>
                          <span aria-hidden="true">•</span>
                          <span>{relatedPost.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}

        {/* === CTA === */}
        <aside className={styles.ctaBox} aria-label="FlashFire Jobs">
          <p className={styles.ctaTitle}>Ready to accelerate your job search?</p>
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
        </aside>
      </main>
      <Footer />
    </>
  );
}
