import type { LocalizedString } from "@/types/profile"

function ls(pt: string, en: string): LocalizedString {
  return { pt, en }
}

export const copy = {
  nav: {
    menuLabel: ls("Abrir menu", "Open menu"),
    sections: [
      { id: "about", label: ls("Sobre", "About") },
      { id: "experiences", label: ls("Experiência", "Experience") },
      { id: "testimonials", label: ls("Recomendações", "Testimonials") },
      { id: "contact", label: ls("Contato", "Contact") },
    ],
  },
  about: {
    title: ls("Sobre mim", "About me"),
    subtitle: ls(
      "Um pouco mais sobre minha trajetória, stack e o que me move como profissional:",
      "A bit more about my path, stack, and what drives me as a professional:",
    ),
  },
  experience: {
    title: ls("Experiência selecionada", "Selected work"),
    subtitle: ls(
      "Emprego atual, papéis anteriores e projetos que ainda representam bem meu trabalho.",
      "Current role, previous roles, and projects that still represent my work well.",
    ),
    currentRole: ls("Cargo atual", "Current role"),
    previousRole: ls("Experiência anterior", "Previous role"),
    viewCompany: ls("Ver empresa", "View company"),
  },
  testimonials: {
    title: ls("Recomendações", "Testimonials"),
    subtitle: ls(
      "O que colegas e parceiros dizem sobre trabalhar comigo.",
      "What colleagues and partners say about working with me.",
    ),
  },
  cta: {
    prompt: ls("Quer conversar? ", "Want to talk? "),
    link: ls("Envie um e-mail", "Send me an email"),
  },
} as const
