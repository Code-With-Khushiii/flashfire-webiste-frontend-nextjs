#!/usr/bin/env node
/**
 * Emits src/utils/localeRoutes.generated.ts: the set of paths that actually
 * exist inside each locale tree.
 *
 * The middleware needs this because the root tree has ~85 routes while the
 * locale trees have ~67. Redirecting a UK visitor from a root-only path like
 * /job-application-automation to /en-gb/job-application-automation would 404
 * them. Middleware runs on the Edge runtime and cannot read the filesystem,
 * so the list has to be baked in at build time.
 *
 * Wired to `prebuild`, so it regenerates on every build and cannot drift.
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const APP = path.join(root, "app");
const OUT = path.join(root, "src", "utils", "localeRoutes.generated.ts");

const TREES = fs
  .readdirSync(APP, { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^en-[a-z]{2}$/.test(e.name))
  .map((e) => e.name)
  .sort();

function routesFor(tree) {
  const base = path.join(APP, tree);
  const found = new Set();

  (function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        // Route groups (folder) and parallel routes (@folder) don't add a segment.
        if (entry.name.startsWith("[")) continue; // dynamic: can't match literally
        walk(full);
      } else if (/^page\.(tsx|ts|jsx|js)$/.test(entry.name)) {
        const rel = path.relative(base, dir).split(path.sep).filter(Boolean);
        if (rel.some((s) => s.startsWith("(") || s.startsWith("@"))) continue;
        found.add("/" + rel.join("/"));
      }
    }
  })(base);

  // The tree root itself, e.g. /en-gb
  if (found.has("/")) found.delete("/");
  found.add("/");
  return [...found].sort();
}

const entries = TREES.map((tree) => [`/${tree}`, routesFor(tree)]);

const body = entries
  .map(
    ([prefix, list]) =>
      `  "${prefix}": new Set([\n${list.map((r) => `    ${JSON.stringify(r)},`).join("\n")}\n  ]),`
  )
  .join("\n");

fs.writeFileSync(
  OUT,
  `// GENERATED FILE — do not edit by hand.
// Run \`node scripts/generate-locale-routes.mjs\` (or any \`npm run build\`) to refresh.
//
// Paths, relative to each locale prefix, that have a real page in that tree.
// The middleware checks this before geo-redirecting so it never sends a
// visitor to a URL that does not exist.

export const LOCALE_ROUTES: Record<string, ReadonlySet<string>> = {
${body}
};

/** True when \`subPath\` (e.g. "/pricing") has a page under \`prefix\` (e.g. "/en-gb"). */
export function localeHasRoute(prefix: string, subPath: string): boolean {
  const normalized = subPath.length > 1 && subPath.endsWith("/") ? subPath.slice(0, -1) : subPath;
  return LOCALE_ROUTES[prefix]?.has(normalized || "/") ?? false;
}
`
);

console.log(
  `generated ${path.relative(root, OUT)}: ` +
    entries.map(([p, l]) => `${p}=${l.length}`).join(", ")
);
