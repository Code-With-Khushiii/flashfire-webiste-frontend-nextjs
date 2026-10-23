// Tags each <ol> in a post's HTML so its numbering is shown exactly once. This runs
// on the HTML string, so the classes are already in the server-rendered page.
//  - selfNumbered: every item's text already starts with "1.", "2)" etc.
//    (numbers typed into the headings), so the automatic markers are hidden.
//  - qaList: every item opens with an H3-H6 question (styled as Q&A on mobile).
export function classifyOrderedLists(
  html: string,
  classes: { selfNumbered: string; qaList: string }
): string {
  // <ul> frames are tracked only so their items aren't counted for an outer <ol>
  type Frame = { kind: string; tagStart: number; tagEnd: number; items: number[] };
  const stack: Frame[] = [];
  const edits: { tagStart: number; tagEnd: number; className: string }[] = [];
  const tagRe = /<(\/?)(ol|ul|li)\b[^>]*>/gi;
  let m: RegExpExecArray | null;

  while ((m = tagRe.exec(html))) {
    const closing = m[1] === "/";
    const tag = m[2].toLowerCase();
    const end = m.index + m[0].length;
    const frame = stack[stack.length - 1];

    if (tag !== "li" && !closing) {
      stack.push({ kind: tag, tagStart: m.index, tagEnd: end, items: [] });
    } else if (tag === "li" && !closing && frame) {
      // Each item runs to the next <li> of this list (or its </ol>)
      frame.items.push(end);
    } else if (tag !== "li" && closing && frame) {
      stack.pop();
      if (frame.kind !== "ol" || frame.items.length === 0) continue;
      const bodies = frame.items.map((start, i) =>
        html.slice(start, frame.items[i + 1] ?? m!.index)
      );
      const text = (s: string) => s.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ");
      let className = "";
      if (bodies.every((b) => /^\s*\d+[.)]/.test(text(b)))) {
        className = classes.selfNumbered;
      } else if (bodies.every((b) => /^\s*<h[3-6]\b/i.test(b))) {
        className = classes.qaList;
      }
      if (className) edits.push({ tagStart: frame.tagStart, tagEnd: frame.tagEnd, className });
    }
  }

  // Apply from the end so earlier offsets stay valid
  edits.sort((a, b) => b.tagStart - a.tagStart);
  for (const { tagStart, tagEnd, className } of edits) {
    const tag = html.slice(tagStart, tagEnd);
    const withClass = /\sclass=(["'])/i.test(tag)
      ? tag.replace(/\sclass=(["'])/i, (_m, q: string) => ` class=${q}${className} `)
      : tag.replace(/^<ol\b/i, `<ol class="${className}"`);
    html = html.slice(0, tagStart) + withClass + html.slice(tagEnd);
  }
  return html;
}


// Average adult silent-reading speed for web articles
const WORDS_PER_MINUTE = 200;

// "N min" from the real word count of the post's HTML. Posts without content keep
// whatever label they were published with.
export function getReadTime(content?: string, fallback?: string): string {
  const text = (content || "")
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&[a-z]+;|&#\d+;/gi, " ");
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words === 0) return fallback || "";
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min`;
}

// Some posts write step headings as list items: <ol><li>Step title<p>…</p></li></ol>.
// A list should only be a real list, so an <ol> whose every item is a short title
// followed by block content (paragraphs, lists, tables) becomes <h3> + that content.
export function headingListsToHeadings(html: string): string {
  const open = /<ol\b[^>]*>/gi;
  let out = "";
  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = open.exec(html))) {
    if (m.index < last) continue;
    // Find the matching </ol>, counting nested <ol>s
    const tagRe = /<(\/?)ol\b[^>]*>/gi;
    tagRe.lastIndex = m.index + m[0].length;
    let depth = 1;
    let end = -1;
    let t: RegExpExecArray | null;
    while ((t = tagRe.exec(html))) {
      depth += t[1] ? -1 : 1;
      if (depth === 0) {
        end = t.index + t[0].length;
        break;
      }
    }
    if (end === -1) break;

    const inner = html.slice(m.index + m[0].length, end - "</ol>".length);
    const converted = convertItems(inner);
    if (converted !== null) {
      out += html.slice(last, m.index) + converted;
      last = end;
    }
  }
  return out + html.slice(last);
}

function convertItems(inner: string): string | null {
  // Top-level <li>s only; items inside a nested <ul>/<ol> belong to their parent item
  const tagRe = /<(\/?)(ul|ol|li)\b[^>]*>/gi;
  const starts: { tagStart: number; bodyStart: number }[] = [];
  let depth = 0;
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(inner))) {
    if (m[2].toLowerCase() === "li") {
      if (!m[1] && depth === 0) {
        starts.push({ tagStart: m.index, bodyStart: m.index + m[0].length });
      }
    } else {
      depth += m[1] ? -1 : 1;
    }
  }
  if (starts.length === 0) return null;

  const parts: string[] = [];
  for (let i = 0; i < starts.length; i++) {
    const raw = inner.slice(starts[i].bodyStart, starts[i + 1]?.tagStart ?? inner.length);
    // Only top-level items: a nested <ol> inside an item makes the structure ambiguous
    const body = raw.replace(/<\/li>\s*(<\/ol>)?\s*$/i, "");
    const block = body.search(/<(p|ul|ol|table|div|blockquote)\b/i);
    if (block <= 0) return null;
    const title = body
      .slice(0, block)
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!title || title.length > 150 || /[.:]$/.test(title)) return null;
    parts.push(`<h3>${title}</h3>${body.slice(block)}`);
  }
  return parts.join("\n");
}
