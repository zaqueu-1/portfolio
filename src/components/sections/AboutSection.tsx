import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import type { Profile } from "@/types/profile"

function cleanAbout(text: string): string {
  return text
    .replace(/\n… mais[\s\S]*$/i, "")
    .replace(/\n\nPrincipais competências[\s\S]*$/i, "")
    .trim()
}

export function AboutSection({ profile }: { profile: Profile }) {
  const { lang, t } = useLocale()
  const about = cleanAbout(t(profile.about))

  return (
    <section id="about" className="scroll-mt-24 space-y-8 py-8">
      <SectionHeading
        title={lang ? "Sobre mim" : "About me"}
        subtitle={
          lang
            ? "Um pouco mais sobre minha trajetória, stack e o que me move como engenheiro."
            : "A bit more about my path, stack, and what drives me as an engineer."
        }
      />
      <p className="ds-body max-w-3xl whitespace-pre-line">{about}</p>
    </section>
  )
}
