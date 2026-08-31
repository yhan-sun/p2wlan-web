import { SITE } from "../data/site.mjs";
import { assetByKey, escapeHtml, formatBytes, formatDate, icon } from "../ui.mjs";

function platformDownload(asset, label) {
  if (!asset) return `<a class="button button--secondary" href="${SITE.releases}">${escapeHtml(label)}</a>`;
  return `<a class="button button--primary" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(
    asset.key
  )}">${icon("download")}<span>${escapeHtml(label)}</span></a>`;
}

function assetRow(asset) {
  const digest = asset.digest || "GitHub 未提供 digest";
  return `<article class="asset-row" id="${escapeHtml(asset.key)}" data-platform-card="${escapeHtml(asset.key)}">
    <div class="asset-row__identity"><span class="asset-purpose">${escapeHtml(asset.purpose)}</span><div><strong>${escapeHtml(
      asset.platform
    )}</strong><p>${escapeHtml(asset.detail)}</p></div></div>
    <div class="asset-row__file"><code>${escapeHtml(asset.name)}</code><span>${formatBytes(asset.size)}</span></div>
    <div class="asset-row__digest"><code title="${escapeHtml(digest)}">${escapeHtml(digest.replace(/^sha256:/, ""))}</code><button type="button" class="copy-button" data-copy-text="${escapeHtml(
      digest.replace(/^sha256:/, "")
    )}" aria-label="复制 ${escapeHtml(asset.platform)} 的 SHA-256">${icon("copy")}<span>复制</span></button></div>
    <a class="asset-download" href="${escapeHtml(asset.url)}" data-download-key="${escapeHtml(asset.key)}" aria-label="下载 ${escapeHtml(
      asset.platform
    )}">${icon("download")}<span>下载</span></a>
  </article>`;
}

