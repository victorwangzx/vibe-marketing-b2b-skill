# Vibe Marketing B2B

Current version: **v4.1.0**.

v4.0.3（2026-10-29）：继承用户今后封面默认：黑字、30%半透明白底、关键词红色；新增唯一参数文件cover-style-defaults.json并要求实际渲染消费。默认沿用已选棕红，主副标题底板仍需分离；不追改已批准封面。仅本地维护及打包，未操作远程Git标签或Release。

v4.0.2（2026-10-29）：封面主副标题独立底板必须留可见原画间隔；默认至少24px/1080宽，按宽度缩放，检查实际底板外缘而非文字框。新增几何校验器与相接/重叠/不足/边界反例；实际像素与缩略图仍须目视核验。无底色不强加底板。仅同步本地规则/包，未修改远程Git标签或Release。

Local package: `vibe-marketing-b2b-skill_v4.1.0_release.zip`.

v4.1.0（2026-10-29）：封面权威模块新增“高注意力封面画面合同”。新封面须在全尺寸和瀑布流缩略图中具备明确主体、真实可识别场景、可读人物状态、单一视觉焦点、可见冲突/变化或结果证据、精简层级、天然文字安静区、克制配色、平台原生感及局部底板；禁止把抽象海报、无目的摆拍、PPT堆叠或大面积蒙层当作高点击设计。该合同提高识别与停留机会，但不承诺爆款或流量结果。

v4.0.1（2026-10-28）：小红书发布标题默认写到15—20个可见字符，20字为含标点和emoji的硬上限；不足15字只在更清晰或已获批准时保留，禁止为凑字数堆空词。封面标题保持简洁，可用真实可兑现的噱头、反差、悬念、问题或机会信号；发布标题补足对象、场景、判断或收获。双标题必须形成“封面制造认知缺口—发布标题说明为何值得看”的互补反差，不能事实矛盾或标题党。同步纠正交付规则中允许双标题同文的旧冲突。

v4.0.0（2026-10-28）：所有受众可见文字完全禁止字形描边或外轮廓，主标题与封面标题不再例外；禁止 CSS/SVG/Canvas/Pillow 文字描边及以多方向阴影、高光边、发光或重复偏移文字模拟轮廓。可读性改用实色字、字重、局部半透明底板、自然安静落点、局部渐变与明暗关系。漫画分格线、气泡边框、流程连线等非文字图形不受此禁令影响。该变更会使旧描边标题样式失效，故升级主版本。

v3.2.0（2026-10-28）：配音准备新增核心信息与语句重音分析。每个连续发言先记录核心命题、表达意图、主重音、次重音、去重音信息和表达说明，再设计气口和合成；校验器检查重音字段与实际配音文本的一致性。重音不得通过任意加标点、拆词或多次TTS请求制造，必须通过上下文试听确认真实听感。Victor示例使用既有Kokoro `zm_yunyang`绑定预演，不改变默认声音。

v3.1.2（2026-10-21）：封面标题与小红书发布标题除分别撰写外，必须记录可验证的互补关系；封面优先承载事实/数据/政策方向，发布标题可侧重面向目标受众的营销引导、专业判断或真实感慨；优先关系为“事实/政策方向→营销判断”“结果信号→机制/下一步追问”“具体对象→可获得的决策收获”。发布标题维持20个可见字符上限，不能用同义换词或新增无证据承诺冒充互补。发布包名：`vibe-marketing-b2b-skill_v3.1.2_release.zip`。

v2.4.2（2026-10-20）：今后新视频至少以1080×1920竖版或1920×1080横版制作与交付；先锁画布，导出后核真实尺寸及全尺寸画质。新项目合同增加最短边1080px检查，已发布/旧锁定片不追溯重制。仅本地更新及打包，未发布GitHub。

v2.4.3（2026-10-20）：文案依赖新增封面标题/发布标题分别撰写及实际配对检查，既有批准冲突按决策锁处理。

