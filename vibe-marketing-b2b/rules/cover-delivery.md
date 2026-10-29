# Unified cover delivery contract

Mandatory before cover design, export, scoped revision and final-folder handoff in the vibe-marketing family. This is the maintained authority; standalone variants carry a checksum-identical snapshot. Explicit user choices override defaults. Do not silently regenerate an approved video or unaffected cover when synchronizing this standard.

## 1. Full-bleed scene, native dual formats

- **图片通铺 / full-bleed imagery:** the actual scene fills all four canvas edges. No paper/color border, large blank-color half, small framed image, comic-panel window, blurred filler or letterboxing as a substitute. A naturally quiet wall/sky inside the scene is valid text space, not permission to paint an artificial blank panel.
- For a complete content package, deliver both a native **9:16 poster, normally 1080×1920**, and a separately composed **4:3 landscape cover**. Do not crop, stretch, letterbox or merely resize one completed cover into the other. Prepare a scene/layout for each ratio; a suitable native source image may be reused without inventing new artwork.
- Preserve the approved title, audience promise, character identities and art system. Show a recognizable business/education/story scene or outcome evidence. Keep one dominant title and at most one supporting phrase; do not turn the cover into a dense checklist or detached explanatory slide.

### 高注意力封面的画面合同

以下是今后新封面的默认画面质量要求。它们提高瀑布流中的识别与停留机会，但不构成“爆款”或流量保证；封面仍须兑现正文内容，并优先吸引真实目标受众而非泛流量。

- **主体明确且占比充足：**第一眼能辨认主要人物、产品、作品、结果或关键经营场景；在手机缩略图中主体仍清楚，不能缩成无意义的小人或小物件。
- **场景真实可识别：**优先使用门店、前台、教室、家长等候区、项目桌、作品展示、教研或沟通等真实业务/教育情境。画面应让目标老板不依赖标题也能大致认出“这是什么地方、正在发生什么”；避免抽象形状、通用办公背景或传统招商海报冒充场景证据。
- **人物有可读状态：**人物应通过表情、动作、视线、姿态或与道具/他人的互动呈现焦虑、犹豫、判断、投入、惊喜或成就感。仅站立微笑、指标题或无目的摆拍不算有效叙事状态。
- **单一视觉焦点：**一张封面只设一个主阅读焦点；其他人物、道具和信息服务于它。避免多个同等醒目的头像、卡片、图标、色块和文字争抢注意力。
- **画面自带冲突或变化：**需要对比时，通过现状/结果、左右业务、人物心态、前后动作、空间秩序或成果差异形成可见反差；不要只靠文字宣称“前后对比”。对比两侧的身份、时间或状态必须能被画面和内容真实解释。
- **情绪与证据同时存在：**人物情绪负责代入，作品、证书、项目成果、经营状态、课堂动作或前后变化负责可信度。不能只拍情绪脸，也不能只放没有人的成果板而缺少使用情境。
- **层级精简：**默认只保留主标题、核心场景/主体和至多一条辅助信息三个层级。装饰、品牌标识和背景元素不得形成第四个竞争焦点。
- **构图保留天然安静区：**文字落在低信息但仍属于完整场景的区域，不遮挡脸、嘴、手、项目成果、产品证据或关键动作。不得为文字制造大面积空白、宽幅蒙层或把人物压到边缘。
- **色彩对比服务焦点：**利用明暗、冷暖、局部强调色或空间层次分离主体与文字；控制主色数量和饱和度，避免多种高饱和颜色平均争抢注意力。默认文字与底板配色仍唯一读取`cover-style-defaults.json`。
- **保留平台原生感：**画面可精心设计，但应保持真实瞬间、真实材质和可信光线，避免过度精修、PPT式模块堆叠、传统招生海报或廉价促销模板感。用户明确选择插画、漫画或信息图风格时，仍须保留可识别场景、单焦点和证据逻辑。
- **结果证据可见：**当标题承诺成果、升级、变化或机会时，画面应尽可能出现相应的作品、过程、行为或前后状态；没有可视证据时，改用真实问题场景，不伪造结果。
- **缩略图优先：**构图先保证中间3:4缩略图内的主体、关键动作与标题都完整，再处理9:16全画面的延伸；不把关键信息放在上下边缘后依赖事后裁图补救。
- **底板只做局部辅助：**需要底板时，按真实文字边界生成小范围半透明圆角矩形；不得用底板盖住人物或场景，也不得用大面积蒙白把整张图切成上下/左右两种色泽。

## 2. Covers are separate deliverables

- Compose and export the cover files independently. Match the film's topic and hook; identical pixels or a cover-title first frame are not required by default.
- Following the anime rule, a standalone cover title/note is not authorization to overlay it on the film. Story/anime/motion-comic dialogue opens with its approved scene; in-film title cards and role-name badges require specific approval or a clearly approved opening design. Other formats retain their explicitly approved opening policy.
- A cover-only correction does not reopen the video, speech master, copy or the other cover. Keep unchanged-file checksums where useful. A skill or renderer change does not revoke an earlier explicit choice to use a first-frame poster.

## 3. Deterministic typography and subject protection

### 今后封面的默认配色

