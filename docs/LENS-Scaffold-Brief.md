# LENS Scaffold Brief for Claude Code

**Task: scaffold the LENS code repository following the updated FolderStructure standard.**

This is the bootstrap task for the LENS project code repo. After you finish, the
project should be a runnable Next.js skeleton on localhost with the full route
structure for all 17 LENS screens, real Algolia branding, mock data wired in,
and proper logging / linting / testing infrastructure. No backend yet — that
comes later.

The standard you're following lives at `Standards/FolderStructure.md` in the
Obsidian vault and has just been updated. Read it first if you don't already
have it in context.

---

## Step 1 — Confirm the location

Create the LENS code repo at:

```
/Users/arijitchowdhury/AI-Development/LENS/
```

If a `~/Code/` directory doesn't exist on this machine, ask the user where
their project repos live before proceeding. If `/Users/arijitchowdhury/AI-Development/LENS/` already exists,
stop and ask before overwriting anything.

This is a NEW git repo, separate from the Obsidian vault. The Obsidian vault
holds knowledge (`Projects/LENS/`); this new repo holds code.

---

## Step 2 — Initialize the repo root

Inside `/Users/arijitchowdhury/AI-Development/LENS/`, create:

```
lens/
├── .gitignore
├── .nvmrc                   ← Node 20
├── .python-version          ← Python 3.12
├── CLAUDE.md
├── README.md
├── package.json             ← root workspace package
├── pnpm-workspace.yaml
├── turbo.json
├── pyproject.toml           ← root Python project (uv workspace)
└── vercel.json              ← optional, light config
```

### `.gitignore`

Use the standard list from `Standards/FolderStructure.md` "What Never Goes
In Git" section. Include:

```
.env
.env.local
.env.test
.venv/
__pycache__/
*.pyc
*.egg-info/
dist/
build/
.next/
.turbo/
.DS_Store
*.log
node_modules/
coverage/
.vercel/
```

### `pnpm-workspace.yaml`

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### Root `package.json`

```json
{
  "name": "lens",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "turbo dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "test": "turbo test",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\""
  },
  "devDependencies": {
    "prettier": "^3.2.0",
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20"
  }
}
```

### `turbo.json`

```json
{
  "$schema": "https://turborepo.com/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "lint": {},
    "test": {},
    "dev": {
      "cache": false,
      "persistent": true
    }
  },
  "globalEnv": ["NODE_ENV"]
}
```

### `CLAUDE.md`

Under 60 lines. Three sections only:

```markdown
# LENS — Claude Code Project File

## Identity
LENS = Leading Engagement & Narrative Synthesis. A social content
intelligence platform for marketing teams to understand their content
performance and competitive position. v1 is LinkedIn-only, frontend-only
with mock data. Subject company is Algolia.

## Vault Pointers
- PRD:      Projects/LENS/PRD/
- Specs:    Projects/LENS/Specs/
- Design:   Projects/LENS/Design/
- Modules:  Projects/LENS/Modules/
- Data:     Projects/LENS/Data/
- Research: Projects/LENS/Research/
- Context:  Projects/LENS/Context/

## Active Context
- Phase: Frontend scaffold + screens with mock data
- Stack: Next.js 14 + TypeScript strict + Tailwind + shadcn/ui
- Deploy target: Vercel (Root Directory = apps/web)
- Backend: deferred (services/ and shared-py/ exist but empty)
- Data: mock JSON in packages/mock-data, NO real APIs yet
- Branding: Algolia (purple/indigo primary, replace placeholder when assets land)
```

### `README.md`

Short. Identity, what's built, how to run locally, where the docs live.

```markdown
# LENS

Leading Engagement & Narrative Synthesis.
Social content intelligence platform for marketing teams.

## Run locally

    pnpm install
    pnpm dev

Open http://localhost:3000

## Docs

All product knowledge lives in the Obsidian vault at `Projects/LENS/`.
Start with `Projects/LENS/PRD/PRD.md`.
```

---

## Step 3 — Create the directory skeleton

```
lens/
├── apps/
│   └── web/                        ← scaffold in Step 4
├── packages/
│   ├── ui/                         ← empty for now
│   ├── config/                     ← shared eslint, tsconfig, tailwind config
│   ├── types/                      ← shared TypeScript types
│   └── mock-data/                  ← mock JSON for the frontend
├── services/                       ← empty for now (Python services later)
├── shared-py/                      ← empty for now
├── workflows/                      ← empty for now
├── docs/
└── scripts/
```

Create `.gitkeep` files in the empty folders so git tracks them.

---

## Step 4 — Scaffold the Next.js app at `apps/web/`

Use `pnpm create next-app@latest apps/web` with these flags:

- TypeScript: yes
- ESLint: yes
- Tailwind CSS: yes
- App Router: yes
- src directory: no
- Import alias: `@/*`

After scaffold:

