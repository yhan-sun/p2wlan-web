import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { releaseFallback } from "../src/content.mjs";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const outputPath = path.join(rootDir, ".cache", "release.json");
const apiUrl = "https://api.github.com/repos/yhan-sun/p2wlan/releases/latest";
const requiredAssets = new Set(releaseFallback.assets.map((asset) => asset.name));
const strict = process.env.RELEASE_SYNC_REQUIRED === "true";

function normalizeRelease(raw) {
  if (!raw || raw.draft || !raw.tag_name || !Array.isArray(raw.assets)) {
    throw new Error("GitHub 返回的 latest release 结构无效");
  }

  const assets = raw.assets
    .filter((asset) => asset?.state === "uploaded" && asset.name && asset.browser_download_url)
    .map((asset) => ({
      name: String(asset.name),
      size: Number(asset.size) || 0,
      digest: typeof asset.digest === "string" ? asset.digest : "",
      url: String(asset.browser_download_url),
      contentType: typeof asset.content_type === "string" ? asset.content_type : "",
      updatedAt: typeof asset.updated_at === "string" ? asset.updated_at : "",
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const names = new Set(assets.map((asset) => asset.name));
  const missing = [...requiredAssets].filter((name) => !names.has(name));
  if (missing.length > 0) {
    throw new Error(`latest release 缺少官网要求的资产：${missing.join(", ")}`);
  }

  for (const asset of assets) {
    if (!/^https:\/\/github\.com\/yhan-sun\/p2wlan\/releases\/download\//.test(asset.url)) {
      throw new Error(`不可信的下载地址：${asset.name}`);
    }
    if (!/^sha256:[a-f0-9]{64}$/i.test(asset.digest)) {
      throw new Error(`资产缺少有效 SHA-256 digest：${asset.name}`);
    }
  }

  return {
    tag: String(raw.tag_name),
    name: String(raw.name || raw.tag_name),
    publishedAt: String(raw.published_at || raw.created_at || ""),
    url: String(raw.html_url || `https://github.com/yhan-sun/p2wlan/releases/tag/${raw.tag_name}`),
    source: "github-api",
    fetchedAt: new Date().toISOString(),
    assets,
  };
}

async function fetchRelease() {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "p2wlan-web-release-sync",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const response = await fetch(apiUrl, { headers, signal: AbortSignal.timeout(20_000) });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} ${response.statusText}`);
  }
  return normalizeRelease(await response.json());
}

async function writeRelease(release) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(release, null, 2)}\n`, "utf8");
}

try {
  const release = await fetchRelease();
  await writeRelease(release);
  console.log(`synced ${release.tag}: ${release.assets.length} assets from GitHub`);
} catch (error) {
  if (strict) throw error;

  let cached = null;
  try {
    cached = JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    // No usable cache. The checked-in fallback below keeps local builds deterministic.
  }

  if (cached?.tag && Array.isArray(cached.assets) && cached.assets.length > 0) {
    console.warn(`release sync failed; retaining cache ${cached.tag}: ${error.message}`);
  } else {
    await writeRelease({ ...releaseFallback, fetchedAt: new Date().toISOString() });
    console.warn(`release sync failed; wrote verified fallback ${releaseFallback.tag}: ${error.message}`);
  }
}
