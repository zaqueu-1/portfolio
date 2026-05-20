function companyKey(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "")
}

/** Logos locais em `/public/img` — prioridade sobre URLs do LinkedIn. */
const LOCAL_LOGOS: Record<string, string> = {
  hurb: "/img/hurb.png",
  berrytech: "/img/berrytech.jpg",
  speedio: "/img/speedio.png",
  smcreativemarketing: "/img/smc.png",
  universidadedoestadodoriodejaneiro: "/img/ffp.jpeg",
  uerj: "/img/ffp.jpeg",
  ffp: "/img/ffp.jpeg",
  microlins: "/img/microlins.png",
}

export function resolveCompanyLogo(company: string): string | undefined {
  const key = companyKey(company)
  if (LOCAL_LOGOS[key]) return LOCAL_LOGOS[key]

  for (const [needle, path] of Object.entries(LOCAL_LOGOS)) {
    if (key.includes(needle) || needle.includes(key)) return path
  }

  return undefined
}

export function preferLocalLogo(
  company: string,
  scraped?: string,
): string | undefined {
  return resolveCompanyLogo(company) ?? scraped
}
