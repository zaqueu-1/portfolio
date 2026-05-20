function cleanAboutText(about: string): string {
  return about
    .replace(/\n… mais[\s\S]*$/i, "")
    .replace(/\n\nPrincipais competências[\s\S]*$/i, "")
    .replace(/\n\nMain competencies[\s\S]*$/i, "")
    .trim()
}

/** First paragraph only — shown in the hero. */
export function heroIntro(about: string): string {
  const cleaned = cleanAboutText(about)
  const firstParagraph = cleaned.split(/\n\n+/)[0]?.trim() ?? cleaned
  return firstParagraph.replace(/\n/g, " ").trim()
}

/** Remaining paragraphs — about section (skips hero intro). */
export function aboutBody(about: string): string {
  const parts = cleanAboutText(about)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  if (parts.length <= 1) return ""
  return parts.slice(1).join("\n\n")
}
