#!/usr/bin/env node
import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {existsSync, readFileSync, writeFileSync, mkdirSync} from 'node:fs';
import {homedir} from 'node:os';
import {dirname, join, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index === -1 ? fallback : args[index + 1];
};

const contractPath = resolve(valueAfter('--contract', 'production-contract.json'));
const projectRoot = resolve(valueAfter('--project-root', dirname(contractPath)));
const lockPath = resolve(projectRoot, valueAfter('--lock', 'production-contract.lock.json'));
const reportPath = resolve(
  projectRoot,
  valueAfter('--report', '../../qa/production-gate/preflight-production.json'),
);
const contract = JSON.parse(readFileSync(contractPath, 'utf8'));
const errors = [];
const warnings = [];
const checks = [];

const pass = (name, details = '') => checks.push({name, status: 'pass', details});
const fail = (name, details) => {
  checks.push({name, status: 'fail', details});
  errors.push(`${name}: ${details}`);
};

const filePath = (relativePath) => resolve(projectRoot, relativePath);
const sha256 = (path) => createHash('sha256').update(readFileSync(path)).digest('hex');
const checkHash = (name, relativePath, expected) => {
  try {
    const actual = sha256(filePath(relativePath));
    actual === expected
      ? pass(name, `${relativePath} ${actual}`)
      : fail(name, `${relativePath} checksum ${actual} != ${expected}`);
  } catch (error) {
    fail(name, `${relativePath}: ${error.message}`);
  }
};

try {
  const lock = JSON.parse(readFileSync(lockPath, 'utf8'));
  const actualContractHash = sha256(contractPath);
  actualContractHash === lock.contractSha256
    ? pass('contract-lock', `${actualContractHash} approved ${lock.approvedAt}`)
    : fail('contract-lock', `contract checksum ${actualContractHash} != approved ${lock.contractSha256}`);
  const lockedTypography = lock.approvedTypography ?? {};
  for (const token of ['titlePx', 'bodyPx', 'notePx']) {
    contract.typography[token] === lockedTypography[token]
      ? pass('locked-typography', `${token}=${contract.typography[token]}px`)
      : fail('locked-typography', `${token}=${contract.typography[token]}px != approved ${lockedTypography[token]}px`);
  }
} catch (error) {
  fail('contract-lock', error.message);
}

if (contract.schemaVersion !== 1) fail('contract-schema', 'schemaVersion must be 1');
else pass('contract-schema', `v${contract.contractVersion}`);

for (const [fontName, font] of Object.entries(contract.typography?.fonts ?? {})) {
  checkHash(`font-${fontName}`, font.file, font.sha256);
}
checkHash('narration-master', contract.audio.narrationFile, contract.audio.narrationSha256);

const timingPath = filePath(contract.audio.timingManifest);
try {
  const timing = JSON.parse(readFileSync(timingPath, 'utf8'));
  const target = contract.audio.sentenceEndPauseSeconds;
  const tolerance = contract.audio.sentenceEndToleranceSeconds;
  const marks = new Set(contract.audio.sentenceEndMarks);
  let measured = 0;
  for (const sentence of timing.sentences ?? []) {
    if (!marks.has(sentence.punctuation)) continue;
    measured += 1;
    const declared = Number(sentence.pause_seconds);
    const timeline = Number(sentence.next_sentence_start) - Number(sentence.output_end);
    if (!sentence.text?.endsWith(sentence.punctuation)) {
      fail('sentence-punctuation', `${sentence.id} text does not end with ${sentence.punctuation}`);
    }
    for (const [kind, duration] of [['declared', declared], ['timeline', timeline]]) {
      if (!Number.isFinite(duration) || Math.abs(duration - target) > tolerance) {
        fail('sentence-pause', `${sentence.id} ${kind}=${duration}s outside ${target}±${tolerance}s`);
      }
    }
  }
  measured > 0 ? pass('sentence-pauses', `${measured} boundaries at ${target}s ±${tolerance}s`) : fail('sentence-pauses', 'no sentence boundaries found');
} catch (error) {
  fail('sentence-pauses', error.message);
}

const assertContinuous = (name, rows, expectedStart, expectedEnd) => {
  const sorted = [...rows].sort((a, b) => a.start - b.start);
  let cursor = expectedStart;
  for (const row of sorted) {
    if (row.start !== cursor) fail(name, `${row.id} starts ${row.start}, expected ${cursor}`);
    if (row.end <= row.start) fail(name, `${row.id} has invalid range ${row.start}-${row.end}`);
    cursor = row.end;
  }
  cursor === expectedEnd ? pass(name, `${sorted.length} contiguous ranges ${expectedStart}-${expectedEnd}`) : fail(name, `ends ${cursor}, expected ${expectedEnd}`);
};

