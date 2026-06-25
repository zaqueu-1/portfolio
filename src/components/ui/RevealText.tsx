import { type ElementType, useCallback, useEffect, useRef } from "react"
import { useRevealRegister } from "@/components/ui/RevealSection"
import {
  CARET_LINGER_MS,
  getDownwardVelocity,
  getScrollDirection,
  prefersReducedMotion,
} from "@/lib/typewriter"

interface RevealTextProps {
  text: string
  as?: ElementType
  className?: string
  cursor?: boolean
}

const BASE_CPF = 0.5
const VELOCITY_K = 1.5
const MAX_CPF = 3

export function RevealText({ text, as = "span", className, cursor = true }: RevealTextProps) {
  const nodeRef = useRef<HTMLElement | null>(null)
  const register = useRevealRegister()

  const setRef = useCallback((node: HTMLElement | null) => {
    nodeRef.current = node
  }, [])

  useEffect(() => {
    const el = nodeRef.current
    if (!el) return

    if (prefersReducedMotion() || text.length === 0) {
      el.textContent = text
      return
    }

    const len = text.length
    let revealed = 0
    let raf = 0
    let typing = false
    let onCompleteCb: (() => void) | null = null

    el.textContent = ""
    const textNode = document.createTextNode("")
    el.appendChild(textNode)
    let caret: HTMLSpanElement | null = null

    const addCaret = () => {
      if (!cursor || caret) return
      caret = document.createElement("span")
      caret.className = "ds-caret"
      caret.setAttribute("aria-hidden", "true")
      caret.textContent = "|"
      el.appendChild(caret)
    }

    const removeCaret = () => {
      caret?.remove()
      caret = null
    }

    const paint = () => {
      textNode.nodeValue = text.slice(0, Math.floor(revealed))
    }

    const frame = () => {
      const step = Math.min(MAX_CPF, BASE_CPF + getDownwardVelocity() * VELOCITY_K)
      revealed = Math.min(len, revealed + step)
      paint()
      if (revealed < len) {
        raf = requestAnimationFrame(frame)
      } else {
        typing = false
        const cb = onCompleteCb
        onCompleteCb = null
        cb?.()
      }
    }

    const start = (onComplete?: () => void) => {
      if (typing || revealed >= len) {
        onComplete?.()
        return
      }
      onCompleteCb = onComplete ?? null
      typing = true
      addCaret()
      raf = requestAnimationFrame(frame)
    }

    const reveal = () => {
      cancelAnimationFrame(raf)
      revealed = len
      paint()
      removeCaret()
      typing = false
    }

    if (register) {
      const unregister = register({ el, start, reveal, hideCaret: removeCaret })
      return () => {
        cancelAnimationFrame(raf)
        unregister()
      }
    }

    let lingerTimer = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          if (revealed === 0 && !typing && getScrollDirection() === "up") {
            reveal()
            io.disconnect()
            return
          }
          start(() => {
            lingerTimer = window.setTimeout(removeCaret, CARET_LINGER_MS)
          })
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(lingerTimer)
      io.disconnect()
    }
  }, [text, cursor, register])

  const Comp = as
  return <Comp ref={setRef} className={className} aria-label={text} />
}
