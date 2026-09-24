#!/usr/bin/env node
'use strict';

const { validateBodyFile } = require('./pr-template-validate.cjs');

const file = process.argv[2];
if (!file) {
  process.stderr.write('Usage: node validate-pr-body.cjs <path-to-body-file>\n');
  process.exit(2);
}

const result = validateBodyFile(file);
if (!result.ok) {
  process.stderr.write(`${result.reason}\n`);
  process.exit(1);
}

process.stdout.write('PR body OK — all 5 PT-BR sections present, no forbidden English headers.\n');
process.exit(0);
