import { z } from "zod"

export type Locale = "pt" | "en"

function joinParagraphs(value: string | string[]): string {
  return (Array.isArray(value) ? value.join("\n\n") : value).trim()
}

const LocalizedStringSchema = z.object({
  pt: z.string(),
  en: z.string(),
})

export type LocalizedString = z.infer<typeof LocalizedStringSchema>

/** Accepts a string or paragraph array (joined with blank lines on parse). */
const LocalizedBodySchema = z.object({
  pt: z.union([z.string(), z.array(z.string())]).transform(joinParagraphs),
  en: z.union([z.string(), z.array(z.string())]).transform(joinParagraphs),
})

const ExperienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  companyUrl: z.string().optional(),
  title: LocalizedStringSchema,
  description: LocalizedStringSchema,
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  logoUrl: z.string().optional(),
  skills: z.array(z.string()).optional(),
})

export type Experience = z.infer<typeof ExperienceSchema>

const SocialLinkSchema = z.object({
  label: z.string(),
  url: z.string(),
  type: z.enum(["github", "linkedin", "instagram"]),
})

export type SocialLink = z.infer<typeof SocialLinkSchema>

const TestimonialSchema = z.object({
  id: z.string(),
  author: z.string(),
  authorTitle: LocalizedStringSchema,
  text: LocalizedStringSchema,
  relationship: LocalizedStringSchema.optional(),
})

export type Testimonial = z.infer<typeof TestimonialSchema>

export const ProfileSchema = z.object({
  slug: z.string(),
  name: z.string(),
  headline: LocalizedStringSchema,
  tagline: LocalizedStringSchema,
  about: LocalizedBodySchema,
  location: LocalizedStringSchema,
  avatarUrl: z.string(),
  linkedinUrl: z.string(),
  experiences: z.array(ExperienceSchema),
  testimonials: z.array(TestimonialSchema),
  skills: z.array(z.string()),
  socialLinks: z.array(SocialLinkSchema),
  lastSyncedAt: z.string(),
})

export type Profile = z.infer<typeof ProfileSchema>
