import { DOC_GROUP_ORDER } from "../data/site.mjs";
import { escapeHtml, formatDate, icon } from "../ui.mjs";

const GROUP_META = {
  "开始使用": "从安装到第一条连接。",
  "网络原理": "了解虚拟 IP、直连与回退。",
  "客户端": "桌面、移动端与命令行。",
  "部署与运维": "运行和维护自己的基础设施。",
  "项目": "了解边界，参与开发。",
};

export function renderDocsIndex({ release, docs }) {
  const groups = DOC_GROUP_ORDER.map((name) => ({ name, items: docs.filter((doc) => doc.group === name) })).filter((group) => group.items.length);
  return `<main id="main-content" class="docs-hub">
    <section class="docs-hub__hero"><div class="container docs-hub__hero-grid"><div><p class="page-kicker">Documentation / ${escapeHtml(release.tag)}</p><h1>P2WLAN 文档</h1><p>从第一次连接，到运行自己的网络。</p></div><button class="docs-search-card" type="button" data-open-search>${icon("search")}<span>搜索命令、配置或问题</span><kbd data-shortcut-hint>⌘ K</kbd></button></div></section>
    <section class="docs-hub__quick"><div class="container"><article class="quick-start-card"><div><p class="section-kicker">Start here</p><h2>五分钟，连通两台设备。</h2><p>安装客户端、登录同一账号、启动虚拟网络，<br class="desktop-break"/>然后通过虚拟 IP 验证连接。</p><div class="inline-actions"><a class="button button--primary" href="/docs/getting-started/">开始快速指南 ${icon("arrow")}</a><a class="text-action" href="/download/">下载客户端 ${icon("download")}</a></div></div><ol class="quick-steps"><li><span>01</span><div><strong>安装客户端</strong><small>选择你的系统与架构</small></div></li><li><span>02</span><div><strong>加入虚拟网络</strong><small>登录并启动网络</small></div></li><li><span>03</span><div><strong>验证连接</strong><small>查看 Direct 或 Relay 路径</small></div></li></ol></article></div></section>
    <section class="docs-hub__browse"><div class="container"><header class="docs-browse-heading"><p class="section-kicker">Find your next step</p><h2>按任务浏览</h2></header><div class="docs-groups">${groups.map((group, index) => `<section class="docs-group-row"><header><span>0${index + 1}</span><h2>${escapeHtml(group.name)}</h2><p>${GROUP_META[group.name]}</p></header><nav aria-label="${escapeHtml(group.name)}">${group.items.map((doc) => `<a class="doc-index-link" href="${escapeHtml(doc.path)}"><div><strong>${escapeHtml(doc.title)}</strong><p>${escapeHtml(doc.description)}</p></div>${icon("arrow")}</a>`).join("")}</nav></section>`).join("")}</div></div></section>
    <section class="docs-hub__support"><div class="container support-grid"><article><p class="section-kicker">Understand the boundary</p><h2>加密，保护哪些部分？</h2><p>控制面 TLS、Relay 可见元数据与终端安全，各自承担不同职责。</p><a class="text-action" href="/docs/security/">安全与威胁模型 ${icon("arrow")}</a></article><article><p class="section-kicker">Troubleshooting</p><h2>连接不通，从证据开始。</h2><p>使用 <code>status --json</code>、<code>doctor</code> 和脱敏日志定位问题。</p><a class="text-action" href="/docs/troubleshooting/">故障排查 ${icon("arrow")}</a></article></div></section>
    <div class="docs-release-strip"><div class="container"><p>当前客户端 <strong>${escapeHtml(release.tag)}</strong><span>发布于 ${formatDate(release.publishedAt)}</span></p><a href="/changelog/">版本变化 ${icon("arrow")}</a></div></div>
  </main>`;
}
