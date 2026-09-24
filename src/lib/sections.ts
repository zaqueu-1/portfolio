export const SECTION_PATHS = {
  top: "~/",
  about: "~/about",
  project: "~/projects",
  experiences: "~/work",
  testimonials: "~/refs",
  contact: "~/contact",
} as const

export type SectionId = keyof typeof SECTION_PATHS
