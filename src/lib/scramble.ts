/** Glyphs covered by Matrix Sans, so the decode never falls back to another font. */
export const SCRAMBLE_GLYPHS = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ$#%&*+=<>/\\|"

/**
 * One frame of a left-to-right decode. Characters before `revealed` show the target;
 * the rest show random glyphs. Whitespace is kept so word shapes stay stable.
 */
export function scrambleFrame(
  target: string,
  revealed: number,
  random: () => number = Math.random,
): string {
  const cut = Math.max(0, Math.min(target.length, Math.floor(revealed)))
  const tail = Array.from(target.slice(cut), (ch) =>
    /\s/.test(ch) ? ch : SCRAMBLE_GLYPHS[Math.floor(random() * SCRAMBLE_GLYPHS.length)],
  ).join("")
  return target.slice(0, cut) + tail
}
