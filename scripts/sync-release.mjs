import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isClientRelease } from "../src/data/load-release.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "p2wlan-web-release-sync",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};
async function fetchJson(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(25_000) });
  if (!response.ok) throw new Error(`GitHub release API returned ${response.status}`);
  return response.json();
}
const latest = await fetchJson("https://api.github.com/repos/yhan-sun/p2wlan/releases/latest");
let history = [];
try {
  history = (await fetchJson("https://api.github.com/repos/yhan-sun/p2wlan/releases?per_page=50")).filter(isClientRelease);
} catch (error) {
  if (!isClientRelease(latest)) throw error;
  console.warn(`release history unavailable: ${error.message}`);
}
const data = isClientRelease(latest) ? latest : history[0];
if (!data?.tag_name || !Array.isArray(data.assets) || !data.assets.length) throw new Error("no published client release with assets was found");
const release = {
  schema_version: 1, tag_name: data.tag_name, name: data.name || data.tag_name,
  published_at: data.published_at, html_url: data.html_url, prerelease: data.prerelease,
  source: "github-api", fetched_at: new Date().toISOString(), body: data.body || "",
  history: history.filter((item) => item.tag_name !== data.tag_name).slice(0, 3).map((item) => ({ tag_name: item.tag_name, published_at: item.published_at, html_url: item.html_url, body: item.body || "" })),
  assets: data.assets.map((asset) => ({ name: asset.name, size: asset.size, digest: asset.digest || "", browser_download_url: asset.browser_download_url, content_type: asset.content_type, updated_at: asset.updated_at })),
};
await mkdir(path.join(root, ".cache"), { recursive: true });
await writeFile(path.join(root, ".cache", "release.json"), `${JSON.stringify(release, null, 2)}\n`, "utf8");
console.log(`synced client ${release.tag_name} with ${release.assets.length} assets and ${release.history.length} previous releases`);
