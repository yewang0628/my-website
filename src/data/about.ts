export const bioParagraphs: string[] = [
  '我是一名 AI 工程师，专注于多智能体系统与大模型应用落地。核心方向涵盖 Agent 架构设计（ReAct Loop / Swarm 协作 / Skills-Agent 解耦 / 渐进式披露与懒加载）、大模型训练（SFT / PPO / GRPO / GSPO + LoRA）、检索增强生成（KG 扩展→HyDE→双路召回→RRF→Reranker）和 Harness Engineering（YAML 约束驱动 + 运行时验证 + 输出自动修复）。日常使用 AI 编程工具加速开发迭代。具备 Flash-Attention 训练加速、模型量化（INT8/FP8）、推理部署（vLLM）、数据蒸馏（DeepSeek-R1 / doubao-seed-2.0-pro 教师模型）和分布式训练（A100×8 DeepSpeed ZeRO-3）的完整工程经验。',
  '参与了 Fin-MCP 多智能体 A 股分析系统的开发与迭代，基于 LangGraph + MCP 协议实现 4 个分析 Agent 并行协作，覆盖 A 股 5529 家公司。在版本迭代中推进了三项智能优化策略（重复调用检测/数据充分性自检/成本标注），将 Token 消耗降低 24%，单次分析成本 ¥0.16→¥0.12。参与基于 Qwen3-1.7B LoRA 的新闻情感与风险预测模型微调（测试集 91%/88%）。',
  '参与了 MediX 多智能体医疗助手的开发与迭代，采用 Skills-Agent 双层架构（7 原子 Skills + 3 专业 Agent 解耦协作）。在版本迭代中推进了 5 步混合检索管线（KG 扩展→HyDE→双路召回→RRF→Reranker），让"血压高"能精准映射到"高血压"专业文档。参与 Qwen3.5-2B 的 SFT(40K)→GSPO RL(2.5K) 两阶段训练，VLM 得分 0.58→0.78，盲评 4.5/5 超越通用大模型。',
  '参与了 SPA-RL 手机智能助理项目的开发与迭代，核心解决长链路任务中的稀疏奖励与 Credit Assignment 问题。设计 Progress Estimator 将终局奖励分解为每步增量贡献，结合 Grounding Signal 实时校验动作有效性，基于 PPO 以加权密集奖励替代传统稀疏信号。电商任务完成率 85%→90%，动作准确率 96.2%，完成时长 25s→18s（-28%）。',
]

export const brandTags: string[] = ['Multi-Agent', 'MCP', 'PPO/GRPO/GSPO', 'SFT+LoRA', 'Hybrid RAG', 'Harness Eng', 'vLLM', 'Quant/Deploy', 'Distributed Tr']
