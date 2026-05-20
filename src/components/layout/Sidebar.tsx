import { useState } from "react"
import { Menu } from "lucide-react"
import { LangToggle } from "@/components/layout/LangToggle"
import { useLocale } from "@/context/LocaleContext"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const NAV = [
  { id: "about", pt: "Sobre", en: "About" },
  { id: "experiences", pt: "Experiência", en: "Experience" },
  { id: "testimonials", pt: "Recomendações", en: "Testimonials" },
  { id: "contact", pt: "Contato", en: "Contact" },
] as const

interface MobileNavProps {
  onNavigate: (section: string) => void
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const { lang } = useLocale()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="ds-link inline-flex items-center gap-2 md:hidden"
          aria-label={lang ? "Abrir menu" : "Open menu"}
        >
          <Menu className="size-4" strokeWidth={1.5} />
          <span>{lang ? "Menu" : "Menu"}</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="border-border bg-black font-mono uppercase tracking-[0.11em]"
      >
        <SheetHeader>
          <SheetTitle className="ds-label">~/</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-4">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ds-link text-left"
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
            >
              {lang ? item.pt : item.en}
            </button>
          ))}
          <div className="ds-divider pt-4">
            <LangToggle />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
