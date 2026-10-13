import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { contentType, resolveStaticPath } from "../static"

const root = resolve("/srv/dist")

describe("resolveStaticPath", () => {
  it("maps pathnames to files inside root", () => {
    expect(resolveStaticPath(root, "/assets/index.js")).toBe(resolve(root, "assets/index.js"))
    expect(resolveStaticPath(root, "/img/a%20b.png")).toBe(resolve(root, "img/a b.png"))
  })

  it("blocks traversal, null bytes and malformed encoding", () => {
    expect(resolveStaticPath(root, "/../etc/passwd")).toBe(resolve(root, "etc/passwd"))
    expect(resolveStaticPath(root, "/%2e%2e/%2e%2e/etc/passwd")).toBe(resolve(root, "etc/passwd"))
    expect(resolveStaticPath(root, "/a%00b")).toBeNull()
    expect(resolveStaticPath(root, "/%E0%A4%A")).toBeNull()
  })

  it("returns null for the root itself so the SPA fallback handles it", () => {
    expect(resolveStaticPath(root, "/")).toBeNull()
  })
})

describe("contentType", () => {
  it("resolves known, unknown and extensionless files", () => {
    expect(contentType("/x/index.html")).toBe("text/html; charset=utf-8")
    expect(contentType("/x/video.MP4")).toBe("video/mp4")
    expect(contentType("/x/file.bin")).toBe("application/octet-stream")
    expect(contentType("/x/.well-known/discord")).toBe("text/plain; charset=utf-8")
  })
})
