# Workflow Revision History

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
