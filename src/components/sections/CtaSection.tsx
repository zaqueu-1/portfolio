import { useLocale } from "@/context/LocaleContext"

const EMAIL = "oliveira.eduardo08@gmail.com"

export function CtaSection() {
  const { lang } = useLocale()

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-16">
      <p className="ds-body">
        {lang ? "Quer conversar? " : "Want to talk? "}
        <a href={`mailto:${EMAIL}`} className="text-foreground underline underline-offset-4">
          {lang ? "Envie um e-mail" : "Send me an email"}
        </a>
      </p>
    </section>
  )
}
