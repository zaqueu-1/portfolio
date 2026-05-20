import type { ScrapedTestimonial } from "./scrape-types"

const NOISE =
  /^(Ver mais|See more|Exibir|Show|O LinkedIn|LinkedIn helped|me ajudou|LinkedIn Corporation|© \d{4}|Diretrizes|Preferências|Soluções de Marketing|Acesse a nossa|Gerencie sua|Visibilidade|Saiba mais|Mostrar todas|Show all|\d+ recomenda|Ativada|Recebidas|Fornecidas|· 1º)$/i

function isNoise(line: string): boolean {
  return (
    NOISE.test(line) ||
    /todos os usuários do linkedin|this page does not exist|esta página não existe/i.test(
      line,
    ) ||
    /^(sobre|about|acessibilidade|accessibility)$/i.test(line)
  )
}

const BADGE = /\n\n· 1º\n\n/

function testimonialKey(author: string): string {
  return author.toLowerCase().replace(/\s+/g, " ").trim()
}

function isRelationship(line: string): boolean {
  return /trabalhou|worked|recommended|recomendou|managed|gerente|equipe|team/i.test(line)
}

function looksLikeAuthorName(line: string): boolean {
  const words = line.split(/\s+/).filter(Boolean)
  return (
    words.length >= 2 &&
    words.length <= 6 &&
    line.length >= 6 &&
    line.length < 72 &&
    /^[A-ZÀ-Ú]/.test(line) &&
    !/[.!?]/.test(line) &&
    !isRelationship(line) &&
    !line.includes("|") &&
    !line.includes("·")
  )
}

function linesFromChunk(chunk: string): string[] {
  return chunk
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !isNoise(l))
}

function lastAuthorLine(chunk: string): string | null {
  const lines = linesFromChunk(chunk)
  const last = lines[lines.length - 1]
  return last && looksLikeAuthorName(last) ? last : null
}

function extractTextLines(bodyLines: string[], startIdx: number): string {
  const textLines: string[] = []

  for (let j = startIdx; j < bodyLines.length; j++) {
    const line = bodyLines[j]
    if (looksLikeAuthorName(line)) break
    if (isNoise(line)) continue
    textLines.push(line)
  }

  return textLines.join("\n").trim()
}

function parseBody(bodyChunk: string): {
  body: Omit<ScrapedTestimonial, "author"> | null
  trailingAuthor: string | null
} {
  const bodyLines = linesFromChunk(bodyChunk)
  if (bodyLines.length < 2) return { body: null, trailingAuthor: null }

  let trailingAuthor: string | null = null
  const last = bodyLines[bodyLines.length - 1]
  if (bodyLines.length > 3 && last && looksLikeAuthorName(last)) {
    trailingAuthor = bodyLines.pop() ?? null
  }

  const authorTitle = bodyLines[0] ?? ""
  const relationship = bodyLines.find(isRelationship) ?? ""
  const relIdx = relationship ? bodyLines.indexOf(relationship) : 1
  const text = extractTextLines(bodyLines, relIdx + 1)

  if (text.length < 24) return { body: null, trailingAuthor }

  return {
    body: {
      authorTitle,
      text,
      relationship: relationship || undefined,
    },
    trailingAuthor,
  }
}

/** Parse recommendations page `main` innerText (owner view). */
export function parseTestimonialsFromText(raw: string): ScrapedTestimonial[] {
  const cleaned = raw
    .replace(/^[\s\S]*?Fornecidas\s*\n+/i, "")
    .replace(/^[\s\S]*?Given\s*\n+/i, "")
    .replace(/LinkedIn Corporation[\s\S]*$/i, "")
    .trim()

  if (!BADGE.test(cleaned)) {
    return parseTestimonialsLegacyBlocks(cleaned)
  }

  const segments = cleaned.split(BADGE)
  const results: ScrapedTestimonial[] = []
  let pendingAuthor: string | null = null

  let i = 0
  while (i < segments.length - 1) {
    const author = pendingAuthor ?? lastAuthorLine(segments[i] ?? "")
    pendingAuthor = null
    if (!author) {
      i++
      continue
    }

    const { body, trailingAuthor } = parseBody(segments[i + 1] ?? "")
    if (body) results.push({ author, ...body })
    pendingAuthor = trailingAuthor
    i++
  }

  const seen = new Set<string>()
  return results.filter((t) => {
    const key = testimonialKey(t.author)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Fallback when LinkedIn UI omits the connection badge line. */
function parseTestimonialsLegacyBlocks(cleaned: string): ScrapedTestimonial[] {
  if (!cleaned) return []

  const blocks = cleaned.split(/\n\n+(?=[A-ZÀ-Ú])/)
  const results: ScrapedTestimonial[] = []

  for (const block of blocks) {
    const lines = linesFromChunk(block)
    if (lines.length < 3) continue

    const author = lines[0] ?? ""
    if (!looksLikeAuthorName(author)) continue

    const authorTitle = lines[1] ?? ""
    const relationshipIdx = lines.findIndex((l, i) => i >= 1 && isRelationship(l))
    let textStart = 2
    let relationship: string | undefined

    if (relationshipIdx >= 0) {
      relationship = lines[relationshipIdx]
      textStart = relationshipIdx + 1
    }

    const text = extractTextLines(lines, textStart)
    if (text.length < 24) continue

    results.push({ author, authorTitle, text, relationship })
  }

  const seen = new Set<string>()
  return results.filter((t) => {
    const key = testimonialKey(t.author)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

export { testimonialKey }
