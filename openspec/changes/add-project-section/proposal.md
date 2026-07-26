## Why

当前项目展示区（Projects Section）已具备基础的卡片布局和内容展示，但缺少项目截图的视觉表达和交互反馈（hover 微特效），且仅有 3 个项目，不足以充分展示个人作品。同时需要确认 Hero CTA 锚点跳转的正确性。

## What Changes

- 项目数据模型新增 `screenshot` 字段，支持为每个项目配置截图
- 项目卡片新增截图展示区域，使用 lazy loading 加载图片
- 项目卡片新增 hover 微特效（轻微上浮 + 阴影变化）
- 项目数据扩展至最少 4 个
- 确认 Hero CTA 按钮 `#projects` 锚点跳转正常工作

## Capabilities

### New Capabilities
- `project-card-hover`: 项目卡片的 hover 微交互特效

### Modified Capabilities
- `projects-section`: 新增截图字段和展示、项目数量下限从 3 调整为 4

## Impact

- `src/data/projects.ts` — Project 接口新增 `screenshot` 可选字段，数据新增第 4 个项目
- `src/components/ProjectCard.tsx` — 新增截图展示区域、hover 特效样式
- `src/components/HeroContent.tsx` — 无需修改（CTA 已指向 `#projects`）
