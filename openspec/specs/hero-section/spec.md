# Hero Section

## Purpose

全屏高度 Hero 区域，居中展示个人信息，CSS 渐变背景叠加 Canvas 静态粒子，支持亮/暗双色主题。

## Requirements

### Requirement: Hero Section 展示个人信息

系统 SHALL 在页面首屏渲染一个全屏高度（100dvh）的 Hero 区域，居中展示用户的姓名、职业、一句话介绍和一个 CTA 按钮。

#### Scenario: 正常渲染 Hero

- **GIVEN** 用户打开网站
- **WHEN** 页面加载完成
- **THEN** Hero 区域占据视口 100% 高度
- **THEN** 姓名以最大号字体居中显示
- **THEN** 职业和介绍文字紧随姓名下方
- **THEN** CTA 按钮「查看我的项目」展示在介绍文字下方

#### Scenario: 窗口缩放后保持全屏

- **GIVEN** Hero 区域已渲染
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Hero 区域高度始终等于新的视口高度（100dvh）

### Requirement: Canvas 静态粒子背景

Hero 区域 SHALL 在 CSS 渐变背景之上叠加一个 Canvas 元素，其中包含随机分布的静态粒子（圆点）。

#### Scenario: 粒子渲染

- **GIVEN** Hero 区域已渲染
- **WHEN** Canvas 组件挂载完成
- **THEN** Canvas 上渲染出不少于 60 个随机位置的圆点
- **THEN** 粒子颜色与当前主题（亮/暗）协调

#### Scenario: 窗口缩放后粒子重绘

- **GIVEN** Canvas 已有粒子渲染
- **WHEN** 用户调整浏览器窗口大小
- **THEN** Canvas 尺寸更新为新的容器尺寸
- **THEN** 粒子在更新后的画布上重新随机分布

#### Scenario: 移动端减少粒子数量（边界/性能）

- **GIVEN** 用户在移动设备上打开网站（屏幕宽度 < 768px）
- **WHEN** Canvas 组件挂载
- **THEN** 粒子数量不超过 40 个，以保证低性能设备渲染不卡顿

### Requirement: Canvas 适配 Retina 显示屏

Canvas 元素 SHALL 根据 `devicePixelRatio` 进行缩放，确保在高分屏上清晰显示。

#### Scenario: Retina 屏渲染

- **GIVEN** 设备 `devicePixelRatio` 大于 1
- **WHEN** Canvas 组件挂载
- **THEN** Canvas 内部分辨率为逻辑尺寸乘以 `devicePixelRatio`
- **THEN** 粒子圆点边缘清晰无锯齿

### Requirement: 无动画

Canvas 粒子 SHALL 为静态渲染，不执行任何动画循环。

#### Scenario: 无 RAF 循环

- **GIVEN** Hero 区域已渲染
- **WHEN** 开发者检查 Performance 面板或代码
- **THEN** 不存在 `requestAnimationFrame` 调用
- **THEN** 粒子位置在初始渲染后不再变化

### Requirement: Hero 亮/暗模式样式切换

Hero 区域 SHALL 根据当前主题切换 CSS 渐变背景色和 Canvas 粒子颜色。

#### Scenario: 从亮色切换到暗色

- **GIVEN** 当前为亮色模式，Hero 显示亮色渐变背景
- **WHEN** 用户切换为暗色模式
- **THEN** Hero 渐变背景立即切换为暗色色值
- **THEN** Canvas 粒子颜色切换为暗色对应的色值

#### Scenario: 从暗色切换到亮色

- **GIVEN** 当前为暗色模式
- **WHEN** 用户切换为亮色模式
- **THEN** Hero 渐变背景切换为亮色色值
- **THEN** Canvas 粒子颜色切换为亮色对应的色值

### Requirement: CTA 按钮锚点跳转

Hero 中的 CTA 按钮 SHALL 使用锚点链接 `#projects`，点击后平滑滚动至 Projects 区域。

#### Scenario: 点击 CTA 按钮跳转

- **GIVEN** Hero 和 Projects 区域均已渲染
- **WHEN** 用户点击「查看我的项目」按钮
- **THEN** 页面平滑滚动至 `id="projects"` 区域
- **THEN** URL hash 变为 `#projects`

#### Scenario: Projects 不存在时的降级（边界/异常）

- **GIVEN** 页面上没有 `#projects` 元素
- **WHEN** 用户点击 CTA 按钮
- **THEN** URL hash 变为 `#projects`，页面保持在当前位置
- **THEN** 不抛出异常或报错

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
