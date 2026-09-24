import { useEffect, useRef } from "react"
import { SCRAMBLE_GLYPHS } from "@/lib/scramble"
import { prefersReducedMotion } from "@/lib/typewriter"
import { cn } from "@/lib/utils"

const CELL_PX = 16
const FRAME_MS = 55
const TRAIL_FADE = 0.14
const MAX_DPR = 2
const STATIC_WARMUP_FRAMES = 90

interface Drop {
  y: number
  speed: number
}

function randomGlyph(): string {
  return SCRAMBLE_GLYPHS[Math.floor(Math.random() * SCRAMBLE_GLYPHS.length)]
}

function readLilac(): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--lilac").trim()
  return raw ? `hsl(${raw})` : "hsl(278 58% 72%)"
}

export function MatrixRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const lilac = readLilac()
    let drops: Drop[] = []
    let width = 0
    let height = 0
    let raf = 0
    let last = 0
    let visible = true

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${CELL_PX - 2}px "Matrix Sans Screen", monospace`
      ctx.textBaseline = "top"
      const columns = Math.ceil(width / CELL_PX)
      drops = Array.from({ length: columns }, () => ({
        y: Math.random() * -(height / CELL_PX),
        speed: 0.35 + Math.random() * 0.65,
      }))
    }

    const step = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE})`
      ctx.fillRect(0, 0, width, height)
      drops.forEach((drop, i) => {
        const x = i * CELL_PX
        const prevRow = Math.floor(drop.y)
        drop.y += drop.speed
        const row = Math.floor(drop.y)
        if (row === prevRow) return
        if (prevRow >= 0) {
          ctx.fillStyle = lilac
          ctx.fillText(randomGlyph(), x, prevRow * CELL_PX)
        }
        ctx.fillStyle = "rgba(255, 255, 255, 0.92)"
        ctx.fillText(randomGlyph(), x, row * CELL_PX)
        if (row * CELL_PX > height && Math.random() > 0.96) {
          drop.y = -Math.random() * 12
          drop.speed = 0.35 + Math.random() * 0.65
        }
      })
    }

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop)
      if (now - last < FRAME_MS) return
      last = now
      step()
    }

    const play = () => {
      cancelAnimationFrame(raf)
      if (visible && !document.hidden) raf = requestAnimationFrame(loop)
    }

    resize()

    if (prefersReducedMotion()) {
      for (let i = 0; i < STATIC_WARMUP_FRAMES; i += 1) step()
      return
    }

    const ro = new ResizeObserver(() => {
      resize()
    })
    ro.observe(canvas)

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      play()
    })
    io.observe(canvas)

    document.addEventListener("visibilitychange", play)
    play()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener("visibilitychange", play)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={cn("matrix-rain", className)} />
}
