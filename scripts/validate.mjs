import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DOC_GROUP_ORDER, normalizeRelease } from "../src/data/site.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const docs = JSON.parse(await readFile(path.join(root, "src", "data", "docs.json"), "utf8"));
const release = normalizeRelease(JSON.parse(await readFile(path.join(root, "src", "data", "release-fallback.json"), "utf8")));
const failures = [];
const paths = new Set();
const orders = new Set();

for (const doc of docs) {
  if (!doc.path?.startsWith("/docs/") || !doc.path.endsWith("/")) failures.push(`invalid doc path: ${doc.path}`);
  if (paths.has(doc.path)) failures.push(`duplicate doc path: ${doc.path}`);
  if (orders.has(doc.order)) failures.push(`duplicate doc order: ${doc.order}`);
  paths.add(doc.path);
  orders.add(doc.order);
  if (!DOC_GROUP_ORDER.includes(doc.group)) failures.push(`unknown doc group: ${doc.group}`);
  const file = path.join(root, "src", "content", "docs", doc.file);
  try { await access(file); } catch { failures.push(`missing doc body: ${doc.file}`); continue; }
  const body = await readFile(file, "utf8");
  const ids = [...body.matchAll(/<h2\s+id="([^"]+)"/g)].map((match) => match[1]);
  if (!ids.length) failures.push(`doc has no h2 sections: ${doc.path}`);
  if (new Set(ids).size !== ids.length) failures.push(`duplicate heading id: ${doc.path}`);
  for (const match of body.matchAll(/href="(\/docs\/[^"#?]+\/)"/g)) {
    if (match[1] !== "/docs/" && !docs.some((item) => item.path === match[1])) failures.push(`${doc.path} links to unknown doc ${match[1]}`);
  }
  if (/better-douyin|lorem ipsum|template placeholder/i.test(body)) failures.push(`placeholder or cross-project content: ${doc.path}`);
}

if (docs.length !== 15) failures.push(`expected 15 docs, found ${docs.length}`);
if (!/^v\d+\.\d+\.\d+/.test(release.tag || "")) failures.push(`invalid fallback tag: ${release.tag}`);
if (!Array.isArray(release.assets) || release.assets.length < 6) failures.push("fallback release assets are incomplete");
for (const asset of release.assets || []) {
  const url = asset.browser_download_url || asset.url || "";
  if (!url.startsWith("https://github.com/yhan-sun/p2wlan/releases/download/")) failures.push(`untrusted asset URL: ${asset.name}`);
  if (asset.digest && !/^sha256:[a-f0-9]{64}$/i.test(asset.digest)) failures.push(`invalid digest: ${asset.name}`);
}

if (failures.length) {
  console.error([...new Set(failures)].map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}
console.log(`content validation passed: ${docs.length} docs, ${release.assets.length} fallback assets`);
