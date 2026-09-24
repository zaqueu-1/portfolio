import { useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import { EditorContent, useEditor, useEditorState } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import TextAlign from "@tiptap/extension-text-align"
import { Color, FontFamily, FontSize, TextStyle } from "@tiptap/extension-text-style"
import { Placeholder } from "@tiptap/extensions"
import { Dialog } from "radix-ui"
import { X } from "lucide-react"
import { MailToolbar } from "@/components/mail/MailToolbar"
import { useSendMail } from "@/components/mail/useSendMail"
import { useLocale } from "@/context/LocaleContext"
import { CONTACT_EMAIL } from "@/lib/constants"
import { CONTACT_LIMITS, ContactSchema } from "@/lib/contact-schema"
import { copy } from "@/lib/copy"
import { cn } from "@/lib/utils"

export interface MailDraft {
  name: string
  email: string
  subject: string
  html: string
}

type FieldKey = "name" | "email" | "body"
type FieldErrors = Partial<Record<FieldKey, string>>

interface MailComposerProps {
  draft: MailDraft
  onDraftChange: (draft: MailDraft) => void
  onSent: () => void
}

const m = copy.mail

interface HeaderFieldProps {
  id: string
  label: string
  value: string
  placeholder: string
  type?: string
  autoComplete?: string
  maxLength: number
  error?: string
  onChange: (value: string) => void
}

function HeaderField({ id, label, value, placeholder, type = "text", autoComplete, maxLength, error, onChange }: HeaderFieldProps) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 border-b border-border px-4 py-2 sm:grid-cols-[8rem_1fr]">
      <label htmlFor={id} className="ds-label ds-prompt">
        {label}:
      </label>
      <div className="min-w-0">
        <input
          id={id}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className="mail-input w-full bg-transparent py-1 outline-none"
        />
        {error && (
          <p id={`${id}-error`} className="ds-label pt-1 text-destructive">
            ! {error}
          </p>
        )}
      </div>
    </div>
  )
}

