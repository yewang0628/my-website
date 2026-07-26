## MODIFIED Requirements

### Requirement: 关于我数据管理

系统 SHALL 在 `src/data/about.ts` 中维护关于我信息，包含简介段落数组和品牌标签数组。

#### Scenario: 数据读取

- **GIVEN** `about.ts` 导出 `bioParagraphs`（string[]）和 `brandTags`（string[]）
- **WHEN** About 组件渲染
- **THEN** 简介段落内容反映真实 AI/金融科技项目经验
- **THEN** 品牌标签正确显示在页面上

#### Scenario: 简介段落为空（边界/异常）

- **GIVEN** `bioParagraphs` 为空数组 `[]`
- **WHEN** About 组件渲染
- **THEN** 区域标题「关于我」仍然显示
- **THEN** 照片和品牌标签正常展示
- **THEN** 简介文字区域为空，不报错
