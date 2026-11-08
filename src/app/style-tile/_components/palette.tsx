import { contrast, grade } from "@/lib/contrast"
import { CORE, DERIVED, INKS, PROPORTION, SURFACE_HEX, type Swatch } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { En, Iso } from "@/components/spark/text"

const HEX: Record<string, string> = Object.fromEntries([...CORE, ...DERIVED, ...INKS].map((s) => [s.token, s.hex]))

function Ratio({ fg, bg, label }: { fg: string; bg: string; label: string }) {
  const r = contrast(fg, bg)
  return (
    <span className="flex items-center justify-between gap-2 text-caption">
      <span className="text-steel">{label}</span>
      <span className="flex items-center gap-2">
        <bdi className="font-mono text-paper">{r.toFixed(1)}:1</bdi>
        <span
          className={cn(
            "rounded-xs border px-1 font-mono text-micro leading-5",
            r >= 4.5 ? "border-stock/30 text-stock" : "border-low/30 text-low",
          )}
        >
          <bdi>{grade(r)}</bdi>
        </span>
      </span>
    </span>
  )
}

function SwatchCard({ s, big = false }: { s: Swatch; big?: boolean }) {
  const isLight = s.token === "paper" || s.token === "plate" || s.token === "cyan" || s.token === "stock" || s.token === "low"
  const sampleInk = s.surface ? SURFACE_HEX.paper : isLight ? SURFACE_HEX.graphite : SURFACE_HEX.paper
  return (
    <li className="flex flex-col overflow-hidden rounded-md border border-line bg-panel">
      <div
        className={cn("relative flex items-end justify-between gap-4 p-4", big ? "h-40 sm:h-48" : "h-32")}
        style={{ backgroundColor: s.hex }}
      >
        {s.token === "graphite" ? <span aria-hidden className="absolute inset-0 border-b border-line" /> : null}
        <span className="relative font-display text-headline leading-none font-bold" style={{ color: sampleInk }} aria-hidden>
          אב
        </span>
        <bdi className="relative font-mono text-caption font-medium" style={{ color: sampleInk }}>
          {s.hex}
        </bdi>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lead font-semibold">{s.he}</h3>
          <span className="label-mono">
            <En>{s.en}</En>
          </span>
        </div>
        <p className="text-caption text-steel">
          <Iso>{s.role}</Iso>
        </p>
        <div className="mt-auto grid gap-1 border-t border-line pt-3">
          {s.surface ? (
            <>
              <Ratio fg={SURFACE_HEX.paper} bg={s.hex} label="נייר עליו" />
              <Ratio fg={HEX.steel} bg={s.hex} label="פלדה עליו" />
            </>
          ) : s.on === "paper" ? (
            <Ratio fg={s.hex} bg={SURFACE_HEX.paper} label="על נייר" />
          ) : s.token === "paper" ? (
            <>
              <Ratio fg={s.hex} bg={SURFACE_HEX.graphite} label="על גרפיט" />
              <Ratio fg={s.hex} bg={SURFACE_HEX.panel} label="על פאנל" />
            </>
          ) : s.token === "plate" ? (
            <>
              <Ratio fg={SURFACE_HEX.graphite} bg={s.hex} label="גרפיט עליו · כפתור" />
              <Ratio fg={s.hex} bg={SURFACE_HEX.panel} label="על פאנל · פוקוס" />
            </>
          ) : (
            <>
              <Ratio fg={s.hex} bg={SURFACE_HEX.graphite} label="על גרפיט" />
              <Ratio fg={s.hex} bg={SURFACE_HEX.panel} label="על פאנל" />
            </>
          )}
        </div>
      </div>
    </li>
  )
}

