import { Chip } from "@/components/ui/chip"
import { PartArt, type PartKind } from "@/components/spark/line-art"
import { Price } from "@/components/spark/price"
import { En, Iso } from "@/components/spark/text"

/** Drawing coordinates (160 × 120 sheet) → % of the figure box. */
const X = (x: number) => `${(x / 160) * 100}%`
const Y = (y: number) => `${(y / 120) * 100}%`

const CALLOUTS = [
  { ax: 92, ay: 43.2, lx: 112, ly: 10, side: "right" as const, code: "DRL", he: "פס תאורת יום" },
  { ax: 56, ay: 66, lx: 20, ly: 104, side: "left" as const, code: "PROJECTOR", he: "עדשת פרויקטור" },
  { ax: 71, ay: 22, lx: 30, ly: 8, side: "left" as const, code: "MOUNT", he: "זיז חיבור עליון" },
]

const PARTS: { kind: PartKind; he: string; code: string }[] = [
  { kind: "headlight", he: "פנס ראשי", code: "01 · ELEC" },
  { kind: "bulb", he: "נורה H7", code: "01 · ELEC" },
  { kind: "mirror", he: "מראה צד", code: "01 · ELEC" },
  { kind: "bumper", he: "פגוש קדמי", code: "02 · BODY" },
  { kind: "radiator", he: "רדיאטור", code: "03 · COOL" },
  { kind: "fan", he: "מאוורר", code: "03 · COOL" },
]