export default function MailComposer({ draft, onDraftChange, onSent }: MailComposerProps) {
  const { t } = useLocale()
  const { status, send } = useSendMail()
  const [fields, setFields] = useState(draft)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [honeypot, setHoneypot] = useState("")
  const openedAt = useRef(Date.now())
  const fieldsRef = useRef(fields)

  const update = (patch: Partial<MailDraft>) => {
    const next = { ...fieldsRef.current, ...patch }
    fieldsRef.current = next
    setFields(next)
    onDraftChange(next)
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, protocols: ["mailto"] },
      }),
      TextStyle,
      FontFamily,
      FontSize,
      Color,
      TextAlign.configure({ types: ["paragraph"] }),
      Placeholder.configure({ placeholder: t(m.bodyPlaceholder) }),
    ],
    content: draft.html,
    editorProps: {
      attributes: {
        class: "mail-editor",
        "aria-label": t(m.bodyPlaceholder),
        "aria-multiline": "true",
        role: "textbox",
      },
    },
    onUpdate: ({ editor: e }) => update({ html: e.getHTML() }),
  })

  const charCount = useEditorState({
    editor,
    selector: ({ editor: e }) => e?.getText().trim().length ?? 0,
  })

  const isSending = status.state === "sending"
  const isSent = status.state === "sent"

  const submit = async () => {
    if (!editor || isSending) return
    const text = editor.getText().trim()
    const nextErrors: FieldErrors = {}
    if (!fields.name.trim()) nextErrors.name = t(m.errors.name)
    if (!ContactSchema.shape.email.safeParse(fields.email.trim()).success) nextErrors.email = t(m.errors.email)
    if (!text) nextErrors.body = t(m.errors.body)
    else if (text.length > CONTACT_LIMITS.text) nextErrors.body = t(m.errors.tooLong)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const delivered = await send({
      name: fields.name.trim(),
      email: fields.email.trim(),
      subject: fields.subject.trim(),
      html: editor.getHTML(),
      text,
      website: honeypot,
      startedAt: openedAt.current,
    })
    if (delivered) onSent()
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void submit()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      void submit()
    }
  }

  const failureText =
    status.state === "failed"
      ? t(
          status.reason === "rate_limited"
            ? m.errors.rateLimited
            : status.reason === "network"
              ? m.errors.network
              : m.errors.server,
        )
      : ""

  if (isSent) {
    return (
      <div className="flex flex-col gap-4 px-4 py-6" role="status">
        <p className="ds-label text-foreground">
          <span className="ds-prompt">$</span> mail --send
        </p>
        <p className="ds-label text-foreground">
          <span className="ds-role-label">[ OK ]</span> {t(m.success)}
        </p>
        <Dialog.Close asChild>
          <button type="button" className="ds-link self-start cursor-pointer">
            [ exit 0 ]
          </button>
        </Dialog.Close>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="flex min-h-0 flex-1 flex-col" noValidate>
      <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-3 border-b border-border px-4 py-2 sm:grid-cols-[8rem_1fr]">
        <span className="ds-label ds-prompt">to:</span>
        <span className="ds-label text-foreground">eduardo zaqueu</span>
      </div>
      <HeaderField
        id="mail-name"
        label={t(m.name)}
        value={fields.name}
        placeholder={t(m.namePlaceholder)}
        autoComplete="name"
        maxLength={CONTACT_LIMITS.name}
        error={errors.name}
        onChange={(name) => update({ name })}
      />
      <HeaderField
        id="mail-email"
        label={t(m.email)}
        type="email"
        value={fields.email}
        placeholder={t(m.emailPlaceholder)}
        autoComplete="email"
        maxLength={CONTACT_LIMITS.email}
        error={errors.email}
        onChange={(email) => update({ email })}
      />
      <HeaderField
        id="mail-subject"
        label={t(m.subject)}
        value={fields.subject}
        placeholder={t(m.subjectPlaceholder)}
        maxLength={CONTACT_LIMITS.subject}
        onChange={(subject) => update({ subject })}
      />

      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] size-px opacity-0"
      />

      {editor && <MailToolbar editor={editor} />}

      <div className="min-h-[200px] flex-1 overflow-y-auto px-4 py-3" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
      {errors.body && <p className="ds-label px-4 pb-2 text-destructive">! {errors.body}</p>}

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border px-4 py-2.5">
        <div className="ds-label min-w-0 flex-1" aria-live="polite">
          {isSending && (
            <span className="text-foreground">
              {t(m.sending)}
              <span className="ds-block-caret" aria-hidden />
            </span>
          )}
          {status.state === "failed" && (
            <span className="text-destructive">
              [FAIL] {failureText}{" "}
              <span className="ds-muted">
                {t(m.fallback)}{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="ds-link normal-case">
                  {CONTACT_EMAIL}
                </a>
              </span>
            </span>
          )}
          {status.state === "idle" && <span>-- insert --</span>}
        </div>
        <span
          className={cn("ds-label tabular-nums", charCount > CONTACT_LIMITS.text && "text-destructive")}
          aria-label={`${charCount} / ${CONTACT_LIMITS.text}`}
        >
          {charCount}/{CONTACT_LIMITS.text}
        </span>
        <button
          type="submit"
          disabled={isSending}
          className="ds-nav-link inline-flex cursor-pointer items-center gap-2 border border-[hsl(var(--lilac))] px-3 py-1.5 disabled:cursor-wait disabled:opacity-50"
          title={t(m.shortcut)}
        >
          <span className="ds-role-label" aria-hidden>↵</span>
          {t(m.send)}
        </button>
      </div>
    </form>
  )
}

interface MailDialogContentProps extends MailComposerProps {
  onClose?: () => void
}

export function MailDialogContent(props: MailDialogContentProps) {
  const { t } = useLocale()
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="mail-overlay fixed inset-0 z-50 bg-black/85" />
      <Dialog.Content
        className="mail-window fixed top-1/2 left-1/2 z-50 flex max-h-[min(90dvh,760px)] w-[min(860px,calc(100vw-2rem))] flex-col border border-border bg-background normal-case"
        aria-describedby={undefined}
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5">
          <Dialog.Title className="ds-label truncate text-foreground">
            <span className="ds-prompt">~/contact $</span> mail eduardo
            <span className="sr-only"> ({t(m.title)})</span>
          </Dialog.Title>
          <Dialog.Close asChild>
            <button
              type="button"
              className="ds-nav-link inline-flex cursor-pointer items-center gap-1.5 text-[calc(0.75rem-1pt)]"
              aria-label={t(m.close)}
            >
              esc
              <X className="size-3.5" strokeWidth={1.5} />
            </button>
          </Dialog.Close>
        </div>
        <MailComposer {...props} />
      </Dialog.Content>
    </Dialog.Portal>
  )
}
