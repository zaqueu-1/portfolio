#!/usr/bin/env bash
# bootstrap-check.sh — UserPromptSubmit hook
# Runs on every Claude Code prompt. Two jobs:
#   1. Auto-update the harness (once per 24h, silent)
#   2. Verify required tools are installed; inject install instructions if missing
# Always exits 0 (never blocks the user's prompt).
# Output on stdout is injected into Claude's context as a system note.

LAST_CHECK_FILE=".claude/.harness-last-update"
NOW=$(date +%s)

# ── Package manager detection (pm-agnostic) ──────────────────────────────────
detect_pm() {
  if [ -f "bun.lockb" ] || [ -f "bun.lock" ]; then
    echo "bun"
  elif [ -f "pnpm-lock.yaml" ]; then
    echo "pnpm"
  else
    echo "npm"
  fi
}

PM=$(detect_pm)

# ── Auto-update (debounced to once per 24h) ─────────────────────────────────
SHOULD_UPDATE=true
if [ -f "$LAST_CHECK_FILE" ]; then
  LAST=$(cat "$LAST_CHECK_FILE" 2>/dev/null || echo 0)
  if [ $((NOW - LAST)) -lt 86400 ]; then
    SHOULD_UPDATE=false
  fi
fi

if [ "$SHOULD_UPDATE" = true ]; then
  # Write timestamp immediately (prevents concurrent update races)
  echo "$NOW" > "$LAST_CHECK_FILE"

  PACKAGE_NAME="@tron/claude-config"
  PKG_JSON="node_modules/${PACKAGE_NAME}/package.json"

  # A consumer that pinned an exact commit opted OUT of auto-update, and this
  # block cannot honour that by accident: `bun add` / `npm install --save-dev`
  # re-resolve to the repository's default branch, so updating here would
  # rewrite the pin in the consumer's package.json — the precise opposite of
  # what pinning asks for. Detect the pin in the consumer's own manifest and
  # leave it alone; a pinned harness moves only when someone bumps the spec.
  PINNED=false
  if [ -f package.json ] && node -e "
    const fs = require('fs');
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const spec = (pkg.dependencies || {})['${PACKAGE_NAME}']
              || (pkg.devDependencies || {})['${PACKAGE_NAME}'] || '';
    process.exit(/#[0-9a-f]{40}\$/.test(spec) ? 0 : 1);
  " 2>/dev/null; then
    PINNED=true
  fi

  if [ -f "$PKG_JSON" ]; then
    INSTALLED_VERSION=$(node -e "
      try { process.stdout.write(require('./${PKG_JSON}').version || ''); }
      catch(e) { process.stdout.write(''); }
    " 2>/dev/null)

    # For git-sourced packages: compare resolved commit vs remote HEAD.
    # npm records this in package.json's "_resolved" field; pnpm does not,
    # so fall back to the installed package's own .git HEAD when present.
    INSTALLED_SHA=$(node -e "
      try {
        const r = require('./${PKG_JSON}')._resolved || '';
        process.stdout.write(r.split('#')[1] || '');
      } catch(e) { process.stdout.write(''); }
    " 2>/dev/null)
    if [ -z "$INSTALLED_SHA" ] && [ -d "node_modules/${PACKAGE_NAME}/.git" ]; then
      INSTALLED_SHA=$(git -C "node_modules/${PACKAGE_NAME}" rev-parse HEAD 2>/dev/null)
    fi

    REMOTE_SHA=""
    if [ -d "node_modules/${PACKAGE_NAME}/.git" ]; then
      REMOTE_SHA=$(git -C "node_modules/${PACKAGE_NAME}" ls-remote origin HEAD 2>/dev/null | awk '{print $1}')
    fi

    NEEDS_UPDATE=false
    if [ -n "$REMOTE_SHA" ] && [ -n "$INSTALLED_SHA" ] && [ "$INSTALLED_SHA" != "$REMOTE_SHA" ]; then
      NEEDS_UPDATE=true
    fi

    if [ "$NEEDS_UPDATE" = true ] && [ "$PINNED" = true ]; then
      echo "[harness] update available ($INSTALLED_VERSION → latest), skipped: package.json pins an exact commit"
    elif [ "$NEEDS_UPDATE" = true ]; then
      echo "[harness] update available ($INSTALLED_VERSION → latest), applying..."
      # Use detected package manager — never hardcode npm
      case "$PM" in
        bun)  bun add --dev "${PACKAGE_NAME}" 2>/dev/null ;;
        pnpm) pnpm add --save-dev "${PACKAGE_NAME}" --silent 2>/dev/null ;;
        *)    npm install --save-dev "${PACKAGE_NAME}" --silent 2>/dev/null ;;
      esac
      bash scripts/setup-claude-harness.sh --silent 2>/dev/null
      echo "[harness] updated ✓"
    fi
  fi

