/** CSS-compatible cubic-bezier timing function (Newton–Raphson + bisection). */
export function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1
  const bx = 3 * (x2 - x1) - cx
  const ax = 1 - cx - bx
  const cy = 3 * y1
  const by = 3 * (y2 - y1) - cy
  const ay = 1 - cy - by
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t
  const sy = (t: number) => ((ay * t + by) * t + cy) * t
  const dx = (t: number) => (3 * ax * t + 2 * bx) * t + cx

  const solve = (x: number) => {
    let t = x
    for (let i = 0; i < 8; i++) {
      const err = sx(t) - x
      if (Math.abs(err) < 1e-5) return t
      const d = dx(t)
      if (Math.abs(d) < 1e-6) break
      t -= err / d
    }
    let lo = 0
    let hi = 1
    t = x
    while (lo < hi) {
      const v = sx(t)
      if (Math.abs(v - x) < 1e-5) return t
      if (x > v) lo = t
      else hi = t
      t = (lo + hi) / 2
      if (hi - lo < 1e-6) break
    }
    return t
  }

  return (x: number) => (x <= 0 ? 0 : x >= 1 ? 1 : sy(solve(x)))
}

export const EASE = {
  snap: cubicBezier(0.16, 1, 0.3, 1),
  exit: cubicBezier(0.55, 0, 1, 0.45),
  move: cubicBezier(0.65, 0, 0.35, 1),
  draw: cubicBezier(0.45, 0.05, 0.25, 1),
  zap: cubicBezier(0.9, 0, 0.1, 1),
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
}
