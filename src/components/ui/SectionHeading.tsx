import { RevealText } from "@/components/ui/RevealText"

interface SectionHeadingProps {
  /** Accessible section name; the visible heading is the shell path. */
  title: string
  path: string
  subtitle?: string
}

export function SectionHeading({ title, path, subtitle }: SectionHeadingProps) {
  return (
    <header className="space-y-4 border-t border-border pt-10">
      <h2 className="ds-heading" aria-label={title}>
        <RevealText as="span" className="ds-prompt" text={`${path} $`} />
      </h2>
      {subtitle && <RevealText as="p" className="ds-body max-w-3xl" text={subtitle} />}
    </header>
  )
}
