import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  SITE,
  releaseFallback,
  docs,
  docGroups,
  renderHome,
  renderDownload,
  renderChangelog,
} from "../src/content.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const distDir = path.join(rootDir, "dist");
const cacheReleasePath = path.join(rootDir, ".cache", "release.json");
const buildTime = new Date().toISOString();
const buildId = process.env.GITHUB_SHA?.slice(0, 12) || `local-${Date.now()}`;

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
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

function normalizePathname(value) {
  if (value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
}

async function loadRelease() {
  if (existsSync(cacheReleasePath)) {
    try {
      const parsed = JSON.parse(await readFile(cacheReleasePath, "utf8"));
      if (parsed?.tag && Array.isArray(parsed.assets) && parsed.assets.length > 0) {
        return parsed;
      }
    } catch (error) {
      console.warn(`release cache ignored: ${error.message}`);
    }
  }
  return releaseFallback;
}

function header(activePath, release) {
  const isDocs = activePath.startsWith("/docs/");
  const nav = [
    ["/", "首页"],
    ["/download/", "下载"],
    ["/docs/", "文档"],
    ["/docs/self-hosting/", "自托管"],
    ["/changelog/", "版本"],
  ];
  return `
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <header class="site-header" data-site-header>
      <div class="container site-header__inner">
        <a class="brand" href="/" aria-label="P2WLAN 首页">
          <img src="/images/p2wlan-icon.svg" width="36" height="36" alt="" />
          <span><strong>P2WLAN</strong><small>P2P virtual LAN</small></span>
        </a>
        <nav class="desktop-nav" aria-label="主导航">
          ${nav
            .map(([href, label]) => {
              const current = href === "/docs/" ? isDocs : activePath === href;
              return `<a href="${href}"${current ? ' aria-current="page"' : ""}>${label}</a>`;
            })
            .join("")}
        </nav>
        <div class="header-actions">
          <button class="icon-button search-button" type="button" data-open-search aria-label="搜索文档"><span aria-hidden="true">⌕</span><kbd>⌘ K</kbd></button>
          <button class="icon-button theme-button" type="button" data-theme-toggle aria-label="切换明暗主题"><span data-theme-icon aria-hidden="true">◐</span></button>
          <a class="github-button" href="${SITE.repository}" aria-label="在 GitHub 查看 P2WLAN">GitHub <span aria-hidden="true">↗</span></a>
          <button class="mobile-menu-button" type="button" data-mobile-menu-button aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span><b class="sr-only">打开菜单</b></button>
        </div>
      </div>
      <nav class="mobile-menu" id="mobile-menu" data-mobile-menu aria-label="移动端导航" hidden>
        <div class="container">
          ${nav.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
          <a href="${SITE.repository}">GitHub ↗</a>
          <span>Latest ${escapeHtml(release.tag)}</span>
        </div>
      </nav>
    </header>`;
}

function footer(release) {
  return `
    <footer class="site-footer">
      <div class="container site-footer__grid">
        <div class="footer-brand"><a class="brand" href="/"><img src="/images/p2wlan-icon.svg" width="34" height="34" alt="" /><span><strong>P2WLAN</strong><small>P2P first · Self-hosted</small></span></a><p>让不同网络下的设备，像连接在同一个局域网一样直接通信。</p><div class="footer-badges"><span>${escapeHtml(
          release.tag
        )}</span><span>Preview</span><span>MIT</span></div></div>
        <div><h2>开始使用</h2><a href="/download/">下载</a><a href="/docs/getting-started/">快速开始</a><a href="/docs/install/">安装指南</a><a href="/docs/release-verification/">完整性校验</a></div>
        <div><h2>深入了解</h2><a href="/docs/networking/">连接模型</a><a href="/docs/nat-traversal/">NAT 穿透</a><a href="/docs/relay/">Relay</a><a href="/docs/security/">安全边界</a></div>
        <div><h2>项目</h2><a href="${SITE.repository}">源代码 ↗</a><a href="${SITE.releases}">Releases ↗</a><a href="/docs/development/">开发与贡献</a><a href="/changelog/">版本状态</a></div>
      </div>
      <div class="container site-footer__bottom"><p>© ${new Date().getUTCFullYear()} P2WLAN Contributors · MIT License · 软件按“现状”提供</p><p>文档构建 ${escapeHtml(
    buildId
  )} · ${escapeHtml(buildTime.slice(0, 10))}</p></div>
    </footer>`;
}

function searchDialog() {
  return `
    <dialog class="search-dialog" data-search-dialog aria-label="站内搜索">
      <div class="search-dialog__panel">
        <div class="search-dialog__input-wrap"><span aria-hidden="true">⌕</span><input type="search" autocomplete="off" placeholder="搜索命令、配置、错误或概念…" data-search-input aria-label="搜索内容" /><button type="button" data-close-search aria-label="关闭搜索">Esc</button></div>
        <div class="search-dialog__hint" data-search-hint>输入关键词搜索全文，例如 “relay-startup-timeout”“对称 NAT”“39277”。</div>
        <div class="search-results" data-search-results role="listbox"></div>
        <div class="search-dialog__footer"><span>↑↓ 选择</span><span>Enter 打开</span><span>Esc 关闭</span></div>
      </div>
    </dialog>`;
}

function docSidebar(currentPath) {
  return `
    <aside class="docs-sidebar" id="docs-sidebar" data-docs-sidebar>
      <div class="docs-sidebar__head"><strong>文档目录</strong><button type="button" data-close-docs-menu aria-label="关闭文档目录">×</button></div>
      <nav aria-label="文档章节">
        ${docGroups
          .map(
            (group) => `<section><h2>${group.title}</h2>${group.items
              .map(
                ([href, label]) =>
                  `<a href="${href}"${currentPath === href ? ' aria-current="page"' : ""}>${label}</a>`
              )
              .join("")}</section>`
          )
          .join("")}
      </nav>
      <div class="docs-sidebar__meta"><span>Docs for latest release</span><a href="/changelog/">查看版本状态 →</a></div>
    </aside>`;
}

function extractHeadings(body) {
  const headings = [];
  const matcher = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let match;
  while ((match = matcher.exec(body))) {
    headings.push({ id: match[1], title: stripHtml(match[2]) });
  }
  return headings;
}

function renderDocPage(doc, body, release) {
  const headings = extractHeadings(body);
  const index = docs.findIndex((item) => item.path === doc.path);
  const previous = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;
  const pagination = `${previous ? `<a class="doc-page-link doc-page-link--prev" href="${previous.path}"><small>上一篇</small><strong>← ${escapeHtml(previous.title)}</strong></a>` : "<span></span>"}${next ? `<a class="doc-page-link doc-page-link--next" href="${next.path}"><small>下一篇</small><strong>${escapeHtml(next.title)} →</strong></a>` : "<span></span>"}`;
  return `
    <div class="docs-progress" data-docs-progress aria-hidden="true"></div>
    <main class="docs-main" id="main-content">
      <div class="container docs-layout">
        <button class="docs-menu-trigger" type="button" data-open-docs-menu aria-controls="docs-sidebar">目录</button>
        ${docSidebar(doc.path)}
        <article class="doc-article" data-doc-article>
          <nav class="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>/</span><a href="/docs/">文档</a><span>/</span><span>${escapeHtml(
            doc.group
          )}</span></nav>
          <header class="doc-header"><div class="doc-header__meta"><span>${escapeHtml(
            doc.group
          )}</span><span>${escapeHtml(release.tag)}</span><span>已同步 ${escapeHtml(buildTime.slice(0, 10))}</span></div><h1>${escapeHtml(
    doc.title
  )}</h1><p>${escapeHtml(doc.description)}</p></header>
          <div class="doc-content">${body}</div>
          <footer class="doc-footer"><div class="doc-feedback"><div><strong>发现文档问题？</strong><p>请附页面 URL、对应 Release 和可验证的源码依据。</p></div><a class="button button--secondary" href="${SITE.repository}/issues/new">提交 Issue ↗</a></div><nav class="doc-pagination" aria-label="文档翻页">${pagination}</nav></footer>
        </article>
        <aside class="doc-toc" aria-label="本页目录"><strong>本页内容</strong><nav>${headings
          .map((heading) => `<a href="#${escapeHtml(heading.id)}">${escapeHtml(heading.title)}</a>`)
          .join("")}</nav><a class="doc-toc__top" href="#main-content">回到顶部 ↑</a></aside>
      </div>
    </main>`;
}

function pageSchema({ kind, title, description, canonical, release }) {
  if (kind === "home") {
    return {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "NetworkingApplication",
      operatingSystem: "Windows, macOS, Linux, Android, iOS",
      softwareVersion: release.tag,
      description,
      url: canonical,
      codeRepository: SITE.repository,
      license: "https://opensource.org/license/mit",
    };
  }
  return {
    "@context": "https://schema.org",
    "@type": kind === "doc" ? "TechArticle" : "WebPage",
    headline: title,
    description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.origin },
    dateModified: buildTime,
  };
}

