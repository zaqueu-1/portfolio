import { readFileSync, existsSync } from "node:fs"
import { preferLocalLogo } from "../company-logos"
import { testimonialKey } from "./parse-testimonials"
import type { Experience, LocalizedString, Profile, Testimonial } from "@/types/profile"

interface ProxycurlExperience {
  company?: string
  company_linkedin_profile_url?: string
  title?: string
  description?: string
  starts_at?: { year?: number; month?: number }
  ends_at?: { year?: number; month?: number } | null
  logo_url?: string
}

interface ProxycurlProfile {
  public_identifier?: string
  full_name?: string
  headline?: string
  summary?: string
  city?: string
  country_full_name?: string
  profile_pic_url?: string
  experiences?: ProxycurlExperience[]
  skills?: string[]
}

function padDate(year?: number, month?: number): string | undefined {
  if (!year) return undefined
  const m = String(month ?? 1).padStart(2, "0")
  return `${year}-${m}-01`
}

function bulletsToText(text?: string): string {
  if (!text) return ""
  return text.trim()
}

export function normalizeProxycurl(
  raw: unknown,
  locale: "pt" | "en",
): Partial<Profile> {
  const data = raw as ProxycurlProfile
  const location =
    [data.city, data.country_full_name].filter(Boolean).join(", ") || ""

  const experiences: Experience[] = (data.experiences ?? []).map((exp, i) => {
    const desc = bulletsToText(exp.description)
    const title: LocalizedString = { pt: "", en: "" }
    const description: LocalizedString = { pt: "", en: "" }
    title[locale] = exp.title ?? ""
    description[locale] = desc

    return {
      id: `${exp.company ?? "exp"}-${i}`,
      company: exp.company ?? "",
      companyUrl: exp.company_linkedin_profile_url,
      title,
      description,
      startDate: padDate(exp.starts_at?.year, exp.starts_at?.month),
      endDate: exp.ends_at
        ? padDate(exp.ends_at.year, exp.ends_at.month)
        : undefined,
      logoUrl: exp.logo_url,
    }
  })

  const headline: LocalizedString = { pt: "", en: "" }
  const about: LocalizedString = { pt: "", en: "" }
  const locationLoc: LocalizedString = { pt: "", en: "" }
  headline[locale] = data.headline ?? ""
  about[locale] = data.summary ?? ""
  locationLoc[locale] = location

  return {
    slug: data.public_identifier ?? "zaqueu1",
    name: data.full_name ?? "Eduardo Zaqueu",
    headline,
    about,
    location: locationLoc,
    avatarUrl: data.profile_pic_url ?? "/img/avatarzin.jpg",
    linkedinUrl: `https://linkedin.com/in/${data.public_identifier ?? "zaqueu1"}`,
    experiences,
    testimonials: [],
    skills: data.skills ?? [],
  }
}

function companyKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/** Só logos locais + skills; about/headline vêm do LinkedIn */
export function mergeApiWithSeed(api: Profile, seed: Profile): Profile {
  const seedByKey = new Map(
    (seed.experiences ?? []).map((e) => [companyKey(e.company), e]),
  )

  const experiences = api.experiences.map((exp) => {
    const prev = seedByKey.get(companyKey(exp.company))
    const logo =
      preferLocalLogo(exp.company, exp.logoUrl) ??
      (prev?.logoUrl?.startsWith("/img/") ? prev.logoUrl : undefined) ??
      exp.logoUrl ??
      prev?.logoUrl

    return {
      ...exp,
      title: {
        pt: exp.title.pt || prev?.title.pt || "",
        en: exp.title.en || prev?.title.en || "",
      },
      description: {
        pt: exp.description.pt || prev?.description.pt || "",
        en: exp.description.en || prev?.description.en || "",
      },
      logoUrl: logo,
      skills: exp.skills?.length ? exp.skills : prev?.skills,
    }
  })

  return {
    ...api,
    about: {
      pt: api.about.pt,
      en: api.about.en,
    },
    headline: {
      pt: api.headline.pt || seed.headline.pt,
      en: api.headline.en || seed.headline.en,
    },
    skills: api.skills.length ? api.skills : seed.skills,
    socialLinks: seed.socialLinks,
    experiences,
    testimonials:
      api.testimonials?.length > 0 ? api.testimonials : (seed.testimonials ?? []),
    lastSyncedAt: new Date().toISOString(),
  }
}

