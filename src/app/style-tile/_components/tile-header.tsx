"use client"

import { useEffect, useRef, useState } from "react"
import { Grid3x3, ShoppingCart } from "lucide-react"
import { En } from "@/components/spark/text"
import { prefersReducedMotion } from "@/lib/easing"
import { cn } from "@/lib/utils"
import { SHEETS } from "./sheet"

export function SparkMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn("size-6", className)}>
      <rect width="24" height="24" rx="3" fill="var(--color-plate)" />
      <path d="M13.5 4 7 13.2h4.6L10.4 20 17 10.6h-4.7z" fill="var(--color-graphite)" />
    </svg>
  )
}

/** Width of the strip's end-edge fade: keep in step with the nav's mask-image. */
const FADE_PX = 24

/**
 * Scroll the nav strip ONLY (never the page) so `el` sits clear of the
 * end-edge fade. element.scrollIntoView() would also scroll the document,
 * because the header link is sticky.
 */
function revealInStrip(strip: HTMLElement, el: HTMLElement) {
  const s = strip.getBoundingClientRect()
  const r = el.getBoundingClientRect()
  // Clear the fade first (end edge), then leave air at the start edge. Never
  // ask for more room than the strip has, so a link is never pushed out of a
  // narrow strip (large browser fonts on phones).
  const room = Math.max(0, s.width - r.width)
  const endPad = Math.min(FADE_PX + 8, room)
  const startPad = Math.min(32, room - endPad)
  const rtl = getComputedStyle(strip).direction === "rtl"
  const padLeft = rtl ? endPad : startPad
  const padRight = rtl ? startPad : endPad
  if (r.left < s.left + padLeft) strip.scrollBy({ left: r.left - s.left - padLeft })
  else if (r.right > s.right - padRight) strip.scrollBy({ left: r.right - s.right + padRight })
}

