const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const html = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function setTheme(theme) {
  html.dataset.theme = theme;
  try {
    localStorage.setItem("p2wlan-theme", theme);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
  const icon = $("[data-theme-icon]");
  const button = $("[data-theme-toggle]");
  if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
  if (button) button.setAttribute("aria-label", theme === "dark" ? "切换到亮色主题" : "切换到暗色主题");
}

function resolvedTheme() {
  const saved = html.dataset.theme;
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

setTheme(resolvedTheme());
$("[data-theme-toggle]")?.addEventListener("click", () => {
  setTheme(resolvedTheme() === "dark" ? "light" : "dark");
});

const header = $("[data-site-header]");
const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const mobileButton = $("[data-mobile-menu-button]");
const mobileMenu = $("[data-mobile-menu]");
function closeMobileMenu() {
  if (!mobileMenu || !mobileButton) return;
  mobileMenu.hidden = true;
  mobileButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("mobile-menu-open");
}
mobileButton?.addEventListener("click", () => {
  if (!mobileMenu) return;
  const opening = mobileMenu.hidden;
  mobileMenu.hidden = !opening;
  mobileButton.setAttribute("aria-expanded", String(opening));
  document.body.classList.toggle("mobile-menu-open", opening);
});
$$("a", mobileMenu || document.createElement("div")).forEach((link) => link.addEventListener("click", closeMobileMenu));

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
    document.body.append(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  if (!button) return;
  const previous = button.textContent;
  button.textContent = "已复制";
  button.classList.add("is-copied");
  window.setTimeout(() => {
    button.textContent = previous;
    button.classList.remove("is-copied");
  }, 1600);
}

$$("[data-copy-text]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copyText || "", button));
});

$$(".code-frame").forEach((frame) => {
  const bar = $(".code-frame__bar", frame);
  const code = $("code", frame);
  if (!bar || !code) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "code-copy";
  button.textContent = "复制";
  button.setAttribute("aria-label", "复制代码");
  button.addEventListener("click", () => copyText(code.textContent || "", button));
  bar.append(button);
});

$$(".doc-content h2[id]").forEach((heading) => {
  const link = document.createElement("button");
  link.type = "button";
  link.className = "heading-link";
  link.setAttribute("aria-label", `复制“${heading.textContent}”章节链接`);
  link.textContent = "#";
  link.addEventListener("click", () => {
    const target = new URL(window.location.href);
    target.hash = heading.id;
    copyText(target.toString(), link);
  });
  heading.append(link);
});

const docsProgress = $("[data-docs-progress]");
const docArticle = $("[data-doc-article]");
function updateDocsProgress() {
  if (!docsProgress || !docArticle) return;
  const rect = docArticle.getBoundingClientRect();
  const start = window.scrollY + rect.top - 120;
  const length = Math.max(1, docArticle.offsetHeight - window.innerHeight + 160);
  const progress = Math.min(1, Math.max(0, (window.scrollY - start) / length));
  docsProgress.style.transform = `scaleX(${progress})`;
}
updateDocsProgress();
window.addEventListener("scroll", updateDocsProgress, { passive: true });
window.addEventListener("resize", updateDocsProgress, { passive: true });

const tocLinks = $$(".doc-toc nav a");
const tocHeadings = tocLinks
  .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
  .filter(Boolean);
if (tocLinks.length && tocHeadings.length && "IntersectionObserver" in window) {
  const visible = new Map();
  const activate = () => {
    const candidates = [...visible.entries()]
      .filter(([, isVisible]) => isVisible)
      .map(([element]) => element)
      .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const current = candidates[0] || tocHeadings.findLast((heading) => heading.getBoundingClientRect().top < 180);
    tocLinks.forEach((link) => link.classList.toggle("is-active", Boolean(current && link.hash === `#${current.id}`)));
  };
  const tocObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      activate();
    },
    { rootMargin: "-120px 0px -68% 0px", threshold: [0, 1] }
  );
  tocHeadings.forEach((heading) => tocObserver.observe(heading));
}

