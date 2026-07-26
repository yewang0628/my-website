## Context

当前项目为 Vite + React + Tailwind CSS v4 脚手架，仅有一个占位 `App.tsx`。需从零搭建 Hero Section 和主题系统，无历史包袱。

## Goals / Non-Goals

**Goals:**
- 全屏高度 Hero，居中展示个人信息（姓名、职业、介绍）
- CSS 渐变背景 + Canvas 静态粒子叠加
- 亮/暗主题切换，状态持久化到 localStorage，回退系统偏好

**Non-Goals:**
- 不做粒子动画（静止渲染，无 requestAnimationFrame 循环）
- 不做导航栏
- 不做后端 API
- 不做粒子单元测试

## Decisions

### 1. Canvas 粒子：纯静态渲染

**选择**：组件挂载时在 Canvas 上随机生成 80 个圆点，不启动 RAF 循环。

**理由**：out-of-scope 明确排除了动画。静态粒子只需一次 `fillRect` 循环 + `ResizeObserver` 响应窗口缩放，实现简单且零 CPU 开销。

**备选方案**：tsparticles 库 → 被否决，体积大（~50KB gzip）且其核心价值在动画/交互，静态场景下性价比极低。

### 2. 组件树

```
App
└── ThemeProvider          ← context：下发 theme + toggleTheme
    ├── ThemeToggle        ← 固定定位，右上角，使用 Sun/Moon SVG 图标
    └── Hero
        ├── ParticleCanvas ← absolute 覆盖，z-0
        └── HeroContent    ← relative，z-10，文字内容
```

ThemeToggle 放在 App 层（非 Hero 内部），因为主题切换是全局行为，Hero 只是消费者之一。

### 3. ThemeProvider 设计

```
localStorage("theme")
    │  优先级：手动选择 > 系统偏好 > 'light'
    ▼
ThemeContext
    ├── theme: 'light' | 'dark'
    ├── toggleTheme: () => void
    └── 副作用：
        ├── document.documentElement.classList.toggle('dark')
        └── localStorage.setItem('theme', newTheme)
```

**初始化逻辑**：
1. 读取 `localStorage.getItem('theme')`
2. 如果有值 → 使用该值
3. 如果无值 → 读取 `window.matchMedia('(prefers-color-scheme: dark)').matches` → 'dark' 或 'light'
4. 非阻塞 inlined `<script>` 放在 `<head>` 中，防止 FOUC 闪烁

### 4. 暗色模式实现方式

Tailwind CSS v4 使用 `@custom-variant` 声明 dark mode。在 `index.css` 中：

```css
@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));
```

之后所有 Tailwind 的 `dark:` 前缀将基于 `<html class="dark">` 生效。

### 5. CSS 渐变配色

| 主题 | 渐变方向 | 色值 |
|------|----------|------|
| Light | 左上→右下 (135deg) | `#e0e7ff` → `#fae8ff` → `#e0f2fe` (indigo-100 → fuchsia-50 → sky-50) |
| Dark  | 左上→右下 (135deg) | `#0f172a` → `#1e1b4b` → `#0f172a` (slate-900 → indigo-950 → slate-900) |

Canvas 粒子颜色与渐变协调：亮色模式用 `#6366f1`（indigo-500，不透明度 0.3），暗色模式用 `#6366f1`（indigo-400，不透明度 0.25）。

### 6. 个人信息数据管理

`src/data/profile.ts` 导出纯对象：

```ts
export const profile = {
  name: '...',
  title: '...',
  intro: '...',
}
```

组件直接 import，不做异步 fetch。后续可替换为 CMS 数据源而不影响组件。

### 7. 防 FOUC 策略

在 `index.html` 的 `<head>` 中放置阻塞式 inline script：

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    if (t === 'dark') document.documentElement.classList.add('dark');
  })();
</script>
```

该脚本在 DOM 渲染前执行，避免白屏瞬间先显示亮色再切换到暗色。

## Risks / Trade-offs

- **静态粒子无动画** → 理解风险：用户可能预期粒子会动。设计上通过"科技感配色 + 粒子密度"弥补静态不足
- **Canvas 模糊** → Retina 屏需 `devicePixelRatio` 缩放的 Canvas，代码约多 5 行，采用
- **vite.config.ts base 路径** → 修改后 `dev` 模式下所有资源也走 `/my-website/` 前缀，开发体验一致
- **ThemeProvider 初始 hydration mismatch** → SSR 不存在（GitHub Pages 纯静态），不适用

## Open Questions

（无）
