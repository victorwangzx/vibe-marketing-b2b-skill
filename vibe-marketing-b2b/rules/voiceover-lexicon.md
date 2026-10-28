# Voiceover Copy And Pronunciation Lexicon

Use this reference before synthesizing Chinese narration with Kokoro, H3, or another speech engine. Kokoro must additionally follow the mandatory Chinese-only English-meaning policy below. Its purpose is to keep audience-facing wording intact while producing a separate, natural, tested voiceover line.

## Two Authoritative Texts

Maintain two explicit fields whenever the source copy contains English, acronyms, brands, technical terms, polyphonic Chinese, or written-language phrasing:

- `display_text`: the approved wording shown in captions, titles, posts, or slides. Preserve it unless the user asks for a copy change.
- `voiceover_text`: the production-ready spoken wording sent to the speech engine. It may use an authorized semantic Chinese replacement or punctuation optimized for speech (Kokoro must not use English spelling or letter names), but it must preserve the original meaning.

Do not send raw user copy directly to TTS merely because it is grammatically correct. First rewrite it for natural speech: remove written-language stiffness, shorten nested clauses, add meaningful pauses, and resolve every mixed-language term.

## English processing authority

Before Kokoro synthesis, **must read and follow** [Kokoro英文统一中文释义规则](kokoro-english-policy.md). All English becomes contextual Chinese meaning, including brand acronyms and UI/letter teaching. No English-word, letter-by-letter, hyphenated or Chinese-homophone exception is allowed. The linked policy owns mappings and the actual-input English check; do not recreate an exception column here. Display names remain unchanged.

## Per-Project Pronunciation Ledger

Create a ledger beside the narration request before synthesis:

| Field | Meaning |
| --- | --- |
| `source_term` | Exact term in the approved display/source copy |
| `meaning_in_context` | What the term means in this sentence |
| `display_form` | Audience-facing spelling |
| `voiceover_form` | Exact text sent to TTS |
| `pronunciation_override` | Pinyin or engine-specific override when needed |
| `engine_and_voice` | For example Kokoro `zm_yunyang` |
| `test_status` | untested, auditioned, approved, rejected |
| `evidence` | Path to the audition or approved master |

## Core Information And Emphasis Plan

Before punctuation, breath-group design, timing estimation, or synthesis, analyze what the sentence is actually trying to make the audience remember. Pronunciation correctness is not enough: the spoken line must expose its information hierarchy.

For every continuous speaker turn, record an `emphasisPlan` beside the pronunciation ledger and breath plan:

| Field | Meaning |
| --- | --- |
| `coreMessage` | The single proposition the listener should retain after the line |
| `communicativeIntent` | For example: announce a change, contrast old/new, warn, explain, invite, or conclude |
| `primaryStress` | One or more exact, non-overlapping phrases carrying the new or decisive information |
| `secondaryStress` | Exact phrases that establish scope, actor, object, contrast, or evidence |
| `deemphasized` | Function words or already-known information that should not compete for attention |
| `deliveryNotes` | How the approved voice should realize prominence through pitch movement, duration, energy, and phrasing |
| `auditionStatus` | `planned`, `auditioned`, `approved`, or `rejected`, with evidence when auditioned |

Stress is semantic prominence, not permission to rewrite approved copy, split a protected term, insert arbitrary punctuation, raise every stressed phrase to the same intensity, or manufacture a pause before every keyword. Prefer a natural combination of pitch contour, slight duration expansion, energy and contrast with surrounding words. Punctuation and silence remain governed by `speech-breath-design.md`; if the selected engine cannot reliably control prominence, synthesize a short contextual audition and keep the status pending until it is heard.

Example:

- `display_text`: `上海的AI教师培养，开始给老师配一张“学习路线图”`
- Kokoro `voiceover_text`: `上海的人工智能教师培养，开始给老师配一张“学习路线图”。`
- `coreMessage`: 上海的人工智能教师培养正在从单次培训转向为教师提供持续成长路径。
- `primaryStress`: `开始`、`学习路线图`
- `secondaryStress`: `上海`、`人工智能教师培养`、`老师`
- `deemphasized`: `的`、`给`、`配一张`
- `deliveryNotes`: `上海`轻度立题；`人工智能教师培养`完整连读；`开始`用清晰起势突出变化；全句最强信息落在`学习路线图`，句末稳收，不把引号或重音变成生硬长停顿。

Resolve polyphonic Chinese from sentence meaning and record only necessary overrides. Do not change the publishable term solely to work around a speech-engine error.

## Required Pre-Synthesis Gate

1. Preserve the approved source/display copy.
2. Draft a separate conversational `voiceover_text`.
3. Analyze the core message and communicative intent; complete the `emphasisPlan` with primary, secondary, and de-emphasized phrases.
4. Extract every English term, acronym, product name, number, date, and polyphonic Chinese word.
5. Apply an approved entry from this lexicon only when its meaning matches the current context.
6. Create a short contextual audition for every unresolved pronunciation or emphasis realization.
7. Listen to the audition; transcript, ASR, punctuation, or a written emphasis plan alone does not prove pronunciation or prominence quality.
8. Apply user-mandated standard Chinese-meaning mappings without re-requesting the same authorization; record exact spoken form and evidence in the text lock. Ask only for unresolved meaning or a materially different unapproved rewrite.
9. Synthesize the full line only after the pronunciation ledger and emphasis plan are resolved enough for production.
10. Listen to the full line for pronunciation, intended stress hierarchy, cadence, pauses, omissions, repetitions, and unnatural code-switching.
11. Freeze that lossless WAV as the authority master; later video work must adapt to it rather than silently rewriting or regenerating it.

## Example: Written Copy Versus Spoken Copy

Display/source copy:

> 各位老师，有没有打算在国庆假期学一下AIGC，比如研究一下如何用Skill来备课，以及用HTML的课件来授课？

Default conversational voiceover candidate when `Skill` means an agent/Codex skill and `HTML课件` means a browser-based teaching deck:

> 各位老师，国庆假期，有没有计划学一学人工智能内容创作？比如，研究怎样用智能体技能辅助备课，再用网页课件开展教学？

This example illustrates separation of display and voiceover wording. Confirm the contextual meanings before adopting it in another project.

## Maintaining This File

Record semantic choices separately from real pronunciation or delivery tests; do not claim a Chinese-only policy change itself proves audio quality. Record engine-specific behavior in the project ledger rather than turning one voice's workaround into a universal rule. Prefer narrow corrections supported by evidence.
