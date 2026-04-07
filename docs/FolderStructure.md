---
created: 2026-04-06
updated: 2026-04-06
type: standard
tags: [standards, structure, folders, sop, tooling]
---

# Folder Structure Standards

> Every new project, every new package follows this exactly.
> Consistency means Claude Code and future-you always know where everything is.

There are **two** structures to follow for every project:

1. The **knowledge structure** — lives in the Obsidian vault, holds specs,
   PRDs, design docs, module specs, data specs, and research notes.
2. The **code structure** — lives in the code monorepo, holds the deployable
   apps, the reusable libraries, the backend services, and the infra.

Both are mandatory for every project. They are not interchangeable.

---

## Project Knowledge Structure (Obsidian Vault)

Every project in `Projects/` follows this structure:

```
Projects/{ProjectName}/
├── Context/       quick-reference context for Claude Code
├── PRD/           product requirements documents
├── Specs/         functional specs per surface area
├── Design/        design system + screen catalog
├── Modules/       one file per backend module
├── Data/          database + pipeline
└── Research/      external sources, classifiers, pipelines
```

### What Goes Where (Knowledge)

| Folder       | Purpose                                                              | Audience              |
|--------------|----------------------------------------------------------------------|-----------------------|
| `Context/`   | Quick-start context, active state, current sprint                    | Claude Code daily     |
| `PRD/`       | Vision, users, scope, success criteria. The "what and why."          | Product + execs       |
| `Specs/`     | Functional behavior per mode, screen, or feature. The "how it works."| Eng + design          |
| `Design/`    | Design system, typography, colors, screen mockups, layout grids      | Design + frontend     |
| `Modules/`   | One detailed spec per backend module. Inputs, outputs, contracts.    | Backend eng           |
| `Data/`      | DB schema, pipeline diagrams, storage decisions                      | Backend eng + data    |
| `Research/`  | External APIs, scrapers, classifiers, research pipelines             | Backend eng + data    |

### File Naming (Knowledge Files)

- All knowledge files are Markdown (`.md`).
- Filenames use `Title-Case-With-Hyphens.md`.
- No numeric prefixes on folders or files. Reading order is enforced by
  document content and cross-links, not by filename sorting.
- Every file starts with frontmatter:
  ```yaml
  ---
  created: YYYY-MM-DD
  updated: YYYY-MM-DD
  type: prd | spec | design | module | data | research
  project: {ProjectName}
  tags: [...]
  ---
  ```
- Every file ends with a `## Related` section linking to other relevant
  files in the same project using `[[wikilinks]]`.
- One concept per file. If a file covers two distinct things, split it.
- Cross-link liberally; never duplicate content.

### CLAUDE.md Vault Pointers

Every project's `CLAUDE.md` (in the **code** monorepo root) must include
a Vault Pointers section that points at the project's knowledge folders:

```
## Vault Pointers
- PRD:      Projects/{ProjectName}/PRD/
- Specs:    Projects/{ProjectName}/Specs/
- Design:   Projects/{ProjectName}/Design/
- Modules:  Projects/{ProjectName}/Modules/
- Data:     Projects/{ProjectName}/Data/
- Research: Projects/{ProjectName}/Research/
- Context:  Projects/{ProjectName}/Context/
```

---

## Code Monorepo Structure (Per Project)

Every project that has code (frontend, backend, or both) is organized as a
**polyglot monorepo** with three top-level code folders. The structure is
designed to deploy cleanly to **Vercel** (frontend) while keeping Python
backend services and shared libraries cleanly separated.

