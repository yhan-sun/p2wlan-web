import { SITE } from "../data/site.mjs";
import { assetByKey, escapeHtml, formatBytes, formatDate, icon, lightPath, releaseLabel } from "../ui.mjs";

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
  const packages = assets.filter((asset) => !asset.supporting && !asset.experimental);
  const windows = get("windows-x64");
  const mac = get("macos-arm64");
  const powershell = windows ? `Get-FileHash .\\${windows.name} -Algorithm SHA256` : "Get-FileHash <下载的文件> -Algorithm SHA256";
  const unix = mac ? `shasum -a 256 ./${mac.name}` : "shasum -a 256 <下载的文件>";
  return `<main id="main-content" class="page-main">
    <section class="download-hero">
      ${lightPath("download-hero__light")}
      <div class="container">
        <header class="section-intro section-intro--center"><p class="page-kicker">Made for your devices</p><h1>下载 P2WLAN</h1><p>选择你的平台，让设备跨越网络互联。</p><div class="page-meta"><span>${escapeHtml(release.tag)}</span><span>${releaseLabel(release)}</span><span>${formatDate(release.publishedAt)}</span></div></header>
        <article class="smart-recommendation" data-smart-panel>
          <div class="smart-recommendation__main"><img src="/images/p2wlan-icon.svg" width="64" height="64" alt=""/><div><p class="section-kicker" data-smart-kicker>为这台设备选择</p><h2 data-smart-title>选择适合你的安装包</h2><p data-smart-description>按系统与处理器架构选择，也可浏览下方平台列表。</p></div></div>
          <div class="smart-recommendation__actions"><label for="download-package">平台与架构</label><select id="download-package" data-download-select><option value="">选择安装包</option>${packages.map((asset) => `<option value="${escapeHtml(asset.key)}">${escapeHtml(`${asset.platform} · ${asset.architecture}${asset.purpose === "服务器" ? " · CLI" : ""}`)}</option>`).join("")}</select><a class="button button--primary button--large" href="#platforms" data-smart-download>${icon("download")}<span>选择安装包</span></a></div>
          <div class="smart-recommendation__file"><span data-smart-file>安装包直接来自 GitHub Releases</span><span data-smart-meta>${escapeHtml(release.tag)} · 免费 · MIT</span></div>
        </article>
        <p class="download-help">若未能识别 macOS 芯片，可在「关于本机」核对并手动选择。<a href="/docs/install/">安装与权限说明 ${icon("arrow")}</a></p>
      </div>
    </section>
    <section class="section section--compact" id="platforms" aria-labelledby="platforms-title"><div class="container download-catalog">
      <header class="download-catalog__header"><h2 id="platforms-title">每一种平台，同一张网络。</h2><span>${escapeHtml(release.tag)}</span></header>
      <section class="download-platform-row" id="platform-windows"><div><h3>Windows</h3><p>x64 · 桌面安装程序</p></div><div class="package-options">${packageLink(windows, "Windows x64")}</div><a class="platform-guide" href="/docs/install/#windows">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-macos"><div><h3>macOS</h3><p>macOS 12+ · DMG</p></div><div class="package-options">${packageLink(mac, "Apple Silicon")}${packageLink(get("macos-x64"), "Intel Mac")}</div><a class="platform-guide" href="/docs/install/#macos">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-linux"><div><h3>Linux</h3><p>图形客户端或 CLI + daemon</p></div><div class="package-options">${packageLink(get("linux-gui-x64"), "GUI x64")}${packageLink(get("linux-cli-x64"), "CLI x64")}${packageLink(get("linux-cli-arm64"), "CLI arm64")}</div><a class="platform-guide" href="/docs/install/#linux-gui">安装指南 ${icon("arrow")}</a></section>
      <section class="download-platform-row" id="platform-android"><div><h3>Android</h3><p>Android 7.0+ · arm64 · APK 侧载</p></div><div class="package-options">${packageLink(get("android-arm64"), "Android arm64")}</div><a class="platform-guide" href="/docs/install/#android">安装指南 ${icon("arrow")}</a></section>
    </div></section>
    <section class="section section--compact download-advanced"><div class="container">
      <header class="section-split"><div><p class="section-kicker">When you need the details</p><h2>高级下载与校验</h2><p>完整文件名、发布辅助文件与 SHA-256。</p></div><a class="text-action" href="${escapeHtml(release.url)}">GitHub Release ↗</a></header>
      <details class="asset-disclosure"><summary><span>全部 ${assets.length} 个发布资产</span><small>含未签名实验构建及校验文件</small>${icon("chevron")}</summary><div class="asset-list"><p class="asset-list__note">SHA-256 是 GitHub 为该文件记录的摘要。iOS IPA 为未签名实验构建，需要自行签名，未作为主要客户端推荐。</p>${assets.map(assetRow).join("")}</div></details>
      <details class="verification-disclosure"><summary><span>如何核对 SHA-256</span>${icon("chevron")}</summary><div class="verification-content"><p>摘要一致可以发现下载损坏或文件变化。它不等同于代码签名、可复现构建证明或安全审计。</p><div class="verification-commands">${[["Windows PowerShell", powershell], ["macOS", unix]].map(([label, command]) => `<article><header><span>${label}</span><button class="copy-button" type="button" data-copy-text="${escapeHtml(command)}" aria-label="复制${label}校验命令">${icon("copy")}<span>复制</span></button></header><pre role="region" tabindex="0" aria-label="${escapeHtml(label)} 校验命令"><code>${escapeHtml(command)}</code></pre></article>`).join("")}</div><a class="text-action" href="/docs/release-verification/">完整校验指南 ${icon("arrow")}</a></div></details>
    </div></section>
    <section class="page-next"><div class="container"><div><p class="section-kicker">Next step</p><h2>安装完成，连通第一对设备。</h2></div><a class="button button--secondary" href="/docs/getting-started/">打开快速开始 ${icon("arrow")}</a></div></section>
  </main>`;
}
