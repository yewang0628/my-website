## ADDED Requirements

### Requirement: 项目数据集中管理

系统 SHALL 在 `src/data/projects.ts` 中维护项目数据数组，每个项目包含 title、description、tags、githubUrl（可选）、liveUrl（可选）字段。

#### Scenario: 正常读取项目数据

- **GIVEN** `projects.ts` 包含 3 个项目
- **WHEN** Projects 组件渲染
- **THEN** 页面展示 3 张项目卡片

#### Scenario: 项目数据为空（边界/异常）

- **GIVEN** `projects.ts` 导出空数组 `[]`
- **WHEN** Projects 组件渲染
- **THEN** 区域标题「项目」仍然显示
- **THEN** 卡片网格区域为空，不报错

### Requirement: 响应式卡片网格

Projects 区域 SHALL 使用 CSS Grid 布局展示项目卡片，在不同屏幕宽度下自动调整列数。

#### Scenario: 桌面端三列

- **GIVEN** 屏幕宽度 ≥ 1024px
- **WHEN** Projects 区域渲染
- **THEN** 卡片以 3 列网格排列

#### Scenario: 平板两列

- **GIVEN** 屏幕宽度在 768px-1023px 之间
- **WHEN** Projects 区域渲染
- **THEN** 卡片以 2 列网格排列

#### Scenario: 移动端单列

- **GIVEN** 屏幕宽度 < 768px
- **WHEN** Projects 区域渲染
- **THEN** 卡片以 1 列堆叠排列

#### Scenario: 单项目网格（边界/异常）

- **GIVEN** 仅 1 个项目
- **WHEN** Projects 区域渲染
- **THEN** 卡片居中显示，不拉伸占满整行

### Requirement: 卡片内容展示

每张项目卡片 SHALL 展示项目标题、简介、技术标签和可选的外部链接。

#### Scenario: 含完整信息的卡片

- **GIVEN** 项目包含 title、description、tags、githubUrl、liveUrl
- **WHEN** 卡片渲染
- **THEN** 标题和简介正确显示
- **THEN** 所有技术标签渲染为圆角标签
- **THEN** GitHub 链接按钮和在线预览按钮均可见

#### Scenario: 缺少链接的卡片（边界/异常）

- **GIVEN** 项目缺少 githubUrl 和 liveUrl
- **WHEN** 卡片渲染
- **THEN** 标题、简介、标签正常展示
- **THEN** 链接按钮区域为空，不显示空白占位

#### Scenario: 标签为空（边界/异常）

- **GIVEN** 项目的 tags 为空数组 `[]`
- **WHEN** 卡片渲染
- **THEN** 标题、简介正常展示
- **THEN** 标签区域为空，不报错

### Requirement: 亮/暗主题适配

项目卡片 SHALL 根据当前主题显示对应的背景色、文字色和标签色。

#### Scenario: 暗色模式下的卡片

- **GIVEN** 当前主题为 'dark'
- **WHEN** 卡片渲染
- **THEN** 卡片背景为深色 (`dark:bg-slate-800/80`)
- **THEN** 标题和简介文字为浅色
- **THEN** 技术标签使用暗色主题色系
