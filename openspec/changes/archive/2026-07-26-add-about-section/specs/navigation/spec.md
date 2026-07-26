## MODIFIED Requirements

### Requirement: 导航链接锚点跳转

导航栏链接 SHALL 使用锚点 `<a href="#section">` 实现页面内平滑滚动跳转。

#### Scenario: 点击「首页」链接

- **GIVEN** 页面包含 `#hero` 元素
- **WHEN** 用户点击导航栏中的「首页」链接
- **THEN** 页面平滑滚动至 Hero 区域顶部

#### Scenario: 点击「关于我」链接

- **GIVEN** 页面包含 `#about` 元素
- **WHEN** 用户点击导航栏中的「关于我」链接
- **THEN** 页面平滑滚动至 About 区域
- **THEN** URL hash 变为 `#about`

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

#### Scenario: 目标锚点不存在时的降级（边界/异常）

- **GIVEN** 页面上没有目标 Section 的 `id`
- **WHEN** 用户点击导航链接
- **THEN** URL hash 变更，页面保持在当前位置
- **THEN** 不抛出异常或报错

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
