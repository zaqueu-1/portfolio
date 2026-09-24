import { existsSync } from "node:fs"
import type { IncomingMessage, ServerResponse } from "node:http"
import path from "node:path"
import type { Plugin } from "vite"

type ApiHandler = (request: Request) => Response | Promise<Response>
type NodeHandler = (req: IncomingMessage, res: ServerResponse) => unknown

interface ApiModule {
  default?: NodeHandler | { fetch?: ApiHandler }
  [method: string]: unknown
}

const API_ROUTE = /^\/api\/([\w-]+)\/?$/

async function readBody(req: IncomingMessage): Promise<Uint8Array> {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  return new Uint8Array(Buffer.concat(chunks))
}

function toHeaders(req: IncomingMessage): Headers {
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(key, v))
    else if (value !== undefined) headers.set(key, value)
  }
  return headers
}

function resolveHandler(mod: ApiModule, method: string): ApiHandler | undefined {
  const def = mod.default
  if (def && typeof def === "object" && typeof def.fetch === "function") return def.fetch
  const named = mod[method]
  return typeof named === "function" ? (named as ApiHandler) : undefined
}

/**
 * Serves Vercel-style web handlers from `api/*.ts` during `vite dev`, so the
 * contact form works locally without `vercel dev`. Production still uses Vercel.
 */
export function vercelApiDev(): Plugin {
  return {
    name: "vercel-api-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`)
        const match = API_ROUTE.exec(url.pathname)
        if (!match) return next()

        const file = path.resolve(server.config.root, "api", `${match[1]}.ts`)
        if (!existsSync(file)) return next()

        try {
          const method = req.method ?? "GET"
          const mod = (await server.ssrLoadModule(file)) as ApiModule
          if (typeof mod.default === "function") {
            await mod.default(req, res)
            return
          }
          const handler = resolveHandler(mod, method)
          if (!handler) {
            res.statusCode = 405
            res.end()
            return
          }

          const body = method === "GET" || method === "HEAD" ? undefined : await readBody(req)
          const response = await handler(new Request(url, { method, headers: toHeaders(req), body }))

          res.statusCode = response.status
          response.headers.forEach((value, key) => res.setHeader(key, value))
          res.end(Buffer.from(await response.arrayBuffer()))
        } catch (err: unknown) {
          if (err instanceof Error) server.ssrFixStacktrace(err)
          next(err)
        }
      })
    },
  }
}
