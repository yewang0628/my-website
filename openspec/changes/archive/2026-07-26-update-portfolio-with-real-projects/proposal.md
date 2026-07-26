## Why

当前作品集使用占位项目（Project Alpha、CLI Tool、Component Library），不能真实反映站主的技术能力。需用真实的 Fin-MCP 多智能体金融分析系统替换，同时更新个人简介以匹配实际项目经验。

## What Changes

- 用 Fin-MCP 项目替换 `projects.ts` 中的占位项目，保留 My Website 条目
- 更新 `profile.ts` 中的个人 title 和 intro，反映 AI/金融科技方向
- 更新 `about.ts` 中的简介段落，加入真实项目经验
- 创建 Fin-MCP 项目截图 SVG
- 更新 `contact.ts` 中的邮箱为真实邮箱

## Capabilities

### Modified Capabilities
- `projects-section`: 更新项目数据，替换占位项目为 Fin-MCP 真实项目
- `about-section`: 更新个人简介内容，体现金融 AI 真实经验
- `hero-section`: 更新 Hero 区域的 title 和 intro
- `contact-section`: 更新邮箱地址

## Impact

- 修改：`src/data/projects.ts`、`src/data/profile.ts`、`src/data/about.ts`、`src/data/contact.ts`
- 新增：`public/images/projects/fin-mcp.svg`
- 不影响组件代码和布局

## Out of Scope

- 不添加联系我表单
- 不修改组件 UI 或交互行为
