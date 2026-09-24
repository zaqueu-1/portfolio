import { openWhoami } from "@/components/layout/WhoamiTerminal"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import type { SocialLink } from "@/types/profile"

interface FooterProps {
  socialLinks: SocialLink[]
}

export function Footer({ socialLinks }: FooterProps) {
  const { t } = useLocale()

  return (
    <footer className="border-t border-border py-10">
      <nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-link"
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </nav>
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-4">
        <p className="ds-label">© {new Date().getFullYear()} Eduardo Zaqueu</p>
        <button type="button" className="ds-label ds-link cursor-pointer" onClick={openWhoami}>
          {t(copy.footer.hint)}
        </button>
      </div>
    </footer>
  )
}
