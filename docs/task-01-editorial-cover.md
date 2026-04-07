# LENS Task 01 — Fill the Editorial Cover Screen

**Task type:** Screen fill (first of ~17 small screen tasks)
**Target file:** `apps/web/app/editorial/page.tsx`
**Mock data files needed:** `packages/mock-data/src/issues.ts`, `packages/types/src/issue.ts`
**Estimated effort:** 5-10 minutes
**Definition of done:** When the user reloads `http://localhost:3000/editorial`, they see a real LENS issue cover with issue number, claim, date, and stat line. Not a stub.

---

## Context

This is the first real screen-fill task for LENS. The scaffold is complete, the route
structure is in place, all 17 screens currently render as stubs. We are now filling
them in one at a time, smallest possible tasks, each producing a visible result.

The Editorial Cover is the front page of every Weekly Issue. It is the first thing a
reader sees when they open the LENS publication on Monday morning. Per the PRD and
the Editorial Mode design, every Cover screen contains exactly six elements:

1. **Issue number** (e.g., "LENS · ISSUE 14")
2. **The week's claim** — two short parallel sentences in Fraunces serif, the
   editorial signature of the issue
3. **Date** (e.g., "Week of April 7, 2026")
4. **Stat line** showing what's in the issue (e.g., "23 posts · 147 engagers ·
   6 entities tracked")
5. **Scroll cue** at the bottom-right pointing the reader downward to the rest
   of the issue
6. **Issue table of contents** in a left sidebar (optional for v1 — if the
   editorial layout already provides this via the layout.tsx, do not duplicate
   it on the cover page)

The Cover sets the editorial tone for the entire publication. Take the typography
seriously. This is not a dashboard tile.

---

## Step 1 — Create the Issue type

If `packages/types/src/issue.ts` already exists from the scaffold, extend it. If
it doesn't, create it. The minimal Issue type for v1 should be:

```typescript
// packages/types/src/issue.ts

export interface Issue {
  /** Sequential issue number, starting at 1 */
  issueNumber: number;

  /** ISO date of the Monday this issue publishes */
  publishDate: string;

  /** Two short parallel sentences — the week's editorial claim */
  cover: {
    line1: string;
    line2: string;
  };

  /** Aggregate stats shown on the cover stat line */
  stats: {
    postsAnalyzed: number;
    namedEngagers: number;
    entitiesTracked: number;
  };

  /** Editor's note shown on the Opener screen — used by other screens later */
  editorsNote?: string;

  /** Status — drafts vs published */
  status: 'draft' | 'approved' | 'published';
}
```

Export it from `packages/types/src/index.ts` so other packages can import it as
`@lens/types`.

---

## Step 2 — Create the mock issue data

Create or update `packages/mock-data/src/issues.ts`. The first sample issue is
Issue 14, dated April 7, 2026, claim "Proof beats vision. Luxury beats
everything."

```typescript
// packages/mock-data/src/issues.ts

import type { Issue } from '@lens/types';

export const mockIssues: Issue[] = [
  {
    issueNumber: 14,
    publishDate: '2026-04-07',
    cover: {
      line1: 'Proof beats vision.',
      line2: 'Luxury beats everything.',
    },
    stats: {
      postsAnalyzed: 23,
      namedEngagers: 147,
      entitiesTracked: 6,
    },
    editorsNote:
      'This week, one pattern explains almost everything. Algolia\'s audience ' +
      'rewarded customer proof and ignored vision content — a signal we\'ve seen ' +
      'before but never this cleanly. Three posts carried 64% of all engagement, ' +
      'and all three named real customers.',
    status: 'published',
  },
];

/**
 * Returns the most recent published issue. Used by the Editorial Cover and
 * other Editorial screens that show "the current issue".
 */
export function getCurrentIssue(): Issue {
  const published = mockIssues.filter((i) => i.status === 'published');
  return published.sort((a, b) => b.issueNumber - a.issueNumber)[0];
}
```

Export from `packages/mock-data/src/index.ts`:

```typescript
export * from './issues';
```

---

## Step 3 — Replace the Editorial Cover stub

Open `apps/web/app/editorial/page.tsx`. It currently contains the stub heading
"Cover (Current Issue)" and a TODO note. Replace the entire file contents with
the real Cover implementation:

