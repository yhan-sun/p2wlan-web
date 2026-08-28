import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseFallback } from "../src/content.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const cachePath = path.join(rootDir, ".cache", "release.json");
const outputPath = path.join(rootDir, "dist", "release-data.json");

async function loadRelease() {
  if (existsSync(cachePath)) {
    try {
      const cached = JSON.parse(await readFile(cachePath, "utf8"));
      if (cached?.tag && Array.isArray(cached.assets) && cached.assets.length > 0) {
        return cached;
      }
    } catch (error) {
      console.warn(`release cache ignored while writing public metadata: ${error.message}`);
    }
  }
  return releaseFallback;
}

function normalizeAsset(asset) {
  const name = String(asset?.name || "");
  const digest = String(asset?.digest || "");
  const downloadUrl = String(asset?.url || "");

  if (!name) throw new Error("release asset is missing its name");
  if (!/^sha256:[a-f0-9]{64}$/i.test(digest)) {
    throw new Error(`release asset has no valid SHA-256 digest: ${name}`);
  }
  if (!/^https:\/\/github\.com\/yhan-sun\/p2wlan\/releases\/download\//.test(downloadUrl)) {
    throw new Error(`release asset has an untrusted download URL: ${name}`);
  }

  return {
    name,
    size: Number(asset.size) || 0,
    digest,
    browser_download_url: downloadUrl,
    content_type: String(asset.contentType || ""),
    updated_at: String(asset.updatedAt || ""),
  };
}

const release = await loadRelease();
const publicMetadata = {
  schema_version: 1,
  tag_name: String(release.tag),
  name: String(release.name || release.tag),
  published_at: String(release.publishedAt || ""),
  html_url: String(release.url || ""),
  source: String(release.source || "unknown"),
  fetched_at: String(release.fetchedAt || ""),
  assets: release.assets.map(normalizeAsset),
};

if (!/^v\d+\.\d+\.\d+/.test(publicMetadata.tag_name)) {
  throw new Error(`invalid public release tag: ${publicMetadata.tag_name}`);
}
if (publicMetadata.assets.length === 0) {
  throw new Error("public release metadata has no assets");
}

await mkdir(path.dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(publicMetadata, null, 2)}\n`, "utf8");
console.log(`wrote public metadata for ${publicMetadata.tag_name}: ${publicMetadata.assets.length} assets`);
