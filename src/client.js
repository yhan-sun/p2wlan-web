const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const html = document.documentElement;
const body = document.body;

const icons = {
  sun: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.5"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15.3A8.2 8.2 0 0 1 8.7 4 8.2 8.2 0 1 0 20 15.3Z"/></svg>',
  copy: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>',
};

function resolvedTheme() {
  const saved = html.dataset.theme;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function setTheme(theme) {
  html.dataset.theme = theme;
  try { localStorage.setItem("p2wlan-theme", theme); } catch {}
  const target = $("[data-theme-icon]");
  const button = $("[data-theme-toggle]");
  if (target) target.innerHTML = theme === "dark" ? icons.sun : icons.moon;
  if (button) button.setAttribute("aria-label", theme === "dark" ? "切换到亮色主题" : "切换到暗色主题");
}

setTheme(resolvedTheme());
$("[data-theme-toggle]")?.addEventListener("click", () => setTheme(resolvedTheme() === "dark" ? "light" : "dark"));

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener?.("change", () => {
  if (!localStorage.getItem("p2wlan-theme")) setTheme(systemTheme.matches ? "dark" : "light");
});

const header = $("[data-site-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const mobileButton = $("[data-mobile-menu-button]");
const mobileMenu = $("[data-mobile-menu]");
function setMobileMenu(open) {
  if (!mobileMenu || !mobileButton) return;
  mobileMenu.hidden = !open;
  mobileButton.setAttribute("aria-expanded", String(open));
  body.classList.toggle("mobile-menu-open", open);
}
mobileButton?.addEventListener("click", () => setMobileMenu(mobileMenu?.hidden ?? true));
$$("a", mobileMenu || document.createElement("div")).forEach((link) => link.addEventListener("click", () => setMobileMenu(false)));

async function copyText(value, button) {
  if (!value) return;
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  if (!button) return;
  const label = $("span", button);
  const previous = label?.textContent || button.textContent;
  if (label) label.textContent = "已复制";
  else button.textContent = "已复制";
  button.classList.add("is-copied");
  window.setTimeout(() => {
    if (label) label.textContent = previous;
    else button.textContent = previous;
    button.classList.remove("is-copied");
  }, 1500);
}

$$("[data-copy-text]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyText || "", button));
});

$$(".code-frame").forEach((frame) => {
  const bar = $(".code-frame__bar", frame);
  const code = $("code", frame);
  if (!bar || !code || $(".code-copy", bar)) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy";
  button.innerHTML = `${icons.copy}<span>复制</span>`;
  button.setAttribute("aria-label", "复制代码");
  button.addEventListener("click", () => copyText(code.textContent || "", button));
  bar.append(button);
});

$$(".doc-content h2[id]").forEach((heading) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "heading-link";
  button.textContent = "#";
  button.setAttribute("aria-label", `复制“${heading.textContent.trim()}”章节链接`);
  button.addEventListener("click", () => {
    const target = new URL(window.location.href);
    target.hash = heading.id;
    copyText(target.toString(), button);
  });
  heading.append(button);
});

const docsProgress = $("[data-docs-progress]");
const docArticle = $("[data-doc-article]");
function updateDocsProgress() {
  if (!docsProgress || !docArticle) return;
  const start = docArticle.offsetTop - 120;
  const length = Math.max(1, docArticle.offsetHeight - window.innerHeight + 160);
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / length));
  docsProgress.style.transform = `scaleX(${progress})`;
}
updateDocsProgress();
window.addEventListener("scroll", updateDocsProgress, { passive: true });
window.addEventListener("resize", updateDocsProgress, { passive: true });

const tocLinks = $$(".doc-toc nav a");
const tocHeadings = tocLinks.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter(Boolean);
if (tocLinks.length && tocHeadings.length && "IntersectionObserver" in window) {
  const visible = new Map();
  const activate = () => {
    const current = [...visible.entries()]
      .filter(([, isVisible]) => isVisible)
      .map(([element]) => element)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0]
      || tocHeadings.findLast((heading) => heading.getBoundingClientRect().top < 180)
      || tocHeadings[0];
    tocLinks.forEach((link) => link.classList.toggle("is-active", link.hash === `#${current.id}`));
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
    activate();
  }, { rootMargin: "-120px 0px -67% 0px", threshold: [0, 1] });
  tocHeadings.forEach((heading) => observer.observe(heading));
}

