import { Fragment } from "react"

/**
 * English phrase inside Hebrew UI: isolated for bidi and marked lang="en"
 * so screen readers switch voice (WCAG 3.1.2 Language of Parts).
 */
export function En({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <bdi lang="en" className={className}>
      {children}
    </bdi>
  )
}

/**
 * Numeric runs in Hebrew prose: ranges, units, ratios, times.
 * "180–260ms", "≥3:1", "×2", "+30%", "1.5%", "11:00", "(390 / 768 / 1024+)".
 * Separators must be followed by a digit, so a sentence-final "." or ","
 * stays outside the isolate; letters/digits on either side (B2B, H7) are
 * not split.
 */
// No lookbehind: Safari < 16.4 cannot parse it (the left-boundary check is done in code).
const NUMERIC =
  /(?:[≥≤~×+−]\s?)?\d+(?:[.,:]\d+)*(?:\s?[–—\-→/×]\s?\d+(?:[.,:]\d+)*)*(?:\s?(?:ms|px|MS|PX|%|\+))?(?![A-Za-z\d])/g
const WORD_CHAR = /[A-Za-z\d]/

/**
 * Wraps every numeric run of a Hebrew string in <bdi> (the style tile's rule
 * R03), so en-dash ranges and unit suffixes never reorder inside RTL text.
 */
export function Iso({ children }: { children: string }) {
  const out: React.ReactNode[] = []
  let last = 0
  for (const m of children.matchAll(NUMERIC)) {
    const start = m.index ?? 0
    if (start > 0 && WORD_CHAR.test(children[start - 1])) continue // inside a word: "H7", "B2B"
    if (start > last) out.push(<Fragment key={`t${last}`}>{children.slice(last, start)}</Fragment>)
    out.push(<bdi key={`n${start}`}>{m[0]}</bdi>)
    last = start + m[0].length
  }
  if (last < children.length) out.push(<Fragment key={`t${last}`}>{children.slice(last)}</Fragment>)
  return <>{out}</>
}
