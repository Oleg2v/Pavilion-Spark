"use client"

import { EASE, prefersReducedMotion } from "@/lib/easing"

/**
 * The signature micro-interaction: a 400ms spark trail from an element
 * (the "הוסף לסל" button) to another (the cart). One shared, lazily created
 * full-viewport canvas; DPR-aware; additive blending; zero layout work.
 * Reduced motion: no particles — the callback fires immediately.
 */

type Pt = { x: number; y: number }
type Particle = {
  c: Pt
  delay: number
  dur: number
  width: number
  color: string
  prev: Pt | null
}

const TOTAL_MS = 400
const COLORS = { core: "255, 248, 214", plate: "247, 209, 23", cyan: "60, 200, 255" }

let canvas: HTMLCanvasElement | null = null
let ctx: CanvasRenderingContext2D | null = null

function ensureCanvas() {
  if (canvas && ctx) return
  canvas = document.createElement("canvas")
  canvas.setAttribute("aria-hidden", "true")
  Object.assign(canvas.style, {
    position: "fixed",
    inset: "0",
    width: "100vw",
    height: "100vh",
    pointerEvents: "none",
    zIndex: "80",
  })
  document.body.appendChild(canvas)
  ctx = canvas.getContext("2d")
}

function resize() {
  if (!canvas || !ctx) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = window.innerWidth
  const h = window.innerHeight
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const center = (el: Element): Pt => {
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}

const quad = (a: Pt, c: Pt, b: Pt, t: number): Pt => {
  const u = 1 - t
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y }
}

export function fireSpark(from: Element, to: Element, onArrive?: () => void) {
  if (prefersReducedMotion()) {
    onArrive?.()
    return
  }
  ensureCanvas()
  resize()
  const a = center(from)
  const b = center(to)
  const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  const dist = Math.hypot(b.x - a.x, b.y - a.y)
  // control point: lift the arc perpendicular to the path (always upward-ish)
  const nx = -(b.y - a.y) / (dist || 1)
  const ny = (b.x - a.x) / (dist || 1)
  const lift = Math.min(160, dist * 0.35)
  const sign = ny > 0 ? -1 : 1

  const particles: Particle[] = Array.from({ length: 22 }, (_, i) => {
    const jitter = (Math.random() - 0.5) * Math.min(90, dist * 0.25)
    return {
      c: { x: mid.x + nx * (lift * sign + jitter), y: mid.y + ny * (lift * sign + jitter) },
      delay: i === 0 ? 0 : 10 + Math.random() * 110,
      dur: i === 0 ? 300 : 200 + Math.random() * 90,
      width: i === 0 ? 3 : 0.8 + Math.random() * 1.6,
      color: i === 0 ? COLORS.core : i % 6 === 0 ? COLORS.cyan : COLORS.plate,
      prev: null,
    }
  })

  const start = performance.now()
  let arrived = false

  const frame = (now: number) => {
    if (!ctx || !canvas) return
    const elapsed = now - start
    // fade previous frame → short luminous trail
    ctx.globalCompositeOperation = "destination-out"
    ctx.fillStyle = "rgba(0,0,0,0.32)"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
    ctx.globalCompositeOperation = "lighter"
    ctx.lineCap = "round"

    for (const p of particles) {
      const t = Math.min(1, Math.max(0, (elapsed - p.delay) / p.dur))
      if (t <= 0) continue
      const pos = quad(a, p.c, b, EASE.zap(t))
      const alpha = t < 0.85 ? 1 : (1 - t) / 0.15
      if (p.prev) {
        ctx.strokeStyle = `rgba(${p.color}, ${alpha})`
        ctx.lineWidth = p.width
        ctx.beginPath()
        ctx.moveTo(p.prev.x, p.prev.y)
        ctx.lineTo(pos.x, pos.y)
        ctx.stroke()
      }
      p.prev = t < 1 ? pos : null
    }

    if (!arrived && elapsed >= particles[0].dur) {
      arrived = true
      onArrive?.()
    }
    if (elapsed < TOTAL_MS + 120) {
      requestAnimationFrame(frame)
    } else {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    }
  }
  requestAnimationFrame(frame)
}
