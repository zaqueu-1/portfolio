import { type DependencyList, useEffect, useState } from "react"
import { SECTION_PATHS, type SectionId } from "@/lib/sections"

const SECTION_IDS = Object.keys(SECTION_PATHS) as SectionId[]

function isSectionId(id: string): id is SectionId {
  return id in SECTION_PATHS
}

export function useActiveSection(deps: DependencyList): SectionId {
  const [active, setActive] = useState<SectionId>("top")

  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (els.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && isSectionId(entry.target.id)) setActive(entry.target.id)
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    )
    for (const el of els) io.observe(el)
    return () => io.disconnect()
    // Sections mount after the profile loads; callers pass what signals that.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return active
}