```tsx
// apps/web/app/editorial/page.tsx

import { getCurrentIssue } from '@lens/mock-data';

export default function EditorialCoverPage() {
  const issue = getCurrentIssue();

  // Format the publish date as "Week of April 7, 2026"
  const formattedDate = new Date(issue.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="mx-auto max-w-4xl px-8 py-24">
      {/* Issue masthead — small, all-caps, top of page */}
      <header className="mb-32">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          LENS &nbsp;·&nbsp; Issue {issue.issueNumber}
        </p>
        <div className="mt-2 h-px w-16 bg-foreground/20" />
      </header>

      {/* The week's claim — two parallel sentences in Fraunces serif, large */}
      <section className="mb-32">
        <h1 className="font-serif text-6xl font-light leading-[1.05] tracking-tight md:text-7xl">
          {issue.cover.line1}
          <br />
          {issue.cover.line2}
        </h1>
      </section>

      {/* Footer block — date, stat line, scroll cue */}
      <footer className="flex items-end justify-between border-t border-foreground/10 pt-8">
        <div>
          <p className="font-serif text-lg text-foreground">
            Week of {formattedDate}
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {issue.stats.postsAnalyzed} posts &nbsp;·&nbsp;{' '}
            {issue.stats.namedEngagers} engagers &nbsp;·&nbsp;{' '}
            {issue.stats.entitiesTracked} entities tracked
          </p>
        </div>
        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          scroll to read ↓
        </p>
      </footer>
    </article>
  );
}
```

### Notes on the styling

- **`font-serif`** should map to Fraunces in the Tailwind config. If the scaffold
  already configured this, use it as-is. If `font-serif` does not exist as a
  Tailwind utility, check `tailwind.config.ts` and add it.
- **`font-mono`** is for the all-caps metadata (issue number, stat line, scroll
  cue). Should already be configured in the scaffold's design system.
- **`text-muted-foreground`** is the shadcn/ui semantic color for secondary text.
  If the scaffold uses a different convention, substitute the equivalent.
- **`max-w-4xl`** keeps the cover within a comfortable reading width on large
  screens. The cover should feel spacious, not cramped.
- **`py-24`** gives the cover lots of vertical breathing room, like a real
  magazine cover.

If any of the Tailwind utilities above don't exist in the scaffold's config,
check `apps/web/tailwind.config.ts` and `apps/web/styles/globals.css` and add
what's needed. Do not skip the typography — the serif headline is the entire
visual identity of the cover.

---

## Step 4 — Verify

Run `pnpm dev` (or check that it's already running) and reload
`http://localhost:3000/editorial` in the browser. You should see:

1. A small all-caps "LENS · ISSUE 14" at the top
2. A large two-line headline in serif font: "Proof beats vision. / Luxury beats
   everything."
3. A horizontal divider
4. "Week of April 7, 2026" in serif on the bottom-left
5. A small mono stat line below the date: "23 posts · 147 engagers · 6 entities
   tracked"
6. A "scroll to read ↓" cue on the bottom-right

The page should feel like a real editorial cover, not a dashboard. Lots of white
space. Generous typography. Quiet metadata.

---

## Step 5 — Report back

Report:

1. The path of the file you modified (`apps/web/app/editorial/page.tsx`)
2. The paths of any new files created (`packages/types/src/issue.ts`,
   `packages/mock-data/src/issues.ts`)
3. Whether the page renders cleanly without errors at
   `http://localhost:3000/editorial`
4. Whether `font-serif` (Fraunces) was already configured or needed adding
5. A screenshot would be ideal but if not possible, describe what's on screen
6. Any TypeScript or linting errors

If the page doesn't render correctly, stop and report the error. Do not try to
fix it by guessing — paste the error and we'll diagnose together.

---

## What's NOT in scope for this task

Do not work on any other Editorial screens. Do not touch the Opener, the
sections, the Closer, or the Colophon. Do not work on Explore mode. Do not add
animations, transitions, or hover states. Do not add a sidebar table of contents.
Do not commit or push to git — that's a separate task.

This is just the Cover. One screen. One file (plus two supporting type/data
files). Verify it looks right, then we move to the next task.
