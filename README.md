# SPARK — B2B ordering portal concept for Pavilion Spark (ביתן ספרק)

> **Concept by Kikkey — not the official Pavilion Spark website.** Demo prices only, no real customer data. `noindex` everywhere.

Hebrew · RTL · mobile-first. Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui (fully restyled).

## Status

| Stage | Scope | State |
|---|---|---|
| 0 | Art direction: tokens, `/style-tile`, decisions | ✅ awaiting review |
| 1 | Signature moment: licence plate → registry → exploded view (`/hero-lab`) | — |
| 2 | App flows: search, cart, order timeline, reorder, price list, returns, account, rep view | — |
| 3 | Polish pass | — |
| 4 | QA, Lighthouse, axe, demo path | — |

## Run

```bash
pnpm install
pnpm dev            # http://localhost:3000 → /style-tile
pnpm typecheck
pnpm lint
pnpm check:tokens   # design-tokens.ts ↔ globals.css drift guard
pnpm build
```

## Where things live

- `src/app/globals.css`: every design token (colour, fluid type, space, radii, elevation, motion)
- `src/app/style-tile/`: the living style tile
- `src/components/ui/`: shadcn/ui primitives, restyled (button, input, card, chip, table, sonner, label, separator)
- `src/components/spark/`: brand pieces (licence plate, part line-art, spark trail, price, toast card)
- `docs/ART_DIRECTION.md`: concept, decisions, clichés we avoid, open questions
