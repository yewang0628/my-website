export const bioParagraphs: string[] = [
  '我是一名 AI 工程师，专注于多智能体系统与大模型应用落地。核心方向涵盖 Agent 架构设计（ReAct Loop / Swarm 协作 / Skills-Agent 解耦）、大模型微调（SFT + GSPO RL）、检索增强生成（混合检索 + HyDE + Reranker）和约束系统设计。擅长在 12GB 单卡上完成从数据管线到模型训练再到推理部署的完整闭环。',
  '独立开发了 Fin-MCP 多智能体 A 股分析系统，基于 LangGraph + MCP 协议实现 4 个分析 Agent 并行协作，覆盖 A 股 5529 家公司。自研三项智能优化策略（重复调用检测/数据充分性自检/成本标注）将 Token 消耗降低 24%，单次分析成本 ¥0.16→¥0.12。基于 Qwen3-1.7B LoRA 微调新闻情感与风险预测模型（测试集 91%/88%）。',
  '主导开发了 MediX 多智能体医疗助手，采用自研 Skills-Agent 双层架构（7 原子 Skills + 3 专业 Agent 解耦协作）。自建 5 步混合检索管线（KG 扩展→HyDE→双路召回→RRF→Reranker），让"血压高"能精准映射到"高血压"专业文档。基于 Qwen3.5-2B 完成 SFT(40K)→GSPO RL(2.5K) 两阶段训练，VLM 得分 0.58→0.78，盲评 4.5/5 超越通用大模型。',
]

export const brandTags: string[] = ['赋范空间', 'Multi-Agent', 'GSPO RL', 'LoRA', 'RAG', 'Full Stack']
