import { NextRequest, NextResponse } from "next/server";

const GITHUB_API = "https://api.github.com";
const BLOGS_FILE_PATH = "src/data/blogsData.ts";

interface BlogPayload {
  slug: string;
  title: string;
  metaTitle: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: { name: string; bio: string; image?: string };
  image: string;
  categoryColor: string;
  content: string;
  secretKey: string;
}

function escapeForTemplateLiteral(str: string): string {
  return str.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

function serializeStringArray(arr: string[]): string {
  return `[${arr.map((s) => `"${s.replace(/"/g, '\\"')}"`).join(", ")}]`;
}

function buildBlogEntry(blog: BlogPayload, id: number): string {
  const authorImage = blog.author.image ? `\n      image: "${blog.author.image}",` : "";
  const content = escapeForTemplateLiteral(blog.content);

  return `  {
    id: ${id},
    slug: "${blog.slug}",
    title: "${blog.title.replace(/"/g, '\\"')}",
    metaTitle: "${blog.metaTitle.replace(/"/g, '\\"')}",
    excerpt: "${blog.excerpt.replace(/"/g, '\\"')}",
    date: "${blog.date}",
    lastUpdated: "${blog.date}",
    readTime: "${blog.readTime}",
    category: "${blog.category}",
    tags: ${serializeStringArray(blog.tags)},
    author: {
      name: "${blog.author.name}",
      bio: "${blog.author.bio.replace(/"/g, '\\"')}",${authorImage}
    },
    image: "${blog.image}",
    categoryColor: "${blog.categoryColor}",
    content: \`${content}\`,
  }`;
}

export async function POST(req: NextRequest) {
  try {
    const body: BlogPayload = await req.json();

    if (body.secretKey !== process.env.BLOG_ADMIN_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug, title, metaTitle, excerpt, date, readTime, category, tags, author, image, categoryColor, content } = body;

    if (!slug || !title || !metaTitle || !excerpt || !content || !image) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_PAT;
    const githubOwner = process.env.GITHUB_REPO_OWNER;
    const githubRepo = process.env.GITHUB_REPO_NAME;
    const githubBranch = process.env.GITHUB_BRANCH || "main";

    if (!githubToken || !githubOwner || !githubRepo) {
      return NextResponse.json({ error: "GitHub environment variables not configured" }, { status: 500 });
    }

    // 1. Fetch current file from GitHub
    const fileRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/contents/${BLOGS_FILE_PATH}?ref=${githubBranch}`,
      {
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!fileRes.ok) {
      const err = await fileRes.json();
      return NextResponse.json({ error: "Failed to fetch blogsData.ts from GitHub", detail: err }, { status: 500 });
    }

    const fileData = await fileRes.json();
    const currentContent = Buffer.from(fileData.content, "base64").toString("utf-8");
    const fileSha = fileData.sha;

    // 2. Check slug doesn't already exist
    if (currentContent.includes(`slug: "${slug}"`)) {
      return NextResponse.json({ error: `Slug "${slug}" already exists in blogsData.ts` }, { status: 409 });
    }

    // 3. Determine next ID by finding the highest existing id
    const idMatches = [...currentContent.matchAll(/id:\s*(\d+)/g)];
    const maxId = idMatches.reduce((max, m) => Math.max(max, parseInt(m[1], 10)), 0);
    const newId = maxId + 1;

    // 4. Build new blog entry string
    const newEntry = buildBlogEntry(
      { slug, title, metaTitle, excerpt, date, readTime, category, tags, author, image, categoryColor, content, secretKey: "" },
      newId
    );

    // 5. Insert new entry at the start of the array (after the opening `concat([`)
    // The file pattern is: blogPosts: BlogPost[] = (([] as any[]).concat([
    const insertMarker = ".concat([";
    const insertIndex = currentContent.indexOf(insertMarker);

    if (insertIndex === -1) {
      return NextResponse.json({ error: "Could not find insertion point in blogsData.ts" }, { status: 500 });
    }

    const insertAt = insertIndex + insertMarker.length;
    const newContent =
      currentContent.slice(0, insertAt) +
      "\n" +
      newEntry +
      ",\n" +
      currentContent.slice(insertAt);

    // 6. Commit to GitHub
    const encodedContent = Buffer.from(newContent, "utf-8").toString("base64");

    const commitRes = await fetch(
      `${GITHUB_API}/repos/${githubOwner}/${githubRepo}/contents/${BLOGS_FILE_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${githubToken}`,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `blog: add "${title}"`,
          content: encodedContent,
          sha: fileSha,
          branch: githubBranch,
        }),
      }
    );

    if (!commitRes.ok) {
      const err = await commitRes.json();
      return NextResponse.json({ error: "Failed to commit to GitHub", detail: err }, { status: 500 });
    }

    const commitData = await commitRes.json();

    return NextResponse.json({
      success: true,
      blogId: newId,
      slug,
      commitUrl: commitData.commit?.html_url,
      message: `Blog "${title}" published successfully as id ${newId}.`,
    });
  } catch (err) {
    console.error("publish-blog error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
