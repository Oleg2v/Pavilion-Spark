# SPARK — art direction (Stage 0)

> Concept by Kikkey for Pavilion Spark (ביתן ספרק). **Not the official site.** Demo prices only.
> Live reference: `/style-tile` (every value below is rendered and measured there).

## The concept in three lines

1. **Electric.** The licence plate is the front door: type a plate and the car identifies itself from the government registry. No catalogue tree, no menus.
2. **Precise.** Every part is drawn like an engineering sheet: cyan linework, mono numbers, and live stock and tier price on every leader line.
3. **Fast.** One yellow for one action, 180–260 ms motion, and a spark that seals every add-to-cart. Plate to order in under 30 seconds.

## Tokens (source of truth: `src/app/globals.css`)

| Group | Values |
|---|---|
| Core colour | Graphite `#111315` · Panel `#1A1D21` · Line `#2A2F35` · Paper `#F4F5F6` · Plate Yellow `#F7D117` · Spark Cyan `#3CC8FF` · In-stock `#22C55E` · Low-stock `#F59E0B` |
| Derived | Panel-2 `#22262B` (hover) · Edge `#666E78` (interactive boundary, ≥3:1) · Steel `#A3AAB2` (secondary text, 7.2:1 on panel) · Fog `#8C949D` (placeholder, 5.5:1) · Fault `#FF6B5E` (errors / out of stock only) |
| Paper inks | Cyan `#0A6A94` · Stock `#15803D` · Low `#B45309` · Fault `#C2341F` (all ≥4.5:1 on Paper) |
| Type | IBM Plex Sans Hebrew (UI) · Karantina (steps 7–9 only) · IBM Plex Mono (anything you can type into search: SKU, OE, plate, PO, price) |
| Fluid scale | micro 11→12 · caption 13→14 · body 16→17 · lead 18→20 · title 20→24 · heading 24→32 · headline 40→64 · display 56→112 · mega 80→176 (px, 390→1440; every max/min ≤ 2.5 for WCAG 1.4.4) |
| Space | 4px base. `p-1`=4 … `p-32`=128. Half-steps banned in layout. Touch targets 48px on phones. |
| Radii | xs 2 (chips) · sm 4 (controls) · md 8 (cards) · lg 12 (sheets, plate) |
| Elevation | line · raised · overlay · modal. On graphite, depth comes from lines, not blur. |
| Motion | press 80 · fast 180 · base 220 · slow 260 · spark 400 · draw 900 (ms). Easings: snap, exit, move, draw, zap, spring (`linear()`, ζ 0.68). |

`pnpm check:tokens` fails the build if `design-tokens.ts` (the documentation mirror) drifts from the CSS.

## Five bold decisions we commit to

1. **The plate is the homepage.** No hero image, no slogan. The first screen is a pixel-accurate Israeli plate (520 × 110 mm, euroband, DIN-style digits drawn as SVG strokes, zero font files) and it is the primary input.
2. **Blueprints, not photos.** Every product image is cyan line-art on 4% grid paper, with leader-line callouts that carry live stock and price. Consistent, light, and impossible to make look cheap.
3. **Billboard numerals.** Karantina up to 176px for what matters: price, stock, order number, make and model. It sits next to 11px mono labels, a 16:1 scale contrast that B2B tools rarely risk.
4. **Rationed yellow, about 1.5% of the screen.** Plate Yellow only for the primary action, the focus ring and the plate. Selection is cyan; an active filter inverts to Paper. When yellow appears it means "do this".
5. **Motion as signal.** Everything stays at or under 260 ms except two signatures: the 900 ms line-draw that explodes into the parts view, and the 400 ms spark from "הוסף לסל" to the cart. Hover never moves layout. Reduced motion swaps both signatures for static versions.

## Five clichés we avoid

1. **Stock photography.** Smiling mechanics, warehouse handshakes, glossy chrome renders.
2. **Racing and garage tropes.** Chequered flags, flames, speedometers, carbon fibre, tyre tracks, "aggressive" red and black.
3. **Glow-and-glass sci-fi.** Neon bloom, glassmorphism, gradient blobs, cyberpunk HUDs. Our cyan is a 1px hairline, never a glow.
4. **The default e-commerce kit.** Pill buttons, drop-shadow product cards, star ratings, "SALE!" ribbons, carousels.
5. **The out-of-the-box look.** Zinc greys, Inter, `rounded-lg` everywhere, generic spinners and toasts, or a parallax landing page in front of a working tool.

## Accessibility baked into the tokens

- `lang="he" dir="rtl"`, logical properties only (illustration overlays are the one deliberate exception: drawings do not mirror).
- Every text pair is ≥4.5:1, computed live on `/style-tile`. Interactive boundaries use Edge (≥3:1).
- Focus: 2px Plate Yellow outline, 2px offset, visible in forced-colours mode.
- Numbers, SKUs and prices sit inside `<bdi>` with tabular numerals. Mono codes never wrap.
- Colour never carries meaning alone: every status chip has a word.
- `prefers-reduced-motion`: all durations drop to 0, and the signature moments render static.

## Open questions for review

- **Arabic on the euroband.** Real plates print ישראל *and* إسرائيل; the brief lists only ישראל. The style tile shows both for accuracy. Easy to drop.
- **Paper surfaces.** Proposed only for documents (invoice, statement, printable price list), never for the working UI.
- **Fault red** is the one colour added beyond the brief. It covers errors and "אזל" (out of stock), and nothing else.
