import { lazy, Suspense, useEffect, useRef, useState } from "react"
import { Dialog } from "radix-ui"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { OPEN_MAIL_EVENT, preloadMailComposer } from "@/lib/mail-events"
import type { MailDraft } from "@/components/mail/MailComposer"

const MailDialogContent = lazy(() =>
  import("@/components/mail/MailComposer").then((mod) => ({ default: mod.MailDialogContent })),
)

const EMPTY_DRAFT: MailDraft = { name: "", email: "", subject: "", html: "" }

export function CtaSection() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  // Survives closing the dialog so an accidental Esc never loses a message.
  const draftRef = useRef<MailDraft>(EMPTY_DRAFT)
  const externalOpenerRef = useRef<HTMLElement | null>(null)

  const setDialogOpen = (next: boolean) => {
    if (next) externalOpenerRef.current = null
    setOpen(next)
    if (next) setHasOpened(true)
  }

  useEffect(() => {
    const onOpen = () => {
      externalOpenerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setOpen(true)
      setHasOpened(true)
    }
    window.addEventListener(OPEN_MAIL_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_MAIL_EVENT, onOpen)
  }, [])

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <Dialog.Root open={open} onOpenChange={setDialogOpen}>
        <p className="ds-body">{t(copy.cta.prompt)}</p>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="cta-mail ds-display mt-4 cursor-pointer text-left"
            onPointerEnter={preloadMailComposer}
            onFocus={preloadMailComposer}
          >
            <span className="ds-prompt">$ </span>
            {t(copy.cta.link)}
            <span className="ds-block-caret" aria-hidden />
          </button>
        </Dialog.Trigger>
        {/* Stays mounted after first open so Radix can play the exit animation */}
        {hasOpened && (
          <Suspense fallback={null}>
            <MailDialogContent
              getReturnFocus={() => externalOpenerRef.current}
              draft={draftRef.current}
              onDraftChange={(draft) => {
                draftRef.current = draft
              }}
              onSent={() => {
                draftRef.current = EMPTY_DRAFT
              }}
            />
          </Suspense>
        )}
      </Dialog.Root>
    </section>
  )
}
