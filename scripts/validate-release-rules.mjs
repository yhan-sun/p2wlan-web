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
assert.ok(isClientRelease({ tag_name: "v0.1.169" }));
assert.ok(!isClientRelease({ tag_name: "server-v0.1.169" }));
assert.ok(!isClientRelease({ tag_name: "v0.1.170", prerelease: true }));
assert.ok(!isClientRelease({ tag_name: "v0.1.170", draft: true }));
console.log("release classification passed: current packages, legacy Linux, checksum sidecars, unsigned IPA and client/server tags");