const docsSidebar = $("[data-docs-sidebar]");
const docsOpen = $("[data-open-docs-menu]");
function setDocsMenu(open) {
  if (!docsSidebar || !docsOpen) return;
  docsSidebar.classList.toggle("is-open", open);
  docsOpen.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("docs-menu-open", open);
}
docsOpen?.addEventListener("click", () => setDocsMenu(true));
$("[data-close-docs-menu]")?.addEventListener("click", () => setDocsMenu(false));

const scenarioData = {
  home: {
    stage: "home",
    badge: "Direct",
    title: "公网 UDP 直连",
    copy: "两端交换候选后直接传输；Relay 保持可用，但不承载业务数据。",
  },
  lan: {
    stage: "lan",
    badge: "LAN",
    title: "局域网直连",
    copy: "设备处于可达局域网时，直接使用本地候选，通常延迟最低。",
  },
  hard: {
    stage: "hard",
    badge: "Relay",
    title: "先经 Relay，再尝试直连",
    copy: "复杂 NAT 下先保证连接可用；后台仍会在有界范围内尝试更优路径。",
  },
  blocked: {
    stage: "blocked",
    badge: "Relay",
    title: "加密 Relay",
    copy: "UDP 被网络策略限制时，认证后的 TLS Relay 转发端点间密文。",
  },
};

const networkDemo = $("[data-network-demo]");
if (networkDemo) {
  const stage = $(".network-stage", networkDemo);
  const badge = $("[data-path-badge]", networkDemo);
  const title = $("[data-scenario-title]", networkDemo);
  const copy = $("[data-scenario-copy]", networkDemo);
  const tabs = $$("[data-scenario]", networkDemo);
  const applyScenario = (key) => {
    const data = scenarioData[key];
    if (!data) return;
    if (stage) stage.dataset.stage = data.stage;
    if (badge) badge.textContent = data.badge;
    if (title) title.textContent = data.title;
    if (copy) copy.textContent = data.copy;
    tabs.forEach((tab) => {
      const selected = tab.dataset.scenario === key;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
    });
  };
  tabs.forEach((tab) => tab.addEventListener("click", () => applyScenario(tab.dataset.scenario)));
}

function detectPlatform() {
  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
  if (ua.includes("android")) return { key: "android-arm64", title: "Android arm64", description: "arm64 APK，需要侧载并授予系统 VPN 权限。" };
  if (/iphone|ipad|ipod/.test(ua)) return { key: "ios-arm64", title: "iOS arm64（未签名）", description: "未签名 IPA，需要使用自己的开发者证书签名。" };
  if (platform.includes("win")) return { key: "windows-x64", title: "Windows x64", description: "Windows 10/11 x64 安装程序。" };
  if (platform.includes("mac")) {
    return { key: "macos-arm64", title: "macOS", description: "Apple Silicon 使用 arm64 DMG；Intel Mac 请选择 x64 DMG。" };
  }
  if (platform.includes("linux") || ua.includes("linux")) {
    const arm = /aarch64|arm64/.test(ua);
    return arm
      ? { key: "linux-cli-arm64", title: "Linux arm64", description: "arm64 服务器使用 CLI 与 daemon。" }
      : { key: "linux-cli-x64", title: "Linux x86_64", description: "服务器使用 CLI 与 daemon；桌面环境也可选择 GUI。" };
  }
  return { key: "", title: "请选择你的平台", description: "未识别当前系统，请从下方文件列表选择。" };
}

const platform = detectPlatform();
document.body.dataset.platform = platform.key;
const assetLinks = new Map();
$$("[data-download-key]").forEach((link) => {
  if (!assetLinks.has(link.dataset.downloadKey)) assetLinks.set(link.dataset.downloadKey, link.href);
});
const recommendedUrl = assetLinks.get(platform.key);
$$("[data-smart-download]").forEach((link) => {
  if (recommendedUrl) {
    link.href = recommendedUrl;
    if (link.closest("[data-smart-panel]")) link.textContent = "下载推荐版本";
  }
});
const smartTitle = $("[data-smart-title]");
const smartDescription = $("[data-smart-description]");
if (smartTitle) smartTitle.textContent = platform.title;
if (smartDescription) smartDescription.textContent = platform.description;
if (platform.key) $(`[data-platform-card="${platform.key}"]`)?.classList.add("is-recommended");

