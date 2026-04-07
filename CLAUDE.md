# LENS — Claude Code Project File

## Identity
LENS = Leading Engagement & Narrative Synthesis. A social content
intelligence platform for marketing teams to understand their content
performance and competitive position. v1 is LinkedIn-only, frontend-only
with mock data. Subject company is Algolia.

## Vault — Source of Truth
Obsidian vault: `~/Library/CloudStorage/GoogleDrive-arijit.chowdhury@algolia.com/My Drive/AI-Docs/Obsidian/ArijitOS-Brain/`

### Standards (READ BEFORE ANY CODE)
- `Standards/CodingSOPs.md` — error handling, logging, SOLID, naming, git
- `Standards/TestingSOPs.md` — TDD (test-first), 3-layer tests, mock strategy
- `Standards/FolderStructure.md` — monorepo layout, tooling, Vercel deploy
- `Architecture/Manifesto.md` — module contract, data contract, failure modes

### Project Knowledge
- PRD:      `Projects/LENS/PRD/`
- Specs:    `Projects/LENS/Specs/`
- Design:   `Projects/LENS/Design/`
- Modules:  `Projects/LENS/Modules/`
- Data:     `Projects/LENS/Data/`
- Research: `Projects/LENS/Research/`
- Context:  `Projects/LENS/Context/`

## Active Context
- Phase: Frontend scaffold + screens with mock data
- Stack: Next.js 16 + TypeScript strict + Tailwind + shadcn/ui
- Deploy target: Vercel (Root Directory = apps/web)
- Backend: deferred (services/ and shared-py/ exist but empty)
- Data: mock JSON in packages/mock-data, NO real APIs yet

## Session Protocol
0. Read WORKING-AGREEMENT.md at the repo root before any other steps
1. Read the four Standards files listed above
2. Read the relevant Specs for the task at hand
3. Follow TDD: write test first, then implement
4. Follow CodingSOPs: try/catch, structured logging, type hints, docstrings
5. Run linting + type checks before marking anything complete
6. Never claim done without running verification and showing output
