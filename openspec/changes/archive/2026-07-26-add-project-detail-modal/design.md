## Context

当前 `ProjectCard` 为纯静态展示。需要扩展为可点击卡片，弹出详情弹窗。

## Goals / Non-Goals

**Goals:**
- 卡片可点击打开 Modal 详情
- Modal 展示：背景、解决方案列表、成果列表、迭代优化（优化前后对比）
- 支持 ESC / 点击遮罩关闭，阻止背景滚动
- 有 `detail` 数据的项目才可点击，光标变为 pointer

**Non-Goals:**
- 不添加路由
- 不修改现有卡片布局

## Decisions

### Detail 数据结构

```typescript
interface ProjectDetail {
  background: string
  solution: string[]
  results: string[]
  iterations: {
    title: string
    description: string
    improvements: { aspect: string; before: string; after: string; reason: string }[]
  }[]
}
```

### Modal 实现

使用 Portal 渲染到 `document.body`，`fixed inset-0` 全屏遮罩。内容区 `max-w-2xl` 居中 + `max-h-[90vh] overflow-y-auto` 支持滚动。

### 关闭交互

- 点击遮罩背景 → 关闭
- 按 ESC → 关闭
- 点击右上角 X → 关闭