const searchDialog = $("[data-search-dialog]");
const searchInput = $("[data-search-input]");
const searchResults = $("[data-search-results]");
const searchHint = $("[data-search-hint]");
let searchIndex = null;
let activeResult = -1;

function escapeSearchHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function excerpt(text, query) {
  const normalized = text.toLowerCase();
  const index = normalized.indexOf(query.toLowerCase());
  const start = Math.max(0, index < 0 ? 0 : index - 70);
  const fragment = text.slice(start, start + 190).trim();
  return `${start > 0 ? "…" : ""}${fragment}${start + 190 < text.length ? "…" : ""}`;
}

function scorePage(page, query) {
  const q = query.toLowerCase().trim();
  if (!q) return 0;
  const terms = q.split(/\s+/).filter(Boolean);
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
    if (fields.title.includes(term)) score += 20;
    if (fields.headings.includes(term)) score += 12;
    if (fields.keywords.includes(term)) score += 10;
    if (fields.description.includes(term)) score += 7;
    const occurrences = fields.text.split(term).length - 1;
    score += Math.min(occurrences, 8) * 2;
  }
  if (fields.text.includes(q)) score += 12;
  return score;
}

function updateActiveResult(next) {
  const items = $$(".search-result", searchResults || document.createElement("div"));
  if (!items.length) return;
  activeResult = Math.max(0, Math.min(items.length - 1, next));
  items.forEach((item, index) => item.classList.toggle("is-active", index === activeResult));
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
    searchResults.innerHTML = `<div class="search-empty"><strong>没有找到匹配内容</strong><p>尝试更短的关键词，或搜索具体命令、配置项与错误词。</p></div>`;
    return;
  }
  searchResults.innerHTML = ranked
    .map(
      ({ page }) => `<a class="search-result" role="option" href="${escapeSearchHtml(page.url)}"><span>${escapeSearchHtml(
        page.section
      )}</span><strong>${escapeSearchHtml(page.title)}</strong><p>${escapeSearchHtml(excerpt(page.text, trimmed))}</p></a>`
    )
    .join("");
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
  closeMobileMenu();
  if (typeof searchDialog.showModal === "function") searchDialog.showModal();
  else searchDialog.setAttribute("open", "");
  document.body.classList.add("search-open");
  searchInput.focus();
  try {
    await ensureSearchIndex();
    renderSearch(searchInput.value);
  } catch {
    if (searchHint) {
      searchHint.hidden = false;
      searchHint.textContent = "搜索索引加载失败，请通过文档目录浏览。";
    }
  }
}

function closeSearch() {
  if (!searchDialog) return;
  if (typeof searchDialog.close === "function" && searchDialog.open) searchDialog.close();
  else searchDialog.removeAttribute("open");
  document.body.classList.remove("search-open");
}

$$("[data-open-search]").forEach((button) => button.addEventListener("click", openSearch));
$("[data-close-search]")?.addEventListener("click", closeSearch);
searchDialog?.addEventListener("click", (event) => {
  if (event.target === searchDialog) closeSearch();
});
searchInput?.addEventListener("input", () => renderSearch(searchInput.value));
searchInput?.addEventListener("keydown", (event) => {
  const items = $$(".search-result", searchResults || document.createElement("div"));
  if (event.key === "ArrowDown") {
    event.preventDefault();
    updateActiveResult(activeResult + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    updateActiveResult(activeResult <= 0 ? items.length - 1 : activeResult - 1);
  } else if (event.key === "Enter" && activeResult >= 0) {
    event.preventDefault();
    items[activeResult]?.click();
  }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    openSearch();
  } else if (event.key === "Escape") {
    closeSearch();
    closeMobileMenu();
    setDocsMenu(false);
  }
});

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = decodeURIComponent(link.hash.slice(1));
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: prefersReducedMotion.matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${encodeURIComponent(id)}`);
  });
});
