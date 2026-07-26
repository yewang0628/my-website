## Context

Hero Section 和 Theme System 已实现。当前访客看到 Hero 后无后续内容，需要通过 CTA 按钮引导至项目展示区。

## Goals / Non-Goals

**Goals:**
- HeroContent 新增 CTA 按钮，锚点平滑滚动至 `#projects`
- Projects 区域：section 标题 + 响应式卡片网格
- 每张卡片：标题、简介、技术标签、GitHub/在线链接（可选）
- 支持亮/暗主题，与现有 ThemeProvider 集成

**Non-Goals:**
- 不做项目详情页/弹窗
- 不做项目截图
- 不做卡片入场动画
- 不做导航栏

## Decisions

### 1. CTA 按钮：语义化锚点

使用 `<a href="#projects">` 而非 JS `scrollIntoView()`，原因：
- 零 JS 依赖，更可靠
- URL hash 可分享（`/#projects` 直达项目区）
- 支持 `scroll-behavior: smooth`（在 `<html>` 上加 CSS）

```css
html { scroll-behavior: smooth; }
```

### 2. 卡片布局：CSS Grid 自动适配

```
lg (≥1024px): 3 列
md (≥768px):  2 列
sm (<768px):   1 列
```

使用 `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`，无需 JS 计算。

### 3. 卡片设计

```
┌──────────────────────────────┐
│  项目标题                     │
│  简介（最多两行，灰色）        │
│                              │
│  [React] [TypeScript] [Vite] │  ← 技术标签
│                              │
│  🌐 在线链接    📁 GitHub    │  ← 可选链接按钮
└──────────────────────────────┘
```

- 背景：白色半透明卡片 (`bg-white/80 dark:bg-slate-800/80`)
- 边框：`border border-gray-200 dark:border-slate-700`
- 圆角：`rounded-xl`
- 标签：`text-xs rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300`
- 链接按钮：图标 + 文字，仅在有值时渲染

### 4. 数据模型

```ts
interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string  // 可选，缺失时不渲染 GitHub 按钮
  liveUrl?: string    // 可选，缺失时不渲染在线预览按钮
}
```

初始 3 个占位项目。

### 5. 页面滚动行为

在 `index.css` 中添加全局平滑滚动：

```css
html {
  scroll-behavior: smooth;
}
```

CTA 按钮使用原生 `<a href="#projects">`，浏览器自动处理平滑滚动。

### 6. Projects 区域背景

- 亮色：`bg-gray-50`（浅灰底，与 Hero 白色文字区分）
- 暗色：`bg-slate-900`（深色底，与 Hero 暗色背景一致）

区域使用 `id="projects"` 作为锚点目标，添加 `scroll-mt-16` 防止锚点定位时内容被遮挡。

## Risks / Trade-offs

- **卡片无截图** → 纯文字卡片视觉吸引力不足，依赖排版和配色弥补
- **锚点跳转** → 移动端地址栏可能遮挡标题，通过 `scroll-mt-16` 补偿
- **静态数据** → 用户需手动编辑 `projects.ts`，暂无 CMS 集成
