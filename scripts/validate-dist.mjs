import { access, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const docs = JSON.parse(await readFile(path.join(root, "src", "data", "docs.json"), "utf8"));
const failures = [];
const htmlFiles = ["index.html", "download/index.html", "docs/index.html", "changelog/index.html", "404.html", ...docs.map((doc) => `${doc.path.slice(1)}index.html`)];

async function exists(file) { try { await access(file); return true; } catch { return false; } }

function stripTags(value) {
  return String(value).replace(/<[^>]+>/g, " ").replace(/&nbsp;|&#160;/g, " ").replace(/\s+/g, " ").trim();
}

function validateSemanticHtml(relative, html) {
  const issues = [];
  if (!/<html\s+[^>]*lang="zh-CN"/i.test(html)) issues.push(`missing zh-CN language: ${relative}`);
  if (!/<meta\s+name="viewport"/i.test(html)) issues.push(`missing viewport: ${relative}`);
  if (!/<link\s+rel="canonical"/i.test(html)) issues.push(`missing canonical URL: ${relative}`);
  if ((html.match(/<h1\b/gi) || []).length !== 1) issues.push(`expected exactly one h1: ${relative}`);
  if (!html.includes('class="skip-link"')) issues.push(`missing skip link: ${relative}`);

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) issues.push(`duplicate id ${id}: ${relative}`);
    seen.add(id);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\salt=("[^"]*"|'[^']*')/i.test(match[0])) issues.push(`image without alt: ${relative}`);
  }
  for (const match of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) {
    const attributes = match[1];
    if (!/\saria-label=("[^"]+"|'[^']+')/i.test(attributes) && !stripTags(match[2])) {
      issues.push(`button without accessible name: ${relative}`);
    }
  }
  for (const match of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const attributes = match[1];
    if (!/\saria-label=("[^"]+"|'[^']+')/i.test(attributes) && !stripTags(match[2])) {
      issues.push(`link without accessible name: ${relative}`);
    }
  }
  return issues;
}

function targetFor(href) {
  const clean = href.split("#")[0].split("?")[0];
  if (!clean || clean === "/") return path.join(dist, "index.html");
  return clean.endsWith("/") ? path.join(dist, clean.slice(1), "index.html") : path.join(dist, clean.slice(1));
}

for (const relative of htmlFiles) {
  const file = path.join(dist, relative);
  if (!(await exists(file))) { failures.push(`missing output: ${relative}`); continue; }
  const html = await readFile(file, "utf8");
  if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`missing title: ${relative}`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`missing description: ${relative}`);
  if (!html.includes("site-header") || !html.includes("site-footer")) failures.push(`missing shared shell: ${relative}`);
  if (/\{\{|\}\}|undefined\/undefined/.test(html)) failures.push(`unresolved token: ${relative}`);
  failures.push(...validateSemanticHtml(relative, html));
  for (const match of html.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
    const href = match[1];
    if (href.startsWith("//")) continue;
    if (!(await exists(targetFor(href)))) failures.push(`${relative} references missing ${href}`);
  }
}

const assetBudgets = new Map([["assets/styles.css", 100_000], ["assets/client.js", 40_000], ["og-image.jpg", 250_000]]);
for (const relative of ["assets/styles.css", "assets/client.js", "search-index.json", "sitemap.xml", "build-meta.json", "release-data.json", "favicon.svg", "manifest.webmanifest", "og-image.jpg"]) {
  const file = path.join(dist, relative);
  if (!(await exists(file))) failures.push(`missing asset: ${relative}`);
  else {
    const size = (await stat(file)).size;
    if (size === 0) failures.push(`empty asset: ${relative}`);
    const budget = assetBudgets.get(relative);
    if (budget && size > budget) failures.push(`asset exceeds ${budget} byte budget: ${relative} (${size})`);
  }
}

const search = JSON.parse(await readFile(path.join(dist, "search-index.json"), "utf8"));
if (!Array.isArray(search.pages) || search.pages.length !== docs.length + 4) failures.push(`search index page count mismatch: ${search.pages?.length}`);
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
if (!sitemap.includes("https://p2wlan.yhan.fun/docs/")) failures.push("sitemap is missing docs home");

if (failures.length) {
  console.error([...new Set(failures)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log(`dist validation passed: ${htmlFiles.length} HTML files`);
