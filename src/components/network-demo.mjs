import { icon } from "../ui.mjs";

export function renderNetworkDemo() {
  return `<div class="network-demo" data-network-demo data-stage="connected" data-route="direct" data-playback="idle" role="group" aria-label="P2P 连接交互示意">
    <header class="network-demo__header"><div><span class="demo-dot"></span><strong>两端之间，找到一条光路。</strong></div><span class="demo-label">交互示意</span></header>
    <div class="network-topology">
      <svg class="network-topology__paths" viewBox="0 0 900 340" preserveAspectRatio="none" fill="none" role="img" aria-labelledby="topology-title topology-description">
        <title id="topology-title">两台不同网络中的设备通过 P2WLAN 连接</title>
        <desc id="topology-description" data-network-description>示意设备已通过 Direct 直连。实际路径取决于 NAT、防火墙和服务可达性。</desc>
        <g class="topology-base"><path d="M195 176C195 72 335 62 450 62S705 72 705 176"/><path d="M195 176H705"/><path d="M195 176C195 281 335 287 450 287S705 281 705 176"/></g>
        <path class="topology-signal" pathLength="1" d="M195 176C195 72 335 62 450 62S705 72 705 176"/>
        <path class="topology-direct" pathLength="1" d="M195 176H705"/>
        <path class="topology-relay" pathLength="1" d="M195 176C195 281 335 287 450 287S705 281 705 176"/>
        <path class="topology-glint topology-glint--signal" pathLength="1" d="M195 176C195 72 335 62 450 62S705 72 705 176"/>
        <path class="topology-glint topology-glint--probe" pathLength="1" d="M195 176H705"/>
        <path class="topology-glint topology-glint--direct" pathLength="1" d="M195 176H705"/>
        <path class="topology-glint topology-glint--relay" pathLength="1" d="M195 176C195 281 335 287 450 287S705 281 705 176"/>
        ${["signal", "probe", "direct", "relay"].map((kind) => `<g class="packet packet--${kind}"><circle r="8" opacity=".08"/><circle r="4" opacity=".25"/><circle r="2"/></g>`).join("")}
        <g class="topology-joints"><circle cx="195" cy="176" r="4"/><circle cx="705" cy="176" r="4"/></g>
      </svg>
      <div class="topology-node topology-node--a"><span class="topology-device">${icon("monitor")}</span><strong>你的电脑</strong><small>家庭宽带 · 网络 A</small><code>10.20.0.2</code></div>
      <div class="topology-node topology-node--b"><span class="topology-device">${icon("server")}</span><strong>远端设备</strong><small>移动热点 · 网络 B</small><code>10.20.0.5</code></div>
      <div class="topology-service topology-service--control">${icon("route")}<div><strong>Control Plane</strong><small>身份与候选协调</small></div></div>
      <span class="topology-path-label" data-network-path>端点间加密直连</span>
      <div class="topology-service topology-service--relay">${icon("shield")}<div><strong>Encrypted Relay</strong><small data-relay-state>回退路径待命</small></div></div>
    </div>
    <div class="network-demo__status" role="status" aria-live="polite" aria-atomic="true"><span class="network-state" data-network-state>Direct</span><div><strong data-network-title>直连建立，数据在两端之间传输。</strong><p data-network-copy>应用继续使用虚拟 IP，Control Plane 负责协调。</p></div></div>
    <div class="network-demo__controls">
      <ol class="network-steps" aria-label="选择连接阶段"><li><button type="button" data-network-step="0" aria-pressed="false"><span>01</span>设备就绪</button></li><li><button type="button" data-network-step="1" aria-pressed="false"><span>02</span>交换候选</button></li><li><button type="button" data-network-step="2" aria-pressed="false"><span>03</span>NAT 探测</button></li><li><button type="button" data-network-step="3" aria-pressed="true"><span>04</span>建立连接</button></li></ol>
      <button class="demo-replay" type="button" data-network-replay aria-label="重新播放连接过程"><span class="demo-replay__icons" aria-hidden="true">${["replay", "pause", "play"].map((name) => `<span data-replay-icon="${name}">${icon(name)}</span>`).join("")}</span><span data-replay-label>重播</span></button>
    </div>
    <div class="network-demo__route"><span>选择连接结果</span><div class="route-switch" role="group" aria-label="连接路径"><button type="button" data-network-route="direct" aria-pressed="true"><i class="status-dot status-dot--direct"></i>Direct 直连</button><button type="button" data-network-route="relay" aria-pressed="false"><i class="status-dot status-dot--relay"></i>Relay 回退</button></div></div>
    <noscript><p class="demo-noscript">当前展示 Direct 示意。启用 JavaScript 后可切换阶段与 Relay 路径。</p></noscript>
  </div>`;
}
