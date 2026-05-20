/**
 * Sync manual via Playwright (grátis) — scrape do SEU perfil logado.
 * Produção: public/data/profile.json commitado (zero scrape em runtime).
 *
 * 1. npm run linkedin:login   (uma vez / quando sessão expirar)
 * 2. SYNC_LINKEDIN=1 npm run sync:linkedin
 */
import "dotenv/config"
import { writeFileSync, mkdirSync } from "node:fs"
import { applyEnglishFallback } from "../src/lib/linkedin/english-fallback"
import { translateTestimonials } from "../src/lib/linkedin/translate-testimonials"
import {
  loadSeedProfile,
  mergeApiWithSeed,
  mergeLocales,
} from "../src/lib/linkedin/normalize"
import { normalizeScraped } from "../src/lib/linkedin/normalize-scraped"
import { scrapeLinkedInProfile } from "../src/lib/linkedin/scrape-playwright"
import type { Profile } from "../src/types/profile"

async function main() {
  if (process.env.SYNC_LINKEDIN !== "1") {
    console.error(
      "Sync opt-in.\n  npm run linkedin:login\n  SYNC_LINKEDIN=1 npm run sync:linkedin",
    )
    process.exit(1)
  }

  console.log("Scraping PT…")
  const ptData = await scrapeLinkedInProfile("pt")
  console.log("Scraping EN…")
  const enData = await scrapeLinkedInProfile("en")

  let profile = mergeLocales(
    normalizeScraped(ptData, "pt"),
    normalizeScraped(enData, "en"),
  ) as Profile

  const seed = loadSeedProfile()
  if (seed) profile = mergeApiWithSeed(profile, seed)
  profile = applyEnglishFallback(profile)

  if (profile.testimonials?.length) {
    console.log("Translating testimonials to EN…")
    profile = await translateTestimonials(profile)
  }

  mkdirSync("public/data", { recursive: true })
  writeFileSync("public/data/profile.json", JSON.stringify(profile, null, 2))
  console.log(
    `Scrape OK → ${profile.experiences.length} experiences, ${profile.testimonials?.length ?? 0} testimonials, about ${profile.about.pt.length}/${profile.about.en.length} chars`,
  )
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
