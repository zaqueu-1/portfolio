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

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt")

  useEffect(() => {
    const nav = navigator.language
    if (nav && !nav.startsWith("pt")) setLocale("en")
  }, [])

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
