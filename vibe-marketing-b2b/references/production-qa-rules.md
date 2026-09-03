# Production and QA Rules from Prior B2B Content Builds

Use these rules when creating or revising 2B education cooperation covers, short videos, Toutiao covers, Xiaohongshu notes, or platform-specific derivatives. These rules come from real production failures and should prevent repeating them.

## 1. Preserve Approved Strategy

When the user has already approved a title, pain point, audience, or hook, do not rewrite it during platform adaptation unless the user explicitly asks for a new strategy.

- Treat an approved cover title as a locked strategic asset.
- If adapting from Xiaohongshu to Toutiao, change canvas, layout, crop, hierarchy, and text density, but keep the approved title unchanged.
- Do not replace a high-performing hook with a more explanatory article-style sentence.
- If a title feels imperfect, mention it as an optional variant instead of silently changing it.

Example rule: if "编程老学员 / 续费卡在哪？" is approved, a Toutiao cover should still use that title. A phrase like "编程机构续费难，卡在成果感" may be useful as正文观点, but it is not a substitute cover title unless approved.

## 2. Confirm the Real Buyer and Pain Before Production

Before drafting or rendering, identify whether the content speaks to B-end institution owners or C-end parents.

For 科创赛考 partnership acquisition, default to the B-end owner:

- The pain is not only "children lose interest"; it is "old students reach the middle stage, parents cannot see outcomes, and renewal loses its reason".
- The opportunity is not "help children enter competitions"; it is "help the institution turn existing course ability into a product line with visible projects, parent-facing outcomes, and a trial path".
- The decision moment is when the institution has old students, renewal pressure, holiday-camp or续费节点, and teacher delivery willingness.

Before video production, explicitly check that voiceover and on-screen copy use institution-facing words such as 机构, 校区, 老学员, 续费, 产品线, 试点, 项目营, 家长反馈, 交付能力, or 成果路径. If the script mainly sounds like advice to parents, rewrite it before rendering.

## 3. Filter Bad Leads

Do not create hooks that attract the wrong consultation type.

- For English institutions, do not imply 科创赛考 is an English contest or English competition resource.
- For programming institutions, do not imply 科创赛考 is merely "比赛报名资源".
- Use filters such as "不是比赛报名", "不是换个课名", "适合有老学员、正在做续费升级的校区", or "先小规模试点".

Qualified-lead filtering is part of the creative, not an afterthought.

## 4. Platform Covers Are Not Interchangeable

Do not reuse one platform's cover by cropping it into another platform's format.

Xiaohongshu:

- Default 9:16, 1080 x 1920.
- Core cover text stays inside the middle 3:4 thumbnail-safe box defined in `cover-formulas.md`.
- The cover acts as a fast waterfall-feed business opportunity signal.

Toutiao:

- Create a dedicated 4:3 landscape cover unless the user requests another ratio.
- Prefer one large title plus one short supporting line or filter.
- Do not reuse a Xiaohongshu vertical poster or center-crop it.
- Keep the visual evidence readable: product, people, project work, or business scene should still be inspectable.

## 5. Design Text Around Real Image Subjects

The purpose of generating people, facial expressions, hands, project objects, and classroom actions is to make the business scene credible. Do not cover those subjects with opaque text blocks.

- Place text in low-information areas or in a deliberately reserved text zone.
- Semi-transparent panels are preferred, but transparency does not excuse covering faces, hands, project work, or the contrast that explains the story.
- Do not use broad top/bottom masks, gray veils, or large overlays that split the image into visibly different color zones just for readability.
- Use deterministic local typography, text stroke, shadow, and small panels before sacrificing the scene.
- When a text background, panel, chip, lower-third, or overlay fill is needed, choose an opacity within 20%-50% according to the actual frame. Text must be readable, but the image should remain visible enough to preserve the business scene.

## 6. Use Deterministic Typography, Not AI Text

