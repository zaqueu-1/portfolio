import { FlagBrazil, FlagUsa } from "@/components/ui/FlagIcon"
import { useLocale } from "@/context/LocaleContext"

const flagClass =
  "h-3 w-[1.05rem] shrink-0 rounded-[1px] border border-border/40 object-cover"

export function LangToggle() {
  const { lang, toggleLocale } = useLocale()
  const switchToEn = lang

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className="ds-nav-link inline-flex items-center gap-2 cursor-pointer"
      aria-label={switchToEn ? "Mudar para inglês" : "Mudar para português"}
    >
      {switchToEn ? (
        <>
          <FlagUsa className={flagClass} />
          <span>EN-US</span>
        </>
      ) : (
        <>
          <FlagBrazil className={flagClass} />
          <span>PT-BR</span>
        </>
      )}
    </button>
  )
}
