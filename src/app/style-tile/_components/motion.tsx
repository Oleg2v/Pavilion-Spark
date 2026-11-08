"use client"

import { useEffect, useRef, useState } from "react"
import { Play, ShoppingCart, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fireSpark } from "@/components/spark/spark-trail"
import { DURATIONS, EASINGS } from "@/lib/design-tokens"
import { prefersReducedMotion } from "@/lib/easing"
import { En, Iso } from "@/components/spark/text"
import { cn } from "@/lib/utils"

const bezierCss = (b: readonly number[]) => `cubic-bezier(${b.join(", ")})`

function useReduced() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

/** Runs a dot across its track: inline-start → inline-end, RTL-aware. */
function runDot(track: HTMLElement | null, dot: HTMLElement | null, ms: number, easing: string) {
  if (!track || !dot) return
  const rtl = getComputedStyle(track).direction === "rtl"
  const dist = track.clientWidth - dot.offsetWidth
  const to = `translateX(${rtl ? -dist : dist}px)`
  if (prefersReducedMotion()) {
    dot.style.transform = to
    return
  }
  dot.animate([{ transform: "translateX(0)" }, { transform: to }], { duration: ms, easing, fill: "forwards" })
}

function DurationRuler() {
  const tracks = useRef<(HTMLDivElement | null)[]>([])
  const dots = useRef<(HTMLSpanElement | null)[]>([])
  const playAll = () => DURATIONS.forEach((d, i) => runDot(tracks.current[i], dots.current[i], d.ms, d.ease))

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="label-mono">
          <En>DURATIONS · UI ≤ 260 MS · TWO SIGNATURES</En>
        </h3>
        <Button variant="secondary" size="sm" onClick={playAll}>
          <Play strokeWidth={1.75} aria-hidden />
          הרצה במקביל
        </Button>
      </div>
      <ol className="grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-md border border-line">
        {DURATIONS.map((d, i) => (
          <li
            key={d.token}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-3 border-b border-line bg-graphite p-4 last:border-b-0 md:grid-cols-[11.25rem_minmax(0,1fr)_auto] md:px-6"
          >
            <span className="grid gap-1">
              <span className="flex flex-wrap items-baseline gap-x-3">
                <En className="font-mono text-caption text-paper">dur-{d.token}</En>
                <bdi className="font-mono text-micro text-cyan">{d.ms}ms</bdi>
              </span>
              <span className="text-caption text-steel">
                <Iso>{d.use}</Iso>
              </span>
            </span>
            <div
              ref={(el) => {
                tracks.current[i] = el
              }}
              className="relative col-span-2 h-6 md:col-span-1"
              style={{ maxInlineSize: `${Math.max(d.ms / 10, 8)}%` }}
            >
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
              <span aria-hidden className="absolute end-0 top-1/2 h-3 w-px -translate-y-1/2 bg-edge" />
              <span
                ref={(el) => {
                  dots.current[i] = el
                }}
                aria-hidden
                className={cn(
                  "absolute start-0 top-1/2 -mt-1.5 block size-3 rounded-full",
                  d.token === "spark" || d.token === "draw" ? "bg-plate" : "bg-cyan",
                )}
              />
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`הרצת ${d.token} — ${d.ms} אלפיות`}
              onClick={() => runDot(tracks.current[i], dots.current[i], d.ms, d.ease)}
              className="col-start-2 row-start-1 md:col-start-3"
            >
              <Play strokeWidth={1.75} />
            </Button>
          </li>
        ))}
      </ol>
      <p className="text-caption text-steel">
        אורך המסלול פרופורציונלי לזמן (<bdi className="font-mono">1000ms = 100%</bdi>). ציאן = ממשק, צהוב = רגעי חתימה.
      </p>
    </div>
  )
}

