/// <reference types="vitest/config" />
import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { vercelApiDev } from "./vite.api-dev"

export default defineConfig(({ mode }) => {
  // Server-only: expose .env to the local api/ handlers (e.g. RESEND_API_KEY).
  // Nothing here reaches the client bundle; only VITE_* vars do.
  for (const [key, value] of Object.entries(loadEnv(mode, process.cwd(), ""))) {
    process.env[key] ??= value
  }

  return {
    plugins: [react(), tailwindcss(), vercelApiDev()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 5175,
    },
    test: {
      environment: "jsdom",
      globals: true,
      setupFiles: "./src/test/setup.ts",
    },
  }
})
