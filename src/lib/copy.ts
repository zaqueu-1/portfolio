import type { LocalizedString } from "@/types/profile"

function ls(pt: string, en: string): LocalizedString {
  return { pt, en }
}

export const copy = {
  nav: {
    menuLabel: ls("Abrir menu", "Open menu"),
    sections: [
      { id: "about", label: ls("Sobre", "About") },
      { id: "project", label: ls("Projeto", "Project") },
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
    expand: ls("Ler recomendação completa", "Read full testimonial"),
    collapse: ls("Recolher recomendação", "Collapse testimonial"),
  },
  cta: {
    prompt: ls("Quer conversar? ", "Want to talk? "),
    link: ls("Envie um e-mail", "Send me an email"),
  },
  hero: {
    scrollHint: ls("cd ./about", "cd ./about"),
  },
  project: {
    title: ls("Projetos", "Projects"),
    open: ls("Abrir", "Open"),
    play: ls("Reproduzir prévia", "Play preview"),
    pause: ls("Pausar prévia", "Pause preview"),
  },
  footer: {
    hint: ls('psst: digite "whoami"', 'psst: type "whoami"'),
  },
  easterEgg: {
    close: ls("Fechar terminal", "Close terminal"),
    lines: [
      ls("hello, friend.", "hello, friend."),
      ls(
        "hello, friend? isso é bobo. talvez eu devesse te dar um nome.",
        "hello, friend? that's lame. maybe i should give you a name.",
      ),
      ls("eduardo zaqueu. frontend engineer. rio de janeiro.", "eduardo zaqueu. frontend engineer. rio de janeiro."),
      ls("se chegou até aqui, a gente devia conversar.", "if you made it this far, we should talk."),
    ],
    mail: ls("mail eduardo", "mail eduardo"),
  },
  mail: {
    title: ls("nova mensagem", "new message"),
    close: ls("Fechar", "Close"),
    name: ls("de", "from"),
    namePlaceholder: ls("seu nome", "your name"),
    email: ls("responder para", "reply-to"),
    emailPlaceholder: ls("voce@dominio.com", "you@domain.com"),
    subject: ls("assunto", "subject"),
    subjectPlaceholder: ls("sobre o que vamos falar?", "what's this about?"),
    bodyPlaceholder: ls("Escreva sua mensagem...", "Write your message..."),
    toolbar: ls("Formatação", "Formatting"),
    tools: {
      bold: ls("Negrito", "Bold"),
      italic: ls("Itálico", "Italic"),
      underline: ls("Sublinhado", "Underline"),
      strike: ls("Tachado", "Strikethrough"),
      code: ls("Código", "Code"),
      font: ls("Fonte", "Font"),
      size: ls("Tamanho", "Size"),
      color: ls("Cor do texto", "Text color"),
      bulletList: ls("Lista", "Bullet list"),
      orderedList: ls("Lista numerada", "Numbered list"),
      quote: ls("Citação", "Quote"),
      alignLeft: ls("Alinhar à esquerda", "Align left"),
      alignCenter: ls("Centralizar", "Align center"),
      alignRight: ls("Alinhar à direita", "Align right"),
      link: ls("Link", "Link"),
      linkPrompt: ls("URL do link (https://...)", "Link URL (https://...)"),
      undo: ls("Desfazer", "Undo"),
      redo: ls("Refazer", "Redo"),
      clear: ls("Limpar formatação", "Clear formatting"),
    },
    send: ls("enviar", "send"),
    sending: ls("transmitindo...", "transmitting..."),
    shortcut: ls("ctrl/⌘ + enter", "ctrl/⌘ + enter"),
    success: ls("mensagem entregue. respondo em breve.", "message delivered. i'll get back to you soon."),
    errors: {
      name: ls("informe seu nome", "enter your name"),
      email: ls("e-mail inválido", "invalid email"),
      body: ls("mensagem vazia", "empty message"),
      tooLong: ls("mensagem longa demais", "message too long"),
      rateLimited: ls("muitas tentativas. tente em alguns minutos.", "too many attempts. try again in a few minutes."),
      network: ls("falha na conexão. tente de novo ou use o e-mail direto.", "connection failed. retry or use email directly."),
      server: ls("falha no envio. tente de novo ou use o e-mail direto.", "delivery failed. retry or use email directly."),
    },
    fallback: ls("ou escreva direto para", "or write directly to"),
  },
} as const
