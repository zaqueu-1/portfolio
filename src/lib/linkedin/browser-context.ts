import { existsSync } from "node:fs"
import path from "node:path"
import { chromium, type BrowserContext } from "playwright"

/** Perfil Chrome persistente — não é anônimo/incógnito */
export const LINKEDIN_PROFILE_DIR = path.join(
  process.cwd(),
  ".linkedin/browser-profile",
)

export function hasLinkedInSession(): boolean {
  return (
    existsSync(LINKEDIN_PROFILE_DIR) &&
    existsSync(path.join(LINKEDIN_PROFILE_DIR, "Default"))
  )
}

export async function openLinkedInBrowser(
  headless: boolean,
): Promise<BrowserContext> {
  return chromium.launchPersistentContext(LINKEDIN_PROFILE_DIR, {
    headless,
    channel: "chrome",
    viewport: { width: 1280, height: 900 },
    ignoreDefaultArgs: ["--enable-automation"],
    args: ["--disable-blink-features=AutomationControlled"],
  })
}
