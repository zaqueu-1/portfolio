#!/usr/bin/env bash
# bypass-check.sh <mode>
# mode: commit | pr
#
# Claude Code PreToolUse hook (matcher "Bash"; settings.json narrows it with
# `if`). Reads the hook's stdin JSON and gates only the command this mode is
# about — `git commit` or `gh pr create`. Anything else exits 0 untouched: if a
# Claude Code version ignores `if`, this hook sees every Bash call, and blocking
# them all would brick the session.
#
# Token present → allow. Token absent → block with exit 2, the code Claude Code
# treats as "deny". Exit 1 is a non-blocking error and lets the call through.
#
# Who consumes the token:
#   - commit: the git pre-commit hook, which runs AFTER this one. Removing it
#     here would make the git hook refuse the very commit this hook allowed.
#   - pr: this hook. `gh pr create` passes through no git hook.
#
# mode "pr" additionally validates the *actual* gh pr create command (stdin JSON)
# and the body file it references — not just token presence. Blocks inline --body,
# wrong --body-file paths, English headers (## Summary), and missing PT-BR sections.
# Keep in sync with managed/skills/make-pr/SKILL.md and hooks/lib/pr-template-validate.cjs.

MODE="${1:-commit}"
HOOK_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_INPUT="$(cat)"

COMMAND="$(printf '%s' "$HOOK_INPUT" | node -e '
let s = ""
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  try { process.stdout.write(String(JSON.parse(s).tool_input?.command ?? "")) } catch {}
})')"
# If node could not extract the command, match against the raw hook JSON rather
# than an empty string: an empty command would read as "not a commit" and let
# `gh pr create` through, and that mode has no git hook behind it.
COMMAND="${COMMAND:-$HOOK_INPUT}"

if [ "$MODE" = "commit" ]; then
  PATTERN='(^|[;&|[:space:]"])git([[:space:]]+-[^[:space:]]+([[:space:]]+[^-[:space:]][^[:space:]]*)?)*[[:space:]]+commit([[:space:]]|$)'
else
  PATTERN='(^|[;&|[:space:]"])gh[[:space:]]+pr[[:space:]]+create([[:space:]]|$)'
fi
if ! printf '%s' "$COMMAND" | grep -Eq "$PATTERN"; then
  exit 0
fi

# The token lives at the root of the checkout the command acts on. A command
# like `cd ../repo-wt-123 && git commit ...` acts on the worktree, not on the
# session's cwd, so follow a leading `cd <dir>` before resolving the root.
TARGET_DIR="."
LEADING_CD="$(printf '%s' "$COMMAND" | sed -nE 's/^[[:space:]]*cd[[:space:]]+("([^"]+)"|([^[:space:];&]+)).*/\2\3/p')"
if [ -n "$LEADING_CD" ] && [ -d "$LEADING_CD" ]; then
  TARGET_DIR="$LEADING_CD"
fi
ROOT="$(git -C "$TARGET_DIR" rev-parse --show-toplevel 2>/dev/null || echo "$TARGET_DIR")"
TOKEN_FILE="$ROOT/.claude/.${MODE}-authorized"

if [ ! -f "$TOKEN_FILE" ]; then
  if [ "$MODE" = "commit" ]; then
    echo "Direct git commit blocked. Use the /commit-changes skill — it runs /code-review and /security-review automatically before committing." >&2
  else
    echo "Direct gh pr create blocked. Use the /make-pr skill — it builds a proper PT-BR description and validates the branch first." >&2
  fi
  exit 2
fi

if [ "$MODE" = "pr" ]; then
  if ! printf '%s' "$HOOK_INPUT" | (cd "$TARGET_DIR" && node "$HOOK_DIR/lib/pr-create-gate.cjs"); then
    exit 2
  fi
  rm -f "$TOKEN_FILE"
fi

exit 0
