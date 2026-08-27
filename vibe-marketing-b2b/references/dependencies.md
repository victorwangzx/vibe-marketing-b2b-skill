# Dependencies and Environment Setup

Use this reference when installing or preparing this skill for another user, machine, or tool environment. This skill can draft strategy and copy without media dependencies, but full video production requires a local video and voiceover toolchain.

## Dependency Levels

### Required for Strategy and Copy Only

- Markdown-capable workspace for writing design drafts, editor's notes, and planning files.
- Access to the skill files under a Codex-compatible skills directory.

No media renderer or TTS engine is required if the user only asks for positioning, content matrices, copy, cover concepts, or video design drafts.

### Required for Full Video Production

- Remotion or another approved video renderer. The user's current default is Remotion for B2B vibe-marketing videos.
- Node.js/npm runtime compatible with the selected Remotion version.
- A Chromium/Chrome Headless Shell usable by Remotion for rendering. Prefer a stable shared local path instead of a temporary tool cache when deploying for repeated production.
- ffmpeg with H.264/libx264 support for MP4 packaging and audio/video inspection.
- Chinese fonts used by the visual system, especially Alimama ShuHeiTi for large titles and Alibaba PuHuiTi for body text, captions, chips, and lower-thirds.
- A local or approved TTS engine for Chinese narration.

### Default Local Voiceover

Default TTS preference:

- Kokoro local voiceover, especially `hexgrad/Kokoro-82M`.
- Preferred Chinese male voice in the user's current workflow: `zm_yunyang`.

Licensing note:

- Kokoro-82M is listed by its Hugging Face model card as Apache-licensed/open-weight. Verify the current upstream model card and any bundled voicepack/license files before deploying commercially.
- Remotion licensing depends on organization size and use case. The official Remotion license page states that individuals and companies up to 3 people can use the Free License, while companies of 4+ people need a Company License for commercial automation/use. Verify the current Remotion license before another organization uses this skill commercially.
- Fonts, stock media, background music, and sound effects must each have their own commercial-use rights. Do not assume a generated video is commercially safe if one asset's license is unclear.

## Why English Terms Need Voiceover Localization

For Chinese narrated videos, mixed English acronyms and product terms can cause local TTS models to misread, weaken, skip, or distort the pronunciation. This has happened with terms such as `AI`, `STEM`, `PBL`, and `GPT`.

Therefore, the video design draft must separate:

- On-screen display: what the viewer sees, including brand names that may contain English letters.
- Voiceover wording: what the TTS engine should synthesize.
- Confirmation status: whether the user has approved the pronunciation or Chinese equivalent.

For Kokoro, prefer confirmed Chinese wording for semantic terms instead of forcing English acronyms. Current default mappings:

- `STEM` -> `科创融合课程`
- `PBL` -> `项目化学习`
- `GPT` -> `生成式人工智能工具`
- Semantic `AI` -> `人工智能`

Do not silently change visual brand names. If a brand contains English letters, keep the standard on-screen brand display and confirm the voiceover wording separately before synthesis.

## Pre-Production Environment Checklist

Before rendering a video, confirm:

- The video design draft is approved as a separate step.
- The voiceover term checklist is approved.
- The renderer is installed and callable.
- The stable browser/headless shell path is available.
- ffmpeg can produce H.264 MP4 and inspect audio tracks.
- Required Chinese fonts are installed or bundled.
- The TTS voice/model is available locally or approved for the intended commercial use.
- No new plugin, dependency, model, browser component, paid API, or third-party package is installed without user approval.

## Suggested Folder Roles

- `outputs/<task-folder>/video_design/`: editable Markdown video design drafts.
- `outputs/<task-folder>/source/`: Remotion/HyperFrames project files and production source.
- `outputs/<task-folder>/assets/`: generated or selected images, audio, fonts, and supporting media for this task.
- `outputs/<task-folder>/qa/`: screenshots, key-frame inspections, audio checks, and notes.
- `outputs/<task-folder>/final/`: final video, first-frame cover export if needed, editor's note, and final metadata.

## Portability Notes

Local absolute paths from the user's machine are examples, not portable requirements. When another person installs the skill, they should map the same roles to their own machine:

- stable headless browser path
- ffmpeg path
- video-generation helper path
- font paths
- output root
- local TTS model path

If those paths differ, update the host environment or workspace-level instructions rather than editing the business logic of this skill.
