import type { SocialLink } from "@/types/profile"

interface FooterProps {
  socialLinks: SocialLink[]
}

export function Footer({ socialLinks }: FooterProps) {
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
      <p className="ds-label mt-6">© {new Date().getFullYear()} Eduardo Zaqueu</p>
    </footer>
  )
}
