import { LicensePlate } from "@/components/spark/plate/license-plate"
import { PLATE_H, PLATE_W } from "@/components/spark/plate/glyphs"
import { cn } from "@/lib/utils"

/**
 * The plate as an engineering drawing: dimension lines + numbered callouts.
 * Coordinates are plate millimetres; the overlay is a physical drawing, so
 * it uses physical left/top on purpose (an illustration does not mirror).
 */
const VB = { x: -28, y: -56, w: 600, h: 252 }
const px = (x: number) => `${((x - VB.x) / VB.w) * 100}%`
const py = (y: number) => `${((y - VB.y) / VB.h) * 100}%`

const CALLOUTS = [
  { n: 1, ax: 28, ay: 88, ly: 150, code: "EUROBAND · IL", he: "דגל, IL, ישראל — משורטט, לא תמונה", align: "left" as const },
  { n: 2, ax: 262, ay: 64, ly: 150, code: "DIN 1451 · 74 MM", he: "ספרות משורטטות בקו — אפס קבצי פונט", align: "center" as const },
  { n: 3, ax: 500, ay: 100, ly: 150, code: "PLATE YELLOW · #F7D117", he: "הצבע של הלוחית הוא צבע המותג", align: "right" as const },
]

export function PlateDiagram({ value = "1234567", className }: { value?: string; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <div className="relative w-full" style={{ aspectRatio: `${VB.w} / ${VB.h}` }}>
        {/* the plate */}
        <div
          className="absolute"
          style={{ left: px(0), top: py(0), width: `${(PLATE_W / VB.w) * 100}%`, height: `${(PLATE_H / VB.h) * 100}%` }}
        >
          <LicensePlate value={value} className="drop-shadow-[0_24px_48px_rgb(0_0_0/0.55)]" />
        </div>

        {/* linework */}
        <svg
          aria-hidden
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          className="pointer-events-none absolute inset-0 size-full overflow-visible text-cyan [&_*]:[vector-effect:non-scaling-stroke]"
          fill="none"
          stroke="currentColor"
          strokeWidth={1}
        >
          {/* width */}
          <g opacity={0.9}>
            <path d="M0 -6V-40M520 -6V-40" strokeDasharray="2 3" opacity={0.6} />
            <path d="M0 -28H520" />
            <path d="M-4 -32L4 -24M516 -32L524 -24" strokeWidth={1.5} />
          </g>
          {/* height */}
          <g opacity={0.9}>
            <path d="M526 0H560M526 110H560" strokeDasharray="2 3" opacity={0.6} />
            <path d="M548 0V110" />
            <path d="M544 -4L552 4M544 106L552 114" strokeWidth={1.5} />
          </g>
          {/* leaders */}
          {CALLOUTS.map((c) => (
            <g key={c.n}>
              <circle cx={c.ax} cy={c.ay} r={2.5} fill="currentColor" stroke="none" />
              <path d={`M${c.ax} ${c.ay}V${c.ly - 10}`} />
            </g>
          ))}
        </svg>

        {/* dimension labels */}
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-graphite px-2 font-mono text-micro text-cyan"
          style={{ left: px(260), top: py(-28) }}
        >
          <bdi>520 MM</bdi>
        </span>
        <span
          className="absolute -translate-x-1/2 -translate-y-1/2 bg-graphite py-1 font-mono text-micro text-cyan [writing-mode:vertical-rl]"
          style={{ left: px(548), top: py(55) }}
        >
          <bdi>110 MM</bdi>
        </span>

        {/* numbered markers at leader ends */}
        {CALLOUTS.map((c) => (
          <span
            key={c.n}
            aria-hidden
            className="absolute grid size-6 -translate-x-1/2 place-items-center rounded-full border border-cyan bg-graphite font-mono text-micro text-cyan"
            style={{ left: px(c.ax), top: py(c.ly) }}
          >
            {c.n}
          </span>
        ))}

        {/* desktop labels */}
        {CALLOUTS.map((c) => (
          <span
            key={`l${c.n}`}
            className={cn(
              "absolute hidden w-[24%] flex-col gap-1 md:flex",
              c.align === "left" && "items-start text-left",
              c.align === "center" && "-translate-x-1/2 items-center text-center",
              c.align === "right" && "-translate-x-full items-end text-right",
            )}
            style={{
              left: c.align === "left" ? px(c.ax - 12) : c.align === "right" ? px(c.ax + 12) : px(c.ax),
              top: `calc(${py(c.ly)} + 32px)`,
            }}
          >
            <span className="label-mono text-cyan">
              <bdi>{c.code}</bdi>
            </span>
            <span className="text-caption text-steel" dir="rtl">
              {c.he}
            </span>
          </span>
        ))}
      </div>

      {/* mobile legend */}
      <figcaption className="mt-12 md:hidden">
        <ol className="grid gap-3">
          {CALLOUTS.map((c) => (
            <li key={c.n} className="grid grid-cols-[auto_1fr] items-start gap-3">
              <span
                aria-hidden
                className="grid size-6 place-items-center rounded-full border border-cyan font-mono text-micro text-cyan"
              >
                {c.n}
              </span>
              <span className="flex flex-col gap-1">
                <span className="label-mono text-cyan">
                  <bdi>{c.code}</bdi>
                </span>
                <span className="text-caption text-steel">{c.he}</span>
              </span>
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  )
}