export function Palette() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12">
      {/* proportion */}
      <figure className="grid gap-4">
        <div className="flex h-16 overflow-hidden rounded-md border border-line" aria-hidden>
          {PROPORTION.map((p) => (
            <span
              key={p.token}
              className="relative h-full border-e border-graphite/40 last:border-e-0"
              style={{ width: `${p.pct}%`, backgroundColor: HEX[p.token] }}
            />
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {PROPORTION.map((p) => {
            const s = CORE.find((c) => c.token === p.token)!
            return (
              <li key={p.token} className="flex items-center gap-2 text-caption text-steel">
                <span aria-hidden className="size-3 rounded-xs border border-line-strong" style={{ backgroundColor: s.hex }} />
                <span>{s.he}</span>
                <bdi className="font-mono text-paper">{p.pct}%</bdi>
              </li>
            )
          })}
        </ul>
        <figcaption className="max-w-[64ch] text-body text-steel">
          <strong className="font-semibold text-paper">הצהוב מוקצב: כ-<bdi>1.5%</bdi> מהמסך.</strong> פעולה ראשית אחת, טבעת הפוקוס,
          והלוחית. בחירה = ציאן; פילטר פעיל = היפוך לנייר. כשצהוב מופיע — הוא אומר ״עשו את זה״.
        </figcaption>
      </figure>

      {/* core */}
      <div className="grid gap-4">
        <h3 className="label-mono">
          <En>CORE · 8 · FROM THE BRIEF</En>
        </h3>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CORE.map((s) => (
            <SwatchCard key={s.token} s={s} big={s.token === "plate"} />
          ))}
        </ul>
      </div>

      {/* derived + inks */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="grid content-start gap-4">
          <h3 className="label-mono">
            <En>DERIVED · CONTRAST-TUNED</En>
          </h3>
          <ul className="grid grid-cols-[minmax(0,1fr)] gap-px overflow-hidden rounded-md border border-line bg-line">
            {DERIVED.map((s) => (
              // flex-wrap: at large browser fonts the hex/contrast block moves under the name instead of being clipped
              <li key={s.token} className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-panel p-3">
                <span aria-hidden className="size-10 shrink-0 rounded-sm border border-line-strong" style={{ backgroundColor: s.hex }} />
                <span className="grid grow basis-0">
                  <span className="text-body font-medium">
                    {s.he} <span className="label-mono ms-2"><En>{s.en}</En></span>
                  </span>
                  <span className="text-caption text-steel">
                    <Iso>{s.role}</Iso>
                  </span>
                </span>
                <span className="ms-auto grid shrink-0 justify-items-end gap-1">
                  <bdi className="font-mono text-caption text-paper">{s.hex}</bdi>
                  {s.surface ? (
                    <bdi className="font-mono text-micro text-steel">paper {contrast(SURFACE_HEX.paper, s.hex).toFixed(1)}:1</bdi>
                  ) : (
                    <bdi className="font-mono text-micro text-steel">
                      {s.on} {contrast(s.hex, SURFACE_HEX[s.on ?? "panel"]).toFixed(1)}:1
                    </bdi>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-4">
          <h3 className="label-mono">
            <En>INKS · FOR PAPER DOCUMENTS</En>
          </h3>
          <div className="surface-paper grid gap-4 rounded-md p-4 shadow-paper">
            <p className="text-caption">
              משטחי נייר שמורים למסמכים: חשבונית, מחירון, דף חשבון. אותם גוונים — כהים יותר, כדי לעבור <bdi>4.5:1</bdi>.
            </p>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {INKS.map((s) => (
                <li key={s.token} className="flex items-center gap-3">
                  <span aria-hidden className="size-8 shrink-0 rounded-sm" style={{ backgroundColor: s.hex }} />
                  <span className="grid">
                    <span className="text-caption font-semibold" style={{ color: s.hex }}>
                      {s.he}
                    </span>
                    <bdi className="font-mono text-micro text-graphite/80">
                      {s.hex} · {contrast(s.hex, SURFACE_HEX.paper).toFixed(1)}:1
                    </bdi>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
