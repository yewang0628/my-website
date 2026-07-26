# Contact Section

## Purpose

联系我区域，`id="contact"`，展示邮箱/GitHub 等联系方式，支持亮/暗主题。

## Requirements

### Requirement: Contact 区域展示

系统 SHALL 在页面上渲染一个 Contact 区域，`id="contact"`，展示用户的联系方式。

#### Scenario: 正常渲染

- **GIVEN** 页面包含 Contact 区域
- **WHEN** 页面加载完成
- **THEN** 区域标题「联系我」可见
- **THEN** 邮箱地址可见
- **THEN** GitHub 链接可见

#### Scenario: 锚点跳转至 Contact

- **GIVEN** 导航栏已渲染且含「联系我」链接
- **WHEN** 用户点击「联系我」
- **THEN** 页面平滑滚动至 `id="contact"` 区域

### Requirement: 联系方式数据管理

系统 SHALL 在 `src/data/contact.ts` 中维护联系信息。

#### Scenario: 数据读取

- **GIVEN** `contact.ts` 导出 email 和 github 字段
- **WHEN** Contact 组件渲染
- **THEN** 邮箱和 GitHub 信息正确显示在页面上

### Requirement: 亮/暗主题适配

Contact 区域 SHALL 根据当前主题显示对应的背景色和文字色。

#### Scenario: 暗色模式

- **GIVEN** 当前主题为 'dark'
- **WHEN** Contact 区域渲染
- **THEN** 背景和文字使用暗色主题色系