Final Chinese text on covers and video stills must be added locally with real font files. Do not depend on image-generation model lettering.

- Use the workspace font system: Alimama ShuHeiTi for large titles, Alibaba PuHuiTi for body and labels unless the project specifies otherwise.
- Check visible glyphs, punctuation, line breaks, and alignment.
- Text inside a panel, chip, bubble, or label must be vertically centered by visible glyph bounds, not by a guessed baseline offset.

## 7. Video Must Be Multi-Scene, Not One Picture With Motion

For a short 2B explainer or cooperation pitch, do not stretch one background image through the whole video with only slight movement.

For B2B promotional, sales, product-introduction, service-introduction, cooperation-pitch, or course-package videos, Chinese narration is required by default. A no-voiceover video is valid only when the user explicitly asks for a silent, subtitle-only, poster-loop, background-screen, or visual-only version. Do not treat subtitles or background music as a substitute for the spoken pitch.

Minimum expectation:

- Produce an editable short-video design draft first when the user is asking for video production. The draft should be saved as a Markdown file under the task output folder, and production must wait until the user approves or explicitly skips the draft step. This confirmation is separate from approving the topic or title.
- The first 3 seconds must be designed as a hook, not treated as a passive cover hold. Combine voiceover, on-screen copy, and visual motion so the target owner immediately understands the business problem or opportunity.
- Good first-3-second hooks can use Douyin-style opening logic adapted for B2B: sharp question, assumption reversal, pain scene, before/after contrast, trend signal, or "not X, but Y" framing. Keep the hook qualified so it attracts the right institution owner instead of broad C-end curiosity.
- If a designed cover with an existing title is used as the opening background, do not place dynamic hook text near that title or existing cover labels. Create a separate hook zone with enough visual distance, preferably in the middle or upper-middle space below the title and above the main subjects, so the motion adds hierarchy instead of visual clutter.
- Several distinct scenes or visual states that match the narration beats.
- For publishable videos, "scene" means a visually recognizable situation, not just a programmatically drawn card or abstract layout. A valid scene should be immediately identifiable as a classroom, school corridor, teacher preparation desk,教研会, parent meeting, project-making table,科技节展示, student presentation, product demo, or other concrete business/school workflow. Abstract logic cards may support a transition or summarize a path, but they cannot be the main visual evidence for most scenes unless the requested video is explicitly an infographic-only style.
- Deliberate shot-size variation across scenes: wide, medium, close-up, extreme close-up, over-the-shoulder, top-down, screen/board, or abstract logic views. Avoid a sequence of same-size poster-like scenes that creates fatigue.
- On-screen headings that advance the logic: hook, pain, boundary, product logic, timing, trial path.
- Concrete examples that are too long for voiceover may appear as pause-readable case/evidence overlays, but they must be planned in the video design draft rather than added casually during rendering. Treat these overlays as supplemental bottom information strips by default, similar to print footnotes or editorial lower-thirds; only use side notes or separate logic cards when the bottom would cover key visual evidence or conflict with subtitles.
- Scene durations should come from segment-level voiceover timing when narration is used, not only total audio duration.
- If using local Kokoro voiceover, check sentence segmentation and gaps. Avoid unnatural long pauses from line-by-line synthesis.
- If a brand name contains an English acronym such as "AI", keep the visual brand name unchanged and make the voiceover use standard English-letter pronunciation. Prefer a tested pronunciation form such as "A-I" when the TTS model otherwise weakens or misreads the abbreviation. Do not use Chinese-character approximations such as "诶、爱", and do not replace brand-name "AI" with "人工智能".
- Before generating voiceover, scan the script for mixed Chinese-English terms, acronyms, brand English, and technical labels. The video design draft should already contain the production-ready, localized voiceover wording plus a confirmation checklist: keep visually, translate in voiceover, or use voiceover-only wording. For Kokoro, prefer confirmed pure-Chinese wording instead of forcing English acronym pronunciation. Current confirmed mappings: "STEM" -> "科创融合课程", "PBL" -> "项目化学习", "GPT" -> "生成式人工智能工具", semantic "AI" -> "人工智能".
- Unresolved voiceover terminology is a blocker to voiceover production, not permission to omit narration. Confirm the terms or use approved plain-Chinese wording before rendering.

