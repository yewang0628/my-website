## Context

当前网站包含 Hero、Projects、Contact 三个 Section，采用分区滚动布局。每个 Section 使用 `id` 锚点 + `scroll-mt-16` 配合 sticky 导航栏实现平滑跳转。数据与组件分离，数据文件放在 `src/data/` 目录。

## Goals / Non-Goals

**Goals:**
- 新增「关于我」Section，位于 Hero 下方、Projects 上方
- 左右双栏布局（桌面端），移动端上下堆叠
- 左侧展示个人照片，右侧展示 3 段简介文字，下方展示品牌标签
- 导航栏新增「关于我」入口

**Non-Goals:**
- 不添加联系表单（out of scope）
- 不添加照片动画/轮播
- 不添加社交媒体链接

## Decisions

### 数据与组件分离

沿用现有模式：数据文件 `src/data/about.ts`，组件 `src/components/About.tsx`。数据文件导出 `bioParagraphs: string[]` 和 `brandTags: string[]`。

**理由**: 与 `profile.ts`、`projects.ts`、`contact.ts` 保持一致，数据修改不需要触及组件。

### 左右双栏布局

桌面端 (`md+`) 使用 `flex-row`，左侧照片 `w-48` 固定宽度，右侧文字 `flex-1`。移动端 `flex-col` 上下堆叠。

**理由**: 双栏布局是「关于我」的经典模式，信息密度适中。

### 品牌标签展示在简介下方

标签使用 `flex flex-wrap gap-2` 排列，每个标签为圆角 pill 样式。与 ProjectCard 中的技术标签风格一致（`rounded-full bg-purple-100 dark:bg-cyan-900/30`）。

### 照片处理

使用已有 `src/assets/hero.png` 作为照片，`rounded-full` 圆形裁切并添加边框。使用 `loading="lazy"` 懒加载。

### 导航栏修改

在 NavBar 的 `links` 数组中插入 `{ label: '关于我', href: '#about' }`，位于「首页」之后、「项目」之前。

## Risks / Trade-offs

- 照片文件较大可能影响首屏 → 使用 lazy loading + 合适的图片尺寸
- 3 段简介文字长度不确定 → 文字区域设置 `max-w-prose` 保证可读性
