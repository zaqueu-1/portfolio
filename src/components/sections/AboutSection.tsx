import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import { aboutBody } from "@/lib/hero-intro"
import type { Profile } from "@/types/profile"

export function AboutSection({ profile }: { profile: Profile }) {
  const { lang, t } = useLocale()
  const about = aboutBody(t(profile.about))

  if (!about) return null

  return (
    <section id="about" className="scroll-mt-24 space-y-8 py-8">
      <SectionHeading
        title={lang ? "Sobre mim" : "About me"}
        subtitle={
          lang
            ? "Um pouco mais sobre minha trajetória, stack e o que me move como profissional:"
            : "A bit more about my path, stack, and what drives me as a professional:"
        }
      />
      <p className="ds-body max-w-3xl whitespace-pre-line">{about}</p>
    </section>
  )
}
