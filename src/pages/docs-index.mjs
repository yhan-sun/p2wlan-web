import { DOC_GROUP_ORDER } from "../data/site.mjs";
import { escapeHtml, formatDate, icon } from "../ui.mjs";

const GROUP_META = {
  "开始使用": "安装、组网与校验。",
  "网络原理": "虚拟 IP、直连与中继。",
  "客户端": "桌面、移动端与命令行。",
  "部署与运维": "自托管、配置与故障排查。",
  "项目": "源码、贡献与常见问题。",
};

export function renderDocsIndex({ release, docs }) {
  const groups = DOC_GROUP_ORDER.map((name) => ({ name, items: docs.filter((doc) => doc.group === name) })).filter((group) => group.items.length);
  return `<main id="main-content" class="docs-hub">
    <section class="docs-hub__hero"><div class="container docs-hub__hero-grid"><div><p class="docs-version">客户端 ${escapeHtml(release.tag)}</p><h1>P2WLAN 文档</h1><p>安装、组网、配置与自托管指南。</p></div><button class="docs-search-card" type="button" data-open-search>${icon("search")}<span>搜索命令、配置或问题</span><kbd data-shortcut-hint>⌘ K</kbd></button></div></section>
    <section class="docs-hub__quick"><div class="container"><article class="quick-start-card"><div><h2>连接两台设备</h2><p>在两台设备上登录同一账号，启动虚拟网络，<br class="desktop-break"/>通过虚拟 IP 验证连接。</p><div class="inline-actions"><a class="button button--primary" href="/docs/getting-started/">快速开始 ${icon("arrow")}</a><a class="text-action" href="/download/">下载客户端 ${icon("download")}</a></div></div><ol class="quick-steps"><li><span>01</span><div><strong>安装客户端</strong><small>选择系统与架构</small></div></li><li><span>02</span><div><strong>加入虚拟网络</strong><small>登录并启动网络</small></div></li><li><span>03</span><div><strong>验证连接</strong><small>查看 Direct 或 Relay 路径</small></div></li></ol></article></div></section>
    <section class="docs-hub__browse"><div class="container"><header class="docs-browse-heading"><h2>按任务浏览</h2></header><div class="docs-groups">${groups.map((group) => `<section class="docs-group-row"><header><h2>${escapeHtml(group.name)}</h2><p>${GROUP_META[group.name]}</p></header><nav aria-label="${escapeHtml(group.name)}">${group.items.map((doc) => `<a class="doc-index-link" href="${escapeHtml(doc.path)}"><div><strong>${escapeHtml(doc.title)}</strong><p>${escapeHtml(doc.description)}</p></div>${icon("arrow")}</a>`).join("")}</nav></section>`).join("")}</div></div></section>
    <section class="docs-hub__support"><div class="container support-grid"><article><h2>加密与安全</h2><p>查看控制面 TLS、Relay 可见元数据和终端安全要求。</p><a class="text-action" href="/docs/security/">安全与威胁模型 ${icon("arrow")}</a></article><article><h2>排查连接问题</h2><p>使用 <code>status --json</code>、<code>doctor</code> 和脱敏日志定位问题。</p><a class="text-action" href="/docs/troubleshooting/">故障排查 ${icon("arrow")}</a></article></div></section>
    <div class="docs-release-strip"><div class="container"><p>当前客户端 <strong>${escapeHtml(release.tag)}</strong><span>发布于 ${formatDate(release.publishedAt)}</span></p><a href="/changelog/">更新记录 ${icon("arrow")}</a></div></div>
  </main>`;
}
