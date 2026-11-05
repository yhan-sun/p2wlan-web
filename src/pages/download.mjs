import { SITE } from "../data/site.mjs";
import { assetByKey, escapeHtml, formatBytes, formatDate, icon, releaseLabel } from "../ui.mjs";

function packageLink(asset, label) {
  if (!asset) return `<span class="package-unavailable">${escapeHtml(label)} · 此版本未提供</span>`;
  return `<a class="package-link" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(asset.key)}"><span><strong>${escapeHtml(label)}</strong><small>${escapeHtml(asset.extension)} · ${formatBytes(asset.size)}</small></span>${icon("download")}</a>`;
}

function assetRow(asset) {
  const digest = asset.digest.replace(/^sha256:/, "");
  return `<article class="asset-row" id="${escapeHtml(asset.key)}" data-platform-card="${escapeHtml(asset.key)}">
    <div class="asset-row__identity"><strong>${escapeHtml(asset.platform)}</strong><p>${escapeHtml(asset.detail)}</p>${asset.experimental ? '<span class="experimental-label">未签名 · 实验性</span>' : ""}</div>
    <div class="asset-row__file"><a href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(asset.key)}"><code>${escapeHtml(asset.name)}</code></a><span>${formatBytes(asset.size)}</span><div class="asset-row__digest"><code>${escapeHtml(digest || "GitHub 未提供 SHA-256")}</code>${digest ? `<button type="button" class="copy-button" data-copy-text="${escapeHtml(digest)}" aria-label="复制 ${escapeHtml(asset.name)} 的 SHA-256">${icon("copy")}<span>复制</span></button>` : ""}</div></div>
    <a class="asset-download" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(asset.key)}" aria-label="下载 ${escapeHtml(asset.name)}">${icon("download")}<span>下载</span></a>
  </article>`;
}

