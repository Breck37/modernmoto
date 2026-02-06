## Codebase Patterns

- **TypeScript strict mode** is enabled with `skipLibCheck: true` in tsconfig.json
- **Path alias**: `@/*` maps to project root (e.g., `@/lib/live-timing`)
- **Package manager**: pnpm (v10.28.2)
- **Type-only exports**: Use `export type { ... }` in barrel files for type-only modules
- **Readonly convention**: Use `readonly` on all interface properties and `readonly T[]` for arrays in domain models to prevent mutation
- **Test runner**: vitest v4 configured via `vitest.config.ts` with `@` path alias and `esbuild: { jsx: 'automatic' }` for React JSX; run tests with `npx vitest run`
- **React component/hook tests**: Use `@vitest-environment jsdom` directive and a lightweight custom `renderHook` helper (no `@testing-library/react` dependency); jsdom is installed as a dev dependency
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

## 2026-02-06 - US-006
- Implemented ActiveEvent context and detection hook for automatic event detection
- Files created:
  - `lib/live-timing/active-event-context.tsx` — React Context providing `activeEventId: number | null` and `setActiveEventId`, plus `ActiveEventProvider` wrapper and `useActiveEventContext` hook
  - `lib/live-timing/use-active-event.ts` — `useActiveEvent()` hook that sets the active event on mount and polls every 60 minutes; currently hardcoded to event 1163 (Houston) with TODO for real detection
  - `lib/live-timing/active-event-context.test.tsx` — 7 tests covering context throw-outside-provider, default null state, set/clear event ID, hook mount behavior, interval polling, and cleanup
- Files modified:
  - `app/layout.tsx` — Added `ActiveEventProvider` wrapping children inside `ThemeProvider`
  - `lib/live-timing/index.ts` — Added exports for `ActiveEventProvider`, `useActiveEventContext`, and `useActiveEvent`
  - `vitest.config.ts` — Added `esbuild: { jsx: 'automatic' }` for React JSX support in tests
  - `package.json` / `pnpm-lock.yaml` — Added jsdom dev dependency for React component tests
- **Learnings:**
  - vitest with `jsx: "preserve"` (from tsconfig) needs `esbuild: { jsx: 'automatic' }` in vitest.config.ts to handle JSX without explicit `import React` in every file
  - jsdom is required as a separate dev dependency for React DOM tests — vitest doesn't bundle it
  - React 19 + jsdom emits "not configured to support act(...)" warnings — these are harmless and tests work correctly despite them
  - No PAST_EVENTS.md or INIT.md exists in the repo; used event 1163 (Houston) from the comment in `types.ts` as the hardcoded event ID
  - `useCallback` on `setActiveEventId` in the provider prevents unnecessary re-renders of consumers and stabilizes the `useEffect` dependency in `useActiveEvent`
---