assertContinuous('shot-timeline', contract.shots, 0, contract.liveClip.start);
assertContinuous('caption-timeline', contract.captions, 0, contract.audio.durationFrames);

if (contract.camera?.fixed && contract.camera?.forbidRemotionTransforms) {
  const sourceFiles = ['src/Video.tsx', 'src/style.css'];
  for (const sourceFile of sourceFiles) {
    const source = readFileSync(filePath(sourceFile), 'utf8');
    const prohibited = sourceFile.endsWith('.css') ? /\btransform\s*:/ : /\btransform\s*:/;
    prohibited.test(source)
      ? fail('fixed-camera-remotion', `${sourceFile} contains a transform declaration`)
      : pass('fixed-camera-remotion', `${sourceFile} contains no transform declaration`);
  }
}

const bindingRequirements = [
  ['src/contract.ts', /import rawContract from '\.\.\/production-contract\.json'/, 'imports the production contract'],
  ['src/Root.tsx', /durationInFrames=\{contract\.canvas\.durationInFrames\}/, 'composition duration comes from the contract'],
  ['src/Video.tsx', /contract\.captions\.find/, 'captions come from the contract'],
  ['src/Video.tsx', /contract\.infos\.find/, 'policy panels come from the contract'],
  ['src/Video.tsx', /style=\{contractStyle\}/, 'contract CSS variables are mounted'],
  ['src/style.css', /\.caption span\s*\{[\s\S]*?font-size:\s*var\(--body-size\)/, 'caption uses the body-size token'],
  ['src/style.css', /\.infoPolicy\s*\{[\s\S]*?font-size:\s*var\(--body-size\)/, 'policy copy uses the body-size token'],
  ['src/style.css', /\.coverTitleNote\s*\{[\s\S]*?font-size:\s*var\(--note-size\)/, 'remarks use the note-size token'],
  ['src/style.css', /\.caption span\s*\{[\s\S]*?max-width:\s*var\(--caption-outer-width\)/, 'caption width comes from the contract'],
];
for (const [sourceFile, pattern, description] of bindingRequirements) {
  const source = readFileSync(filePath(sourceFile), 'utf8');
  pattern.test(source) ? pass('contract-binding', `${sourceFile}: ${description}`) : fail('contract-binding', `${sourceFile}: missing binding: ${description}`);
}

const expectedLayoutWidths = {
  'cover-main': contract.layout.coverPanelWidthPx - 2 * contract.layout.coverPanelPaddingXPx,
  'cover-note': contract.layout.coverPanelWidthPx - 2 * contract.layout.coverPanelPaddingXPx,
  captions: contract.layout.captionOuterWidthPx - 2 * contract.layout.captionPaddingXPx,
  'info-policy': contract.canvas.width - 2 * contract.layout.infoPanelSidePx - 2 * contract.layout.infoPanelPaddingXPx,
  'live-boundary': contract.canvas.width - 2 * contract.layout.liveBoundarySidePx - 2 * contract.layout.liveBoundaryPaddingXPx,
};
for (const group of contract.layoutChecks) {
  const expected = expectedLayoutWidths[group.id];
  if (expected !== undefined && group.widthPx !== expected) {
    fail('layout-width-binding', `${group.id} width ${group.widthPx}px != contract-derived ${expected}px`);
  }
}
if (!errors.some((error) => error.startsWith('layout-width-binding'))) pass('layout-width-binding', 'measured widths match contract-derived panel content widths');

const getSourceItems = (source) => {
  if (source === 'cover.main') return [{id: 'cover-main', text: contract.cover.main}];
  if (source === 'cover.note') return [{id: 'cover-note', text: contract.cover.note}];
  if (source === 'captions') return contract.captions.map(({id, text}) => ({id, text}));
  if (source === 'infos.policy') return contract.infos.map(({id, policy}) => ({id, text: policy}));
  if (source === 'liveClip.label') return [{id: 'live-label', text: contract.liveClip.label}];
  if (source === 'liveClip.boundary') return [{id: 'live-boundary', text: contract.liveClip.boundary}];
  throw new Error(`Unsupported layout source: ${source}`);
};

const auditLayout = async () => {
  const toolRequire = createRequire(import.meta.url);
  const projectRequire = createRequire(resolve(projectRoot, 'package.json'));
  const playwrightCandidates = [
    process.env.CODEX_PLAYWRIGHT_ROOT,
    'playwright',
    join(homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'playwright'),
  ].filter(Boolean);
  let playwright;
  for (const candidate of playwrightCandidates) {
    try {
      playwright = candidate === 'playwright' ? projectRequire(candidate) : toolRequire(candidate);
      break;
    } catch {
      // Try the next configured or bundled runtime.
    }
  }
  if (!playwright) throw new Error('Playwright is unavailable. Install it in the project or set CODEX_PLAYWRIGHT_ROOT.');
  const {chromium} = playwright;
  const executableCandidates = [
    process.env.CHROME_EXECUTABLE,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    chromium.executablePath?.(),
  ].filter(Boolean);
  const executablePath = executableCandidates.find((candidate) => existsSync(candidate));
  const browser = await chromium.launch({headless: true, ...(executablePath ? {executablePath} : {})});
  try {
    const page = await browser.newPage({viewport: {width: contract.canvas.width, height: contract.canvas.height}});
    const fontCss = Object.values(contract.typography.fonts).map((font) => {
      const encoded = readFileSync(filePath(font.file)).toString('base64');
      return `@font-face{font-family:'${font.family}';src:url(data:font/otf;base64,${encoded}) format('opentype');font-weight:${font === contract.typography.fonts.display ? 700 : font === contract.typography.fonts.bodyMedium ? 600 : 400};}`;
    }).join('\n');
    await page.setContent(`<style>${fontCss}*{box-sizing:border-box}body{margin:0}</style><main id="root"></main>`);
    await page.evaluate(async (fonts) => {
      await Promise.all(fonts.map(({family, weight}) => document.fonts.load(`${weight} 60px '${family}'`, '基础教育')));
      await document.fonts.ready;
    }, [
      {family: contract.typography.fonts.display.family, weight: 700},
      {family: contract.typography.fonts.bodyRegular.family, weight: 400},
      {family: contract.typography.fonts.bodyMedium.family, weight: 600},
    ]);

    const results = [];
    for (const group of contract.layoutChecks) {
      const font = contract.typography.fonts[group.font];
      const fontSize = contract.typography[group.fontSizeToken];
      for (const item of getSourceItems(group.source)) {
        const result = await page.evaluate(({item, group, font, fontSize, lineHeight, letterSpacing}) => {
          const root = document.getElementById('root');
          root.innerHTML = '';
          const element = document.createElement('div');
          element.textContent = item.text;
          Object.assign(element.style, {
            width: `${group.widthPx}px`,
            fontFamily: `'${font.family}'`,
            fontSize: `${fontSize}px`,
            fontWeight: String(group.fontWeight),
            lineHeight: String(lineHeight),
            letterSpacing: `${letterSpacing}px`,
            whiteSpace: 'pre-line',
            wordBreak: 'normal',
            lineBreak: 'strict',
          });
          root.appendChild(element);
          const node = element.firstChild;
          const lines = [];
          for (let index = 0; index < node.length; index += 1) {
            const character = node.textContent[index];
            if (character === '\n' || character === '\r') continue;
            const range = document.createRange();
            range.setStart(node, index);
            range.setEnd(node, index + 1);
            const rect = range.getBoundingClientRect();
            let line = lines.find((candidate) => Math.abs(candidate.top - rect.top) < 2);
            if (!line) {
              line = {top: rect.top, text: ''};
              lines.push(line);
            }
            line.text += character;
          }
          lines.sort((a, b) => a.top - b.top);
          const computed = getComputedStyle(element);
          return {
            id: item.id,
            text: item.text,
            lines: lines.map((line) => line.text.trim()),
            fontSizePx: Number.parseFloat(computed.fontSize),
            fontLoaded: document.fonts.check(`${group.fontWeight} ${fontSize}px '${font.family}'`),
            overflow: element.scrollWidth > element.clientWidth + 1,
          };
        }, {
          item,
          group,
          font,
          fontSize,
          lineHeight: group.fontSizeToken === 'notePx' ? contract.typography.noteLineHeight : contract.typography.bodyLineHeight,
          letterSpacing: contract.textRules.letterSpacingPx,
        });
        results.push({...result, groupId: group.id, maxLines: group.maxLines, expectedFontSize: fontSize});
      }
    }
    return results;
  } finally {
    await browser.close();
  }
};

let layoutResults = [];
try {
  layoutResults = await auditLayout();
  const prohibitedStart = new Set(Array.from(contract.textRules.prohibitedLineStart));
  for (const result of layoutResults) {
    if (!result.fontLoaded) fail('layout-font', `${result.id} font did not load`);
    if (result.fontSizePx !== result.expectedFontSize) fail('layout-font-size', `${result.id} ${result.fontSizePx}px != ${result.expectedFontSize}px`);
    if (result.lines.length > result.maxLines) fail('layout-line-count', `${result.id} has ${result.lines.length} lines: ${JSON.stringify(result.lines)}`);
    for (const line of result.lines) {
      if (prohibitedStart.has(Array.from(line)[0])) fail('layout-punctuation', `${result.id} begins a line with ${Array.from(line)[0]}: ${JSON.stringify(result.lines)}`);
    }
    const last = result.lines.at(-1) ?? '';
    const meaningful = Array.from(last).filter((character) => !/[\s，。？！；：、）》】”’]/u.test(character));
    if (meaningful.length < contract.textRules.minLastLineGlyphs) {
      fail('layout-orphan', `${result.id} orphan last line: ${JSON.stringify(result.lines)}`);
    }
    if (result.overflow) fail('layout-overflow', `${result.id} overflows width`);
  }
  if (!errors.some((error) => error.startsWith('layout-'))) pass('layout', `${layoutResults.length} rendered text blocks passed browser line-box QA`);
} catch (error) {
  fail('layout-runtime', error.stack ?? error.message);
}

const parsePcm16Wav = (relativePath) => {
  const buffer = readFileSync(filePath(relativePath));
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WAVE') throw new Error(`${relativePath} is not RIFF/WAVE`);
  let offset = 12;
  let sampleRate;
  let channels;
  let bitsPerSample;
  let pcm;
  while (offset + 8 <= buffer.length) {
    const id = buffer.toString('ascii', offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const start = offset + 8;
    if (id === 'fmt ') {
      channels = buffer.readUInt16LE(start + 2);
      sampleRate = buffer.readUInt32LE(start + 4);
      bitsPerSample = buffer.readUInt16LE(start + 14);
    } else if (id === 'data') {
      pcm = buffer.subarray(start, start + size);
    }
    offset = start + size + (size % 2);
  }
  if (!pcm || !sampleRate || channels !== 1 || bitsPerSample !== 16) throw new Error(`${relativePath} must be mono PCM16 WAV`);
  return {pcm, sampleRate};
};

for (const speaker of contract.visibleSpeakers ?? []) {
  checkHash(`speaker-video-${speaker.id}`, speaker.videoFile, speaker.videoSha256);
  checkHash(`speaker-lock-${speaker.id}`, speaker.lockAudioFile, speaker.lockAudioSha256);
  try {
    const master = parsePcm16Wav(contract.audio.narrationFile);
    const lock = parsePcm16Wav(speaker.lockAudioFile);
    if (master.sampleRate !== lock.sampleRate) fail('speaker-audio-authority', `${speaker.id} sample rates differ`);
    const bytesPerSample = 2;
    const start = Math.round(speaker.masterStartSeconds * master.sampleRate) * bytesPerSample;
    const length = Math.round(speaker.visibleEndSeconds * master.sampleRate) * bytesPerSample;
    const identical = master.pcm.subarray(start, start + length).equals(lock.pcm.subarray(0, length));
    identical ? pass('speaker-audio-authority', `${speaker.id} visible interval is sample-identical`) : fail('speaker-audio-authority', `${speaker.id} lock differs from final master in visible interval`);
  } catch (error) {
    fail('speaker-audio-authority', `${speaker.id}: ${error.message}`);
  }
  if (Math.abs(speaker.timelineOffsetFrames ?? 0) > speaker.maxTimelineOffsetFrames) {
    fail('speaker-timeline-offset', `${speaker.id} offset ${speaker.timelineOffsetFrames} exceeds ${speaker.maxTimelineOffsetFrames}`);
  } else {
    pass('speaker-timeline-offset', `${speaker.id} offset ${speaker.timelineOffsetFrames ?? 0} frames`);
  }
  if (speaker.humanReview?.status !== 'approved') {
    fail('speaker-human-review', `${speaker.id}: ${speaker.humanReview?.reason ?? 'approval missing'}`);
  } else {
    pass('speaker-human-review', `${speaker.id} approved with ${speaker.humanReview.evidenceFile}`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  contractPath,
  lockPath,
  projectRoot,
  passed: errors.length === 0,
  errors,
  warnings,
  checks,
  layoutResults,
};
mkdirSync(dirname(reportPath), {recursive: true});
writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);

if (errors.length) {
  console.error(`Production preflight FAILED (${errors.length} issue${errors.length === 1 ? '' : 's'})`);
  for (const error of errors) console.error(`- ${error}`);
  console.error(`Report: ${reportPath}`);
  process.exit(1);
}

console.log(`Production preflight PASSED (${checks.length} checks)`);
console.log(`Report: ${reportPath}`);