新封面统一使用**黑字＋30%半透明白底，关键词红色**。主标题其余文字及副标题保持黑色，只对选定的关键词着红；默认沿用已选棕红色。参数唯一读取本规则同目录的[cover-style-defaults.json](cover-style-defaults.json)，再写入项目的实际生产配置，由预览与最终渲染共同消费。30%指白色底板自身的alpha，不是文字透明度，也不是整幅图的透明度；禁止未获指定就改为85%白底或整体蒙白。

用户后续明确指定的样式优先；该默认仅作用于今后新封面，不追溯修改已交付或已批准的封面。保留本规则的局部底板、主副标题底板间隔、字体及禁止描边要求。

- Generate/source the complete scene without final Chinese lettering; add final words locally with concrete installed font files. On the 1080×1920 digital baseline use title/body/caption/note **120/60/40/30 CSS px**, not print points. Prefer Alimama ShuHeiTi for the large title and Alibaba PuHuiTi for supporting/body/note text; never apply synthetic bold to ShuHeiTi.
- For 9:16 Xiaohongshu thumbnails, verify the middle 3:4 crop `y=240..1680`. Keep core title/supporting text within `x=72..1008, y=300..1560` on the baseline canvas. Adapt to an explicitly different canvas/platform rather than blindly reusing coordinates.
- Do not obscure faces, mouth/head silhouettes, important hands/gestures, drawings, models, product evidence or the contrast that tells the story. Semi-transparency does not excuse occlusion.
- Use actual line boxes and strict Chinese breaks: no closing punctuation at line start, opening marks at line end, overflow or accidental one-character final line. Reflow before reducing legibility.
- Place text in quiet image areas. For new covers, size the default 30%-white rounded backing from the actual text, with 24–36px radius and at least 48px horizontal padding on the baseline canvas; preserve an explicitly approved no-backing treatment. Do not use a broad veil or color block to manufacture readability. All cover text, including the main title, must remain free of glyph strokes and outlines; do not simulate a contour with highlight edges, glow, embossing, multi-direction shadows, or duplicated offset text.

### 主副标题底板必须分离

主标题与副标题分别使用底色时，两块底板之间必须留有清楚可见的原画间隔，禁止相接、相切、重叠或通过透明叠加连成一整块。检查对象是实际绘制后底板的外边缘，包含padding、圆角外接范围和效果扩张，不能只测文字框或CSS容器的间距。

1080px宽封面的默认最小间隔为24px，其他宽度按比例换算；用户明确指定的间隔优先，并记录实际数值。该值是制作默认，不是平台规定。将`minPanelGapPx`与实际`panels:[{id,role,bounds:[left,top,right,bottom]}]`写入同一生产配置/导出测量记录，运行`scripts/validate-cover-panels.mjs --layout <实际测量JSON>`。只有一个底板、无底板或两组本来共用单块底板时不虚构两块验收；不得擅自将已批准的独立主副标题底板合并来绕过间隔要求。

验收须核对实际底板alpha/像素边界，并在原尺寸及手机缩略图中确认间隔可见、不遮挡人物与证据。校验器只检查提交的几何，不能代替实际导出与视觉核验。间隔不足时调整局部底板padding或组间布局，保留必要内边距与已批准文字/字体/字号；不要用换色掩盖相连的问题。

## 4. Readability is a visual test

- Inspect both actual exports at full output size, feed-sized thumbnails and the relevant crop. Check all four image edges, background interference, subject protection and story signal independently from pixel dimensions and font size.
- If dark lettering fails, test a light treatment directly, or dark lettering on small measured light backing. Avoid repeatedly nudging an unreadable shade. For multiple translucent panels, avoid double-opacity seams at overlaps.
- When the user requests alternatives, keep the same image, approved wording, size and position so text treatment is the meaningful variable. Record the **user's selected result**, not just the agent recommendation, so a resume cannot revert it. Alternatives are not an extra mandatory approval stage for every cover.
- Record actual viewed files and checksums. A renderer success, automatic overflow pass or large font does not prove visual quality. Sources/notes remain outside audience-facing files.
- At full size and feed-thumbnail size, explicitly check the high-attention scene contract above: recognizable subject and setting, readable human state, one dominant focus, visible conflict/change or evidence, restrained hierarchy/color, natural text landing area, platform-native feel, and no broad backing that damages the scene. Record failures separately from typography/readability failures.

## 5. Timely final-folder delivery

- Place each completed, checked cover, publishing-copy file and video in the user's task `final/` as soon as usable. Do not leave completed covers only in `renders/review/` while waiting for whole-film acceptance. Track candidate/accepted status separately in notes.
- Respect an explicit “deliver first, request changes if needed” policy. Do not invent another user-acceptance wait or forge a listening/lip-sync approval. Required source/audio/technical gates still apply; an actual known defect needs repair.
- After a verified replacement, move obsolete delivery copies to recoverable macOS Trash unless history was requested. Preserve editable source, reusable assets, scripts, audio provenance and QA outside final. Keep only the latest directly usable audience-facing files in final; no drafts, contact sheets, manifests, code or ZIP archives.
- Recheck inventory, dimensions, byte sizes and checksums after promotion. Link the exact final files, not an obsolete review path. State any real missing item or limitation honestly.
