## 1. HTML Meta 标签

- [x] 1.1 更新 `index.html`：修正 `lang="zh-CN"`，设置 `<title>` 为 `Wang Ye — Full Stack Developer`，添加 `<meta name="description">`
- [x] 1.2 在 `index.html` 中添加 Open Graph 标签（`og:title`、`og:description`、`og:type`、`og:url`）和 Twitter Card（`twitter:card`）

## 2. robots.txt

- [x] 2.1 创建 `public/robots.txt`，设置 `User-agent: *` + `Allow: /`，预留 Sitemap 引用

## 3. 语义化 HTML 审查

- [x] 3.1 审查现有组件：确认 NavBar 使用 `<nav>`，各 Section 使用 `<section id="...">`，标题使用 `<h1>`/`<h2>` 层级

## 4. 验证

- [x] 4.1 启动开发服务器，验证 `<title>` 和 meta 标签渲染正确，`/robots.txt` 可访问，语义标签审查通过
