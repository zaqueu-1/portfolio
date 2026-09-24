import { lazy, Suspense, useRef, useState } from "react"
import { Dialog } from "radix-ui"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import type { MailDraft } from "@/components/mail/MailComposer"

const loadComposer = () => import("@/components/mail/MailComposer")
const MailDialogContent = lazy(() =>
  loadComposer().then((mod) => ({ default: mod.MailDialogContent })),
)

const EMPTY_DRAFT: MailDraft = { name: "", email: "", subject: "", html: "" }

export function CtaSection() {
  const { t } = useLocale()
  const [open, setOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  // Survives closing the dialog so an accidental Esc never loses a message.
  const draftRef = useRef<MailDraft>(EMPTY_DRAFT)

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-24 md:py-32">
      <Dialog.Root
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (next) setHasOpened(true)
        }}
      >
        <p className="ds-body">{t(copy.cta.prompt)}</p>
        <Dialog.Trigger asChild>
          <button
            type="button"
            className="cta-mail ds-display mt-4 cursor-pointer text-left"
            onPointerEnter={() => void loadComposer()}
            onFocus={() => void loadComposer()}
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