## 8. Video Copy QA Comes Before Rendering

Before rendering a B2B video, write or inspect the full voiceover and on-screen copy.

Check:

- Is the first line clearly aimed at institution owners or校区负责人?
- Do the first 3 seconds combine a strong spoken hook with matching on-screen text and visible motion/information change?
- Does it name the operating pain rather than only a child's learning emotion?
- Does it explain what 科创赛考 is not?
- Does it name when the institution is ready to try it?
- Does it recommend a low-risk next step such as 4-8 lesson project camp or product-line diagnosis?
- Does it avoid hard diversion, exaggerated promises, and fake proof?

Only render after the copy passes this check.

## 9. Visual QA Must Check Layout, Not Only File Existence

A video or cover is not ready just because it renders and has audio.

Before final delivery, perform QA against the deliverable type in `deliverables.md`. If the artifact is visual or video, inspect the actual output file, not only the source script or terminal log.

For covers, inspect:

- Final canvas ratio and platform fit.
- Approved title preserved.
- Text safe area and platform thumbnail behavior.
- No text over faces, hands, key objects, project work, or core actions.
- No broad mask causing unwanted two-tone image halves.
- Text blocks, chips, and bubbles sized to actual text length.

For videos, inspect:

- The first frame works as the cover: approved title, hierarchy, thumbnail readability, and business signal are visible before motion starts.
- The first 3 seconds separately: at least 2-3 sampled frames should show meaningful visual or information progression, and the visible text should match the spoken hook.
- Key frames from every scene, not only the first frame.
- Scene recognizability: each sampled scene should be understandable without relying on the subtitle. If a viewer cannot tell whether the image is a classroom,教研会, project-making table,科技节展示, teacher workflow, product demo, or other intended situation, the scene fails QA even if the file renders and the text is readable.
- Shot sizes/viewpoints vary enough to avoid visual fatigue and match the scene function.
- Bottom subtitles and labels fully contained within their backgrounds.
- Case/evidence overlays remain readable when paused, are not falsely presented as verified proof, sit inside left/right safe margins, and do not cover the scene evidence they are meant to support.
- Text background opacity sits within the 20%-50% range unless the scene is intentionally a flat logic card.
- Panel height and width adapt to actual line count and text length.
- No punctuation or one-character orphan lines in visible Chinese text.
- Audio track exists, contains the required narration unless explicitly waived by the user, duration is reasonable, and volume is not silent.
- On-screen copy remains B-end facing throughout.
- Final editor's note is present with exactly 5 relevant hot tags when a full platform content package is requested.

If a script generates text panels, calculate the panel from measured text bounding boxes and line count. Do not hard-code a fixed panel size for variable copy.

For rendered short videos, the QA sample must include at least one frame from every scene or logical state. Do not use arbitrary equal-interval frames if that misses the final scene, an important transition, or the problematic overlay.

When reporting QA, name the concrete checks performed. Acceptable phrasing: "checked six scene midpoints for text overflow and subject occlusion; checked audio track and volume." Unacceptable phrasing: "QA passed" with no evidence.

## 10. Versioning and Corrections

When fixing a concrete production defect, create a new semantic version rather than overwriting the previous final silently.

- Minor layout or copy fixes: `v1.1`, `v1.2`, etc.
- Major structural or strategy changes: `v2.0`.
- Include a short Chinese descriptor in the filename that identifies the fix, such as `修复底色溢出版`, `原定标题版`, or `无灰遮罩版`.

When the user points out a defect, inspect the affected artifact before editing. Do not assume the issue is only in copy or only in design.
