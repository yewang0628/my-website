## Phase 1: 数据层 + CTA 按钮

- [x] 1.1 创建 `src/data/projects.ts`，导出 3 个占位项目（title/description/tags/githubUrl/liveUrl）
- [x] 1.2 `src/index.css` 添加 `html { scroll-behavior: smooth; }` 全局平滑滚动
- [x] 1.3 修改 `src/components/HeroContent.tsx`，在 intro 下方新增 CTA 按钮「查看我的项目」（`<a href="#projects">` + 向下箭头 SVG）

## Phase 2: 卡片组件

- [x] 2.1 创建 `src/components/ProjectCard.tsx`，展示 title/description/tags/链接按钮，处理链接缺失和 tags 为空
- [x] 2.2 创建 `src/components/Projects.tsx`，section 标题 + 响应式 grid 容器 + `id="projects"` 锚点 + `scroll-mt-16`

## Phase 3: 集成 + 验证

- [x] 3.1 修改 `src/App.tsx`，在 Hero 下方引入 Projects 组件
- [x] 3.2 验证全链路：CTA 点击平滑滚动 → 卡片正常渲染 → 亮/暗切换卡片样式跟随 → 移动端单列 → TypeScript 构建通过