function renderLayout({ pathName, title, description, content, kind, release, keywords = [] }) {
  const normalized = normalizePathname(pathName);
  const canonical = `${SITE.origin}${normalized}`;
  const fullTitle = normalized === "/" ? `${SITE.name} — P2P 优先的加密虚拟局域网` : `${title} · ${SITE.name}`;
  const schema = pageSchema({ kind, title: fullTitle, description, canonical, release });
  return `<!doctype html>
<html lang="zh-CN" data-theme="auto">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${escapeHtml(fullTitle)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <meta name="keywords" content="${escapeHtml(["P2WLAN", "P2P", "虚拟局域网", ...keywords].join(", "))}" />
  <meta name="author" content="P2WLAN Contributors" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#09111f" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f7f9fc" media="(prefers-color-scheme: light)" />
  <link rel="canonical" href="${canonical}" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/manifest.webmanifest" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="P2WLAN" />
  <meta property="og:locale" content="zh_CN" />
  <meta property="og:title" content="${escapeHtml(fullTitle)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="${SITE.origin}/og-image.jpg" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(fullTitle)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${SITE.origin}/og-image.jpg" />
  <script>try{const t=localStorage.getItem('p2wlan-theme');if(t)document.documentElement.dataset.theme=t}catch{}</script>
  <link rel="stylesheet" href="/assets/styles.css?v=${escapeHtml(buildId)}" />
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
</head>
<body data-page-kind="${kind}" data-page-path="${normalized}">
  ${header(normalized, release)}
  ${kind === "doc" ? content : `<div id="main-content">${content}</div>`}
  ${footer(release)}
  ${searchDialog()}
  <noscript><div class="noscript-banner">本站内容无需 JavaScript 即可阅读；搜索、主题切换、复制与交互演示需要启用 JavaScript。</div></noscript>
  <script type="module" src="/assets/client.js?v=${escapeHtml(buildId)}"></script>
</body>
</html>`;
}

