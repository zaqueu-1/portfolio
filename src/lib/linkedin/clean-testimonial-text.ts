/** Remove ruído do scrape e normaliza espaços. */
export function cleanTestimonialText(text: string): string {
  return text
    .replace(/\n+(Sobre|About)\s*\n+(Acessibilidade|Accessibility)\s*$/i, "")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .trim()
}