const docsSidebar = $("[data-docs-sidebar]");
const docsOpen = $("[data-open-docs-menu]");
function setDocsMenu(open) {
  if (!docsSidebar || !docsOpen) return;
  docsSidebar.classList.toggle("is-open", open);
  docsOpen.setAttribute("aria-expanded", String(open));
  body.classList.toggle("docs-menu-open", open);
}
docsOpen?.addEventListener("click", () => setDocsMenu(true));
$("[data-close-docs-menu]")?.addEventListener("click", () => setDocsMenu(false));

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
  if (ua.includes("android")) return { key: "android-arm64", title: "Android arm64", description: "使用 APK 侧载，并授予系统 VPN 权限。" };
  if (/iphone|ipad|ipod/.test(ua)) return { key: "ios-arm64", title: "iOS arm64（未签名）", description: "需要使用自己的开发者证书签名后安装。" };
  if (platform.includes("win")) return { key: "windows-x64", title: "Windows x64", description: "Windows 10/11 x64 安装程序。" };
  if (platform.includes("mac")) return { key: "macos-arm64", title: "macOS", description: "Apple Silicon 使用 arm64 DMG；Intel Mac 请在平台卡片中选择 x64。" };
  if (platform.includes("linux") || ua.includes("linux")) {
    const arm = /aarch64|arm64/.test(ua);
    return arm
      ? { key: "linux-cli-arm64", title: "Linux arm64", description: "arm64 服务器使用 CLI 与 daemon。" }
      : { key: "linux-cli-x64", title: "Linux x86_64", description: "服务器推荐 CLI 与 daemon；桌面也可选择 GUI。" };
  }
  return { key: "", title: "请选择你的平台", description: "未能可靠识别当前系统，请从下方手动选择。" };
}

const platform = detectPlatform();
body.dataset.platform = platform.key;
const assetLinks = new Map();
$$("[data-download-key]").forEach((link) => {
  if (!assetLinks.has(link.dataset.downloadKey)) assetLinks.set(link.dataset.downloadKey, link.href);
});
const recommendedUrl = assetLinks.get(platform.key);
$$("[data-smart-download]").forEach((link) => {
  if (recommendedUrl) link.href = recommendedUrl;
});
const smartTitle = $("[data-smart-title]");
const smartDescription = $("[data-smart-description]");
if (smartTitle) smartTitle.textContent = platform.title;
if (smartDescription) smartDescription.textContent = platform.description;
if (platform.key) $$(`[data-platform-card="${CSS.escape(platform.key)}"]`).forEach((card) => card.classList.add("is-recommended"));

const searchDialog = $("[data-search-dialog]");
const searchInput = $("[data-search-input]");
const searchResults = $("[data-search-results]");
const searchHint = $("[data-search-hint]");
let searchIndex = null;
let activeResult = -1;

function escapeSearchHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function excerpt(text, query) {
  const lower = text.toLowerCase();
  const index = lower.indexOf(query.toLowerCase());
  const start = Math.max(0, index < 0 ? 0 : index - 68);
  const fragment = text.slice(start, start + 190).trim();
  return `${start > 0 ? "…" : ""}${fragment}${start + 190 < text.length ? "…" : ""}`;
}

function scorePage(page, query) {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return 0;
  const terms = normalized.split(/\s+/).filter(Boolean);
  const fields = {
    title: page.title.toLowerCase(),
    headings: (page.headings || []).join(" ").toLowerCase(),
    keywords: (page.keywords || []).join(" ").toLowerCase(),
    description: page.description.toLowerCase(),
    text: page.text.toLowerCase(),
  };
  let score = 0;
  for (const term of terms) {
    if (fields.title === term) score += 50;
    if (fields.title.includes(term)) score += 22;
    if (fields.headings.includes(term)) score += 13;
    if (fields.keywords.includes(term)) score += 10;
    if (fields.description.includes(term)) score += 7;
    score += Math.min(fields.text.split(term).length - 1, 8) * 2;
  }
  if (fields.text.includes(normalized)) score += 12;
  return score;
}

