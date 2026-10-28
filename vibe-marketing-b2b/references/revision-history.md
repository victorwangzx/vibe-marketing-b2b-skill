# Workflow Revision History

## vibe-marketing-b2b v3.2.0 — 2026-10-28

制作：Victor使用Codex制作

- Added mandatory core-message and sentence-stress analysis before breath planning or synthesis: communicative intent, primary stress, secondary stress, de-emphasized information and delivery notes.
- Extended the breath-plan validator so stress phrases must exist intact in the actual `voiceoverText` and cannot be assigned simultaneously as primary and secondary stress.
- Required contextual normal-speed audition; punctuation, pauses and waveform amplitude alone cannot prove intended prominence.
- Added the Shanghai AI-teacher-training example using the existing Victor/Kokoro `zm_yunyang` binding. No voice, model or renderer change.

## vibe-marketing-b2b v2.4.2 — 2026-10-20 (local-only)

制作：Victor使用Codex制作

- Future rendered video minimum: 1080×1920 vertical or 1920×1080 landscape; lock the canvas before production, probe the actual export and inspect full-size detail. New contracts carry a 1080px short-side gate; existing approved/published work is not retroactively remade. Local ZIP only; no GitHub tag or Release.

## vibe-marketing-b2b v2.2.1 — 2026-10-16 (local-only)

制作：Victor使用Codex制作

- Synchronized anime-derived cover requirements and the explicit full-bleed preference: native independent 9:16/4:3 covers, no automatic cover-title video overlay, typography/subject protection, full-size/feed/crop inspection, scoped readability alternatives, prompt final-folder delivery and recoverable replacement cleanup. Existing approved openings and H3/audio/model/validator behavior are unchanged. Local-only update; no GitHub publication or acceptance is claimed.

## vibe-marketing-b2b v2.2.0 - 2026-10-12

制作：Victor使用Codex制作

- Added semantic breath design before synthesis for narration and dialogue: protected words, connected lists/clauses, sentence endings and shared speaker-handoff pauses.
- Added normal-speed checkpoint for short replies followed by commas; a written comma does not establish an audible separation or matching mouth re-entry.
- Added measured sample intervals, silence-only edit lineage, full audition listening and frozen master hashes; mouth footage follows onset, rest and re-entry from that master.
- Added a breath-plan/review validator and production-contract preflight integration for new projects. Historical contracts remain compatible; revised narration adopts the new fields.
- Clarified incremental `final/` archiving: each checked cover, copy file and video is placed there when ready, with candidate versus approved status kept explicit.
- Kept the public workflow independent of private video engines, server presets and recurring character assets.

## Release maintenance rule

Any workflow version bump must be published as one synchronized release: update the skill metadata, this revision history, the official GitHub repository README and CHANGELOG, a versioned release-notes file, and the matching GitHub tag/Release. Do not describe a version as published while the local skill and public repository differ.

## vibe-marketing-b2b / vibe-marketing-b2b-h3 v2.1.2 — 2026-09-29

- Changed the vertical-video typography baseline to title/body/subtitle-or-caption/note of `120/60/40/30`.
- Made captions a dedicated `captionPx` production-contract token with its own line-height, rather than inheriting `bodyPx`.
- Updated the initializer, lock, preflight binding checks, and regression-test lock fixture so a caption-token mismatch blocks rendering.

## vibe-marketing-b2b / vibe-marketing-b2b-h3 v2.1.1 — 2026-09-28

- Made user-provided and previously approved product/evidence clips immutable by file, checksum, time range, aspect ratio, and display scale.
- Defined an explicit `80%` placement as a centered complete frame occupying exactly 80% of canvas width, with height derived from the original aspect ratio.
- Prohibited `object-fit: cover`, local enlargement, and independent timestamp reselection for approved evidence clips.
- Added Victor face, mouth, and head-silhouette exclusion zones plus first/middle/last and boundary-frame QA; central placement may overlap hand gestures.

## vibe-marketing-b2b / vibe-marketing-b2b-h3 v2.1.0 — 2026-09-28

