## ADDED Requirements

### Requirement: HTML Meta 标签

系统 SHALL 在 `index.html` 中设置正确的文档语言、标题和描述 meta 标签。

#### Scenario: 页面标题

- **GIVEN** 用户或爬虫访问网站
- **WHEN** 解析 HTML `<head>`
- **THEN** `<title>` 包含站主姓名和职业（非占位文本 `my-website`）
- **THEN** `<meta name="description">` 存在且内容非空
- **THEN** `<html lang>` 设置为 `zh-CN`

#### Scenario: 标题缺失时的降级（边界/异常）

- **GIVEN** `index.html` 被修改
- **WHEN** `<title>` 标签被误删
- **THEN** 浏览器标签页显示 URL 或默认标题
- **THEN** 页面正常渲染，不崩溃

### Requirement: Open Graph 社交分享标签

系统 SHALL 在 `index.html` 中包含 Open Graph 和 Twitter Card meta 标签，确保社交平台分享时展示富媒体卡片。

#### Scenario: 社交平台抓取

- **GIVEN** 网站链接被分享到社交平台
- **WHEN** 平台爬虫抓取页面
- **THEN** `og:title`、`og:description`、`og:type`、`og:url` 标签均存在
- **THEN** `twitter:card` 标签值为 `summary`

#### Scenario: og 标签被误删（边界/异常）

- **GIVEN** Open Graph 标签缺失
- **WHEN** 链接被分享到社交平台
- **THEN** 平台显示默认摘要或无预览卡片
- **THEN** 不影响页面正常访问

### Requirement: robots.txt

系统 SHALL 在站点根路径提供 `robots.txt` 文件，允许搜索引擎爬虫索引。

#### Scenario: 搜索引擎爬取

- **GIVEN** robots.txt 部署于 `public/robots.txt`
- **WHEN** Googlebot 请求 `/robots.txt`
- **THEN** 返回 `User-agent: *` 和 `Allow: /`
- **THEN** 爬虫可正常索引所有页面

#### Scenario: robots.txt 缺失（边界/异常）

- **GIVEN** robots.txt 文件不存在
- **WHEN** 爬虫请求 `/robots.txt`
- **THEN** 返回 404（GitHub Pages 默认行为）
- **THEN** 爬虫仍可正常索引（无 robots.txt 视为完全允许）

### Requirement: 语义化 HTML 标签

系统 SHALL 在组件中使用语义化 HTML 标签，确保屏幕阅读器和爬虫正确解析页面结构。

#### Scenario: 语义标签审查

- **GIVEN** 所有页面 Section 组件已渲染
- **WHEN** 审查 HTML 结构
- **THEN** 导航栏使用 `<nav>` 标签
- **THEN** 每个内容区域使用 `<section>` 标签且含唯一 `id`
- **THEN** 标题层级使用 `<h1>`（Hero 姓名）→ `<h2>`（各 Section 标题）
