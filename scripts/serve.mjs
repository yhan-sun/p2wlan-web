import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.posix.normalize(decoded).replace(/^\.\.(?:\/|$)/, "");
  return path.join(root, normalized);
}

const server = http.createServer(async (request, response) => {
  try {
    let target = safePath(request.url || "/");
    let info;
    try {
      info = await stat(target);
    } catch {
      info = null;
    }
    if (info?.isDirectory()) target = path.join(target, "index.html");
    if (!info && !path.extname(target)) target = path.join(target, "index.html");
    const body = await readFile(target);
    response.writeHead(200, {
      "content-type": types[path.extname(target)] || "application/octet-stream",
      "cache-control": target.endsWith(".html") ? "no-cache" : "public, max-age=3600",
    });
    response.end(body);
  } catch {
    try {
      const body = await readFile(path.join(root, "404.html"));
      response.writeHead(404, { "content-type": "text/html; charset=utf-8" });
      response.end(body);
    } catch {
      response.writeHead(404).end("Not found");
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`P2WLAN site: http://127.0.0.1:${port}`);
});
