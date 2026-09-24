# Changelog

All notable workflow changes are recorded here. Versions follow Semantic Versioning for the published skill package.

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
