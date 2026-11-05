import { SITE } from "../data/site.mjs";
import { escapeHtml, formatDate, icon, releaseLabel } from "../ui.mjs";

// Small, escaped subset of release Markdown. No raw HTML or arbitrary links.
function inlineNotes(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\((https:\/\/github\.com\/yhan-sun\/p2wlan\/[a-zA-Z0-9_./?#=-]+)\)/g, '<a href="$2">$1 ↗</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function renderNotes(body) {
  if (!body.trim()) return '<p>此版本未提供发布说明。查看 GitHub 发布详情。</p>';
  let list = false;
  const output = [];
  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line || /^P2WLAN v\d/.test(line)) continue;
    const item = line.match(/^[-*] (.+)/);
    if (item) {
      if (!list) { output.push("<ul>"); list = true; }
      output.push(`<li>${inlineNotes(item[1])}</li>`);
      continue;
    }
    if (list) { output.push("</ul>"); list = false; }
    if (/^#{1,3}\s|^(改进与修复|验证与边界|已知限制)$/.test(line)) output.push(`<h3>${inlineNotes(line.replace(/^#+\s*/, ""))}</h3>`);
    else output.push(`<p>${inlineNotes(line)}</p>`);
  }
  if (list) output.push("</ul>");
  return output.join("");
}

export function renderChangelog({ release }) {
  return `<main id="main-content" class="page-main">
    <section class="page-hero changelog-hero"><div class="container"><h1>更新记录</h1><p>客户端更新、问题修复与已知限制。</p><a class="text-action" href="${SITE.releases}">GitHub 全部版本 ↗</a></div></section>
    <section class="release-timeline" aria-label="客户端版本时间线"><div class="container">
      <article class="release-entry release-entry--current" id="${escapeHtml(release.tag)}"><header class="release-entry__meta"><span class="release-badge">最新${releaseLabel(release)}</span><h2>${escapeHtml(release.tag)}</h2><time datetime="${escapeHtml(release.publishedAt)}">${formatDate(release.publishedAt)}</time><a href="${escapeHtml(release.url)}">发布详情 ↗</a></header><div class="release-entry__body"><div class="release-entry__actions"><a class="button button--primary" href="/download/">下载此版本 ${icon("download")}</a></div><div class="release-markdown">${renderNotes(release.body)}</div></div></article>
      ${(release.history || []).map((item) => `<article class="release-entry" id="${escapeHtml(item.tag)}"><header class="release-entry__meta"><h2>${escapeHtml(item.tag)}</h2><time datetime="${escapeHtml(item.publishedAt)}">${formatDate(item.publishedAt)}</time><a href="${escapeHtml(item.url)}">发布详情 ↗</a></header><details class="release-history-notes"><summary><span>查看发布说明</span>${icon("chevron")}</summary><div class="release-markdown">${renderNotes(item.body)}</div></details></article>`).join("")}
    </div></section>
    <section class="release-footnote"><div class="container"><p>发布说明来自 GitHub Release。客户端 <code>vX.Y.Z</code> 与服务端 <code>server-vX.Y.Z</code> 分别发布。本页仅记录已发布版本。</p><a class="text-action" href="/docs/release-verification/">版本与完整性校验 ${icon("arrow")}</a></div></section>
  </main>`;
}
