import { useState } from "react"
import { Menu } from "lucide-react"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MobileNavProps {
  onNavigate: (section: string) => void
}

export function MobileNav({ onNavigate }: MobileNavProps) {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="ds-nav-link inline-flex items-center gap-2 md:hidden"
          aria-label={t(copy.nav.menuLabel)}
        >
          <Menu className="size-4" strokeWidth={1.5} />
          <span>Menu</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-border bg-black font-mono uppercase tracking-[0.11em]"
      >
        <SheetHeader>
          <SheetTitle className="ds-label">~/</SheetTitle>
        </SheetHeader>
        <nav className="mt-8 flex flex-col gap-3">
          {copy.nav.sections.map((item) => (
            <button
              key={item.id}
              type="button"
              className="ds-link pl-4 text-left cursor-pointer"
              onClick={() => {
                onNavigate(item.id)
                setOpen(false)
              }}
            >
              {t(item.label)}
            </button>
          ))}
          <div className="ds-divider pt-4">
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