function updateActiveResult(next) {
  const items = $$(".search-result", searchResults || document.createElement("div"));
  if (!items.length) return;
  activeResult = Math.max(0, Math.min(items.length - 1, next));
  items.forEach((item, index) => {
    item.classList.toggle("is-active", index === activeResult);
    item.setAttribute("aria-selected", String(index === activeResult));
  });
  items[activeResult]?.scrollIntoView({ block: "nearest" });
}

function renderSearch(query) {
  if (!searchResults || !searchHint || !searchIndex) return;
  const trimmed = query.trim();
  activeResult = -1;
  if (!trimmed) {
    searchResults.innerHTML = "";
    searchHint.hidden = false;
    return;
  }
  const ranked = searchIndex.pages
    .map((page) => ({ page, score: scorePage(page, trimmed) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
  searchHint.hidden = true;
  if (!ranked.length) {
    searchResults.innerHTML = '<div class="search-empty"><strong>没有找到匹配内容</strong><p>尝试更短的关键词，或搜索具体命令、配置项与错误词。</p></div>';
    return;
  }
  searchResults.innerHTML = ranked.map(({ page }) => `<a class="search-result" role="option" aria-selected="false" href="${escapeSearchHtml(page.url)}"><span>${escapeSearchHtml(page.section)}</span><strong>${escapeSearchHtml(page.title)}</strong><p>${escapeSearchHtml(excerpt(page.text, trimmed))}</p></a>`).join("");
}

async function ensureSearchIndex() {
  if (searchIndex) return searchIndex;
  const response = await fetch("/search-index.json", { credentials: "same-origin" });
  if (!response.ok) throw new Error(`search index ${response.status}`);
  searchIndex = await response.json();
  return searchIndex;
}

async function openSearch() {
  if (!searchDialog || !searchInput) return;
  setMobileMenu(false);
  setDocsMenu(false);
  if (typeof searchDialog.showModal === "function") searchDialog.showModal();
  else searchDialog.setAttribute("open", "");
  body.classList.add("search-open");
  searchInput.focus();
  try {
    await ensureSearchIndex();
    renderSearch(searchInput.value);
  } catch {
    if (searchHint) searchHint.textContent = "搜索索引加载失败，请直接从文档首页浏览。";
  }
}

function closeSearch() {
  if (!searchDialog) return;
  if (typeof searchDialog.close === "function" && searchDialog.open) searchDialog.close();
  else searchDialog.removeAttribute("open");
  body.classList.remove("search-open");
}

$$("[data-open-search]").forEach((button) => button.addEventListener("click", openSearch));
$("[data-close-search]")?.addEventListener("click", closeSearch);
searchInput?.addEventListener("input", () => renderSearch(searchInput.value));
searchDialog?.addEventListener("click", (event) => { if (event.target === searchDialog) closeSearch(); });
searchDialog?.addEventListener("close", () => body.classList.remove("search-open"));

document.addEventListener("keydown", (event) => {
  const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
  if (shortcut) { event.preventDefault(); openSearch(); return; }
  if (event.key === "Escape") {
    closeSearch();
    setMobileMenu(false);
    setDocsMenu(false);
  }
  if (!searchDialog?.open || !searchResults) return;
  if (event.key === "ArrowDown") { event.preventDefault(); updateActiveResult(activeResult + 1); }
  if (event.key === "ArrowUp") { event.preventDefault(); updateActiveResult(activeResult <= 0 ? 0 : activeResult - 1); }
  if (event.key === "Enter" && activeResult >= 0) {
    const active = $$(".search-result", searchResults)[activeResult];
    if (active) window.location.href = active.href;
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    setMobileMenu(false);
    setDocsMenu(false);
  }
}, { passive: true });
