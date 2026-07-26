## Phase 1: 基础设施搭建

- [x] 1.1 创建 `src/data/profile.ts` 个人信息数据文件，导出 name/title/intro 字段
- [x] 1.2 配置 `vite.config.ts` 添加 `base: '/my-website/'`
- [x] 1.3 `src/index.css` 添加 `@custom-variant dark (&:where(.dark, .dark *));` 声明
- [x] 1.4 `index.html` 的 `<head>` 中添加防 FOUC 阻塞式 inline script
- [x] 1.5 创建 `src/components/ThemeProvider.tsx`（React Context，localStorage 持久化，系统偏好回退）

## Phase 2: Hero Section 实现

- [x] 2.1 创建 `src/components/ParticleCanvas.tsx`，Canvas 挂载时随机生成 80 个静态圆点
- [x] 2.2 ParticleCanvas 添加 `devicePixelRatio` Retina 适配
- [x] 2.3 ParticleCanvas 添加 `ResizeObserver`，窗口缩放时自动重绘
- [x] 2.4 ParticleCanvas 添加移动端降级：屏幕宽度 < 768px 时粒子数降至 40
- [x] 2.5 创建 `src/components/HeroContent.tsx`（全屏居中排版，展示 name/title/intro）
- [x] 2.6 创建 `src/components/Hero.tsx`（CSS 渐变背景 + 主题感知 + Canvas/Content 组合）

## Phase 3: ThemeToggle + 页面集成

- [x] 3.1 创建 `src/components/ThemeToggle.tsx`（button 元素，Sun/Moon SVG 图标，aria-label）
- [x] 3.2 重构 `src/App.tsx`（ThemeProvider 包裹 ThemeToggle + Hero）
- [x] 3.3 验证全链路：亮/暗切换 → CSS 渐变变化 → Canvas 粒子重绘 → localStorage 持久化