export function renderDownload({ release, assets }) {
  const get = (key) => assetByKey(assets, key);
  const packages = assets.filter((asset) => !asset.supporting && !asset.experimental && asset.family !== "openwrt");
  const openwrt = assets.filter((asset) => asset.family === "openwrt");
  const firmwareSeries = [...new Set(openwrt.map((asset) => asset.firmware))];
  const windows = get("windows-x64");
  const mac = get("macos-arm64");
  const powershell = windows ? `Get-FileHash .\\${windows.name} -Algorithm SHA256` : "Get-FileHash <下载的文件> -Algorithm SHA256";
  const unix = mac ? `shasum -a 256 ./${mac.name}` : "shasum -a 256 <下载的文件>";
  return `<main id="main-content" class="page-main">
    <section class="download-hero">
      <div class="container">
        <header class="section-intro"><h1>下载 P2WLAN</h1><p>适用于桌面、手机、服务器与 OpenWrt 路由器。</p><div class="page-meta"><span>${escapeHtml(release.tag)}</span><span>${releaseLabel(release)}</span><span>${formatDate(release.publishedAt)}</span></div></header>
        <article class="smart-recommendation" data-smart-panel>
          <div class="smart-recommendation__main"><img src="/images/p2wlan-icon.svg" width="64" height="64" alt=""/><div><p class="device-label" data-smart-kicker>当前设备</p><h2 data-smart-title>选择系统与架构</h2><p data-smart-description>按系统和处理器架构选择安装包。</p></div></div>
          <div class="smart-recommendation__actions"><label for="download-package">平台与架构</label><select id="download-package" data-download-select><option value="">选择安装包</option>${packages.map((asset) => `<option value="${escapeHtml(asset.key)}">${escapeHtml(`${asset.platform} · ${asset.architecture}${asset.purpose === "服务器" ? " · CLI" : ""}`)}</option>`).join("")}</select><a class="button button--primary button--large" href="#platforms" data-smart-download>${icon("download")}<span>选择安装包</span></a></div>
          <div class="smart-recommendation__file"><span data-smart-file>安装包直接来自 GitHub Releases</span><span data-smart-meta>${escapeHtml(release.tag)} · 免费 · MIT</span></div>
        </article>
        <p class="download-help">macOS 芯片型号见「关于本机」。<a href="/docs/install/">安装与权限说明 ${icon("arrow")}</a></p>
      </div>
    </section>
    <section class="section section--compact" id="platforms" aria-labelledby="platforms-title"><div class="container download-catalog">
      <header class="download-catalog__header"><h2 id="platforms-title">全部平台</h2><span>${escapeHtml(release.tag)}</span></header>
      <section class="download-platform-row" id="platform-windows"><div><h3>Windows</h3><p>x64 · 桌面安装程序</p></div><div class="package-options">${packageLink(windows, "Windows x64")}</div><a class="platform-guide" href="/docs/install/#windows">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-macos"><div><h3>macOS</h3><p>macOS 12+ · DMG</p></div><div class="package-options">${packageLink(mac, "Apple Silicon")}${packageLink(get("macos-x64"), "Intel Mac")}</div><a class="platform-guide" href="/docs/install/#macos">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-linux"><div><h3>Linux</h3><p>图形客户端或 CLI + daemon</p></div><div class="package-options">${packageLink(get("linux-gui-x64"), "GUI x64")}${packageLink(get("linux-cli-x64"), "CLI x64")}${packageLink(get("linux-cli-arm64"), "CLI arm64")}</div><a class="platform-guide" href="/docs/install/#linux-gui">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-android"><div><h3>Android</h3><p>Android 7.0+ · arm64 · APK 侧载</p></div><div class="package-options">${packageLink(get("android-arm64"), "Android arm64")}</div><a class="platform-guide" href="/docs/install/#android">安装指南 ${icon("arrow")}</a></section>
      ${openwrt.length ? `<section class="download-platform-row download-platform-row--openwrt" id="platform-openwrt"><div><h3>OpenWrt</h3><p>路由器本机节点 · ARM64 / x86_64</p></div><div class="openwrt-packages"><p class="openwrt-packages__note">推荐使用原生安装器自动选择。手动下载请核对固件版本与 DISTRIB_ARCH；APK 为 OpenWrt 包。</p>${firmwareSeries.map((firmware) => {
        const group = openwrt.filter((asset) => asset.firmware === firmware);
        return `<details class="openwrt-package-group"><summary><span>OpenWrt ${escapeHtml(firmware)}<small>${escapeHtml(group[0].extension.slice(1).toUpperCase())} · ${group.length} 种包架构</small></span>${icon("chevron")}</summary><div class="package-options">${group.map((asset) => packageLink(asset, asset.architecture)).join("")}</div></details>`;
      }).join("")}</div><a class="platform-guide" href="/docs/install/#openwrt">安装指南 ${icon("arrow")}</a></section>` : ""}
    </div></section>
    <section class="section section--compact download-advanced"><div class="container">
      <header class="section-split"><div><h2>高级下载与校验</h2><p>完整文件名、发布辅助文件与 SHA-256。</p></div><a class="text-action" href="${escapeHtml(release.url)}">GitHub Release ↗</a></header>
      <details class="asset-disclosure"><summary><span>全部 ${assets.length} 个文件</span><small>含未签名实验构建及校验文件</small>${icon("chevron")}</summary><div class="asset-list"><p class="asset-list__note">SHA-256 为 GitHub 记录的文件摘要。iOS IPA 是未签名实验构建，需要自行签名。</p>${assets.map(assetRow).join("")}</div></details>
      <details class="verification-disclosure"><summary><span>如何核对 SHA-256</span>${icon("chevron")}</summary><div class="verification-content"><p>比较 SHA-256 可检查文件是否一致。代码签名、可复现构建和安全审计需分别验证。</p><div class="verification-commands">${[["Windows PowerShell", powershell], ["macOS", unix]].map(([label, command]) => `<article><header><span>${label}</span><button class="copy-button" type="button" data-copy-text="${escapeHtml(command)}" aria-label="复制${label}校验命令">${icon("copy")}<span>复制</span></button></header><pre role="region" tabindex="0" aria-label="${escapeHtml(label)} 校验命令"><code>${escapeHtml(command)}</code></pre></article>`).join("")}</div><a class="text-action" href="/docs/release-verification/">完整校验指南 ${icon("arrow")}</a></div></details>
    </div></section>
    <section class="page-next"><div class="container"><div><h2>安装后，连接两台设备。</h2></div><a class="button button--secondary" href="/docs/getting-started/">快速开始 ${icon("arrow")}</a></div></section>
  </main>`;
}
