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
 * "180–260ms", "≥3:1", "1.5%", "11:00", "(390 / 768 / 1024+)"
 */
const NUMERIC = /([≥≤~]?\d[\d.,]*(?:\s?[–—\-→/×:]\s?\d[\d.,]*)*(?:\s?(?:ms|px|MS|PX|%|\+))?)/g

/**
 * Wraps every numeric run of a Hebrew string in <bdi> (the style tile's rule
 * R03), so en-dash ranges and unit suffixes never reorder inside RTL text.
 */
export function Iso({ children }: { children: string }) {
  const parts = children.split(NUMERIC)
  return (
    <>
      {parts.map((part, i) => (i % 2 === 1 ? <bdi key={i}>{part}</bdi> : <Fragment key={i}>{part}</Fragment>))}
    </>
  )
}
