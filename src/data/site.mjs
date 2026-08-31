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
  { match: "windows-x64-setup.exe", key: "windows-x64", platform: "Windows", family: "windows", detail: "Windows 10/11 · x64 安装程序", maturity: "Preview", purpose: "Desktop", extension: ".exe" },
  { match: "macos-arm64.dmg", key: "macos-arm64", platform: "macOS", family: "macos", detail: "Apple Silicon · DMG", maturity: "Preview", purpose: "Desktop", extension: ".dmg" },
  { match: "macos-x64.dmg", key: "macos-x64", platform: "macOS", family: "macos", detail: "Intel · DMG", maturity: "Preview", purpose: "Desktop", extension: ".dmg" },
  { match: "flutter-linux-x64.tar.gz", key: "linux-gui-x64", platform: "Linux GUI", family: "linux", detail: "x86_64 · Flutter 客户端", maturity: "Preview", purpose: "Desktop", extension: ".tar.gz" },
  { match: "linux-x64-cli.tar.gz", key: "linux-cli-x64", platform: "Linux CLI", family: "linux", detail: "x86_64 · CLI 与 daemon", maturity: "Preview", purpose: "Server", extension: ".tar.gz" },
  { match: "linux-arm64-cli.tar.gz", key: "linux-cli-arm64", platform: "Linux CLI", family: "linux", detail: "arm64 · CLI 与 daemon", maturity: "Preview", purpose: "Server", extension: ".tar.gz" },
  { match: "android-arm64-release.apk", key: "android-arm64", platform: "Android", family: "mobile", detail: "arm64 · APK 侧载", maturity: "Preview", purpose: "Mobile", extension: ".apk" },
  { match: "ios-arm64-unsigned.ipa", key: "ios-arm64", platform: "iOS", family: "mobile", detail: "arm64 · 未签名 IPA", maturity: "Experimental", purpose: "Mobile", extension: ".ipa" },
];

export function normalizeAssets(release) {
  return (release.assets || []).map((asset) => {
    const rule = ASSET_RULES.find((item) => asset.name.includes(item.match));
    if (!rule) return null;
    return { ...rule, name: asset.name, size: Number(asset.size || 0), digest: asset.digest || "", url: asset.browser_download_url || asset.url || "", contentType: asset.content_type || "application/octet-stream", updatedAt: asset.updated_at || release.published_at || release.publishedAt || "" };
  }).filter(Boolean);
}

export function normalizeRelease(input) {
  return { tag: input.tag || input.tag_name, name: input.name || input.tag || input.tag_name, publishedAt: input.publishedAt || input.published_at, url: input.url || input.html_url, source: input.source || "fallback", fetchedAt: input.fetchedAt || input.fetched_at || null, assets: input.assets || [] };
}
