import { Button } from "@/components/ui/button"
import { RADII, SHADOWS, SPACING } from "@/lib/design-tokens"
import { En, Iso } from "@/components/spark/text"

export function Space() {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <ol className="grid content-start gap-2 [--k:1] sm:[--k:2] lg:col-span-7">
        {SPACING.map((n) => (
          <li key={n} className="grid grid-cols-[80px_1fr_104px] items-center gap-4">
            <span>
              <bdi className="font-mono text-caption text-paper">space-{n}</bdi>
            </span>
            <span className="relative h-6">
              <span
                aria-hidden
                className="absolute inset-y-0 start-0 border-x border-cyan bg-cyan/15"
                style={{ inlineSize: `calc(var(--k) * ${n * 4}px)`, maxInlineSize: "100%" }}
              />
            </span>
            <span className="text-end">
              <bdi className="font-mono text-caption text-steel">
                {n * 4}px · p-{n}
              </bdi>
            </span>
          </li>
        ))}
      </ol>
      <div className="grid content-start gap-4 lg:col-span-5">
        <div className="rounded-md border border-line bg-panel p-6">
          <h3 className="label-mono">
            <En>LAYOUT</En>
          </h3>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-body">
            <dt className="text-steel">עמודות</dt>
            <dd>
              <bdi className="font-mono">4 / 8 / 12</bdi> <span className="text-caption text-steel">
                (<bdi>390 / 768 / 1024+</bdi>)
              </span>
            </dd>
            <dt className="text-steel">שוליים</dt>
            <dd>
              <bdi className="font-mono">16 / 24 / 40px</bdi>
            </dd>
            <dt className="text-steel">רוחב מרבי</dt>
            <dd>
              <bdi className="font-mono">1360px</bdi>
            </dd>
            <dt className="text-steel">מטרת מגע</dt>
            <dd>
              <bdi className="font-mono">48px</bdi> <span className="text-caption text-steel">
                <Iso>פעולה ראשית בטלפון · 40px בדסקטופ</Iso>
              </span>
            </dd>
            <dt className="text-steel">שורת טבלה</dt>
            <dd>
              <bdi className="font-mono">48px</bdi>
            </dd>
          </dl>
        </div>
        <div className="rounded-md border border-line bg-panel p-6">
          <h3 className="label-mono">
            <En>RULE</En>
          </h3>
          <p className="mt-3 text-body">
            כל מרווח, גובה ורוחב הוא כפולה של <bdi className="font-mono text-cyan">4px</bdi>. חצאי צעדים (<bdi className="font-mono">p-0.5</bdi>,{" "}
            <bdi className="font-mono">gap-1.5</bdi>) אסורים בפריסה — מותרים רק בהיסטים של תנועה.
          </p>
          <p className="mt-3 text-caption text-steel">לחצו ״רשת 4px״ בכותרת כדי לראות את הרשת מעל כל העמוד.</p>
        </div>
      </div>
    </div>
  )
}

export function FormElevation() {
  return (
    <div className="grid gap-12">
      <div className="grid gap-4">
        <h3 className="label-mono">
          <En>RADII · SMALL ON PURPOSE — PRECISION, NOT PILLS</En>
        </h3>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {RADII.map((r) => (
            <li key={r.token} className="grid gap-3 rounded-md border border-line bg-panel p-4">
              <span className="grid h-24 place-items-center rounded-xs bg-graphite bg-grid">
                <span aria-hidden className="block size-16 border border-paper bg-panel-2" style={{ borderRadius: r.px * 2 }} />
              </span>
              <span className="flex items-baseline justify-between">
                <bdi className="font-mono text-caption text-paper">radius-{r.token}</bdi>
                <bdi className="font-mono text-caption text-cyan">{r.px}px</bdi>
              </span>
              <span className="text-caption text-steel">
                <Iso>{r.use}</Iso>
              </span>
            </li>
          ))}
        </ul>
        <p className="text-caption text-steel">הדגימות מוגדלות ×2 לקריאוּת.</p>
      </div>

      <div className="grid gap-4">
        <h3 className="label-mono">
          <En>ELEVATION · ON GRAPHITE, DEPTH COMES FROM LINES</En>
        </h3>
        <ul className="grid gap-6 rounded-md border border-line bg-grid p-6 sm:grid-cols-2 lg:grid-cols-5 lg:p-8">
          {SHADOWS.map((s) => (
            <li key={s.token} className="grid gap-3">
              <span aria-hidden className="block h-24 rounded-md bg-panel" style={{ boxShadow: s.css }} />
              <span className="flex items-baseline justify-between">
                <bdi className="font-mono text-caption text-paper">shadow-{s.token}</bdi>
              </span>
              <span className="text-caption text-steel">
                <Iso>{s.use}</Iso>
              </span>
            </li>
          ))}
          <li className="grid gap-3">
            <span className="grid h-24 place-items-center rounded-md border border-line bg-panel">
              <Button
                variant="secondary"
                tabIndex={-1}
                aria-hidden
                className="outline-2 outline-offset-2 outline-plate"
              >
                פוקוס
              </Button>
            </span>
            <span>
              <bdi className="font-mono text-caption text-paper">focus-ring</bdi>
            </span>
            <span className="text-caption text-steel">
              <Iso>2px צהוב, היסט 2px. גם ב-</Iso>
              <En>High Contrast</En>.
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
