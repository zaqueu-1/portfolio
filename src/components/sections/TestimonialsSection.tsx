import { useLayoutEffect, useRef, useState } from "react"
import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { SECTION_PATHS } from "@/lib/sections"
import { stripRelationshipDate } from "@/lib/format"
import type { Profile } from "@/types/profile"

type Testimonial = NonNullable<Profile["testimonials"]>[number]

function TestimonialItem({ item }: { item: Testimonial }) {
  const { t } = useLocale()
  const quoteRef = useRef<HTMLQuoteElement | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)
  const text = t(item.text)
  const authorTitle = t(item.authorTitle)
  const relationship = item.relationship ? stripRelationshipDate(t(item.relationship)) : ""

  useLayoutEffect(() => {
    const el = quoteRef.current
    if (!el || isExpanded) return
    const measure = () => setIsClamped(el.scrollHeight > el.clientHeight + 1)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [text, isExpanded])

  return (
    <RevealSection as="li" className="flex flex-col gap-5 border-t border-border pt-8">
      <div className="space-y-3">
        <blockquote
          ref={quoteRef}
          id={`quote-${item.id}`}
          className={`ds-body whitespace-pre-line ${isExpanded ? "" : "line-clamp-5"}`}
        >
          {text}
        </blockquote>
        {(isClamped || isExpanded) && (
          <button
            type="button"
            className="ds-link ds-prompt cursor-pointer"
            aria-expanded={isExpanded}
            aria-controls={`quote-${item.id}`}
            aria-label={t(isExpanded ? copy.testimonials.collapse : copy.testimonials.expand)}
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? "[-] head -n 5" : "[+] cat --full"}
          </button>
        )}
      </div>
      <footer className="mt-auto space-y-1">
        <RevealText as="p" className="ds-subheading text-base sm:text-lg" text={item.author} />
        {authorTitle && <RevealText as="p" className="ds-role" text={authorTitle} />}
        {relationship && <RevealText as="p" className="ds-label" text={relationship} />}
      </footer>
    </RevealSection>
  )
}

export function TestimonialsSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()
  const items = profile.testimonials ?? []

  if (items.length === 0) return null

  return (
    <section id="testimonials" className="scroll-mt-24 space-y-10 py-16">
      <RevealSection>
        <SectionHeading
          path={SECTION_PATHS.testimonials}
          title={t(copy.testimonials.title)}
          subtitle={t(copy.testimonials.subtitle)}
        />
      </RevealSection>

      <ul className="grid gap-x-12 gap-y-12 md:grid-cols-2">
        {items.map((item) => (
          <TestimonialItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  )
}
