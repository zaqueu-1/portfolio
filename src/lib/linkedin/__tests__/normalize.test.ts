import { describe, expect, it } from "vitest"
import { mergeLocales, normalizeProxycurl } from "../normalize"

describe("normalizeProxycurl", () => {
  it("maps headline for locale", () => {
    const partial = normalizeProxycurl(
      { full_name: "Eduardo Zaqueu", headline: "Dev", experiences: [] },
      "pt",
    )
    expect(partial.headline?.pt).toBe("Dev")
    expect(partial.name).toBe("Eduardo Zaqueu")
  })
})

describe("mergeLocales", () => {
  it("merges pt and en headlines", () => {
    const profile = mergeLocales(
      {
        slug: "zaqueu1",
        name: "Eduardo Zaqueu",
        headline: { pt: "Dev PT", en: "" },
        about: { pt: "", en: "" },
        location: { pt: "", en: "" },
        avatarUrl: "/img/avatarzin.jpg",
        linkedinUrl: "https://linkedin.com/in/zaqueu1",
        experiences: [],
        testimonials: [],
        skills: [],
        socialLinks: [],
        lastSyncedAt: "",
      },
      {
        slug: "zaqueu1",
        name: "Eduardo Zaqueu",
        headline: { pt: "", en: "Dev EN" },
        about: { pt: "", en: "" },
        location: { pt: "", en: "" },
        avatarUrl: "/img/avatarzin.jpg",
        linkedinUrl: "https://linkedin.com/in/zaqueu1",
        experiences: [],
        testimonials: [],
        skills: [],
        socialLinks: [],
        lastSyncedAt: "",
      },
    )
    expect(profile.headline).toEqual({ pt: "Dev PT", en: "Dev EN" })
  })
})
