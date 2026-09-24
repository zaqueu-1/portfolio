import { ExternalLink } from "lucide-react"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import { RevealSection } from "@/components/ui/RevealSection"
import { RevealText } from "@/components/ui/RevealText"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TagList } from "@/components/ui/TagList"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { SECTION_PATHS } from "@/lib/sections"
import { preferLocalLogo } from "@/lib/company-logos"
import { formatDescription, formatPeriod } from "@/lib/format"
import type { Profile } from "@/types/profile"

function ExperienceCard({
  company,
  companyUrl,
  title,
  description,
  logoUrl,
  skills,
  startDate,
  endDate,
}: Profile["experiences"][0]) {
  const { t, lang } = useLocale()
  const bullets = formatDescription(t(description))
  const period = formatPeriod(startDate, endDate, lang)
  const isCurrent = Boolean(startDate && !endDate)
  const roleLabel = t(isCurrent ? copy.experience.currentRole : copy.experience.previousRole)
  const resolvedLogo = preferLocalLogo(company, logoUrl)

  return (
    <RevealSection
      as="article"
      className="git-rail grid gap-4 pb-12 md:grid-cols-[10.5rem_1fr] md:gap-10"
    >
      <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-2 md:pt-1.5">
        <span className={`git-node ${isCurrent ? "is-head" : ""}`} aria-hidden />
        <span className={`ds-label ${isCurrent ? "ds-role-label" : ""}`}>{roleLabel}</span>
        {period && <span className="ds-label md:pl-0">{period}</span>}
      </div>

      <div className="min-w-0 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <CompanyLogo src={resolvedLogo} />
            <h3 className="ds-subheading">{company}</h3>
          </div>
          <RevealText as="p" className="ds-role" text={t(title)} />
          {companyUrl && (
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-link inline-flex items-center gap-1"
            >
              {t(copy.experience.viewCompany)}
              <ExternalLink className="size-3" strokeWidth={1.5} />
            </a>
          )}
        </div>

        {bullets.length > 0 && (
          <ul className="space-y-3">
            {bullets.map((line) => (
              <li key={line.slice(0, 48)} className="ds-body flex gap-3">
                <span className="ds-prompt shrink-0" aria-hidden>
                  &gt;
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        )}

        {skills && skills.length > 0 && (
          <TagList tags={skills} label={`${company} tags`} />
        )}
      </div>
    </RevealSection>
  )
}

export function ExperienceSection({ profile }: { profile: Profile }) {
  const { t } = useLocale()

  return (
    <section id="experiences" className="scroll-mt-24 space-y-10 py-16">
      <RevealSection>
        <SectionHeading
          path={SECTION_PATHS.experiences}
          title={t(copy.experience.title)}
          subtitle={t(copy.experience.subtitle)}
        />
      </RevealSection>

      <div>
        {profile.experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </section>
  )
}
