import type { BrowserContext, Page } from "playwright"
import {
  hasLinkedInSession,
  openLinkedInBrowser,
} from "./browser-context"
import { parseTestimonialsFromText } from "./parse-testimonials"
import type {
  ScrapedLocaleData,
  ScrapedExperience,
  ScrapedTestimonial,
} from "./scrape-types"

export type ScrapeLocale = "pt" | "en"

const ABOUT_HEADINGS = ["Sobre", "About"]
const EXPERIENCE_PAGE_MARKERS = [
  "Experiência",
  "Experience",
  "prophub",
  "Hurb",
  "Berrytech",
]

function profileSlugPath(): string {
  const raw = (
    process.env.LINKEDIN_PROFILE_URL ?? "https://www.linkedin.com/in/zaqueu1/"
  ).trim()
  const path = new URL(raw).pathname.replace(/\/?$/, "/")
  return path
}

/** URLs com locale do perfil (PT/EN) — ex.: /in/zaqueu1/?locale=en-US */
function urlForLocale(path: string, locale: ScrapeLocale): string {
  const url = new URL(path, "https://www.linkedin.com")
  if (locale === "en") {
    url.searchParams.set("locale", "en-US")
  } else {
    url.searchParams.delete("locale")
  }
  return url.toString()
}

function profilePageUrl(locale: ScrapeLocale): string {
  return urlForLocale(profileSlugPath(), locale)
}

function experienceDetailsUrl(locale: ScrapeLocale): string {
  const base = profileSlugPath().replace(/\/$/, "")
  return urlForLocale(`${base}/details/experience/`, locale)
}

function recommendationsDetailsUrl(locale: ScrapeLocale): string {
  const base = profileSlugPath().replace(/\/$/, "")
  return urlForLocale(`${base}/details/recommendations/`, locale)
}

const RECOMMENDATION_MARKERS = [
  "Recomendações",
  "Recommendations",
  "recomendou",
  "recommended",
]

function acceptLanguage(locale: ScrapeLocale): string {
  return locale === "pt"
    ? "pt-BR,pt;q=0.9,en;q=0.8"
    : "en-US,en;q=0.9,pt;q=0.8"
}

function langCookieValue(locale: ScrapeLocale): string {
  return locale === "pt" ? "v=2&lang=pt-br" : "v=2&lang=en-us"
}

async function applyLinkedInLocale(context: BrowserContext, locale: ScrapeLocale) {
  await context.addCookies([
    {
      name: "lang",
      value: langCookieValue(locale),
      domain: ".linkedin.com",
      path: "/",
    },
    {
      name: "li_lang",
      value: langCookieValue(locale),
      domain: ".www.linkedin.com",
      path: "/",
    },
  ])
  await context.setExtraHTTPHeaders({ "Accept-Language": acceptLanguage(locale) })
}

async function expandAllSeeMore(page: Page) {
  const buttons = page.locator(
    'button:has-text("ver mais"), button:has-text("exibir mais"), button:has-text("see more"), button:has-text("Show more")',
  )
  const count = await buttons.count()
  for (let i = 0; i < Math.min(count, 16); i++) {
    await buttons.nth(i).click({ timeout: 2000 }).catch(() => {})
  }
}

async function waitForProfileReady(page: Page, locale: ScrapeLocale) {
  await page.waitForFunction(
    ({ headings, isEn }) => {
      const h2s = [...document.querySelectorAll("section h2")].map(
        (h) => h.textContent?.trim() ?? "",
      )
      if (headings.some((h: string) => h2s.includes(h))) return true
      const text = document.querySelector("main")?.innerText ?? ""
      if (isEn) return /\b(About|Experience)\b/.test(text) && text.length > 200
      return /\b(Sobre|Experiência)\b/.test(text) && text.length > 200
    },
    { headings: ABOUT_HEADINGS, isEn: locale === "en" },
    { timeout: 90_000 },
  )
}

async function waitForExperiencePageReady(page: Page) {
  await page.waitForFunction(
    (markers) => {
      const text = document.querySelector("main")?.innerText ?? ""
      return markers.some((m: string) => text.includes(m))
    },
    EXPERIENCE_PAGE_MARKERS,
    { timeout: 90_000 },
  )
}

async function waitForRecommendationsPageReady(page: Page) {
  await page.waitForFunction(
    (markers) => {
      const text = document.querySelector("main")?.innerText ?? ""
      return markers.some((m: string) => text.includes(m))
    },
    RECOMMENDATION_MARKERS,
    { timeout: 90_000 },
  )
}

