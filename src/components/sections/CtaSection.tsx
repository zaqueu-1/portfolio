import { useLocale } from "@/context/LocaleContext"
import { CONTACT_EMAIL } from "@/lib/constants"
import { copy } from "@/lib/copy"

export function CtaSection() {
  const { t } = useLocale()

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-16">
      <p className="ds-body">
        {t(copy.cta.prompt)}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-foreground underline underline-offset-4">
          {t(copy.cta.link)}
        </a>
      </p>
    </section>
  )
}
