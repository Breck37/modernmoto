# ModernMoto

The fantasy motocross experience.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + jsdom
- **Package Manager**: pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server |
| `pnpm build` | Production build |
| `pnpm start` | Start the production server |
| `pnpm lint` | Run ESLint |
| `pnpm exec vitest run` | Run tests |
| `pnpm exec tsc --noEmit` | Type check |

## Project Structure

```
app/              → Next.js App Router pages and layouts
  components/     → Shared UI components
lib/              → Core domain logic and utilities
```

## Conventions

- **UI components**: `camelCase` file names
- **Hooks, utils, backend**: `kebab-case` file names
- **Tests**: Colocated next to source files, not in `__tests__/` directories
- **State**: React Context over Redux
- **Commits**: Conventional commit format (`feat(scope):`, `fix(scope):`, etc.)
