## ADDED Requirements

### Requirement: Hero 区域锚点标识

Hero Section SHALL 在其根元素上包含 `id="hero"`，作为导航栏「首页」链接的锚点目标。

#### Scenario: 锚点跳转至 Hero

- **GIVEN** 用户已滚动至页面下方
- **WHEN** 用户点击导航栏中的「首页」链接
- **THEN** 页面平滑滚动至 Hero 区域顶部

#### Scenario: Hero 不存在时的降级（边界/异常）

- **GIVEN** 页面上没有 `id="hero"` 元素
- **WHEN** 用户点击「首页」链接
- **THEN** URL hash 变为 `#hero`，页面保持在当前位置
- **THEN** 不抛出异常或报错
