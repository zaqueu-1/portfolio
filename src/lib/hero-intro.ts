export function heroIntro(about: string): string {
  const cleaned = about
    .replace(/\n… mais[\s\S]*$/i, "")
    .replace(/\n\nPrincipais competências[\s\S]*$/i, "")
    .replace(/\n\nMain competencies[\s\S]*$/i, "")
    .trim()

  const firstParagraph = cleaned.split(/\n\n+/)[0]?.trim() ?? cleaned
  return firstParagraph.replace(/\n/g, " ").trim()
}
