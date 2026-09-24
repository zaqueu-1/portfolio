import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/typewriter"

export type BootStatus = "loading" | "ready" | "error"

interface BootScreenProps {
  status: BootStatus
  localeTag: string
  onLeaveStart: () => void
  onDone: () => void
}

interface Segment {
  text: string
  className?: string
}

const CHAR_MS = 14
const LINE_GAP_MS = 120
const HOLD_MS = 580
/** Index of the line that waits for the real profile fetch before the log continues. */
const PROFILE_LINE = 4

export function shouldBoot(): boolean {
  return typeof window !== "undefined" && !prefersReducedMotion()
}

function statusSegment(status: BootStatus): Segment {
  if (status === "ready") return { text: "[ OK ]", className: "ds-role-label" }
  if (status === "error") return { text: "[FAIL]", className: "text-destructive" }
  return { text: "[ .. ]", className: "ds-muted" }
}

function buildLines(status: BootStatus, localeTag: string): Segment[][] {
  const ok: Segment = { text: "[ OK ]", className: "ds-role-label" }
  return [
    [{ text: "> zaqueu.tech" }],
    [ok, { text: " mounting /dev/crt0" }],
    [ok, { text: " loading font matrix-sans-screen" }],
    [ok, { text: ` locale ${localeTag}` }],
    [statusSegment(status), { text: " fetching profile.json" }],
    [{ text: "> hello, friend." }],
  ]
}

function lineLength(line: Segment[]): number {
  return line.reduce((sum, seg) => sum + seg.text.length, 0)
}

function renderTyped(line: Segment[], chars: number) {
  let remaining = chars
  return line.map((seg, i) => {
    const visible = seg.text.slice(0, Math.max(0, remaining))
    remaining -= seg.text.length
    return visible ? (
      <span key={i} className={seg.className}>
        {visible}
      </span>
    ) : null
  })
}

/** Boot log typed line by line on every load; waits for the profile fetch, then collapses like a CRT. */
export function BootScreen({ status, localeTag, onLeaveStart, onDone }: BootScreenProps) {
  const [cursor, setCursor] = useState({ line: 0, chars: 0 })
  const [leaving, setLeaving] = useState(false)
  const leaveStarted = useRef(false)

  const lines = buildLines(status, localeTag)
  const current = lines[cursor.line]
  const lineDone = cursor.chars >= lineLength(current)
  const isLastLine = cursor.line === lines.length - 1
  const allTyped = isLastLine && lineDone

  useEffect(() => {
    if (allTyped) return
    if (lineDone && cursor.line === PROFILE_LINE && status === "loading") return
    const id = window.setTimeout(
      () =>
        setCursor((c) => (lineDone ? { line: c.line + 1, chars: 0 } : { ...c, chars: c.chars + 1 })),
      lineDone ? LINE_GAP_MS : CHAR_MS,
    )
    return () => window.clearTimeout(id)
  }, [cursor, lineDone, allTyped, status])

  const leave = () => {
    if (leaveStarted.current) return
    leaveStarted.current = true
    setLeaving(true)
    onLeaveStart()
  }

  useEffect(() => {
    if (!allTyped || status === "loading") return
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
      onClick={() => status !== "loading" && leave()}
      onAnimationEnd={onDone}
    >
      <p className="sr-only" role="status">
        {status === "error" ? "Failed to load profile" : "Loading portfolio"}
      </p>
      <div className="layout-shell pt-[calc(var(--layout-gutter)*2.25)]" aria-hidden>
        <ol className="ds-label space-y-2 text-foreground/85">
          {lines.slice(0, cursor.line + 1).map((line, i) => (
            <li key={i}>
              {i < cursor.line ? renderTyped(line, Infinity) : renderTyped(line, cursor.chars)}
              {i === cursor.line && !leaving && <span className="ds-block-caret" />}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