async function writePage(urlPath, html) {
  const normalized = normalizePathname(urlPath);
  const target = normalized === "/" ? path.join(distDir, "index.html") : path.join(distDir, normalized.slice(1), "index.html");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, html, "utf8");
  return target;
}

async function copyPublic() {
  const source = path.join(rootDir, "public");
  if (existsSync(source)) await cp(source, distDir, { recursive: true });
}

const release = await loadRelease();
await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets"), { recursive: true });
await copyPublic();
await cp(path.join(rootDir, "src", "styles.css"), path.join(distDir, "assets", "styles.css"));
await cp(path.join(rootDir, "src", "client.js"), path.join(distDir, "assets", "client.js"));

const pageRecords = [];
const staticPages = [
  {
    path: "/",
    title: "P2WLAN",
    description: SITE.description,
    kind: "home",
    content: renderHome({ release }),
    keywords: ["NAT 穿透", "Relay", "自托管"],
  },
  {
    path: "/download/",
    title: "下载",
    description: `下载 P2WLAN ${release.tag} 的 Windows、macOS、Linux、Android 与 iOS 安装包，并核对 SHA-256。`,
    kind: "page",
    content: renderDownload({ release }),
    keywords: ["下载", "SHA-256", release.tag],
  },
  {
    path: "/changelog/",
    title: "版本状态",
    description: "查看 P2WLAN 最新正式 Release、平台资产、项目成熟度和版本来源。",
    kind: "page",
    content: renderChangelog({ release }),
    keywords: ["Release", "版本", release.tag],
  },
];