```
{project-name}/                    ← code repo root (one git repo per project)
│
├── apps/                          ← deployable applications (Vercel-detected)
│   └── web/                       ← Next.js frontend ("Root Directory" in Vercel)
│       ├── app/                   ← Next.js App Router pages
│       ├── components/
│       ├── lib/
│       ├── public/
│       ├── styles/
│       ├── tests/
│       ├── next.config.js
│       ├── tailwind.config.ts
│       ├── tsconfig.json
│       ├── package.json           ← name: "@{project}/web"
│       └── README.md
│
├── packages/                      ← shared TypeScript / JavaScript libraries
│   ├── ui/                        ← shared React components
│   │   ├── src/
│   │   ├── package.json           ← name: "@{project}/ui"
│   │   └── tsconfig.json
│   ├── config/                    ← shared eslint, tsconfig, tailwind base
│   │   ├── eslint/
│   │   ├── tsconfig/
│   │   ├── tailwind/
│   │   └── package.json           ← name: "@{project}/config"
│   ├── types/                     ← shared TS types (mock data shapes, API contracts)
│   │   ├── src/
│   │   └── package.json           ← name: "@{project}/types"
│   └── mock-data/                 ← mock data for the frontend (v1 only)
│       ├── src/
│       └── package.json           ← name: "@{project}/mock-data"
│
├── services/                      ← Python backend services (Vercel ignores)
│   └── {service-name}/
│       ├── src/
│       │   └── {service_name}/
│       │       ├── __init__.py
│       │       ├── main.py
│       │       ├── adapters/
│       │       ├── config.py
│       │       └── exceptions.py
│       ├── tests/
│       │   ├── unit/
│       │   ├── integration/
│       │   └── contract/
│       ├── pyproject.toml
│       └── README.md
│
├── shared-py/                     ← shared Python libraries (Vercel ignores)
│   ├── core/                      ← BaseModule, base abstractions
│   ├── prompt/                    ← shared prompt library
│   ├── research/                  ← shared adapters (Perplexity, web search)
│   └── pyproject.toml             ← uv workspace root for the Python side
│
├── workflows/                     ← Temporal workflow definitions (Python)
│   └── {workflow_name}.py
│
├── docs/                          ← repo-level docs (links to Obsidian vault)
├── scripts/                       ← repo-level utility scripts
│
├── .gitignore
├── .nvmrc                         ← Node version pin
├── .python-version                ← Python version pin (for uv)
├── CLAUDE.md                      ← Claude Code project instructions
├── README.md
├── package.json                   ← root: workspace definition
├── pnpm-workspace.yaml            ← pnpm workspace config (Vercel reads this)
├── turbo.json                     ← Turborepo build orchestration
├── pyproject.toml                 ← root Python project (uv workspace)
└── vercel.json                    ← Vercel project config (optional, see below)
```

### What Goes Where (Code)

| Folder        | Purpose                                                              | Vercel sees? |
|---------------|----------------------------------------------------------------------|--------------|
| `apps/`       | Deployable applications. Each subfolder is a separate deployable.    | Yes          |
| `packages/`   | Reusable TypeScript libraries imported by `apps/`.                   | Yes          |
| `services/`   | Long-running Python backend services (workers, cron, queue consumers).| No          |
| `shared-py/`  | Reusable Python libraries imported by `services/` and `workflows/`.  | No           |
| `workflows/`  | Temporal workflow definitions.                                       | No           |
| `docs/`       | Repo-level documentation, links to Obsidian vault.                   | No           |
| `scripts/`    | Repo-level utility scripts (one-offs, migrations, dev helpers).      | No           |

The principle: **`apps/` is what you deploy. `packages/` and `shared-py/`
are what you reuse. `services/` is what runs in the background.**

This maps directly onto object-oriented engineering principles:
- Base classes and shared abstractions live in `packages/` (TypeScript) or
  `shared-py/core/` (Python).
- Specific implementations that extend base classes live in `apps/`
  (frontend implementations) or `services/` (backend implementations).
- Adapters for external APIs live in `packages/{name}/adapters/` or
  `shared-py/{name}/adapters/` so each external integration has one home.

---

## Vercel Deployment Requirements

Every project that deploys to Vercel must follow these conventions, all
verified against Vercel's monorepo and Turborepo documentation as of
April 2026.

