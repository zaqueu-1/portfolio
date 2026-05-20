interface SectionHeadingProps {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <header className="space-y-4 border-t border-border pt-10">
      <h2 className="ds-heading">{title}</h2>
      {subtitle && <p className="ds-body max-w-3xl">{subtitle}</p>}
    </header>
  )
}
