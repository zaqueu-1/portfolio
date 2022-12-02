import teamzed from "./img/teamzed.png";
import atarefado from "./img/atarefado.png";

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
    "NodeJs",
    "Git",
    "SQL"
  ],

  projects: [
    {
      id: 1,
      title: `Landing Page #TEAMZED`,
      desc: `Landing Page para minha equipe de Consultoria Esportiva, fundada em 2020, com intuito de divulgar o trabalho e modernizar o acesso. `,
      descEn: `Landing Page for my Sports Consulting Team, created in 2020, aiming to `,
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
      title: `atarefa.DO`,
      desc: `Projeto que começou como um estudo de aplicação de uma lista de tarefas simples, porém, foi recebendo melhorias com base no pedido de amigos próximos.`,
      descEn: `This project started as a study of simple 'to-do lists' patterns, but ended up receiving upgrades following requests of close friends of mine.`,
      stack: [        
      "HTML",
      "CSS",
      "Bootstrap",
      "Javascript",
      ],
      url: "https://atarefa-do.vercel.app/",
      rep: "https://github.com/zaqueu-1/atarefa-do",
      img: atarefado,
    },
  ],
};
