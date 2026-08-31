const body = document.body;
if (body?.dataset.pagePath !== "/download/") {
  // This module is only injected into the download page.
} else {
  const platformMeta = {
    windows: {
      label: "Windows",
      icon: "WIN",
      title: "Windows 客户端",
      summary: "适合桌面端远程开发、HomeLab 与跨网络访问。安装程序直接来自项目 GitHub Release。",
      points: ["Windows 10/11 · x64", "桌面 GUI + 系统虚拟网卡", "适合 SSH、RDP、NAS 与内部 Web 服务"],
      matches: ["windows-x64-setup.exe"],
      mobile: false,
    },
    macos: {
      label: "macOS",
      icon: "mac",
      title: "macOS 客户端",
      summary: "Apple Silicon 与 Intel Mac 均提供独立 DMG。页面会优先推荐更常用的 Apple Silicon 构建。",
      points: ["Apple Silicon 与 Intel 双架构", "桌面 GUI + 虚拟网络连接", "设备名与界面示意均使用演示数据"],
      matches: ["macos-arm64.dmg", "macos-x64.dmg"],
      mobile: false,
    },
    linux: {
      label: "Linux",
      icon: "LIN",
      title: "Linux 客户端与 CLI",
      summary: "桌面环境可使用 GUI，无界面服务器使用 CLI 与 daemon；x64 与 arm64 资产均来自同一 Release。",
      points: ["GUI x86_64", "CLI / daemon：x86_64 与 arm64", "适合服务器、自托管节点与开发环境"],
      matches: ["flutter-linux-x64.tar.gz", "linux-x64-cli.tar.gz", "linux-arm64-cli.tar.gz"],
      mobile: false,
    },
    android: {
      label: "Android",
      icon: "AND",
      title: "Android 客户端",
      summary: "Android arm64 Preview 构建通过 APK 分发。安装后需要授予系统 VPN 权限。",
      points: ["arm64 APK", "需要侧载安装", "需要系统 VPN 权限"],
      matches: ["android-arm64-release.apk"],
      mobile: true,
    },
    ios: {
      label: "iOS",
      icon: "iOS",
      title: "iOS 客户端",
      summary: "当前 Release 提供未签名 IPA，用于开发测试与自行签名安装，不是 App Store 分发版本。",
      points: ["arm64 未签名 IPA", "需要自己的签名与 provisioning", "适合 Preview 测试"],
      matches: ["ios-arm64-unsigned.ipa"],
      mobile: true,
    },
  };

  const order = ["windows", "macos", "linux", "android", "ios"];

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function formatBytes(bytes) {
    const value = Number(bytes);
    if (!Number.isFinite(value) || value <= 0) return "";
    const units = ["B", "KB", "MB", "GB"];
    let size = value;
    let unit = 0;
    while (size >= 1024 && unit < units.length - 1) {
      size /= 1024;
      unit += 1;
    }
    return `${size.toFixed(unit < 2 ? 0 : 1)} ${units[unit]}`;
  }

  function formatDate(value) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "未知日期";
    return new Intl.DateTimeFormat("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Shanghai",
    }).format(date);
  }

  function detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    const platform = (navigator.userAgentData?.platform || navigator.platform || "").toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return "ios";
    if (ua.includes("android")) return "android";
    if (platform.includes("mac")) return "macos";
    if (platform.includes("win")) return "windows";
    if (platform.includes("linux") || ua.includes("linux")) return "linux";
    return "windows";
  }

  function selectAssets(release, key) {
    const config = platformMeta[key];
    return config.matches
      .map((needle) => release.assets.find((asset) => String(asset.name || "").includes(needle)))
      .filter(Boolean);
  }

  function buttonLabel(asset, key, index) {
    const name = asset?.name || "";
    if (key === "macos") return name.includes("arm64") ? "下载 Apple Silicon" : "下载 Intel";
    if (key === "linux") {
      if (name.includes("flutter-linux")) return "下载 Linux GUI";
      if (name.includes("arm64")) return "下载 CLI arm64";
      return "下载 CLI x64";
    }
    if (key === "android") return "下载 APK";
    if (key === "ios") return "下载 IPA";
    if (key === "windows") return "下载 Windows";
    return index === 0 ? "立即下载" : "下载此版本";
  }

  function renderDevice(mobile) {
    const peers = `
      <div class="download-app__label">在线设备</div>
      <div class="download-peer-list">
        <div class="download-peer"><span class="download-peer__mark">YS</span><div><strong>yuhan-server</strong><small>10.20.0.5</small></div><b class="is-direct">Direct · 12 ms</b></div>
        <div class="download-peer"><span class="download-peer__mark">PC</span><div><strong>studio-pc</strong><small>10.20.0.8</small></div><b>Relay · 27 ms</b></div>
        <div class="download-peer"><span class="download-peer__mark">MB</span><div><strong>yuhan-mobile</strong><small>10.20.0.11</small></div><b class="is-direct">LAN · 4 ms</b></div>
      </div>`;

    const app = `
      <div class="download-app">
        <aside class="download-app__sidebar">
          <div class="download-app__brand"><i></i><span>P2WLAN</span></div>
          <div class="download-app__nav is-active">设备</div>
          <div class="download-app__nav">网络</div>
          <div class="download-app__nav">诊断</div>
          <div class="download-app__nav">设置</div>
        </aside>
        <div class="download-app__main">
          <div class="download-app__head"><strong>我的网络</strong><span class="download-app__status">已连接</span></div>
          <div class="download-app__identity"><span class="download-app__avatar">Y</span><div><strong>yuhan 的设备</strong><small>10.20.0.2</small></div><span class="download-app__path">Direct</span></div>
          ${peers}
        </div>
      </div>`;

    if (mobile) {
      return `<div class="download-device download-device--mobile">${app}</div>`;
    }

    return `
      <div class="download-device download-device--desktop">
        <div class="download-device__lid"><span class="download-device__camera" aria-hidden="true"></span>${app}</div>
        <div class="download-device__base" aria-hidden="true"></div>
      </div>`;
  }

  function renderActions(assets, key) {
    if (!assets.length) {
      return `<a class="button button--secondary" href="https://github.com/yhan-sun/p2wlan/releases">查看 GitHub Releases</a>`;
    }
    return assets
      .map((asset, index) => {
        const cls = index === 0 ? "button button--primary" : "button button--secondary";
        const label = buttonLabel(asset, key, index);
        const size = formatBytes(asset.size);
        return `<a class="${cls}" href="${escapeHtml(asset.browser_download_url)}" title="${escapeHtml(asset.name)}">${escapeHtml(label)}${size ? ` · ${escapeHtml(size)}` : ""}</a>`;
      })
      .join("");
  }

  async function enhance() {
    const pageHero = document.querySelector(".page-hero--download");
    const contentContainer = document.querySelector(".section--tight > .container");
    if (!pageHero || !contentContainer) return;

    let release;
    try {
      const response = await fetch("/release-data.json", { credentials: "same-origin", cache: "no-store" });
      if (!response.ok) throw new Error(`release metadata ${response.status}`);
      release = await response.json();
    } catch (error) {
      console.warn("download showcase metadata unavailable", error);
      return;
    }

    if (!release?.tag_name || !Array.isArray(release.assets)) return;

    const available = order.filter((key) => selectAssets(release, key).length > 0);
    if (!available.length) return;

    const shell = document.createElement("div");
    shell.className = "download-platform-shell";
    const tabs = document.createElement("nav");
    tabs.className = "download-platform-tabs";
    tabs.setAttribute("aria-label", "选择下载平台");
    shell.append(tabs);
    pageHero.insertAdjacentElement("afterend", shell);

    for (const key of available) {
      const meta = platformMeta[key];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "download-platform-tab";
      button.dataset.downloadPlatform = key;
      button.setAttribute("role", "tab");
      button.innerHTML = `<span class="download-platform-tab__icon" aria-hidden="true">${meta.icon}</span><span>${meta.label}</span>`;
      tabs.append(button);
    }

    const wrap = document.createElement("div");
    wrap.className = "download-feature-wrap";
    wrap.innerHTML = `<section class="download-feature" aria-live="polite"><div class="download-feature__copy"></div><div class="download-visual"><div class="download-visual__glow"></div><div data-download-visual></div><p class="download-visual__note">界面示意 · 使用 yuhan 等演示设备名，不包含真实个人数据</p></div></section>`;
    contentContainer.prepend(wrap);

    const copy = wrap.querySelector(".download-feature__copy");
    const visual = wrap.querySelector("[data-download-visual]");
    const tabButtons = [...tabs.querySelectorAll(".download-platform-tab")];

    const activate = (key) => {
      const meta = platformMeta[key];
      const assets = selectAssets(release, key);
      tabButtons.forEach((button) => {
        const active = button.dataset.downloadPlatform === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
        button.tabIndex = active ? 0 : -1;
      });

      copy.innerHTML = `
        <p class="download-feature__eyebrow">${escapeHtml(release.tag_name)} · ${escapeHtml(meta.label)}</p>
        <h2>${escapeHtml(meta.title)}</h2>
        <p class="download-feature__summary">${escapeHtml(meta.summary)}</p>
        <ul class="download-feature__points">${meta.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>
        <div class="download-feature__actions">${renderActions(assets, key)}</div>
        <div class="download-feature__release"><span>当前版本 <strong>${escapeHtml(release.tag_name)}</strong></span><span>发布于 ${escapeHtml(formatDate(release.published_at))}</span><a href="${escapeHtml(release.html_url)}">GitHub Release ↗</a></div>`;
      visual.innerHTML = renderDevice(meta.mobile);
    };

    tabButtons.forEach((button) => {
      button.addEventListener("click", () => activate(button.dataset.downloadPlatform));
      button.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const current = tabButtons.indexOf(button);
        const delta = event.key === "ArrowRight" ? 1 : -1;
        const next = (current + delta + tabButtons.length) % tabButtons.length;
        tabButtons[next].focus();
        activate(tabButtons[next].dataset.downloadPlatform);
      });
    });

    const detected = detectPlatform();
    const initial = available.includes(detected) ? detected : available[0];
    activate(initial);
    body.classList.add("download-showcase-enhanced");
  }

  enhance();
}