async function extractProfileHeader(page: Page) {
  await expandAllSeeMore(page)
  await page.waitForTimeout(600)

  return page.evaluate((aboutHeadings) => {
    const main = document.querySelector("main")
    const lines = (main?.innerText ?? "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)

    const name =
      lines[0] ??
      document.querySelector("section h2")?.textContent?.trim() ??
      ""

    const headline =
      lines.find(
        (l) =>
          (l.includes("|") || /developer|desenvolvedor|engineer/i.test(l)) &&
          l.length < 120,
      ) ??
      lines[2] ??
      ""

    const location =
      lines.find(
        (l) =>
          /,\s*(Brasil|Brazil)/i.test(l) &&
          !l.includes("|") &&
          l.length < 80 &&
          !l.startsWith("·"),
      ) ??
      lines.find((l) => /^[A-Z].*,/.test(l) && l.length < 60) ??
      ""

    const aboutSection = [...document.querySelectorAll("section")].find((s) => {
      const h2 = s.querySelector("h2")?.textContent?.trim() ?? ""
      return aboutHeadings.includes(h2)
    })

    let about = ""
    if (aboutSection) {
      about = (aboutSection as HTMLElement).innerText
        .replace(/^(Sobre|About)\s*\n?/i, "")
        .replace(/\s*(ver mais|see more|exibir mais|show more)\s*$/i, "")
        .trim()
    }

    const avatarImg = document.querySelector(
      'img[src*="profile-displayphoto"], img.pv-top-card-profile-picture__image',
    ) as HTMLImageElement | null

    return {
      name,
      headline,
      about,
      location,
      avatarUrl: avatarImg?.src || undefined,
    }
  }, ABOUT_HEADINGS)
}

/** Parse experience list page `main` text (owner view, 2025+ UI). */
export function parseExperiencesFromText(raw: string): ScrapedExperience[] {
  const cleaned = raw
    .replace(/^(Experiência|Experience)\s*\n+/i, "")
    .trim()

  const blocks = cleaned.split(
    /\n\n(?=[^\n•][^\n]+\n\n[^\n]+ · (?:Tempo integral|Full-time|Part-time|Contrato|Contract|Autônomo|Self-employed|Estágio|Internship|Freelance|Permanent))/,
  )

  const noise =
    /^(O LinkedIn|LinkedIn helped|me ajudou|Aprimorar com IA|Aprimorar with AI|\d+ competências|\d+ skills|Opções de anúncio|Não quero ver|Idioma do perfil|Language of profile|LinkedIn Corporation|Diretrizes|Preferências|Soluções de Marketing|Acesse a nossa|Gerencie sua|Visibilidade da|Saiba mais sobre|Bahasa |Tiếng |简体中文|正體中文|© \d{4}|e mais \d+ competências|and \d+ more skills|Technologies:|Tecnologias:)/i

  return blocks
    .map((block) => {
      const lines = block
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && !noise.test(l))

      if (lines.length < 2) return null

      const title = lines[0] ?? ""
      const companyLine =
        lines.find((l) => l.includes(" · ") && !/\d{4}/.test(l)) ?? ""
      const company = companyLine.split(" · ")[0]?.trim() ?? ""

      const dateRange =
        lines.find((l) =>
          /\d{4}|momento|present|atual|now|jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|january|february|march|april|may|june|july|august|september|october|november|december/i.test(
            l,
          ),
        ) ?? ""

      const descLines: string[] = []
      let inDesc = false
      for (const line of lines) {
        if (/^Tecnologias:|^Skills:/i.test(line)) break
        if (line.startsWith("•") || line.startsWith("- ")) {
          inDesc = true
          descLines.push(line.startsWith("- ") ? `• ${line.slice(2)}` : line)
        } else if (
          inDesc &&
          !/^[A-Z][a-z]+ de \d{4}/.test(line) &&
          !line.includes(" · ") &&
          line.length > 20
        ) {
          descLines.push(`• ${line}`)
        }
      }

      const description = descLines.join("\n").trim()

      if (!title && !company) return null
      return { title, company, dateRange, description }
    })
    .filter((e): e is ScrapedExperience => e !== null && Boolean(e.company || e.title))
}

async function extractCompanyLogos(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const urls: string[] = []
    document.querySelectorAll("main img").forEach((img) => {
      const src = (img as HTMLImageElement).src
      if (!src) return
      if (src.includes("profile-displayphoto")) return
      if (
        src.includes("company-logo") ||
        src.includes("media.licdn.com/dms/image") ||
        src.includes("licdn.com/dms/image")
      ) {
        urls.push(src)
      }
    })
    return urls
  })
}

