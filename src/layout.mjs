import { DOC_GROUP_ORDER, NAVIGATION, SITE } from "./data/site.mjs";
import { escapeHtml, icon } from "./ui.mjs";

function normalizePath(pathName) {
  if (!pathName || pathName === "/") return "/";
  return `/${pathName.replace(/^\/+|\/+$/g, "")}/`;
}

function isCurrentNav(activePath, href) {
  if (href === "/") return activePath === "/";
  if (href === "/docs/") return activePath.startsWith("/docs/") && activePath !== "/docs/self-hosting/";
  return activePath === href;
}

export function renderHeader(activePath, release) {
  const path = normalizePath(activePath);
  return `
    <a class="skip-link" href="#main-content">跳到主要内容</a>
    <header class="site-header" data-site-header>
      <div class="container site-header__inner">
        <a class="brand" href="/" aria-label="P2WLAN 首页"><img src="/images/p2wlan-icon.svg" width="36" height="36" alt="" /><span>P2WLAN</span></a>
        <nav class="desktop-nav" aria-label="主导航">${NAVIGATION.map(
          ([href, label]) => `<a href="${href}"${isCurrentNav(path, href) ? ' aria-current="page"' : ""}>${label}</a>`
        ).join("")}</nav>
        <div class="header-actions">
          <button class="header-button header-button--search" type="button" data-open-search aria-label="搜索文档">${icon(
            "search"
          )}<span>搜索</span><kbd>⌘K</kbd></button>
          <button class="header-button header-button--icon" type="button" data-theme-toggle aria-label="切换明暗主题"><span data-theme-icon>${icon(
            "sun"
          )}</span></button>
          <a class="header-github" href="${SITE.repository}" aria-label="在 GitHub 查看 P2WLAN">${icon(
            "github"
          )}<span>GitHub</span></a>
          <button class="mobile-menu-button" type="button" data-mobile-menu-button aria-expanded="false" aria-controls="mobile-menu">${icon(
            "menu"
          )}<span class="sr-only">打开菜单</span></button>
        </div>
      </div>
      <nav class="mobile-menu" id="mobile-menu" data-mobile-menu aria-label="移动端导航" hidden><div class="container">${NAVIGATION.map(
        ([href, label]) => `<a href="${href}">${label}${icon("arrow")}</a>`
      ).join("")}<a href="${SITE.repository}">GitHub${icon("arrow")}</a><span>${escapeHtml(
        release.tag
      )} · Preview</span></div></nav>
    </header>`;
}

export function renderFooter(release, buildId, buildDate) {
  return `
    <footer class="site-footer">
      <div class="container site-footer__top">
        <div class="footer-brand"><a class="brand" href="/"><img src="/images/p2wlan-icon.svg" width="34" height="34" alt="" /><span>P2WLAN</span></a><p>开源、可自托管的 P2P 虚拟局域网。</p></div>
        <nav aria-label="页脚产品导航"><strong>产品</strong><a href="/download/">下载</a><a href="/changelog/">版本</a><a href="${SITE.repository}">GitHub ↗</a></nav>
        <nav aria-label="页脚文档导航"><strong>文档</strong><a href="/docs/getting-started/">快速开始</a><a href="/docs/self-hosting/">自托管</a><a href="/docs/security/">安全</a></nav>
        <div class="footer-release"><strong>Current release</strong><a href="/changelog/"><span class="status-dot status-dot--direct"></span>${escapeHtml(
          release.tag
        )}</a><small>MIT · Preview</small></div>
      </div>
      <div class="container site-footer__bottom"><p>© ${new Date().getUTCFullYear()} P2WLAN Contributors · MIT License</p><p>构建 ${escapeHtml(
        buildId
      )} · ${escapeHtml(buildDate)}</p></div>
    </footer>`;
}

export function renderSearchDialog() {
  return `
    <dialog class="search-dialog" data-search-dialog aria-label="站内搜索">
      <div class="search-dialog__panel">
        <header><span>${icon("search")}</span><input type="search" autocomplete="off" placeholder="搜索命令、配置、错误或概念…" data-search-input aria-label="搜索内容" /><button type="button" data-close-search aria-label="关闭搜索">${icon(
          "close"
        )}</button></header>
        <p class="search-dialog__hint" data-search-hint>例如：Relay、对称 NAT、status --json、TLS。</p>
        <div class="search-results" data-search-results role="listbox"></div>
        <footer><span>↑↓ 选择</span><span>Enter 打开</span><span>Esc 关闭</span></footer>
      </div>
    </dialog>`;
}

