import { ExternalLink } from "lucide-react"
import { CompanyLogo } from "@/components/ui/CompanyLogo"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { TagList } from "@/components/ui/TagList"
import { useLocale } from "@/context/LocaleContext"
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
  const roleLabel = isCurrent
    ? lang
      ? "Cargo atual"
      : "Current role"
    : lang
      ? "Experiência anterior"
      : "Previous role"
  return (
    <article className="ds-divider space-y-5 pt-10 first:border-t-0 first:pt-0">
      <div className="flex justify-end">
        <span className="ds-label ds-role-label">{roleLabel}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <CompanyLogo src={logoUrl} />
          <h3 className="ds-subheading">{company}</h3>
        </div>
        <p className="ds-role">
          {t(title)}
          {period ? ` / ${period}` : ""}
        </p>
        {companyUrl && (
          <a
            href={companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-link inline-flex items-center gap-1"
          >
            {lang ? "Ver empresa" : "View company"}
            <ExternalLink className="size-3" strokeWidth={1.5} />
          </a>
        )}
      </div>

      {bullets.length > 0 && (
        <ul className="space-y-3">
          {bullets.map((line) => (
            <li key={line.slice(0, 48)} className="ds-body flex gap-3">
              <span className="shrink-0 text-foreground" aria-hidden>
                •
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      )}

      {skills && skills.length > 0 && (
        <TagList tags={skills} label={`${company} tags`} />
      )}
    </article>
  )
}

export function ExperienceSection({ profile }: { profile: Profile }) {
  const { lang } = useLocale()

  return (
    <section id="experiences" className="scroll-mt-24 space-y-10 py-16">
      <SectionHeading
        title={lang ? "Experiência selecionada" : "Selected work"}
        subtitle={
          lang
            ? "Emprego atual, papéis anteriores e projetos que ainda representam bem meu trabalho."
            : "Current role, previous roles, and projects that still represent my work well."
        }
      />

      <div className="space-y-2">
        {profile.experiences.map((exp) => (
          <ExperienceCard key={exp.id} {...exp} />
        ))}
      </div>
    </section>
  )
}