async function extractExperiences(page: Page): Promise<ScrapedExperience[]> {
  await expandAllSeeMore(page)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(800)

  const raw = await page.evaluate(() => document.querySelector("main")?.innerText ?? "")
  const logos = await extractCompanyLogos(page)
  const experiences = parseExperiencesFromText(raw)

  return experiences.map((exp, i) => ({
    ...exp,
    logoUrl: logos[i] ?? exp.logoUrl,
  }))
}

async function extractTestimonialsFromDom(page: Page): Promise<ScrapedTestimonial[]> {
  return page.evaluate(() => {
    const results: Array<{
      author: string
      authorTitle: string
      text: string
      relationship?: string
    }> = []

    const items = document.querySelectorAll(
      'main li[class*="pvs-list"], main .pvs-list__paged-list-item, main ul.pvs-list > li',
    )

    items.forEach((li) => {
      const profileLink = li.querySelector<HTMLAnchorElement>('a[href*="/in/"]')
      const author =
        profileLink?.querySelector('span[aria-hidden="true"]')?.textContent?.trim() ??
        profileLink?.textContent?.trim()?.split("\n")[0]?.trim() ??
        ""

      if (!author || author.length > 80) return

      const hiddenSpans = [...li.querySelectorAll('span[aria-hidden="true"]')]
        .map((s) => s.textContent?.trim() ?? "")
        .filter(Boolean)

      const authorTitle =
        hiddenSpans.find((t) => t !== author && t.length > 4 && t.length < 160) ?? ""

      const relationship = hiddenSpans.find((t) => /[·•]|recomendou|recommended/i.test(t))

      const textCandidates = hiddenSpans.filter(
        (t) =>
          t !== author &&
          t !== authorTitle &&
          t !== relationship &&
          t.length > 40,
      )
      const text = textCandidates.sort((a, b) => b.length - a.length)[0] ?? ""

      if (text.length < 24) return

      results.push({
        author,
        authorTitle,
        text,
        relationship,
      })
    })

    return results
  })
}

async function extractTestimonials(page: Page): Promise<ScrapedTestimonial[]> {
  await expandAllSeeMore(page)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(600)

  const fromDom = await extractTestimonialsFromDom(page)
  if (fromDom.length > 0) return fromDom

  const raw = await page.evaluate(() => document.querySelector("main")?.innerText ?? "")
  return parseTestimonialsFromText(raw)
}

async function assertLoggedIn(page: Page) {
  if (page.url().includes("/login") || page.url().includes("/checkpoint")) {
    throw new Error("Sessão expirada. Rode: npm run linkedin:login")
  }
}

export { hasLinkedInSession }

export async function scrapeLinkedInProfile(
  locale: ScrapeLocale,
): Promise<ScrapedLocaleData> {
  if (!hasLinkedInSession()) {
    throw new Error(
      "Sessão LinkedIn não encontrada. Rode primeiro:\n  npm run linkedin:login",
    )
  }

  const headless = process.env.SCRAPE_HEADLESS === "1"
  const context = await openLinkedInBrowser(headless)
  const page = await context.newPage()
  const profileUrl = profilePageUrl(locale)
  const experienceUrl = experienceDetailsUrl(locale)
  const recommendationsUrl = recommendationsDetailsUrl(locale)

  try {
    await applyLinkedInLocale(context, locale)

    await page.goto(profileUrl, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    })
    await assertLoggedIn(page)

    if (!page.url().includes("/in/")) {
      await page.goto(profileUrl, {
        waitUntil: "domcontentloaded",
        timeout: 90_000,
      })
    }

    await page.waitForTimeout(2500)
    await waitForProfileReady(page, locale)
    const header = await extractProfileHeader(page)

    await page.goto(experienceUrl, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    })
    await assertLoggedIn(page)
    await page.waitForTimeout(2500)
    await waitForExperiencePageReady(page)
    const experiences = await extractExperiences(page)

    await page.goto(recommendationsUrl, {
      waitUntil: "domcontentloaded",
      timeout: 90_000,
    })
    await assertLoggedIn(page)
    await page.waitForTimeout(2500)
    await waitForRecommendationsPageReady(page)
    const testimonials = await extractTestimonials(page)

    return { ...header, experiences, testimonials }
  } finally {
    await context.close()
  }
}
