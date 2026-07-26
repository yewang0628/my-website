## MODIFIED Requirements

### Requirement: 联系方式数据管理

系统 SHALL 在 `src/data/contact.ts` 中维护联系信息。

#### Scenario: 数据读取

- **GIVEN** `contact.ts` 导出 email 和 github 字段
- **WHEN** Contact 组件渲染
- **THEN** 邮箱显示为 wangye374127@gmail.com
- **THEN** GitHub 信息正确显示，指向 yewang0628
