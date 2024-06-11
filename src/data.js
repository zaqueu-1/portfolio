
export const data = {
  about: {
    pt: `Desenvolvedor Front-end`,
    en: `Front-end Software Engineer`,
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

  experiences: [
    {
      id: 1,
      title_pt: "Desenvolvedor Front-end",
      title_en: "Front-end Software Engineer",
      company: "Hurb",
      date: "06/2024",
      desc_pt: "Recém-chegado ao time da Hurb, tenho a missão de contribuir para elevar a qualidade do front-end da empresa. Mesmo se for preciso lidar com outras tecnologias, estou pronto para o desafio.",
      desc_en: "Newcommer to Front-end Engineering at Hurb. My mission is to elevate the company's front-end, as well working with other technologies.",
      stack: [
        "NextJS",
        "ReactJS",
        "NodeJS",
        "JavaScript",
      ],
      img: "img/hurb.png",
    },
    {
      id: 2,
      title_pt: "Desenvolvedor Front-end",
      title_en: "Front-end Software Engineer",
      company: "Berrytech",
      date: "03/2024 - 06/2024",
      desc_pt: "Contribuí para a atualização da plataforma Maia, desenvolvendo novas funcionalidades, componentes e participando de sua integração com IAs. Tive também a oportunidade de ampliar minha stack.",
      desc_en: "Contributed in upgrading the Maia platform, developing new features, components and participating in its integration with IAs. I also had the opportunity to expand my stack.",
      stack: [
        "ReactJS",
        "NodeJS",
        "TypeScript",
        "Tailwind",
        "graphQL",
        "shadcn/ui",
        "Legend State",
      ],
      img: "img/berrytech.jpg",
    },
    {
      id: 3,
      title_pt: "Desenvolvedor Front-end",
      title_en: "Front-end Software Engineer",
      company: "Speedio",
      date: "07/2023 - 03/2024",
      desc_pt: "Fui responsável por aprimorar a plataforma Atlas, desenvolvendo funcionalidades, corrigindo bugs e garantindo a qualidade, clareza e integração da interface com o backend.",
      desc_en: "I was responsible for improving the Atlas platform, developing features, fixing bugs and ensuring the quality, clarity and integration of the interface with the backend.",
      stack: [
        "VueJS",
        "Rails",
        "TypeScript",
        "Quasar",
        "MongoDB",
        "Overmind",
        "RabbitMQ",
        "Elastic Search",
      ],
      img: "img/speedio.png",
    },
    {
      id: 4,
      title_pt: "Desenvolvedor Front-end",
      title_en: "Front-end Software Engineer",
      company: "SM Creative Marketing",
      date: "01/2022 - 07/2023",
      desc_pt: "Comecei aqui minha jornada dev como freelancer, onde desenvolvia projetos para pequenas e médias empresas com a stack MERN. ",
      desc_en: "I began my dev journey here as a freelancer, where I developed projects for small and medium-sized companies with the MERN stack.",
      stack: [
        "NextJS",
        "ReactJS",
        "NodeJS",
        "MongoDB",
      ],
      img: "img/smc.png",
    },
  ],

  projects: [
    {
      id: 1,
      title: `Vanderlei Moraes`,
      desc: `Trabalho desenvolvido para cliente, seguindo especificações do mesmo. O foco está na responsividade, uma vez que seu público-alvo virá do Instagram.`,
      descEn: `Work developed to a client, following his guidelines. The page is focused on being responsible, since most of his public comes from Instagram.`,
      stack: [
        "NextJS",
      ],
      url: "https://vanderleimoraespro.vercel.app/",
      rep: "",
      img: 'https://i.imgur.com/zM0DmhT.gif',

    },
    {
      id: 2,
      title: `NovaMP Engenharia`,
      desc: `Trabalho desenvolvido para empresa de serviços de Engenharia. Conta também com uma página de links em /links (exclusivamente para a divulgação pelo Instagram). `,
      descEn: `Work developed to an engineering services company. It also has a links page at /links.`,
      stack: [
        "NextJS",
      ],
      url: "https://novampeng.com.br",
      rep: "",
      img: 'https://i.imgur.com/sRSS0NT.gif',

    },
    {
      id: 3,
      title: `SM Creative Marketing`,
      desc: `Trabalho desenvolvido para a agência de marketing onde atuei. Conta também com uma página de links em /links e uma página de serviços em /servicos. `,
      descEn: `Work developed to a marketing agency where I worked as a Developer. It also has a links page at /links and a services pages at /servicos.`,
      stack: [
        "NextJS",
      ],
      url: "https://smcreativemarketing.com.br",
      rep: "",
      img: 'https://i.imgur.com/mPq08kE.gif',

    },
    {
      id: 4,
      title: `NutriSpace`,
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
      id: 5,
      title: `já.vendi`,
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
      id: 6,
      title: `memo`,
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
      id: 7,
      title: `Pomo-you`,
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
      id: 8,
      title: `TTD`,
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
      id: 9,
      title: `Decker`,
      desc: `Construtor de baralhos para meu jogo de cartas favorito, Magic the Gathering, consumindo a API do Scryfall. Nele é possível é registrar baralhos, pesquisar por cards e até mesmo visualizar seus decks salvos.`,
      descEn: `Deckbuilder for my favorite card game, Magic the Gathering, consuming Scryfall API. It's possible to save, register, search for cards and even visualize your own decks.`,
      stack: [
        "ReactJS",
        "LocalStorage",
      ],
      url: "https://decker-xi.vercel.app/",
      rep: "https://github.com/zaqueu-1/decker",
      img: 'https://github.com/zaqueu-1/decker/blob/main/github/demo.gif?raw=true',

    },
  ],
};