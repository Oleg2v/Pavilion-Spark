const BOLD = [
  {
    t: "הלוחית היא דף הבית.",
    d: "אין תמונת הירו ואין סלוגן. המסך הראשון הוא לוחית ישראלית מדויקת — שדה הקלט הראשי. הכניסה היא הרכב, לא הקטלוג.",
    en: "The plate is the homepage",
  },
  {
    t: "שרטוט במקום צילום.",
    d: "כל חלק הוא שרטוט קו בציאן על נייר משבצות 4%, עם קווים מובילים שנושאים מלאי ומחיר חיים. אחיד, קל, ואי אפשר לגרום לו להיראות זול.",
    en: "Blueprints, not photos",
  },
  {
    t: "מספרים בגודל שלט חוצות.",
    d: "Karantina עד 176px למה שחשוב — מחיר, מלאי, מס׳ הזמנה, יצרן ודגם — מול תוויות מונו של 11px. ניגוד סקאלה של 16:1 שכלי B2B לא מעז.",
    en: "Billboard numerals",
  },
  {
    t: "צהוב בקיצוב — כ-1.5% מהמסך.",
    d: "צהוב לוחית רק לפעולה הראשית, לפוקוס וללוחית. בחירה בציאן, פילטר פעיל בהיפוך לנייר. כשהצהוב מופיע — הוא אומר ״עשו את זה״.",
    en: "Rationed yellow",
  },
  {
    t: "תנועה כאות, לא כקישוט.",
    d: "הכול עד 260ms, חוץ משני רגעי חתימה: שרטוט 900ms שמתפוצץ למבט מפורק, וניצוץ 400ms שמחבר ״הוסף לסל״ לסל. ריחוף לא מזיז פריסה.",
    en: "Motion as signal",
  },
]

const AVOID = [
  {
    t: "צילומי סטוק",
    d: "מוסכניקים מחייכים, לחיצות ידיים במחסן, רינדורי כרום מבריקים של חלקים.",
    en: "Stock photography",
  },
  {
    t: "קלישאות מרוצים ומוסך",
    d: "דגל משובץ, להבות, מד מהירות, סיבי פחמן, סימני צמיגים, אדום-שחור ״אגרסיבי״.",
    en: "Racing & garage tropes",
  },
  {
    t: "זוהר וזכוכית",
    d: "בלום ניאון, glassmorphism, כתמי גרדיאנט, ״HUD סייברפאנק״. הציאן שלנו הוא קו של 1px — לא זוהר.",
    en: "Glow & glass sci-fi",
  },
  {
    t: "ערכת איקומרס גנרית",
    d: "כפתורי גלולה, כרטיסי מוצר עם צל, דירוג כוכבים, סרטי ״מבצע!״, קרוסלות וסליידרים.",
    en: "Default e-commerce kit",
  },
  {
    t: "המראה הדיפולטי",
    d: "אפורי zinc, Inter, rounded-lg על הכול, ספינרים וטוסטים גנריים — ודף נחיתה עם parallax מול כלי עבודה.",
    en: "Out-of-the-box shadcn",
  },
]

export function Decisions() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <section aria-labelledby="bold-title" className="rounded-md border border-line bg-panel">
        <header className="flex items-baseline justify-between gap-4 border-b border-line px-6 py-4">
          <h3 id="bold-title" className="text-title font-semibold">
            5 החלטות נועזות שאנחנו מתחייבים להן
          </h3>
          <span className="label-mono text-stock">
            <bdi>COMMIT</bdi>
          </span>
        </header>
        <ol className="grid">
          {BOLD.map((b, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-4 border-b border-line px-6 py-5 last:border-b-0">
              <span className="font-display text-headline leading-none font-bold text-paper tabular-nums">
                <bdi>{i + 1}</bdi>
              </span>
              <div className="grid gap-1">
                <p className="text-lead font-semibold">{b.t}</p>
                <p className="text-body text-steel">{b.d}</p>
                <p className="label-mono normal-case tracking-normal">
                  <bdi>{b.en}</bdi>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="avoid-title" className="rounded-md border border-line bg-panel">
        <header className="flex items-baseline justify-between gap-4 border-b border-line px-6 py-4">
          <h3 id="avoid-title" className="text-title font-semibold">
            5 קלישאות שאנחנו נמנעים מהן
          </h3>
          <span className="label-mono text-fault">
            <bdi>REJECT</bdi>
          </span>
        </header>
        <ol className="grid">
          {AVOID.map((a, i) => (
            <li key={i} className="grid grid-cols-[auto_1fr] gap-4 border-b border-line px-6 py-5 last:border-b-0">
              <span aria-hidden className="relative grid size-10 place-items-center rounded-sm border border-fault/40 text-fault">
                <svg viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </span>
              <div className="grid gap-1">
                <p className="text-lead font-semibold">
                  <span className="line-through decoration-fault decoration-2">{a.t}</span>
                </p>
                <p className="text-body text-steel">{a.d}</p>
                <p className="label-mono normal-case tracking-normal">
                  <bdi>{a.en}</bdi>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
