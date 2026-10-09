import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { normalizeAssets, normalizeRelease } from "../src/data/site.mjs";
import { isClientRelease } from "../src/data/load-release.mjs";

const fallback = normalizeRelease(JSON.parse(await readFile(new URL("../src/data/release-fallback.json", import.meta.url), "utf8")));
const normalized = normalizeAssets(fallback);
assert.equal(normalized.length, fallback.assets.length, "every real release asset must remain available");
assert.equal(new Set(normalized.map((asset) => asset.key)).size, normalized.length, "asset keys must be unique");
for (const key of ["windows-x64", "macos-arm64", "macos-x64", "linux-gui-x64", "linux-cli-x64", "linux-cli-arm64", "android-arm64"]) {
  const matches = normalized.filter((asset) => asset.key === key);
  assert.equal(matches.length, 1, `expected exactly one package for ${key}`);
  assert.ok(!matches[0].name.endsWith(".sha256"), "a checksum file cannot become a recommended installer");
}
const legacy = normalizeAssets({ assets: [{ name: "p2wlan-flutter-linux-x64.tar.gz" }, { name: "p2wlan-flutter-macos-arm64.dmg" }, { name: "p2wlan-linux-x64-cli.tar.gz.sha256" }] });
assert.equal(legacy[0].key, "linux-gui-x64", "legacy GUI filenames must remain supported");
assert.equal(legacy[1].key, "macos-arm64");
assert.equal(legacy[2].family, "supporting", "sidecar checksums must not overwrite the CLI package");
assert.ok(normalized.find((asset) => asset.key === "ios-arm64")?.experimental, "unsigned IPA must remain explicitly experimental");
const routerPackages = normalized.filter((asset) => asset.family === "openwrt");
assert.equal(routerPackages.length, 10, "all ten OpenWrt native packages must be classified as installers");
for (const [firmware, extension] of [["24.10", ".ipk"], ["25.12", ".apk"]]) {
  for (const architecture of ["aarch64_generic", "aarch64_cortex-a53", "aarch64_cortex-a72", "aarch64_cortex-a76", "x86_64"]) {
    const asset = routerPackages.find((item) => item.name === `p2wlan-openwrt-${firmware}-${architecture}${extension}`);
    assert.ok(asset, `missing native OpenWrt package: ${firmware} ${architecture}`);
    assert.equal(asset.firmware, firmware);
    assert.equal(asset.architecture, architecture, "preserve the firmware's exact package architecture");
    assert.equal(asset.extension, extension);
    assert.equal(asset.platform, "OpenWrt", "OpenWrt APK files must not be classified as Android");
    assert.ok(!asset.supporting && !asset.experimental, "native packages are published installers");
  }
}
const mismatchedRouterFiles = normalizeAssets({ assets: [
  { name: "p2wlan-openwrt-24.10-x86_64.apk" },
  { name: "p2wlan-openwrt-25.12-x86_64.ipk" },
  { name: "p2wlan-openwrt-25.12-mips.apk" },
  { name: "p2wlan-openwrt-24.10-x86_64.ipk.sha256" },
] });
assert.ok(mismatchedRouterFiles.every((asset) => asset.supporting), "unsupported series, architectures and sidecars cannot become native installers");
assert.equal(normalized.filter((asset) => asset.family === "android").length, 1, "only the Android release APK belongs to Android");
assert.ok(isClientRelease({ tag_name: fallback.tag }));
assert.ok(!isClientRelease({ tag_name: `server-${fallback.tag}` }));
assert.ok(!isClientRelease({ tag_name: "v0.1.170", prerelease: true }));
assert.ok(!isClientRelease({ tag_name: "v0.1.170", draft: true }));
console.log("release classification passed: desktop/mobile packages, ten native OpenWrt packages, firmware/architecture boundaries, legacy Linux, checksum sidecars, unsigned IPA and client/server tags");
