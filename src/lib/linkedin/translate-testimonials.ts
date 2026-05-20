import type { Profile, Testimonial } from "@/types/profile"
import { cleanTestimonialText } from "./clean-testimonial-text"
import { adaptPtToEn } from "./translate-text"

const PT_MARKERS = /[ãõçáéíóúâêô]|(\bem\b|\bque\b|\bcom\b|\bpara\b|\btrabalhou\b|\bdesenvolvedor\b)/i

function looksPortuguese(text: string): boolean {
  return PT_MARKERS.test(text)
}

function needsEnglishVersion(pt: string, en: string): boolean {
  const ptClean = pt.trim()
  const enClean = en.trim()
  if (!enClean) return true
  if (enClean === ptClean) return true
  if (/output only the english|rewrite the following linkedin/i.test(enClean)) return true
  return looksPortuguese(enClean)
}

async function adaptTitle(pt: string, en: string): Promise<string> {
  if (!looksPortuguese(pt) && en.trim()) return en.trim()
  if (!looksPortuguese(pt)) return pt.trim()
  if (!needsEnglishVersion(pt, en)) return en.trim()
  return adaptPtToEn(pt, "title")
}

async function adaptRelationship(pt: string, en: string): Promise<string> {
  if (!needsEnglishVersion(pt, en)) return en.trim()
  return adaptPtToEn(pt, "relationship")
}

async function adaptBody(pt: string, en: string): Promise<string> {
  if (!needsEnglishVersion(pt, en)) return en.trim()
  return adaptPtToEn(pt, "testimonial")
}

async function translateTestimonial(item: Testimonial): Promise<Testimonial> {
  const textPt = cleanTestimonialText(item.text.pt)
  const titlePt = cleanTestimonialText(item.authorTitle.pt)
  const relationshipPt = item.relationship
    ? cleanTestimonialText(item.relationship.pt)
    : ""

  const [textEn, titleEn, relationshipEn] = await Promise.all([
    adaptBody(textPt, item.text.en),
    adaptTitle(titlePt, item.authorTitle.en),
    relationshipPt
      ? adaptRelationship(relationshipPt, item.relationship?.en ?? "")
      : Promise.resolve(""),
  ])

  return {
    ...item,
    authorTitle: { pt: titlePt, en: titleEn },
    text: { pt: textPt, en: textEn },
    relationship: relationshipPt
      ? { pt: relationshipPt, en: relationshipEn }
      : undefined,
  }
}

export async function translateTestimonials(profile: Profile): Promise<Profile> {
  const items = profile.testimonials ?? []
  if (items.length === 0) return profile

  const testimonials: Testimonial[] = []
  for (const item of items) {
    testimonials.push(await translateTestimonial(item))
  }

  return { ...profile, testimonials }
}
