import { cn } from "@/lib/utils"

/**
 * Blueprint line-art for parts. One visual language for every product
 * image: 1.25px cyan strokes (non-scaling), centre marks dashed, accents
 * at 2.25px. Drawn on a 160 × 120 sheet. No photography in core flows.
 */
export type PartKind = "headlight" | "bulb" | "mirror" | "radiator" | "fan" | "bumper"

const DASH = { strokeDasharray: "2 3", opacity: 0.45 } as const

function Headlight() {
  return (
    <>
      <path d="M16 72C19 47 52 31 106 28L141 29.5C146 29.8 149 34 147.5 38.5L134 79C132 85.5 126.5 89 119 89.5L40 93C25 93.8 14.5 85 16 72Z" />
      <path d="M27 71C30 52 58 40 104 37.5L133.5 38.5L123 74.5C121.6 79 118 81 113 81.2L43 84.2C33 84.6 26 79 27 71Z" opacity={0.55} />
      <path d="M33 61C44 49 74 42.5 128 42" strokeWidth={2.25} />
      <circle cx="56" cy="66" r="12.5" />
      <circle cx="56" cy="66" r="7.5" opacity={0.7} />
      <circle cx="56" cy="66" r="1.5" fill="currentColor" />
      <circle cx="92" cy="61" r="9.5" />
      <circle cx="92" cy="61" r="4" opacity={0.6} />
      <path d="M64 31.2V22H78V30.2" />
      <path d="M118 89.6L120 99H108L106.5 90.2" />
      <path d="M140 50H150V64H136" />
      <path d="M56 44V88M34 66H78" style={DASH} />
    </>
  )
}

function Bulb() {
  return (
    <>
      <path d="M80 8V114" style={DASH} />
      <path d="M68 28C68 19 92 19 92 28V60H68Z" />
      <path d="M76 20.5C77 14.5 83 14.5 84 20.5" />
      <path d="M71 44L74 40L77 44L80 40L83 44L86 40L89 44" strokeWidth={1.75} />
      <path d="M71 44V60M89 44V60" opacity={0.55} />
      <path d="M62 60H98V67H62Z" />
      <path d="M46 67H114V73H46Z" />
      <path d="M52 73V77H58M108 73V77H102" opacity={0.6} />
      <path d="M68 73H92V95H68Z" />
      <path d="M68 80H92M68 87H92" opacity={0.35} />
      <path d="M74 95V107M86 95V107" strokeWidth={2.25} />
    </>
  )
}

function Mirror() {
  return (
    <>
      <path d="M24 44C24 33 33 27 46 27L116 30C130 31 139 41 138 55L136 74C135 86 126 94 113 94L44 92C32 91.6 24 83 24 72Z" />
      <path d="M33 46C33 39 39 35 47 35L114 37.6C124 38.3 130 45.5 129.6 55L128 72C127.4 80 121 86 112 86L46 84.6C38.4 84.3 33 78.6 33 71Z" opacity={0.6} />
      <path d="M41 50L66 44M41 58L84 47.5" opacity={0.35} />
      <path d="M118 31.5C127 33.5 134 39 136.6 47" strokeWidth={2.25} />
      <path d="M116 93L130 108H150L147 88L137 80" />
      <circle cx="140" cy="99" r="2.25" />
      <path d="M80 30V90M28 61H134" style={DASH} />
    </>
  )
}

function Radiator() {
  const fins = Array.from({ length: 15 }, (_, i) => 36 + i * 6)
  return (
    <>
      <path d="M30 30H130V92H30Z" />
      <path d={fins.map((x) => `M${x} 30V92`).join("")} opacity={0.3} />
      <path d="M30 46H130M30 61H130M30 76H130" opacity={0.55} />
      <path d="M18 26C18 24.9 18.9 24 20 24H30V98H20C18.9 98 18 97.1 18 96Z" />
      <path d="M130 24H140C141.1 24 142 24.9 142 26V96C142 97.1 141.1 98 140 98H130Z" />
      <path d="M142 33H155V43H142" strokeWidth={1.75} />
      <path d="M18 79H5V89H18" strokeWidth={1.75} />
      <circle cx="136" cy="16" r="5" />
      <path d="M136 21V24" />
      <path d="M24 98V107M136 98V107" />
      <path d="M80 18V104" style={DASH} />
    </>
  )
}

function Fan() {
  const blade = "M80 49C86 33 103 25 117 31C114 43 101 51 89 54Z"
  return (
    <>
      <path d="M32 10H128C131.3 10 134 12.7 134 16V104C134 107.3 131.3 110 128 110H32C28.7 110 26 107.3 26 104V16C26 12.7 28.7 10 32 10Z" />
      <circle cx="80" cy="60" r="45" opacity={0.55} />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={blade} transform={`rotate(${a} 80 60)`} />
      ))}
      <circle cx="80" cy="60" r="12" />
      <circle cx="80" cy="60" r="4" />
      <path d="M30 60H130M80 14V106" style={DASH} />
    </>
  )
}

function Bumper() {
  return (
    <>
      <path d="M8 52C8 41 17 34 30 34H130C143 34 152 41 152 52L150 74C149 83 142 89 132 89H28C18 89 11 83 10 74Z" />
      <path d="M17 47C40 45 120 45 143 47" opacity={0.5} />
      <path d="M62 40H98V53H62Z" />
      <path d="M48 62H112C114.2 62 116 63.8 116 66V76C116 78.2 114.2 80 112 80H48C45.8 80 44 78.2 44 76V66C44 63.8 45.8 62 48 62Z" />
      <path d="M48 67H112M48 71.5H112M48 76H112" opacity={0.4} />
      <circle cx="27" cy="70" r="6.5" />
      <circle cx="133" cy="70" r="6.5" />
      <path d="M80 28V96" style={DASH} />
    </>
  )
}

const ART: Record<PartKind, () => React.ReactNode> = {
  headlight: Headlight,
  bulb: Bulb,
  mirror: Mirror,
  radiator: Radiator,
  fan: Fan,
  bumper: Bumper,
}

export function PartArt({
  kind,
  className,
  title,
}: {
  kind: PartKind
  className?: string
  title?: string
}) {
  const Art = ART[kind]
  return (
    <svg
      viewBox="0 0 160 120"
      className={cn("block h-auto w-full text-cyan [&_*]:[vector-effect:non-scaling-stroke]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <Art />
    </svg>
  )
}
