# Theme System

## Purpose

亮/暗主题切换系统，支持 React Context 全局状态管理、localStorage 持久化、系统偏好检测与响应、防 FOUC 闪烁。

## Requirements

### Requirement: 主题状态管理

系统 SHALL 通过 ThemeProvider（React Context）管理全局主题状态，提供当前主题值和切换函数给所有子组件。

#### Scenario: 首次访问使用系统偏好

- **GIVEN** 用户首次访问网站（localStorage 中无 theme 值）
- **AND** 系统偏好为暗色模式
- **WHEN** 页面加载
- **THEN** 主题初始化为 'dark'
- **THEN** `<html>` 元素包含 `class="dark"`

#### Scenario: localStorage 优先级高于系统偏好

- **GIVEN** 用户之前手动选择了 'light'（localStorage 中 theme = 'light'）
- **AND** 系统偏好为暗色模式
- **WHEN** 页面加载
- **THEN** 主题初始化为 'light'
- **THEN** `<html>` 元素不包含 `class="dark"`

### Requirement: 主题切换

用户 SHALL 能够通过 ThemeToggle 按钮在亮色和暗色模式之间切换。

#### Scenario: 从亮色切换到暗色

- **GIVEN** 当前主题为 'light'
- **WHEN** 用户点击 ThemeToggle 按钮
- **THEN** 主题变为 'dark'
- **THEN** `<html>` 元素添加 `class="dark"`
- **THEN** localStorage 中 `theme` 值为 'dark'

#### Scenario: 从暗色切换到亮色

- **GIVEN** 当前主题为 'dark'
- **WHEN** 用户点击 ThemeToggle 按钮
- **THEN** 主题变为 'light'
- **THEN** `<html>` 元素移除 `class="dark"`
- **THEN** localStorage 中 `theme` 值为 'light'

### Requirement: 防 FOUC（初始闪烁）

系统 SHALL 在 HTML `<head>` 中包含阻塞式 inline script，在 DOM 渲染前根据 localStorage 或系统偏好设置 `<html>` 的 class。

#### Scenario: 暗色模式用户无闪烁

- **GIVEN** localStorage 中 `theme = 'dark'`
- **WHEN** 页面开始加载
- **THEN** `<html class="dark">` 在页面首次渲染前已设置
- **THEN** 用户不会看到亮色主题短暂出现再切换为暗色

#### Scenario: localStorage 为空时无闪烁

- **GIVEN** localStorage 中无 theme 值
- **AND** 系统偏好为暗色模式
- **WHEN** 页面开始加载
- **THEN** `<html class="dark">` 在页面首次渲染前已设置

### Requirement: 系统偏好变化响应

系统 SHALL 在用户未手动选择主题时，响应操作系统层面的主题切换。

#### Scenario: 系统偏好变更（用户未手动选择）

- **GIVEN** 用户未手动选择过主题（localStorage 中无 theme 值）
- **AND** 当前系统偏好为 'light'
- **WHEN** 用户在 OS 层面切换为暗色模式
- **THEN** 主题自动变为 'dark'
- **THEN** `<html>` 元素添加 `class="dark"`

#### Scenario: 系统偏好变更（用户已手动选择，覆盖规则）

- **GIVEN** 用户手动选择了 'light'（localStorage 中 theme = 'light'）
- **WHEN** 用户在 OS 层面切换为暗色模式
- **THEN** 主题保持 'light'
- **THEN** `<html>` 元素不包含 `class="dark"`

### Requirement: ThemeToggle 可访问性

ThemeToggle 按钮 SHALL 使用原生 `<button>` 元素，并提供可被屏幕阅读器识别的标签。

#### Scenario: 键盘操作

- **GIVEN** ThemeToggle 按钮已渲染
- **WHEN** 用户通过 Tab 键聚焦到按钮并按下 Enter 或 Space
- **THEN** 主题切换行为与点击一致

#### Scenario: localStorage 不可用时的降级（边界/异常）

- **GIVEN** 浏览器 localStorage 不可用（隐私模式或配额已满）
- **WHEN** 用户点击 ThemeToggle 按钮
- **THEN** 主题仍然在当前会话中切换（内存状态变更）
- **THEN** `<html>` class 正常更新
- **THEN** 不会抛出异常导致页面崩溃
