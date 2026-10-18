import Link from "next/link";
import { getAllCategorySlugs, slugToCategory } from "@/src/utils/blogCategoryUtils";

type Post = { slug: string; title: string; excerpt?: string };

type Props = {
  kind: "category" | "tag";
  name: string;
  posts: Post[];
};

/**
 * Server-rendered listing shown while the client listing hydrates. Crawlers
 * (and no-JS users) get a real H1, intro copy, an H2 and crawlable links
 * instead of an empty "Loading blogs..." placeholder.
 */
export default function BlogListingSeo({ kind, name, posts }: Props) {
  const label = kind === "category" ? "category" : "topic";
  const featured = posts.slice(0, 3).map((post) => post.title);
  const related = getAllCategorySlugs()
    .map((slug) => ({ slug, label: slugToCategory(slug) }))
    .filter((c) => c.label && c.label !== name)
    .slice(0, 12);
  return (
    <section style={{ padding: "6rem 2rem 2rem", maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "1rem" }}>
        {kind === "category" ? `Blogs in ${name}` : `Blogs tagged: ${name}`}
      </h1>
      <p style={{ marginBottom: "1.5rem", lineHeight: 1.7 }}>
        Browse {posts.length} Flashfire {posts.length === 1 ? "article" : "articles"} in the {name} {label}.
        Our guides cover resumes, cover letters, interviews, visas and AI-powered job search so you can apply
        smarter and get hired faster.
      </p>
      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: "1rem" }}>
        Latest {name} articles
      </h2>
      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "1rem" }}>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} style={{ fontWeight: 600 }}>
              {post.title}
            </Link>
            {post.excerpt && <p style={{ margin: "0.25rem 0 0", lineHeight: 1.6 }}>{post.excerpt}</p>}
          </li>
        ))}
      </ul>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "2rem 0 1rem" }}>
        What you will find in {name}
      </h2>
      <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
        Every article in {name} is written for job seekers who want practical steps, not theory.
        {featured.length > 0 && ` Start with ${featured.join(", ")}.`} Each guide explains what to do, why it
        works and how to apply it to your own applications, with examples you can adapt. Whether you are a
        fresh graduate, an international student or an experienced professional changing roles, you can read
        a single article in a few minutes and act on it the same day.
      </p>
      <p style={{ marginBottom: "1rem", lineHeight: 1.7 }}>
        Our team reviews and updates these articles as hiring practices, applicant tracking systems and visa
        rules change, so the advice stays current. Pair the reading with Flashfire&apos;s free tools, such as
        the resume keyword scanner and the salary calculators, to put what you learn into practice.
      </p>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "2rem 0 1rem" }}>
        How to get the most from these guides
      </h2>
      <ol style={{ paddingLeft: "1.25rem", listStyle: "decimal", lineHeight: 1.7, marginBottom: "1rem" }}>
        <li>Pick the article that matches your current stage, such as writing a resume, preparing for an interview or comparing offers.</li>
        <li>Note two or three actions from it and apply them to your resume or applications straight away.</li>
        <li>Come back to the {name} {label} each week for new articles as we publish them.</li>
        <li>If you would rather not spend hours applying, Flashfire&apos;s team can apply to matching jobs for you.</li>
      </ol>

      <h2 style={{ fontSize: "1.5rem", fontWeight: 600, margin: "2rem 0 1rem" }}>Related blog categories</h2>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
        {related.map((c) => (
          <li key={c.slug}>
            <Link href={`/blog/${c.slug}`} style={{ textDecoration: "underline" }}>
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
