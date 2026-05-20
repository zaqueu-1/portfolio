import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Locale } from "@/types/profile"

interface LocaleContextValue {
  locale: Locale
  lang: boolean
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
  t: <T extends { pt: string; en: string }>(value: T) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

/** PT when browser prefers Portuguese; EN-US otherwise (including unknown). */
function detectLocale(): Locale {
  if (typeof navigator === "undefined") return "en"

  const candidates = [navigator.language, ...(navigator.languages ?? [])]
    .filter(Boolean)
    .map((tag) => tag.toLowerCase())

  if (candidates.some((tag) => tag.startsWith("pt"))) return "pt"
  return "en"
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => detectLocale())

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US"
  }, [locale])

  const toggleLocale = useCallback(() => {
    setLocale((l) => (l === "pt" ? "en" : "pt"))
  }, [])

  const t = useCallback(
    <T extends { pt: string; en: string }>(value: T) => value[locale],
    [locale],
  )

  const value = useMemo(
    () => ({
      locale,
      lang: locale === "pt",
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, toggleLocale, t],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider")
  return ctx
}
