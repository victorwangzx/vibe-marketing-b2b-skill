# Changelog

All notable workflow changes are recorded here. Versions follow Semantic Versioning for the published skill package.

## [2.1.1] - 2026-09-28

### Fixed

- Previously approved product/evidence clips are now immutable sources: exact file, checksum, time range, aspect ratio, and display scale must be preserved.
- An explicit 80% clip scale now means the complete frame is centered at 80% of canvas width with no crop or local enlargement.
- Clip overlays must avoid Victor's face, mouth, and head silhouette, including at shot boundaries; central placement may overlap hand gestures.

### Compatibility

- No contract-schema change is required. Existing projects should record approved clip identity and placement in their manifest and use whole-frame `contain` presentation.

## [2.1.0] - 2026-09-28

### Added

- Machine-readable text-panel tokens for the default `30% white` fill, `24-36 px` corner radius, and minimum `48 px` horizontal padding.
- Render-blocking checks that every declared text-panel selector binds the shared background, radius, and padding variables.
- Regression tests for near-opaque panels, missing corner radius, and insufficient horizontal padding.

### Changed

- New workspaces begin with compliant text-panel values instead of permissive legacy padding values.
- Visual defaults in the production QA rules are now required contract bindings for Remotion delivery, not prose-only guidance.

### Compatibility

- Existing v2.0.0 projects can migrate by adding `visualRules.textPanels`, exporting the three shared CSS variables, and listing every audience-facing panel selector.
- Strategy, copy, article, and design-draft-only tasks are unchanged.

## [2.0.0] - 2026-09-24

### Added

- Mandatory machine-readable Remotion production contract and approval lock.
- Browser line-box QA using the actual selected fonts.
- Render-blocking checks for typography, overflow, maximum line count, punctuation at line start, and orphan final lines.
- Default 0.40-second sentence-ending pause rule for `。？！`, with ±0.03-second automated tolerance.
- Checksums for narration, fonts, source video, and visible-speaker audio authority.
- Mandatory normal-speed human approval for readable narrator mouth shots.
- Post-render checks for dimensions, frame rate, duration, stream start times, complete decode, loudness, true peak, and isolated single-frame flashes.
- Reusable scripts for locking, preflight validation, post-render audit, and positive/negative regression tests.
- An idempotent workspace initializer with standard folders for assets, Remotion source, design drafts, proof renders, final delivery, and QA evidence.

### Changed

- Remotion implementations must read approved values from the contract instead of maintaining separate TSX/CSS constants.
- The default vertical-video typography baseline is now enforced as title 120 px, body/subtitle 60 px, and note/remark 35 px.
- Long captions must be shortened or split into timed segments; silently shrinking text is no longer accepted.
- Direct `remotion render` without the production gate is no longer a valid final-delivery path.

### Compatibility

- Strategy, copy, article, cover-concept, and design-draft-only tasks remain compatible with v1.x behavior.
- Existing Remotion projects require a production contract, lock, and gated scripts before they qualify as v2.0.0 final deliveries.

## [1.1] - 2026-09-24

- Added dual-cover delivery requirements.
- Strengthened visual-format defaults and Chinese voiceover QA.
