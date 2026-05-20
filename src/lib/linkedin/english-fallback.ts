import type { Profile } from "@/types/profile"

/** Traduções mínimas quando o LinkedIn não expõe perfil bilíngue (só UI em EN). */
function translateLine(text: string): string {
  return text
    .replace(/Desenvolvedor Frontend/gi, "Frontend Developer")
    .replace(/Desenvolvedor/gi, "Developer")
    .replace(/Web Designer/gi, "Web Designer")
    .replace(/Cargo atual/gi, "Current role")
    .replace(/Experiência anterior/gi, "Previous role")
}

function isSame(a: string, b: string): boolean {
  return a.trim() === b.trim()
}

export function applyEnglishFallback(profile: Profile): Profile {
  const headlineEn = isSame(profile.headline.en, profile.headline.pt)
    ? translateLine(profile.headline.pt)
    : profile.headline.en

  const aboutEn = isSame(profile.about.en, profile.about.pt)
    ? profile.about.en
    : profile.about.en

  const experiences = profile.experiences.map((exp) => {
    const titleEn = isSame(exp.title.en, exp.title.pt)
      ? translateLine(exp.title.pt)
      : exp.title.en

    const descEn = isSame(exp.description.en, exp.description.pt)
      ? exp.description.en
      : exp.description.en

    return {
      ...exp,
      title: { ...exp.title, en: titleEn },
      description: { ...exp.description, en: descEn },
    }
  })

  return {
    ...profile,
    headline: { ...profile.headline, en: headlineEn },
    about: { ...profile.about, en: aboutEn },
    location: {
      pt: profile.location.pt,
      en: profile.location.en || profile.location.pt.replace("Brasil", "Brazil"),
    },
    experiences,
  }
}
