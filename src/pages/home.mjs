import { SITE } from "../data/site.mjs";
import { escapeHtml, icon, releaseLabel } from "../ui.mjs";
import { renderNetworkDemo } from "../components/network-demo.mjs";
import { renderOpticalScene } from "../components/optical-scene.mjs";

const screenshots = [
  ["home", "网络概览", "首页：虚拟 IP、网络状态与在线设备"],
  ["devices", "设备", "设备列表：名称、虚拟 IP 与连接路径"],
  ["rooms", "房间", "互联页面：多房间管理"],
  ["room", "房间详情", "房间详情：成员、虚拟 IP 与连接状态"],
];

export function renderHome({ release }) {
  return `<main id="main-content">
    <section class="home-hero" aria-labelledby="home-title">
      ${renderOpticalScene("home-hero__art", true)}
      <div class="container">
        <div class="home-hero__copy">
          <a class="release-eyebrow" href="/changelog/"><span>${escapeHtml(release.tag)}</span><span>${releaseLabel(release)} · 免费开源</span>${icon("chevron")}</a>
          <h1 id="home-title"><span>不同网络，</span><span>同一个局域网。</span></h1>
          <p class="home-hero__lead">让远方的设备，像在身边一样互联。<br/>P2P 直连优先，加密通信，必要时回退中继。</p>
          <div class="hero-actions"><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a><a class="button button--secondary button--large" href="/docs/getting-started/">快速开始 ${icon("arrow")}</a></div>
          <p class="platform-proof">Windows <span>·</span> macOS <span>·</span> Linux <span>·</span> Android</p>
        </div>
        <div class="home-hero__demo" data-reveal>${renderNetworkDemo()}<p class="demo-caption">连接过程与地址均为示意。NAT 与防火墙可能阻止直连；Relay 也需要配置且可达。<a href="/docs/networking/">了解连接模型 ${icon("arrow")}</a></p></div>
      </div>
    </section>
    <section class="use-cases" aria-label="适用场景"><div class="container"><p>熟悉的应用，<strong>更近的连接。</strong></p><ul><li>NAS / HomeLab</li><li>朋友联机</li><li>SSH / 远程开发</li><li>跨地域组网</li></ul></div></section>
    <section class="section product-section" id="product" aria-labelledby="product-title">
      <div class="container">
        <header class="section-intro section-intro--center"><p class="section-kicker">Closer, by design</p><h2 id="product-title">远在不同网络，<br/>近在一个地址。</h2><p>连接 NAS、开发机或游戏服务器，继续用你熟悉的虚拟 IP。<br class="desktop-break"/>设备、房间与连接路径，都在客户端里清楚呈现。</p></header>
        <div class="product-gallery" data-product-gallery data-reveal>
          <div class="product-gallery__tabs" role="tablist" aria-label="客户端界面">${screenshots.map(([key, label], index) => `<button id="screenshot-tab-${key}" type="button" role="tab" aria-selected="${index === 0}" aria-controls="screenshot-${key}" tabindex="${index === 0 ? "0" : "-1"}" data-screenshot-tab="${key}">${label}</button>`).join("")}</div>
          <div class="product-gallery__viewport">${screenshots.map(([key, , alt], index) => `<figure id="screenshot-${key}" role="tabpanel" aria-labelledby="screenshot-tab-${key}" tabindex="0"${index ? " hidden" : ""}><img src="/images/product/screenshot-${key}.webp" width="1536" height="1024" alt="P2WLAN 客户端${alt}，截图中的设备与数据为演示数据" loading="lazy" decoding="async"/><figcaption>${alt}<a href="/images/product/screenshot-${key}.webp" target="_blank" rel="noopener" aria-label="新标签页放大查看${alt}">查看原图 ↗</a></figcaption></figure>`).join("")}</div>
          <p class="product-gallery__source">来自 P2WLAN 主仓库的客户端截图 · 设备名称、速率与延迟为演示数据</p>
        </div>
        <div class="product-notes"><article><span>01 / 设备</span><h3>一个虚拟 IP，连接熟悉的服务。</h3><p>SSH、远程桌面、NAS 与内部 Web 服务，按应用原有的认证方式访问。</p></article><article><span>02 / 房间</span><h3>把这次互联，组织在一起。</h3><p>通过房间管理一组设备，查看成员和路径，适合朋友联机与协作。</p></article></div>
      </div>
    </section>
    <section class="section connection-section" aria-labelledby="connection-title"><div class="container connection-editorial">
      <div><header class="section-intro"><p class="section-kicker">A shorter path</p><h2 id="connection-title">能直达，就不绕路。</h2><p>优先尝试局域网与公网 UDP 直连。复杂网络中使用加密 Relay，并继续寻找可用直连路径。</p><a class="text-action" href="/docs/nat-traversal/">了解 NAT 穿透 ${icon("arrow")}</a></header><figure class="connection-art">${renderOpticalScene("connection-art__scene")}<figcaption><span>NETWORK LIGHT PATH</span><button class="text-action" type="button" data-optical-replay aria-label="重新播放光路视觉">${icon("replay")}重播光路</button></figcaption></figure></div>
      <div class="path-comparison" data-reveal><article><div class="path-comparison__title"><span class="status-dot status-dot--direct"></span><h3>Direct</h3><span>优先路径</span></div><div class="path-mini path-mini--direct" aria-hidden="true"><span>设备 A</span><i></i><span>设备 B</span></div><p>端点之间直接传输加密数据，能否建立取决于真实网络条件。</p></article><article><div class="path-comparison__title"><span class="status-dot status-dot--relay"></span><h3>Relay</h3><span>回退路径</span></div><div class="path-mini path-mini--relay" aria-hidden="true"><span>设备 A</span><i></i><b>中继</b><i></i><span>设备 B</span></div><p>Relay 转发密文。应用仍使用同一个虚拟 IP，无需手动更换地址。</p></article></div>
    </div></section>
    <section class="section hosting-section" id="self-hosted" aria-labelledby="hosting-title"><div class="container hosting-editorial">
      <div class="hosting-blueprint" data-reveal><header><span>YOUR INFRASTRUCTURE</span><span>架构示意</span></header><div class="blueprint-server">${icon("server")}<strong>Control Plane</strong><span>身份 / 设备 / 候选协调</span></div><div class="blueprint-lines" aria-hidden="true"><i></i><span>信令</span><i></i></div><div class="blueprint-endpoints"><span>${icon("monitor")}设备 A</span><b>加密数据</b><span>${icon("server")}设备 B</span></div><div class="blueprint-relay">${icon("shield")}Relay <span>直连不可用时转发密文</span></div><footer>Go + SQLite <span>·</span> Rust 数据面 <span>·</span> Flutter 客户端</footer></div>
      <div><header class="section-intro"><p class="section-kicker">Your network. Your rules.</p><h2 id="hosting-title">你的网络，<br/>由你来运行。</h2><p>把 Control Plane 与 Relay 部署在自己的 Linux 服务器。基础设施、配置与升级节奏，都掌握在自己手中。</p></header><ul class="hosting-facts"><li><strong>控制与数据分离</strong><span>控制面负责协调，业务数据优先在端点之间传输。</span></li><li><strong>加密边界透明</strong><span>Relay 按设计转发密文，不持有业务会话私钥。</span></li></ul><div class="inline-actions"><a class="button button--secondary" href="/docs/self-hosting/">自托管指南 ${icon("arrow")}</a><a class="text-action" href="/docs/security/">安全边界 ${icon("arrow")}</a></div></div>
    </div></section>
    <section class="closing-cta"><div class="container"><img src="/images/p2wlan-icon.svg" width="48" height="48" alt=""/><p class="section-kicker">Start with two devices</p><h2>把距离，留给现实世界。</h2><p>免费开源，可自托管。从连通两台设备开始。</p><div class="hero-actions"><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a><a class="text-action" href="/docs/getting-started/">阅读快速开始 ${icon("arrow")}</a></div><small>${escapeHtml(release.tag)} <span>·</span> MIT License <span>·</span> <a href="${SITE.repository}">查看源码 ↗</a></small></div></section>
  </main>`;
}
