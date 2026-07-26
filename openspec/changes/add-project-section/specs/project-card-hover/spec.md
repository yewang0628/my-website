## ADDED Requirements

### Requirement: 卡片 Hover 微上浮

项目卡片 SHALL 在鼠标悬浮时产生轻微上浮效果和阴影变化，提供视觉反馈。

#### Scenario: 鼠标悬浮触发特效

- **GIVEN** 页面展示项目卡片
- **WHEN** 鼠标指针移入卡片区域
- **THEN** 卡片向上移动 4px（`translateY(-4px)`）
- **THEN** 卡片阴影加深
- **THEN** 过渡动画在 300ms 内平滑完成

#### Scenario: 鼠标离开恢复

- **GIVEN** 卡片处于激活的 hover 状态
- **WHEN** 鼠标指针移出卡片区域
- **THEN** 卡片在 300ms 内恢复原位和原始阴影

#### Scenario: 触屏设备不触发 hover（边界/异常）

- **GIVEN** 用户在触屏设备上查看项目卡片
- **WHEN** 用户点击或触摸卡片
- **THEN** 卡片不发生上浮（触屏设备无持久 hover 状态）
- **THEN** 卡片始终保持原始位置和样式

#### Scenario: 亮暗主题下 hover 阴影区别

- **GIVEN** 当前为亮色模式
- **WHEN** 鼠标悬浮卡片
- **THEN** 阴影为中性灰色调

- **GIVEN** 当前为暗色模式
- **WHEN** 鼠标悬浮卡片
- **THEN** 阴影带有 cyan 色调 (`dark:hover:shadow-cyan-500/20`)
