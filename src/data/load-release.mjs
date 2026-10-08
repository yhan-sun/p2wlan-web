import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { normalizeRelease } from "./site.mjs";

const fallbackFile = fileURLToPath(new URL("./release-fallback.json", import.meta.url));
const cacheFile = fileURLToPath(new URL("../../.cache/release.json", import.meta.url));

export function isClientRelease(release) {
  return /^v\d+\.\d+\.\d+$/.test(release.tag || release.tag_name || "") && !release.prerelease && !release.draft;
}

export async function loadRelease() {
  const fallback = normalizeRelease(JSON.parse(await readFile(fallbackFile, "utf8")));
  try {
    const candidate = normalizeRelease(JSON.parse(await readFile(cacheFile, "utf8")));
    if (isClientRelease(candidate) && candidate.assets.length && Date.parse(candidate.publishedAt) >= Date.parse(fallback.publishedAt)) return { release: candidate, fallback };
    console.warn("release cache is older than the verified fallback or is not a client release; using fallback");
  } catch (error) {
    if (error.code !== "ENOENT") console.warn(`release cache ignored: ${error.message}`);
  }
  return { release: fallback, fallback };
}