fi

# ── Environment map (reduces agent orientation tax) ──────────────────────────
# Injected once per prompt into Claude's context. Date-level only — no
# second-precision timestamps (would break KV-cache prefix on every call).
WORKSPACE_ROOT=$(pwd | sed "s|$HOME|~|")
PKG_NAME=$(node -e "try{const p=require('./package.json');process.stdout.write(p.name||'')}catch(e){}" 2>/dev/null)
GIT_BRANCH=$(git branch --show-current 2>/dev/null)

echo "## Harness: workspace"
echo "  root:   $WORKSPACE_ROOT"
echo "  pm:     $PM"
[ -n "$PKG_NAME" ]  && echo "  pkg:    $PKG_NAME"
[ -n "$GIT_BRANCH" ] && echo "  branch: $GIT_BRANCH"

# ── Tool verification ─────────────────────────────────────────────────────────
MISSING=()

# Check gsd
if ! command -v gsd &>/dev/null && ! npx --yes @opengsd/gsd-pi --version &>/dev/null 2>&1; then
  MISSING+=("gsd")
fi

# Ensure codebase-memory-mcp (auto-install if missing; never blocks the prompt).
#
# The registration check honours CLAUDE_CONFIG_DIR and every file the official
# installer may write to. Hardcoding ~/.claude/.mcp.json produced a permanent
# false negative on machines where CLAUDE_CONFIG_DIR points elsewhere: the
# installer registered the server in $CLAUDE_CONFIG_DIR/.claude.json and the
# hook still reported the tool as missing on every prompt.
CBM_REGISTERED=0
if node -e "
  const fs = require('fs');
  const os = require('os');
  const path = require('path');
  const home = os.homedir();
  const dirs = [process.env.CLAUDE_CONFIG_DIR, path.join(home, '.claude')].filter(Boolean);
  const files = [];
  for (const d of dirs) files.push(path.join(d, '.mcp.json'), path.join(d, '.claude.json'));
  files.push(path.join(home, '.claude.json'));
  for (const f of files) {
    try {
      if (!fs.existsSync(f)) continue;
      const d = JSON.parse(fs.readFileSync(f, 'utf8'));
      const keys = Object.keys(d.mcpServers || {});
      if (keys.some(k => k.includes('codebase-memory'))) process.exit(0);
    } catch { /* unreadable or malformed: try the next candidate */ }
  }
  process.exit(1);
" 2>/dev/null; then
  CBM_REGISTERED=1
fi

if [ "$CBM_REGISTERED" -eq 0 ]; then
  ENSURE_CBM="node_modules/@tron/claude-config/scripts/lib/ensure-codebase-memory.js"
  if [ -f "$ENSURE_CBM" ] && node "$ENSURE_CBM" >/dev/null 2>&1; then
    CBM_REGISTERED=1
  fi
fi

if [ "$CBM_REGISTERED" -eq 0 ]; then
  MISSING+=("codebase-memory-mcp")
fi

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "⚠️  CLAUDE HARNESS: Missing required tools: ${MISSING[*]}"
  echo "Run: bash scripts/setup-claude-harness.sh"
  echo "Or install individually:"
  for tool in "${MISSING[@]}"; do
    case "$tool" in
      gsd)
        echo "  gsd: npm install -g @opengsd/gsd-pi"
        ;;
      codebase-memory-mcp)
        echo "  macOS/Linux: curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash"
        echo "  Windows: see https://github.com/DeusData/codebase-memory-mcp (install.ps1 + Unblock-File)"
        echo "  Or: node node_modules/@tron/claude-config/scripts/lib/ensure-codebase-memory.js"
        ;;
    esac
  done
fi

exit 0
