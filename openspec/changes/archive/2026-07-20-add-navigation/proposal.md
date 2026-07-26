## Why

当前页面缺少全局导航，访客无法快速在 Hero、Projects 和联系区域之间跳转。固定顶部导航栏提供锚点定位能力，搭配背景模糊效果增强科技感。

## What Changes

- 新增固定顶部导航栏，左侧展示 Logo/姓名，右侧展示导航链接（首页、项目、联系我）
- 导航栏背景使用毛玻璃效果（`backdrop-blur`），亮/暗双色，滚动时不变
- 点击导航链接平滑滚动至对应 Section（`#hero` / `#projects` / `#contact`）
- Hero 区域添加 `id="hero"` 锚点
- 新增 Contact 占位区域，`id="contact"`，包含联系方式信息
- 新增 `src/data/contact.ts`，集中管理联系信息
- 移动端：导航栏链接收缩为简洁布局（不折叠汉堡菜单，因 out-of-scope 禁止下拉菜单）
- **BREAKING**: 无

## Capabilities

### New Capabilities

- `navigation`: 固定顶部导航栏，左侧 Logo + 右侧锚点链接，毛玻璃背景，亮/暗双色，点击平滑滚动
- `contact-section`: 联系我区域，`id="contact"`，展示邮箱/GitHub 等联系方式

### Modified Capabilities

- `hero-section`: Hero 区域添加 `id="hero"` 锚点，供导航栏「首页」链接定位

## Impact

| 影响范围 | 说明 |
|-----------|------|
| `src/App.tsx` | 新增 NavBar 和 Contact 组件 |
| `src/components/NavBar.tsx` | 新建 |
| `src/components/Contact.tsx` | 新建 |
| `src/data/contact.ts` | 新建 |
| `src/components/Hero.tsx` | 修改：添加 `id="hero"` |
| `package.json` | 无新增依赖 |
| 现有组件 | ThemeToggle 位置与 NavBar 共存（右侧，导航栏下方或内部） |

## Out of Scope

- 不做搜索功能
- 不做多级下拉菜单（移动端不做汉堡折叠菜单）
- 不做用户登录和注册
- 不做导航栏滚动隐藏/显示动画
- 不做当前页面高亮指示（active link）
- 不做后端 API
