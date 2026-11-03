import { SITE } from "../data/site.mjs";
import { escapeHtml, icon, releaseLabel } from "../ui.mjs";
import { renderNetworkDemo } from "../components/network-demo.mjs";

const tour = [
  { key: "address", label: "虚拟地址", image: "home", title: "先获得你的虚拟地址。", copy: "登录并启动网络，在客户端查看自己的虚拟 IP。", value: "10.20.0.10", kind: "虚拟 IP" },
  { key: "devices", label: "远端设备", image: "devices", title: "找到另一端的设备。", copy: "设备的虚拟 IP、在线状态与连接路径，都在同一处。", value: "yhan-NAS · 10.20.0.20", kind: "示例设备" },
  { key: "access", label: "访问服务", image: "devices", title: "用熟悉的工具，访问远端服务。", copy: "通过虚拟 IP 访问 SSH、NAS 或其他已运行的服务。", value: "ssh user@10.20.0.20", kind: "SSH 访问示例" },
];

function renderProductTour() {
  return `<div class="product-stage" data-product-tour data-tour-step="0" data-tour-playback="idle" data-tour-started="false">
    <div class="product-stage__heading"><span>P2WLAN 客户端</span><span>界面导览</span></div>
    <div class="product-stage__screens" aria-busy="false">${tour.map((item, index) => `<div id="tour-panel-${item.key}" class="product-stage__panel" role="tabpanel" aria-labelledby="tour-tab-${item.key}" tabindex="0"${index ? " hidden" : ""} data-tour-panel>
      <figure><div class="product-stage__window"><img src="/images/product/screenshot-${item.image}.webp" width="1536" height="1024" alt="主仓库客户端${item.image === "home" ? "网络概览，显示虚拟地址" : "设备列表，显示设备名称、虚拟地址和连接方式"}；数据为示例" loading="${index ? "lazy" : "eager"}" ${index ? "" : 'fetchpriority="high"'} decoding="async"/></div><figcaption><strong>${item.title}</strong><p>${item.copy}</p><div class="product-stage__result"><code>${item.value}</code><span>${item.kind}</span></div></figcaption></figure>
    </div>`).join("")}</div>
    <div class="product-stage__journey"><div class="product-stage__tabs" role="tablist" aria-label="客户端使用导览">${tour.map((item, index) => `<button type="button" role="tab" id="tour-tab-${item.key}" aria-controls="tour-panel-${item.key}" aria-selected="${index === 0}" tabindex="${index === 0 ? "0" : "-1"}" data-tour-tab="${index}"><span aria-hidden="true">${index + 1}</span>${item.label}</button>`).join("")}</div><button type="button" class="tour-play" data-tour-play aria-label="播放客户端导览"><span class="tour-play__icons" aria-hidden="true">${["play", "pause", "replay"].map(name => `<span data-tour-icon="${name}">${icon(name)}</span>`).join("")}</span><span data-tour-play-label>播放导览</span></button></div>
    <p class="product-stage__source"><span>主仓库界面局部 · 示例数据</span><a href="/images/product/screenshot-home.webp" target="_blank" rel="noopener" data-tour-original>查看完整界面 ↗</a></p>
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
        <p class="home-hero__lead">用虚拟 IP 访问远方的设备。<br/>NAS、开发机和游戏，继续熟悉的连接。</p>
        <div class="hero-actions"><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a><a class="text-action" href="/docs/getting-started/">快速开始 ${icon("arrow")}</a></div>
        <p class="platform-proof">Windows · macOS · Linux · Android<br/><a href="/download/#platform-openwrt">也为 OpenWrt 路由器提供原生包 ${icon("arrow")}</a></p>
        <div class="hero-principles"><span>端到端加密</span><span>直连优先</span><a href="${SITE.repository}">开源 · 可自托管 ↗</a></div>
      </div>
      ${renderProductTour()}
    </div></section>
    <section class="use-cases" aria-label="常用场景"><div class="container"><article><h2>访问家里的设备</h2><p>NAS、HomeLab 和自己的内部服务。</p></article><article><h2>继续手边的工作</h2><p>SSH、远程桌面，沿用原有账号与工具。</p></article><article><h2>和朋友加入同一张网</h2><p>把一起联机的设备，组织进一个房间。</p></article></div></section>
    <section class="section room-section" id="product" aria-labelledby="product-title"><div class="container room-layout">
      <div class="room-copy"><h2 id="product-title">一起联机，<br/>就进同一个房间。</h2><p>把这一组设备放在一起。成员、虚拟 IP 与连接路径，在房间里清楚呈现。</p><a class="text-action" href="/docs/getting-started/">连接你的第一对设备 ${icon("arrow")}</a><div class="room-copy__note"><strong>应用怎么用，仍由你决定。</strong><p>P2WLAN 负责设备之间的虚拟网络。游戏、文件和远程服务继续使用各自的访问方式与权限。</p></div></div>
      <figure class="room-preview" data-reveal><a class="room-preview__image" href="/images/product/screenshot-room.webp" target="_blank" rel="noopener" aria-label="查看完整的房间详情界面"><img src="/images/product/screenshot-room.webp" width="1536" height="1024" alt="主仓库房间详情界面，展示成员、虚拟地址与连接路径；数据为示例" loading="lazy" decoding="async"/></a><figcaption><span>房间详情 · 主仓库界面预览</span><a href="/images/product/screenshot-rooms.webp" target="_blank" rel="noopener">查看房间列表 ↗</a></figcaption></figure>
    </div></section>
    <section class="section connection-section" aria-labelledby="connection-title"><div class="container">
      <div class="connection-layout"><div><h2 id="connection-title">能直达，<br/>就少绕一段路。</h2><p>优先尝试局域网与公网 UDP 直连。网络受限时，通过可达的加密 Relay 继续连接。</p><a class="text-action" href="/docs/networking/">了解连接模型 ${icon("arrow")}</a></div><dl class="connection-facts"><div><dt><span class="status-dot status-dot--direct" aria-hidden="true"></span>Direct <span>点对点直连</span></dt><dd>加密数据在两端之间传输。能否建立直连，取决于 NAT、防火墙与实际网络条件。</dd></div><div><dt><span class="status-dot status-dot--relay" aria-hidden="true"></span>Relay <span>中继回退</span></dt><dd>直连不可用时转发密文。中继需要配置且可达，应用继续使用相同的虚拟 IP。</dd></div></dl></div>
      <details class="connection-explainer"><summary><span>看看连接是怎样建立的</span><small>交互原理示意</small>${icon("chevron")}</summary><div class="connection-explainer__body">${renderNetworkDemo()}<p class="demo-caption">连接过程与地址均为示意，不代表任意网络都能直连。<a href="/docs/nat-traversal/">NAT 穿透与限制 ${icon("arrow")}</a></p></div></details>
    </div></section>
    <section class="section hosting-section" id="self-hosted" aria-labelledby="hosting-title"><div class="container hosting-layout"><div><h2 id="hosting-title">运行在你<br/>自己的基础设施上。</h2><p>在 Linux 服务器部署 Control Plane 与 Relay，自己管理域名、配置和升级节奏。</p><div class="inline-actions"><a class="button button--secondary" href="/docs/self-hosting/">自托管指南 ${icon("arrow")}</a><a class="text-action" href="/docs/security/">安全边界 ${icon("arrow")}</a></div></div><div class="hosting-reference"><div><strong>Control Plane</strong><span>身份、设备与候选协调</span></div><div><strong>Relay</strong><span>直连不可用时转发加密数据</span></div><p>控制与数据分离。业务数据优先在端点间传输；服务部署与终端安全各有边界。</p><a href="${SITE.repository}">阅读源码与部署说明 ↗</a></div></div></section>
    <section class="closing-cta"><div class="container"><div><h2>从连通两台设备开始。</h2><p>免费开源 · MIT · ${escapeHtml(release.tag)}</p></div><a class="button button--primary button--large" href="/download/" data-smart-download>${icon("download")}<span>下载 P2WLAN</span></a></div></section>
  </main>`;
}