- Converted the established `30% white`, `24-36 px` rounded-corner, and `48 px` horizontal-padding text-panel baseline from prose into machine-readable production-contract tokens.
- Added render-blocking checks for panel opacity, radius, padding, contract CSS-variable exports, and every declared audience-facing panel selector.
- Updated the workspace initializer so new projects begin with the compliant panel tokens instead of permissive legacy values.
- Added negative regression cases proving that near-opaque panels, missing radius, and insufficient padding fail preflight.
- Reaffirmed the H3 FL2V rule that independent shots use one approved first frame with the last-frame socket disconnected; connecting the same still to both ends is a freeze-inducing failure.

## vibe-marketing-b2b v2.0.0 — 2026-09-24

This is a breaking production-workflow revision for rendered Remotion videos. Strategy, copy-only, article, cover-concept, and design-draft-only tasks remain unchanged.

- Added the mandatory machine-readable Remotion production contract and immutable approval lock.
- Made approved `120/60/35` vertical-video typography a render-blocking baseline; implementation may no longer shrink text silently to fit.
- Added real-font browser line-box checks for overflow, maximum lines, prohibited punctuation at line start, and orphan final lines.
- Added the default `0.40 seconds ±0.03 seconds` sentence-ending pause rule for `。？！`; in-sentence punctuation retains natural timing.
- Added narration, font, source-video, and visible-speaker audio checksum verification.
- Added visible-speaker human lip-sync approval; audio equality or continuous mouth movement alone cannot approve a shot.
- Added fixed/moving-camera policy locking, contiguous timeline checks, deterministic render settings, and post-render checks for start times, decode, loudness, true peak, and isolated flashes.
- Added shared positive and negative regression tests. Deliberate font drift, orphan lines, short pauses, and narration hash drift must fail.
- Added an idempotent local-workspace initializer and standard task-folder layout so installed copies use consistent asset, source, render, final, and QA paths.

## vibe-marketing-b2b-h3 v2.0.0 — 2026-09-24

This revision adopts the same base production contract and adds H3-specific enforcement.

- External-master audio slices must remain sample-identical to the delivered narration across visible-mouth intervals.
- H3 proof shots require normal-speed human viseme review before full rendering.
- Sentence-ending pauses must be normalized before audio-lock generation; changing the master invalidates dependent lip-sync shots.
- Final Remotion assembly must use the base shared gate and post-render audit instead of maintaining a separate H3-only validator.

## Shared implementation

- Contract preflight: `scripts/validate-production-contract.mjs`
- Contract locking: `scripts/lock-contract.mjs`
- Post-render audit: `scripts/audit-render.mjs`
- Regression tests: `scripts/self-test.mjs`
- Workspace initializer: `scripts/init-workspace.mjs`
- Workspace regression test: `scripts/self-test-workspace.mjs`

## v2.2.2 — 2026-10-20

Kokoro英文统一用中文释义，品牌、缩写、界面和字母教学均无例外；屏幕显示不改。新增强制规则入口并清理读音词表、环境、制作QA及设计稿中的冲突路径。作者：Victor使用Codex制作。仅本地更新及打包，未创建Git标签或GitHub Release。

## v2.3.0 — 2026-10-20

新增互不重叠segmented-v2停顿层级、无标点语义分组及profile绑定校验。初始化与生产预检同步，历史未改动合同保持兼容。作者：Victor使用Codex制作。仅本地更新及打包。

## v2.4.0 — 2026-10-20

新增单行字幕与语义时序强制参考、初始化配置及预检约束；超宽按冻结音频语义分段显示，不保留第二行/人为孤字。作者：Victor使用Codex制作。仅本地更新及打包，未发布远程。

## v2.4.1 — 2026-10-20

字幕固定几何与实际字面中心验收；保留无关参数和已批准profile。作者：Victor使用Codex制作。仅本地更新与打包。

## v2.4.3 — 2026-10-20
封面/发布双标题分别撰写、同主题不同表达，新增实际配对验收，既有批准冲突按决策锁处理。Victor使用Codex制作。仅本地更新。

## v3.0.0 — 2026-10-20
作者：Victor使用Codex制作。强制rules/与辅助references/分离；统一依赖索引、来源与执行台账校验，保持已有审批边界。本地重整，未远程发布。

## v3.1.0 — 2026-10-20
Victor使用Codex制作。新增来源可核验的视频文字安全区规范，区分Adobe传统框、社交平台UI及封面裁切，完整边界包含底色和动效。新初始化侧边距132、字幕最大组合宽816；平台UI未验证保持未验证。仅本地更新。
