const CHUNK_SIZE = 1100

const ADAPT_PROMPTS = {
  testimonial:
    "Rewrite the following LinkedIn recommendation in natural, professional English for a software engineer portfolio website. Keep the original meaning and a warm tone. Use " +
    '"Eduardo" when referring to the person recommended. Output only the English recommendation text:\n\n',
  relationship:
    "Translate the following LinkedIn relationship line into natural English (for example: On March 14, 2023, Name worked on the same team as Eduardo). Output only the English line:\n\n",
  title:
    "Translate the following professional headline into English résumé style. Keep technology names unchanged. Output only the English headline:\n\n",
} as const

export type AdaptContext = keyof typeof ADAPT_PROMPTS

function chunkText(text: string): string[] {
  if (text.length <= CHUNK_SIZE) return [text]

  const chunks: string[] = []
  let rest = text

  while (rest.length > CHUNK_SIZE) {
    const slice = rest.slice(0, CHUNK_SIZE)
    const splitAt = Math.max(slice.lastIndexOf(". "), slice.lastIndexOf("\n"))
    const cut = splitAt > CHUNK_SIZE * 0.5 ? splitAt + 1 : CHUNK_SIZE
    chunks.push(rest.slice(0, cut).trim())
    rest = rest.slice(cut).trim()
  }

  if (rest) chunks.push(rest)
  return chunks
}

async function translateChunk(text: string): Promise<string> {
  const url = new URL("https://translate.googleapis.com/translate_a/single")
  url.searchParams.set("client", "gtx")
  url.searchParams.set("sl", "pt")
  url.searchParams.set("tl", "en")
  url.searchParams.set("dt", "t")
  url.searchParams.set("q", text)

  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`Translation failed: HTTP ${res.status}`)
  }

  const data = (await res.json()) as [Array<[string]>, ...unknown[]]
  const parts = data[0]?.map((chunk) => chunk[0]).filter(Boolean) ?? []
  return parts.join("").trim() || text
}

function stripAdaptationPrompt(text: string): string {
  const markers = [
    /^Rewrite the following LinkedIn recommendation[\s\S]*?recommendation text:\s*/i,
    /^Translate the following LinkedIn relationship line[\s\S]*?English line:\s*/i,
    /^Translate the following professional headline[\s\S]*?English headline:\s*/i,
    /Output only the English (?:recommendation text|line|headline):\s*/i,
  ]

  let result = text.trim()
  for (const marker of markers) {
    result = result.replace(marker, "")
  }
  return result.trim()
}

function polishEnglish(text: string): string {
  return stripAdaptationPrompt(text)
    .replace(/^["'“”]+|["'“”]+$/g, "")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .replace(/\bZaqueu\b/g, "Eduardo")
    .replace(/\bZaque\b/g, "Eduardo")
    .replace(/\bEduardo Eduardo\b/g, "Eduardo")
    .replace(/\bguy\b/gi, "person")
    .trim()
}

/** Tradução PT→EN simples (campos curtos). */
export async function translatePtToEn(text: string): Promise<string> {
  const trimmed = text.trim()
  if (!trimmed) return ""

  const chunks = chunkText(trimmed)
  const translated = await Promise.all(chunks.map(translateChunk))
  return polishEnglish(translated.join(" "))
}

/** Tradução + adaptação para tom de portfolio em inglês. */
export async function adaptPtToEn(text: string, context: AdaptContext): Promise<string> {
  const trimmed = text.trim()
  if (!trimmed) return ""

  const payload = `${ADAPT_PROMPTS[context]}${trimmed}`
  const chunks = chunkText(payload)
  const translated = await Promise.all(chunks.map(translateChunk))
  return polishEnglish(translated.join(" "))
}
