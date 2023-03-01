
export const data = {
  about: {
    pt: `Desenvolvedor Front-end`,
    en: `Front-end Developer`,
  },

  aboutme: {
    pt: `Atuo na Web há 14 anos, trazendo soluções que vão do design gráfico ao desenvolvimento de aplicações. Já fui professor, ministrei workshops e hoje trilho o caminho Front-end focando na qualidade dos projetos e experiência do usuário.`,
    en: 'Bringing web solutions, from graphic design to application development, since 2009. Experienced both as a teacher and host for workshops, nowadays I follow my path in front-end, always focusing on the quality and usability of my projects.',
    },

    skills: [
      "HTML",
      "CSS",
      "Javascript",
      "MongoDB",
      "Express",
      "React",
      "Node"
    ],

  projects: [
    {
      id: 1,
      title: `NutriSpace | Plataforma para Nutricionistas`,
      desc: `Plataforma para cadastro de pacientes e gerenciamento de consultas. Desenvolvida usando a stack MERN, conta com back-end em NodeJS e front-end em ReactJS.`,
      descEn: `Plataform for managing and registering patients and it's respectives appointments. Developed with MERN stack technologies, using NodeJS for back-end and ReactJS for front-end`,
      stack: [
        "MongoDB",
        "Express",
        "ReactJS",
        "NodeJS"
      ],
      url: "https://nutrispace.vercel.app/",
      rep: "https://github.com/zaqueu-1/nutrispace",
      img: 'https://github.com/zaqueu-1/nutrispace/blob/main/github/demo.gif?raw=true',
    },
    {
      id: 2,
      title: `já.vendi | Plataforma de Vendas`,
      desc: `já.vendi é uma plataforma de venda de produtos e serviços onde é possível montar uma loja virtual e gerir anúncios, servindo com uma ponte entre comprador e vendedor.`,
      descEn: `já.vendi is platform for selling products and services where it's possible to assemble a virtual store and manage ads, serving as a link between seller and buyer.`,
      stack: [
        "MongoDB",
        "Express",
        "ReactJS",
        "NodeJS"
      ],
      url: "https://javendi.vercel.app/",
      rep: "https://github.com/zaqueu-1/javendi",
      img: 'https://github.com/zaqueu-1/javendi/blob/main/github/demo.gif?raw=true',

    },
    {
      id: 3,
      title: `memo | CRUD estilo Trello`,
      desc: `Projeto que começou como um estudo de aplicação de uma lista de tarefas e foi recebendo melhorias. Trata-se de um organizador de tarefas no estilo Trello/Kanban, trazendo simplicidade e praticidade de uso.`,
      descEn: `This project started as a study of 'to-do lists' patterns, but ended up receiving upgrades. It's a task organizing tool, similar to Trello/Kanban, bringing simplicity and practicality to use.`,
      stack: [        
      "ReactJS",
      "LocalStorage",
      ],
      url: "https://memo-blond.vercel.app/",
      rep: "https://github.com/zaqueu-1/memo",
      img: 'https://github.com/zaqueu-1/memo/blob/main/github/memo-demo.gif?raw=true',

    },
    {
      id: 4,
      title: `Pomo-you| Pomodoro`,
      desc: `Desenvolvido em ReactJS, trata-se de uma ferramenta para aplicar a técnica de estudo Pomodoro, que consiste em intercalar seu tempo de estudos com descansos pré-definidos.`,
      descEn: `Developed with ReactJS, It's a tool to apply the Pomodoro technique into your studying time. That technique consists on intersperse your study time with predefined breaks.`,
      stack: [
        "ReactJS",
      ],
      url: "https://pomoyou.vercel.app/",
      rep: "https://github.com/zaqueu-1/pomoyou",
      img: 'https://github.com/zaqueu-1/pomoyou/blob/main/github/pomodoro.gif?raw=true',
    },
    {
      id: 5,
      title: `TTD | Organizador de Treinos`,
      desc: `Treino Todo Dia (TTD) é um organizador de treinos onde é possível cadastrar exercícios incluindo carga, repetições e séries, além de poder salvar e carregar listas em formato .json.`,
      descEn: `Training Every Day (translated from PT-BR) is a gym training planner where it's possible to include reps, volume load and sets. It's also possible to save and load lists in .json format`,
      stack: [
        "ReactJS",
        "LocalStorage",
      ],
      url: "https://ttd-kappa.vercel.app/",
      rep: "https://github.com/zaqueu-1/ttd",
      img: 'https://github.com/zaqueu-1/ttd/blob/main/chrome-capture-2023-1-1.gif?raw=true',

    },
    {
      id: 6,
      title: `Pokédex | PokeAPI + Web Scrapping`,
      desc: `Nesse projeto, trabalhei a requisição de dados à uma API pública (PokéAPI), e usei web scrapping para pegar dados que ainda não foram atualizados na API em questão. Utilizei React em todo o desenvolvimento, além de elementos da MUI que modifiquei a meu gosto.`,
      descEn: `In this project, I fetched data from a public API (PokeAPI), also using web scrapping to get updated data that is not yet present on PokeAPI. I used React and some elements from MUI that I adapted myself to this project.`,
      stack: [
        "ReactJS",
        "MUI",
      ],
      url: "https://pokedex-zaqueu-1.vercel.app/",
      rep: "https://github.com/zaqueu-1/pokedex",
      img: 'https://github.com/zaqueu-1/pokedex/blob/main/chrome-capture-2023-0-17.gif?raw=true',

    },
  ],
};