import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { stripRelationshipDate } from "@/lib/format"
import type { Profile } from "@/types/profile"

export function TestimonialsSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()
  const items = profile.testimonials ?? []

  if (items.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 space-y-10 py-16">
      <RevealSection>
        <SectionHeading
          title={t(copy.testimonials.title)}
          subtitle={t(copy.testimonials.subtitle)}
        />
      </RevealSection>

      <ul className="space-y-10">
        {items.map((item) => {
          const text = t(item.text)
          const authorTitle = t(item.authorTitle)
          const relationship = item.relationship
            ? stripRelationshipDate(t(item.relationship))
            : ""

          return (
            <RevealSection
              as="li"
              key={item.id}
              className="ds-divider space-y-4 pt-10 first:border-t-0 first:pt-0"
            >
              <blockquote className="ds-body max-w-3xl whitespace-pre-line">{text}</blockquote>
              <footer className="space-y-1">
                <RevealText as="p" className="ds-subheading text-base sm:text-lg" text={item.author} />
                {authorTitle && <RevealText as="p" className="ds-role" text={authorTitle} />}
                {relationship && <RevealText as="p" className="ds-label" text={relationship} />}
              </footer>
            </RevealSection>
          )
        })}
      </ul>
    </section>
  )
}
