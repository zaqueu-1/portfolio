#!/usr/bin/env node
'use strict';

/**
 * PreToolUse gate for gh pr create — reads hook JSON from stdin, validates that
 * the actual shell command uses --body-file .claude/.pr-body-draft.md with the
 * canonical PT-BR template (not inline English --body).
 */

const {
  readHookCommandFromStdin,
  validateGhPrCreateCommand,
} = require('./pr-template-validate.cjs');

function block(reason) {
  process.stderr.write(JSON.stringify({ decision: 'block', reason }) + '\n');
  process.exit(1);
}

let stdin = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  stdin += chunk;
});
process.stdin.on('end', () => {
  const command = readHookCommandFromStdin(stdin);
  if (!command) {
    block(
      'Could not read gh pr create command from hook input. Use /make-pr — it writes .claude/.pr-body-draft.md and calls gh pr create --body-file.',
    );
  }

  const result = validateGhPrCreateCommand(command);
  if (!result.ok) {
    block(result.reason);
  }

  process.exit(0);
});
