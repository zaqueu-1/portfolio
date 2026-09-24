import { ChevronDown } from "lucide-react"
import { DotAvatar } from "@/components/ui/DotAvatar"
import { MatrixRain } from "@/components/ui/MatrixRain"
import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { TagList } from "@/components/ui/TagList"
import { useLocale } from "@/context/LocaleContext"
import { useScrollHintOpacity } from "@/hooks/useScrollHintOpacity"
import { copy } from "@/lib/copy"
import type { Profile } from "@/types/profile"

export function HeroSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()
  const location = t(profile.location)
  const tagline = t(profile.tagline)
  const scrollOpacity = useScrollHintOpacity()
  const scrollHidden = scrollOpacity < 0.05

  return (
    <RevealSection
      as="section"
      id="top"
      className="hero-section relative isolate grid min-h-[calc(100svh-var(--hero-offset))] min-h-[calc(100dvh-var(--hero-offset))] grid-rows-[1fr_auto]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-(--hero-offset) bottom-0 right-[calc(50%-50vw)] left-[calc(50%-50vw)] -z-10 opacity-45 md:left-[35%]"
      >
        <MatrixRain />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
        <div className="flex min-h-0 flex-col justify-end gap-6 pb-6 pt-10 md:gap-10 md:pb-8 md:pt-14">
          {location && <p className="ds-label">{location}</p>}

          <div className="space-y-3 md:space-y-4">
            <RevealText
              as="p"
              className="ds-label text-foreground"
              text="~ $ whoami"
            />
            <ScrambleText as="h1" className="ds-display" text={profile.name} />
            <RevealText as="p" className="ds-subtitle max-w-3xl" text={t(profile.headline)} />
          </div>

          {tagline && <p className="ds-body max-w-2xl">{tagline}</p>}

          <TagList tags={profile.skills} label="Skills" />
        </div>

        <div className="hidden md:flex md:items-center md:self-center">
          <DotAvatar
            src="/img/avatar.png"
            alt={profile.name}
            className="w-[200px] xl:w-[240px]"
          />
        </div>
      </div>

      <div className="flex justify-center pb-[var(--layout-gutter)] pt-2 md:pb-10">
        <a
          href="#about"
          className="ds-label ds-role-label inline-flex items-center gap-2 transition-opacity duration-500 ease-out"
          style={{ opacity: scrollOpacity }}
          aria-hidden={scrollHidden}
          tabIndex={scrollHidden ? -1 : 0}
        >
          <span aria-hidden>$</span>
          {t(copy.hero.scrollHint)}
          <ChevronDown className="size-3.5" strokeWidth={1.5} />
        </a>
      </div>
    </RevealSection>
  )
}
