import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const data = JSON.parse(await readFile(path.join(root, "release-data.json"), "utf8"));
const failures = [];
if (data.schema_version !== 1) failures.push("schema_version must be 1");
if (!/^v\d+\.\d+\.\d+/.test(data.tag_name || "")) failures.push("invalid tag_name");
if (!Array.isArray(data.assets) || data.assets.length < 6) failures.push("release assets are missing");
const names = new Set();
for (const asset of data.assets || []) {
  if (names.has(asset.name)) failures.push(`duplicate asset: ${asset.name}`);
  names.add(asset.name);
  if (!asset.browser_download_url?.startsWith(`https://github.com/yhan-sun/p2wlan/releases/download/${data.tag_name}/`)) failures.push(`untrusted URL: ${asset.name}`);
  if (asset.digest && !/^sha256:[a-f0-9]{64}$/i.test(asset.digest)) failures.push(`invalid digest: ${asset.name}`);
}
if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log(`release data validation passed: ${data.tag_name}, ${data.assets.length} assets`);
