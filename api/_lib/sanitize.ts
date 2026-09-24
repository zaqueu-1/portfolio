import sanitizeHtml from "sanitize-html"

const SAFE_FONT = /^[\w\s"',-]+$/
const SAFE_SIZE = /^(1[0-9]|2[0-9]|3[0-2])px$/
const SAFE_COLOR = /^(#[0-9a-f]{3,8}|rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\))$/i
const SAFE_ALIGN = /^(left|center|right|justify)$/

/** Allowlist matching exactly what the composer toolbar can produce. */
export function sanitizeMessageHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "strong", "b", "em", "i", "u", "s", "code", "pre",
      "blockquote", "ul", "ol", "li", "a", "span",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      span: ["style"],
      p: ["style"],
    },
    allowedStyles: {
      span: { "font-family": [SAFE_FONT], "font-size": [SAFE_SIZE], color: [SAFE_COLOR] },
      p: { "text-align": [SAFE_ALIGN] },
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { target: "_blank", rel: "noopener noreferrer" }),
    },
  })
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
