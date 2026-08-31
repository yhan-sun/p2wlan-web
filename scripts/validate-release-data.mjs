import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const metadataPath = path.join(rootDir, "dist", "release-data.json");

const release = JSON.parse(await readFile(metadataPath, "utf8"));
const errors = [];

if (release.schema_version !== 1) errors.push("schema_version must be 1");
if (!/^v\d+\.\d+\.\d+/.test(String(release.tag_name || ""))) {
  errors.push("tag_name is missing or invalid");
}
if (!Array.isArray(release.assets) || release.assets.length === 0) {
  errors.push("assets must contain at least one release asset");
}

const names = new Set();
for (const asset of release.assets || []) {
  if (!asset?.name) errors.push("an asset is missing its name");
  if (names.has(asset?.name)) errors.push(`duplicate asset: ${asset.name}`);
  names.add(asset?.name);

  if (!/^sha256:[a-f0-9]{64}$/i.test(String(asset?.digest || ""))) {
    errors.push(`invalid SHA-256 digest: ${asset?.name || "unknown"}`);
  }
  if (!/^https:\/\/github\.com\/yhan-sun\/p2wlan\/releases\/download\//.test(String(asset?.browser_download_url || ""))) {
    errors.push(`untrusted download URL: ${asset?.name || "unknown"}`);
  }
}

if (errors.length > 0) {
  console.error(`release metadata validation failed (${errors.length})`);
  for (const error of [...new Set(errors)]) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`release metadata validation passed: ${release.tag_name}, ${release.assets.length} assets`);
