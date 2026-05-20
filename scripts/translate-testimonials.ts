/**
 * Re-traduz/adapta depoimentos em public/data/profile.json (sem scrape).
 * npm run translate:testimonials
 */
import { readFileSync, writeFileSync } from "node:fs"
import { translateTestimonials } from "../src/lib/linkedin/translate-testimonials"
import type { Profile } from "../src/types/profile"

async function main() {
  const profile = JSON.parse(readFileSync("public/data/profile.json", "utf-8")) as Profile
  const updated = await translateTestimonials(profile)
  writeFileSync("public/data/profile.json", JSON.stringify(updated, null, 2))
  console.log(`Updated ${updated.testimonials.length} testimonials (EN adapted).`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