function pageSchema({ kind, title, description, canonical, release, buildTime }) {
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

export function renderLayout({ pathName, title, description, content, kind, release, buildId, buildTime, keywords = [] }) {
  const normalized = normalizePath(pathName);
  const canonical = `${SITE.origin}${normalized}`;
  const fullTitle = normalized === "/" ? `${SITE.name} — 开源、可自托管的 P2P 虚拟局域网` : `${title} · ${SITE.name}`;
  const schema = pageSchema({ kind, title: fullTitle, description, canonical, release, buildTime });
  const buildDate = buildTime.slice(0, 10);
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
  <meta name="theme-color" content="#0c1018" media="(prefers-color-scheme: dark)" />
  <meta name="theme-color" content="#f4f5f7" media="(prefers-color-scheme: light)" />
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
  <script>document.documentElement.classList.add('has-js');try{const t=localStorage.getItem('p2wlan-theme');if(t)document.documentElement.dataset.theme=t}catch{}</script>
  <link rel="stylesheet" href="/assets/styles.css?v=${escapeHtml(buildId)}" />
  <script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>
</head>
<body data-page-kind="${escapeHtml(kind)}" data-page-path="${escapeHtml(normalized)}">
  ${renderHeader(normalized, release)}
  ${content}
  ${renderFooter(release, buildId, buildDate)}
  ${renderSearchDialog()}
  <script src="/assets/client.js?v=${escapeHtml(buildId)}" defer></script>
</body>
</html>`;
}

function docGroups(docs) {
  return DOC_GROUP_ORDER.map((name) => ({ name, items: docs.filter((doc) => doc.group === name) })).filter(
    (group) => group.items.length > 0
  );
}

function extractHeadings(body) {
  const headings = [];
  const matcher = /<h2\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/gi;
  let match;
  while ((match = matcher.exec(body))) {
    headings.push({ id: match[1], title: match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() });
  }
  return headings;
}

export function renderDocArticle({ doc, body, docs, release, buildTime }) {
  const headings = extractHeadings(body);
  const index = docs.findIndex((item) => item.path === doc.path);
  const previous = index > 0 ? docs[index - 1] : null;
  const next = index < docs.length - 1 ? docs[index + 1] : null;
  const groups = docGroups(docs);
  return `
    <div class="docs-progress" data-docs-progress aria-hidden="true"></div>
    <main class="docs-main" id="main-content">
      <div class="container docs-layout">
        <button class="docs-menu-trigger" type="button" data-open-docs-menu aria-controls="docs-sidebar" aria-expanded="false">${icon(
          "menu"
        )}<span>目录</span></button>
        <aside class="docs-sidebar" id="docs-sidebar" data-docs-sidebar>
          <header><strong>文档目录</strong><button type="button" data-close-docs-menu aria-label="关闭文档目录">${icon(
            "close"
          )}</button></header>
          <nav aria-label="文档章节">${groups
            .map(
              (group) => `<section><h2>${escapeHtml(group.name)}</h2>${group.items
                .map(
                  (item) => `<a href="${escapeHtml(item.path)}"${item.path === doc.path ? ' aria-current="page"' : ""}>${escapeHtml(
                    item.title
                  )}</a>`
                )
                .join("")}</section>`
            )
            .join("")}</nav>
          <div class="docs-sidebar__meta"><span>适用于 ${escapeHtml(release.tag)}</span><a href="/changelog/">查看版本 ${icon(
            "arrow"
          )}</a></div>
        </aside>

        <article class="doc-article" data-doc-article>
          <nav class="breadcrumbs" aria-label="面包屑"><a href="/">首页</a><span>/</span><a href="/docs/">文档</a><span>/</span><span>${escapeHtml(
            doc.group
          )}</span></nav>
          <header class="doc-header"><div class="doc-header__meta"><span>${escapeHtml(doc.group)}</span><span>${escapeHtml(
            release.tag
          )}</span><span>同步于 ${escapeHtml(buildTime.slice(0, 10))}</span></div><h1>${escapeHtml(doc.title)}</h1><p>${escapeHtml(
            doc.description
          )}</p></header>
          <div class="doc-content">${body}</div>
          <footer class="doc-footer"><div class="doc-feedback"><div><strong>发现文档问题？</strong><p>请附上页面 URL、对应 Release 和可验证依据。</p></div><a class="text-action" href="${SITE.repository}/issues/new">提交 Issue ${icon(
            "arrow"
          )}</a></div><nav class="doc-pagination" aria-label="文档翻页">${
            previous
              ? `<a class="doc-page-link" href="${escapeHtml(previous.path)}"><small>上一篇</small><strong>${icon("arrow", "icon--back")}${escapeHtml(
                  previous.title
                )}</strong></a>`
              : "<span></span>"
          }${
            next
              ? `<a class="doc-page-link doc-page-link--next" href="${escapeHtml(next.path)}"><small>下一篇</small><strong>${escapeHtml(
                  next.title
                )}${icon("arrow")}</strong></a>`
              : "<span></span>"
          }</nav></footer>
        </article>

        <aside class="doc-toc" aria-label="本页目录"><strong>本页内容</strong><nav>${headings
          .map((heading) => `<a href="#${escapeHtml(heading.id)}">${escapeHtml(heading.title)}</a>`)
          .join("")}</nav><a class="doc-toc__top" href="#main-content">回到顶部 ↑</a></aside>
      </div>
    </main>`;
}

export function renderNotFound() {
  return `<main id="main-content" class="not-found"><div><span>404</span><h1>这个地址不在虚拟网络中。</h1><p>返回首页，或从文档入口继续查找。</p><div class="hero-actions"><a class="button button--primary" href="/">返回首页</a><a class="button button--secondary" href="/docs/">打开文档</a></div></div></main>`;
}
