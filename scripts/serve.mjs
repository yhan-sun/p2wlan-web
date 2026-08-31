import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);
const types = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".xml", "application/xml; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
]);

function resolveRequest(url) {
  const pathname = decodeURIComponent(new URL(url, "http://localhost").pathname);
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  let target = path.join(root, safe);
  if (existsSync(target) && statSync(target).isDirectory()) target = path.join(target, "index.html");
  if (!path.extname(target)) target = path.join(target, "index.html");
  if (!target.startsWith(root)) return path.join(root, "404.html");
  return existsSync(target) ? target : path.join(root, "404.html");
}

createServer((request, response) => {
  const target = resolveRequest(request.url || "/");
  const is404 = target.endsWith("404.html") && !String(request.url).includes("404");
  response.writeHead(is404 ? 404 : 200, {
    "Content-Type": types.get(path.extname(target)) || "application/octet-stream",
    "Cache-Control": "no-store",
  });
  createReadStream(target).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`P2WLAN preview: http://127.0.0.1:${port}`);
});
