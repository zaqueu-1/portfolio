/** Quebra descrições LinkedIn (•, ;, newline) em bullets */
export function formatDescription(text: string): string[] {
  if (!text?.trim()) return []

  const normalized = text.replace(/^\s*-\s+/gm, "• ")

  const junk =
    /competências|skills$|Configurações|Central de Ajuda|LinkedIn Corporation|^\w+ \(\w+\)$|e mais \d+|and \d+ more skills|Trabalho em equipe/i

  return normalized
    .split(/\n+|(?:\s*•\s*)|(?:\s*;\s*)/)
    .map((s) => s.trim().replace(/^[-–]\s*/, ""))
    .filter((s) => s.length > 2 && !junk.test(s))
}

const MONTHS_PT = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
]
const MONTHS_EN = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

function fmtMonthYear(iso: string, lang: boolean): string {
  const [y, m] = iso.split("-")
  const idx = Number(m) - 1
  const months = lang ? MONTHS_PT : MONTHS_EN
  return `${months[idx] ?? m}. ${y}`
}

export function formatPeriod(
  startDate?: string,
  endDate?: string,
  lang = true,
): string | null {
  if (!startDate) return null
  const start = fmtMonthYear(startDate, lang)
  if (!endDate) {
    return lang ? `${start} — atual` : `${start} — present`
  }
  return `${start} — ${fmtMonthYear(endDate, lang)}`
}

/** LinkedIn relationship lines include a leading date; keep context, drop the date. */
export function stripRelationshipDate(text: string): string {
  const trimmed = text.trim()
  if (!trimmed) return ""

  return trimmed
    .replace(/^Em\s+\d{1,2}\s+de\s+.+?\s+de\s+\d{4},?\s*/iu, "")
    .replace(/^On\s+[A-Za-z]+\s+\d{1,2},\s+\d{4},?\s*/i, "")
    .trim()
}
