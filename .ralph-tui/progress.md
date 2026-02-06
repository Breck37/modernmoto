## Codebase Patterns

- **TypeScript strict mode** is enabled with `skipLibCheck: true` in tsconfig.json
- **Path alias**: `@/*` maps to project root (e.g., `@/lib/live-timing`)
- **Package manager**: pnpm (v10.28.2)
- **Type-only exports**: Use `export type { ... }` in barrel files for type-only modules
- **Readonly convention**: Use `readonly` on all interface properties and `readonly T[]` for arrays in domain models to prevent mutation
- **Test runner**: vitest v4 configured via `vitest.config.ts` with `@` path alias; run tests with `npx vitest run`
- **Defensive normalization**: Use `??` defaults for all raw fields to handle missing/malformed data; use `Array.isArray()` guards for array fields

---

## 2026-02-06 - US-002
- Implemented TypeScript types for all live timing domain models
- Files created:
  - `lib/live-timing/types.ts` — All raw S3 response types and normalized domain model interfaces
  - `lib/live-timing/index.ts` — Barrel file re-exporting all types
- **Learnings:**
  - This worktree doesn't have `node_modules` installed; `npx tsc` resolves from parent node_modules via pnpm hoisting
  - Pre-existing `@types/node` version conflicts exist in the monorepo; `skipLibCheck` is needed to isolate from those
  - The `lib/` directory didn't exist prior — this is the first module placed there
  - Raw types use PascalCase field names matching the S3 JSON response exactly; normalized types use camelCase
  - Used `readonly` on all properties and `readonly T[]` for arrays per acceptance criteria
---

## 2026-02-06 - US-004
- Implemented normalizer that transforms raw JSON responses into clean SessionState
- Files created:
  - `lib/live-timing/normalizer.ts` — `normalize(eventId, raw)` function with per-domain helpers
  - `lib/live-timing/normalizer.test.ts` — 22 tests covering complete data, partial data (null endpoints), and malformed inputs
  - `vitest.config.ts` — Vitest test runner configuration with `@` path alias
- Files modified:
  - `lib/live-timing/types.ts` — Added `RawTimingData` composite interface (combined raw data input)
  - `lib/live-timing/index.ts` — Added `RawTimingData` type export and `normalize` function export
  - `package.json` / `pnpm-lock.yaml` — Added vitest dev dependency
- **Learnings:**
  - No ESLint config exists at project level yet — `pnpm run lint` (`next lint`) prompts for setup interactively, so it can't run non-interactively. TypeScript typecheck (`npx tsc --noEmit`) works fine.
  - `RawTimingData` was referenced in the AC but didn't exist in US-002 types — needed to add as a composite interface wrapping all nullable raw data sources
  - Using `??` (nullish coalescing) instead of `||` is important: raw numeric fields like `0` are valid values that `||` would incorrectly replace with defaults
  - `Array.isArray()` guard is needed on array fields (LatestSectors, SectorNames, Series) since raw data may have `undefined` from malformed JSON
  - Riders are sorted by Position ascending using `.slice().sort()` to avoid mutating the mapped array
---
