import { En, Iso } from "@/components/spark/text"
import { PlateDiagram } from "./plate-diagram"

const CONCEPT = [
  {
    n: "01",
    word: "חשמלי.",
    line: "הלוחית היא דלת הכניסה: מקלידים מספר רכב, והרכב מזהה את עצמו מהמאגר הממשלתי — בלי קטלוג, בלי תפריטים.",
    en: "Electric — the plate is the front door.",
  },
  {
    n: "02",
    word: "מדויק.",
    line: "כל חלק משורטט כמו גיליון הנדסי: קווי ציאן, מספרים במונו, ומלאי ומחיר אמיתיים לדרג שלכם על כל קו מוביל.",
    en: "Precise — every part is drawn like an engineering sheet.",
  },
  {
    n: "03",
    word: "מהיר.",
    line: "צהוב אחד לפעולה אחת, תנועה של 180–260ms, וניצוץ שחותם כל הוספה לסל — מלוחית להזמנה בפחות מ-30 שניות.",
    en: "Fast — plate to order in under 30 seconds.",
  },
]

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden bg-grid">
      <div className="mx-auto grid max-w-[1360px] gap-12 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-5">
          <p className="label-mono flex flex-wrap gap-x-4 gap-y-1">
            <En>SPARK</En>
            <En>STYLE TILE</En>
            <En>REV A · 06.11.2026</En>
          </p>
          <h1 id="hero-title" className="mt-6 font-display text-display font-bold text-paper">
            <span className="sr-only">ספרק — כיוון אמנותי: </span>
            {CONCEPT.map((c) => (
              <span key={c.n} className="block">
                {c.word}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[44ch] text-lead text-steel">
            פורטל הזמנות <bdi>B2B</bdi> לביתן ספרק — כאילו <En>Linear</En> או <En>Stripe</En> בנו אותו לחלקי חילוף.
          </p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <PlateDiagram value="1234567" className="lg:-me-4" />
        </div>

        <ol className="grid gap-px overflow-hidden rounded-md border border-line bg-line lg:col-span-12 lg:grid-cols-3">
          {CONCEPT.map((c) => (
            <li key={c.n} className="flex flex-col gap-3 bg-graphite p-6">
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-display text-headline leading-none font-bold text-paper">{c.word}</span>
                <span className="font-mono text-caption text-cyan tabular-nums">
                  <bdi>{c.n}</bdi>
                </span>
              </span>
              <p className="text-body text-paper/90">
                <Iso>{c.line}</Iso>
              </p>
              <p className="label-mono normal-case tracking-normal">
                <En>{c.en}</En>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
