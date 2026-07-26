## Context

当前项目展示区已实现基础卡片布局（`Projects.tsx` + `ProjectCard.tsx`），包含标题、简介、标签和外部链接。本次变更在此基础上增强视觉表达和交互反馈。

## Goals / Non-Goals

**Goals:**
- 项目卡片新增截图展示区域
- 项目卡片新增 hover 微特效
- 扩展项目数据至 4 个
- 确认 Hero CTA `#projects` 锚点跳转

**Non-Goals:**
- 项目详情页
- 项目搜索/筛选功能

## Decisions

### 1. 截图数据模型

在 `Project` 接口中新增可选字段 `screenshot?: string`。截图图片存放在 `public/images/projects/` 目录下。

**替代方案**: 将截图路径写死在组件中 → 不采用，灵活性差，每个项目截图不同。

### 2. Hover 特效方案

使用 Tailwind CSS 的 `transition` + `hover:` 变体实现：
- `hover:-translate-y-1` — 轻微上浮（4px）
- `hover:shadow-lg` / `hover:shadow-cyan-500/20` — 阴影增强，暗色模式适配
- `transition-all duration-300` — 平滑过渡

无需引入额外动画库，纯 CSS 即可满足需求。

**替代方案**: Framer Motion → 不采用，微特效不需要额外 30KB+ 依赖。

### 3. 截图加载

使用原生 `<img loading="lazy">` 实现懒加载，无需 Intersection Observer 或额外库。首次渲染在视口外的卡片图片不阻塞首屏性能。

### 4. 第 4 个项目

在 `projects.ts` 中新增一个代表性项目条目，数据由用户提供或使用占位示例数据。

## Risks / Trade-offs

- 截图文件大小可能影响 LCP → 使用 WebP 格式，建议控制在 100KB 以内
- 移动端 hover 无效 → 使用 `@media (hover: hover)` 或 Tailwind `hover:` 自动处理（触屏设备无 hover 状态，fallback 为静态展示，无影响）
