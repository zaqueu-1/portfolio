import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import type { Profile } from "@/types/profile"

export function TestimonialsSection({ profile }: { profile: Profile }) {
  const { lang, t } = useLocale()
  const items = profile.testimonials ?? []

  if (items.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 space-y-10 py-16">
      <SectionHeading
        title={lang ? "Recomendações" : "Testimonials"}
        subtitle={
          lang
            ? "O que colegas e parceiros dizem sobre trabalhar comigo."
            : "What colleagues and partners say about working with me."
        }
      />

      <ul className="space-y-10">
        {items.map((item) => {
          const text = t(item.text)
          const authorTitle = t(item.authorTitle)
          const relationship = item.relationship ? t(item.relationship) : ""

          return (
            <li key={item.id} className="ds-divider space-y-4 pt-10 first:border-t-0 first:pt-0">
              <blockquote className="ds-body max-w-3xl whitespace-pre-line">{text}</blockquote>
              <footer className="space-y-1">
                <p className="ds-subheading text-base sm:text-lg">{item.author}</p>
                {authorTitle && <p className="ds-role">{authorTitle}</p>}
                {relationship && <p className="ds-label">{relationship}</p>}
              </footer>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
