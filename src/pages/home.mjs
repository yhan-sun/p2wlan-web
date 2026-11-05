import { SITE } from "../data/site.mjs";
import { escapeHtml, icon, releaseLabel } from "../ui.mjs";
import { renderNetworkDemo } from "../components/network-demo.mjs";

const tour = [
  { key: "address", label: "虚拟地址", image: "home", title: "查看虚拟 IP", copy: "登录并启动网络后，客户端会显示虚拟 IP。", value: "10.20.0.10", kind: "虚拟 IP" },
  { key: "devices", label: "远端设备", image: "devices", title: "查看远端设备", copy: "查看设备的虚拟 IP、在线状态和连接路径。", value: "yhan-NAS · 10.20.0.20", kind: "示例设备" },
  { key: "access", label: "访问服务", image: "devices", title: "访问远端服务", copy: "使用虚拟 IP 连接 SSH、NAS 等已启动的服务。", value: "ssh user@10.20.0.20", kind: "SSH 访问示例" },
];

function renderProductTour() {
  return `<div class="product-stage" data-product-tour data-tour-step="0" data-tour-playback="idle" data-tour-started="false">
    <div class="product-stage__heading"><span>P2WLAN 客户端</span><span>界面导览</span></div>
    <div class="product-stage__screens" aria-busy="false">${tour.map((item, index) => `<div id="tour-panel-${item.key}" class="product-stage__panel" role="tabpanel" aria-labelledby="tour-tab-${item.key}" tabindex="0"${index ? " hidden" : ""} data-tour-panel>
      <figure><div class="product-stage__window"><img src="/images/product/screenshot-${item.image}.webp" width="1536" height="1024" alt="主仓库客户端${item.image === "home" ? "网络概览，显示虚拟地址" : "设备列表，显示设备名称、虚拟地址和连接方式"}；数据为示例" loading="${index ? "lazy" : "eager"}" ${index ? "" : 'fetchpriority="high"'} decoding="async"/></div><figcaption><strong>${item.title}</strong><p>${item.copy}</p><div class="product-stage__result"><code>${item.value}</code><span>${item.kind}</span></div></figcaption></figure>
    </div>`).join("")}</div>
    <div class="product-stage__journey"><div class="product-stage__tabs" role="tablist" aria-label="客户端使用导览">${tour.map((item, index) => `<button type="button" role="tab" id="tour-tab-${item.key}" aria-controls="tour-panel-${item.key}" aria-selected="${index === 0}" tabindex="${index === 0 ? "0" : "-1"}" data-tour-tab="${index}"><span aria-hidden="true">${index + 1}</span>${item.label}</button>`).join("")}</div><button type="button" class="tour-play" data-tour-play aria-label="播放客户端导览"><span class="tour-play__icons" aria-hidden="true">${["play", "pause", "replay"].map(name => `<span data-tour-icon="${name}">${icon(name)}</span>`).join("")}</span><span data-tour-play-label>播放导览</span></button></div>
    <p class="product-stage__source"><span>客户端截图 · 示例数据</span><a href="/images/product/screenshot-home.webp" target="_blank" rel="noopener" data-tour-original>查看完整界面 ↗</a></p>
    <noscript><p class="product-stage__source"><a href="/images/product/screenshot-devices.webp">查看设备界面 ↗</a></p></noscript>
    <p class="product-stage__error" data-tour-error hidden>界面预览暂时无法加载。<a href="${SITE.repository}#readme">查看主仓库中的界面 ↗</a></p>
    <span class="sr-only" role="status" aria-live="polite" data-tour-status></span>
  </div>`;
}

