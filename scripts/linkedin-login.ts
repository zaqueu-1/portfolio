/**
 * Abre Google Chrome com perfil persistente (modo normal, não anônimo).
 * Uso: npm run linkedin:login
 */
import {
  hasLinkedInSession,
  openLinkedInBrowser,
} from "../src/lib/linkedin/browser-context"

async function main() {
  console.log("→ Abrindo Google Chrome (perfil normal, salvo em .linkedin/browser-profile)")
  console.log("→ Faça login no LinkedIn e aguarde o feed carregar.\n")

  const context = await openLinkedInBrowser(false)
  const page = context.pages()[0] ?? (await context.newPage())

  const startUrl = hasLinkedInSession()
    ? "https://www.linkedin.com/feed/"
    : "https://www.linkedin.com/login"

  await page.goto(startUrl, { timeout: 60_000 })

  try {
    await page.waitForURL(
      (url) => {
        const h = url.href
        return (
          h.includes("linkedin.com/feed") ||
          h.includes("linkedin.com/in/") ||
          (h.includes("linkedin.com") &&
            !h.includes("/login") &&
            !h.includes("/checkpoint"))
        )
      },
      { timeout: 600_000 },
    )
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (msg.includes("closed")) {
      console.log("\n✓ Perfil salvo em .linkedin/browser-profile")
      console.log("  SYNC_LINKEDIN=1 npm run sync:linkedin")
      return
    }
    throw e
  }

  console.log("\n✓ Login detectado. Perfil salvo em .linkedin/browser-profile")
  console.log("  Pode fechar o Chrome.")
  console.log("  Próximo: SYNC_LINKEDIN=1 npm run sync:linkedin\n")

  await context.close()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
