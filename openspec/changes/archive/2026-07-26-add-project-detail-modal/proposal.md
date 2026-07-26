## Why

项目卡片目前不可点击，用户无法查看详细的项目背景、解决方案、成果和迭代历程。需要添加详情弹窗展示完整项目信息。

## What Changes

- `Project` 接口新增 `detail` 可选字段，包含背景、方案、成果、迭代对比
- 新建 `ProjectModal` 弹窗组件，支持滚动查看、ESC 关闭、点击遮罩关闭
- `ProjectCard` 添加点击事件，有 detail 数据的项目显示 Pointer 光标

## Capabilities

### Modified Capabilities
- `projects-section`: 项目卡片新增点击查看详情交互

## Impact

- 修改：`src/data/projects.ts`、`src/components/ProjectCard.tsx`、`src/components/Projects.tsx`
- 新建：`src/components/ProjectModal.tsx`

## Out of Scope

- 不添加路由/多页面
