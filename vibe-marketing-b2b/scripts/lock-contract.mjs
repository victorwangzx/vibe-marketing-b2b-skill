#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
const contractPath = resolve(valueAfter('--contract') ?? 'production-contract.json');
const approvedBy = valueAfter('--approved-by');
const note = valueAfter('--note');
if (!approvedBy || !note) {
  console.error('Usage: lock-contract.mjs --contract <path> --approved-by <name> --note <approval record>');
  process.exit(2);
}
const bytes = readFileSync(contractPath);
const contract = JSON.parse(bytes.toString('utf8'));
const lockPath = resolve(dirname(contractPath), 'production-contract.lock.json');
const lock = {
  schemaVersion: 1,
  contractSha256: createHash('sha256').update(bytes).digest('hex'),
  approvedAt: new Date().toISOString(),
  approvedBy,
  approvedTypography: {
    titlePx: contract.typography.titlePx,
    bodyPx: contract.typography.bodyPx,
    notePx: contract.typography.notePx,
  },
  note,
};
writeFileSync(lockPath, `${JSON.stringify(lock, null, 2)}\n`);
console.log(`Locked ${contractPath}`);
console.log(`Lock: ${lockPath}`);
console.log(`SHA256: ${lock.contractSha256}`);
