import { useState } from "react"
import type { ContactErrorCode, ContactInput, ContactResponse } from "@/lib/contact-schema"

export type SendStatus =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "failed"; reason: ContactErrorCode | "network" }

function isContactResponse(value: unknown): value is ContactResponse {
  return typeof value === "object" && value !== null && "ok" in value
}

export function useSendMail() {
  const [status, setStatus] = useState<SendStatus>({ state: "idle" })

  const send = async (input: ContactInput): Promise<boolean> => {
    setStatus({ state: "sending" })
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      })
      const body: unknown = await res.json().catch(() => null)
      if (res.ok && isContactResponse(body) && body.ok) {
        setStatus({ state: "sent" })
        return true
      }
      const reason = isContactResponse(body) && body.error ? body.error : "server"
      setStatus({ state: "failed", reason })
      return false
    } catch {
      setStatus({ state: "failed", reason: "network" })
      return false
    }
  }

  return { status, send }
}
