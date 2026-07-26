## Context

Hero、Projects、Contact 三个 Section 已存在或将在本 change 中创建。需要顶部导航栏提供跨 Section 的锚点导航，统一页面内跳转体验。

## Goals / Non-Goals

**Goals:**
- 固定顶部导航栏，`sticky top-0`，毛玻璃背景
- 左侧 Logo/姓名，右侧三个锚点链接（首页→#hero、项目→#projects、联系我→#contact）
- 导航链接点击平滑滚动至目标 Section
- ThemeToggle 移入导航栏右侧（统一全局控件位置）
- Contact 占位 Section，包含邮箱和 GitHub 链接
- 亮/暗双色适配

**Non-Goals:**
- 不做汉堡/折叠菜单（移动端保持横向排列）
- 不做当前 Section 高亮（active link）
- 不做搜索
- 不做下拉菜单

## Decisions

### 1. NavBar 布局

```
┌──────────────────────────────────────────────────┐
│  ◉ Wang Ye    首页  项目  联系我  ☀/🌙          │
│  (sticky top-0, backdrop-blur, z-40)             │
└──────────────────────────────────────────────────┘
```

- 定位：`sticky top-0 z-40`
- 背景：`bg-white/80 dark:bg-slate-900/80 backdrop-blur-md`
- 高度：`h-16`
- 左侧：品牌名（`text-lg font-bold`）
- 右侧：3 个 `<a>` 链接 + ThemeToggle

### 2. 锚点链接实现

使用原生 `<a href="#section">`（与现有 CTA 按钮一致），依赖 `scroll-behavior: smooth`（已在 `index.css` 中设置），零 JS。

各 Section 已存在的 `id`：
- Hero → 新增 `id="hero"` 至 `<section>`
- Projects → 已有 `id="projects"`
- Contact → 新建 `id="contact"`

### 3. ThemeToggle 位置调整

ThemeToggle 从独立固定定位移入 NavBar 内部，移除其 `fixed top-4 right-4` 定位类，改为 NavBar flex 布局内一个按钮。

**理由**：导航栏承载所有全局控件时，游离的 ThemeToggle 显得割裂。统一在 NavBar 内更整洁。

### 4. 移动端适配

不做汉堡菜单（out-of-scope）。移动端处理方式：
- 导航链接间距缩小（`gap-4` → `gap-3`）
- 品牌名缩小（`text-lg` → `text-base`）
- 链接文字缩小（`text-sm`）
- 所有元素保持横向排列

### 5. Contact 区域

```
┌──────────────────────────────────────────┐
│            联系我                         │
│                                          │
│    ✉ wangye@example.com                 │
│    📁 github.com/wangye                 │
└──────────────────────────────────────────┘
```

数据来源：`src/data/contact.ts`，导出 email 和 github 字段。

### 6. 组件树变更

```
App
└── ThemeProvider
    ├── NavBar                    ← 新建，sticky
    │   ├── Logo (name)
    │   ├── NavLinks (a×3)
    │   └── ThemeToggle           ← 从 App 层移入
    ├── Hero          (#hero)     ← 新增 id
    ├── Projects      (#projects) ← 已存在
    └── Contact       (#contact)  ← 新建
```

## Risks / Trade-offs

- **移动端无折叠** → 3 个短链接横向排列在 320px 宽度下仍可容纳（约 180px），不溢出
- **ThemeToggle 移入 NavBar** → 需修改 ThemeToggle 组件，去除固定定位类
- **锚点 hash 污染 URL** → 与现有 CTA 行为一致，可接受
