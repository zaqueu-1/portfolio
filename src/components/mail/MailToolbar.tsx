import type { ComponentType } from "react"
import { useEditorState, type Editor } from "@tiptap/react"
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  type LucideProps,
} from "lucide-react"
import { useLocale } from "@/context/LocaleContext"
import { copy } from "@/lib/copy"
import { cn } from "@/lib/utils"

const tools = copy.mail.tools

export const FONT_OPTIONS = [
  { label: "matrix", value: "" },
  { label: "mono", value: "ui-monospace, Menlo, Consolas, monospace" },
  { label: "sans", value: "Helvetica, Arial, sans-serif" },
  { label: "serif", value: "Georgia, 'Times New Roman', serif" },
] as const

export const SIZE_OPTIONS = ["", "12px", "14px", "18px", "24px", "32px"] as const

export const COLOR_OPTIONS = [
  { label: "default", value: "" },
  { label: "lilac", value: "#c38ee1" },
  { label: "dim", value: "#8c8c8c" },
] as const

interface ToolButtonProps {
  icon: ComponentType<LucideProps>
  label: string
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
}

function ToolButton({ icon: Icon, label, isActive = false, disabled = false, onClick }: ToolButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={isActive}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={cn(
        "inline-flex size-8 cursor-pointer items-center justify-center text-foreground transition-colors duration-100",
        "hover:bg-[hsl(var(--lilac))] hover:text-background",
        "disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground",
        isActive && "bg-foreground text-background",
      )}
    >
      <Icon className="size-3.5" strokeWidth={1.5} />
    </button>
  )
}

function Divider() {
  return <span className="mx-1 h-4 w-px bg-border" aria-hidden />
}

const selectClass =
  "h-8 cursor-pointer border border-border bg-background px-2 text-[calc(0.75rem-1pt)] uppercase tracking-[0.11em] text-foreground hover:border-[hsl(var(--lilac))]"

export function MailToolbar({ editor }: { editor: Editor }) {
  const { t } = useLocale()
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive("bold"),
      italic: e.isActive("italic"),
      underline: e.isActive("underline"),
      strike: e.isActive("strike"),
      code: e.isActive("code"),
      bulletList: e.isActive("bulletList"),
      orderedList: e.isActive("orderedList"),
      quote: e.isActive("blockquote"),
      link: e.isActive("link"),
      alignLeft: e.isActive({ textAlign: "left" }),
      alignCenter: e.isActive({ textAlign: "center" }),
      alignRight: e.isActive({ textAlign: "right" }),
      font: (e.getAttributes("textStyle").fontFamily as string | undefined) ?? "",
      size: (e.getAttributes("textStyle").fontSize as string | undefined) ?? "",
      color: (e.getAttributes("textStyle").color as string | undefined) ?? "",
      canUndo: e.can().undo(),
      canRedo: e.can().redo(),
    }),
  })

  const chain = () => editor.chain().focus()

  const setLink = () => {
    const previous = (editor.getAttributes("link").href as string | undefined) ?? "https://"
    const url = window.prompt(t(tools.linkPrompt), previous)
    if (url === null) return
    if (url.trim() === "") {
      chain().extendMarkRange("link").unsetLink().run()
      return
    }
    if (!/^(https?:\/\/|mailto:)/i.test(url.trim())) return
    chain().extendMarkRange("link").setLink({ href: url.trim() }).run()
  }

  return (
    <div
      role="toolbar"
      aria-label={t(copy.mail.toolbar)}
      className="flex flex-wrap items-center gap-0.5 border-b border-border px-2 py-1.5"
    >
      <ToolButton icon={Bold} label={t(tools.bold)} isActive={state.bold} onClick={() => chain().toggleBold().run()} />
      <ToolButton icon={Italic} label={t(tools.italic)} isActive={state.italic} onClick={() => chain().toggleItalic().run()} />
      <ToolButton icon={Underline} label={t(tools.underline)} isActive={state.underline} onClick={() => chain().toggleUnderline().run()} />
      <ToolButton icon={Strikethrough} label={t(tools.strike)} isActive={state.strike} onClick={() => chain().toggleStrike().run()} />
      <ToolButton icon={Code} label={t(tools.code)} isActive={state.code} onClick={() => chain().toggleCode().run()} />
      <Divider />

      <select
        aria-label={t(tools.font)}
        title={t(tools.font)}
        className={selectClass}
        value={state.font}
        onChange={(e) => (e.target.value ? chain().setFontFamily(e.target.value).run() : chain().unsetFontFamily().run())}
      >
        {FONT_OPTIONS.map((f) => (
          <option key={f.label} value={f.value}>{f.label}</option>
        ))}
      </select>
      <select
        aria-label={t(tools.size)}
        title={t(tools.size)}
        className={selectClass}
        value={state.size}
        onChange={(e) => (e.target.value ? chain().setFontSize(e.target.value).run() : chain().unsetFontSize().run())}
      >
        {SIZE_OPTIONS.map((s) => (
          <option key={s || "auto"} value={s}>{s || "size"}</option>
        ))}
      </select>
      <div className="ml-1 flex items-center gap-1" role="radiogroup" aria-label={t(tools.color)}>
        {COLOR_OPTIONS.map((c) => (
          <button
            key={c.label}
            type="button"
            role="radio"
            aria-checked={state.color === c.value}
            aria-label={`${t(tools.color)}: ${c.label}`}
            title={c.label}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => (c.value ? chain().setColor(c.value).run() : chain().unsetColor().run())}
            className={cn(
              "size-5 cursor-pointer border border-border",
              state.color === c.value && "outline outline-1 outline-offset-2 outline-foreground",
            )}
            style={{ background: c.value || "hsl(var(--foreground))" }}
          />
        ))}
      </div>
      <Divider />

      <ToolButton icon={List} label={t(tools.bulletList)} isActive={state.bulletList} onClick={() => chain().toggleBulletList().run()} />
      <ToolButton icon={ListOrdered} label={t(tools.orderedList)} isActive={state.orderedList} onClick={() => chain().toggleOrderedList().run()} />
      <ToolButton icon={Quote} label={t(tools.quote)} isActive={state.quote} onClick={() => chain().toggleBlockquote().run()} />
      <Divider />

      <ToolButton icon={AlignLeft} label={t(tools.alignLeft)} isActive={state.alignLeft} onClick={() => chain().setTextAlign("left").run()} />
      <ToolButton icon={AlignCenter} label={t(tools.alignCenter)} isActive={state.alignCenter} onClick={() => chain().setTextAlign("center").run()} />
      <ToolButton icon={AlignRight} label={t(tools.alignRight)} isActive={state.alignRight} onClick={() => chain().setTextAlign("right").run()} />
      <Divider />

      <ToolButton icon={Link2} label={t(tools.link)} isActive={state.link} onClick={setLink} />
      <ToolButton icon={RemoveFormatting} label={t(tools.clear)} onClick={() => chain().unsetAllMarks().clearNodes().run()} />
      <Divider />

      <ToolButton icon={Undo2} label={t(tools.undo)} disabled={!state.canUndo} onClick={() => chain().undo().run()} />
      <ToolButton icon={Redo2} label={t(tools.redo)} disabled={!state.canRedo} onClick={() => chain().redo().run()} />
    </div>
  )
}
