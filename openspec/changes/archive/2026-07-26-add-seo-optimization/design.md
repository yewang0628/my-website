## Context

当前 `index.html` 的 `<title>` 为占位值 `my-website`，`<html lang="en">` 未匹配实际中文内容。缺少 `<meta name="description">`、Open Graph 和 Twitter Card 标签。项目中所有 Section 组件已使用 `<section>` 语义标签，NavBar 使用 `<nav>`。

## Goals / Non-Goals

**Goals:**
- 设置正确的 `<title>` 和 `<meta name="description">`
- 添加 Open Graph 和 Twitter Card 社交分享标签
- 修正 `<html lang>` 为 `zh-CN`
- 创建 `robots.txt` 允许爬虫索引
- 确认现有组件语义化 HTML 审查通过

**Non-Goals:**
- 不添加联系我表单
- 不生成 sitemap.xml（仅 robots.txt 预留引用）
- 不集成 Google Analytics
- 不添加 JSON-LD 结构化数据

## Decisions

### Title 和 Description 内容

- **Title**: `Wang Ye — Full Stack Developer`（与 Hero 区域的姓名和职业一致）
- **Description**: 基于 `profile.intro` 扩展，约 150 字符以内，概括站点内容

**理由**: 直接复用已有 profile 信息保证一致性，无需新增数据源。

### Open Graph 标签选择

添加以下 og 标签：`og:title`、`og:description`、`og:type`（website）、`og:url`。同时添加 `twitter:card`（summary）。

**理由**: Open Graph 是社交分享事实标准（Facebook、LinkedIn、Discord 等均支持），Twitter Card 为 X/Twitter 补充。

### robots.txt 策略

使用宽松策略：`User-agent: *` + `Allow: /`，仅预留 Sitemap 引用。

**理由**: 个人品牌站希望最大化搜索引擎可见度，无需屏蔽任何路径。

### 语义化 HTML 审查

现有组件已符合要求：
- `<nav>` — NavBar
- `<section id="hero">` — Hero
- `<section id="about">` — About
- `<section id="projects">` — Projects
- `<section id="contact">` — Contact

无需修改组件代码。

## Risks / Trade-offs

- robots.txt 过于宽松可能被垃圾爬虫频繁抓取 → 对于静态站点影响极小，GitHub Pages 本身有速率限制
