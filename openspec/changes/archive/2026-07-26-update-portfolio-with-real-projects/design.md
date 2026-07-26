## Context

当前作品集数据文件包含 4 个占位项目，profile 描述为通用 "Full Stack Developer"。需更新为真实的 Fin-MCP 项目导向的技术背景。

## Goals / Non-Goals

**Goals:**
- `projects.ts`：保留 My Website，替换其余 3 个占位项目为 1 个 Fin-MCP 主项目（含详细信息）
- `profile.ts`：更新 title 为 AI/金融科技方向，intro 体现多 Agent + 大模型经验
- `about.ts`：3 段简介融入真实项目经验
- `contact.ts`：更新邮箱为 wangye374127@gmail.com

**Non-Goals:**
- 不修改组件 UI
- 不新增项目条目超过当前展示需求

## Decisions

### 项目数据方案

Fin-MCP 项目作为一个完整卡片展示，包含：
- title: "Fin-MCP 多智能体 A 股分析系统"
- description: 概括系统能力和覆盖范围
- tags: LangGraph, MCP, Qwen3, LoRA, vLLM, React, FastAPI
- githubUrl: https://github.com/yewang0628/my-website（如用户有独立 repo 则更新）
- liveUrl 省略（系统为本地部署）

保留 My Website 项目卡片作为第二个项目。

### Profile 更新

- title: "AI Engineer / Full Stack Developer"
- intro: 聚焦 AI Agent + 金融科技 + 前端工程化

### 简介更新

3 段分别覆盖：技术方向（AI Agent/大模型）、项目经验（Fin-MCP）、开源与技术热情
