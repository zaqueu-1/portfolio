import { Resend } from "resend"
import {
  ContactSchema,
  MIN_COMPOSE_MS,
  type ContactErrorCode,
  type ContactPayload,
  type ContactResponse,
} from "../src/lib/contact-schema.js"
import { createRateLimiter } from "./_lib/rate-limit.js"
import { escapeHtml, sanitizeMessageHtml } from "./_lib/sanitize.js"

const DEFAULT_TO = "oliveira.eduardo08@gmail.com"
const DEFAULT_FROM = "Portfolio <onboarding@resend.dev>"
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

const limiter = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS)

function reply(status: number, body: ContactResponse): Response {
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

export async function POST(request: Request): Promise<Response> {
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
  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM,
    to: process.env.CONTACT_TO_EMAIL || DEFAULT_TO,
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

  return reply(200, { ok: true })
}
