export const OPEN_MAIL_EVENT = "zaqueu:open-mail"

export function openMailComposer(): void {
  window.dispatchEvent(new Event(OPEN_MAIL_EVENT))
}

export function preloadMailComposer(): void {
  void import("@/components/mail/MailComposer")
}
