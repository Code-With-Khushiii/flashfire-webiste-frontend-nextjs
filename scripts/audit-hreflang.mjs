#!/usr/bin/env node
/**
 * SEO audit for the country trees. Run it against a production server:
 *
 *   npm run build && npx next start -p 3000   # in one terminal
 *   node scripts/audit-hreflang.mjs http://localhost:3000
 *
 * Exits 1 and lists every problem when any of these break:
 *  - a sitemap URL is not a 200, indexable, self-canonical page
 *  - a country-tree page has no hreflang cluster
 *  - a cluster lacks its self-reference or x-default, uses a bad code
 *    (region must be uppercase) or a non-absolute / trailing-slash URL
 *  - a cluster target is not a 200, indexable, self-canonical page, is not
 *    reciprocal (it must list the exact same cluster), or an EU target is
 *    missing from the sitemap
 *  - an EU page lacks its country in title, description, og:title,
 *    og:description, or its og:url differs from the canonical
 *  - /en-us serves content instead of redirecting to the root page
 *
 * This is the guard against "a page got a country version but the root page
 * never learned about it": the root page is a cluster target, so it fails here.
 */
import fs from "node:fs";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const SITE = "https://www.flashfirejobs.com";
const CONCURRENCY = 8;

const names = Object.fromEntries(
  [...fs.readFileSync("src/utils/locale.ts", "utf8").matchAll(/prefix: "\/en-([a-z]{2})"[^}]*?name: "([^"]+)"/g)].map((m) => [m[1], m[2]])
);
const isTreeUrl = (u) => /^https:\/\/www\.flashfirejobs\.com\/en-[a-z]{2}(\/|$)/.test(u);
const isEuUrl = (u) => isTreeUrl(u) && !/\/en-(ca|gb|au)(\/|$)/.test(u);

const dec = (s) => s?.replace(/&amp;/g, "&").replace(/&#x27;/g, "'").replace(/&quot;/g, '"');
const metaTag = (h, attr, name) => {
  const m = h.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`, "i"));
  return m ? dec((m[0].match(/content="([^"]*)"/) || [])[1]) : undefined;
};

const problems = [];
const bad = (msg) => problems.push(msg);
const cache = new Map();

async function get(url) {
  if (!cache.has(url)) {
    cache.set(
      url,
      (async () => {
        const r = await fetch(url.replace(SITE, base), { redirect: "manual", signal: AbortSignal.timeout(30000) });
        const h = r.status === 200 ? await r.text() : "";
        const hreflang = [...h.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], dec(m[2])]);
        return {
          status: r.status,
          location: r.headers.get("location"),
          canonical: dec((h.match(/<link rel="canonical" href="([^"]+)"/) || [])[1]),
          robots: metaTag(h, "name", "robots") || "",
          hreflang,
          title: dec((h.match(/<title>([^<]*)<\/title>/) || [])[1]),
          description: metaTag(h, "name", "description"),
          ogTitle: metaTag(h, "property", "og:title"),
          ogDescription: metaTag(h, "property", "og:description"),
          ogUrl: metaTag(h, "property", "og:url"),
        };
      })()
    );
  }
  return cache.get(url);
}

async function pool(items, fn) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) await fn(queue.shift());
    })
  );
}

const key = (p) => p.hreflang.map((l) => l.join("=")).join("|");
const indexable = (p) => p.status === 200 && !/noindex/.test(p.robots);

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const inSitemap = new Set(sitemapUrls);
console.log(`sitemap: ${sitemapUrls.length} urls`);

// 1. Every sitemap URL is indexable and self-canonical; tree pages carry a cluster.
await pool(sitemapUrls, async (u) => {
  const p = await get(u);
  if (!indexable(p)) return bad(`${u} in sitemap but status ${p.status} ${p.robots}`);
  if (p.canonical !== u) bad(`${u} canonical is ${p.canonical}`);
  if (isTreeUrl(u) && !p.hreflang.length) bad(`${u} is a country page with no hreflang`);
});

// 2. Clusters: shape, self-reference, then every target.
const targets = new Map(); // url -> cluster key it was listed in
for (const u of sitemapUrls) {
  const p = await get(u);
  if (!p.hreflang.length) continue;
  const k = key(p);
  const self = p.hreflang.filter(([c, href]) => c !== "x-default" && href === u);
  if (self.length !== 1) bad(`${u} lists itself ${self.length} times`);
  if (!p.hreflang.some(([c]) => c === "x-default")) bad(`${u} has no x-default`);
  for (const [code, href] of p.hreflang) {
    if (code !== "x-default" && !/^[a-z]{2}-[A-Z]{2}$/.test(code)) bad(`${u} bad hreflang code ${code}`);
    if (!href.startsWith(SITE) || (href.endsWith("/") && href !== `${SITE}/`)) bad(`${u} bad hreflang url ${href}`);
    if (!targets.has(href)) targets.set(href, new Set());
    targets.get(href).add(k);
  }
}
console.log(`hreflang targets: ${targets.size}`);
await pool([...targets], async ([u, keys]) => {
  const p = await get(u);
  if (!indexable(p)) return bad(`target ${u} status ${p.status} ${p.robots}`);
  if (p.canonical !== u) bad(`target ${u} canonical is ${p.canonical}`);
  if (!p.hreflang.length) return bad(`target ${u} has no hreflang tags, so it does not link back (missing return links)`);
  if (!keys.has(key(p)) || keys.size > 1) bad(`target ${u} lists a different cluster than the pages pointing at it`);
  if (isTreeUrl(u) && !inSitemap.has(u)) bad(`target ${u} is not in the sitemap`);
});

// 3. EU copy and meta.
await pool(sitemapUrls.filter(isEuUrl), async (u) => {
  const p = await get(u);
  const name = names[u.match(/\/en-([a-z]{2})/)[1]];
  for (const [k, v] of [["title", p.title], ["description", p.description], ["og:title", p.ogTitle], ["og:description", p.ogDescription]]) {
    if (!v || !v.includes(name)) bad(`${u} ${k} lacks "${name}": ${v}`);
    if (v && /\b(EU|Europe|UK)\b/.test(v)) bad(`${u} ${k} has stray EU/UK wording: ${v}`);
  }
  if (p.ogUrl !== u) bad(`${u} og:url is ${p.ogUrl}`);
});

// 4. No /en-us tree.
for (const path of ["/en-us", "/en-us/pricing", "/en-us/ai-job-alerts"]) {
  const p = await get(`${SITE}${path}`);
  const want = `${SITE}${path.replace("/en-us", "") || "/"}`;
  const target = new URL(p.location || "", SITE).href.replace(base, SITE);
  if (![301, 308].includes(p.status) || target !== want) {
    bad(`${path} should redirect to ${want}, got ${p.status} ${p.location}`);
  }
}

console.log(`checked ${cache.size} pages, ${problems.length} problems`);
if (problems.length) {
  console.log(problems.join("\n"));
  process.exit(1);
}
