## Phase 1: 数据 + Contact 区域

- [x] 1.1 创建 `src/data/contact.ts`，导出 email 和 github 字段
- [x] 1.2 创建 `src/components/Contact.tsx`，section `id="contact"` + 标题「联系我」+ 邮箱和 GitHub 链接

## Phase 2: NavBar + 锚点 + ThemeToggle 调整

- [x] 2.1 创建 `src/components/NavBar.tsx`（sticky top-0, backdrop-blur, 左侧品牌名, 右侧三个锚点链接 + ThemeToggle）
- [x] 2.2 修改 `src/components/ThemeToggle.tsx`，移除 `fixed top-4 right-4` 定位类
- [x] 2.3 修改 `src/components/Hero.tsx`，在 `<section>` 上添加 `id="hero"`

## Phase 3: 集成 + 验证

- [x] 3.1 修改 `src/App.tsx`，NavBar 放在 ThemeProvider 内最顶部，Hero 下方添加 Contact
- [x] 3.2 验证全链路：导航链接点击平滑滚动 → 毛玻璃背景 → 亮/暗切换 → 移动端横向排列 → TypeScript 构建通过