### The Workspace Root

The root of the code monorepo MUST be a JavaScript workspace recognized by
Vercel. This means one of:

- **`pnpm-workspace.yaml`** at the root (recommended — fastest, what Vercel
  templates use)
- **`package.json`** at the root with a `workspaces` field (for npm or yarn)

The standard `pnpm-workspace.yaml` looks like this:

```yaml
packages:
  - "apps/*"
  - "packages/*"
```

That is the entire workspace definition. Vercel reads this file to detect
the monorepo and to determine which packages are part of the JS/TS
workspace. **Python folders (`services/`, `shared-py/`, `workflows/`) are
NOT included in the workspace and are invisible to Vercel by design.**

### Vercel Project Settings

When importing the project in the Vercel dashboard:

| Setting | Value |
|---|---|
| Framework Preset | Next.js (auto-detected) |
| Root Directory | `apps/web` (point Vercel at the actual app inside the monorepo) |
| Build Command | `turbo build` (Turborepo is globally installed on Vercel) |
| Install Command | Auto-detected (pnpm) |
| Output Directory | Framework default (`.next`) |
| Ignored Build Step | `npx turbo-ignore --fallback=HEAD^1` |

The Root Directory setting is the most important one. Without it, Vercel
will look at the repo root and fail to find a Next.js app. Set it to
`apps/web` and Vercel finds the app, infers the framework, and builds.

### turbo.json

