import { useEffect } from "react"

const SECTION_IDS = ["top", "about", "experiences", "testimonials", "contact"]

export function useHashNav() {
  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (hash && SECTION_IDS.includes(hash)) {
      const el = document.getElementById(hash)
      if (el) {
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" })
        })
      }
    }
  }, [])

  useEffect(() => {
    const sectionEls = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (sectionEls.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const next = id === "top" ? "" : `#${id}`
            const current = window.location.hash
            if (next !== current) {
              history.replaceState(null, "", next || window.location.pathname)
            }
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )

    for (const el of sectionEls) observer.observe(el)
    return () => observer.disconnect()
  }, [])
}
