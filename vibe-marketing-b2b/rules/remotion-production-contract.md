# Remotion Production Contract Gate

Use this gate for every final Remotion assembly produced under this skill. The authoritative implementation ships with the skill:

- `scripts/validate-production-contract.mjs`
- `scripts/audit-render.mjs`
- `scripts/lock-contract.mjs`
- `scripts/self-test.mjs`

In the standard personal installation these resolve under `$CODEX_HOME/skills/vibe-marketing-b2b/` or `$HOME/.codex/skills/vibe-marketing-b2b/`. A managed workspace may provide compatibility links to the same scripts, but the installed skill remains authoritative.

## Required project files

For newly initialized or revised narration, read `speech-breath-design.md`, design the semantic breath plan before synthesis, and include `audio.breathDesignRequired: true` plus plan/review paths and `audio.breathDesign.timingProfile: "segmented-v2"`. The preflight checks the measured/listened review against the exact narration master. Unreviewed auditions and checksum drift block final rendering. Existing sentence-pause and readable-mouth approval rules still apply.

New/revised dialogue captions must follow [single-line caption segmentation](caption-segmentation.md): set `textRules.captionPolicy: "single-line-semantic-v1"`, `maxCaptionLines: 1`, and a caption-source layout check whose `maxLines` is 1. Bind cue splits to measured semantic audio boundaries; actual browser line boxes and exported transitions must pass.

Each Remotion project must contain:

- `production-contract.json`: canvas, typography, panel geometry, text, timing, narration checksum, punctuation pauses, shots, visible-speaker assets, renderer settings, and post-render thresholds.
- `production-contract.lock.json`: checksum and approved typography baseline for the exact approved contract.
- A narration timing manifest and immutable narration WAV.
- A visible-speaker review record for every readable narrator mouth.

For the default `1080 x 1920` vertical format, `production-contract.json` must define separate typography tokens of `titlePx: 120`, `bodyPx: 60`, `captionPx: 40`, and `notePx: 30`. Captions use `captionPx`, never `bodyPx`; captions and notes also carry their own line-height values in the contract.

New video contracts must set `resolutionPolicy.minShortSidePx: 1080` and a final canvas of at least `1080 x 1920` in 9:16 (or `1920 x 1080` in 16:9). Preflight checks the contract canvas; post-render audit checks the probed MP4 dimensions against both the contract and minimum. Existing locked projects without this field are not retroactively invalidated. Any smaller future output needs explicit user approval recorded with the project contract, not an unnoticed 720 preset.

The production contract must also define `visualRules.textPanels`. The default baseline is `rgba(255,255,255,0.30)`, a `24-36 px` Apple-like corner radius, and at least `48 px` horizontal padding on a `1080 x 1920` canvas. List every audience-facing text-panel CSS selector in `visualRules.textPanels.selectors`; each listed selector must bind the shared contract variables for background, radius, and horizontal padding. Hard-coded near-opaque fills or missing radius/padding bindings fail preflight.

Remotion source must import the contract and derive composition settings, text, timeline arrays, media paths, and CSS variables from it. Do not keep a second manually maintained set of caption arrays, font sizes, panel widths, or shot timings in TSX/CSS.

## Approval and locking

1. Translate the approved design draft into `production-contract.json`.
2. Run the preflight and correct contract or layout failures.
3. Lock the contract only after the user has approved the design values. Use `lock-contract.mjs` with the approver and approval note; do not hand-edit the checksum.
4. Keep visible-speaker status `blocked` until the exact proof clip has passed normal-speed human review. Updating it to `approved` changes the contract and therefore requires a new lock with the approval evidence recorded.
5. Any change to narration samples, captions, typography, panel geometry, timeline, camera policy, or visible-speaker asset invalidates the existing lock.

## Required command chain

The project's final `render` script must begin with the shared preflight. Direct `remotion render` is not a final-delivery path.

```json
{
  "scripts": {
    "preflight": "node $HOME/.codex/skills/vibe-marketing-b2b/scripts/validate-production-contract.mjs --contract production-contract.json --report ../../qa/production-gate/preflight-production.json",
    "render": "npm run preflight && remotion render ...",
    "qa:postrender": "node $HOME/.codex/skills/vibe-marketing-b2b/scripts/audit-render.mjs --contract production-contract.json --input <final.mp4> --report ../../qa/production-gate/postrender.json"
  }
}
```

The preflight must fail on contract drift, font drift, text overflow, excessive line count, orphan final lines, prohibited punctuation at line start, text-panel opacity/radius/padding drift, missing panel-selector bindings, sentence-pause violations, narration or source checksum mismatch, Remotion camera transforms, timeline gaps, or unapproved visible-speaker clips.

The post-render audit must verify the same locked contract plus canvas, fps, duration, video/audio/container start times, full decode, loudness, true peak, and isolated single-frame flashes.

## Lip-sync evidence

Audio equality and zero timeline offset are necessary but not sufficient. Automated checks can prove that the H3 lock slice and delivered master are identical; they cannot prove that generated visemes look correct. A visible-speaker proof clip therefore needs normal-speed human review before full rendering. “Continuous mouth movement” is not a valid approval criterion.

## Regression test

Run the shared self-test when the validator changes. It must demonstrate one passing contract and deliberate failures for typography drift, orphan lines, short sentence pauses, and audio checksum drift.

## 当前Skill路径与规则执行门槛

本文中基础Skill绝对路径是基础安装示例。独立H3/Anime包必须使用当前正在执行的Skill目录中随包脚本，不要求额外安装基础Skill；以本Skill的init-workspace实际生成命令为准。禁止将示例路径复制成独立包的外部运行依赖。

新项目的最终render必须串联`preflight:rules`（规则台账prepare检查）→ 适用时`preflight:h3` → 原生产preflight → Remotion。实际导出及原post-render audit完成后，交付前再运行规则台账delivery检查，避免在渲染之前循环要求最终文件。检查失败必须非零退出；缺失台账不准降级成提醒。原命令块展示领域预检，不能作为跳过当前Skill初始化链的依据。

片内文字布局/安全检查必须完整阅读[text-safe-area.md](text-safe-area.md)，按完整文字组（含底板、效果及动效包络）检查；封面裁切坐标不能代替视频安全区。
