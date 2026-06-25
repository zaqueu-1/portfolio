import { ChevronDown } from "lucide-react"
import { DotAvatar } from "@/components/ui/DotAvatar"
import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
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
    <RevealSection
      as="section"
      id="top"
      className="hero-section relative grid min-h-[calc(100svh-var(--hero-offset))] min-h-[calc(100dvh-var(--hero-offset))] grid-rows-[1fr_auto]"
    >
      {/* Main row: content + avatar */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
        {/* Left: text content — bottom-aligned on its own */}
        <div className="flex min-h-0 flex-col justify-end gap-8 pb-6 pt-10 md:gap-10 md:pb-8 md:pt-14">
          {location && <p className="ds-label">{location}</p>}

          <div className="space-y-3 md:space-y-4">
            <RevealText as="h1" className="ds-display" text={profile.name} />
            <RevealText as="p" className="ds-subtitle max-w-3xl" text={t(profile.headline)} />
          </div>

          {about && <p className="ds-body max-w-2xl">{about}</p>}

          <TagList tags={profile.skills} label="Skills" />
        </div>

        {/* Right: dot-matrix avatar — centered to the content block */}
        <div className="hidden md:flex md:items-center md:self-center">
          <DotAvatar
            src="/img/avatar.png"
            alt={profile.name}
            className="w-[200px] xl:w-[240px]"
          />
        </div>
      </div>

      {/* Scroll hint */}
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
    </RevealSection>
  )
}
