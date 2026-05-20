import { ChevronDown } from "lucide-react"
import { TagList } from "@/components/ui/TagList"
import { useLocale } from "@/context/LocaleContext"
import { useScrollHintOpacity } from "@/hooks/useScrollHintOpacity"
import { heroIntro } from "@/lib/hero-intro"
import type { Profile } from "@/types/profile"

export function HeroSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()
  const location = t(profile.location)
  const about = heroIntro(t(profile.about))
  const scrollOpacity = useScrollHintOpacity()
  const scrollHidden = scrollOpacity < 0.05

  return (
    <section
      id="top"
      className="hero-section relative grid min-h-[calc(100svh-var(--hero-offset))] min-h-[calc(100dvh-var(--hero-offset))] grid-rows-[1fr_auto]"
    >
      <div className="flex min-h-0 flex-col justify-end gap-8 pb-6 pt-10 md:gap-10 md:pb-8 md:pt-14">
        {location && <p className="ds-label">{location}</p>}

        <div className="space-y-3 md:space-y-4">
          <h1 className="ds-display">{profile.name}</h1>
          <p className="ds-subtitle max-w-3xl">{t(profile.headline)}</p>
        </div>

        {about && <p className="ds-body max-w-2xl">{about}</p>}

        <TagList tags={profile.skills} label="Skills" />
      </div>

      <div className="flex justify-center pb-[var(--layout-gutter)] pt-2 md:pb-10">
        <a
          href="#about"
          className="ds-label ds-role-label inline-flex items-center gap-2 transition-opacity duration-500 ease-out"
          style={{ opacity: scrollOpacity }}
          aria-hidden={scrollHidden}
          tabIndex={scrollHidden ? -1 : 0}
        >
          Scroll
          <ChevronDown className="size-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </section>
  )
}
