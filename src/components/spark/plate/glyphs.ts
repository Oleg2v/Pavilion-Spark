/**
 * Plate digits — a DIN-1451-style construction drawn as centre-line strokes.
 *
 * Every glyph lives in a W × H box (mm on a 520 × 110 mm plate). Strokes are
 * rendered with a uniform STROKE width, butt caps and miter joins, and each
 * glyph is clipped to its box so that overshooting strokes produce the flat,
 * machine-cut terminals of a real plate. No font file is involved.
 */

/** Plate geometry in millimetres (EU-format Israeli plate, 520 × 110). */
export const PLATE_W = 520
export const PLATE_H = 110

export const GLYPH_W = 44
export const GLYPH_H = 74
export const HYPHEN_W = 18
export const STROKE = 10.5

const r = 16.75 // full-width bowl radius on the centre line
const cx = GLYPH_W / 2
const yTop = STROKE / 2 // 5.25
const yBot = GLYPH_H - STROKE / 2 // 68.75

const f = (n: number) => +n.toFixed(2)
const polar = (ox: number, oy: number, rad: number, deg: number) => {
  const a = (deg * Math.PI) / 180
  return [f(ox + rad * Math.cos(a)), f(oy + rad * Math.sin(a))] as const
}

/** Tangent point on circle (C, rad) for a line from external point P. */
function tangentPoint(px: number, py: number, ox: number, oy: number, rad: number, pick: (deg: number) => boolean) {
  const dx = px - ox
  const dy = py - oy
  const d = Math.hypot(dx, dy)
  const base = (Math.atan2(dy, dx) * 180) / Math.PI
  const off = (Math.acos(rad / d) * 180) / Math.PI
  const cands = [base + off, base - off].map((a) => ((a % 360) + 360) % 360)
  const deg = cands.find(pick) ?? cands[0]
  return { deg, pt: polar(ox, oy, rad, deg) }
}

const lowerBowlY = yBot - r // 52

function build(): Record<string, string> {
  const g: Record<string, string> = {}

  // 0 — stadium
  g["0"] = `M${f(cx - r)} ${f(yTop + r)} A${r} ${r} 0 0 1 ${f(cx + r)} ${f(yTop + r)} V${f(yBot - r)} A${r} ${r} 0 0 1 ${f(cx - r)} ${f(yBot - r)} Z`

  // 1 — stem right of centre + diagonal flag
  g["1"] = `M27 -6 V${GLYPH_H + 6} M28 1.5 L9.5 18.5`

  // 2 — top bowl flows tangentially into a straight diagonal, flat base
  {
    const oy = yTop + r
    const end = { x: 7, y: yBot }
    const t = tangentPoint(end.x, end.y, cx, oy, r, (d) => d > 0 && d < 90)
    const start = polar(cx, oy, r, 180)
    g["2"] = `M${start[0]} ${start[1]} A${r} ${r} 0 1 1 ${t.pt[0]} ${t.pt[1]} L${end.x} ${end.y} H${GLYPH_W + 8}`
  }

  // 3 — flat top, diagonal, lower bowl
  {
    const b = polar(cx, lowerBowlY, r, 250)
    const e = polar(cx, lowerBowlY, r, 158)
    g["3"] = `M-6 ${yTop} H34.5 L${b[0]} ${b[1]} A${r} ${r} 0 1 1 ${e[0]} ${e[1]}`
  }

  // 4 — closed apex, crossbar at two-thirds
  g["4"] = `M31.5 ${GLYPH_H + 6} V${yTop} L${f(STROKE / 2)} 50.5 H${GLYPH_W + 8}`

  // 5 — top bar, short stem, lower bowl
  {
    const stemX = 7.5
    const a = (Math.acos((stemX - cx) / r) * 180) / Math.PI // lower solution
    const start = polar(cx, lowerBowlY, r, 360 - a) // upper-left of bowl
    const e = polar(cx, lowerBowlY, r, 142)
    // stem and bowl are separate sub-paths: a joined path would miter into a spike
    g["5"] = `M${GLYPH_W + 8} ${yTop} H${stemX} V${f(start[1] + 3)} M${start[0]} ${start[1]} A${r} ${r} 0 1 1 ${e[0]} ${e[1]}`
  }

  // 6 — straight diagonal tail tangent into a full lower bowl
  {
    const top = { x: 34, y: -3 }
    const t = tangentPoint(top.x, top.y, cx, lowerBowlY, r, (d) => d > 180 && d < 270)
    const anti = polar(cx, lowerBowlY, r, t.deg + 180)
    g["6"] = `M${top.x} ${top.y} L${t.pt[0]} ${t.pt[1]} A${r} ${r} 0 1 0 ${anti[0]} ${anti[1]} A${r} ${r} 0 1 0 ${t.pt[0]} ${t.pt[1]}`
  }

  // 7 — top bar, straight diagonal
  g["7"] = `M-6 ${yTop} H36.5 L13.5 ${GLYPH_H + 8}`

  // 8 — two stacked rings, upper one narrower
  {
    const rt = 15
    const rb = r
    const ty = yTop
    const my = yTop + 2 * rt
    g["8"] = `M${cx} ${ty} A${rt} ${rt} 0 1 1 ${cx} ${my} A${rt} ${rt} 0 1 1 ${cx} ${ty} Z M${cx} ${my} A${rb} ${rb} 0 1 1 ${cx} ${yBot} A${rb} ${rb} 0 1 1 ${cx} ${my} Z`
  }

  // 9 — the 6 turned 180°
  g["9"] = g["6"]

  return g
}

export const GLYPHS = build()

/** Digit groups for Israeli plates: 7 → 2-3-2, 8 → 3-2-3. */
export function plateGroups(digits: string): string[] {
  const d = digits.replace(/\D/g, "")
  if (d.length === 8) return [d.slice(0, 3), d.slice(3, 5), d.slice(5, 8)]
  if (d.length === 7) return [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7)]
  return [d]
}

export function formatPlate(digits: string): string {
  return plateGroups(digits).join("-")
}
