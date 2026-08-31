import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeRelease } from "../src/data/site.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cache = path.join(root, ".cache", "release.json");
const fallback = path.join(root, "src", "data", "release-fallback.json");
const release = normalizeRelease(JSON.parse(await readFile(existsSync(cache) ? cache : fallback, "utf8")));
const output = {
  schema_version: 1,
  tag_name: release.tag,
  name: release.name,
  published_at: release.publishedAt,
  html_url: release.url,
  source: release.source,
  fetched_at: release.fetchedAt,
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
