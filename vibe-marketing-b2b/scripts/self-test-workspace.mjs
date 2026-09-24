#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {existsSync, mkdtempSync, readFileSync, rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const skillScripts = dirname(fileURLToPath(import.meta.url));
const initializer = resolve(skillScripts, 'init-workspace.mjs');
const tempRoot = mkdtempSync(resolve(tmpdir(), 'vibe-b2b-workspace-test-'));
const projectRoot = resolve(tempRoot, 'demo-project');
const hash = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');

try {
  const first = spawnSync(process.execPath, [initializer, '--root', projectRoot, '--project-id', 'demo-project'], {encoding: 'utf8'});
  if (first.status !== 0) throw new Error(first.stderr || 'first initializer run failed');
  const contractPath = resolve(projectRoot, 'source/remotion/production-contract.json');
  const before = hash(contractPath);
  const second = spawnSync(process.execPath, [initializer, '--root', projectRoot, '--project-id', 'demo-project'], {encoding: 'utf8'});
  if (second.status !== 0) throw new Error(second.stderr || 'second initializer run failed');
  const after = hash(contractPath);
  const secondResult = JSON.parse(second.stdout);
  const requiredPaths = [
    'assets/audio',
    'source/remotion/public',
    'video_design',
    'renders/review',
    'final',
    'qa/production-gate',
    'qa/lipsync',
    'notes/workspace-manifest.json',
  ];
  for (const path of requiredPaths) {
    if (!existsSync(resolve(projectRoot, path))) throw new Error(`missing initialized path: ${path}`);
  }
  if (before !== after) throw new Error('second run changed the production contract');
  if (secondResult.createdFiles.length || secondResult.createdDirectories.length) throw new Error('second run was not idempotent');
  console.log('PASS workspace layout and idempotency');
} finally {
  rmSync(tempRoot, {recursive: true, force: true});
}