`turbo.json` lives at the repo root and orchestrates builds across the
workspace. Minimum config:

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
  "globalEnv": [
    "NODE_ENV"
  ]
}
```

Every environment variable that affects build output MUST be declared in
`env` (per-task) or `globalEnv` (across all tasks), or Turborepo's cache
will silently break. This is the #1 cause of Vercel deploy failures in
monorepos.

### Workspace Package Naming

Every package in `apps/` and `packages/` MUST have:

1. A unique `name` field in its `package.json` (e.g., `@lens/web`,
   `@lens/ui`, `@lens/config`).
2. Explicit dependencies on other workspace packages declared in
   `dependencies` or `devDependencies` using the `workspace:*` protocol.

Without unique names and explicit dependencies, Vercel's "skip unaffected
projects" feature cannot calculate the dependency graph and will rebuild
everything on every commit.

### What Vercel Deploys vs. What It Ignores

- **Vercel deploys:** the contents of `apps/web/` plus any workspace
  packages from `packages/*` that `apps/web` depends on. Build is
  orchestrated by Turborepo.
- **Vercel ignores:** `services/`, `shared-py/`, `workflows/`, `docs/`,
  `scripts/`. These folders are outside the JS workspace and are
  completely invisible to Vercel. They get deployed separately to Python
  hosts (Modal, Railway, Fly, Render, or local laptop in v1).

This separation is intentional. Vercel handles the frontend; Python
infrastructure runs elsewhere.

---

## Required Tooling

Every project uses the same tooling stack. No exceptions, no per-project
variation. Consistency is the point.

### TypeScript / JavaScript Side

| Concern              | Tool                                       |
|----------------------|--------------------------------------------|
| Package manager      | **pnpm** (workspaces, fast, deterministic) |
| Build orchestration  | **Turborepo** (globally available on Vercel)|
| Framework            | **Next.js 14+** (App Router)               |
| Language             | **TypeScript** (strict mode mandatory)     |
| Styling              | **Tailwind CSS**                           |
| Component library    | **shadcn/ui** (copy-into-repo pattern)     |
| Linter               | **ESLint** with `eslint-config-next`       |
| Formatter            | **Prettier**                               |
| Unit tests           | **Vitest**                                 |
| Component tests      | **React Testing Library**                  |
| E2E tests            | **Playwright**                             |
| Pre-commit hooks     | **Husky** + **lint-staged**                |

`tsconfig.json` MUST have `"strict": true`. Non-negotiable.

### Python Side

| Concern              | Tool                                       |
|----------------------|--------------------------------------------|
| Package manager      | **uv** (workspace support, Rust-fast)      |
| Linter               | **Ruff** (replaces Pylint, Flake8, isort)  |
| Formatter            | **Ruff format** or **Black**               |
| Type checker         | **mypy** (strict mode)                     |
| Test runner          | **pytest** + **pytest-cov** + **pytest-asyncio** |
| Validation           | **Pydantic v2** for all config and contracts |
| Pre-commit hooks     | **pre-commit** framework                   |

Every Python file uses `from __future__ import annotations` at the top.
Every package has a `pyproject.toml` with explicit Ruff and mypy config.

### Repo-Wide

| Concern              | Tool                                       |
|----------------------|--------------------------------------------|
| CI/CD                | **GitHub Actions** (lint + test + build on every PR) |
| Commit format        | **conventionalcommits** (`feat:`, `fix:`, etc.) |
| Commit linting       | **commitlint**                             |
| Vercel deploy        | Auto via GitHub integration                |

---

## Naming Rules

| Thing            | Convention   | Example                       |
|------------------|--------------|-------------------------------|
| Folder/package   | kebab-case   | `base-module`, `temporal-core`|
| Python module    | snake_case   | `base_module`, `temporal_core`|
| Class            | PascalCase   | `BaseModule`, `ResearchModule`|
| Function         | snake_case   | `execute()`, `build_prompt()` |
| Constant         | UPPER_SNAKE  | `MAX_RETRIES`, `DEFAULT_TTL`  |
| Test file (Py)   | `test_{name}.py` | `test_research.py`        |
| Test file (TS)   | `{name}.test.ts` | `cohort-comparison.test.ts` |
| Config file      | always `config.yaml` |                       |
| Env file         | `.env` — never commit, always gitignored |   |
| Knowledge file   | `Title-Case-With-Hyphens.md` | `Database-Schema.md` |
| TS package name  | `@{project}/{folder}` | `@lens/ui`, `@lens/web` |

---

## File Rules (Code)

- One class per file for core modules.
- Filename matches primary class name (snake_case for Python, kebab-case
  for TypeScript).
- `__init__.py` exports only — no logic inside it.
- `adapters/` folder for every external API integration.
- `exceptions.py` for all custom exceptions per package.
- `config.py` for the Pydantic config model per package.
- Every TypeScript component file exports exactly one component as default.

---

## What Never Goes In Git

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

---

## Git Branching Strategy

GitHub Flow. Simple. Right for a solo developer building fast.

```
main
├── feat/cohort-comparison
├── fix/perplexity-timeout
├── test/research-contracts
└── refactor/base-module-v2
```

Rules:
- Never commit directly to main.
- Branch from main, merge to main via PR.
- Tests must pass before merge (enforced by GitHub Actions).
- Delete branch after merge.
- Commit format: `feat/fix/test/refactor/docs/chore: description`.

---

## CLAUDE.md Rules Per Project

Every code repo has `CLAUDE.md` at root. Must be:

- Under 60 lines.
- No implementation details — those live in the Obsidian vault.
- Three sections only: **Identity**, **Vault Pointers**, **Active Context**.

The Vault Pointers section references the Obsidian knowledge folders for
the project. Claude Code reads CLAUDE.md first when it opens the repo,
follows the pointers to the vault, and builds context from there.

---

## Migration Note (April 2026)

Existing projects (CoE, CurioQuest, LinkedIn, MyOS, PRISM) currently use a
single `Context/` folder under `Projects/{Name}/` in the vault. These
should be migrated to the seven-folder knowledge structure on the next
major work session for each project.

The code monorepo structure (apps/packages/services/shared-py) is the
standard for all NEW projects starting April 2026. Existing project
repos will be migrated opportunistically.

---

## Related

- [[Standards/CodingSOPs]]
- [[Standards/TestingSOPs]]
- [[Architecture/Manifesto]]