for (const page of staticPages) {
  const html = renderLayout({ ...page, pathName: page.path, release });
  await writePage(page.path, html);
  pageRecords.push({
    url: page.path,
    title: page.title,
    description: page.description,
    section: page.kind === "home" ? "首页" : "站点",
    text: stripHtml(page.content),
    headings: extractHeadings(page.content).map((item) => item.title),
  });
}

for (const doc of docs) {
  const body = doc.body({ release });
  const content = renderDocPage(doc, body, release);
  const html = renderLayout({
    pathName: doc.path,
    title: doc.title,
    description: doc.description,
    keywords: doc.keywords,
    content,
    kind: "doc",
    release,
  });
  await writePage(doc.path, html);
  pageRecords.push({
    url: doc.path,
    title: doc.title,
    description: doc.description,
    section: doc.group,
    text: stripHtml(body),
    headings: extractHeadings(body).map((item) => item.title),
    keywords: doc.keywords,
  });
}

const notFound = renderLayout({
  pathName: "/404/",
  title: "页面未找到",
  description: "请求的 P2WLAN 页面不存在。",
  kind: "page",
  release,
  content: `<main class="not-found"><div class="container"><span>404</span><h1>这条路径没有建立连接。</h1><p>页面可能已移动，使用全文搜索或返回文档首页。</p><div class="hero__actions"><a class="button button--primary" href="/docs/">打开文档</a><button class="button button--secondary" type="button" data-open-search>搜索站点</button></div></div></main>`,
});
await writeFile(path.join(distDir, "404.html"), notFound, "utf8");

await writeFile(
  path.join(distDir, "search-index.json"),
  JSON.stringify(
    {
      generatedAt: buildTime,
      release: release.tag,
      pages: pageRecords.map((record) => ({ ...record, text: record.text.slice(0, 24000) })),
    },
    null,
    2
  ),
  "utf8"
);

const sitemapUrls = pageRecords
  .map((record) => {
    const loc = `${SITE.origin}${record.url}`;
    const priority = record.url === "/" ? "1.0" : record.url === "/download/" ? "0.9" : "0.8";
    return `  <url><loc>${escapeHtml(loc)}</loc><lastmod>${buildTime.slice(0, 10)}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n");
await writeFile(
  path.join(distDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
  "utf8"
);

await writeFile(
  path.join(distDir, "build-meta.json"),
  JSON.stringify(
    {
      buildId,
      builtAt: buildTime,
      release: release.tag,
      releaseSource: release.source || "unknown",
      pages: pageRecords.length,
    },
    null,
    2
  ),
  "utf8"
);

const cssSize = (await stat(path.join(distDir, "assets", "styles.css"))).size;
const jsSize = (await stat(path.join(distDir, "assets", "client.js"))).size;
console.log(`built ${pageRecords.length} pages for ${release.tag}`);
console.log(`assets: CSS ${(cssSize / 1024).toFixed(1)} KB, JS ${(jsSize / 1024).toFixed(1)} KB`);
