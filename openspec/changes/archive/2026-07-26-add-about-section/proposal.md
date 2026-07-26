## Why

个人品牌站当前仅有 Hero、项目展示和联系方式三个区域，缺少「关于我」来展示个人信息和品牌标签，无法让访客快速了解站主背景与专业方向。

## What Changes

- 新增「关于我」Section（`id="about"`），位于 Hero 与 Projects 之间
- 左右双栏布局：左侧展示个人照片，右侧展示 3 段个人简介
- 区域下方展示品牌标签「赋范空间」
- 导航栏新增「关于我」链接，锚点跳转至 `#about`

## Capabilities

### New Capabilities
- `about-section`: 关于我区域，展示个人照片、3 段简介文字、品牌标签，支持亮/暗主题和移动端响应式

### Modified Capabilities
- `navigation`: 导航栏链接列表新增「关于我」条目，href 指向 `#about`

## Impact

- 新增文件：`src/components/About.tsx`、`src/data/about.ts`
- 修改文件：`src/App.tsx`（插入 `<About />`）、`src/components/NavBar.tsx`（新增导航链接）
- 照片资源使用已有 `src/assets/hero.png`（或后续替换）
- 不影响现有 Hero、Projects、Contact 区域的行为
- 不涉及 API、依赖变更

## Out of Scope

- 不添加联系我表单
- 不添加照片轮播或动画效果
- 不添加社交媒体链接
