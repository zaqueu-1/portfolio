import type { ReactNode } from "react"
import { MobileNav } from "@/components/layout/Sidebar"
import { LangToggle } from "@/components/layout/LangToggle"
import { CONTACT_EMAIL } from "@/lib/constants"
import type { SocialLink } from "@/types/profile"

interface AppShellProps {
  children: ReactNode
  onNavigate: (section: string) => void
  socialLinks?: SocialLink[]
}

const HEADER_LINKS: { type: SocialLink["type"]; label: string }[] = [
  { type: "github", label: "GITHUB" },
  { type: "linkedin", label: "LINKEDIN" },
]

export function AppShell({ children, onNavigate, socialLinks = [] }: AppShellProps) {
  const byType = Object.fromEntries(socialLinks.map((l) => [l.type, l.url])) as Partial<
    Record<SocialLink["type"], string>
  >

  const visibleHeaderLinks = HEADER_LINKS.filter((l) => byType[l.type])

  return (
    <div className="relative min-h-screen">
      <header className="site-header fixed inset-x-0 top-0 z-40">
        <div className="site-header__fade" aria-hidden />
        <div className="site-header__inner layout-shell flex items-start justify-between gap-6 py-[var(--layout-gutter)]">
          <div className="flex items-center gap-4">
            <MobileNav onNavigate={onNavigate} />
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="ds-nav-link ds-role-label hidden cursor-pointer md:inline"
              aria-label="Home"
            >
              ~/
            </button>
          </div>

          <div className="ml-auto flex flex-col items-end gap-3 text-right">
            <nav
              className="hidden flex-wrap items-center justify-end gap-x-1 gap-y-1 md:flex"
              aria-label="Social"
            >
              {visibleHeaderLinks.map(({ type, label }, i) => (
                <span key={type} className="inline-flex items-center gap-3">
                  {i > 0 && <span className="ds-muted">/</span>}
                  <a
                    href={byType[type]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ds-nav-link"
                  >
                    {label}
                  </a>
                </span>
              ))}
              {visibleHeaderLinks.length > 0 && <span className="ds-muted">/</span>}
              <a href={`mailto:${CONTACT_EMAIL}`} className="ds-nav-link">
                EMAIL
              </a>
            </nav>
            <LangToggle />
          </div>
        </div>
      </header>

      <main className="layout-shell pb-20 pt-[calc(var(--layout-gutter)*2.25)]">{children}</main>
    </div>
  )
}
