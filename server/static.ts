import { extname, normalize, resolve, sep } from "node:path"

const CONTENT_TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
}

/** Extensionless files (e.g. /.well-known/discord) are served as plain text. */
export function contentType(filePath: string): string {
  const ext = extname(filePath).toLowerCase()
  if (!ext) return "text/plain; charset=utf-8"
  return CONTENT_TYPES[ext] ?? "application/octet-stream"
}

/** Maps a URL pathname to a file inside root; null when it escapes root or is malformed. */
export function resolveStaticPath(root: string, pathname: string): string | null {
  let decoded: string
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }
  if (decoded.includes("\0")) return null
  const target = resolve(root, `.${normalize(`/${decoded}`)}`)
  return target.startsWith(root + sep) ? target : null
}
