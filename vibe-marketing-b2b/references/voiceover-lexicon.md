# Voiceover Copy And Pronunciation Lexicon

Use this reference before synthesizing Chinese narration with Kokoro, H3, or another speech engine. Its purpose is to keep audience-facing wording intact while producing a separate, natural, tested voiceover line.

## Two Authoritative Texts

Maintain two explicit fields whenever the source copy contains English, acronyms, brands, technical terms, polyphonic Chinese, or written-language phrasing:

- `display_text`: the approved wording shown in captions, titles, posts, or slides. Preserve it unless the user asks for a copy change.
- `voiceover_text`: the production-ready spoken wording sent to the speech engine. It may use a semantic Chinese replacement, expanded abbreviation, tested spelling, or punctuation optimized for speech, but it must preserve the original meaning.

Do not send raw user copy directly to TTS merely because it is grammatically correct. First rewrite it for natural speech: remove written-language stiffness, shorten nested clauses, add meaningful pauses, and resolve every mixed-language term.

## Decision Order For English And Acronyms

For each term, choose the first applicable option:

1. Use a natural Chinese semantic replacement when the English spelling is not itself important to the listener.
2. Preserve and test standard English pronunciation when the product, brand, command, or technical name must be heard exactly.
3. Use letter-by-letter pronunciation only when the individual letters matter, such as a file format or an acronym the audience recognizes by spelling.
4. If none has been tested for the selected engine and voice, stop before full synthesis and create a short term-audition clip.

Never invent Chinese-character homophones such as “诶爱” to force an English acronym. Do not assume a replacement tested with one engine or voice is valid for another.

## Current Preferred Replacements

These are semantic defaults, not permission to change visible copy. `Approved` means acceptable as voiceover wording; it does not prove that every engine pronounces the English form correctly.

| Source term or context | Keep on screen | Preferred voiceover wording | Use the English form only when | Status |
| --- | --- | --- | --- | --- |
| Semantic `AI` | AI | 人工智能 | The letters are part of an approved brand name | Approved |
| `AIGC` as a field or learning topic | AIGC | 人工智能内容创作 | The lesson specifically teaches the acronym or industry terminology | Approved semantic replacement |
| `AIGC` in a technical definition | AIGC | 生成式人工智能内容 | The distinction from other AI categories matters | Approved semantic replacement |
| `Skill` in a Codex/agent workflow | Skill | 智能体技能 | The UI label or command name itself is being taught | Approved semantic replacement |
| Generic `skill` | Skill or 技能 | 技能 | The English word is the teaching object | Approved |
| `HTML课件` for ordinary teachers | HTML课件 | 网页课件 | The lesson is specifically about HTML source code or file format | Approved semantic replacement |
| `HTML` as a technical format | HTML | H-T-M-L | The letters themselves must be identified | Requires engine-specific audition |
| `PPT` as ordinary teaching material | PPT | 演示文稿 or 幻灯片 | The file format or UI label matters | Approved semantic replacement |
| `PPT` as a file/UI label | PPT | P-P-T | The literal file type matters | Requires engine-specific audition |
| `STEM` | STEM | 科创融合课程 | The acronym itself is the topic | Approved |
| `PBL` | PBL | 项目化学习 | The acronym itself is the topic | Approved |
| `GPT` as a semantic category | GPT | 生成式人工智能工具 | A specific product/model name must be preserved | Approved semantic replacement |

When two approved Chinese alternatives exist, choose the shortest wording that preserves the intended meaning and sounds natural in the full sentence.

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

Resolve polyphonic Chinese from sentence meaning and record only necessary overrides. Do not change the publishable term solely to work around a speech-engine error.

## Required Pre-Synthesis Gate

1. Preserve the approved source/display copy.
2. Draft a separate conversational `voiceover_text`.
3. Extract every English term, acronym, product name, number, date, and polyphonic Chinese word.
4. Apply an approved entry from this lexicon only when its meaning matches the current context.
5. Create a short audition for every unresolved or engine-specific item.
6. Listen to the audition; transcript or ASR checks alone do not prove pronunciation quality.
7. Obtain user confirmation when the semantic replacement changes what the audience hears materially.
8. Synthesize the full line only after the ledger is resolved.
9. Listen to the full line for pronunciation, cadence, pauses, omissions, repetitions, and unnatural code-switching.
10. Freeze that lossless WAV as the authority master; later video work must adapt to it rather than silently rewriting or regenerating it.

## Example: Written Copy Versus Spoken Copy

Display/source copy:

> 各位老师，有没有打算在国庆假期学一下AIGC，比如研究一下如何用Skill来备课，以及用HTML的课件来授课？

Default conversational voiceover candidate when `Skill` means an agent/Codex skill and `HTML课件` means a browser-based teaching deck:

> 各位老师，国庆假期，有没有计划学一学人工智能内容创作？比如，研究怎样用智能体技能辅助备课，再用网页课件开展教学？

This example illustrates separation of display and voiceover wording. Confirm the contextual meanings before adopting it in another project.

## Maintaining This File

Add or change an entry only after a real pronunciation or delivery test. Record engine-specific behavior in the project ledger rather than turning one voice's workaround into a universal rule. Prefer narrow corrections supported by evidence.
