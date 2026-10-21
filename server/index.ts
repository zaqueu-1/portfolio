import { createReadStream } from "node:fs"
import { stat } from "node:fs/promises"
import { createServer, type IncomingMessage, type ServerResponse } from "node:http"
import { join, resolve } from "node:path"
import { pipeline } from "node:stream"
import { fileURLToPath } from "node:url"
import contactHandler from "../api/contact"
import { contentType, parseRange, resolveStaticPath } from "./static"

const DIST_DIR = resolve(fileURLToPath(new URL("../dist", import.meta.url)))
const INDEX_HTML = join(DIST_DIR, "index.html")
const DEFAULT_PORT = 3000

async function fileSize(filePath: string): Promise<number | null> {
  const info = await stat(filePath).catch(() => null)
  return info?.isFile() ? info.size : null
}

function sendJson(res: ServerResponse, status: number, body: object): void {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" })
  res.end(JSON.stringify(body))
}

// Safari will not play <video> unless byte-range requests get a 206.
function sendFile(req: IncomingMessage, res: ServerResponse, filePath: string, size: number, pathname: string): void {
  const isHashedAsset = pathname.startsWith("/assets/")
  const headers = {
    "Content-Type": contentType(filePath),
    "Cache-Control": isHashedAsset ? "public, max-age=31536000, immutable" : "no-cache",
    "Accept-Ranges": "bytes",
  }

  const range = parseRange(req.headers.range, size)
  if (range === "unsatisfiable") {
    res.writeHead(416, { ...headers, "Cache-Control": "no-store", "Content-Range": `bytes */${size}` })
    res.end()
    return
  }

  const { start, end } = range ?? { start: 0, end: size - 1 }
  res.writeHead(range ? 206 : 200, {
    ...headers,
    "Content-Length": String(size === 0 ? 0 : end - start + 1),
    ...(range && { "Content-Range": `bytes ${start}-${end}/${size}` }),
  })
  if (req.method === "HEAD" || size === 0) {
    res.end()
    return
  }
  pipeline(createReadStream(filePath, { start, end }), res, (err) => {
    if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
      console.error("[server] read failed:", filePath, err.message)
    }
  })
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
  const size = filePath ? await fileSize(filePath) : null
  if (filePath && size !== null) return sendFile(req, res, filePath, size, pathname)

  const indexSize = await fileSize(INDEX_HTML)
  if (indexSize === null) throw new Error(`missing ${INDEX_HTML}`)
  sendFile(req, res, INDEX_HTML, indexSize, pathname)
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
