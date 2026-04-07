# LENS Working Agreement

> Read this before every task. No exceptions.

---

## 1. Scope Discipline

Do exactly what the task asks. Nothing more.

- Do NOT pre-build types, mock data, components, utilities, or any other code that the current task does not actively use.
- Do NOT anticipate future tasks. Each task defines its own scope.
- If pre-building seems helpful, flag it as a suggestion in the report and STOP. Let the user decide.
- If you find yourself adding files that aren't named in the task, stop and ask.

**Why:** Speculative work locks in design decisions that haven't been made deliberately. It creates phantom abstractions that the project then has to live with or refactor away. The cost of pre-building is always paid later, with interest.

---

## 2. Verification Before Done

Never claim a task is complete without running the verification commands AND showing the actual output in the report.

Required for every task that touches code:

```bash
pnpm test          # all tests must pass
pnpm typecheck     # zero TypeScript errors
pnpm lint          # zero ESLint errors
```

A summary is not verification. The actual command output is verification.

Required for every task that touches a screen:

- Open the route in the browser (or curl it) and confirm it returns 200
- Confirm the new content is visibly rendered

---

## 3. Honest Reporting

Reports must be precise about what was done, what wasn't, and what was noticed.

- If something didn't work, say so explicitly. Don't hide it.
- If you noticed a gap that wasn't in scope, flag it but DO NOT fix it. Suggestions go in a "Noticed but not fixed" section at the bottom of the report.
- If you went outside scope by accident, say so explicitly so the user can decide whether to keep it or roll back.
- If you skipped a step from the task, say which step and why.
- Never claim "done" if any verification command failed.

---

## 4. Test-First (TDD) Order

Per `Standards/TestingSOPs.md` in the Obsidian vault:

1. RED — Write the failing test first. Run it. Confirm it fails for the right reason.
2. GREEN — Write minimum code to make it pass. Run the test. Confirm it passes.
3. REFACTOR — Clean up while keeping tests green.

If you write code before a test, you are doing it wrong. Stop and write the test first.

---

## 5. Standards Are Non-Negotiable

If a task instruction conflicts with a standard in `Standards/`, the standard wins. Stop and report the conflict. Do not silently follow the task and violate the standard.

---

## Related

- `CLAUDE.md` — project identity and session protocol
- Obsidian: `Standards/CodingSOPs.md`
- Obsidian: `Standards/TestingSOPs.md`
- Obsidian: `Standards/FolderStructure.md`
