## Why

当前 `index.html` 仅有占位 title（`my-website`），缺少 meta description、Open Graph 标签和 robots.txt，导致搜索引擎无法正确索引页面内容，社交平台分享时也无法显示富媒体卡片。站点上线前需要完成这些基础 SEO 配置。

## What Changes

- 更新 `index.html`：修正 `lang="zh-CN"`，设置有意义的 `<title>` 和 `<meta name="description">`
- 添加 Open Graph 标签（`og:title`、`og:description`、`og:type`、`og:url`）和 Twitter Card，支持社交分享富媒体展示
- 新建 `public/robots.txt`，允许所有爬虫索引，指定 Sitemap（预留）
- 审查现有组件的语义化 HTML，确认已正确使用 `<nav>`、`<section>`、`<h1>`-`<h2>` 等标签

## Capabilities

### New Capabilities
- `seo`: SEO 基础优化，包含 meta 标签、Open Graph、robots.txt，确保搜索引擎和社交平台正确解析站点信息

### Modified Capabilities
<!-- None — 现有组件已使用语义化标签，无需修改 spec 级行为 -->

## Impact

- 修改文件：`index.html`（meta 标签更新）
- 新建文件：`public/robots.txt`
- 不涉及组件代码或 TypeScript 修改
- 不影响现有任何功能

## Out of Scope

- 不添加联系我表单
- 不实现 Sitemap XML 自动生成（仅在 robots.txt 中预留引用）
- 不添加 Google Analytics 或其他第三方追踪脚本
- 不集成 JSON-LD 结构化数据
