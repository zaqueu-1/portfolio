import { type ElementType, useCallback, useEffect, useRef } from "react"
import { useRevealRegister } from "@/components/ui/RevealSection"
import { scrambleFrame } from "@/lib/scramble"
import { prefersReducedMotion } from "@/lib/typewriter"
import { cn } from "@/lib/utils"

interface ScrambleTextProps {
  text: string
  as?: ElementType
  className?: string
}

const DECODE_MS = 950
const HOVER_DECODE_MS = 520
const GLYPH_TICK_MS = 45
const GLITCH_MS = 420

export function ScrambleText({ text, as = "span", className }: ScrambleTextProps) {
  const hostRef = useRef<HTMLElement | null>(null)
  const innerRef = useRef<HTMLSpanElement | null>(null)
  const runRef = useRef<((ms: number, onDone?: () => void) => void) | null>(null)
  const register = useRevealRegister()

  const setHost = useCallback((node: HTMLElement | null) => {
    hostRef.current = node
  }, [])

  useEffect(() => {
    const inner = innerRef.current
    const host = hostRef.current
    if (!inner || !host) return

    if (prefersReducedMotion()) {
      inner.textContent = text
      return
    }

    let raf = 0
    let running = false

    const run = (ms: number, onDone?: () => void) => {
      cancelAnimationFrame(raf)
      running = true
      const startTs = performance.now()
      let lastTick = 0
      const frame = (now: number) => {
        const progress = Math.min(1, (now - startTs) / ms)
        if (now - lastTick >= GLYPH_TICK_MS || progress === 1) {
          lastTick = now
          inner.textContent = scrambleFrame(text, progress * text.length)
        }
        if (progress < 1) {
          raf = requestAnimationFrame(frame)
          return
        }
        running = false
        onDone?.()
      }
      raf = requestAnimationFrame(frame)
    }

    runRef.current = (ms, onDone) => {
      if (running) return
      run(ms, onDone)
    }

    if (!register) {
      run(DECODE_MS)
      return () => cancelAnimationFrame(raf)
    }

    inner.textContent = scrambleFrame(text, 0)
    const unregister = register({
      el: host,
      start: (onComplete) => run(DECODE_MS, onComplete),
      reveal: () => {
        cancelAnimationFrame(raf)
        running = false
        inner.textContent = text
      },
      hideCaret: () => {},
    })

    return () => {
      cancelAnimationFrame(raf)
      unregister()
    }
  }, [text, register])

  const onPointerEnter = () => {
    const host = hostRef.current
    if (!host || !runRef.current) return
    host.classList.add("is-glitching")
    window.setTimeout(() => host.classList.remove("is-glitching"), GLITCH_MS)
    runRef.current(HOVER_DECODE_MS)
  }

  const Comp = as
  return (
    <Comp
      ref={setHost}
      className={cn("ds-glitch", className)}
      data-text={text}
      aria-label={text}
      onPointerEnter={onPointerEnter}
    >
      <span ref={innerRef} aria-hidden>
        {text}
      </span>
    </Comp>
  )
}
