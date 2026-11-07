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

export function TileHeader() {
  const [grid, setGrid] = useState(false)
  const [active, setActive] = useState<string>("")
  const [count, setCount] = useState(0)
  const badge = useRef<HTMLSpanElement>(null)
  const nav = useRef<HTMLElement>(null)

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

  // Scroll-spy. The hero (#top) is observed too, so going back up clears
  // aria-current instead of leaving the last sheet marked.
  useEffect(() => {
    const ids = ["top", ...SHEETS.map((s) => s.id)]
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (vis[0]) setActive(vis[0].target.id === "top" ? "" : vis[0].target.id)
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  // Keep the active sheet link visible inside the horizontally scrolling nav.
  useEffect(() => {
    if (!active) return
    nav.current
      ?.querySelector<HTMLAnchorElement>(`a[href="#${active}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest" })
  }, [active])

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-graphite/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1360px] items-center gap-4 px-4 sm:px-6 lg:px-10">
          <a href="#top" className="flex shrink-0 items-center gap-3 rounded-sm" aria-label="SPARK — לראש העמוד">
            <SparkMark />
            <span className="flex items-baseline gap-2">
              <span className="text-body font-semibold text-paper">ספרק</span>
              <span className="label-mono hidden sm:inline">
                <En>Style Tile · Rev A</En>
              </span>
            </span>
          </a>

          <nav
            ref={nav}
            aria-label="גיליונות"
            className="-me-2 min-w-0 flex-1 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,#000_16px)] [scrollbar-width:none]"
          >
            <ol className="ms-auto flex w-max items-center gap-1 pe-4">
              {SHEETS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "location" : undefined}
                    onFocus={(e) => e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest" })}
                    // relative: keeps the sr-only label inside the scroll strip (it widened the page at 320px)
                    className="relative flex h-8 items-center gap-2 rounded-sm px-2 text-caption whitespace-nowrap text-steel transition-colors duration-fast hover:bg-panel hover:text-paper focus-visible:-outline-offset-2 aria-[current=location]:text-paper"
                  >
                    <span className="font-mono text-micro text-fog tabular-nums [[aria-current=location]_&]:text-cyan">
                      <bdi>{String(s.n).padStart(2, "0")}</bdi>
                    </span>
                    <span className="sr-only xl:not-sr-only">{s.he}</span>
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
            <span className="hidden sm:inline">רשת 4px</span>
            <span className="sr-only sm:hidden">הצג רשת 4px</span>
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
