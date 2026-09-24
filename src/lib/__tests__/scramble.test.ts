import { describe, expect, it } from "vitest"
import { SCRAMBLE_GLYPHS, scrambleFrame } from "@/lib/scramble"

describe("scrambleFrame", () => {
  it("returns the target once fully revealed", () => {
    expect(scrambleFrame("EDUARDO ZAQUEU", 14)).toBe("EDUARDO ZAQUEU")
  })

  it("keeps the revealed prefix and whitespace, scrambles the rest", () => {
    const g = SCRAMBLE_GLYPHS[0]

    expect(scrambleFrame("AB CD", 1, () => 0)).toBe(`A${g} ${g}${g}`)
  })

  it("clamps out-of-range progress", () => {
    expect(scrambleFrame("XY", 99)).toBe("XY")
    expect(scrambleFrame("XY", -3, () => 0)).toBe(`${SCRAMBLE_GLYPHS[0]}${SCRAMBLE_GLYPHS[0]}`)
  })
})
