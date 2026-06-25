import { useEffect } from "react"
import type { Locale, Profile } from "@/types/profile"

const SITE_URL = "https://zaqueu.tech"

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

function setOg(property: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute("property", property)
    document.head.appendChild(el)
  }
  el.content = content
}

export function usePageMeta(profile: Profile | null, locale: Locale) {
  useEffect(() => {
    if (!profile) return

    const title =
      locale === "pt"
        ? `${profile.name} | Desenvolvedor Frontend`
        : `${profile.name} | Frontend Software Engineer`

    const description =
      locale === "pt"
        ? `${profile.name} — ${profile.headline.pt}. ${profile.location.pt}.`
        : `${profile.name} — ${profile.headline.en}. ${profile.location.en}.`

    const htmlLang = locale === "pt" ? "pt-BR" : "en-US"
    const ogLocale = locale === "pt" ? "pt_BR" : "en_US"
    const ogLocaleAlt = locale === "pt" ? "en_US" : "pt_BR"

    document.title = title
    document.documentElement.lang = htmlLang

    setMeta("description", description)

    setOg("og:title", title)
    setOg("og:description", description)
    setOg("og:url", SITE_URL)
    setOg("og:locale", ogLocale)
    setOg("og:locale:alternate", ogLocaleAlt)

    setOg("twitter:title", title)
    setOg("twitter:description", description)
    setOg("twitter:url", SITE_URL)
  }, [profile, locale])
}
