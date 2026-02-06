## Codebase Patterns

- **TypeScript strict mode** is enabled with `skipLibCheck: true` in tsconfig.json
- **Path alias**: `@/*` maps to project root (e.g., `@/lib/live-timing`)
- **Package manager**: pnpm (v10.28.2)
- **Type-only exports**: Use `export type { ... }` in barrel files for type-only modules
- **Readonly convention**: Use `readonly` on all interface properties and `readonly T[]` for arrays in domain models to prevent mutation

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
