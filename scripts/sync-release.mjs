import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const response = await fetch("https://api.github.com/repos/yhan-sun/p2wlan/releases/latest", {
  headers: {
    Accept: "application/vnd.github+json",
    "User-Agent": "p2wlan-web-release-sync",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
  },
});
if (!response.ok) throw new Error(`GitHub release API returned ${response.status}`);
const data = await response.json();
if (!data.tag_name || !Array.isArray(data.assets) || data.assets.length === 0) {
  throw new Error("latest release is missing tag or assets");
}
const release = {
  schema_version: 1,
  tag_name: data.tag_name,
  name: data.name || data.tag_name,
  published_at: data.published_at,
  html_url: data.html_url,
  source: "github-api",
  fetched_at: new Date().toISOString(),
  assets: data.assets.map((asset) => ({
    name: asset.name,
    size: asset.size,
    digest: asset.digest || "",
    browser_download_url: asset.browser_download_url,
    content_type: asset.content_type,
    updated_at: asset.updated_at,
  })),
};
await mkdir(path.join(root, ".cache"), { recursive: true });
await writeFile(path.join(root, ".cache", "release.json"), `${JSON.stringify(release, null, 2)}\n`, "utf8");
console.log(`synced ${release.tag_name} with ${release.assets.length} assets`);
