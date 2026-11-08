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
 * Breaks only between words: each word stays whole, so "cad-frame" or
 * "20-1234-00" never splits at its hyphen when the line wraps.
 */
export function Words({ children }: { children: string }) {
  return (
    <>
      {children.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i ? " " : null}
          <span className="whitespace-nowrap">{w}</span>
        </Fragment>
      ))}
    </>
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
  // exec loop, not matchAll (Chrome < 73, Safari < 13); a fresh copy so the
  // shared literal's lastIndex never carries over between calls
  const re = new RegExp(NUMERIC)
  let last = 0
  for (let m = re.exec(children); m; m = re.exec(children)) {
    const start = m.index
    if (start > 0 && WORD_CHAR.test(children[start - 1])) continue // inside a word: "H7", "B2B"
    if (start > last) out.push(<Fragment key={`t${last}`}>{children.slice(last, start)}</Fragment>)
    out.push(<bdi key={`n${start}`}>{m[0]}</bdi>)
    last = start + m[0].length
  }
  if (last < children.length) out.push(<Fragment key={`t${last}`}>{children.slice(last)}</Fragment>)
  return <>{out}</>
}
