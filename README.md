# vibe-marketing-b2b skill

Codex skill for B2B vibe marketing content production, especially education/training institution cooperation content around 科创赛考, AI智绘教室, and new product-line growth.

## What it produces

- B2B opportunity diagnosis and target-institution fit.
- Content matrix and single-topic planning.
- Xiaohongshu/Douyin cover strategy.
- Editable short-video design draft before production.
- Final package: rendered video, first-frame cover, editor's note, and 5 related hot tags.

## Install

Copy the skill folder into a Codex-compatible skills directory:

```bash
mkdir -p ~/.codex/skills
cp -R vibe-marketing-b2b ~/.codex/skills/
```

Then use it by mentioning `vibe-marketing-b2b` or asking for B2B vibe marketing content.

## Production Dependencies

Strategy, copy, and design drafts do not require media dependencies.

Full video production requires a local video toolchain. See:

```text
vibe-marketing-b2b/references/dependencies.md
```

Important production assumptions:

- Remotion is the default renderer for B2B short videos.
- Kokoro local TTS is the default Chinese voiceover option.
- Mixed English terms should be handled in the video design draft before synthesis.
- Commercial use depends on the licenses of Remotion, Kokoro, fonts, music, and all media assets.

## Workflow

The core workflow is:

1. Structure the user's topic input.
2. Skip discovery steps that are already clear.
3. Diagnose B2B fit, pain, timing, and lead quality.
4. Draft the title, editor's note, and 5 related hot tags.
5. Design the cover as the video's first frame.
6. Create an editable Markdown short-video design draft.
7. Wait for draft confirmation.
8. Confirm voiceover terminology.
9. Render the video.
10. QA the video, first frame, copy, tags, and files.

Do not render video before the design draft is confirmed unless the user explicitly asks to skip that step.
