import type { IncomingMessage, ServerResponse } from "node:http"
import { Resend } from "resend"
import sanitizeHtml from "sanitize-html"
import { z } from "zod"

// Self-contained on purpose: no local imports, so the Vercel function bundle
// never depends on resolving sibling .ts files at runtime.
// Limits mirror src/lib/contact-schema.ts; a test fails if they drift.

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  html: 20_000,
  text: 5_000,
} as const

export const MIN_COMPOSE_MS = 2_500

export const ContactSchema = z.object({
  name: z.string().trim().min(1).max(CONTACT_LIMITS.name),
  email: z.email().max(CONTACT_LIMITS.email),
  subject: z.string().trim().max(CONTACT_LIMITS.subject).default(""),
  html: z.string().max(CONTACT_LIMITS.html),
  text: z.string().trim().min(1).max(CONTACT_LIMITS.text),
  website: z.string().max(200).default(""),
  startedAt: z.number().int().nonnegative(),
})

type ContactPayload = z.output<typeof ContactSchema>
type ContactErrorCode = "invalid" | "rate_limited" | "forbidden" | "server"

const CONTACT_TO = "bss.eduardo@yahoo.com.br"
const CONTACT_FROM = "Portfolio <onboarding@resend.dev>"
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

const SAFE_FONT = /^[\w\s"',-]+$/
const SAFE_SIZE = /^(1[0-9]|2[0-9]|3[0-2])px$/
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))$/i
const SAFE_ALIGN = /^(left|center|right|justify)$/

/** Allowlist matching exactly what the composer toolbar can produce. */
export function sanitizeMessageHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "code", "pre",
      "blockquote", "ul", "ol", "li", "a", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
      p: ["style"],
    },
    allowedStyles: {
      span: { "font-family": [SAFE_FONT], "font-size": [SAFE_SIZE], color: [SAFE_COLOR] },
      p: { "text-align": [SAFE_ALIGN] },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  })
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Fixed-window, in-memory limiter. Per serverless instance only, so it is a
 * speed bump against bursts, not a global guarantee.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>()

  return {
    hit(key: string, now = Date.now()): boolean {
      const recent = (hits.get(key) ?? []).filter((ts) => now - ts < windowMs)
      if (recent.length >= limit) {
        hits.set(key, recent)
        return false
      }
      hits.set(key, [...recent, now])
      return true
    },
  }
}

const limiter = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS)

function reply(status: number, body: { ok: boolean; error?: ContactErrorCode }): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

function fail(status: number, error: ContactErrorCode): Response {
  return reply(status, { ok: false, error })
}

function clientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

/** Blocks cross-site posts: when a browser sends Origin, it must match our host. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin")
  if (!origin) return true
  try {
    return new URL(origin).host === request.headers.get("host")
  } catch {
    return false
  }
}

function singleLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, " ").trim()
}

function renderEmail({ name, email, subject, html }: ContactPayload): string {
  const meta = `${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;`
  const subjectLine = subject ? `<br>subject: ${escapeHtml(subject)}` : ""
  return `<div style="font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#888;margin-bottom:16px">from: ${meta}${subjectLine}</div><div style="font-size:15px;line-height:1.6">${sanitizeMessageHtml(html)}</div>`
}

export async function handleContact(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response(null, { status: 405, headers: { Allow: "POST" } })
  }
  if (!isSameOrigin(request)) return fail(403, "forbidden")
  if (!limiter.hit(clientIp(request))) return fail(429, "rate_limited")

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured")
    return fail(500, "server")
  }

  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return fail(400, "invalid")
  }

  const parsed = ContactSchema.safeParse(raw)
  if (!parsed.success) return fail(400, "invalid")

  const payload = parsed.data
  // Bots: honeypot filled or submitted implausibly fast. Answer ok so they don't retry.
  if (payload.website || Date.now() - payload.startedAt < MIN_COMPOSE_MS) {
    return reply(200, { ok: true })
  }

  const subject = singleLine(payload.subject || `Portfolio: ${payload.name}`)
  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: payload.email,
      subject: `[zaqueu.tech] ${subject}`,
      html: renderEmail(payload),
      text: `from: ${singleLine(payload.name)} <${payload.email}>\n\n${payload.text}`,
    })
    if (error) {
      // Log provider error only; never the visitor's message or address.
      console.error("[contact] resend send failed:", error.name, error.message)
      return fail(502, "server")
    }
  } catch (err: unknown) {
    console.error("[contact] resend request threw:", err instanceof Error ? err.message : "unknown")
    return fail(502, "server")
  }

  return reply(200, { ok: true })
}

type NodeRequest = IncomingMessage & { body?: unknown }

async function readRawBody(req: NodeRequest): Promise<string | undefined> {
  // Vercel's Node helpers may have already parsed the body; reading it again would hang.
  let parsed: unknown
  try {
    parsed = req.body
  } catch {
    return "{invalid"
  }
  if (typeof parsed === "string") return parsed
  if (Buffer.isBuffer(parsed)) return parsed.toString("utf8")
  if (parsed !== undefined) return JSON.stringify(parsed)

  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  return chunks.length ? Buffer.concat(chunks).toString("utf8") : undefined
}

function toWebRequest(req: NodeRequest, body: string | undefined): Request {
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) value.forEach((v) => headers.append(key, v))
    else if (value !== undefined) headers.set(key, value)
  }
  const method = req.method ?? "GET"
  const url = new URL(req.url ?? "/api/contact", `https://${req.headers.host ?? "localhost"}`)
  return new Request(url, { method, headers, body: method === "GET" || method === "HEAD" ? undefined : body })
}

/** Classic Node signature: the one every Vercel project type invokes. */
export default async function handler(req: NodeRequest, res: ServerResponse): Promise<void> {
  try {
    const body = req.method === "POST" ? await readRawBody(req) : undefined
    const response = await handleContact(toWebRequest(req, body))
    res.statusCode = response.status
    response.headers.forEach((value, key) => res.setHeader(key, value))
    res.end(Buffer.from(await response.arrayBuffer()))
  } catch (err: unknown) {
    console.error("[contact] handler crashed:", err instanceof Error ? err.message : "unknown")
    res.statusCode = 500
    res.setHeader("Content-Type", "application/json")
    res.end(JSON.stringify({ ok: false, error: "server" }))
  }
}
