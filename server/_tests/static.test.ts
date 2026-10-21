import { resolve } from "node:path"
import { describe, expect, it } from "vitest"
import { contentType, parseRange, resolveStaticPath } from "../static"

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

describe("parseRange", () => {
  it("serves the whole file when there is no usable Range header", () => {
    expect(parseRange(undefined, 100)).toBeNull()
    expect(parseRange("items=0-1", 100)).toBeNull()
    expect(parseRange("bytes=0-1,5-9", 100)).toBeNull()
    expect(parseRange("bytes=-", 100)).toBeNull()
    expect(parseRange("bytes=50-10", 100)).toBeNull()
  })

  it("parses bounded, open-ended and suffix ranges", () => {
    expect(parseRange("bytes=0-1", 100)).toEqual({ start: 0, end: 1 })
    expect(parseRange("bytes=10-", 100)).toEqual({ start: 10, end: 99 })
    expect(parseRange("bytes=-20", 100)).toEqual({ start: 80, end: 99 })
    expect(parseRange("bytes=90-500", 100)).toEqual({ start: 90, end: 99 })
    expect(parseRange("bytes=-500", 100)).toEqual({ start: 0, end: 99 })
  })

  it("flags ranges outside the file as unsatisfiable", () => {
    expect(parseRange("bytes=100-", 100)).toBe("unsatisfiable")
    expect(parseRange("bytes=-0", 100)).toBe("unsatisfiable")
    expect(parseRange("bytes=0-", 0)).toBe("unsatisfiable")
    expect(parseRange("bytes=-5", 0)).toBe("unsatisfiable")
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
