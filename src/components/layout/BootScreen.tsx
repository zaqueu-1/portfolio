import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/typewriter"

export type BootStatus = "loading" | "ready" | "error"

interface BootScreenProps {
  status: BootStatus
  localeTag: string
  onLeaveStart: () => void
  onDone: () => void
}

const LINE_MS = 110
const HOLD_MS = 320
const SESSION_KEY = "zaqueu:booted"

export function shouldBoot(): boolean {
  if (typeof window === "undefined" || prefersReducedMotion()) return false
  try {
    return sessionStorage.getItem(SESSION_KEY) !== "1"
  } catch {
    return false
  }
}

function markBooted() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1")
  } catch {
    // Storage blocked (private mode): boot simply replays next visit.
  }
}

function statusTag(status: BootStatus) {
  if (status === "ready") return <span className="ds-role-label">[ OK ]</span>
  if (status === "error") return <span className="text-destructive">[FAIL]</span>
  return <span className="ds-muted">[ .. ]</span>
}

/** First-visit boot log. Waits for the real profile fetch, then collapses like a CRT. */
export function BootScreen({ status, localeTag, onLeaveStart, onDone }: BootScreenProps) {
  const [shown, setShown] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const leaveStarted = useRef(false)

  const lines = [
    <>&gt; zaqueu.tech</>,
    <><span className="ds-role-label">[ OK ]</span> mounting /dev/crt0</>,
    <><span className="ds-role-label">[ OK ]</span> loading font matrix-sans-screen</>,
    <><span className="ds-role-label">[ OK ]</span> locale {localeTag}</>,
    <>{statusTag(status)} fetching profile.json</>,
    <>&gt; hello, friend.</>,
  ]
  const allShown = shown >= lines.length
  const lastBlocking = lines.length - 1

  useEffect(() => {
    if (allShown) return
    if (shown >= lastBlocking && status === "loading") return
    const id = window.setTimeout(() => setShown((n) => n + 1), LINE_MS)
    return () => window.clearTimeout(id)
  }, [shown, allShown, lastBlocking, status])

  const leave = () => {
    if (leaveStarted.current) return
    leaveStarted.current = true
    markBooted()
    setLeaving(true)
    onLeaveStart()
  }

  useEffect(() => {
    if (!allShown || status === "loading") return
    const id = window.setTimeout(leave, HOLD_MS)
    return () => window.clearTimeout(id)
  })

  useEffect(() => {
    const skip = () => {
      if (status !== "loading") leave()
    }
    window.addEventListener("keydown", skip)
    return () => window.removeEventListener("keydown", skip)
  })

  return (
    <div
      className={`boot-screen ${leaving ? "is-leaving" : ""}`}
      role="status"
      aria-live="polite"
      onClick={() => status !== "loading" && leave()}
      onAnimationEnd={onDone}
    >
      <div className="layout-shell pt-[calc(var(--layout-gutter)*2.25)]">
        <ol className="ds-label space-y-2 text-foreground/85">
          {lines.slice(0, shown).map((line, i) => (
            <li key={i}>{line}</li>
          ))}
          {!allShown && (
            <li aria-hidden>
              <span className="ds-block-caret" />
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}
