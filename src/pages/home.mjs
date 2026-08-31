import { assetByKey, assetLink, escapeHtml, formatDate, icon, textAssetLink } from "../ui.mjs";

export function renderHome({ release, assets }) {
  const windows = assetByKey(assets, "windows-x64");
  const macArm = assetByKey(assets, "macos-arm64");
  const linuxCli = assetByKey(assets, "linux-cli-x64");
  const android = assetByKey(assets, "android-arm64");

  return `
    <main id="main-content">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="container home-hero__grid">
          <div class="home-hero__copy">
            <p class="release-eyebrow"><span class="status-dot status-dot--direct"></span><span>${escapeHtml(release.tag)}</span><span>开源 Preview</span></p>
            <h1 id="home-title">不同网络，<br /><span>同一个局域网。</span></h1>
            <p class="home-hero__lead">为每台设备分配稳定的私有地址。优先建立端点间加密直连；网络受限时自动切换 Relay，应用仍使用同一个虚拟 IP。</p>
            <div class="hero-actions">
              <a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载客户端</span></a>
              <a class="button button--secondary button--large" href="/docs/getting-started/"><span>五分钟快速开始</span>${icon("arrow")}</a>
            </div>
            <div class="platform-proof" aria-label="支持的平台"><span>Windows</span><span>macOS</span><span>Linux</span><span>Android</span><span>iOS</span></div>
          </div>

          <div class="network-product" aria-label="P2WLAN 产品界面示意">
            <div class="network-product__glow" aria-hidden="true"></div>
            <div class="network-window">
              <header class="network-window__bar">
                <div class="network-name"><span class="status-dot status-dot--direct"></span><div><strong>HomeLab Network</strong><small>private mesh</small></div></div>
                <code>10.20.0.0/24 · 3 online</code>
              </header>
              <div class="network-map" aria-hidden="true">
                <div class="network-map__grid"></div>
                <div class="map-node map-node--left"><span>M</span><strong>MacBook</strong><small>10.20.0.2</small></div>
                <div class="map-path"><i></i><b></b></div>
                <div class="map-node map-node--right"><span>H</span><strong>Home Server</strong><small>10.20.0.5</small></div>
                <div class="relay-standby"><span class="status-dot status-dot--relay"></span>Relay standby</div>
              </div>
              <div class="peer-table" role="table" aria-label="设备连接状态">
                <div class="peer-row" role="row"><span class="peer-avatar">M</span><div><strong>macbook-pro</strong><small>10.20.0.2</small></div><span class="connection-state connection-state--direct"><i></i>Direct · 8 ms</span></div>
                <div class="peer-row" role="row"><span class="peer-avatar">H</span><div><strong>home-server</strong><small>10.20.0.5</small></div><span class="connection-state connection-state--direct"><i></i>Direct · 12 ms</span></div>
                <div class="peer-row" role="row"><span class="peer-avatar">W</span><div><strong>windows-pc</strong><small>10.20.0.8</small></div><span class="connection-state connection-state--relay"><i></i>Relay · 31 ms</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="trust-rail" aria-label="P2WLAN 核心能力">
        <div class="container trust-rail__grid">
          <article><span>${icon("route")}</span><div><strong>直连优先</strong><small>LAN 与公网 UDP</small></div></article>
          <article><span>${icon("shield")}</span><div><strong>端点间加密</strong><small>Relay 只转发密文</small></div></article>
          <article><span>${icon("server")}</span><div><strong>自动回退</strong><small>复杂网络也保持连接</small></div></article>
          <article><span>${icon("key")}</span><div><strong>完全可自托管</strong><small>Control Plane 与 Relay</small></div></article>
        </div>
      </section>

      <section class="section section--surface" id="product">
        <div class="container">
          <header class="section-intro">
            <p class="section-kicker">Product</p>
            <h2>复杂网络留在底层，<br />设备只需要一个地址。</h2>
            <p>连接 SSH、RDP、数据库、NAS 和内部 Web 服务时，继续使用熟悉的协议。底层路径变化不会改变虚拟 IP。</p>
          </header>
          <div class="product-showcase">
            <div class="feature-stack">
              <article><span>01</span><div><h3>一眼看清连接路径</h3><p>Direct、Relay、离线状态和延迟放在同一处，不再从日志里猜测当前路径。</p></div></article>
              <article><span>02</span><div><h3>桌面与移动端使用同一语义</h3><p>Windows、macOS、Linux、Android 与 iOS 都围绕设备、虚拟地址和连接状态组织。</p></div></article>
              <article><span>03</span><div><h3>需要时再深入诊断</h3><p>日常操作保持简单；排障时再进入 <code>status</code>、<code>doctor</code>、日志和配置。</p></div></article>
              <a class="text-action" href="/docs/networking/">了解连接模型 ${icon("arrow")}</a>
            </div>

            <div class="app-preview" aria-label="P2WLAN 设备管理界面示意">
              <header class="app-preview__bar"><span class="window-dots"><i></i><i></i><i></i></span><strong>P2WLAN</strong><span class="app-preview__sync"><i></i>已同步</span></header>
              <div class="app-preview__body">
                <nav aria-label="产品示意导航"><a class="is-active">设备</a><a>网络</a><a>诊断</a><a>设置</a></nav>
                <div class="device-canvas">
                  <header><div><p>HomeLab</p><h3>我的设备</h3></div><span>4 台在线</span></header>
                  <div class="device-cards">
                    <article><div><span class="device-symbol">M</span><strong>MacBook Pro</strong></div><span class="path-pill path-pill--direct">Direct</span><code>10.20.0.2 · 8 ms</code></article>
                    <article><div><span class="device-symbol">H</span><strong>Home Server</strong></div><span class="path-pill path-pill--direct">Direct</span><code>10.20.0.5 · 12 ms</code></article>
                    <article><div><span class="device-symbol">W</span><strong>Windows PC</strong></div><span class="path-pill path-pill--relay">Relay</span><code>10.20.0.8 · 31 ms</code></article>
                    <article><div><span class="device-symbol">A</span><strong>Android</strong></div><span class="path-pill path-pill--direct">Direct</span><code>10.20.0.11 · 18 ms</code></article>
                  </div>
                  <dl class="network-metrics"><div><dt>Network</dt><dd>HomeLab</dd></div><div><dt>Address</dt><dd>10.20.0.2</dd></div><div><dt>Uptime</dt><dd>6h 42m</dd></div></dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="self-hosted">
        <div class="container architecture-grid">
          <div class="architecture-visual" aria-label="P2WLAN 自托管架构示意">
            <div class="architecture-visual__glow" aria-hidden="true"></div>
            <p class="section-kicker">Architecture</p>
            <h2>控制面协调，<br />数据尽量直达。</h2>
            <div class="endpoint-row"><div><small>DEVICE A</small><strong>10.20.0.2</strong></div><span><i></i><b>encrypted path</b></span><div><small>DEVICE B</small><strong>10.20.0.5</strong></div></div>
            <div class="control-plane-card"><span>${icon("server")}</span><div><strong>Your Control Plane</strong><p>身份、虚拟 IP、候选交换和 Relay ticket。业务数据优先在端点之间传输。</p></div></div>
            <div class="architecture-status"><span><i class="status-dot status-dot--direct"></i>Direct preferred</span><span><i class="status-dot status-dot--relay"></i>Relay fallback</span></div>
          </div>

          <div class="architecture-copy">
            <header class="section-intro">
              <p class="section-kicker">Self-hosted</p>
              <h2>你的网络，<br />运行在自己的<br />基础设施上。</h2>
              <p>Control Plane 与 Relay 都可以部署在自己的 Linux 主机。公开部署时使用 HTTPS/WSS、独立密钥与明确的安全边界。</p>
            </header>
            <div class="architecture-list">
              <article><span>01</span><div><h3>端点间加密</h3><p>Relay 按设计不持有业务会话私钥，只转发端点之间的密文。</p></div></article>
              <article><span>02</span><div><h3>Relay 是回退路径</h3><p>能直连时不绕路；网络条件变化后仍可以继续尝试更优路径。</p></div></article>
              <article><span>03</span><div><h3>安全边界明确说明</h3><p>项目处于 Preview，控制面 TLS、终端安全和供应链验证分别处理。</p></div></article>
            </div>
            <div class="inline-actions"><a class="button button--secondary" href="/docs/self-hosting/">自托管指南 ${icon("arrow")}</a><a class="text-action" href="/docs/security/">查看安全边界 ${icon("arrow")}</a></div>
          </div>
        </div>
      </section>

      <section class="section section--surface" id="download">
        <div class="container">
          <div class="section-split">
            <header class="section-intro"><p class="section-kicker">Download</p><h2>选择你的平台，<br />先连通两台设备。</h2><p>安装包、文件大小和 SHA-256 都在构建时从 GitHub Releases 同步。</p></header>
            <a class="button button--dark" href="/download/">查看全部下载 ${icon("arrow")}</a>
          </div>
          <div class="platform-grid">
            <article class="platform-card" data-platform-card="windows-x64"><span class="platform-icon">W</span><div><h3>Windows</h3><p>Windows 10/11 · x64</p></div>${textAssetLink(windows, "下载 .exe")}</article>
            <article class="platform-card" data-platform-card="macos-arm64"><span class="platform-icon">M</span><div><h3>macOS</h3><p>Apple Silicon 与 Intel</p></div>${textAssetLink(macArm, "选择 DMG")}</article>
            <article class="platform-card" data-platform-card="linux-cli-x64"><span class="platform-icon">L</span><div><h3>Linux</h3><p>GUI、CLI 与 daemon</p></div>${textAssetLink(linuxCli, "选择构建")}</article>
            <article class="platform-card" data-platform-card="android-arm64"><span class="platform-icon">A</span><div><h3>Mobile</h3><p>Android APK 与 iOS IPA</p></div>${textAssetLink(android, "查看移动端")}</article>
          </div>
        </div>
      </section>

      <section class="home-cta">
        <div class="container home-cta__panel">
          <div><p>${escapeHtml(release.tag)} · ${formatDate(release.publishedAt)} · Preview</p><h2>不同网络，同一个局域网。</h2><span>开源、可自托管，从两台设备开始。</span></div>
          ${assetLink(windows, `下载 ${release.tag}`, "button button--light button--large")}
        </div>
      </section>
    </main>`;
}
