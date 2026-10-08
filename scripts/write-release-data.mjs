import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadRelease } from "../src/data/load-release.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const { release } = await loadRelease();
const output = {
  schema_version: 1,
  tag_name: release.tag,
  name: release.name,
  published_at: release.publishedAt,
  html_url: release.url,
  source: release.source,
  fetched_at: release.fetchedAt,
  prerelease: release.prerelease,
  assets: release.assets.map((asset) => ({
    name: asset.name,
    size: asset.size,
    digest: asset.digest,
    browser_download_url: asset.browser_download_url || asset.url,
    content_type: asset.content_type || asset.contentType || "application/octet-stream",
    updated_at: asset.updated_at || asset.updatedAt || null,
  })),
};
await writeFile(path.join(root, "dist", "release-data.json"), `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`wrote release-data.json for ${release.tag}`);
