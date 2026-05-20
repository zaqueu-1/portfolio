import { describe, expect, it } from "vitest"
import { parseTestimonialsFromText } from "../parse-testimonials"

const LINKEDIN_FIXTURE = `Recomendações

Recebidas
Fornecidas

Victor Hugo Mendes de Moraes

· 1º

Desenvolvedor Back-end | Java | C++

Em 14 de março de 2023, Victor Hugo trabalhou na mesma equipe que Eduardo

Todos os usuários do LinkedIn

Ativada

Conheço o Zaqueu desde 2010 e já trabalhei com ele em duas oportunidades.

Jônatas Quirino Souza

· 1º

Inside Sales Strategist | AI Technology | Closer | Account Executive

Em 17 de fevereiro de 2023, Jônatas trabalhou com Eduardo, mas em equipes diferentes

Todos os usuários do LinkedIn

Ativada

O Zaqueu é uma das pessoas que mais me auxiliaram em projetos Web.`

describe("parseTestimonialsFromText", () => {
  it("parses LinkedIn recommendations layout with connection badge", () => {
    const items = parseTestimonialsFromText(LINKEDIN_FIXTURE)
    expect(items).toHaveLength(2)
    expect(items[0]?.author).toBe("Victor Hugo Mendes de Moraes")
    expect(items[0]?.authorTitle).toContain("Back-end")
    expect(items[0]?.text).toContain("Conheço o Zaqueu")
    expect(items[1]?.author).toBe("Jônatas Quirino Souza")
    expect(items[1]?.text).toContain("auxiliaram")
  })
})
