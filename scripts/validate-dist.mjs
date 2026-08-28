import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE } from "../src/content.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const distDir = path.join(rootDir, "dist");
const errors = [];

function fail(message) {
  errors.push(message);
}

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walk(full)));
    else output.push(full);
  }
  return output;
}

function expectedTarget(href, sourcePath) {
  if (href.startsWith("/")) {
    const clean = href.split(/[?#]/, 1)[0];
    if (clean === "/") return path.join(distDir, "index.html");
    if (/\.[a-z0-9]+$/i.test(clean)) return path.join(distDir, clean.slice(1));
    return path.join(distDir, clean.replace(/^\/+|\/+$/g, ""), "index.html");
  }
  const clean = href.split(/[?#]/, 1)[0];
  if (!clean) return sourcePath;
  const target = path.resolve(path.dirname(sourcePath), clean);
  return /\.[a-z0-9]+$/i.test(target) ? target : path.join(target, "index.html");
}

const files = await walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 19) fail(`生成 HTML 数量异常：${htmlFiles.length}`);

const forbidden = [
  "Open Shell",
  "mock backend",
  "MCP 写操作",
  "AI 自动发送",
  "仅供学习、研究和非商业使用",
  "/#/docs",
  `${SITE.origin}docs/`,
];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const rel = path.relative(distDir, file);
  for (const required of ["<title>", 'name="description"', 'rel="canonical"', 'property="og:title"', 'application/ld+json']) {
    if (!html.includes(required)) fail(`${rel} 缺少 ${required}`);
  }
  for (const phrase of forbidden) {
    if (html.includes(phrase)) fail(`${rel} 出现禁用内容：${phrase}`);
  }

  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  if (new Set(ids).size !== ids.length) fail(`${rel} 存在重复 id`);

  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    if (/^https?:\/\//.test(href)) continue;
    const target = expectedTarget(href, file);
    try {
      const info = await stat(target);
      if (!info.isFile()) fail(`${rel} 内链不是文件：${href}`);
    } catch {
      fail(`${rel} 存在断链：${href}`);
    }
  }
}

for (const required of [
  "CNAME",
  "robots.txt",
  "sitemap.xml",
  "search-index.json",
  "build-meta.json",
  "manifest.webmanifest",
  "favicon.svg",
  "og-image.jpg",
  "apple-touch-icon.png",
  "assets/styles.css",
  "assets/client.js",
]) {
  try {
    await stat(path.join(distDir, required));
  } catch {
    fail(`缺少构建产物：${required}`);
  }
}

try {
  const index = JSON.parse(await readFile(path.join(distDir, "search-index.json"), "utf8"));
  if (!Array.isArray(index.pages) || index.pages.length < 19) fail("全文搜索索引页面数不足");
  for (const page of index.pages || []) {
    if (!page.url || !page.title || !page.text || page.text.length < 80) fail(`搜索索引条目无效：${page.url || "unknown"}`);
  }
} catch (error) {
  fail(`全文搜索索引无效：${error.message}`);
}

try {
  const cssBytes = (await stat(path.join(distDir, "assets/styles.css"))).size;
  const jsBytes = (await stat(path.join(distDir, "assets/client.js"))).size;
  if (cssBytes > 64 * 1024) fail(`CSS 超过 64 KiB 预算：${cssBytes}`);
  if (jsBytes > 32 * 1024) fail(`JS 超过 32 KiB 预算：${jsBytes}`);
} catch {
  // Missing files are reported above.
}

if (errors.length > 0) {
  console.error(`dist validation failed (${errors.length})`);
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`dist validation passed: ${htmlFiles.length} HTML pages, ${files.length} files`);
