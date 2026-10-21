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
