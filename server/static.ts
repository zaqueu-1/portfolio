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

export interface ByteRange {
  start: number
  end: number
}

/** Single `bytes=` range only; null means serve the whole file, "unsatisfiable" means 416. */
export function parseRange(header: string | undefined, size: number): ByteRange | "unsatisfiable" | null {
  const match = header?.trim().match(/^bytes=(\d*)-(\d*)$/)
  if (!match) return null
  const [, rawStart, rawEnd] = match
  if (!rawStart && !rawEnd) return null

  if (!rawStart) {
    const suffix = Number(rawEnd)
    if (suffix === 0 || size === 0) return "unsatisfiable"
    return { start: Math.max(size - suffix, 0), end: size - 1 }
  }

  const start = Number(rawStart)
  if (rawEnd && Number(rawEnd) < start) return null
  if (start >= size) return "unsatisfiable"
  const end = rawEnd ? Math.min(Number(rawEnd), size - 1) : size - 1
  return { start, end }
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
