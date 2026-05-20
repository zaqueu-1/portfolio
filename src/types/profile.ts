export type Locale = "pt" | "en"

export interface LocalizedString {
  pt: string
  en: string
}

export interface Experience {
  id: string
  company: string
  companyUrl?: string
  title: LocalizedString
  description: LocalizedString
  startDate?: string
  endDate?: string
  logoUrl?: string
  skills?: string[]
}

export interface SocialLink {
  label: string
  url: string
  type: "github" | "linkedin" | "instagram"
}

export interface Testimonial {
  id: string
  author: string
  authorTitle: LocalizedString
  text: LocalizedString
  relationship?: LocalizedString
}

export interface Profile {
  slug: string
  name: string
  headline: LocalizedString
  about: LocalizedString
  location: LocalizedString
  avatarUrl: string
  linkedinUrl: string
  experiences: Experience[]
  testimonials: Testimonial[]
  skills: string[]
  socialLinks: SocialLink[]
  lastSyncedAt: string
}
