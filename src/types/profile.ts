import { z } from "zod"

export type Locale = "pt" | "en"

const LocalizedStringSchema = z.object({
  pt: z.string(),
  en: z.string(),
})

export type LocalizedString = z.infer<typeof LocalizedStringSchema>

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
  about: LocalizedStringSchema,
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