export function loadSeedProfile(): Profile | null {
  const path = "public/data/profile.json"
  if (!existsSync(path)) return null
  return JSON.parse(readFileSync(path, "utf-8")) as Profile
}

export function mergeLocales(pt: Partial<Profile>, en: Partial<Profile>): Profile {
  const mergeStr = (a?: LocalizedString, b?: Partial<LocalizedString>): LocalizedString => ({
    pt: a?.pt || b?.pt || "",
    en: a?.en || b?.en || "",
  })

  const expMap = new Map<string, Experience>()

  for (const exp of pt.experiences ?? []) {
    expMap.set(exp.company, { ...exp })
  }

  for (const exp of en.experiences ?? []) {
    const key = companyKey(exp.company)
    const existing = [...expMap.entries()].find(
      ([k]) => companyKey(k) === key || companyKey(k).includes(key) || key.includes(companyKey(k)),
    )?.[1]
    if (existing) {
      existing.title.en = exp.title.en || existing.title.en
      existing.description.en = exp.description.en || existing.description.en
      existing.logoUrl = exp.logoUrl || existing.logoUrl
      existing.companyUrl = exp.companyUrl || existing.companyUrl
      existing.startDate = existing.startDate || exp.startDate
      existing.endDate = exp.endDate ?? existing.endDate
    } else {
      expMap.set(exp.company, exp)
    }
  }

  const sorted = Array.from(expMap.values()).sort((a, b) => {
    const da = a.startDate ?? "0000-01-01"
    const db = b.startDate ?? "0000-01-01"
    return db.localeCompare(da)
  })

  const testimonialMap = new Map<string, Testimonial>()
  for (const item of pt.testimonials ?? []) {
    testimonialMap.set(testimonialKey(item.author), { ...item })
  }
  for (const item of en.testimonials ?? []) {
    const key = testimonialKey(item.author)
    const existing = [...testimonialMap.entries()].find(
      ([k]) => k === key || k.includes(key) || key.includes(k),
    )?.[1]
    if (existing) {
      existing.authorTitle.en = item.authorTitle.en || existing.authorTitle.en
      existing.text.en = item.text.en || existing.text.en
      if (item.relationship) {
        existing.relationship ??= { pt: "", en: "" }
        existing.relationship.en = item.relationship.en || existing.relationship.en
      }
    } else {
      testimonialMap.set(item.author, item)
    }
  }

  return {
    slug: pt.slug ?? en.slug ?? "zaqueu1",
    name: pt.name ?? en.name ?? "Eduardo Zaqueu",
    headline: mergeStr(pt.headline, en.headline),
    about: mergeStr(pt.about, en.about),
    location: mergeStr(pt.location, en.location),
    avatarUrl: pt.avatarUrl ?? en.avatarUrl ?? "/img/avatarzin.jpg",
    linkedinUrl: pt.linkedinUrl ?? en.linkedinUrl ?? "https://linkedin.com/in/zaqueu1",
    experiences: sorted,
    testimonials: Array.from(testimonialMap.values()),
    skills: [...new Set([...(pt.skills ?? []), ...(en.skills ?? [])])],
    socialLinks: pt.socialLinks ?? en.socialLinks ?? defaultSocialLinks(),
    lastSyncedAt: new Date().toISOString(),
  }
}

function defaultSocialLinks(): Profile["socialLinks"] {
  return [
    { label: "Github", url: "https://github.com/zaqueu-1", type: "github" },
    { label: "LinkedIn", url: "https://linkedin.com/in/zaqueu1", type: "linkedin" },
    { label: "Instagram", url: "https://instagram.com/zaqueu.tech", type: "instagram" },
  ]
}
