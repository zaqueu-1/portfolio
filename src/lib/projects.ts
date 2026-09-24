import type { LocalizedString } from "@/types/profile"

export interface ProjectPreview {
  src: string
  poster: string
  width: number
  height: number
  label: LocalizedString
}

export interface Project {
  id: string
  name: string
  description: LocalizedString
  url: string
  urlLabel: string
  preview: ProjectPreview
}

export const PROJECTS: Project[] = [
  {
    id: "tron-charts",
    name: "Tron Charts",
    description: {
      pt: "Plataforma de trading com gráficos, DOM e paper trading em tempo real.",
      en: "Trading platform with real-time charts, DOM and paper trading.",
    },
    url: "https://app.troncharts.xyz/",
    urlLabel: "app.troncharts.xyz",
    preview: {
      src: "/showcase/tron-charts.webm",
      poster: "/showcase/tron-charts-poster.jpg",
      width: 1280,
      height: 558,
      label: {
        pt: "Prévia em vídeo do Tron Charts: gráfico de candles e DOM atualizando em tempo real.",
        en: "Video preview of Tron Charts: candlestick chart and DOM updating in real time.",
      },
    },
  },
  {
    id: "arcade-trading",
    name: "Arcade Trading",
    description: {
      pt: "Avaliação de trading para WINFUT e WDOFUT com dados reais da B3, operada no Tron Charts.",
      en: "Trading evaluation for WINFUT and WDOFUT with real B3 data, traded on Tron Charts.",
    },
    url: "https://arcadetrading.co/",
    urlLabel: "arcadetrading.co",
    preview: {
      src: "/showcase/arcade-trading.webm",
      poster: "/showcase/arcade-trading-poster.jpg",
      width: 1280,
      height: 800,
      label: {
        pt: "Prévia em vídeo do Arcade Trading: rolagem pela página inicial e transição para o painel do trader.",
        en: "Video preview of Arcade Trading: scrolling the home page, then fading into the trader dashboard.",
      },
    },
  },
  {
    id: "nutrispace",
    name: "NutriSpace",
    description: {
      pt: "Plataforma de nutrição para pacientes: consultas, progresso, exames e um feed social de refeições e treinos.",
      en: "Nutrition platform for patients: appointments, progress, lab results and a social feed of meals and workouts.",
    },
    url: "https://nutrispace.fit/",
    urlLabel: "nutrispace.fit",
    preview: {
      src: "/showcase/nutrispace.webm",
      poster: "/showcase/nutrispace-poster.jpg",
      width: 1280,
      height: 800,
      label: {
        pt: "Prévia em vídeo do NutriSpace: login com credenciais desfocadas e rolagem pelo feed.",
        en: "Video preview of NutriSpace: login with blurred credentials, then scrolling the feed.",
      },
    },
  },
]
