import { docs, docGroups, releaseFallback, normalizeAssets, SITE } from "../src/content.mjs";

const errors = [];
const forbidden = [
  "Open Shell",
  "mock backend",
  "mock bridge",
  "MCP 写操作",
  "AI 自动发送",
  "仅供学习、研究和非商业使用",
  "../deploy/staging",
  "checksums.sha256",
];
const requiredDocs = [
  "/docs/",
  "/docs/getting-started/",
  "/docs/install/",
  "/docs/release-verification/",
  "/docs/clients/desktop/",
  "/docs/clients/mobile/",
  "/docs/cli/",
  "/docs/configuration/",
  "/docs/networking/",
  "/docs/nat-traversal/",
  "/docs/relay/",
  "/docs/self-hosting/",
  "/docs/security/",
  "/docs/troubleshooting/",
  "/docs/development/",
  "/docs/faq/",
];

function fail(message) {
  errors.push(message);
}

function headingIds(html) {
  return [...html.matchAll(/<h[23]\s+id="([^"]+)"/g)].map((match) => match[1]);
}

if (!/^https:\/\//.test(SITE.origin) || SITE.origin.endsWith("/")) {
  fail("SITE.origin 必须是无尾斜杠的 HTTPS origin");
}

const paths = docs.map((doc) => doc.path);
if (new Set(paths).size !== paths.length) fail("文档 path 存在重复");
for (const pathName of requiredDocs) {
  if (!paths.includes(pathName)) fail(`缺少必需文档：${pathName}`);
}

for (const doc of docs) {
  if (!/^\/docs\/(?:.*\/)?$/.test(doc.path)) fail(`文档路径必须使用 /docs/.../：${doc.path}`);
  if (!doc.title || !doc.description || !Array.isArray(doc.keywords) || doc.keywords.length < 2) {
    fail(`文档元数据不完整：${doc.path}`);
  }
  const html = doc.body({ release: releaseFallback });
  if (!html.includes("<h2")) fail(`文档至少需要一个 h2：${doc.path}`);
  const ids = headingIds(html);
  if (new Set(ids).size !== ids.length) fail(`标题锚点重复：${doc.path}`);
  if (html.includes("javascript:")) fail(`禁止 javascript: URL：${doc.path}`);
  for (const phrase of forbidden) {
    if (html.includes(phrase)) fail(`发现禁用/错误内容 “${phrase}”：${doc.path}`);
  }
}

const groupedPaths = docGroups.flatMap((group) => group.items.map(([href]) => href));
if (new Set(groupedPaths).size !== groupedPaths.length) fail("文档导航存在重复项");
for (const href of groupedPaths) {
  if (!paths.includes(href)) fail(`文档导航引用不存在页面：${href}`);
}
for (const pathName of paths) {
  if (!groupedPaths.includes(pathName)) fail(`文档未进入导航：${pathName}`);
}

const assets = normalizeAssets(releaseFallback);
if (assets.length !== releaseFallback.assets.length) fail("Release 资产 metadata 映射不完整");
for (const asset of assets) {
  if (!/^sha256:[a-f0-9]{64}$/i.test(asset.digest || "")) fail(`无效 SHA-256：${asset.name}`);
  if (!/^https:\/\/github\.com\/yhan-sun\/p2wlan\/releases\/download\//.test(asset.url)) {
    fail(`无效 Release 地址：${asset.name}`);
  }
  if (!Number.isFinite(asset.size) || asset.size <= 0) fail(`无效资产大小：${asset.name}`);
}

if (errors.length > 0) {
  console.error(`content validation failed (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`content validation passed: ${docs.length} docs, ${assets.length} release assets`);
