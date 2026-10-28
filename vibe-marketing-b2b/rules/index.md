# 强制规则索引

先读[执行合同](execution-contract.md)，再按实际范围完整读适用规则及requires依赖。以下均为执行规范，不能当作可选参考；任务类型只是入口，文件内适用条件继续有效。未适用的特殊操作不因索引列出而自动授权。机器目录见[registry.json](registry.json)。

| 任务范围 | 必须读取 |
|---|---|
| 所有任务 | [deliverables](deliverables.md)、[execution-contract](execution-contract.md)、[workflow](workflow.md) |
| 设计/故事 | [video-design-draft](video-design-draft.md)、[xiaohongshu-taboo](xiaohongshu-taboo.md) |
| 文案 | [xiaohongshu-taboo](xiaohongshu-taboo.md) |
| 封面 | [cover-delivery](cover-delivery.md)、[cover-formulas](cover-formulas.md)、[production-qa-rules](production-qa-rules.md)、[xiaohongshu-taboo](xiaohongshu-taboo.md) |
| 场景/镜头 | [production-qa-rules](production-qa-rules.md)、[video-design-draft](video-design-draft.md) |
| 配音/时间轴 | [dependencies](dependencies.md)、[kokoro-english-policy](kokoro-english-policy.md)、[speech-breath-design](speech-breath-design.md)、[video-design-draft](video-design-draft.md)、[voiceover-lexicon](voiceover-lexicon.md) |
| 字幕/剪辑/动效 | [caption-panel-geometry](caption-panel-geometry.md)、[caption-segmentation](caption-segmentation.md) |
| 渲染 | [dependencies](dependencies.md)、[production-qa-rules](production-qa-rules.md)、[remotion-production-contract](remotion-production-contract.md)、[video-design-draft](video-design-draft.md)、[workspace-layout](workspace-layout.md) |
| 服务器操作 | [dependencies](dependencies.md) |

读取依赖与生产依赖须区分：角色C0先约束场景，实际场景和冻结音频后才完成C1；发音目标P0先于试听P1，不循环要求尚未生成的WAV。文案依赖xiaohongshu-taboo，封面/发布标题分字段；1080P画布前置约束资产、锚点、排版与导出。纯封面/文案不重开已批准影片。

## 视频文字安全区

设计、字幕、文字叠加、渲染与交付必须读[text-safe-area](text-safe-area.md)：制作文字区、内部缓冲、平台排除区分别记录；完整组合及动效最外缘核验。
