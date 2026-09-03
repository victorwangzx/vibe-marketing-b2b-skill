# Short-Video Design Draft Deliverable

Use this reference when the user asks for a short video, rendered video, Remotion/HyperFrames production, or any B2B new-media video that may later be generated.

## Role of the Draft

The short-video design draft is a required pre-production deliverable unless the user explicitly asks to skip it. It gives the user a Markdown file they can edit directly before voiceover synthesis, asset production, or rendering.

Do not treat the draft as a loose script. It is the main quality gate for the final rendered video. It should lock the business logic, film-style scene design, shot design, shot-size variation, per-scene key visuals or visual-effect mockups, visual logic, first-frame cover, first-3-second hook, voiceover wording, on-screen text, editor's note, 5 related hot tags, and risk boundaries before production starts.

The video design draft must be confirmed as its own step. Do not move into image generation, voiceover generation, Remotion/HyperFrames implementation, or rendering until the user has had a chance to edit the Markdown file and explicitly approve the draft, unless the user explicitly says to skip this confirmation.

Default location:

- Store under the task folder, usually `outputs/<task-folder>/video_design/`.
- Filename pattern: `<主题>_短视频设计稿_v1.0.md`.
- For revisions, use semantic versions such as `v1.1`, `v1.2`, or `v2.0` for major structural changes.

## Required Sections

Every B2B video design draft should include these sections:

- Title: use the approved video/topic title when one exists.
- Basic setup: target buyer, institution type, platform ratio, planned duration, tone, core point, visual center, and related cover/source files.
- First-frame cover: the video opening frame should also serve as the platform cover unless the user explicitly requests a separate cover.
- B2B diagnosis: real operating pain, qualified audience, unsuitable leads, and why the timing is appropriate.
- First-3-second hook: voiceover opening, on-screen text, visual motion, and why it should stop the intended B-end buyer.
- Film-style scene structure: scene-by-scene plan with narrative function, time range, shot size, camera/viewpoint, picture, screen text, production-ready voiceover, rhythm/motion, and transition notes.
- Per-scene visual-effect plan: the intended still/keyframe, generated-scene prompt, layout sketch, or logic-card design for each scene, so production does not become one cover image with changing subtitles.
- Case/evidence overlay: concrete examples, mini cases, or operational facts that are too long for voiceover but useful for pause-reading.
- Visual style: scene type, subject priority, attention zone, safe text region, and what must not be covered.
- Subtitle and layout rules: maximum text density, font choices, panel behavior, line-break risks, and overflow prevention.
- Music and sound: voice style, BGM style, sound-effect limits, and voiceover provider assumptions.
- Voiceover term checklist: mixed Chinese-English terms, acronyms, brand names, and confirmed voiceover-only wording.
- Publishable copy: editor's note or platform copy plus exactly 5 related hot tags when the video will be posted with text.
- Risk boundaries: platform compliance, lead-quality filters, claim limits, privacy/copyright risks.
- User-editable pending items: mark any wording, scene, asset, or term choice the user may want to change before rendering.

## Scene Table Standard

For the video structure, use film-style scenes or logical acts rather than a single poster stretched across the audio. Prefer a table or repeated scene blocks. Each scene must specify:

- Time range or approximate duration.
- Narrative function: hook, pain, boundary, solution logic, timing, trial path, or closing.
- Shot size and viewpoint: wide shot, medium shot, close-up, extreme close-up, over-the-shoulder, top-down, screen/board view, or abstract logic view.
- Picture: what viewers see, including people, objects, business setting, or abstract logic graphics.
- Key visual or visual-effect mockup: the planned still frame, generated scene direction, layout sketch, or logic card that should exist before rendering.
- On-screen text: short enough to read on mobile.
- Voiceover: exact production-ready line, not only a summary. Mixed English terms should already be translated or otherwise handled according to the term checklist.
- Motion: concrete Remotion-friendly movement such as push-in, pull-back, parallax, card reveal, comparison switch, path highlight, number emphasis, spotlight mask, lower-third reveal, or scene transition.
- Layout note: where text goes and what visual subject must remain visible.
- Case/evidence overlay: whether this scene needs a pause-readable example, where it appears, and how long it stays.
- QA note: possible overflow, subject occlusion, visual fatigue, or platform risk.

## Shot Design and Shot-Size Variation

Use shot-size variation to prevent visual fatigue. The draft should deliberately alternate between scene-setting views and detail views instead of repeating the same composition.

Useful shot-size options:

