export type FaqItem = { question: string; answer: string };

const strip = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

// "Q:", "Q1.", "Q 1." question markers
const Q_PREFIX = /^Q(?:\s*\d+\s*[.:)]?|\s*[.:)])\s*/i;

const isFaqHeading = (text: string) => /faq|frequently asked/i.test(text);

const A_PREFIX = /^A\s*[.:)]\s*/i;

// "<p>Q. question<br/>A. answer</p>" -> one item, or null when it isn't that shape (the "A." marker is optional)
function inlineQa(block: string): FaqItem | null {
  const [q, ...rest] = block.split(/<br\s*\/?>/i).map(strip);
  const a = rest.join(" ").trim();
  if (!(Q_PREFIX.test(q) || q.endsWith("?")) || !a) return null;
  const question = q.replace(/^\d+[.)]\s*/, "").replace(Q_PREFIX, "");
  const answer = a.replace(A_PREFIX, "");
  return question && answer ? { question, answer } : null;
}

// Pulls the FAQs a post actually shows on the page so the FAQPage schema matches
// the visible content. Handles two authored shapes under the FAQ <h2>:
//  - <h3>/<h4> question followed by its answer paragraphs / list items
//  - <p>Q: question</p> followed by <p>A. answer</p>
//  - a single <p>Q. question<br/>A. answer</p> (also "1. question?<br/>answer")
// Plain string parsing (no DOMParser) keeps it usable during server rendering.
export function extractFaqItems(content?: string): FaqItem[] {
  if (!content) return [];
  const blocks = content.match(/<(h2|h3|h4|p|li)\b[^>]*>[\s\S]*?<\/\1>/gi) || [];
  const tagOf = (b: string) => b.slice(1, b.search(/[\s>]/)).toLowerCase();

  const start = blocks.findIndex((b) => tagOf(b) === "h2" && isFaqHeading(strip(b)));
  if (start === -1) return [];

  const items: FaqItem[] = [];
  let question = "";
  let answer: string[] = [];
  const flush = () => {
    const text = answer.join(" ").replace(/^A[.:]\s*/i, "").trim();
    if (question && text) items.push({ question, answer: text });
    question = "";
    answer = [];
  };

  for (let i = start + 1; i < blocks.length; i++) {
    const block = blocks[i];
    const tag = tagOf(block);
    const text = strip(block);
    if (tag === "h2") break;
    if (tag === "h3" || tag === "h4") {
      flush();
      question = text.replace(/^\d+[.)]\s*/, "").replace(Q_PREFIX, "");
    } else if (tag === "p" && /<br\s*\/?>/i.test(block) && inlineQa(block)) {
      flush();
      items.push(inlineQa(block)!);
    } else if (tag === "p" && Q_PREFIX.test(text)) {
      flush();
      question = text.replace(Q_PREFIX, "");
    } else if (question && text) {
      answer.push(text);
    }
  }
  flush();
  return items;
}

const norm = (s: string) =>
  strip(s).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// The page renders the post title as the H1. When the article's first H1/H2
// repeats it, drop that heading instead of showing the title twice.
export function removeLeadingTitleHeading(html: string, title: string): string {
  const m = html.match(/<h([12])\b[^>]*>([\s\S]*?)<\/h\1>/i);
  if (!m || norm(m[2]) !== norm(title)) return html;
  const at = m.index ?? 0;
  return html.slice(0, at) + html.slice(at + m[0].length);
}
