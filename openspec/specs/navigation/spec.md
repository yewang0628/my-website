# Navigation

## Purpose

固定顶部导航栏，毛玻璃背景，提供页面内锚点导航（首页/关于我/项目/联系我），集成 ThemeToggle，支持亮/暗双色主题。

## Requirements

### Requirement: 导航栏固定顶部

系统 SHALL 在页面顶部渲染一个 sticky 定位的导航栏，包含品牌名（左侧）、导航链接（右侧）和主题切换按钮。

#### Scenario: 导航栏正常渲染

- **GIVEN** 用户打开网站
- **WHEN** 页面加载完成
- **THEN** 顶部显示导航栏
- **THEN** 左侧显示品牌名/Logo
- **THEN** 右侧显示「首页」「关于我」「项目」「联系我」四个链接和主题切换按钮

#### Scenario: 滚动时导航栏保持固定

- **GIVEN** 导航栏已渲染
- **WHEN** 用户向下滚动页面
- **THEN** 导航栏保持在视口顶部（sticky 定位）
- **THEN** 页面内容在导航栏下方正常滚动

### Requirement: 导航栏毛玻璃背景

导航栏 SHALL 使用 `backdrop-blur` 实现毛玻璃半透明效果，并根据主题显示对应背景色。

#### Scenario: 亮色模式毛玻璃

- **GIVEN** 当前主题为 'light'
- **WHEN** 页面渲染
- **THEN** 导航栏背景为白色半透明 + 模糊效果

#### Scenario: 暗色模式毛玻璃

- **GIVEN** 当前主题为 'dark'
- **WHEN** 页面渲染
- **THEN** 导航栏背景为深色半透明 + 模糊效果

### Requirement: 导航链接锚点跳转

导航栏链接 SHALL 使用锚点 `<a href="#section">` 实现页面内平滑滚动跳转。

#### Scenario: 点击「项目」链接

- **GIVEN** 页面包含 `#projects` 元素
- **WHEN** 用户点击导航栏中的「项目」链接
- **THEN** 页面平滑滚动至 Projects 区域
- **THEN** URL hash 变为 `#projects`

#### Scenario: 点击「联系我」链接

- **GIVEN** 页面包含 `#contact` 元素
- **WHEN** 用户点击导航栏中的「联系我」链接
- **THEN** 页面平滑滚动至 Contact 区域
- **THEN** URL hash 变为 `#contact`

#### Scenario: 点击「首页」链接

- **GIVEN** 页面包含 `#hero` 元素
- **WHEN** 用户点击导航栏中的「首页」链接
- **THEN** 页面平滑滚动至 Hero 区域顶部

#### Scenario: 点击「关于我」链接

- **GIVEN** 页面包含 `#about` 元素
- **WHEN** 用户点击导航栏中的「关于我」链接
- **THEN** 页面平滑滚动至 About 区域
- **THEN** URL hash 变为 `#about`

#### Scenario: 目标锚点不存在时的降级（边界/异常）

- **GIVEN** 页面上没有目标 Section 的 `id`
- **WHEN** 用户点击导航链接
- **THEN** URL hash 变更，页面保持在当前位置
- **THEN** 不抛出异常或报错

### Requirement: ThemeToggle 在导航栏内

ThemeToggle SHALL 内嵌于导航栏右侧，而非独立固定定位。

#### Scenario: ThemeToggle 位置

- **GIVEN** 页面加载完成
- **WHEN** 用户查看导航栏右侧
- **THEN** ThemeToggle 按钮与其他导航链接在同一行
- **THEN** 点击 ThemeToggle 仍正常切换主题

### Requirement: 移动端适配

移动端导航栏 SHALL 保持横向排列，不使用折叠菜单。

#### Scenario: 移动端渲染

- **GIVEN** 屏幕宽度 < 768px
- **WHEN** 导航栏渲染
- **THEN** 所有元素保持横向排列
- **THEN** 链接文字和品牌名缩小以适配宽度
- **THEN** 不出现汉堡菜单图标