export function TileHeader() {
  const [grid, setGrid] = useState(false)
  const [active, setActive] = useState<string>("")
  const [count, setCount] = useState(0)
  const badge = useRef<HTMLSpanElement>(null)
  const nav = useRef<HTMLElement>(null)
  const [moreEnd, setMoreEnd] = useState(false)

  useEffect(() => {
    const onAdd = (e: Event) => {
      const qty = (e as CustomEvent<{ qty: number }>).detail?.qty ?? 1
      setCount((c) => c + qty)
      if (prefersReducedMotion()) return
      badge.current?.animate([{ transform: "scale(1)" }, { transform: "scale(1.35)" }, { transform: "scale(1)" }], {
        duration: 260,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      })
    }
    window.addEventListener("spark:cart-add", onAdd)
    return () => window.removeEventListener("spark:cart-add", onAdd)
  }, [])

  // Scroll-spy. The hero is observed too, so going back up clears
  // aria-current instead of leaving the last sheet marked.
  useEffect(() => {
    const ids = ["hero", ...SHEETS.map((s) => s.id)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id === "hero" ? "" : vis[0].target.id)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Keep the active sheet link visible inside the strip — unless the user is
  // keyboard-focused in the nav: never pull the strip away from focus.
  useEffect(() => {
    const strip = nav.current
    if (!active || !strip || strip.contains(document.activeElement)) return
    const link = strip.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
    if (link) revealInStrip(strip, link)
  }, [active])

  // Fade the end edge only while the last link's content is (partly) hidden
  // past it — not when merely padding (the list's, or the link's own) overflows.
  useEffect(() => {
    const strip = nav.current
    if (!strip) return
    const rtl = getComputedStyle(strip).direction === "rtl"
    const update = () => {
      const last = strip.querySelector<HTMLElement>("li:last-child a")
      if (!last) return
      const s = strip.getBoundingClientRect()
      const r = last.getBoundingClientRect()
      const cs = getComputedStyle(last)
      setMoreEnd(
        rtl ? r.left + parseFloat(cs.paddingLeft) < s.left - 1 : r.right - parseFloat(cs.paddingRight) > s.right + 1,
      )
    }
    update()
    strip.addEventListener("scroll", update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(strip)
    if (strip.firstElementChild) ro.observe(strip.firstElementChild)
    return () => {
      strip.removeEventListener("scroll", update)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-graphite/85 backdrop-blur-md">
        {/* max-[18rem]: rem media queries scale with the browser's default font size, so
            this is a phone with Large/Very large text: the wordmark goes sr-only and the
            gaps tighten, so the nav strip keeps room for at least one whole link */}
        <div className="mx-auto flex h-14 max-w-[1360px] items-center gap-4 px-4 max-[18rem]:gap-3 sm:px-6 lg:px-10">
          {/* name = the visible text + a hidden purpose (label-in-name, WCAG 2.5.3).
              #top with no such id = the top of the document (HTML spec), so it lands at 0 */}
          <a href="#top" className="relative flex shrink-0 items-center gap-3 rounded-sm">
            <SparkMark />
            <span className="flex items-baseline gap-2 max-[18rem]:sr-only">
              <span className="text-body font-semibold text-paper">ספרק</span>
              <span className="label-mono hidden sm:inline">
                <En>Style Tile · Rev A</En>
              </span>
              <span className="sr-only">— לראש העמוד</span>
            </span>
          </a>

          {/* @container: labels show only when the strip is >= 49rem wide — rem scales
              with the browser's default font size, so they never clip at Large/Very large.
              The mask's 24px is FADE_PX. */}
          <nav
            ref={nav}
            aria-label="גיליונות"
            data-more-end={moreEnd}
            className="@container -me-2 min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] data-[more-end=true]:[mask-image:linear-gradient(to_right,transparent,#000_24px)]"
          >
            <ol className="ms-auto flex w-max items-center gap-1 pe-6">
              {SHEETS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "location" : undefined}
                    onFocus={(e) => {
                      // keyboard focus only: sliding the strip under a pointer would
                      // move the link away before mouseup and lose the click
                      if (nav.current && e.currentTarget.matches(":focus-visible")) revealInStrip(nav.current, e.currentTarget)
                    }}
                    // relative: keeps the sr-only label inside the scroll strip (it widened the page at 320px)
                    className="relative flex h-8 items-center gap-2 rounded-sm px-2 text-caption whitespace-nowrap text-steel transition-colors duration-fast hover:bg-panel hover:text-paper focus-visible:-outline-offset-2 aria-[current=location]:text-paper"
                  >
                    <span className="font-mono text-micro text-fog tabular-nums [[aria-current=location]_&]:text-cyan">
                      <bdi>{String(s.n).padStart(2, "0")}</bdi>
                    </span>
                    <span className="sr-only @min-[49rem]:not-sr-only">{s.he}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <button
            type="button"
            aria-pressed={grid}
            onClick={() => setGrid((g) => !g)}
            className="relative flex h-8 shrink-0 items-center gap-2 rounded-sm border border-line-strong px-2 text-caption text-steel transition-colors duration-fast hover:border-edge hover:text-paper aria-pressed:border-cyan/60 aria-pressed:text-cyan"
          >
            <Grid3x3 className="size-4" strokeWidth={1.5} aria-hidden />
            <span className="hidden sm:inline">
              רשת <bdi>4px</bdi>
            </span>
            <span className="sr-only sm:hidden">
              הצג רשת <bdi>4px</bdi>
            </span>
          </button>

          <span
            id="tile-cart"
            className="relative grid size-8 shrink-0 place-items-center rounded-sm border border-line-strong text-paper"
            role="status"
            aria-label={count ? `${count} פריטים בסל הדוגמה` : "סל הדוגמה ריק"}
          >
            <ShoppingCart className="size-4" strokeWidth={1.5} aria-hidden />
            <span
              ref={badge}
              aria-hidden
              className={`absolute -end-2 -top-2 h-4 min-w-4 place-items-center rounded-full bg-plate px-1 font-mono text-[10px] leading-none font-semibold text-graphite ${count ? "grid" : "hidden"}`}
            >
              {count}
            </span>
          </span>
        </div>
      </header>
      {grid ? (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[60]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, rgb(60 200 255 / 0.10) 0 1px, transparent 1px 4px), repeating-linear-gradient(to right, rgb(60 200 255 / 0.10) 0 1px, transparent 1px 4px), repeating-linear-gradient(to bottom, rgb(60 200 255 / 0.18) 0 1px, transparent 1px 16px)",
          }}
        />
      ) : null}
    </>
  )
}