1. Update `apps/web/package.json` `name` field to `@lens/web`.
2. Confirm `tsconfig.json` has `"strict": true`.
3. Install shadcn/ui: `cd apps/web && pnpm dlx shadcn@latest init` with
   defaults (Slate base color, CSS variables, neutral).
4. Add the shadcn components LENS will need: `button`, `card`, `tabs`,
   `badge`, `separator`, `scroll-area`, `tooltip`, `dialog`, `sheet`.

---

## Step 5 — Build the route structure for all 17 LENS screens

LENS has 17 screens organized into Editorial mode, Explore mode, the editor
review surface, and settings. Create the App Router file structure exactly
as below. Each `page.tsx` is a STUB for now — just a placeholder with the
screen title and a TODO comment. The point is to lock the route structure;
the screens get filled in one at a time in subsequent tasks.

```
apps/web/app/
├── layout.tsx                            ← root layout, shared shell
├── page.tsx                              ← redirects to /editorial
├── editorial/
│   ├── layout.tsx                        ← editorial mode layout
│   ├── page.tsx                          ← cover (current issue)
│   ├── opener/page.tsx
│   ├── thesis/page.tsx                   ← § 1
│   ├── what-performed/page.tsx           ← § 2
│   ├── cohort/page.tsx                   ← § 3
│   ├── engagers/page.tsx                 ← § 4
│   ├── network/page.tsx                  ← § 5
│   ├── closer/page.tsx
│   └── colophon/page.tsx
├── explore/
│   ├── layout.tsx                        ← explore mode layout
│   ├── page.tsx                          ← landing (4 lens cards)
│   ├── cohort-gap/page.tsx
│   ├── switcher-signal/page.tsx
│   ├── content-gap/page.tsx
│   └── narrative-gap/page.tsx
├── review/
│   └── page.tsx                          ← Sunday-night editor review screen
├── archive/
│   └── page.tsx                          ← past issues
└── settings/
    └── page.tsx                          ← monitored entities + Sunday Sync status
```

Total: **17 screens** (9 editorial + 5 explore + 1 review + 1 archive + 1 settings).

For each `page.tsx` stub, use this template:

```tsx
export default function CohortGapPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-serif">Cohort Gap</h1>
      <p className="text-muted-foreground mt-2">
        TODO: build this screen. See Projects/LENS/Specs/Explore-Mode-Spec.md
      </p>
    </div>
  );
}
```

Vary the heading and TODO link per screen.

---

## Step 6 — Build the shared shell layout

In `apps/web/app/layout.tsx`, build the app shell that wraps everything:

- Top bar with the LENS wordmark on the left
- Two tab buttons in the center: **Editorial** and **Explore**
  - Active tab styled distinctly (use Tailwind + shadcn `tabs` component)
  - Clicking switches the route between `/editorial` and `/explore`
- Entity selector on the right ("Algolia ▾") — for now, a static
  dropdown with "Algolia" as the only option
- Profile icon placeholder on the far right
- Children render below the top bar in a centered max-width container

The top bar should feel editorial — restrained, serif logo, clean lines.
Algolia brand colors as placeholders:

```css
--lens-primary: #003dff;        /* Algolia blue */
--lens-accent: #7f77dd;         /* Algolia accent */
--lens-bg: #ffffff;
--lens-fg: #1a1a2e;
--lens-muted: #6b7280;
```

These go in `apps/web/app/globals.css` as CSS variables alongside the
shadcn base styles. When real Algolia assets land, swap them in.

---

## Step 7 — Set up the mock data package

In `packages/mock-data/`:

```
packages/mock-data/
├── package.json                  ← name: "@lens/mock-data"
├── tsconfig.json
└── src/
    ├── index.ts                  ← exports everything
    ├── issues/
    │   └── issue-14.ts           ← one full mock issue
    ├── cohorts/
    │   └── current-cohort.ts     ← cohort comparison data
    ├── engagers/
    │   └── named-engagers.ts     ← five named engagers
    ├── posts/
    │   └── top-posts.ts          ← three top posts for "What Performed"
    ├── network/
    │   └── movements.ts          ← exec moves, partnerships, events
    ├── briefs/
    │   └── content-briefs.ts     ← three content briefs for the Closer
    └── explore/
        ├── cohort-gap.ts
        ├── switcher-signal.ts
        ├── content-gap.ts
        └── narrative-gap.ts
```

Each mock data file exports realistic-looking objects with TypeScript types.
Make the data feel real — actual-sounding company names, plausible
engagement percentages, named people who could plausibly exist. The point
is for the user to be able to show this to their social media team
tomorrow and have them react to real-looking content.

Use names like "Vestiaire Collective", "Sézane", "Reformation",
"ASOS", "Levi Strauss", "MUJI" — real brands the user knows. Use
made-up but realistic engager names. Use today's date (2026-04-07) as
the issue date.