function EasingCurve({ token, bezier, use }: { token: string; bezier: readonly number[]; use: string }) {
  const xDot = useRef<SVGGElement>(null)
  const yDot = useRef<SVGGElement>(null)
  const bar = useRef<HTMLSpanElement>(null)
  const [x1, y1, x2, y2] = bezier
  const P = (x: number, y: number) => `${8 + x * 84} ${92 - y * 84}`
  const play = () => {
    // Reduced motion: jump straight to the end state, as the note on the sheet promises.
    const ms = prefersReducedMotion() ? 0 : 900
    xDot.current?.animate([{ transform: "translateX(0)" }, { transform: "translateX(84px)" }], { duration: ms, easing: "linear", fill: "forwards" })
    yDot.current?.animate([{ transform: "translateY(0)" }, { transform: "translateY(-84px)" }], { duration: ms, easing: bezierCss(bezier), fill: "forwards" })
    // Tailwind v4 `scale-x-0` sets the CSS `scale` property, so animate that (not transform).
    bar.current?.animate([{ scale: "0 1" }, { scale: "1 1" }], { duration: ms, easing: bezierCss(bezier), fill: "forwards" })
  }
  return (
    <li className="grid min-w-0 gap-3 rounded-md border border-line bg-panel p-4">
      <button
        type="button"
        onClick={play}
        onMouseEnter={play}
        className="group relative block rounded-sm bg-graphite bg-grid"
        aria-label={`הדגמת עקומת ${token}`}
      >
        <svg viewBox="0 0 100 100" className="block w-full [&_*]:[vector-effect:non-scaling-stroke]" aria-hidden>
          <path d="M8 92H92M8 8V92" stroke="var(--color-line-strong)" fill="none" />
          <path d="M8 92L92 8" stroke="var(--color-line)" strokeDasharray="2 3" fill="none" />
          <path d={`M${P(0, 0)}L${P(x1, y1)}M${P(1, 1)}L${P(x2, y2)}`} stroke="var(--color-edge)" fill="none" />
          <circle cx={8 + x1 * 84} cy={92 - y1 * 84} r="2" fill="var(--color-edge)" />
          <circle cx={8 + x2 * 84} cy={92 - y2 * 84} r="2" fill="var(--color-edge)" />
          <path d={`M${P(0, 0)}C${P(x1, y1)} ${P(x2, y2)} ${P(1, 1)}`} stroke="var(--color-cyan)" strokeWidth="1.75" fill="none" />
          <g ref={xDot}>
            <g ref={yDot}>
              <circle cx="8" cy="92" r="3.5" fill="var(--color-paper)" />
            </g>
          </g>
        </svg>
        <span className="absolute end-2 top-2 grid size-6 place-items-center rounded-xs border border-line-strong bg-panel text-steel opacity-0 transition-opacity duration-fast group-hover:opacity-100 group-focus-visible:opacity-100">
          <Play className="size-3" strokeWidth={2} aria-hidden />
        </span>
      </button>
      <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-line">
        <span ref={bar} className="block h-full scale-x-0 bg-cyan rtl:origin-right ltr:origin-left" />
      </span>
      <div className="grid gap-1">
        <span className="font-mono text-caption text-paper">
          <En>ease-{token}</En>
        </span>
        <span dir="ltr" className="text-end font-mono text-micro text-steel">
          {bezierCss(bezier)}
        </span>
        <p className="text-caption text-steel">
          <Iso>{use}</Iso>
        </p>
      </div>
    </li>
  )
}

