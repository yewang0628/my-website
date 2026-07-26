## Why

Hero Section 完成后，访客缺乏进一步了解用户能力的入口。项目展示区能让访客看到实际作品，CTA 按钮则提供了从 Hero 到内容的导航引导，形成完整的首屏体验。

## What Changes

- 新增 Projects 区域，响应式卡片网格展示个人项目（标题、简介、技术标签、链接）
- 新增 `src/data/projects.ts`，集中管理项目数据
- 新增 CTA 按钮「查看我的项目」于 HeroContent，点击平滑锚点滚动至 `#projects`
- 新增 ProjectCard 组件，处理标签渲染和可选链接
- **BREAKING**: 无

## Capabilities

### New Capabilities

- `projects-section`: 项目展示区域，响应式卡片网格，每张卡片包含标题/简介/技术标签/链接，支持亮暗主题

### Modified Capabilities

- `hero-section`: HeroContent 新增 CTA 按钮「查看我的项目」，点击平滑滚动至 `#projects`

## Impact

| 影响范围 | 说明 |
|-----------|------|
| `src/components/HeroContent.tsx` | 修改：新增 CTA 按钮 |
| `src/components/ProjectCard.tsx` | 新建 |
| `src/components/Projects.tsx` | 新建 |
| `src/data/projects.ts` | 新建 |
| `src/App.tsx` | 修改：引入 Projects |
| `package.json` | 无新增依赖 |
| 现有 Hero 功能 | 仅新增按钮，无破坏性影响 |

## Out of Scope

- 不做项目详情页/弹窗（点击卡片无展开行为）
- 不做项目截图（仅文字+标签+链接）
- 不做项目筛选/分类
- 不做后端 API（数据本地静态）
- 不做动画效果（卡片无入场动画）
- 不做导航栏
