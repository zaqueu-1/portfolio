import type { IncomingMessage, ServerResponse } from "node:http"

const LOADERS: Record<string, () => Promise<unknown>> = {
  zod: () => import("zod"),
  "sanitize-html": () => import("sanitize-html"),
  resend: () => import("resend"),
}

export default async function handler(_req: IncomingMessage, res: ServerResponse): Promise<void> {
  const results: Record<string, string> = {}
  for (const [name, load] of Object.entries(LOADERS)) {
    try {
      const mod = await load()
      results[name] = `ok (${typeof mod})`
    } catch (err: unknown) {
      results[name] = err instanceof Error ? `${err.name}: ${err.message}`.slice(0, 400) : "unknown error"
    }
  }
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify({ node: process.version, hasKey: Boolean(process.env.RESEND_API_KEY), results }))
}
