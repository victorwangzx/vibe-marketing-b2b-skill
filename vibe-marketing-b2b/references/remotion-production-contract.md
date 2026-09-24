# Remotion Production Contract Gate

Use this gate for every final Remotion assembly produced under this skill. The authoritative implementation ships with the skill:

- `scripts/validate-production-contract.mjs`
- `scripts/audit-render.mjs`
- `scripts/lock-contract.mjs`
- `scripts/self-test.mjs`

In the standard personal installation these resolve under `$CODEX_HOME/skills/vibe-marketing-b2b/` or `$HOME/.codex/skills/vibe-marketing-b2b/`. A managed workspace may provide compatibility links to the same scripts, but the installed skill remains authoritative.

## Required project files

Each Remotion project must contain:

- `production-contract.json`: canvas, typography, panel geometry, text, timing, narration checksum, punctuation pauses, shots, visible-speaker assets, renderer settings, and post-render thresholds.
- `production-contract.lock.json`: checksum and approved typography baseline for the exact approved contract.
- A narration timing manifest and immutable narration WAV.
- A visible-speaker review record for every readable narrator mouth.

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

The preflight must fail on contract drift, font drift, text overflow, excessive line count, orphan final lines, prohibited punctuation at line start, sentence-pause violations, narration or source checksum mismatch, Remotion camera transforms, timeline gaps, or unapproved visible-speaker clips.

The post-render audit must verify the same locked contract plus canvas, fps, duration, video/audio/container start times, full decode, loudness, true peak, and isolated single-frame flashes.

## Lip-sync evidence

Audio equality and zero timeline offset are necessary but not sufficient. Automated checks can prove that the H3 lock slice and delivered master are identical; they cannot prove that generated visemes look correct. A visible-speaker proof clip therefore needs normal-speed human review before full rendering. “Continuous mouth movement” is not a valid approval criterion.

## Regression test

Run the shared self-test when the validator changes. It must demonstrate one passing contract and deliberate failures for typography drift, orphan lines, short sentence pauses, and audio checksum drift.
