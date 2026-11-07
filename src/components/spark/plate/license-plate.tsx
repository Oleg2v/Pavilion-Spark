import { cn } from "@/lib/utils"
import { GLYPHS, GLYPH_H, GLYPH_W, HYPHEN_W, PLATE_H, PLATE_W, STROKE, formatPlate, plateGroups } from "./glyphs"
const BAND = { x: 5, y: 5, w: 46, h: 100 }
const DIGIT_Y = (PLATE_H - GLYPH_H) / 2
const INK = "#111315"

type Layout = { x: number; ch: string }[]

function layout(digits: string): Layout {
  const groups = plateGroups(digits)
  const gap = digits.length >= 8 ? 6 : 9
  const items: { ch: string; w: number }[] = []
  groups.forEach((grp, gi) => {
    if (gi > 0) items.push({ ch: "-", w: HYPHEN_W })
    for (const ch of grp) items.push({ ch, w: GLYPH_W })
  })
  const total = items.reduce((s, it) => s + it.w, 0) + gap * (items.length - 1)
  const areaStart = BAND.x + BAND.w + 4
  const areaEnd = PLATE_W - 8
  let x = areaStart + (areaEnd - areaStart - total) / 2
  return items.map((it) => {
    const out = { x, ch: it.ch }
    x += it.w + gap
    return out
  })
}

function IsraeliFlag({ x, y, w }: { x: number; y: number; w: number }) {
  const h = (w * 8) / 11
  const u = h / 160 // flag spec units: 220 × 160
  const cxF = x + w / 2
  const cyF = y + h / 2
  const R = 30 * u // star circumradius
  const tri = (rot: number) =>
    [0, 120, 240]
      .map((a) => {
        const rad = ((a + rot - 90) * Math.PI) / 180
        return `${(cxF + R * Math.cos(rad)).toFixed(2)},${(cyF + R * Math.sin(rad)).toFixed(2)}`
      })
      .join(" ")
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#fff" />
      <rect x={x} y={y + 15 * u} width={w} height={25 * u} fill="#0038b8" />
      <rect x={x} y={y + h - 40 * u} width={w} height={25 * u} fill="#0038b8" />
      <polygon points={tri(0)} fill="none" stroke="#0038b8" strokeWidth={5.5 * u} />
      <polygon points={tri(180)} fill="none" stroke="#0038b8" strokeWidth={5.5 * u} />
    </g>
  )
}

export type LicensePlateProps = {
  /** 7 or 8 digits; anything else renders as typed. */
  value: string
  className?: string
  /** Accessible name; pass `decorative` to hide from assistive tech. */
  label?: string
  decorative?: boolean
  /** Unique prefix for the SVG ids; needed only when one page shows the same plate twice. */
  idPrefix?: string
}

/**
 * Pixel-accurate Israeli licence plate (520 × 110 mm, euroband, DIN-style
 * digits). Pure SVG — scales to any width with zero font dependencies.
 * Hook-free on purpose: renders on the server (no client JS) and can also
 * be imported by client components (the Stage 1 plate input).
 */
export function LicensePlate({ value, className, label, decorative, idPrefix }: LicensePlateProps) {
  const digits = value.replace(/\D/g, "")
  const clipId = `${idPrefix ?? "plate"}-${digits || "x"}-glyph`
  const items = layout(digits)
  const name = label ?? `לוחית רישוי ${formatPlate(digits)}`

  return (
    <svg
      viewBox={`0 0 ${PLATE_W} ${PLATE_H}`}
      className={cn("block h-auto w-full", className)}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : name}
      aria-hidden={decorative ? true : undefined}
      direction="ltr"
    >
      <defs>
        <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" width={GLYPH_W} height={GLYPH_H} />
        </clipPath>
        <linearGradient id={`${clipId}-sheen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* body */}
      <rect width={PLATE_W} height={PLATE_H} rx="8" fill="var(--color-plate, #f7d117)" />
      {/* embossed rim */}
      <rect x="2.25" y="2.25" width={PLATE_W - 4.5} height={PLATE_H - 4.5} rx="6.5" fill="none" stroke={INK} strokeWidth="2.5" />

      {/* euroband */}
      <path
        d={`M${BAND.x + 4} ${BAND.y} H${BAND.x + BAND.w} V${BAND.y + BAND.h} H${BAND.x + 4} A4 4 0 0 1 ${BAND.x} ${BAND.y + BAND.h - 4} V${BAND.y + 4} A4 4 0 0 1 ${BAND.x + 4} ${BAND.y} Z`}
        fill="var(--color-euro, #003da5)"
      />
      <IsraeliFlag x={BAND.x + 7.5} y={BAND.y + 8} w={31} />
      {/* IL — drawn, not typed */}
      <g stroke="#fff" strokeWidth="3.6" fill="none" strokeLinecap="butt">
        <path d={`M${BAND.x + 15.5} 44.5 V65`} />
        <path d={`M${BAND.x + 23.5} 44.5 V63.2 H${BAND.x + 33}`} />
      </g>
      <text
        x={BAND.x + BAND.w / 2}
        y="80.5"
        textAnchor="middle"
        fontSize="9.6"
        fontWeight="600"
        fill="#fff"
        fontFamily="var(--font-plex), 'IBM Plex Sans Hebrew', sans-serif"
        direction="rtl"
      >
        ישראל
      </text>
      <text
        x={BAND.x + BAND.w / 2}
        y="94.5"
        textAnchor="middle"
        fontSize="8.6"
        fontWeight="600"
        fill="#fff"
        fontFamily="'Noto Sans Arabic', 'Geeza Pro', 'Segoe UI', Tahoma, sans-serif"
        direction="rtl"
      >
        إسرائيل
      </text>

      {/* digits */}
      <g stroke={INK} strokeWidth={STROKE} fill="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit={4}>
        {items.map((it, i) =>
          it.ch === "-" ? (
            <rect key={i} x={it.x} y={DIGIT_Y + 31.75} width={HYPHEN_W} height={STROKE} fill={INK} stroke="none" />
          ) : (
            <g key={i} transform={`translate(${it.x} ${DIGIT_Y})`} clipPath={`url(#${clipId})`}>
              <path
                d={GLYPHS[it.ch] ?? ""}
                transform={it.ch === "9" ? `rotate(180 ${GLYPH_W / 2} ${GLYPH_H / 2})` : undefined}
              />
            </g>
          ),
        )}
      </g>

      {/* retro-reflective sheen */}
      <rect width={PLATE_W} height={PLATE_H} rx="8" fill={`url(#${clipId}-sheen)`} pointerEvents="none" />
    </svg>
  )
}
