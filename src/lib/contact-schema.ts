import { z } from "zod"

export const CONTACT_LIMITS = {
  name: 80,
  email: 254,
  subject: 120,
  html: 20_000,
  text: 5_000,
} as const

/** Submissions faster than this after opening the composer are treated as bots. */
export const MIN_COMPOSE_MS = 2_500

export const ContactSchema = z.object({
  name: z.string().trim().min(1).max(CONTACT_LIMITS.name),
  email: z.email().max(CONTACT_LIMITS.email),
  subject: z.string().trim().max(CONTACT_LIMITS.subject).default(""),
  html: z.string().max(CONTACT_LIMITS.html),
  text: z.string().trim().min(1).max(CONTACT_LIMITS.text),
  /** Honeypot: hidden from humans, must stay empty. */
  website: z.string().max(200).default(""),
  startedAt: z.number().int().nonnegative(),
})

export type ContactInput = z.input<typeof ContactSchema>
export type ContactPayload = z.output<typeof ContactSchema>

export type ContactErrorCode = "invalid" | "rate_limited" | "forbidden" | "server"

export interface ContactResponse {
  ok: boolean
  error?: ContactErrorCode
}
