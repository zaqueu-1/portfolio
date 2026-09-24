import { describe, expect, it } from "vitest"
import { createRateLimiter } from "../rate-limit"
import { escapeHtml, sanitizeMessageHtml } from "../sanitize"

describe("sanitizeMessageHtml", () => {
  it("keeps composer formatting", () => {
    const clean = sanitizeMessageHtml(
      '<p style="text-align: center"><strong>hi</strong> <em>there</em> <span style="color: #c9a4e8; font-size: 18px">x</span></p>',
    )

    expect(clean).toContain('<p style="text-align:center">')
    expect(clean).toContain("<strong>hi</strong> <em>there</em>")
    expect(clean).toContain('<span style="color:#c9a4e8;font-size:18px">x</span>')
  })

  it("strips scripts, handlers and unsafe links", () => {
    const dirty =
      '<p onclick="x()">a</p><script>alert(1)</script><a href="javascript:alert(1)">b</a><img src=x onerror=alert(1)>'

    const clean = sanitizeMessageHtml(dirty)

    expect(clean).not.toMatch(/script|onclick|onerror|javascript:|<img/i)
    expect(clean).toContain("<p>a</p>")
  })

  it("drops styles outside the allowlist", () => {
    const clean = sanitizeMessageHtml('<span style="position: fixed; background: url(x)">z</span>')

    expect(clean).toBe("<span>z</span>")
  })

  it("forces safe rel/target on links", () => {
    expect(sanitizeMessageHtml('<a href="https://x.dev">x</a>')).toBe(
      '<a href="https://x.dev" target="_blank" rel="noopener noreferrer">x</a>',
    )
  })
})

describe("escapeHtml", () => {
  it("escapes markup characters", () => {
    expect(escapeHtml(`<b>"a" & 'b'</b>`)).toBe("&lt;b&gt;&quot;a&quot; &amp; &#39;b&#39;&lt;/b&gt;")
  })
})

describe("createRateLimiter", () => {
  it("blocks after the limit and recovers after the window", () => {
    const limiter = createRateLimiter(2, 1000)

    expect(limiter.hit("ip", 0)).toBe(true)
    expect(limiter.hit("ip", 10)).toBe(true)
    expect(limiter.hit("ip", 20)).toBe(false)
    expect(limiter.hit("other", 20)).toBe(true)
    expect(limiter.hit("ip", 1011)).toBe(true)
  })
})
