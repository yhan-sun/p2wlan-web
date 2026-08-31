import { DOC_GROUP_ORDER } from "../data/site.mjs";
import { escapeHtml, formatDate, icon } from "../ui.mjs";

const GROUP_META = {
  "开始使用": { icon: "arrow", description: "安装、登录、第一次组网与版本校验。" },
  "网络原理": { icon: "route", description: "理解虚拟 IP、Direct、NAT 穿透与 Relay。" },
  "客户端": { icon: "monitor", description: "桌面、移动端、Linux CLI 与完整配置。" },
  "部署与运维": { icon: "server", description: "自托管、安全边界与分层故障排查。" },
  "项目": { icon: "terminal", description: "开发贡献、事实来源和产品边界。" },
};

function docLink(doc) {
  return `<a class="doc-index-link" href="${escapeHtml(doc.path)}"><div><strong>${escapeHtml(
    doc.title
  )}</strong><p>${escapeHtml(doc.description)}</p></div>${icon("arrow")}</a>`;
}

export function renderDocsIndex({ release, docs }) {
  const groups = DOC_GROUP_ORDER.map((name) => ({
    name,
    meta: GROUP_META[name],
    items: docs.filter((doc) => doc.group === name),
  })).filter((group) => group.items.length > 0);

  return `
    <main id="main-content" class="docs-hub">
      <section class="docs-hub__hero">
        <div class="container docs-hub__hero-grid">
          <div>
            <p class="page-kicker">Documentation · ${escapeHtml(release.tag)}</p>
            <h1>P2WLAN 文档</h1>
            <p>从安装两台设备开始，再按任务进入网络原理、自托管、安全和故障排查。每篇文档都对应当前 Release 的公开事实。</p>
          </div>
          <button class="docs-search-card" type="button" data-open-search>
            <span>${icon("search")}</span>
            <div><strong>搜索文档</strong><small>命令、配置、错误或概念</small></div>
            <kbd>⌘ K</kbd>
          </button>
        </div>
      </section>

      <section class="docs-hub__quick">
        <div class="container">
          <article class="quick-start-card">
            <div class="quick-start-card__copy"><p class="section-kicker">Start here</p><h2>五分钟连通两台设备。</h2><p>下载客户端、登录同一账号、启动虚拟网络，然后通过虚拟 IP 验证 Direct 或 Relay。</p><div class="inline-actions"><a class="button button--primary" href="/docs/getting-started/">开始快速指南 ${icon(
              "arrow"
            )}</a><a class="text-action" href="/download/">先下载客户端 ${icon("download")}</a></div></div>
            <ol class="quick-steps"><li><span>01</span><div><strong>安装</strong><small>桌面、Linux 或移动端</small></div></li><li><span>02</span><div><strong>加入网络</strong><small>获得稳定虚拟 IP</small></div></li><li><span>03</span><div><strong>验证路径</strong><small>Direct、Relay 与延迟</small></div></li></ol>
          </article>
        </div>
      </section>

      <section class="section section--compact section--surface">
        <div class="container">
          <header class="section-intro section-intro--small"><p class="section-kicker">Browse by task</p><h2>按任务找到正确的入口。</h2><p>文档首页只负责导航；进入具体文章后，再使用左侧章节目录和右侧本页目录持续阅读。</p></header>
          <div class="docs-group-grid">
            ${groups
              .map(
                (group) => `<section class="docs-group-card"><header><span>${icon(group.meta.icon)}</span><div><h2>${escapeHtml(
                  group.name
                )}</h2><p>${escapeHtml(group.meta.description)}</p></div></header><nav aria-label="${escapeHtml(group.name)}">${group.items
                  .map(docLink)
                  .join("")}</nav></section>`
              )
              .join("")}
          </div>
        </div>
      </section>

      <section class="docs-hub__support">
        <div class="container support-grid">
          <article><span>${icon("shield")}</span><div><h2>安全边界先读清楚</h2><p>Preview、控制面 TLS、Relay 可见元数据和终端安全是不同层次。</p><a class="text-action" href="/docs/security/">安全与威胁模型 ${icon("arrow")}</a></div></article>
          <article><span>${icon("terminal")}</span><div><h2>先收集证据，再修改配置</h2><p><code>status --json</code>、<code>doctor</code> 与脱敏日志能帮助区分控制面、TUN、Direct 和 Relay 问题。</p><a class="text-action" href="/docs/troubleshooting/">故障排查 ${icon("arrow")}</a></div></article>
        </div>
      </section>

      <section class="docs-release-strip"><div class="container"><div><span class="status-dot status-dot--direct"></span><strong>适用于 ${escapeHtml(
        release.tag
      )}</strong><small>发布于 ${formatDate(release.publishedAt)}</small></div><a href="/changelog/">查看当前版本 ${icon("arrow")}</a></div></section>
    </main>`;
}