- Wide shot: show the classroom, campus, front desk, parent meeting, or business setting.
- Medium shot: show an owner, teacher, child, or parent in a recognizable action.
- Close-up: show expression, decision moment, project material, phone note, enrollment form, or parent feedback.
- Extreme close-up: show a key object, hand action, project output detail, badge, timeline node, or short phrase.
- Over-the-shoulder: show a person looking at a plan, parent message, student work, or screen.
- Top-down: show curriculum path, project kit, desk layout, checklist, or planning board.
- Abstract logic view: show a path map, comparison, funnel, timeline, or decision tree.

Rules:

- Do not keep several consecutive scenes at the same shot size unless the content intentionally creates repetition.
- Each shot-size choice should support the message. Do not add random close-ups just for variety.
- If the video uses generated scenes, specify the subject, action, and viewpoint for each scene so image generation and Remotion layout do not flatten everything into the same poster-like view.
- If the scene is a logic card rather than a realistic image, name it as an abstract logic view and define its layout hierarchy.
- For each scene, decide whether it needs a separate generated visual, a derived keyframe from the cover style, a clean logic card, or a Remotion-only graphic state. Do not assume the opening cover can serve every scene.
- If a scene is supposed to prove a school or business situation, use a real/provided clip or a generated/selected raster scene image with recognizable people, space, objects, and actions. Do not replace it with hand-coded circles, boxes, stick figures, or generic icons unless the user explicitly asks for a simplified schematic style.
- Use Remotion motion to clarify the business logic: reveal causes one by one, highlight the decision path, compare before/after states, move attention from owner pain to student outcome, or transition from scene evidence to solution map.

## Production-Ready Voiceover

The voiceover in the design draft should be the version intended for synthesis, not a rough outline.

For rendered B2B promotional, sales, product-introduction, service-introduction, cooperation-pitch, or course-package videos, the design draft must include production-ready voiceover and the final video must include synthesized Chinese narration by default. Use a no-voiceover plan only when the user explicitly asks for silent/subtitle-only/visual-only output.

- Convert or handle English acronyms, mixed Chinese-English terms, and technical terms before production.
- For Kokoro voiceover, use confirmed Chinese equivalents where appropriate, such as `STEM` -> `科创融合课程`, `PBL` -> `项目化学习`, `GPT` -> `生成式人工智能工具`, and semantic `AI` -> `人工智能`.
- Keep brand display separate from voiceover wording when needed. If the brand contains English letters, mark the on-screen version and the voiceover version separately.
- Put unresolved pronunciation choices into the confirmation table and do not synthesize voiceover until they are confirmed.
- Check that the opening line and closing line speak to B-end institution owners, not parents.

## Case and Evidence Overlay

Use case overlays when factual examples would make the business pain more credible, but reading them aloud would make the voiceover too long or too dense.

Good overlay content:

- Mini cases: one institution type, one problem, one attempted change, one result or observation.
- Concrete operating scenes: renewal meeting, parent feedback, holiday camp enrollment, teacher delivery bottleneck,成果展示 moment.
- Pause-readable proof points: before/after classroom output, project path, parent communication sentence, trial-camp arrangement, course package structure.
- Boundary examples: who is not suitable, or what this cooperation is not.

Rules:

- Keep voiceover short and persuasive; put secondary detail into the overlay.
- Make overlays explicitly pause-readable: they may stay on screen longer than ordinary labels, but should not block the main visual logic.
- Mark each overlay as "口播" or "暂停阅读" in the design draft so production does not accidentally turn every case into narration.
- Keep one overlay to one point. Prefer 2-4 short lines over paragraph blocks.
- Do not invent fake data, fake client names, fake before/after results, or unverifiable success claims. If the example is hypothetical, label it as a "典型场景" or "模拟案例".
- Treat this type of real-time case/evidence note as supplemental information, similar to a footnote, lower-third, or bottom information strip in print/editorial layout. The default placement is near the bottom of the frame, inside left/right safe margins, without competing with the title or main visual.
- Use a dedicated logic card only when the overlay is too dense for a bottom information strip. Do not place dense cases freely over a realistic scene.
- If the overlay is dense, use a deliberate freeze/hold moment, card flip, or side note style so viewers understand they can pause to read.
- Do not put multiple dense overlays on top of a realistic scene background. Use a clean logic card scene when the information itself is the point.

Bottom placement requirements:

