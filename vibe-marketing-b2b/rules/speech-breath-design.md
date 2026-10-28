# Speech Breath Design

Use before estimating narration timing, synthesizing any speaker, or designing speaking-mouth footage. Applies to a single narrator and multi-speaker dialogue alike; copy-only work does not need audio artifacts.

## Design before synthesis

Keep approved display text unchanged. A separate synthesis form may use approved pronunciation handling; breath annotations are metadata and are never spoken or shown to the audience.

Write `source/audio/breath-plan.json` with `schemaVersion: 1` and a `turns` array. Each uninterrupted speaker passage records `id`, `role`, `voice`, `displayText`, `voiceoverText`, `emphasisPlan`, `breathGroups`, `protectedTerms`, `boundaries` and `handoff`. Optional `voiceBindings` maps speaker IDs to the already approved voices. A voice change needs its recorded approval. Concatenated group text must equal `voiceoverText`.

Before assigning breath groups, complete the turn's `emphasisPlan` according to `voiceover-lexicon.md`: `coreMessage`, `communicativeIntent`, exact non-overlapping `primaryStress`, `secondaryStress`, `deemphasized`, `deliveryNotes`, and `auditionStatus`. Every stress phrase must occur intact in `voiceoverText`; no phrase may be both primary and secondary. A protected term cannot be split to create emphasis. The plan expresses semantic hierarchy, while this file remains authoritative for silence and boundary timing.

Do not encode stress by automatically adding commas, dashes, spaces, extra TTS requests, or longer pauses. Realize prominence primarily through the selected voice's natural pitch contour, duration, energy and contrast. A written plan, punctuation change or waveform amplitude alone is not proof: listen to a contextual audition and the assembled line at normal speed, checking that the primary information is perceptually strongest without sounding theatrical or fragmented.

## Quantified timing profile: segmented-v2

New or revised narration must use `schemaVersion: 1` and `timingProfile: "segmented-v2"` in the breath plan. These are project production defaults, not a claim of universally optimal human speech. The production initializer binds `audio.breathDesign.timingProfile` to this profile; a standalone build must pass `--profile segmented-v2` to both validator gates. Existing untouched historical plans remain interpretable by the legacy validator path; do not use that compatibility path for new/revised narration.

Each group records exact text and intent. Each boundary records zero-based exclusive `afterChar`, `punctuation`, `type`, `intent`, `targetMs`, `minMs`, `maxMs` and `mouthBehavior`. Use the following strictly separated tiers; ranges must not be broadened into a neighboring tier:

| Kind | Marks/context | type | Target | Accepted measured range |
|---|---|---|---:|---:|
| 语义轻顿 | Unpunctuated planned phrase-group boundary | `semantic` | **40ms** | **30–50ms** |
| 列举短顿 | 顿号 `、` | `enumeration` | **80ms** | **70–90ms** |
| 承接短顿 | 逗号 `，` / `,` | `connect` | **160ms** | **140–180ms** |
| 解释停顿 | 冒号 `：` / `:` | `explain` | **240ms** | **220–260ms** |
| 分句停顿 | 分号 `；` / `;` | `clause` | **320ms** | **300–340ms** |
| 句末长顿 | `。？！` / `.?!` | `sentence` | **400ms** | **370–430ms** |

The target is the intended duration; the range is measurement/production tolerance, not six interchangeable creative options. Sentence-end 400±30ms remains unchanged. No standard zero-gap enumeration, shared comma/colon class or overlapping interval remains in this profile. Purposeful exceptional hesitation requires `cadenceApproval` containing real user approval evidence (nonempty evidence text, not `true`) and explicit intent; do not silently use `rhetorical` to evade these tiers. User approval is only needed for that actual exceptional cadence, not every ordinary punctuation mark.

For unpunctuated grouping, put `punctuation: ""` at the join between two `breathGroups`; `afterChar` is the original-text position. Do not insert spaces, bars or extra commas into the approved visible text or assume TTS parses them. Example: `人工智能｜走进｜真实课堂。` has semantic boundaries after characters 4 and 6, each 40ms, then the sentence boundary after character 11 at 400ms. Protect `人工智能`, `走进` and `真实课堂`; `人工智能走｜进真实课堂` is invalid even if its silence meets a numeric tier.

“Handoff” describes the next speaker/listening action, not another pause tier: record `nextRole` and intent, count the already planned terminal pause once including both files’ edge silence, and do not add an extra turn gap. Total pause is measured from completed final voiced sound to the next voiced onset; do not count a quiet consonant or closure as an arbitrary editable gap. For final end-of-film silence, retain the planned terminal interval in the master.

