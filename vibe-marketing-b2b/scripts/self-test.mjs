#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {readFileSync, writeFileSync, unlinkSync, existsSync, mkdirSync} from 'node:fs';
import {dirname, resolve} from 'node:path';

const projectRoot = resolve(process.argv[2] ?? process.cwd());
const validator = resolve(dirname(new URL(import.meta.url).pathname), 'validate-production-contract.mjs');
const baseContract = JSON.parse(readFileSync(resolve(projectRoot, 'production-contract.json'), 'utf8'));
const baseTiming = JSON.parse(readFileSync(resolve(projectRoot, baseContract.audio.timingManifest), 'utf8'));
const tempFiles = [];
const results = [];

const hashText = (text) => createHash('sha256').update(text).digest('hex');
const writeJson = (path, value) => {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  writeFileSync(path, text);
  tempFiles.push(path);
  return hashText(text);
};

const runCase = ({name, mutateContract, mutateTiming, expectedExit, expectedText}) => {
  const contract = structuredClone(baseContract);
  contract.visibleSpeakers[0].humanReview.status = 'approved';
  contract.visibleSpeakers[0].humanReview.reason = 'production-gate self-test only';

  if (mutateTiming) {
    const timing = structuredClone(baseTiming);
    mutateTiming(timing);
    const timingName = `.selftest-${name}-timing.json`;
    writeJson(resolve(projectRoot, timingName), timing);
    contract.audio.timingManifest = timingName;
  }
  mutateContract?.(contract);

  const contractName = `.selftest-${name}-contract.json`;
  const lockName = `.selftest-${name}-contract.lock.json`;
  const contractHash = writeJson(resolve(projectRoot, contractName), contract);
  writeJson(resolve(projectRoot, lockName), {
    schemaVersion: 1,
    contractSha256: contractHash,
    approvedAt: 'self-test',
    approvedBy: 'automated-test',
    approvedTypography: {titlePx: 120, bodyPx: 60, notePx: 35},
  });

  const report = resolve(projectRoot, `../../qa/production-gate/self-test-${name}.json`);
  mkdirSync(dirname(report), {recursive: true});
  const run = spawnSync(process.execPath, [validator, '--contract', contractName, '--lock', lockName, '--report', report], {
    cwd: projectRoot,
    encoding: 'utf8',
  });
  const output = `${run.stdout ?? ''}${run.stderr ?? ''}`;
  const passed = run.status === expectedExit && output.includes(expectedText);
  results.push({name, passed, exit: run.status, expectedExit, expectedText, output});
};

try {
  runCase({name: 'pass', expectedExit: 0, expectedText: 'Production preflight PASSED'});
  runCase({
    name: 'font-drift',
    mutateContract: (contract) => { contract.typography.bodyPx = 52; },
    expectedExit: 1,
    expectedText: 'locked-typography',
  });
  runCase({
    name: 'orphan-line',
    mutateContract: (contract) => { contract.captions[1].text = '问？'; },
    expectedExit: 1,
    expectedText: 'layout-orphan',
  });
  runCase({
    name: 'short-pause',
    mutateTiming: (timing) => {
      timing.sentences[0].pause_seconds = 0.08;
      timing.sentences[0].next_sentence_start = timing.sentences[0].output_end + 0.08;
    },
    expectedExit: 1,
    expectedText: 'sentence-pause',
  });
  runCase({
    name: 'audio-hash',
    mutateContract: (contract) => { contract.audio.narrationSha256 = '0'.repeat(64); },
    expectedExit: 1,
    expectedText: 'narration-master',
  });
} finally {
  for (const path of tempFiles) if (existsSync(path)) unlinkSync(path);
}

for (const result of results) {
  console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.name} (exit ${result.exit})`);
  if (!result.passed) console.log(result.output);
}
if (results.some((result) => !result.passed)) process.exit(1);