- Default to the lower information zone, above subtitles and platform UI.
- Keep left and right safe margins clear; do not let text run close to the screen edge.
- Keep the overlay visually secondary: smaller type than scene headings, lighter contrast than primary hooks, and no oversized opaque blocks.
- If a text background is needed, choose a fill opacity within 20%-50% based on the actual frame. The text must be readable, but the background scene should still remain visible; avoid fully opaque blocks unless the scene is intentionally a flat logic card.
- If subtitles are also present, separate the overlay from subtitles by vertical spacing or move subtitles higher for that scene.
- The bottom strip should not cover core evidence such as hands making a project, a child presenting work, a teacher demonstrating, or a parent expression. If the bottom of the scene contains the key action, use a side note or separate logic card instead.

## Hard Rules Before Rendering

- Do not generate voiceover, images, or rendered video until the design draft is approved, unless the user explicitly says to proceed without draft approval.
- Do not skip voiceover for a promotional/service-introduction video because terminology is inconvenient. Resolve the terminology first or use confirmed Chinese wording, then synthesize narration.
- Before voiceover, present the voiceover term checklist for confirmation if the script contains mixed Chinese-English terms, acronyms, brand English, product names, or technical terms.
- The first 3 seconds must combine picture, voiceover, on-screen copy, and visible motion/information change. Do not use a static cover hold as the only opening design.
- Do not stretch one scene image through the entire video. Plan multiple scenes or logical states.
- Do not enter rendering until each scene has a defined key visual or visual-effect plan. A scene may be a realistic generated image, a crop/detail of a larger scene, a logic-card composition, or a Remotion animated graphic state, but it must be intentional.
- Before rendering a scene-based video, inspect or generate the scene assets first and reject assets that are hard to understand, look like random shapes, contain unusable AI text, or fail to show the intended school/business action. Scene recognizability is a production gate, not a polish pass.
- Keep the video B-end facing. If the wording sounds like advice to parents, rewrite before production.
- Keep on-screen text sparse. Avoid dense text over realistic scene images; use logic cards, labels, or staged reveals instead.
- Panels and text backgrounds must be sized from actual text length and line count during production.
- Text-background opacity must be selected from 20%-50% according to the actual frame, balancing readability with preservation of the background image.
- If an approved cover exists, reference the current approved file. Do not reuse obsolete covers.
- The first video frame should match the approved cover title, visual hierarchy, and core business signal. If a separate cover image is exported, it must be derived from the first frame unless the user asks for a variant.

## Visual Region Rules

Design around how mobile viewers scan short video:

- Place the most important dynamic hook text in the middle or upper-middle attention zone when the background allows it.
- If the opening uses an approved cover with existing title text, dynamic hook text should not crowd the title. Put it in a separate zone with enough distance, often below the title and above the main subject.
- Do not cover faces, hands, project work, child actions, teacher actions, parent expressions, or objects that prove the business scene.
- Do not use broad masks that split the frame into obvious color halves or hide the generated scene.
- Keep subtitles and bottom labels inside safe margins so platform UI and cropping do not cut them.
- During QA, check whether each scene can be described correctly without reading the subtitle. If the answer is unclear, the scene is not acceptable for a scene-based deliverable.

## Draft Template

Use this structure when creating a new draft:

```markdown
# 《<标题>》短视频设计稿 v1.0

## 基本设定

- 目标受众：
- 机构类型：
- 平台规格：
- 建议时长：
- 语气：
- 核心观点：
- 视觉中心：
- 关联封面/素材：
- 第一帧封面：默认视频第一帧即封面；如需单独封面，说明原因

## B端诊断

- 真实痛点：
- 适合谁看：
- 不适合谁：
- 适合切入的时机：
- 低风险下一步：

## 0-3秒开场钩子

画面：

屏幕文字：

口播：

动态设计：

为什么能拦住目标老板：

## 视频结构

### 0-3s <场景名>

叙事功能：

景别/视角：

画面：

关键视觉/效果图：

屏幕文字：

案例/证据叠加：

口播：

Remotion动效/节奏/转场：

布局与QA：

## 画面风格

- 

## 案例/证据叠加

- 是否使用暂停阅读案例：
- 案例来源：
- 叠加位置：默认底部补充信息条；如底部有关键画面或字幕冲突，说明替代位置
- 展示时长：
- 真实性标注：

## 字幕与排版

- 

## 音乐与声音

- 

## 术语与发音确认

| 术语 | 屏幕显示 | 口播处理 | 是否需确认 |
| --- | --- | --- | --- |
|  |  |  |  |

## 设计稿确认

- 是否已由用户确认可进入制作：
- 用户修改记录：
- 未解决问题：

## 发布文案

- 编者按：
- 相关热门标签：#标签1 #标签2 #标签3 #标签4 #标签5

## 风险边界

- 

## 待确认项

- 
```
