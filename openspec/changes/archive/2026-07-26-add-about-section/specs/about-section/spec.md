## ADDED Requirements

### Requirement: About 区域渲染

系统 SHALL 在页面上渲染一个 About 区域，`id="about"`，展示个人照片、简介文字和品牌标签。

#### Scenario: 正常渲染

- **GIVEN** 页面包含 About 区域
- **WHEN** 页面加载完成
- **THEN** 区域左侧显示个人照片（圆形裁切）
- **THEN** 区域右侧显示 3 段简介文字
- **THEN** 区域下方显示品牌标签列表

#### Scenario: 桌面端双栏布局

- **GIVEN** 屏幕宽度 ≥ 768px
- **WHEN** About 区域渲染
- **THEN** 照片和简介文字呈左右双栏排列
- **THEN** 照片在左，文字在右

#### Scenario: 移动端单栏堆叠

- **GIVEN** 屏幕宽度 < 768px
- **WHEN** About 区域渲染
- **THEN** 照片和简介上下堆叠
- **THEN** 照片居中显示

### Requirement: 关于我数据管理

系统 SHALL 在 `src/data/about.ts` 中维护关于我信息，包含简介段落数组和品牌标签数组。

#### Scenario: 数据读取

- **GIVEN** `about.ts` 导出 `bioParagraphs`（string[]）和 `brandTags`（string[]）
- **WHEN** About 组件渲染
- **THEN** 简介段落和品牌标签正确显示在页面上

#### Scenario: 简介段落为空（边界/异常）

- **GIVEN** `bioParagraphs` 为空数组 `[]`
- **WHEN** About 组件渲染
- **THEN** 区域标题「关于我」仍然显示
- **THEN** 照片和品牌标签正常展示
- **THEN** 简介文字区域为空，不报错

### Requirement: 品牌标签展示

系统 SHALL 在简介下方以圆角 pill 样式展示品牌标签。

#### Scenario: 多个标签

- **GIVEN** `brandTags` 包含多个标签
- **WHEN** About 区域渲染
- **THEN** 所有标签以水平排列的 pill 样式展示
- **THEN** 标签数量超出宽度时自动换行

#### Scenario: 标签为空（边界/异常）

- **GIVEN** `brandTags` 为空数组 `[]`
- **WHEN** About 区域渲染
- **THEN** 标签区域为空，不影响其他内容
- **THEN** 不抛出异常

### Requirement: 照片懒加载与降级

系统 SHALL 对照片使用 `loading="lazy"` 懒加载，并在照片加载失败时显示占位背景。

#### Scenario: 照片懒加载

- **GIVEN** About 区域包含照片
- **WHEN** 页面加载
- **THEN** 照片使用 `loading="lazy"` 属性
- **THEN** 照片在进入视口前不发起网络请求

#### Scenario: 照片加载失败（边界/异常）

- **GIVEN** 照片资源不存在或加载失败
- **WHEN** 页面加载完成
- **THEN** 照片区域显示渐变背景占位
- **THEN** 页面不崩溃，其他内容正常展示

### Requirement: 亮/暗主题适配

About 区域 SHALL 根据当前主题显示对应的背景色和文字色。

#### Scenario: 暗色模式

- **GIVEN** 当前主题为 'dark'
- **WHEN** About 区域渲染
- **THEN** 背景和文字使用暗色主题色系
- **THEN** 品牌标签使用暗色主题色系

#### Scenario: 亮色模式

- **GIVEN** 当前主题为 'light'
- **WHEN** About 区域渲染
- **THEN** 背景和文字使用亮色主题色系

### Requirement: 锚点跳转至 About

导航栏中的「关于我」链接 SHALL 使用 `href="#about"`，点击后平滑滚动至 About 区域。

#### Scenario: 点击「关于我」链接

- **GIVEN** 页面包含 `#about` 元素
- **AND** 导航栏包含「关于我」链接
- **WHEN** 用户点击导航栏中的「关于我」链接
- **THEN** 页面平滑滚动至 About 区域
- **THEN** URL hash 变为 `#about`

#### Scenario: About 不存在时的降级（边界/异常）

- **GIVEN** 页面上没有 `id="about"` 元素
- **WHEN** 用户点击「关于我」链接
- **THEN** URL hash 变为 `#about`，页面保持在当前位置
- **THEN** 不抛出异常或报错
