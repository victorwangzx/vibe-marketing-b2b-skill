#!/usr/bin/env node
import {createRuleLedger} from './init-rule-execution.mjs';
import {mkdirSync, writeFileSync, existsSync} from 'node:fs';
import {basename, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};
const requestedRoot = valueAfter('--root');
if (!requestedRoot) {
  console.error('Usage: init-workspace.mjs --root <task-folder> [--project-id <id>]');
  process.exit(2);
}

const root = resolve(requestedRoot);
const inferredProjectId = basename(root).replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
const projectId = valueAfter('--project-id') ?? (inferredProjectId || 'vibe-marketing-project');
const directories = [
  'assets/audio',
  'assets/fonts',
  'assets/images',
  'assets/video',
  'assets/source',
  'source/remotion/public',
  'source/remotion/src',
  'video_design',
  'workflows',
  'renders/draft',
  'renders/review',
  'final',
  'qa/production-gate',
  'qa/layout',
  'qa/lipsync',
  'qa/frames',
  'notes',
];

const createdDirectories = [];
for (const directory of directories) {
  const path = resolve(root, directory);
  if (!existsSync(path)) createdDirectories.push(directory);
  mkdirSync(path, {recursive: true});
}

const contract = {
  schemaVersion: 1,
  status: 'draft',
  projectId,
  contractVersion: '0.1.0',
  canvas: {width: 1080, height: 1920, fps: 24, durationInFrames: 0, preRollFrames: 0},
  resolutionPolicy: {minShortSidePx: 1080},
  typography: {
    titlePx: 120,
    bodyPx: 60,
    captionPx: 40,
    notePx: 30,
    sectionTitlePx: 82,
    bodyLineHeight: 1.28,
    captionLineHeight: 1.3,
    noteLineHeight: 1.35,
    fonts: {
      display: {family: 'ShuHei', file: 'public/AlimamaShuHeiTi-Bold.otf', sha256: ''},
      bodyRegular: {family: 'PuHui', file: 'public/AlibabaPuHuiTi-3-55-Regular.otf', sha256: ''},
      bodyMedium: {family: 'PuHui', file: 'public/AlibabaPuHuiTi-3-65-Medium.otf', sha256: ''},
    },
  },
  textRules: {
    captionPolicy: 'single-line-semantic-v1',
    maxCaptionLines: 1,
    minLastLineGlyphs: 2,
    prohibitedLineStart: '，。？！；：、）》】”’',
    letterSpacingPx: 0,
  },
  safeArea: {profile: 'adobe-conventional-80-v1', titleRect: {left:108,top:192,right:972,bottom:1728}, workingRect: {left:132,top:216,right:948,bottom:1704}, platformUiStatus: 'unverified', captionPanelHeightPx:108, captionPanelCenterYPx:1650},
  visualRules: {
    textPanels: {
      background: 'rgba(255,255,255,0.30)',
      backgroundAlpha: 0.3,
      backgroundAlphaTolerance: 0.01,
      borderRadiusPx: 28,
      minPaddingXPx: 48,
      selectors: [],
    },
  },
  layout: {
    coverPanelWidthPx: 560,
    coverPanelPaddingXPx: 48,
    infoPanelSidePx: 132,
    infoPanelPaddingXPx: 48,
    captionOuterWidthPx: 816,
    captionPaddingXPx: 48,
    liveBoundarySidePx: 120,
    liveBoundaryPaddingXPx: 48,
  },
  audio: {
    breathDesignRequired: true,
    breathDesign: {timingProfile: 'segmented-v2', plan: '../../source/audio/breath-plan.json', review: '../../qa/audio/breath-review.json'},
    narrationFile: '',
    narrationSha256: '',
    timingManifest: '',
    durationFrames: 0,
    sentenceEndPauseSeconds: 0.4,
    sentenceEndToleranceSeconds: 0.03,
    sentenceEndMarks: ['。', '？', '！'],
    bgmFile: '',
    bgmVolume: 0.2,
  },
  camera: {fixed: false, forbidRemotionTransforms: false},
  render: {gl: 'swangle', concurrency: 1},
  postRender: {
    durationSeconds: 0,
    durationToleranceSeconds: 0.1,
    startTimeToleranceSeconds: 0.01,
    integratedLoudnessMinLufs: -18.5,
    integratedLoudnessMaxLufs: -16,
    truePeakMaxDbfs: -1,
    maxIsolatedFlashFrames: 0,
    isolatedFlashDelta: 20,
    isolatedFlashReturnDelta: 10,
  },
  cover: {main: '', note: ''},
  shots: [],
  captions: [],
  infos: [],
  liveClip: {start: 0, durationInFrames: 0, file: '', backdrop: '', label: '', boundary: ''},
  layoutChecks: [],
  visibleSpeakers: [],
};

const manifest = {
  schemaVersion: 1,
  projectId,
  createdAt: new Date().toISOString(),
  directories,
  productionContract: 'source/remotion/production-contract.json',
  contractLock: 'source/remotion/production-contract.lock.json',
  finalDirectory: 'final',
  qaDirectory: 'qa',
};

const productionScripts = {
  scripts: {
    'preflight:rules': 'node $HOME/.codex/skills/vibe-marketing-b2b/scripts/validate-rule-execution.mjs --ledger ../../notes/rule-execution.json --stage prepare',
    'qa:rules': 'node $HOME/.codex/skills/vibe-marketing-b2b/scripts/validate-rule-execution.mjs --ledger ../../notes/rule-execution.json --stage delivery --report ../../qa/rule-execution.json',
    preflight: 'node $HOME/.codex/skills/vibe-marketing-b2b/scripts/validate-production-contract.mjs --contract production-contract.json --report ../../qa/production-gate/preflight-production.json',
    render: 'npm run preflight:rules && npm run preflight && remotion render <entry> <composition> ../../final/<output>.mp4 --gl=swangle --concurrency=1 --overwrite',
    'qa:postrender': 'node $HOME/.codex/skills/vibe-marketing-b2b/scripts/audit-render.mjs --contract production-contract.json --input ../../final/<output>.mp4 --report ../../qa/production-gate/postrender.json',
  },
};

const ruleLedger = createRuleLedger(['design','copy','cover','character','scene','audio','edit','render','delivery']);

const files = [
  ['notes/rule-execution.json', ruleLedger],
  ['source/remotion/production-contract.json', contract],
  ['source/remotion/package.production-scripts.json', productionScripts],
  ['notes/workspace-manifest.json', manifest],
];
const createdFiles = [];
const preservedFiles = [];
for (const [relativePath, contents] of files) {
  const path = resolve(root, relativePath);
  if (existsSync(path)) {
    preservedFiles.push(relativePath);
    continue;
  }
  writeFileSync(path, `${JSON.stringify(contents, null, 2)}\n`, {flag: 'wx'});
  createdFiles.push(relativePath);
}

console.log(JSON.stringify({root, projectId, createdDirectories, createdFiles, preservedFiles}, null, 2));