function SpringAndSpark() {
  const btn = useRef<HTMLButtonElement>(null)
  const cart = useRef<HTMLSpanElement>(null)
  const badge = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(2)

  const add = () => {
    if (!btn.current || !cart.current) return
    fireSpark(btn.current, cart.current, () => {
      setCount((c) => c + 1)
      if (prefersReducedMotion()) return
      badge.current?.animate([{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }], {
        duration: 260,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      })
      cart.current?.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-3px)" }, { transform: "translateY(0)" }],
        { duration: 260, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      )
    })
  }

  return (
    <div className="grid gap-4 rounded-md border border-line bg-panel p-6 compact:p-4 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8">
      <div className="grid gap-2">
        <h3 className="flex items-center gap-2 text-title font-semibold">
          <Zap className="size-5 text-plate" strokeWidth={1.75} aria-hidden />
          חתימה: הניצוץ של ״הוסף לסל״
        </h3>
        <p className="max-w-[56ch] text-body text-steel">
          <En className="font-mono text-paper">dur-spark 400ms</En> · <En className="font-mono text-paper">ease-zap</En> — שובל חלקיקים על canvas מהכפתור אל הסל, ואז
          ״קפיצה״ של התג ב-<En className="font-mono text-paper">ease-snap</En>. בתנועה מופחתת: בלי חלקיקים, רק עדכון המונה.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6 rounded-md border border-line bg-graphite bg-grid p-4 compact:p-3 sm:gap-12 sm:p-6 lg:justify-end">
        <Button ref={btn} onClick={add} size="lg" className="compact:[&>svg]:hidden">
          <ShoppingCart aria-hidden strokeWidth={1.75} />
          הוסף לסל
        </Button>
        <span ref={cart} className="relative grid size-12 place-items-center rounded-sm border border-line-strong bg-panel text-paper">
          <ShoppingCart className="size-5" strokeWidth={1.5} aria-hidden />
          <span
            ref={badge}
            className="absolute -end-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-plate px-1 font-mono text-micro font-semibold text-graphite"
            role="status"
          >
            <bdi>{count}</bdi>
            <span className="sr-only"> פריטים בסל</span>
          </span>
        </span>
      </div>
    </div>
  )
}

const RULES = [
  ["כניסה snap, יציאה exit", "יציאה קצרה ב-30% מהכניסה — דברים עוזבים מהר יותר משהם מגיעים."],
  ["ריחוף לא מזיז פריסה", "רק צבע, קו ומסגרת CAD. אין הרמה, אין scale על כרטיסים."],
  ["לחיצה = 1px ב-80ms", "כל פעולה ראשית מקבלת משוב מכני, כמו מקש."],
  ["מספרים מתקתקים ב-260ms", "מלאי ומחיר מתעדכנים בגלגול ספרות — לא בהחלפה."],
  ["תנועה מופחתת", "הכול 0ms. שרטוט+פיצוץ → דיאגרמה סטטית. ניצוץ → עדכון מונה בלבד."],
]

export function Motion() {
  const reduced = useReduced()
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-12">
      {reduced ? (
        <p className="rounded-md border border-low/30 bg-low/12 p-4 text-body text-low" role="status">
          המערכת שלכם מבקשת תנועה מופחתת — ההדגמות כאן יקפצו ישר למצב הסופי, בדיוק כמו באפליקציה.
        </p>
      ) : null}
      <DurationRuler />
      <div className="grid gap-4">
        <h3 className="label-mono">
          <En>EASINGS · HOVER OR TAP A CURVE</En>
        </h3>
        <ul className="grid grid-cols-2 gap-4 compact:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
          {EASINGS.map((e) => (
            <EasingCurve key={e.token} token={e.token} bezier={e.bezier} use={e.use} />
          ))}
        </ul>
        <p className="text-caption text-steel">
          ועוד <En className="font-mono text-paper">ease-spring</En> — ‎<bdi className="font-mono">linear()</bdi>‎ של קפיץ <bdi>ζ 0.68</bdi>: חריגה של <bdi>5%</bdi>, אף פעם לא
          ״קופצני״. לתגי סל וצ׳יפים.
        </p>
      </div>
      <SpringAndSpark />
      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {RULES.map(([a, b], i) => (
          <li key={i} className="grid content-start gap-2 bg-graphite p-4">
            <bdi className="font-mono text-micro text-cyan">M{String(i + 1).padStart(2, "0")}</bdi>
            <p className="text-body font-medium">
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
