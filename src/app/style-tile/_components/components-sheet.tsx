"use client"

import { useRef, useState } from "react"
import { ArrowLeft, Car, Clock, Minus, Plus, Search, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardMedia } from "@/components/ui/card"
import { Chip, FilterChip } from "@/components/ui/chip"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PartArt } from "@/components/spark/line-art"
import { fireSpark } from "@/components/spark/spark-trail"
import { ToastCard, notify } from "@/components/spark/toast-card"
import { Price } from "@/components/spark/price"
import { En, Iso } from "@/components/spark/text"
import { cn } from "@/lib/utils"
import { SpecLabel } from "./sheet"

function Frame({
  code,
  title,
  children,
  className,
  note,
}: {
  code: string
  title: string
  children: React.ReactNode
  className?: string
  note?: React.ReactNode
}) {
  return (
    <article className={cn("grid min-w-0 content-start gap-6 rounded-md border border-line bg-graphite p-4 compact:p-3 sm:p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <SpecLabel code={code}>{title}</SpecLabel>
        {note ? <p className="text-caption text-steel">{typeof note === "string" ? <Iso>{note}</Iso> : note}</p> : null}
      </div>
      {children}
    </article>
  )
}

function StateLabel({ children }: { children: React.ReactNode }) {
  // a phrase, not a code: it may wrap ("rest · hover → cad-frame" is 238px at 24px fonts)
  return (
    <span className="font-mono text-micro text-fog">
      <En className="whitespace-normal">{children}</En>
    </span>
  )
}

/* ── C-01 Button ─────────────────────────────────────────────────────── */
function ButtonSpec() {
  return (
    <Frame code="C-01" title="כפתור" note="פעולה ראשית אחת בכל מסך">
      <div className="grid gap-6">
        <div className="flex flex-wrap items-end gap-x-4 gap-y-6">
          {[
            { v: "primary" as const, label: "הוסף לסל", icon: true },
            { v: "secondary" as const, label: "הזמנה חוזרת" },
            { v: "ghost" as const, label: "ביטול" },
            { v: "danger" as const, label: "הסרה מהסל" },
            { v: "link" as const, label: "לכל ההזמנות" },
          ].map((b) => (
            <div key={b.v} className="grid justify-items-start gap-2">
              <Button variant={b.v}>
                {b.icon ? <ShoppingCart strokeWidth={1.75} aria-hidden /> : null}
                {b.label}
              </Button>
              <StateLabel>{b.v}</StateLabel>
            </div>
          ))}
        </div>
        <div className="grid gap-3 border-t border-line pt-6">
          <span className="label-mono">
            <En>STATES · PRIMARY</En>
          </span>
          <p className="sr-only">דוגמאות מצב של הכפתור הראשי ״שליחת הזמנה״: רגיל, ריחוף, פוקוס, לחיצה, טעינה ומושבת.</p>
          <div inert className="flex flex-wrap items-end gap-x-4 gap-y-6">
            {[
              { s: "rest", cls: "" },
              { s: "hover", cls: "bg-plate-hover" },
              { s: "focus", cls: "outline-2 outline-offset-2 outline-plate" },
              { s: "active", cls: "translate-y-px bg-plate-press" },
            ].map((x) => (
              <div key={x.s} className="grid justify-items-start gap-2">
                <Button className={x.cls}>
                  שליחת הזמנה
                  <ArrowLeft data-nudge strokeWidth={1.75} />
                </Button>
                <StateLabel>{x.s}</StateLabel>
              </div>
            ))}
            <div className="grid justify-items-start gap-2">
              <Button loading>
                שולחים…
              </Button>
              <StateLabel>loading · fuse</StateLabel>
            </div>
            <div className="grid justify-items-start gap-2">
              <Button disabled>שליחת הזמנה</Button>
              <StateLabel>disabled</StateLabel>
            </div>
          </div>
        </div>
        <div className="grid gap-3 border-t border-line pt-6">
          <span className="label-mono">
            <En>SIZES · 32 / 40 / 48</En>
          </span>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="sm">הוסף</Button>
            <Button size="md">הוסף לסל</Button>
            <Button size="lg">הוסף לסל</Button>
            <Button size="icon" variant="secondary" aria-label="חיפוש">
              <Search strokeWidth={1.75} />
            </Button>
          </div>
        </div>
      </div>
    </Frame>
  )
}

/* ── C-02 Input ──────────────────────────────────────────────────────── */
function Stepper() {
  const [q, setQ] = useState(2)
  return (
    <div
      role="group"
      aria-label="כמות"
      className="inline-flex h-12 items-stretch overflow-hidden rounded-sm border border-edge bg-panel focus-within:border-plate"
    >
      <button
        type="button"
        aria-label="הפחתת כמות"
        disabled={q <= 1}
        onClick={() => setQ((n) => Math.max(1, n - 1))}
        className="grid w-12 place-items-center text-steel transition-colors duration-fast hover:bg-panel-2 hover:text-paper focus-visible:-outline-offset-2 disabled:opacity-40"
      >
        <Minus className="size-4" strokeWidth={1.75} />
      </button>
      <output
        aria-live="polite"
        className="grid w-12 place-items-center border-x border-line font-mono text-body font-medium text-paper tabular-nums"
      >
        <bdi>{q}</bdi>
      </output>
      <button
        type="button"
        aria-label="הוספת כמות"
        onClick={() => setQ((n) => Math.min(99, n + 1))}
        className="grid w-12 place-items-center text-steel transition-colors duration-fast hover:bg-panel-2 hover:text-paper focus-visible:-outline-offset-2"
      >
        <Plus className="size-4" strokeWidth={1.75} />
      </button>
    </div>
  )
}

function InputSpec() {
  const [value, setValue] = useState("")
  const omnibox = useRef<HTMLInputElement>(null)
  return (
    <Frame code="C-02" title="שדה קלט">
      <div className="grid gap-2">
        <Label htmlFor="omnibox">חיפוש</Label>
        <div className="relative">
          <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute start-4 top-1/2 size-5 -translate-y-1/2 text-steel" />
          <Input
            ref={omnibox}
            id="omnibox"
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="מספר רכב, מק״ט, מספר OE או תיאור חלק"
            aria-describedby="omnibox-hint"
            className="h-14 ps-12 pe-12 text-body sm:pe-24 sm:text-lead [&::-webkit-search-cancel-button]:hidden"
            autoComplete="off"
          />
          <span className="absolute end-3 top-1/2 flex -translate-y-1/2 items-center gap-2">
            {value ? (
              <button
                type="button"
                onClick={() => {
                  setValue("")
                  omnibox.current?.focus()
                }}
                aria-label="ניקוי החיפוש"
                className="grid size-8 place-items-center rounded-sm text-steel hover:bg-panel-2 hover:text-paper"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            ) : null}
            <kbd className="hidden h-6 min-w-6 place-items-center rounded-xs border border-line-strong bg-graphite px-1 font-mono text-micro text-steel sm:grid">
              /
            </kbd>
          </span>
        </div>
        <p id="omnibox-hint" className="text-caption text-steel">
          לדוגמה: <bdi className="font-mono text-paper">12-345-67</bdi> · <bdi className="font-mono text-paper">81130-02B60</bdi> · פנס ימני קורולה 2022
        </p>
      </div>

      <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
        <div className="grid content-start gap-2">
          <Label htmlFor="po">מספר הזמנת רכש (PO)</Label>
          <Input id="po" defaultValue="PO-2026-0418" dir="ltr" className="text-end font-mono" />
          <StateLabel>mono · ltr</StateLabel>
        </div>
        <div className="grid content-start gap-2">
          <Label htmlFor="po-err">מספר רכב</Label>
          <Input id="po-err" defaultValue="12-34" aria-invalid aria-describedby="po-err-msg" dir="ltr" className="text-end font-mono" />
          <p id="po-err-msg" className="text-caption text-fault">
            <Iso>מספר רכב הוא 7 או 8 ספרות.</Iso>
          </p>
        </div>
        <div className="grid content-start gap-2">
          <Label htmlFor="dis">הערות למשלוח</Label>
          <Input id="dis" disabled placeholder="לא זמין באיסוף עצמי" />
          <StateLabel>disabled</StateLabel>
        </div>
        <div className="grid content-start gap-2">
          <span className="text-caption font-medium">כמות</span>
          <Stepper />
          <StateLabel>stepper · 48px</StateLabel>
        </div>
      </div>
    </Frame>
  )
}

/* ── C-03 Card ───────────────────────────────────────────────────────── */
function PartCard() {
  const btn = useRef<HTMLButtonElement>(null)
  const [added, setAdded] = useState(false)
  const add = () => {
    const target = document.getElementById("tile-cart") ?? btn.current
    if (btn.current && target) {
      fireSpark(btn.current, target, () => {
        setAdded(true)
        window.dispatchEvent(new CustomEvent("spark:cart-add", { detail: { qty: 1 } }))
        notify({
          tone: "cart",
          title: "נוסף לסל",
          description: (
            <>
              פנס ראשי ימני · <bdi lang="en" className="font-mono">TYC <span>20-1234-00</span></bdi> · <bdi>×1</bdi>
            </>
          ),
          action: { label: "לסל ←" },
        })
      })
    }
  }
  return (
    <Card interactive className="w-full max-w-[360px]">
      <CardMedia className="aspect-[4/3]">
        <PartArt kind="headlight" className="absolute inset-6 h-auto w-auto" />
        <span className="absolute start-3 top-3 label-mono text-cyan">
          <En>01 · ELEC</En>
        </span>
        <span className="absolute end-3 top-3">
          <Chip tone="demo">מחירי דמו</Chip>
        </span>
      </CardMedia>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="label-mono text-paper">
            <En>TYC</En>
          </span>
          <bdi className="font-mono text-caption text-steel">20-1234-00</bdi>
        </div>
        <h4 className="text-lead font-semibold">פנס ראשי ימני, LED</h4>
        {/* one span: as separate flex items, the text and the year could not wrap */}
        <p className="flex items-center gap-2 text-caption text-steel">
          <Car className="size-4 shrink-0" strokeWidth={1.5} aria-hidden />
          <span>
            טויוטה קורולה · <bdi className="font-mono">2019–2023</bdi>
          </span>
        </p>
        <p className="text-caption text-steel">
          OE <bdi className="font-mono text-paper">81130-02B60</bdi>
        </p>
        <div className="flex flex-wrap gap-2">
          <Chip tone="stock" dot>
            במלאי · <bdi className="font-mono">14</bdi>
          </Chip>
          <Chip tone="eta" className="h-auto min-h-6 py-1 whitespace-normal">
            <Clock strokeWidth={1.75} aria-hidden />
            <span>
              היום עד <bdi className="font-mono">14:00</bdi>
            </span>
          </Chip>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 pt-1">
          <div className="grid">
            <span className="text-caption text-steel">
              מחיר לדרג <bdi className="font-mono">B</bdi>
            </span>
            <Price value={389} display className="font-display text-headline font-bold text-paper" />
          </div>
          <div className="grid justify-items-end">
            <s className="font-mono text-caption text-fog">
              <bdi>₪442</bdi>
            </s>
            <span className="font-mono text-micro text-stock">
              <bdi>−12%</bdi>
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button ref={btn} onClick={add} className="flex-1 compact:[&>svg]:hidden">
          <ShoppingCart strokeWidth={1.75} aria-hidden />
          {added ? "הוסף עוד" : "הוסף לסל"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function SkeletonCard() {
  return (
    <div aria-hidden className="w-full max-w-[360px] rounded-md border border-line bg-panel">
      <div className="aspect-[4/3] rounded-t-[7px] border-b border-line skeleton" />
      <div className="grid gap-3 p-4">
        <div className="h-4 w-24 skeleton" />
        <div className="h-6 w-3/4 skeleton" />
        <div className="h-4 w-1/2 skeleton" />
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-20 skeleton" />
          <div className="h-6 w-28 skeleton" />
        </div>
        <div className="h-10 w-28 skeleton" />
      </div>
      <div className="border-t border-line px-4 py-3">
        <div className="h-10 w-full skeleton" />
      </div>
    </div>
  )
}

function CardSpec() {
  return (
    <Frame code="C-03" title="כרטיס חלק" note="ריחוף/פוקוס = מסגרת CAD בציאן">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div className="grid w-full justify-items-center gap-2 sm:justify-items-start">
          <PartCard />
          <StateLabel>rest · hover → cad-frame</StateLabel>
        </div>
        <div className="grid w-full justify-items-center gap-2 sm:justify-items-start">
          <SkeletonCard />
          <StateLabel>loading · skeleton</StateLabel>
        </div>
      </div>
    </Frame>
  )
}

/* ── C-04 Chip ───────────────────────────────────────────────────────── */
function ChipSpec() {
  const [dept, setDept] = useState("cool")
  const DEPTS = [
    ["elec", "חשמל ותאורה"],
    ["body", "פחחות"],
    ["cool", "קירור"],
    ["care", "אביזרים וטיפוח"],
  ] as const
  return (
    <Frame code="C-04" title="צ׳יפ" note="צבע לעולם לא לבד — תמיד גם מילה">
      <div className="grid gap-3">
        <span className="label-mono">
          <En>STATUS</En>
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip tone="stock" dot>
            במלאי · <bdi className="font-mono">14</bdi>
          </Chip>
          <Chip tone="low" dot>
            אחרונים · <bdi className="font-mono">2</bdi>
          </Chip>
          <Chip tone="out" dot>
            אזל
          </Chip>
          {/* the one long chip may wrap on narrow phones instead of overflowing */}
          <Chip tone="eta" className="h-auto min-h-6 py-1 whitespace-normal">
            <Clock strokeWidth={1.75} aria-hidden />
            <span>
              הזמינו עד <bdi className="font-mono">11:00</bdi> — אצלכם היום עד <bdi className="font-mono">14:00</bdi>
            </span>
          </Chip>
        </div>
      </div>
      <div className="grid gap-3 border-t border-line pt-6">
        <span className="label-mono">
          <En>FILTER · aria-pressed</En>
        </span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="מחלקה">
          {DEPTS.map(([k, he]) => (
            <FilterChip key={k} pressed={dept === k} onClick={() => setDept(k)}>
              {he}
            </FilterChip>
          ))}
        </div>
      </div>
      <div className="grid gap-3 border-t border-line pt-6">
        <span className="label-mono">
          <En>ANNOTATION</En>
        </span>
        <div className="flex flex-wrap gap-2">
          <Chip tone="tier">
            דרג <bdi>B</bdi> · <bdi>−12%</bdi>
          </Chip>
          <Chip tone="demo">מחירי דמו</Chip>
          <Chip tone="beta">בטא</Chip>
          <Chip tone="neutral">
            <bdi className="font-mono">OE 81130-02B60</bdi>
          </Chip>
        </div>
      </div>
    </Frame>
  )
}

/* ── C-05 Table row ──────────────────────────────────────────────────── */
const ROWS = [
  { sku: "TYC 20-1234-00", name: "פנס ראשי ימני, LED", brand: "TYC", list: 442, price: 389, stock: 14, state: "rest" },
  { sku: "PHL 12972PRC1", name: "נורת H7 Vision +30%", brand: "Philips", list: 38, price: 33.4, stock: 212, state: "hover" },
  { sku: "FAE 33520", name: "חיישן טמפרטורת מנוע", brand: "FAE", list: 96, price: 84.5, stock: 2, state: "selected" },
  { sku: "SKR 4410-CR", name: "מעבה מזגן, קורולה", brand: "Sakura", list: 1240, price: 1091.2, stock: 0, state: "out" },
] as const

const nis = (n: number) => `₪${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

function TableSpec() {
  return (
    <Frame code="C-05" title="שורת טבלה" note="מחירון 2026 · מספרים מיושרים לספרת האחדות" className="xl:col-span-2">
      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:hidden" aria-label="דוגמת מחירון — תצוגת כרטיסים">
        {ROWS.map((r) => (
          <li
            key={r.sku}
            className={cn(
              "relative grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 bg-graphite p-4",
              // opaque tint: a translucent bg-cyan/6 would let the bg-line separators show through
              r.state === "selected" &&
                "bg-[color-mix(in_oklab,var(--color-cyan)_6%,var(--color-graphite))] before:absolute before:inset-y-0 before:start-0 before:w-0.5 before:bg-cyan",
            )}
          >
            <span className="grid gap-1">
              <span className={cn("text-body font-medium", r.state === "out" && "text-steel")}>
                <Iso>{r.name}</Iso>
              </span>
              <span className="flex flex-wrap items-center gap-x-2 text-caption text-steel">
                <bdi className="font-mono text-paper">{r.sku}</bdi>
                <span aria-hidden>·</span>
                <bdi>{r.brand}</bdi>
              </span>
            </span>
            <span className="grid justify-items-end gap-1">
              <bdi className="font-mono text-body font-semibold text-paper">{nis(r.price)}</bdi>
              <s className="font-mono text-caption text-fog">
                <bdi>{nis(r.list)}</bdi>
              </s>
            </span>
            <span className="col-span-2">
              {r.stock === 0 ? (
                <Chip tone="out" dot>
                  אזל
                </Chip>
              ) : r.stock <= 3 ? (
                <Chip tone="low" dot>
                  אחרונים · <bdi className="font-mono">{r.stock}</bdi>
                </Chip>
              ) : (
                <Chip tone="stock" dot>
                  במלאי · <bdi className="font-mono">{r.stock}</bdi>
                </Chip>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="hidden overflow-hidden rounded-md border border-line lg:block">
        <Table label="דוגמת מחירון">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>מק״ט</TableHead>
              <TableHead>תיאור</TableHead>
              <TableHead>יצרן</TableHead>
              <TableHead>מחירון</TableHead>
              <TableHead>מחיר שלכם</TableHead>
              <TableHead>מלאי</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow
                key={r.sku}
                data-state={r.state === "selected" ? "selected" : undefined}
                className={cn(r.state === "hover" && "bg-panel", r.state === "out" && "text-steel")}
              >
                <TableCell>
                  <bdi className="font-mono text-paper">{r.sku}</bdi>
                </TableCell>
                <TableCell className="max-w-[280px] truncate">
                  <Iso>{r.name}</Iso>
                </TableCell>
                <TableCell className="text-steel">
                  <bdi>{r.brand}</bdi>
                </TableCell>
                <TableCell>
                  <s className="font-mono text-fog">
                    <bdi>{nis(r.list)}</bdi>
                  </s>
                </TableCell>
                <TableCell>
                  <bdi className="font-mono font-semibold text-paper">{nis(r.price)}</bdi>
                </TableCell>
                <TableCell>
                  {r.stock === 0 ? (
                    <Chip tone="out" dot>
                      אזל
                    </Chip>
                  ) : r.stock <= 3 ? (
                    <Chip tone="low" dot>
                      אחרונים · <bdi className="font-mono">{r.stock}</bdi>
                    </Chip>
                  ) : (
                    <Chip tone="stock" dot>
                      במלאי · <bdi className="font-mono">{r.stock}</bdi>
                    </Chip>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {["rest", "hover · panel", "selected · cyan bar", "out of stock · muted", "≤ 1023px → row cards"].map((s) => (
          <StateLabel key={s}>{s}</StateLabel>
        ))}
      </div>
    </Frame>
  )
}

/* ── C-06 Toast ──────────────────────────────────────────────────────── */
function ToastSpec() {
  return (
    <Frame code="C-06" title="טוסט" note="מופיע בפינת הסל · נעלם אחרי 4 שניות">
      <p className="sr-only">שלוש דוגמאות טוסט: נוסף לסל, ההזמנה נשלחה, והמאגר הממשלתי איטי כרגע.</p>
      <div inert className="grid gap-3">
        <ToastCard
          tone="cart"
          title="נוסף לסל"
          description={
            <>
              פנס ראשי ימני · <bdi lang="en" className="font-mono">TYC <span>20-1234-00</span></bdi> · <bdi>×1</bdi>
            </>
          }
          action={{ label: "לסל ←" }}
          onDismiss={() => {}}
        />
        <ToastCard
          tone="success"
          title="ההזמנה נשלחה"
          description={
            <>
              מס׳ הזמנה <bdi className="font-mono text-paper">SO-26-04187</bdi> · נקלטה ב-<bdi className="font-mono">10:42</bdi>
            </>
          }
          action={{ label: "מעקב משלוח ←" }}
          onDismiss={() => {}}
        />
        <ToastCard
          tone="warning"
          title="המאגר הממשלתי איטי כרגע"
          description="מציגים זיהוי מנתוני הדמו. אפשר להמשיך להזמין."
          onDismiss={() => {}}
        />
      </div>
      <div className="flex flex-wrap gap-3 border-t border-line pt-6">
        <Button
          variant="secondary"
          size="sm"
          onClick={() =>
            notify({
              tone: "success",
              title: "ההזמנה נשלחה",
              description: (
                <>
                  מס׳ הזמנה <bdi className="font-mono text-paper">SO-26-04188</bdi>
                </>
              ),
              action: { label: "מעקב משלוח ←" },
            })
          }
        >
          הפעלת טוסט חי
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            notify({ tone: "error", title: "לא הצלחנו לשלוח", description: "אין חיבור לרשת. ההזמנה שמורה — ננסה שוב אוטומטית." })
          }
        >
          טוסט שגיאה
        </Button>
      </div>
    </Frame>
  )
}

/* ── C-07 Voice ──────────────────────────────────────────────────────── */
const VOICE = [
  { where: "תווית לוחית", text: "מספר רכב", note: "שם עצם, בלי נקודתיים" },
  { where: "עזרה ללוחית", text: "נזהה את הדגם מהמאגר הממשלתי", note: "מבטיח פעולה, לא מתאר טכנולוגיה" },
  { where: "חיפוש", text: "מספר רכב, מק״ט, מספר OE או תיאור חלק", note: "ארבע דרכים — לפי סדר שכיחות" },
  { where: "מצב ריק", text: "לא מצאנו חלק כזה. נסו מספר OE או כתבו לנו מה אתם מחפשים.", note: "אחריות עלינו + צעד הבא" },
  { where: "אזל מהמלאי", text: "אזל — חלופה מתאימה:", note: "אף פעם לא מבוי סתום" },
  { where: "זמן אספקה", text: "הזמינו עד 11:00 — אצלכם היום עד 14:00", note: "שעה מדויקת, לא ״בקרוב״" },
]

function VoiceSpec() {
  return (
    <Frame code="C-07" title="קול ומיקרוקופי" note="ישיר, מדויק, פונה בגוף שני רבים">
      <ul className="grid gap-px overflow-hidden rounded-md border border-line bg-line">
        {VOICE.map((v) => (
          <li key={v.where} className="grid gap-1 bg-graphite p-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-4">
            <span className="text-caption text-steel">{v.where}</span>
            <span className="grid gap-1">
              <span className="text-body text-paper">
                ״<Iso>{v.text}</Iso>״
              </span>
              <span className="text-caption text-fog">
                <Iso>{v.note}</Iso>
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export function ComponentsSheet() {
  return (
    <div className="grid gap-6">
      {/* minmax(0,1fr): one wide specimen must never widen the whole sheet (reflow at 320px) */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-2">
        <ButtonSpec />
        <InputSpec />
        <CardSpec />
        <ChipSpec />
        <TableSpec />
        <ToastSpec />
        <VoiceSpec />
      </div>
    </div>
  )
}
