# SPARK — B2B ordering portal concept for Pavilion Spark (ביתן ספרק)

> **Concept by Kikkey — not the official Pavilion Spark website.** Demo prices only, no real customer data. `noindex` everywhere.

Hebrew · RTL · mobile-first. Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui (fully restyled).

## Status

| Stage | Scope | State |
|---|---|---|
| 0 | Art direction: tokens, `/style-tile`, decisions | ✅ deployed, awaiting review |
| 1 | Signature moment: licence plate → registry → exploded view (`/hero-lab`) | — |
| 2 | App flows: search, cart, order timeline, reorder, price list, returns, account, rep view | — |
| 3 | Polish pass | — |
| 4 | QA, Lighthouse, axe, demo path | — |

**Live (unlisted, noindex):** https://pavilion-spark.kikkey.com → `/style-tile`

## Run

```bash
pnpm install
pnpm dev            # http://localhost:3000 → /style-tile
pnpm typecheck
pnpm lint
pnpm check:tokens   # design-tokens.ts ↔ globals.css drift guard
pnpm build
```

## Deploy (Cloudflare Workers via OpenNext)

Follows the Kikkey convention: one Worker per pitch demo on `<client>.kikkey.com`.

| | |
|---|---|
| Worker | `pavilion-spark` (Kikkey account, pinned in `wrangler.jsonc`) |
| Domain | `pavilion-spark.kikkey.com` (Workers custom domain; `*.workers.dev` and preview URLs off) |
| Adapter | `@opennextjs/cloudflare` — real Next.js 15 build output; Cloudflare's own tooling picks OpenNext for Next ≤ 15 |
| Cache | prerendered pages are read from Workers static assets (`open-next.config.ts`) — minimal CPU per request |
| Edge | `custom-worker.ts` wraps the OpenNext handler: http → https (301/308) and `X-Robots-Tag` / `nosniff` / `Referrer-Policy` / HSTS on every Worker response, including redirects and 404s |

```bash
pnpm preview        # build + run the Worker locally in workerd (http://localhost:8787)
pnpm deploy         # build + deploy; needs CLOUDFLARE_API_TOKEN in the environment
```

`public/_headers` adds `X-Robots-Tag: noindex` and immutable caching to static assets; `next.config.ts` adds the same header to Worker responses.

## Where things live

- `src/app/globals.css`: every design token (colour, fluid type, space, radii, elevation, motion)
- `src/app/style-tile/`: the living style tile
- `src/components/ui/`: shadcn/ui primitives, restyled (button, input, card, chip, table, sonner, label, separator)
- `src/components/spark/`: brand pieces (licence plate, part line-art, spark trail, price, toast card)
- `docs/ART_DIRECTION.md`: concept, decisions, clichés we avoid, open questions
