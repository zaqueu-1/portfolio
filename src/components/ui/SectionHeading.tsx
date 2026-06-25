import { RevealText } from "@/components/ui/RevealText"

interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <header className="space-y-4 border-t border-border pt-10">
      <RevealText as="h2" className="ds-heading" text={title} />
      {subtitle && <RevealText as="p" className="ds-body max-w-3xl" text={subtitle} />}
    </header>
  )
}
