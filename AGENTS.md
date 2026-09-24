# Agent Contract

This file defines how AI agents operate in this repository. Every agent — main or subagent — follows this contract automatically via the global rules installed by `@tron/claude-config`.

---

## Isolation model

Each agent is a **self-sufficient worker**. Isolation means one thing specifically: you do not inherit the parent conversation's history or assumptions. It does **not** mean you work blind.

What you do when given a task:
1. **Query the codebase** — use MCP tools, read files, explore architecture. The codebase is always available.
2. **Execute the task** with full access to all tools and the full rule stack.
3. **Return a focused result** — no trailing questions, no scope creep.

What isolation prevents:
- Inheriting assumptions from the parent conversation
- Sharing state with sibling agents
- Expanding scope beyond the assigned task
- Asking for approval on standard operations — the task already carries that authority

---

## Codebase access — always on, always full

Agents must explore the codebase actively before acting. Tool priority:

**1. codebase-memory-mcp first** (registered globally in `~/.claude/.mcp.json`, available to all agents automatically):

| Tool | Use for |
|------|---------|
| `search_graph` | Find functions, classes, routes by name or pattern |
| `trace_path` | Follow call chains and data flows across files |
| `get_code_snippet` | Fetch exact source for a symbol |
| `get_architecture` | Understand project structure and module boundaries |
| `search_code` | Graph-augmented text search |

**2. Raw file reads** — only when editing or when the graph doesn't have the answer.

The task context tells you WHAT to do. The codebase tells you HOW it fits. Always query before acting.

---

## Rule stack

All agents in this repo have access to the full rule stack, applied in this priority order:

| Priority | Layer | Source | What it governs |
|----------|-------|--------|-----------------|
| 1 | **ECC rules** | `.claude/rules/ecc/` | Coding standards: naming, testing, security, git workflow |
| 2 | **Karpathy principles** | `~/.claude/rules/agent-isolation.md` | Behavior: simplicity, surgical changes, goal-driven execution |
| 3 | **Harness enforcement** | `~/.claude/rules/harness-enforcement.md` | Workflow: commit gates, review gates, approval flow |
| 4 | **Caveman** | `~/.claude/rules/caveman.md` | Communication: terse replies (always on) |

When rule layers conflict: higher priority wins.
When skill layers conflict: Karpathy > ECC.
**Communication:** caveman is mandatory for chat replies; code / commits / PR bodies stay normal prose.

---

## Caveman — always on

Every agent replies in caveman style by default ([JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)). Drop filler. Keep technical accuracy. Code and commands unchanged.

- Default: `/caveman full`
- Pause: `stop caveman` / `normal mode`
- Auto-Clarity: normal prose for security warnings, irreversible actions, or user confusion — then resume

Full contract: `~/.claude/rules/caveman.md`.

---

## Frontend skills — mandatory for UI tasks

On ANY frontend/UI task (pages, components, styling, layout, redesign, landing, dashboard):

**Maximum source of truth for DESIGN** = combo:

1. **Emil Kowalski** — `~/.agents/skills/<name>/SKILL.md` (symlinked to `~/.claude/skills/` and `~/.cursor/skills/`). Start with `emil-design-eng`, then task-specific skills (`animate`, `mobile-native`, `prototype`, `review-animations`, etc.).
2. **Impeccable** — `~/.claude/skills/impeccable/SKILL.md` — design direction, quality bar, and hook-enforced edit discipline.
3. **Taste** (`design-taste-frontend` + task-matched variants) — `~/.agents/skills/<name>/SKILL.md` (symlinked to `~/.claude/skills/` and `~/.cursor/skills/`). Use `design-taste-frontend` for landing/portfolio/marketing/redesign; `redesign-existing-projects` on brownfield; other leonxlnx variants and image skills when the brief matches. **Not** for pure dashboards.

Then:

4. **`ui-ux-pro-max`** (important but subordinate) — **after the combo sets direction**, run the design-system generator: `python3 ~/.claude/skills/ui-ux-pro-max/scripts/search.py "<product_type> <keywords>" --design-system -p "Project Name"`. Use stack CSVs, UX guidance, and the pre-delivery checklist.
5. **`frontend-design`** (optional supporting guardrail) — anti-generic AI look only; never outranks the combo.

**On conflict between ui-ux-pro-max (or frontend-design) and the Emil+Impeccable+Taste combo, ALWAYS prefer the combo.**

Announce: `Using Emil + Impeccable + Taste (+ ui-ux-pro-max) for [purpose]`

**Emil + Impeccable + Taste are mandatory for UI work.** ui-ux-pro-max is mandatory but subordinate — run only after the combo establishes design direction. frontend-design is optional support.

**When these skills apply:**
- Creating new pages, components, or views
- Restyling or redesigning existing UI
- Implementing landing pages, dashboards, forms, or navigation
- Color, typography, spacing, layout, or animation decisions
- Responsive design, accessibility, or UX improvements
- Any task where the output is visible to a user

**When these skills do NOT apply:**
- Pure backend logic, API design, database migrations
- Infrastructure, DevOps, CI/CD configuration
- Non-visual scripts, tooling, or build configuration

---

## Karpathy principles

Applied automatically to every write/edit/refactor task:

**1. Think before coding** — Surface assumptions. Name confusion. Never pick an interpretation silently. If multiple paths exist, present them.

**2. Simplicity first** — Minimum code that solves the problem. No speculative features, abstractions, or configurability beyond what was asked. If the same result fits in half the lines, write the shorter version.

**3. Surgical changes** — Touch only what the task requires. Do not improve adjacent code, refactor things that aren't broken, or remove pre-existing dead code unless explicitly asked. Every changed line should trace directly to the task.

**4. Goal-driven execution** — Define verifiable success criteria before implementing. For multi-step tasks:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
```

---

## Permitted operations

The following are pre-approved — agents proceed without asking:

| Category | Operations |
|----------|-----------|
| File access | Read, Write, Edit any project file |
| Git (read-only) | `git status`, `git log`, `git diff`, `git show`, `git branch`, `git stash list` |
| Build / test | `npm run *`, `bun run *`, `npx *`, `vitest`, `tsc`, `vue-tsc` |
| Exploration | `ls`, `find`, `grep`, `cat`, `head`, `tail`, `wc` |
| Node scripts | `node *` for project tooling |

## Not permitted without explicit user instruction

| Operation | Why |
|-----------|-----|
| `git commit` | Must use `/commit-changes` skill (runs code review + security review first) |
| `git push` / `gh pr create` | Must use `/make-pr` skill |
| Destructive FS ops (`rm -rf`, etc.) | Irreversible — confirm with user |
| Files outside project root | Out of scope |

---

## Commit and PR flow

```
agent wants to commit
  → creates .claude/.commit-authorized
  → runs /commit-changes skill
    → /code-review
    → /security-review
    → git commit (hook reads token, permits, deletes token)

agent wants to open PR
  → writes .claude/.pr-body-draft.md (PT-BR template — see .claude/PR-TEMPLATE.md)
  → validates: node .claude/hooks/lib/validate-pr-body.cjs .claude/.pr-body-draft.md
  → creates .claude/.pr-authorized
  → runs /make-pr skill
    → gh pr create --body-file .claude/.pr-body-draft.md (hook validates command + body; blocks --body inline and ## Summary)
```

Direct `git commit` or `gh pr create` without the token is blocked by the git hooks.
