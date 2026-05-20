import { useEffect, useState } from "react"

const FADE_DISTANCE_PX = 140

/** 1 no topo da página → 0 após ~140px de scroll. */
export function useScrollHintOpacity() {
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    const update = () => {
      const y = window.scrollY
      setOpacity(Math.max(0, Math.min(1, 1 - y / FADE_DISTANCE_PX)))
    }

    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  return opacity
}
