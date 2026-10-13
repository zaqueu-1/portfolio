import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer, type IncomingMessage, type ServerResponse } from "node:http"
import { join, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import contactHandler from "../api/contact"
import { contentType, resolveStaticPath } from "./static"

const DIST_DIR = resolve(fileURLToPath(new URL("../dist", import.meta.url)))
const INDEX_HTML = join(DIST_DIR, "index.html")
const DEFAULT_PORT = 3000

async function isFile(filePath: string): Promise<boolean> {
  const info = await stat(filePath).catch(() => null)
  return info?.isFile() ?? false
}

function sendJson(res: ServerResponse, status: number, body: object): void {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" })
  res.end(JSON.stringify(body))
}

function sendFile(req: IncomingMessage, res: ServerResponse, filePath: string, pathname: string): void {
  const isHashedAsset = pathname.startsWith("/assets/")
  res.writeHead(200, {
    "Content-Type": contentType(filePath),
    "Cache-Control": isHashedAsset ? "public, max-age=31536000, immutable" : "no-cache",
  })
  if (req.method === "HEAD") {
    res.end()
    return
  }
  createReadStream(filePath)
    .on("error", (err) => {
      console.error("[server] read failed:", filePath, err.message)
      res.destroy(err)
    })
    .pipe(res)
}

async function route(req: IncomingMessage, res: ServerResponse): Promise<void> {
  const { pathname } = new URL(req.url ?? "/", "http://localhost")

  if (pathname === "/api/contact" || pathname === "/api/contact/") return contactHandler(req, res)
  if (pathname.startsWith("/api/")) return sendJson(res, 404, { ok: false, error: "not_found" })

  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" })
    res.end()
    return
  }

  const filePath = resolveStaticPath(DIST_DIR, pathname)
  if (filePath && (await isFile(filePath))) return sendFile(req, res, filePath, pathname)

  // SPA fallback, mirrors the vercel.json rewrite.
  sendFile(req, res, INDEX_HTML, pathname)
}

const port = Number(process.env.PORT) || DEFAULT_PORT

createServer((req, res) => {
  route(req, res).catch((err: unknown) => {
    console.error("[server] request failed:", err instanceof Error ? err.message : "unknown")
    if (!res.headersSent) sendJson(res, 500, { ok: false, error: "server" })
    else res.end()
  })
}).listen(port, "0.0.0.0", () => {
  console.log(`[server] listening on :${port}`)
})
