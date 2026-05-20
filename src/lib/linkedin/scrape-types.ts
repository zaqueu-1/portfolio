export interface ScrapedExperience {
  company: string
  title: string
  dateRange: string
  description: string
  companyUrl?: string
  logoUrl?: string
}

export interface ScrapedTestimonial {
  author: string
  authorTitle: string
  text: string
  relationship?: string
  date?: string
}

export interface ScrapedLocaleData {
  name: string
  headline: string
  about: string
  location: string
  avatarUrl?: string
  experiences: ScrapedExperience[]
  testimonials: ScrapedTestimonial[]
}
