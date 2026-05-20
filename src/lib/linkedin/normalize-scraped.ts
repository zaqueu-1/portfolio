import { preferLocalLogo } from "../company-logos"
import { testimonialKey } from "./parse-testimonials"
import type { Experience, LocalizedString, Profile, Testimonial } from "@/types/profile"
import { parseDateRange } from "./parse-dates"
import type { ScrapedLocaleData } from "./scrape-types"

export function normalizeScraped(
  data: ScrapedLocaleData,
  locale: "pt" | "en",
): Partial<Profile> {
  const headline: LocalizedString = { pt: "", en: "" }
  const about: LocalizedString = { pt: "", en: "" }
  const location: LocalizedString = { pt: "", en: "" }
  headline[locale] = data.headline
  about[locale] = data.about
  location[locale] = data.location

  const testimonials: Testimonial[] = (data.testimonials ?? []).map((item) => {
    const authorTitle: LocalizedString = { pt: "", en: "" }
    const text: LocalizedString = { pt: "", en: "" }
    const relationship: LocalizedString = { pt: "", en: "" }
    authorTitle[locale] = item.authorTitle
    text[locale] = item.text
    if (item.relationship) relationship[locale] = item.relationship

    return {
      id: testimonialKey(item.author),
      author: item.author,
      authorTitle,
      text,
      relationship: item.relationship ? relationship : undefined,
    }
  })

  const experiences: Experience[] = data.experiences.map((exp, i) => {
    const { startDate, endDate } = parseDateRange(exp.dateRange)
    const title: LocalizedString = { pt: "", en: "" }
    const description: LocalizedString = { pt: "", en: "" }
    title[locale] = exp.title
    description[locale] = exp.description

    return {
      id: `${exp.company}-${i}`,
      company: exp.company,
      companyUrl: exp.companyUrl,
      title,
      description,
      startDate,
      endDate,
      logoUrl: preferLocalLogo(exp.company, exp.logoUrl),
    }
  })

  const slug =
    process.env.LINKEDIN_PROFILE_URL?.replace(/\/$/, "").split("/").pop() ?? "zaqueu1"

  return {
    slug,
    name: data.name,
    headline,
    about,
    location,
    avatarUrl: data.avatarUrl ?? "/img/avatarzin.jpg",
    linkedinUrl: process.env.LINKEDIN_PROFILE_URL ?? `https://linkedin.com/in/${slug}`,
    experiences,
    testimonials,
    skills: [],
  }
}
