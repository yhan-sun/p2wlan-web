import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const downloadHtml = path.join(rootDir, "dist", "download", "index.html");

let html = await readFile(downloadHtml, "utf8");

const stylesheet = '<link rel="stylesheet" href="/assets/download-showcase.css" />';
const script = '<script type="module" src="/assets/download-showcase.js"></script>';

if (!html.includes(stylesheet)) {
  html = html.replace("</head>", `  ${stylesheet}\n</head>`);
}

if (!html.includes(script)) {
  html = html.replace("</body>", `  ${script}\n</body>`);
}

await writeFile(downloadHtml, html, "utf8");
console.log("injected download showcase assets into /download/");
