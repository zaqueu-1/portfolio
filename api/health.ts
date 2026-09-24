import type { IncomingMessage, ServerResponse } from "node:http"

export default function handler(_req: IncomingMessage, res: ServerResponse): void {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify({ ok: true, runtime: process.version }))
}
