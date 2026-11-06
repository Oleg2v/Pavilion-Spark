#!/usr/bin/env node
/**
 * Token drift guard: every colour/type value documented in
 * src/lib/design-tokens.ts must exist verbatim in src/app/globals.css.
 * Run: pnpm check:tokens
 */
import { readFileSync } from "node:fs"

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8").toLowerCase()
const ts = readFileSync(new URL("../src/lib/design-tokens.ts", import.meta.url), "utf8")

const problems = []
let checked = 0

for (const m of ts.matchAll(/token: "([a-z0-9-]+)", hex: "(#[0-9A-Fa-f]{6})"/g)) {
  const [, token, hex] = m
  const decl = `--color-${token}: ${hex.toLowerCase()}`
  checked++
  if (!css.includes(decl)) problems.push(`colour ${token}: expected "${decl}" in globals.css`)
}

for (const m of ts.matchAll(/token: "([a-z]+)", min: \d+, max: \d+, clamp: "([^"]+)"/g)) {
  const [, token, clamp] = m
  const decl = `--text-${token}: ${clamp}`.toLowerCase()
  checked++
  if (!css.includes(decl)) problems.push(`type ${token}: expected "${decl}" in globals.css`)
}

for (const m of ts.matchAll(/token: "([a-z]+)", ms: (\d+)/g)) {
  const [, token, ms] = m
  const decl = `--dur-${token}: ${ms}ms`
  checked++
  if (!css.includes(decl)) problems.push(`duration ${token}: expected "${decl}" in globals.css`)
}

for (const m of ts.matchAll(/token: "([a-z]+)", bezier: \[([^\]]+)\]/g)) {
  const [, token, b] = m
  const decl = `--ease-${token}: cubic-bezier(${b.split(",").map((x) => x.trim()).join(", ")})`
  checked++
  if (!css.includes(decl)) problems.push(`easing ${token}: expected "${decl}" in globals.css`)
}

for (const m of ts.matchAll(/token: "(xs|sm|md|lg)", px: (\d+)/g)) {
  const [, token, px] = m
  const decl = `--radius-${token}: ${px}px`
  checked++
  if (!css.includes(decl)) problems.push(`radius ${token}: expected "${decl}" in globals.css`)
}

if (problems.length) {
  console.error(`✗ ${problems.length} token(s) drifted:\n  ` + problems.join("\n  "))
  process.exit(1)
}
if (checked < 40) {
  console.error(`✗ only ${checked} tokens parsed — the parser no longer matches design-tokens.ts`)
  process.exit(1)
}
console.log(`✓ ${checked} tokens: design-tokens.ts and globals.css agree`)
