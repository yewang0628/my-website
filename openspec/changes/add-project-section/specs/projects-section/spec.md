## ADDED Requirements

### Requirement: 项目截图展示

每张项目卡片 SHALL 在顶部展示项目截图，截图使用懒加载。

#### Scenario: 含截图的卡片

- **GIVEN** 项目数据中的 `screenshot` 字段为有效图片路径
- **WHEN** 卡片渲染
- **THEN** 卡片顶部显示项目截图
- **THEN** 截图使用 `loading="lazy"` 懒加载
- **THEN** 截图宽度 100% 填充卡片，高度固定（`h-40`）

#### Scenario: 缺少截图的卡片（边界/异常）

- **GIVEN** 项目数据中的 `screenshot` 字段为 `undefined` 或空字符串
- **WHEN** 卡片渲染
- **THEN** 截图区域显示占位元素（纯色背景或渐变背景）
- **THEN** 卡片不报错，其他内容正常显示

#### Scenario: 截图加载失败（边界/异常）

- **GIVEN** 项目 `screenshot` 指向不存在的文件
- **WHEN** 浏览器加载截图失败（`onError` 触发）
- **THEN** 截图区域显示占位元素
- **THEN** 不显示浏览器默认的破损图片图标

### Requirement: 项目数据截图字段

项目数据模型 `Project` 接口 SHALL 包含可选的 `screenshot` 字段。

#### Scenario: 数据模型包含 screenshot

- **GIVEN** `Project` 接口定义在 `src/data/projects.ts`
- **WHEN** TypeScript 编译检查
- **THEN** `screenshot` 字段类型为 `string | undefined`（可选）

## MODIFIED Requirements

### Requirement: 项目数据集中管理

系统 SHALL 在 `src/data/projects.ts` 中维护项目数据数组，每个项目包含 title、description、tags、screenshot、githubUrl（可选）、liveUrl（可选）字段。项目数量至少为 4 个。

#### Scenario: 正常读取项目数据

- **GIVEN** `projects.ts` 包含至少 4 个项目
- **WHEN** Projects 组件渲染
- **THEN** 页面展示至少 4 张项目卡片

#### Scenario: 项目数据为空（边界/异常）

- **GIVEN** `projects.ts` 导出空数组 `[]`
- **WHEN** Projects 组件渲染
- **THEN** 区域标题「项目」仍然显示
- **THEN** 卡片网格区域为空，不报错
