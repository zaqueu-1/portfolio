let velocity = 0
let lastY = typeof window !== "undefined" ? window.scrollY : 0
let lastTs = typeof performance !== "undefined" ? performance.now() : 0

function handleScroll() {
  const now = performance.now()
  const y = window.scrollY
  const dt = now - lastTs
  if (dt > 0) {
    velocity = (y - lastY) / dt
  }
  lastY = y
  lastTs = now
}

if (typeof window !== "undefined") {
  window.addEventListener("scroll", handleScroll, { passive: true })
}

const IDLE_MS = 120

/** How long the caret keeps blinking after a block finishes typing. */
export const CARET_LINGER_MS = 2200

export function getDownwardVelocity(): number {
  if (typeof performance === "undefined") return 0
  if (performance.now() - lastTs > IDLE_MS) return 0
  return Math.max(0, velocity)
}

export function getScrollDirection(): "up" | "down" {
  if (typeof performance === "undefined") return "down"
  if (performance.now() - lastTs > IDLE_MS) return "down"
  return velocity < 0 ? "up" : "down"
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}
