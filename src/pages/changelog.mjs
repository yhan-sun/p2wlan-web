import { SITE } from "../data/site.mjs";
import { escapeHtml, formatBytes, formatDate, icon } from "../ui.mjs";

export function renderChangelog({ release, assets }) {
  const totalBytes = assets.reduce((sum, asset) => sum + Number(asset.size || 0), 0);
  const families = new Set(assets.map((asset) => asset.family)).size;

  return `
    <main id="main-content" class="page-main">
      <section class="page-hero page-hero--release">
        <div class="container page-hero__grid">
          <div class="page-hero__copy"><p class="page-kicker">Release history</p><h1>版本与发布状态</h1><p>官网在构建时同步最新正式 Release。功能事实、预编译资产与 SHA-256 以对应 GitHub tag 为准。</p></div>
          <div class="release-orbit" aria-hidden="true"><span>${escapeHtml(release.tag)}</span><i></i><b>Preview</b></div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container release-layout">
          <article class="release-card">
            <header><div><p>Current release</p><h2>${escapeHtml(release.tag)}</h2><span>${formatDate(
              release.publishedAt
            )}</span></div><a class="button button--primary" href="${escapeHtml(release.url)}">GitHub Release ${icon(
              "arrow"
            )}</a></header>
            <dl><div><dt>资产</dt><dd>${assets.length}</dd><small>安装包与 CLI 构建</small></div><div><dt>平台族</dt><dd>${families}</dd><small>桌面、Linux 与移动端</small></div><div><dt>总大小</dt><dd>${formatBytes(
              totalBytes
            )}</dd><small>当前 Release 资产合计</small></div><div><dt>许可</dt><dd>MIT</dd><small>源码许可</small></div></dl>
            <footer><span class="status-dot status-dot--direct"></span><p>Release 元数据来源：${escapeHtml(
              release.source
            )}</p></footer>
          </article>

          <aside class="release-notes"><p class="section-kicker">Release discipline</p><h2>发布版本和主分支需要严格区分。</h2><div><article><span>01</span><div><h3>Release 是可下载基线</h3><p>发布工作流生成并上传预编译文件；下载页只把当前 Release 的资产描述为已发布能力。</p></div></article><article><span>02</span><div><h3>主分支可能领先</h3><p>尚未打 tag 的代码、实验开关与文档修改，不自动视为当前 Release 已支持。</p></div></article><article><span>03</span><div><h3>摘要不是安全审计</h3><p>SHA-256 可以发现文件变化，但不能替代代码签名、可复现构建或独立安全审计。</p></div></article></div></aside>
        </div>
      </section>

      <section class="section section--compact section--surface">
        <div class="container timeline-layout">
          <header class="section-intro section-intro--small"><p class="section-kicker">How to investigate regressions</p><h2>记录最后正常版本和首次异常版本。</h2><p>网络路径问题往往与平台、NAT 组合和时间窗口相关。版本号只是证据的一部分，还应保存两端平台、网络拓扑、路径与脱敏诊断。</p></header>
          <ol class="release-process"><li><span>1</span><div><strong>固定两端版本</strong><small>避免自动更新干扰复现。</small></div></li><li><span>2</span><div><strong>记录网络组合</strong><small>家庭宽带、热点、CGNAT 或企业网络。</small></div></li><li><span>3</span><div><strong>对比路径证据</strong><small>Direct、Relay、延迟与诊断 JSON。</small></div></li></ol>
        </div>
      </section>

      <section class="page-cta"><div class="container page-cta__panel"><div><p>历史版本</p><h2>所有 tag、源码归档和 Release 资产都保留在 GitHub。</h2></div><a class="button button--light" href="${SITE.releases}">浏览全部 Release ${icon(
        "arrow"
      )}</a></div></section>
    </main>`;
}