Create B2B opportunity positioning, platform copy, covers and narrated-video planning. Version 2.2.0 adds semantic breath planning before synthesis, continuous speaker passages, measured silence intervals, full audition listening and checksum-bound narration masters. Speaking-mouth footage follows the same voiced onset, rest and re-entry; changed audio timing invalidates the affected footage.

Read `rules/speech-breath-design.md` before narrated-video timing or synthesis. New initialized production contracts require its plan/review gate. Historical contracts remain compatible; revised narration adopts the new fields.

Public repository: https://github.com/victorwangzx/vibe-marketing-b2b-skill

See `SKILL.md` and `references/revision-history.md`. This public skill contains no private motion-engine server presets or character assets.

Version 2.2.1: Synchronized anime-derived cover requirements and the explicit full-bleed preference: native independent 9:16/4:3 covers, no automatic cover-title video overlay, typography/subject protection, full-size/feed/crop inspection, scoped readability alternatives, prompt final-folder delivery and recoverable replacement cleanup. Existing approved openings and H3/audio/model/validator behavior are unchanged. Local-only update; no GitHub publication or acceptance is claimed.

Version 2.2.2 (2026-10-20): Kokoro English universally uses Chinese meaning, including brand acronyms and letter teaching. Added authoritative policy and removed conflicting English/letter-by-letter exceptions. Local update/package only; no Git tag or GitHub publication.

v2.3.0（2026-10-20）：segmented-v2气口分六档：语义40±10、列举80±10、逗号160±20、冒号240±20、分号320±20、句末400±30毫秒，范围互不重叠；支持无标点语义边界并保护完整词，量化计划/测量/听审与profile门禁同步，旧未改动计划保留兼容。本地更新与打包，未创建Git标签或发布GitHub。

v2.4.0（2026-10-20）：对白字幕单行；超宽按完整语义/气口切下一条并对齐冻结音频，不缩字、不拆词、不留人为孤字、不把下一帧做成单帧闪字。排版、剪辑、音频和渲染依赖同步；基础初始化与预检单行门槛更新。仅本地更新及打包。发布包名：`vibe-marketing-b2b-skill_v2.4.1_release.zip`。

v2.4.1（2026-10-20）：字幕底板固定高度/中心Y，文字按实际中文字面校准并锁定基线；默认上下留白差≤2输出像素，结合真实导出目视验收，不能用容器居中代替。当前720制作profile为H72、Cy1114，其他批准profile不自动覆盖。仅本地更新及打包。

## v3.0.0 — 2026-10-20

作者：Victor使用Codex制作。强制执行文件迁入`rules/`，辅助研究/历史留于`references/`；入口、[规则索引](rules/index.md)、机器目录和规则执行台账校验分工明确。H3主文件按人物场景、镜头、音频、文字与生产执行拆分，清除旧版基础快照并同步当前基础约束。保留用户批准与各自专属能力。此版本属于目录接口变更，旧路径见registry迁移映射；不以路径失效跳过要求。仅本地打包，未改Git标签或远程Release。

当前包：`vibe-marketing-b2b-skill_v3.0.0_release.zip`。执行脚本与门槛见[rules/execution-contract.md](rules/execution-contract.md)。

## v3.1.0 — 2026-10-20
Victor使用Codex制作。区分Adobe传统动作/文字安全区、平台UI遮挡及封面裁切，定义完整文字组最外缘与动效验收，纠正72px视频侧边距及历史字幕默认。工作区额外24px是内部排版缓冲，不冒充平台或Adobe标准。当前包：`vibe-marketing-b2b-skill_v3.1.0_release.zip`。仅本地更新，未改既有成片或远程发布。

## v3.1.1 — 2026-10-20
Victor使用Codex制作。文字实际笔画边界优先，padding反算文字合法范围并推导底板；字幕按固定参考字面推导锁定高度/基线。补齐安全区的上游输入、输出字段、字幕及渲染依赖。当前包：`vibe-marketing-b2b-skill_v3.1.1_release.zip`。仅本地更新。
