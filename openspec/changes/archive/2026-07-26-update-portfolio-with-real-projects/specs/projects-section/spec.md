## MODIFIED Requirements

### Requirement: 项目数据集中管理

系统 SHALL 在 `src/data/projects.ts` 中维护项目数据数组，每个项目包含 title、description、tags、githubUrl（可选）、liveUrl（可选）字段。

#### Scenario: 正常读取项目数据

- **GIVEN** `projects.ts` 包含 Fin-MCP 等真实项目
- **WHEN** Projects 组件渲染
- **THEN** 页面展示对应数量的项目卡片

#### Scenario: 项目数据为空（边界/异常）

- **GIVEN** `projects.ts` 导出空数组 `[]`
- **WHEN** Projects 组件渲染
- **THEN** 区域标题「项目」仍然显示
- **THEN** 卡片网格区域为空，不报错
