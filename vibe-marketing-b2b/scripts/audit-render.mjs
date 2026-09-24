#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {existsSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {homedir} from 'node:os';
import {dirname, join, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1];
};
const contractPath = resolve(valueAfter('--contract', 'production-contract.json'));
const projectRoot = dirname(contractPath);
const inputPath = resolve(projectRoot, valueAfter('--input'));
const reportPath = resolve(projectRoot, valueAfter('--report', '../../qa/production-gate/postrender.json'));
const workspaceFfmpeg = join(homedir(), 'Documents', 'Codex', 'tools', 'ffmpeg', 'ffmpeg');
const ffmpeg = process.env.FFMPEG ?? (existsSync(workspaceFfmpeg) ? workspaceFfmpeg : 'ffmpeg');
const ffprobe = process.env.FFPROBE ?? 'ffprobe';
const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
const checks = [];
const errors = [];
const pass = (name, details) => checks.push({name, status: 'pass', details});
const fail = (name, details) => { checks.push({name, status: 'fail', details}); errors.push(`${name}: ${details}`); };
const run = (command, commandArgs, maxBuffer = 64 * 1024 * 1024) => spawnSync(command, commandArgs, {encoding: 'utf8', maxBuffer});

try {
  const lockPath = resolve(projectRoot, 'production-contract.lock.json');
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  const actual = createHash('sha256').update(readFileSync(contractPath)).digest('hex');
  actual === lock.contractSha256 ? pass('contract-lock', actual) : fail('contract-lock', `${actual} != ${lock.contractSha256}`);
} catch (error) {
  fail('contract-lock', error.message);
}

const probeRun = run(ffprobe, ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', inputPath]);
if (probeRun.status !== 0) {
  fail('ffprobe', probeRun.stderr || `exit ${probeRun.status}`);
} else {
  const probe = JSON.parse(probeRun.stdout);
  const video = probe.streams.find((stream) => stream.codec_type === 'video');
  const audio = probe.streams.find((stream) => stream.codec_type === 'audio');
  if (!video || !audio) fail('streams', 'video and audio streams are both required');
  else {
    video.width === contract.canvas.width && video.height === contract.canvas.height
      ? pass('dimensions', `${video.width}x${video.height}`)
      : fail('dimensions', `${video.width}x${video.height} != ${contract.canvas.width}x${contract.canvas.height}`);
    const [num, den] = String(video.r_frame_rate).split('/').map(Number);
    const fps = num / den;
    Math.abs(fps - contract.canvas.fps) < 0.001 ? pass('fps', String(fps)) : fail('fps', `${fps} != ${contract.canvas.fps}`);
    for (const [name, value] of [['video', video.start_time], ['audio', audio.start_time], ['container', probe.format.start_time]]) {
      Math.abs(Number(value)) <= contract.postRender.startTimeToleranceSeconds
        ? pass(`${name}-start`, `${value}s`)
        : fail(`${name}-start`, `${value}s exceeds ±${contract.postRender.startTimeToleranceSeconds}s`);
    }
    const duration = Number(probe.format.duration);
    Math.abs(duration - contract.postRender.durationSeconds) <= contract.postRender.durationToleranceSeconds
      ? pass('duration', `${duration}s`)
      : fail('duration', `${duration}s != ${contract.postRender.durationSeconds}s ±${contract.postRender.durationToleranceSeconds}s`);
  }
}

const decode = run(ffmpeg, ['-v', 'error', '-i', inputPath, '-f', 'null', '-']);
decode.status === 0 ? pass('decode', 'full decode completed') : fail('decode', decode.stderr || `exit ${decode.status}`);

const loudness = run(ffmpeg, ['-hide_banner', '-nostats', '-i', inputPath, '-filter_complex', 'ebur128=peak=true', '-f', 'null', '-']);
const loudnessText = `${loudness.stdout ?? ''}\n${loudness.stderr ?? ''}`;
const summary = loudnessText.slice(loudnessText.lastIndexOf('Summary:'));
const integratedMatch = summary.match(/I:\s*(-?\d+(?:\.\d+)?)\s*LUFS/);
const peakMatch = summary.match(/Peak:\s*(-?\d+(?:\.\d+)?)\s*dBFS/);
if (!integratedMatch || !peakMatch) {
  fail('loudness', 'could not parse EBU R128 summary');
} else {
  const integrated = Number(integratedMatch[1]);
  const peak = Number(peakMatch[1]);
  integrated >= contract.postRender.integratedLoudnessMinLufs && integrated <= contract.postRender.integratedLoudnessMaxLufs
    ? pass('integrated-loudness', `${integrated} LUFS`)
    : fail('integrated-loudness', `${integrated} LUFS outside ${contract.postRender.integratedLoudnessMinLufs}..${contract.postRender.integratedLoudnessMaxLufs}`);
  peak <= contract.postRender.truePeakMaxDbfs
    ? pass('true-peak', `${peak} dBFS`)
    : fail('true-peak', `${peak} dBFS exceeds ${contract.postRender.truePeakMaxDbfs} dBFS`);
}

const signal = run(ffmpeg, ['-v', 'error', '-i', inputPath, '-vf', 'signalstats,metadata=print:file=-', '-an', '-f', 'null', '-']);
if (signal.status !== 0) {
  fail('flash-scan', signal.stderr || `exit ${signal.status}`);
} else {
  const values = [];
  for (const line of signal.stdout.split(/\r?\n/)) {
    const match = line.match(/lavfi\.signalstats\.YAVG=(\d+(?:\.\d+)?)/);
    if (match) values.push(Number(match[1]));
  }
  const isolated = [];
  for (let index = 1; index < values.length - 1; index += 1) {
    const into = values[index] - values[index - 1];
    const out = values[index + 1] - values[index];
    const returned = Math.abs(values[index + 1] - values[index - 1]);
    if (Math.abs(into) >= contract.postRender.isolatedFlashDelta && Math.abs(out) >= contract.postRender.isolatedFlashDelta && into * out < 0 && returned <= contract.postRender.isolatedFlashReturnDelta) {
      isolated.push({frame: index, time: index / contract.canvas.fps, previous: values[index - 1], current: values[index], next: values[index + 1]});
    }
  }
  isolated.length <= contract.postRender.maxIsolatedFlashFrames
    ? pass('flash-scan', `${values.length} frames, ${isolated.length} isolated flashes`)
    : fail('flash-scan', `${isolated.length} isolated flashes: ${JSON.stringify(isolated)}`);
}

const report = {generatedAt: new Date().toISOString(), contractPath, inputPath, passed: errors.length === 0, errors, checks};
mkdirSync(dirname(reportPath), {recursive: true});
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
if (errors.length) {
  console.error(`Post-render audit FAILED (${errors.length} issues)`);
  for (const error of errors) console.error(`- ${error}`);
  console.error(`Report: ${reportPath}`);
  process.exit(1);
}
console.log(`Post-render audit PASSED (${checks.length} checks)`);
console.log(`Report: ${reportPath}`);