Protect complete words and grammatical groups from breaks. Conversational lists, short transitions and questions need their own intent; do not mechanically force every comma to the same length. Keep speaker identity and words stable while planning rhythm.

Treat short replies and discourse markers followed by a comma, such as “对，先做……”, as explicit listening checkpoints. Record the intended connective pause and verify an audible separation at normal speed; punctuation in the text or a nominal boundary in the plan is not proof that the two words were separated. If the engine joins them, repair only confirmed silence without changing voiced samples, or re-synthesize the whole turn before freezing the master. Check the resulting mouth closure and next onset in the final speaking shot.

Synthesize one continuous passage for each uninterrupted speaker turn. A breath group, comma, camera cut or subtitle cue never creates a separate TTS request. Retain raw files and compare wording, pronunciation, voice and speed before deciding to regenerate.

## Measure and listen before freezing

Use native phoneme timing or a validated aligner to locate punctuation; verify actual quiet intervals in the waveform. Scan for unexplained pauses inside protected words and unpunctuated groups. Alignment and waveform measurements are evidence, not listening approval.

Adjust only confirmed silence. Log before/after duration, exact sample ranges, timeline/frame positions and retained-sample provenance. Preserve quiet consonants and intentional breathing; uncertainty is a listening or re-synthesis task. Do not globally remove silence, time-stretch words, truncate phonemes or repair awkward pronunciation by cutting quiet regions. Re-synthesize the whole affected speaker turn if the engine mispronounces or restarts it.

Listen to the complete assembled audition at normal speed, checking every planned boundary and unexplained stop, list rhythm, word endings, speaker handoffs, and whether the intended primary/secondary stress hierarchy is actually audible. Record the reviewer and findings honestly; automated silence or loudness analysis is not human listening.

完整试听经确认后，才可冻结母带并进入说话口型制作。

Keep `qa/audio/breath-review.json` with `status`, `planSha256`, `masterSha256`, `sampleRate`, `normalSpeedListeningPassed`, `reviewer`, `voicedSamplesUnchanged`, `silenceOnlyEdits`, `unresolvedUnexpectedPauses` and measured `boundaries`. Every boundary has `turnId`, `afterChar`, `actualMs`, `outputStartSample`, `outputEndSample` and `normalSpeedPass`. The measured sample interval must agree with the reported milliseconds.

An audition remains `audition_pending_review` until accepted. A frozen master requires passing listening, exact hashes, reviewed measured boundaries and no unresolved unexpected pauses. These statuses must never be promoted merely because the audio decodes or has the requested duration.

## Audio and speaking-mouth relationship

All speaking-mouth inputs derive from the same frozen lossless master. Record source checksum, exact sample in/out, speaker, voiced onset/end, silent intervals and subsequent re-entry. A pause needs a resting mouth; the next articulation begins at the actual next voiced onset. Cut only at completed semantic phrases or verified pauses, never inside a protected word or consonant closure.

If breath timing changes after mouth footage exists, freeze a new audio version and regenerate affected speaking intervals. Do not slide or change audio beneath an old speaking mouth. Off-screen visuals can be retimed to the updated master. Apply a renderer's stricter paired silent-frame repair rules where available; never change voiced samples.

## Machine gate

Before synthesis:

```bash
node scripts/validate-dialogue-breath.mjs --profile segmented-v2 --plan /absolute/source/audio/breath-plan.json
```

Before final rendering or speaking-mouth generation:

```bash
node scripts/validate-dialogue-breath.mjs --profile segmented-v2 --plan /absolute/source/audio/breath-plan.json --review /absolute/qa/audio/breath-review.json --master /absolute/assets/audio/dialogue-master.wav
```

Companion production-contract projects set `audio.breathDesignRequired: true`, `audio.breathDesign.timingProfile: "segmented-v2"`, and provide `audio.breathDesign.plan` and `.review` in the production contract. The final production preflight validates them against `audio.narrationFile`. Historical contracts without this new flag remain historical; revised narration must adopt it. Normal-speed mouth review remains an independent requirement.

## Gate limits and evidence

The validator checks profile, punctuation-to-tier assignment, target/range separation, complete punctuation and semantic-group boundaries, protected-word splits, actualMs/sample-interval consistency, source hashes and recorded listening status. It does not independently discover or listen to silence in a WAV. Production must first measure native phoneme/validated alignment plus waveform intervals and record real listening; hand-entered invented actualMs is not evidence. Short semantic “气口” here means an articulatory micro-pause, not an instruction to inhale at every group.

This reference and its self-contained validator are maintained by vibe-marketing-b2b; standalone motion-comic carries identical snapshots. Update and verify both together rather than adding a second timing table to its audio module.
