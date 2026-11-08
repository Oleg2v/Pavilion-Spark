import { cn } from "@/lib/utils"
import { En, Iso } from "@/components/spark/text"

export const SHEETS = [
  { id: "palette", n: 1, he: "צבע", en: "Colour" },
  { id: "type", n: 2, he: "טיפוגרפיה", en: "Typography" },
  { id: "space", n: 3, he: "מרווחים", en: "Space · 4px" },
  { id: "form", n: 4, he: "רדיוס ועומק", en: "Radii & elevation" },
  { id: "motion", n: 5, he: "תנועה", en: "Motion" },
  { id: "components", n: 6, he: "רכיבים", en: "Components" },
  { id: "motif", n: 7, he: "שפה חזותית", en: "Motif" },
  { id: "decisions", n: 8, he: "התחייבויות", en: "Commitments" },
] as const

const pad = (n: number) => String(n).padStart(2, "0")

/**
 * A section drawn like an engineering sheet: the header is a title block
 * (index · title · sheet/rev) with hairline cells.
 */
export function Sheet({
  id,
  lede,
  children,
  className,
}: {
  id: (typeof SHEETS)[number]["id"]
  lede?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  const s = SHEETS.find((x) => x.id === id)!
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <header className="grid grid-cols-[auto_1fr] border-y border-line sm:grid-cols-[auto_1fr_auto]">
        <div className="grid place-items-center border-e border-line px-4 py-4 sm:px-6">
          <span className="font-mono text-title font-medium text-cyan tabular-nums">
            <bdi>{pad(s.n)}</bdi>
          </span>
        </div>
        <div className="flex min-w-0 flex-col justify-center gap-1 px-4 py-4 sm:px-6">
          <h2 id={`${id}-title`} className="font-display text-headline font-bold text-paper">
            {s.he}
          </h2>
          <p className="label-mono">
            <En>{s.en}</En>
          </p>
        </div>
        <div className="hidden flex-col justify-center gap-1 border-s border-line px-6 py-4 text-end sm:flex">
          <span className="label-mono">
            <En>
              SHEET {pad(s.n)}/{pad(SHEETS.length)}
            </En>
          </span>
          <span className="label-mono">
            <En>REV A · SCALE 1:1</En>
          </span>
        </div>
      </header>
      {lede ? (
        <p className="max-w-[64ch] px-4 pt-8 text-lead text-steel sm:px-6 lg:px-10">
          {typeof lede === "string" ? <Iso>{lede}</Iso> : lede}
        </p>
      ) : null}
      <div className="px-4 pt-8 pb-16 sm:px-6 lg:px-10 lg:pb-24">{children}</div>
    </section>
  )
}

/** Small spec label: "C-01 · כפתור" */
export function SpecLabel({ code, children, className }: { code: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-baseline gap-3", className)}>
      <span className="label-mono shrink-0 whitespace-nowrap text-cyan">
        <En>{code}</En>
      </span>
      <h3 className="text-title font-semibold text-paper">{children}</h3>
    </div>
  )
}
