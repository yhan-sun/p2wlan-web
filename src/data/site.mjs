export const SITE = {
  name: "P2WLAN",
  origin: "https://p2wlan.yhan.fun",
  repository: "https://github.com/yhan-sun/p2wlan",
  webRepository: "https://github.com/yhan-sun/p2wlan-web",
  releases: "https://github.com/yhan-sun/p2wlan/releases",
  issues: "https://github.com/yhan-sun/p2wlan/issues",
  description: "P2WLAN 是一个开源、可自托管的 P2P 虚拟局域网。设备优先建立端到端加密直连，必要时自动切换 Relay。",
};

export const NAVIGATION = [
  ["/", "首页"],
  ["/download/", "下载"],
  ["/docs/", "文档"],
  ["/docs/self-hosting/", "自托管"],
  ["/changelog/", "更新"],
];

export const DOC_GROUP_ORDER = ["开始使用", "网络原理", "客户端", "部署与运维", "项目"];

export const ASSET_RULES = [
  { match: /^p2wlan-(?:flutter-)?windows-x64-setup\.exe$/, key: "windows-x64", platform: "Windows", family: "windows", architecture: "x64", detail: "x64 · 安装程序", purpose: "桌面", extension: ".exe" },
  { match: /^p2wlan-(?:flutter-)?macos-arm64\.dmg$/, key: "macos-arm64", platform: "macOS", family: "macos", architecture: "Apple Silicon", detail: "Apple Silicon · DMG", purpose: "桌面", extension: ".dmg" },
  { match: /^p2wlan-(?:flutter-)?macos-x64\.dmg$/, key: "macos-x64", platform: "macOS", family: "macos", architecture: "Intel x64", detail: "Intel · DMG", purpose: "桌面", extension: ".dmg" },
  { match: /^p2wlan-(?:flutter-)?linux-x64\.tar\.gz$/, key: "linux-gui-x64", platform: "Linux GUI", family: "linux", architecture: "x64", detail: "x86_64 · 图形客户端", purpose: "桌面", extension: ".tar.gz" },
  { match: /^p2wlan-linux-x64-cli\.tar\.gz$/, key: "linux-cli-x64", platform: "Linux CLI", family: "linux", architecture: "x64", detail: "x86_64 · CLI 与 daemon", purpose: "服务器", extension: ".tar.gz" },
  { match: /^p2wlan-linux-arm64-cli\.tar\.gz$/, key: "linux-cli-arm64", platform: "Linux CLI", family: "linux", architecture: "arm64", detail: "arm64 · CLI 与 daemon", purpose: "服务器", extension: ".tar.gz" },
  { match: /^p2wlan-(?:flutter-)?android-arm64-release\.apk$/, key: "android-arm64", platform: "Android", family: "android", architecture: "arm64", detail: "arm64 · APK 侧载", purpose: "移动端", extension: ".apk" },
  { match: /^p2wlan-(?:flutter-)?ios-arm64-unsigned\.ipa$/, key: "ios-arm64", platform: "iOS", family: "ios", architecture: "arm64", detail: "未签名实验构建 · 需要自行签名", purpose: "实验性", extension: ".ipa", experimental: true },
  ...[["24.10", ".ipk"], ["25.12", ".apk"]].flatMap(([firmware, extension]) =>
    ["aarch64_generic", "aarch64_cortex-a53", "aarch64_cortex-a72", "aarch64_cortex-a76", "x86_64"].map((architecture) => ({
      match: new RegExp(`^p2wlan-openwrt-${firmware.replaceAll(".", "\\.")}-${architecture}\\${extension}$`),
      key: `openwrt-${firmware.replaceAll(".", "-")}-${architecture.replaceAll("_", "-")}`,
      platform: "OpenWrt", family: "openwrt", firmware, architecture,
      detail: `${firmware} · ${architecture} · ${extension.slice(1).toUpperCase()}`,
      purpose: "路由器", extension,
    }))
  ),
];

export function normalizeAssets(release) {
  return (release.assets || []).map((asset) => {
    const rule = ASSET_RULES.find((item) => item.match.test(asset.name)) || {
      key: `asset-${asset.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`,
      platform: asset.name.endsWith(".sha256") ? "SHA-256 文件" : asset.name === "RELEASE-MANIFEST.json" ? "发布清单" : "其他资产",
      family: "supporting", architecture: "", detail: "发布辅助文件", purpose: "校验", extension: "", supporting: true,
    };
    return { ...rule, name: asset.name, size: Number(asset.size || 0), digest: asset.digest || "", url: asset.browser_download_url || asset.url || "", contentType: asset.content_type || "application/octet-stream", updatedAt: asset.updated_at || release.published_at || release.publishedAt || "" };
  });
}

export function normalizeRelease(input) {
  return { tag: input.tag || input.tag_name, name: input.name || input.tag || input.tag_name, publishedAt: input.publishedAt || input.published_at, url: input.html_url || input.url, source: input.source || "fallback", fetchedAt: input.fetchedAt || input.fetched_at || null, prerelease: Boolean(input.prerelease), draft: Boolean(input.draft), body: input.body || "", history: (input.history || []).map((item) => ({ tag: item.tag || item.tag_name, publishedAt: item.publishedAt || item.published_at, url: item.html_url || item.url, body: item.body || "" })), assets: input.assets || [] };
}
