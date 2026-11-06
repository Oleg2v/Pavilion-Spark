/** WCAG 2.x relative luminance + contrast ratio, for live token docs. */
function channel(c: number) {
  const s = c / 255
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
}

export function luminance(hex: string) {
  const h = hex.replace("#", "")
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

export function grade(ratio: number, large = false) {
  if (ratio >= 7) return "AAA"
  if (ratio >= 4.5) return "AA"
  if (large && ratio >= 3) return "AA Large"
  if (ratio >= 3) return "UI 3:1"
  return "—"
}
