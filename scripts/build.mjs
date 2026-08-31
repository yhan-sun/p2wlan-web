import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, normalizeAssets, normalizeRelease } from "../src/data/site.mjs";
import { escapeHtml, formatBytes } from "../src/ui.mjs";
import { renderDocArticle, renderLayout, renderNotFound } from "../src/layout.mjs";
import { renderHome } from "../src/pages/home.mjs";
import { renderDownload } from "../src/pages/download.mjs";
import { renderDocsIndex } from "../src/pages/docs-index.mjs";
import { renderChangelog } from "../src/pages/changelog.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const source = path.join(root, "src");
const fallbackPath = path.join(source, "data", "release-fallback.json");
const cachePath = path.join(root, ".cache", "release.json");
const buildTime = new Date().toISOString();
const buildId = process.env.GITHUB_SHA?.slice(0, 12) || `local-${Date.now()}`;

async function readJson(file) {
  return JSON.parse(await readFile(file, "utf8"));
}

async function loadRelease() {
  const fallback = normalizeRelease(await readJson(fallbackPath));
  if (existsSync(cachePath)) {
    try {
      const candidate = normalizeRelease(await readJson(cachePath));
      if (candidate.tag && Array.isArray(candidate.assets) && candidate.assets.length) return { release: candidate, fallback };
    } catch (error) {
      console.warn(`release cache ignored: ${error.message}`);
    }
  }
  return { release: fallback, fallback };
}

function stripHtml(value) {
  return String(value)
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function hydrateDocBody(body, release, fallback) {
  let output = body.replaceAll(fallback.tag, release.tag).replaceAll(fallback.url, release.url);
  for (const previous of fallback.assets || []) {
    const current = (release.assets || []).find((asset) => asset.name === previous.name);
    if (!current) continue;
    const oldUrl = previous.browser_download_url || previous.url || "";
    const newUrl = current.browser_download_url || current.url || "";
    if (oldUrl && newUrl) output = output.replaceAll(oldUrl, newUrl);
    if (previous.digest && current.digest) output = output.replaceAll(previous.digest, current.digest);
    output = output.replaceAll(formatBytes(previous.size), formatBytes(current.size));
  }
  return output;
}

function outputPath(pathName) {
  if (pathName === "/") return path.join(dist, "index.html");
  return path.join(dist, pathName.replace(/^\//, ""), "index.html");
}

async function writePage(pathName, html) {
  const target = outputPath(pathName);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
}

function sitemap(paths) {
  const date = buildTime.slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
    .map((pathName) => `  <url><loc>${escapeHtml(`${SITE.origin}${pathName}`)}</loc><lastmod>${date}</lastmod></url>`)
    .join("\n")}\n</urlset>\n`;
}

const { release, fallback } = await loadRelease();
const assets = normalizeAssets(release);
const docs = (await readJson(path.join(source, "data", "docs.json"))).sort((a, b) => a.order - b.order);

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "assets"), { recursive: true });
await cp(path.join(root, "public"), dist, { recursive: true });
const styleFiles = [
  "00-foundation.css",
  "10-components.css",
  "20-home-product.css",
  "21-home-architecture.css",
  "30-pages.css",
  "40-docs-hub.css",
  "50-docs.css",
  "60-responsive.css",
];
const styles = await Promise.all(styleFiles.map((file) => readFile(path.join(source, "styles", file), "utf8")));
await writeFile(path.join(dist, "assets", "styles.css"), `${styles.join("\n")}\n`, "utf8");
await cp(path.join(source, "client.js"), path.join(dist, "assets", "client.js"));

const pages = [];
function addPage({ pathName, title, description, kind, content, section, headings = [], keywords = [] }) {
  const html = renderLayout({ pathName, title, description, content, kind, release, buildId, buildTime, keywords });
  pages.push({ pathName, title, description, kind, content, html, section, headings, keywords });
}

addPage({
  pathName: "/",
  title: SITE.name,
  description: SITE.description,
  kind: "home",
  content: renderHome({ release, assets }),
  section: "产品",
  headings: ["不同网络，同一个局域网", "复杂网络留在底层", "运行在你的基础设施", "下载"],
  keywords: ["P2P VPN", "虚拟局域网", "自托管", "NAT 穿透", "Relay"],
});

addPage({
  pathName: "/download/",
  title: "下载 P2WLAN",
  description: "下载 Windows、macOS、Linux、Android 与 iOS 客户端，并核对文件大小与 SHA-256。",
  kind: "download",
  content: renderDownload({ release, assets }),
  section: "下载",
  headings: ["按平台下载", "高级下载", "完整性校验"],
  keywords: ["下载", "SHA-256", "Windows", "macOS", "Linux", "Android", "iOS"],
});

addPage({
  pathName: "/docs/",
  title: "P2WLAN 文档",
  description: "P2WLAN 安装、组网、网络原理、自托管、安全边界与故障排查文档。",
  kind: "docs-home",
  content: renderDocsIndex({ release, docs }),
  section: "文档",
  headings: ["五分钟快速开始", ...new Set(docs.map((doc) => doc.group))],
  keywords: ["文档", "快速开始", "自托管", "故障排查"],
});

addPage({
  pathName: "/changelog/",
  title: "更新记录",
  description: "查看 P2WLAN 当前 Release、构建资产、发布渠道与完整性校验入口。",
  kind: "changelog",
  content: renderChangelog({ release, assets }),
  section: "更新",
  headings: [release.tag, "当前版本", "历史版本"],
  keywords: ["Release", "更新记录", "版本"],
});

for (const doc of docs) {
  const raw = await readFile(path.join(source, "content", "docs", doc.file), "utf8");
  const body = hydrateDocBody(raw, release, fallback);
  const content = renderDocArticle({ doc, body, docs, release, buildTime });
  const headings = [...body.matchAll(/<h2\s+id="[^"]+"[^>]*>([\s\S]*?)<\/h2>/gi)].map((match) => stripHtml(match[1]));
  addPage({
    pathName: doc.path,
    title: doc.title,
    description: doc.description,
    kind: "doc",
    content,
    section: doc.group,
    headings,
    keywords: doc.keywords || [],
  });
}

for (const page of pages) await writePage(page.pathName, page.html);

const notFound = renderLayout({
  pathName: "/404/",
  title: "页面未找到",
  description: "请求的 P2WLAN 页面不存在。",
  content: renderNotFound(),
  kind: "404",
  release,
  buildId,
  buildTime,
});
await writeFile(path.join(dist, "404.html"), notFound, "utf8");

const searchIndex = {
  schemaVersion: 1,
  generatedAt: buildTime,
  release: release.tag,
  pages: pages.map((page) => ({
    url: page.pathName,
    title: page.title,
    description: page.description,
    section: page.section,
    headings: page.headings,
    keywords: page.keywords,
    text: stripHtml(page.content),
  })),
};
await writeFile(path.join(dist, "search-index.json"), `${JSON.stringify(searchIndex, null, 2)}\n`, "utf8");
await writeFile(path.join(dist, "sitemap.xml"), sitemap(pages.map((page) => page.pathName)), "utf8");
await writeFile(
  path.join(dist, "build-meta.json"),
  `${JSON.stringify({ build_id: buildId, built_at: buildTime, release: release.tag, release_source: release.source, pages: pages.length }, null, 2)}\n`,
  "utf8"
);

console.log(`built ${pages.length} pages for ${release.tag} (${release.source})`);
