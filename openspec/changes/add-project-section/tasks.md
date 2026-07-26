## 1. 数据层改造

- [x] 1.1 更新 `Project` 接口，新增 `screenshot?: string` 可选字段
- [x] 1.2 在 `projects.ts` 中添加第 4 个项目条目（含截图路径）
- [x] 1.3 在 `public/images/projects/` 中准备 4 个项目截图占位图片

## 2. ProjectCard 组件改造

- [x] 2.1 卡片顶部新增截图展示区域，使用 `<img loading="lazy">`，截图加载失败时显示渐变占位背景
- [x] 2.2 卡片根元素添加 hover 微特效（`hover:-translate-y-1` + `hover:shadow-lg` + 过渡动画），暗色模式下适配 cyan 色调阴影

## 3. 验证与收尾

- [x] 3.1 确认 Hero CTA 按钮 `href="#projects"` 锚点跳转正常
- [x] 3.2 验证全场景：4 张卡片展示、截图懒加载、hover 特效、亮暗主题切换、移动端响应式
