import { useEffect, useState } from "react"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { prefersReducedMotion } from "@/lib/typewriter"

export const WHOAMI_EVENT = "zaqueu:whoami"

const TRIGGERS = ["whoami", "hellofriend"]
const BUFFER_MAX = 16
const LINE_MS = 650

export function openWhoami() {
  window.dispatchEvent(new Event(WHOAMI_EVENT))
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
}

export function WhoamiTerminal() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(0)
  const lines = copy.easterEgg.lines

  useEffect(() => {
    let buffer = ""
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || isTypingTarget(e.target)) return
      if (!/^[a-z]$/i.test(e.key)) return
      buffer = (buffer + e.key.toLowerCase()).slice(-BUFFER_MAX)
      if (TRIGGERS.some((word) => buffer.endsWith(word))) {
        buffer = ""
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(WHOAMI_EVENT, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(WHOAMI_EVENT, onOpen)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    if (prefersReducedMotion()) {
      setShown(lines.length)
      return
    }
    setShown(0)
    const id = window.setInterval(() => {
      setShown((n) => {
        if (n >= lines.length) window.clearInterval(id)
        return Math.min(lines.length, n + 1)
      })
    }, LINE_MS)
    return () => window.clearInterval(id)
  }, [open, lines.length])

  const goToContact = () => {
    setOpen(false)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="mail-overlay fixed inset-0 z-50 bg-black/85" />
        <Dialog.Content
          className="mail-window fixed top-1/2 left-1/2 z-50 w-[min(560px,calc(100vw-2rem))] border border-border bg-background"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <Dialog.Title className="ds-label text-foreground">
              <span className="ds-prompt">~ $</span> whoami
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="ds-nav-link inline-flex cursor-pointer items-center gap-1.5 text-[calc(0.75rem-1pt)]"
                aria-label={t(copy.easterEgg.close)}
              >
                esc
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            </Dialog.Close>
          </div>
          <ol className="ds-label space-y-3 px-4 py-5 text-foreground" aria-live="polite">
            {lines.slice(0, shown).map((line) => (
              <li key={line.en}>
                <span className="ds-prompt">&gt; </span>
                {t(line)}
              </li>
            ))}
            {shown < lines.length && (
              <li aria-hidden>
                <span className="ds-block-caret" />
              </li>
            )}
            {shown >= lines.length && (
              <li>
                <button type="button" className="ds-link cursor-pointer" onClick={goToContact}>
                  $ {t(copy.easterEgg.mail)}
                </button>
              </li>
            )}
          </ol>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