---

## Step 8 — Set up shared types

In `packages/types/src/index.ts`, define the TypeScript types that mock
data and screens both consume. At minimum:

```ts
export type Persona =
  | 'ecommerce-builder'
  | 'aiml-practitioner'
  | 'gtm-leader'
  | 'cs-leader'
  | 'ai-founder';

export type CohortRow = {
  persona: Persona;
  thisWeek: number;
  lastMonth: number;
  threeMonths: number;
  sixMonths: number;
  trend: 'up' | 'down' | 'flat';
};

export type Engager = {
  id: string;
  name: string;
  role: string;
  company: string;
  linkedinUrl: string;
  whyTheyMatter: string;
  tag: 'customer' | 'alumni' | 'tech-voice' | 'partner' | 'prospect';
};

export type LinkedInPost = {
  id: string;
  title: string;
  url: string;
  format: 'carousel' | 'video' | 'image' | 'text' | 'pdf';
  voice: 'brand' | string;  // string = personal post by named exec
  engagementRate: number;
  engagementVsAvg: number;
  whyItWorked: string;
  reposters: Engager[];
};

export type ContentBrief = {
  id: string;
  title: string;
  hook: string;
  format: string;
  voice: string;
  persona: Persona;
  shipBy: string;
  cohort: string;
  pattern: string;
  signal: string;
  whoToReach: Engager[];
  confidence: 1 | 2 | 3 | 4;
};

export type WeeklyIssue = {
  number: number;
  date: string;
  coverClaim: { line1: string; line2: string };
  editorNote: string;
  // ... etc
};
```

Expand as needed. Every screen pulls types from `@lens/types`.

---

## Step 9 — Set up logging and error handling

Install `pino` for structured logging on the server side:

```bash
pnpm --filter @lens/web add pino
```

Create `apps/web/lib/logger.ts`:

```ts
import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty' }
    : undefined,
});
```

Wrap all data-loading functions and any future API calls in try/catch
with logger.error on failure. Even though there are no real APIs yet,
the pattern needs to be in place from day one.

---

## Step 10 — Set up testing infrastructure

Install Vitest, React Testing Library, Playwright:

```bash
cd apps/web
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
pnpm add -D @playwright/test
```

Create `apps/web/vitest.config.ts`, `apps/web/playwright.config.ts`,
`apps/web/tests/unit/`, `apps/web/tests/e2e/`.

Write ONE smoke test in each:

- `tests/unit/smoke.test.ts` — asserts that 1 + 1 === 2 (proves Vitest runs)
- `tests/e2e/smoke.spec.ts` — opens localhost:3000, asserts the LENS
  wordmark is visible (proves Playwright + Next.js dev server work together)

---

## Step 11 — Set up linting and formatting

Confirm ESLint is configured (Next.js scaffold provides it). Add Prettier
config at the repo root: `.prettierrc`.

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

Install Husky + lint-staged at the root for pre-commit hooks. Configure
lint-staged to run ESLint and Prettier on staged TypeScript files.

---

## Step 12 — Initialize git and run

From `/Users/arijitchowdhury/AI-Development/LENS/`:

```bash
git init
git add .
git commit -m "feat: initial LENS scaffold with 17 screens and mock data"
```

Then:

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in a browser. Confirm:

- The page loads
- The LENS top bar is visible with Editorial and Explore tabs
- Clicking Editorial routes to `/editorial` (cover stub)
- Clicking Explore routes to `/explore` (landing stub)
- All 17 routes resolve to their stub pages without 404s

---

## Step 13 — Report back

Report to the user:

1. The full file tree of `/Users/arijitchowdhury/AI-Development/LENS/` (or wherever you actually created it)
2. The localhost URL (typically `http://localhost:3000`)
3. Total file count
4. Any errors or warnings during scaffold or `pnpm dev`
5. Specific things you stubbed vs. fully implemented
6. What the user should click to verify the scaffold works
7. The next recommended task (filling in the first real screen — likely
   the Editorial cover, since it's the highest-traffic screen and the
   one a CMO sees first)

If anything is ambiguous, stop and ask before continuing. Do not commit
to git beyond the initial commit unless asked. Do not push to a remote.

---

## What this brief does NOT cover (intentionally deferred)

- Filling in the actual content of any of the 17 screens (separate tasks)
- Real Algolia brand assets (waiting on the user to provide SVG logos)
- Backend services in `services/` (Python work, comes after frontend lock)
- Database schema (lives in the vault, comes after data layer design)
- Apify / Perplexity integration (research phase, comes much later)
- Vercel deployment configuration in the dashboard (user does this manually
  via the Vercel UI when ready)
- CI/CD GitHub Actions (separate small task once scaffold lands)

The point of this brief is to produce a runnable Next.js skeleton with all
the routes and infrastructure in place, so subsequent screen-filling tasks
are small and verifiable.
