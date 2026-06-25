import { RevealSection } from "@/components/ui/RevealSection"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { aboutBody } from "@/lib/hero-intro"
import type { Profile } from "@/types/profile"

export function AboutSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()
  const about = aboutBody(t(profile.about))

  if (!about) return null

  return (
    <RevealSection as="section" id="about" className="scroll-mt-24 space-y-8 py-8">
      <SectionHeading title={t(copy.about.title)} subtitle={t(copy.about.subtitle)} />
      <p className="ds-body max-w-3xl whitespace-pre-line">{about}</p>
    </RevealSection>
  )
}
