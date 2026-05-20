const PT_MONTHS: Record<string, string> = {
  jan: "01", fev: "02", mar: "03", abr: "04", mai: "05", jun: "06",
  jul: "07", ago: "08", set: "09", out: "10", nov: "11", dez: "12",
}

const EN_MONTHS: Record<string, string> = {
  jan: "01", feb: "02", mar: "03", apr: "04", may: "05", jun: "06",
  jul: "07", aug: "08", sep: "09", oct: "10", nov: "11", dec: "12",
}

export function parseDateRange(text: string): { startDate?: string; endDate?: string } {
  if (!text?.trim()) return {}

  const isPresent = /present|atual|o momento|atualmente|current/i.test(text)
  const parts = text.split(/\s*[-–—]\s*/)
  const parsePart = (part: string, months: Record<string, string>): string | undefined => {
    const m = part.trim().match(/(\w{3,})\.?\s*(?:de\s+)?(\d{4})/i)
    if (!m) return undefined
    const mon = months[m[1].slice(0, 3).toLowerCase()]
    if (!mon) return undefined
    return `${m[2]}-${mon}-01`
  }

  const months = /[a-z]{3}\s+de\s+\d{4}/i.test(text) ? PT_MONTHS : EN_MONTHS
  const startDate = parsePart(parts[0] ?? "", months)
  const endDate = isPresent ? undefined : parsePart(parts[1] ?? "", months)

  return { startDate, endDate }
}
