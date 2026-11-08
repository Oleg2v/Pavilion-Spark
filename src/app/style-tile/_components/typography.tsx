import { TYPE_SCALE } from "@/lib/design-tokens"
import { cn } from "@/lib/utils"
import { Price } from "@/components/spark/price"
import { LivePx } from "./live-px"
import { En, Iso, Words } from "@/components/spark/text"

const FAMILIES = [
  {
    cls: "font-sans",
    name: "IBM Plex Sans Hebrew",
    role: "ממשק — כל טקסט רץ, תוויות, שדות",
    weights: "400 · 500 · 600",
    glyph: "אבג",
    sample: "פנס ראשי ימני לטויוטה קורולה 2022, LED, עם מנוע כיוונון.",
  },
  {
    cls: "font-display font-bold",
    name: "Karantina",
    role: "כותרות ענק ומספרים — רק מ-40px ומעלה",
    weights: "700",
    glyph: "ספרק",
    sample: "טויוטה · קורולה הייבריד · 2022",
  },
  {
    cls: "font-mono",
    name: "IBM Plex Mono",
    role: "כל מה שמקלידים לחיפוש: מק״ט, OE, לוחית, PO, מחיר",
    weights: "400 · 500 · 600",
    glyph: "0Ø1",
    sample: "TYC 20-1234-00 · OE 81130-02B60 · ₪1,240.00",
  },
]

/** Static map — Tailwind cannot see dynamically built class names. */
const SIZE: Record<string, string> = {
  micro: "text-micro",
  caption: "text-caption",
  body: "text-body",
  lead: "text-lead",
  title: "text-title",
  heading: "text-heading",
  headline: "text-headline",
  display: "text-display",
  mega: "text-mega",
}

const RULES = [
  ["לא מרווחים אותיות בעברית.", "ריווח (tracking) רק בתוויות מונו לטיניות."],
  ["מינימום 13px לעברית.", "micro (11–12px) שמור למונו לטיני בלבד."],
  ["כל מספר, מק״ט ומחיר בתוך ‎<bdi>‎ ובספרות טבולריות.", "כך ״12-345-67״ לא מתהפך בתוך משפט עברי."],
  ["גרשיים אמיתיים: מק״ט, ש״ח, מס׳.", "גרשיים ״ וגרש ׳ — לא מירכאות ולא אפוסטרוף."],
  ["Karantina רק בגדלים 7–9.", "צפוף מדי לגוף טקסט; מושלם למספר ענק."],
]

export function Typography() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12">
      <ul className="grid gap-4 lg:grid-cols-3">
        {FAMILIES.map((f) => (
          <li key={f.name} className="flex flex-col gap-4 overflow-hidden rounded-md border border-line bg-panel p-6">
            <span aria-hidden className={cn("block text-[clamp(4rem,3rem+4vw,7rem)] leading-none text-paper", f.cls)}>
              {f.glyph}
            </span>
            <div className="grid gap-1">
              <h3 className="text-lead font-semibold">
                <En>{f.name}</En>
              </h3>
              <p className="text-caption text-steel">
                <Iso>{f.role}</Iso>
              </p>
              <p className="font-mono text-micro text-fog">
                <bdi>{f.weights}</bdi>
              </p>
            </div>
            <p className={cn("mt-auto border-t border-line pt-4 text-lead text-paper", f.cls, f.cls.includes("display") && "text-heading")}>
              {f.cls.includes("mono") ? (
                <span className="flex flex-wrap gap-x-3 gap-y-1">
                  {f.sample.split(" · ").map((part) => (
                    <bdi key={part}>
                      <Words>{part}</Words>
                    </bdi>
                  ))}
                </span>
              ) : (
                <Iso>{f.sample}</Iso>
              )}
            </p>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="label-mono">
            <En>FLUID SCALE · 9 STEPS · 390 → 1440 PX</En>
          </h3>
          <p className="text-caption text-steel">
            שנו את רוחב החלון — ״<En>now</En>״ מתעדכן מ-<En className="font-mono">clamp()</En> חי.
          </p>
        </div>
        <ol className="grid overflow-hidden rounded-md border border-line">
          {TYPE_SCALE.map((t) => (
            <li
              key={t.token}
              className="grid grid-cols-1 gap-3 border-b border-line bg-graphite p-4 last:border-b-0 md:grid-cols-[4rem_minmax(0,1fr)_17.5rem] md:items-center md:gap-6 md:px-6"
            >
              <span className="flex items-baseline gap-3 md:block">
                <bdi className="font-mono text-caption text-cyan tabular-nums">{String(t.step).padStart(2, "0")}</bdi>
                <En className="font-mono text-micro text-steel md:mt-1 md:block">{t.token}</En>
              </span>
              <span
                id={`ts-${t.token}`}
                className={cn(
                  "min-w-0 truncate text-paper",
                  SIZE[t.token],
                  t.family === "display" && "font-display",
                  t.family === "mono" && "font-mono",
                )}
                style={{ fontWeight: t.weight }}
              >
                {t.family === "mono" ? <En>{t.sample}</En> : t.token === "mega" ? <Price value={389} display /> : t.sample}
              </span>
              <span className="grid gap-1 md:justify-items-end md:text-end">
                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <bdi lang="en" className="font-mono text-micro text-paper">
                    {t.min}→{t.max}px · lh {t.leading}
                  </bdi>
                  <LivePx targetId={`ts-${t.token}`} />
                </span>
                <span className="text-caption text-steel">
                  <Iso>{t.use}</Iso>
                </span>
              </span>
            </li>
          ))}
        </ol>
        <details className="group rounded-md border border-line bg-panel">
          <summary className="flex h-12 cursor-pointer list-none items-center justify-between gap-4 rounded-md px-4 text-caption font-medium text-paper hover:bg-panel-2">
            <span>
              הצג את ביטויי ה-<En className="font-mono">clamp()</En>
            </span>
            <span aria-hidden className="font-mono text-micro text-steel transition-transform duration-fast group-open:rotate-45">
              +
            </span>
          </summary>
          {/* scrolls sideways on phones: a named, focusable region so keyboards in every
              browser can reach it (Safari does not focus scrollers), and [tabindex] picks
              up the header scroll-margin */}
          <pre
            tabIndex={0}
            role="region"
            aria-label="ביטויי ה-clamp() של סקאלת הטקסט"
            className="overflow-x-auto border-t border-line p-4 font-mono text-micro leading-6 text-steel focus-visible:-outline-offset-2"
            dir="ltr"
          >
            {TYPE_SCALE.map((t) => `--text-${t.token}: ${t.clamp};`).join("\n")}
          </pre>
        </details>
      </div>

      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {RULES.map(([a, b], i) => (
          <li key={i} className="grid content-start gap-2 bg-graphite p-4">
            <bdi className="font-mono text-micro text-cyan">R{String(i + 1).padStart(2, "0")}</bdi>
            <p className="text-body font-medium text-paper">
              <Iso>{a}</Iso>
            </p>
            <p className="text-caption text-steel">
              <Iso>{b}</Iso>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