export function Motif() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* callout composition */}
        <figure className="relative overflow-hidden rounded-md border border-line bg-graphite bg-grid lg:col-span-8">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[760px] px-6 py-10 sm:px-16">
            <div className="relative size-full">
              <PartArt kind="headlight" className="absolute inset-0 size-full" title="שרטוט פנס ראשי עם קווי הסבר" />
              <svg
                aria-hidden
                viewBox="0 0 160 120"
                className="pointer-events-none absolute inset-0 size-full overflow-visible text-cyan [&_*]:[vector-effect:non-scaling-stroke]"
                fill="none"
                stroke="currentColor"
              >
                {CALLOUTS.map((c, i) => {
                  const shoulder = c.side === "right" ? c.lx + 14 : c.lx - 14
                  return (
                    <g key={i}>
                      <circle cx={c.ax} cy={c.ay} r={1.4} fill="currentColor" stroke="none" />
                      <path d={`M${c.ax} ${c.ay}L${c.lx} ${c.ly}H${shoulder}`} strokeWidth={1} />
                    </g>
                  )
                })}
              </svg>
              {CALLOUTS.map((c, i) => (
                <span
                  key={`n${i}`}
                  aria-hidden
                  className="absolute grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-cyan bg-graphite font-mono text-micro text-cyan sm:hidden"
                  style={{ left: X(c.lx), top: Y(c.ly) }}
                >
                  {i + 1}
                </span>
              ))}
              {CALLOUTS.map((c, i) => (
                <span
                  key={i}
                  className={`absolute hidden -translate-y-full flex-col gap-1 pb-2 sm:flex ${c.side === "right" ? "items-start text-left" : "-translate-x-full items-end text-right"}`}
                  style={{ left: X(c.side === "right" ? c.lx + 2 : c.lx - 2), top: Y(c.ly) }}
                >
                  <span className="label-mono text-cyan">
                    <En>{c.code}</En>
                  </span>
                  <span className="text-caption whitespace-nowrap text-steel" dir="rtl">
                    {c.he}
                  </span>
                </span>
              ))}
            </div>
          </div>
          <ol className="grid gap-2 border-t border-line px-4 py-3 sm:hidden">
            {CALLOUTS.map((c, i) => (
              <li key={i} className="flex items-center gap-3 text-caption text-steel">
                <span aria-hidden className="grid size-5 place-items-center rounded-full border border-cyan font-mono text-micro text-cyan">
                  {i + 1}
                </span>
                <En className="label-mono text-cyan">{c.code}</En>
                <span>{c.he}</span>
              </li>
            ))}
          </ol>
          <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-panel/60 px-4 py-3 sm:px-6">
            <span className="flex flex-wrap items-center gap-2">
              <span className="text-body font-semibold">פנס ראשי ימני</span>
              <Chip tone="stock" dot>
                במלאי · <bdi className="font-mono">14</bdi>
              </Chip>
              <span className="flex items-baseline gap-1 text-caption text-steel">
                מ-<Price value={389} className="font-mono text-body font-semibold text-paper" />
              </span>
            </span>
            <span className="label-mono">
              <En>LEADER LINE = LIVE DATA</En>
            </span>
          </figcaption>
        </figure>

        {/* anatomy */}
        <div className="grid content-start gap-4 lg:col-span-4">
          <div className="grid gap-3 rounded-md border border-line bg-panel p-6">
            <h3 className="label-mono">
              <En>GRID PAPER · 4%</En>
            </h3>
            <div aria-hidden className="h-28 rounded-sm border border-line bg-graphite bg-grid" />
            <p className="text-caption text-steel">
              <Iso>רשת 16px, קו ראשי כל 64px, דיו ציאן ב-4%. רק מתחת לשרטוטים ולמשטחי ״שולחן עבודה״ — לא מתחת לטקסט רץ.</Iso>
            </p>
          </div>
          <div className="grid gap-3 rounded-md border border-line bg-panel p-6">
            <h3 className="label-mono">
              <En>DIMENSION LINE</En>
            </h3>
            <svg viewBox="0 0 240 40" className="w-full text-cyan" aria-hidden fill="none" stroke="currentColor" direction="ltr">
              <path d="M8 4V36M232 4V36" strokeDasharray="2 3" opacity={0.6} />
              <path d="M8 20H96M144 20H232" />
              <path d="M4 24L12 16M228 24L236 16" strokeWidth={1.5} />
              <text x="120" y="24" textAnchor="middle" fill="currentColor" stroke="none" fontSize="11" fontFamily="var(--font-plex-mono)">
                1360
              </text>
            </svg>
            <p className="text-caption text-steel">משמש כמפריד מקטעים וכקנה מידה. קווי עזר מקווקווים, חיצי מידה אלכסוניים.</p>
          </div>
          <div className="grid gap-3 rounded-md border border-line bg-panel p-6">
            <h3 className="label-mono">
              <En>LEADER LINE ANATOMY</En>
            </h3>
            <svg viewBox="0 0 264 56" className="w-full text-cyan" aria-hidden fill="none" stroke="currentColor" direction="ltr">
              <circle cx="12" cy="44" r="3" fill="currentColor" stroke="none" />
              <path d="M12 44L52 12H96" />
              <text x="104" y="16" textLength="150" lengthAdjust="spacingAndGlyphs" fill="currentColor" stroke="none" fontSize="10" fontFamily="var(--font-plex-mono)">
                ANCHOR → ELBOW → LABEL
              </text>
            </svg>
            <p className="text-caption text-steel">
              <Iso>נקודת עיגון 3px, קו 1px, כתף אופקית. התווית תמיד מחוץ לשרטוט.</Iso>
            </p>
          </div>
        </div>
      </div>

      {/* parts sheet */}
      <div className="grid gap-4">
        <h3 className="label-mono">
          <En>PART LINE-ART · ONE LANGUAGE FOR EVERY PRODUCT IMAGE</En>
        </h3>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
          {PARTS.map((p) => (
            <li key={p.kind} className="grid gap-3 bg-graphite p-4 compact:p-3">
              <div className="rounded-sm bg-grid p-2">
                <PartArt kind={p.kind} />
              </div>
              <span className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                <span className="text-caption font-medium">{p.he}</span>
                <span className="font-mono text-micro text-fog">
                  <En>{p.code}</En>
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
