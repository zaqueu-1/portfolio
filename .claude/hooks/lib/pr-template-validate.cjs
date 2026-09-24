#!/usr/bin/env node
'use strict';

/**
 * Canonical PR body validation — shared by bypass-check (pr-create-gate) and
 * validate-pr-body CLI. Keep section lists in sync with managed/skills/make-pr/SKILL.md.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_SECTIONS = [
  'Resumo',
  'Principais mudanças',
  'Arquitetura & implementação',
  'Antes → Agora',
  'Roteiro de teste',
];

const FORBIDDEN_SECTIONS = [
  'Summary',
  'Test plan',
  'Test Plan',
  'Main changes',
  'Changes',
  'Description',
  'Architecture',
  'Implementation',
];

const DEFAULT_BODY_FILE = '.claude/.pr-body-draft.md';

function extractBodyFilePath(command) {
  if (!command || typeof command !== 'string') return null;

  const flagMatch = command.match(/--body-file(?:=|\s+)([^\s]+|"[^"]+"|'[^']+')/);
  if (!flagMatch) return null;

  let raw = flagMatch[1].trim();
  if (
    (raw.startsWith('"') && raw.endsWith('"')) ||
    (raw.startsWith("'") && raw.endsWith("'"))
  ) {
    raw = raw.slice(1, -1);
  }
  return raw || null;
}

function hasInlineBodyFlag(command) {
  if (!command) return false;
  const withoutBodyFile = command.replace(/--body-file[^\s]*/g, '');
  return /(?:^|\s)--body(?:\s|=|$)/.test(withoutBodyFile);
}

function validateBodyContent(content) {
  if (!content || !content.trim()) {
    return { ok: false, reason: 'PR body is empty.' };
  }

  const lines = content.split(/\r?\n/);

  for (const forbidden of FORBIDDEN_SECTIONS) {
    const pattern = new RegExp(`^##\\s+${forbidden.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
    if (lines.some((line) => pattern.test(line.trim()))) {
      return {
        ok: false,
        reason: `PR body uses English section "## ${forbidden}". Required template is PT-BR: ${REQUIRED_SECTIONS.map((s) => `## ${s}`).join(', ')}. Copy from .claude/PR-TEMPLATE.md.`,
      };
    }
  }

  for (const section of REQUIRED_SECTIONS) {
    const pattern = new RegExp(`^##\\s+${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
    if (!lines.some((line) => pattern.test(line.trim()))) {
      return {
        ok: false,
        reason: `PR body is missing required section: ## ${section}. All 5 canonical PT-BR sections are mandatory — use placeholder "_N/A — não aplicável a esta mudança_" under any section that does not apply.`,
      };
    }
  }

  return { ok: true };
}

function validateBodyFile(filePath, cwd = process.cwd()) {
  const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(cwd, filePath);
  if (!fs.existsSync(resolved)) {
    return {
      ok: false,
      reason: `PR body file not found: ${filePath}. The /make-pr skill must write the body there before calling gh pr create --body-file.`,
    };
  }
  const content = fs.readFileSync(resolved, 'utf8');
  return validateBodyContent(content);
}

function validateGhPrCreateCommand(command, cwd = process.cwd()) {
  if (!command || !command.includes('gh pr create')) {
    return { ok: false, reason: 'Not a gh pr create command.' };
  }

  if (hasInlineBodyFlag(command)) {
    return {
      ok: false,
      reason:
        'Inline --body is blocked. Write the PT-BR template to .claude/.pr-body-draft.md and call gh pr create --body-file .claude/.pr-body-draft.md (never --body).',
    };
  }

  const bodyFile = extractBodyFilePath(command);
  if (!bodyFile) {
    return {
      ok: false,
      reason:
        'gh pr create must pass --body-file .claude/.pr-body-draft.md. Interactive/editor bodies are not allowed — use the /make-pr skill.',
    };
  }

  const normalized = bodyFile.replace(/\\/g, '/');
  const expected = DEFAULT_BODY_FILE.replace(/\\/g, '/');
  if (normalized !== expected && !normalized.endsWith(`/${expected}`)) {
    return {
      ok: false,
      reason: `gh pr create --body-file must point to ${DEFAULT_BODY_FILE} (got: ${bodyFile}). This ensures the validated draft is what GitHub receives.`,
    };
  }

  return validateBodyFile(bodyFile, cwd);
}

function readHookCommandFromStdin(stdin) {
  try {
    const payload = JSON.parse(stdin);
    return payload?.tool_input?.command || '';
  } catch {
    return '';
  }
}

module.exports = {
  REQUIRED_SECTIONS,
  FORBIDDEN_SECTIONS,
  DEFAULT_BODY_FILE,
  extractBodyFilePath,
  hasInlineBodyFlag,
  validateBodyContent,
  validateBodyFile,
  validateGhPrCreateCommand,
  readHookCommandFromStdin,
};