export function renderDownload({ release, assets }) {
  const windows = assetByKey(assets, "windows-x64");
  const macArm = assetByKey(assets, "macos-arm64");
  const macX64 = assetByKey(assets, "macos-x64");
  const linuxGui = assetByKey(assets, "linux-gui-x64");
  const linuxCliX64 = assetByKey(assets, "linux-cli-x64");
  const linuxCliArm = assetByKey(assets, "linux-cli-arm64");
  const android = assetByKey(assets, "android-arm64");
  const ios = assetByKey(assets, "ios-arm64");

  return `
    <main id="main-content" class="page-main">
      <section class="page-hero page-hero--download">
        <div class="container page-hero__grid">
          <div class="page-hero__copy">
            <p class="page-kicker">Download · ${escapeHtml(release.tag)}</p>
            <h1>下载 P2WLAN</h1>
            <p>先选择平台，再按需要查看架构、完整文件名与 SHA-256。所有安装包都直接来自 GitHub Releases。</p>
            <div class="page-meta"><span>${formatDate(release.publishedAt)}</span><span>${assets.length} 个资产</span><span>MIT · Preview</span></div>
          </div>
          <div class="download-hero-mark" aria-hidden="true"><span>${icon("download")}</span><i></i><b>${escapeHtml(release.tag)}</b></div>
        </div>
      </section>

      <section class="section section--tight">
        <div class="container">
          <article class="smart-recommendation" data-smart-panel>
            <div class="smart-recommendation__icon">${icon("monitor")}</div>
            <div><p class="section-kicker">Recommended for this device</p><h2 data-smart-title>正在识别当前系统</h2><p data-smart-description>也可以从下方按平台手动选择。</p></div>
            <a class="button button--primary button--large" href="${SITE.releases}" data-smart-download>${icon("download")}<span>下载推荐版本</span></a>
          </article>

          <div class="download-platforms" aria-label="按平台下载">
            <article class="download-platform-card" data-platform-card="windows-x64"><header><span class="platform-icon">W</span><span class="maturity-badge">Preview</span></header><div><h2>Windows</h2><p>Windows 10/11 · x64 安装程序。适合日常桌面使用。</p></div>${platformDownload(windows, "下载 .exe")}</article>
            <article class="download-platform-card" data-platform-card="macos-arm64"><header><span class="platform-icon">M</span><span class="maturity-badge">Preview</span></header><div><h2>macOS</h2><p>Apple Silicon 与 Intel 分别提供 DMG，请按处理器架构选择。</p></div><div class="stacked-actions">${platformDownload(
              macArm,
              "Apple Silicon"
            )}${platformDownload(macX64, "Intel Mac")}</div></article>
            <article class="download-platform-card" data-platform-card="linux-cli-x64"><header><span class="platform-icon">L</span><span class="maturity-badge">Preview</span></header><div><h2>Linux</h2><p>桌面 GUI，或面向服务器的 CLI 与 daemon。</p></div><div class="stacked-actions">${platformDownload(
              linuxGui,
              "GUI x64"
            )}${platformDownload(linuxCliX64, "CLI x64")}${platformDownload(linuxCliArm, "CLI arm64")}</div></article>
            <article class="download-platform-card" data-platform-card="android-arm64"><header><span class="platform-icon">A</span><span class="maturity-badge maturity-badge--experimental">Mobile</span></header><div><h2>Android 与 iOS</h2><p>Android 使用 APK 侧载；iOS 提供未签名 IPA，需要自行签名。</p></div><div class="stacked-actions">${platformDownload(
              android,
              "Android APK"
            )}${platformDownload(ios, "iOS IPA")}</div></article>
          </div>
        </div>
      </section>

      <section class="section section--surface section--compact">
        <div class="container">
          <div class="section-split section-split--center">
            <header class="section-intro section-intro--small"><p class="section-kicker">Advanced downloads</p><h2>架构、文件名与完整摘要。</h2><p>普通安装只需使用上方推荐入口；排障、服务器部署或供应链核验时再展开完整列表。</p></header>
            <a class="button button--secondary" href="${escapeHtml(release.url)}">GitHub Release ${icon("arrow")}</a>
          </div>
          <details class="asset-disclosure">
            <summary><span>查看 ${assets.length} 个 Release 资产</span><small>文件大小 · SHA-256 · 直接下载</small>${icon("chevron")}</summary>
            <div class="asset-list">${assets.map(assetRow).join("")}</div>
          </details>
        </div>
      </section>

      <section class="section section--compact">
        <div class="container verification-grid">
          <header class="section-intro section-intro--small"><p class="section-kicker">Integrity</p><h2>安装前核对 SHA-256。</h2><p>本站同步展示 GitHub Release 提供的 digest。摘要一致能够发现下载损坏或文件被替换，但不等同于独立安全审计或可复现构建证明。</p><a class="text-action" href="/docs/release-verification/">完整校验指南 ${icon(
            "arrow"
          )}</a></header>
          <div class="verification-commands">
            <article><header><span>Windows PowerShell</span><button class="copy-button" type="button" data-copy-text="Get-FileHash .\\p2wlan-installer.exe -Algorithm SHA256">${icon(
              "copy"
            )}<span>复制</span></button></header><pre><code>Get-FileHash .\\p2wlan-installer.exe -Algorithm SHA256</code></pre></article>
            <article><header><span>macOS / Linux</span><button class="copy-button" type="button" data-copy-text="shasum -a 256 ./p2wlan-package">${icon(
              "copy"
            )}<span>复制</span></button></header><pre><code>shasum -a 256 ./p2wlan-package</code></pre></article>
          </div>
        </div>
      </section>

      <section class="page-cta">
        <div class="container page-cta__panel"><div><p>${escapeHtml(release.tag)} · Preview</p><h2>安装完成后，先连通两台设备。</h2></div><a class="button button--light" href="/docs/getting-started/">打开快速开始 ${icon("arrow")}</a></div>
      </section>
    </main>`;
}