export function renderHome({ release }) {
  return `<main id="main-content">
    <section class="home-hero" aria-labelledby="home-title"><div class="container hero-layout">
      <div class="home-hero__copy">
        <a class="release-eyebrow" href="/changelog/"><span class="status-dot" aria-hidden="true"></span><span>${escapeHtml(release.tag)}</span><span>${releaseLabel(release)}</span>${icon("chevron")}</a>
        <h1 id="home-title">不同网络，<br/>同一个局域网。</h1>
        <p class="home-hero__lead">通过虚拟 IP 访问 NAS、远程开发机，<br/>或与朋友联机。</p>
        <div class="hero-actions"><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a><a class="text-action" href="/docs/getting-started/">快速开始 ${icon("arrow")}</a></div>
        <p class="platform-proof">Windows · macOS · Linux · Android<br/><a href="/download/#platform-openwrt">OpenWrt 原生安装包 ${icon("arrow")}</a></p>
        <div class="hero-principles"><span>端到端加密</span><span>直连优先</span><a href="${SITE.repository}">开源 · 可自托管 ↗</a></div>
      </div>
      ${renderProductTour()}
    </div></section>
    <section class="use-cases" aria-label="常用场景"><div class="container"><article><h2>访问家中设备</h2><p>连接 NAS、HomeLab 和内部服务。</p></article><article><h2>连接远程电脑</h2><p>使用 SSH 或远程桌面，沿用原有账号。</p></article><article><h2>和朋友联机</h2><p>将联机设备加入同一个房间。</p></article></div></section>
    <section class="section room-section" id="product" aria-labelledby="product-title"><div class="container room-layout">
      <div class="room-copy"><h2 id="product-title">用房间<br/>组织设备。</h2><p>在房间中查看成员、虚拟 IP 和连接路径。</p><a class="text-action" href="/docs/getting-started/">查看组网步骤 ${icon("arrow")}</a><div class="room-copy__note"><strong>沿用原有账号和权限</strong><p>SSH、文件共享和其他服务仍使用各自的登录方式与访问权限。</p></div></div>
      <figure class="room-preview" data-reveal><a class="room-preview__image" href="/images/product/screenshot-room.webp" target="_blank" rel="noopener" aria-label="查看完整的房间详情界面"><img src="/images/product/screenshot-room.webp" width="1536" height="1024" alt="主仓库房间详情界面，展示成员、虚拟地址与连接路径；数据为示例" loading="lazy" decoding="async"/></a><figcaption><span>房间详情 · 示例数据</span><a href="/images/product/screenshot-rooms.webp" target="_blank" rel="noopener">查看房间列表 ↗</a></figcaption></figure>
    </div></section>
    <section class="section connection-section" aria-labelledby="connection-title"><div class="container">
      <div class="connection-layout"><div><h2 id="connection-title">优先直连，<br/>受限时中继。</h2><p>支持局域网和公网 UDP 直连，无法直连时使用加密 Relay。</p><a class="text-action" href="/docs/networking/">连接模型 ${icon("arrow")}</a></div><dl class="connection-facts"><div><dt><span class="status-dot status-dot--direct" aria-hidden="true"></span>Direct <span>点对点直连</span></dt><dd>数据在设备之间加密传输。直连是否可用取决于 NAT、防火墙和网络条件。</dd></div><div><dt><span class="status-dot status-dot--relay" aria-hidden="true"></span>Relay <span>中继回退</span></dt><dd>直连不可用时，由已配置且可达的中继转发密文，虚拟 IP 保持不变。</dd></div></dl></div>
      <details class="connection-explainer"><summary><span>查看连接过程</span><small>原理示意</small>${icon("chevron")}</summary><div class="connection-explainer__body">${renderNetworkDemo()}<p class="demo-caption">地址和连接过程为示意。<a href="/docs/nat-traversal/">NAT 穿透与限制 ${icon("arrow")}</a></p></div></details>
    </div></section>
    <section class="section hosting-section" id="self-hosted" aria-labelledby="hosting-title"><div class="container hosting-layout"><div><h2 id="hosting-title">部署到<br/>自己的服务器。</h2><p>在 Linux 服务器部署 Control Plane 和 Relay，自行管理域名、配置与升级。</p><div class="inline-actions"><a class="button button--secondary" href="/docs/self-hosting/">自托管指南 ${icon("arrow")}</a><a class="text-action" href="/docs/security/">安全说明 ${icon("arrow")}</a></div></div><div class="hosting-reference"><div><strong>Control Plane</strong><span>身份、设备与候选协调</span></div><div><strong>Relay</strong><span>直连不可用时转发加密数据</span></div><a href="${SITE.repository}">源码与部署说明 ↗</a></div></div></section>
    <section class="closing-cta"><div class="container"><div><h2>安装客户端，开始组网。</h2><p>免费开源 · MIT · ${escapeHtml(release.tag)}</p></div><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a></div></section>
  </main>`;
}
