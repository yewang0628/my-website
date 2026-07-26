## Why

个人品牌站当前仅有一个占位页面，缺少视觉辨识度和主题切换能力。Hero Section 是访客抵达后的第一印象，需要体现"科技粒子风"的设计定位，同时建立亮/暗模式的切换入口。

## What Changes

- 新增全屏高度 Hero Section，居中展示姓名、职业、一句话介绍
- 新增 CSS 渐变背景（亮/暗双色），叠加 Canvas 静态粒子层
- 新增亮/暗主题切换系统（ThemeProvider + localStorage 持久化 + 系统偏好回退）
- 新增 ThemeToggle 按钮组件，控制主题切换
- 新增 `src/data/profile.ts`，集中管理个人信息字段
- 配置 `vite.config.ts` 的 `base: '/my-website/'`
- **BREAKING**: 无

## Capabilities

### New Capabilities

- `hero-section`: 全屏高度 Hero 区域，包含个人信息展示、CSS 渐变背景、Canvas 静态粒子叠加层
- `theme-system`: 亮/暗主题切换，支持 localStorage 持久化、系统偏好回退、Tailwind `dark:` 前缀响应

### Modified Capabilities

（无，当前 `openspec/specs/` 为空）

## Impact

| 影响范围 | 说明 |
|-----------|------|
| `src/App.tsx` | 重构为包含 Hero 的布局结构 |
| `src/components/` | 新增 Hero、ParticleCanvas、ThemeToggle、ThemeProvider |
| `src/data/profile.ts` | 新增个人信息数据文件 |
| `src/index.css` | 新增 `@custom-variant dark` 声明 |
| `vite.config.ts` | 新增 `base: '/my-website/'` |
| `package.json` | 无新增依赖 |
| 现有功能 | 占位页面被替换，无破坏性影响 |

## Out of Scope

- **不做动画效果**：Canvas 粒子为静态渲染（随机位置、固定不动），不实现粒子移动、连线、鼠标交互
- **不做导航栏**：本次不涉及 Header/NavBar 组件
- **不做后端 API**：所有数据为本地静态数据（`src/data/profile.ts`）
- 不做 Projects 区域（不含锚点跳转和内容区）
- 不做粒子性能调优面板
- 不做粒子 Canvas 的单元测试
