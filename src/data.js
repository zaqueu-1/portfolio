import teamzed from "./img/teamzed.png";
import atarefado from "./img/atarefado.png";
import linkspage from "./img/linkspage.png"

export const data = {
  about: {
    pt: `Desenvolvedor Front-end`,
    en: `Front-end Developer`,
  },

  skills: [
    "HTML",
    "CSS",
    "Bootstrap",
    "Javascript",
    "React",
    "StyledComponents",
    "Node",
    "Git"
  ],

  aboutme: {
    pt: `Atuo na Web há 13 anos, trazendo soluções que vão do design gráfico ao desenvolvimento de aplicações. Já fui professor, ministrei workshops e hoje trilho o caminho Front-end focando na qualidade dos projetos e experiência do usuário.`,
    en: 'Bringing web solutions, from graphic design to application development, since 2009. Experienced both as a teacher and host for workshops, nowadays I follow my path in front-end, always focusing on the quality and usability of my projects.',
    },

  projects: [
    {
      id: 1,
      title: `TeamZed | landing page`,
      desc: `Landing Page para minha equipe de Consultoria Esportiva, fundada em 2020, com intuito de divulgar o trabalho e modernizar o acesso.`,
      descEn: `Landing Page for my Sports Consulting Team, created in 2020, aiming to divulge my services and modernize access.`,
      stack: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Javascript",
      ],
      url: "https://teamzed.com.br",
      rep: "https://github.com/zaqueu-1/teamzed",
      img: teamzed,
    },
    {
      id: 2,
      title: `atarefa.DO | to-do list`,
      desc: `Projeto que começou como um estudo de aplicação de uma lista de tarefas simples, porém, foi recebendo melhorias com base no pedido de amigos próximos.`,
      descEn: `This project started as a study of simple 'to-do lists' patterns, but ended up receiving upgrades following requests of close friends of mine.`,
      stack: [        
      "HTML",
      "CSS",
      "Bootstrap",
      "Javascript",
      "Local Storage",
      ],
      url: "https://atarefa-do.vercel.app/",
      rep: "https://github.com/zaqueu-1/atarefa-do",
      img: atarefado,
    },
    {
      id: 3,
      title: `tree- | Link Page`,
      desc: `tree- é uma página de links no estilo Linktree, mas usando ícones ao invés de caixas de texto. Criado com intuito de desenvolver uma ferramenta própria para concentrar minhas informações de contato.`,
      descEn: `tree- is a linktree inpired tool that uses icons instead of text boxes. I developed this project so I had my own tool to put all my contact info and social media.`,
      stack: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Javascript",
      ],
      url: "https://tree-zaqueu.vercel.app/",
      rep: "https://github.com/zaqueu-1/tree-zaqueu",
      img: linkspage,
    },
  ],
};