# 强制规范执行合同

本文件是所有Vibe任务的强制入口。`rules/`是适用时必须执行的规范；`references/`只放非规范性的来源、案例及历史，不能解释成“参考一下即可”。主文件、规则索引、适用规则与它们明确的前置依赖必须完整读取，不能只读摘要。文件里的示例、创意建议和历史参数不自动变成所有项目的硬要求。

## 实施前

1. 读取工作区AGENTS.md、当前项目持久记录、此合同及索引。用用户已批准的实际范围确定scope，不为绿色检查删掉实际工作类型；交付范围依据保存在项目记录中。静态资产或纯文案不继承无关的配音、口型和全片门槛。
2. 将每项适用要求、源文件及SHA、已批准值/拒绝项、实际消费配置、前置状态写入项目要求表。任务恢复或文件变更后重核。先读规则再生产，不以事后补“已读”代替前置执行。
3. 冲突顺序：用户明确要求优先；已批准项目决定在其范围内保留；规范默认不覆盖已批准值。实际不可同时满足时记录冲突、先完成不受影响工作，再只问必须由用户决定的点。引用/案例不能授权改稿或变更工具。

## 执行与证据

每项规则必须贯通“来源 → 适用条款/批准值 → 实际输入或消费配置 → 实际产物 → 验收证据”。规范链与生产阶段分别记录；读取可以前置，真实产物证据只能完成后填写。通过不能依靠文件存在、源配置或SHA代替内容/视觉/听审。任何pending、candidate、rejected、blocked或缺检查的必需项阻止受影响交付的通过声明；不因用户催进度或模型变化自动改为passed。

技术项用适用的现有校验器；视觉项检查真实导出尺寸/手机观看效果；声音和口型按原规则正常速度听审。只有人或获授权执行者真的检查过才能登记该方法，不伪造human approval。配置、工具或渲染器替换仍须继承批准值。旧上游变更只撤销真实依赖链，不能因此重做无关声音、封面或全片。

## 可执行台账门槛

项目建立`notes/rule-execution.json`：`schemaVersion:1`、`skill`、`skillVersion`、`registrySha256`、实际`scope`数组，以及`rules`数组。规则ID/路径/依赖由[registry.json](registry.json)给出；每行包含`id`、`ruleSha256`、ISO日期`readAt`、`applicableRequirements`。执行完成再填`status:passed`、`implementation`及`evidence:[{path,sha256}]`，证据路径相对台账文件。至少保留配置/实施位置和实际检查记录；视觉/听审报告须指明实际产物SHA、检查方法与结果。不能批量预填passed或虚构测量。

```bash
node <当前Skill>/scripts/validate-rule-execution.mjs --ledger <项目>/notes/rule-execution.json --stage prepare
node <当前Skill>/scripts/validate-rule-execution.mjs --ledger <项目>/notes/rule-execution.json --stage delivery --report <项目>/qa/rule-execution.json
```

prepare检查适用规则、前置阅读与当前SHA；delivery再检查落实记录、通过状态与证据文件/SHA。它只校验声明范围和证据完整性，无法判断声明是否诚实或自动判断画面/发音；执行者还必须核对用户实际范围与真实产物。项目初始化生成的prepare门槛置于生产预检之前；最终交付前另运行delivery。它补充原有H3、文本锁、音频、字幕、Remotion预检和导出审计，不替代它们，也不新增用户批准轮次。沿用已锁旧项目时先记录迁移/适用范围，不擅自重写其锁定合同。

## 维护与来源

每条规则只有一个权威维护来源。独立发行Skill需要自包含时携带一致快照，以registry的owner和SHA校对；分发快照不允许独立修改成第二套默认。H3只在原授权的运动生成、音频锁、服务器及源帧约束内覆盖基础实现，不得弱化文案/字幕/交付规范。专属例外有独立规则而不改共享快照。迁移后原强制文件从references删除，旧路径只在registry的legacyPaths保留定位映射。历史版本文字不是当前规则，旧ZIP验证替代后直接删除；不擅自改Git历史或远程发布。
