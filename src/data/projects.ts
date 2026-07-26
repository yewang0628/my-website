export interface ProjectDetail {
  background: string
  solution: string[]
  results: string[]
  iterations: {
    title: string
    description: string
    improvements: {
      aspect: string
      before: string
      after: string
      reason: string
    }[]
  }[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  screenshot?: string
  githubUrl?: string
  liveUrl?: string
  detail?: ProjectDetail
}

export const projects: Project[] = [
  {
    title: 'Fin-MCP 多智能体 A 股分析系统',
    description:
      '基于 LangGraph ReAct 框架 + MCP 协议的多 Agent 金融分析系统。4 个专用 Agent并行分析，自研 Qwen3-8B LoRA 新闻情感与风险预测模型，覆盖 A 股 5000+ 股票。',
    tags: ['LangGraph', 'MCP', 'Qwen3', 'LoRA', 'vLLM', 'React', 'FastAPI'],
    screenshot: 'fin-mcp.svg',
    githubUrl: 'https://github.com/yewang0628/Fin-MCP',
    detail: {
      background:
        '公司希望利用大模型为普通投资者提供股票投资咨询，但初版通用大模型+网络检索方案存在数据不一致、分析维度不足、输出不专业等问题，难以直接用于投资参考。',
      solution: [
        '数据工具化：基于 MCP 协议封装金融数据 API，统一数据 Schema，确保金融数据准确性和可追溯性',
        'ReAct 框架 + 多 Agent 协作：基于 LangGraph 实现四个分析 Agent（基本面/技术面/估值/新闻），支持自主调用 MCP 工具，由总结 Agent 生成结构化 Markdown 报告',
        '新闻因子小模型：整理标注约 10 万条金融新闻，基于 Qwen3-8B LoRA 微调情感与风险预测模型（测试集准确率 91%/88%）',
        '性能优化：设计评测体系，并行执行 + 缓存，端到端时延从 2 分钟+ 降至约 90 秒',
        '模型接入评测：参与金融专用大模型（SFT→GRPO）接入与 A/B 评测，引入格式奖励+语义正确性奖励机制',
      ],
      results: [
        '覆盖 A 股 5000+ 股票全维度分析（基本面/技术面/估值/新闻），工具调用成功率 98%，数据一致率约 99%',
        '报告生成效率提升约 1.25 倍，灰度测试用户满意度接近 90%',
        '整理 500+ 高频问题形成知识库，支持后续迭代与投顾知识复用',
      ],
      iterations: [
        {
          title: '第一轮迭代：从单 Agent 到多 Agent 协作',
          description:
            '初版为单 Agent 串行分析，每次需调用 6-8 个工具，时延 2 分钟+，且不同维度分析互相干扰导致输出质量不稳定。',
          improvements: [
            {
              aspect: '架构升级',
              before: '单 Agent 串行调用，所有分析逻辑耦合在一个 Prompt 中',
              after: '4 个专用 Agent 并行执行（LangGraph StateGraph），各自专注单一维度',
              reason: '串行效率低且 Prompt 过长导致指令遵循下降，拆分为独立 Agent 后每个 Agent 的 Prompt 可精细调优',
            },
            {
              aspect: '端到端时延',
              before: '约 120-150 秒（串行逐个工具调用）',
              after: '约 90 秒（4 Agent 并行 + 工具级缓存）',
              reason: '并行是最大收益点，配合 AKShare 数据缓存减少重复 API 调用',
            },
            {
              aspect: '分析质量',
              before: '多维度混杂，输出格式不稳定，偶有遗漏关键指标',
              after: '结构化的 4 维分析 + 总结 Agent 汇总，格式统一为 Markdown 报告',
              reason: '拆分后每个 Agent 输出格式可单独约束，总结 Agent 只做汇总不做分析',
            },
          ],
        },
        {
          title: '第二轮迭代：新闻分析增强 — 小模型替代大模型判断',
          description:
            '初版中新闻分析完全依赖 Fin-R1 7B 大模型做情感和风险判断，存在速度慢（单条 ~5s）、结果不稳定、成本高等问题。',
          improvements: [
            {
              aspect: '新闻处理速度',
              before: 'Fin-R1 7B 逐条分析，单条约 5 秒，10 条新闻需 50 秒',
              after: 'Qwen3-1.7B 专用模型批量推理，10 条新闻约 3 秒',
              reason: '1.7B 专用模型推理速度是 7B 通用模型的 15 倍+，且可批量处理',
            },
            {
              aspect: '情感分析准确率',
              before: '通用大模型直接判断，无专门训练，准确率约 75%',
              after: 'Qwen3-1.7B LoRA 微调（Focal Loss 处理类别不均衡），准确率 91%',
              reason: '10 万条标注数据 + LoRA 微调让模型学习金融领域情感表达模式',
            },
            {
              aspect: '风险评估准确率',
              before: '通用大模型直接判断，常将中性新闻误判为高风险',
              after: 'Qwen3-1.7B LoRA 微调 + 阈值校准，准确率 88%',
              reason: '专用训练 + Logits 偏移校准让模型更精确区分风险等级',
            },
            {
              aspect: 'GPU 显存占用',
              before: 'Fin-R1 7B 独占约 5.5GB，无法同时加载其他模型',
              after: '1.7B 模型仅需约 3.5GB，三模型（7B+1.7B×2）峰值约 9GB',
              reason: '小模型按需加载/卸载，RTX 5070 12GB 显存内可运行全部模型',
            },
          ],
        },
        {
          title: '第三轮迭代：工具链与数据质量治理',
          description:
            '灰度测试中发现部分股票数据缺失、工具超时、MCP 服务不稳定等问题，影响用户体验。',
          improvements: [
            {
              aspect: '工具调用成功率',
              before: '约 92%，部分 AKShare 接口偶发超时或返回空数据',
              after: '98%，增加 3 次重试 + 超时熔断 + 多数据源 fallback',
              reason: '金融数据 API 不稳定是常态，需要容错机制保证用户体验',
            },
            {
              aspect: '数据一致率',
              before: '约 95%，不同数据源的同指标偶有差异',
              after: '约 99%，统一 MCP Schema + 数据校验层 + 异常值过滤',
              reason: '数据不一致会直接损害用户信任，必须从源头治理',
            },
            {
              aspect: '错误处理',
              before: '工具异常直接抛出，用户看到原始错误信息',
              after: '分级兜底策略：重试→缓存→降级→友好提示',
              reason: '面向普通投资者的产品不能暴露技术错误细节',
            },
          ],
        },
      ],
    },
  },
  {
    title: 'My Website',
    description:
      '个人品牌站，React 19 + Vite 7 + TypeScript + Tailwind CSS v4 构建，科技粒子风格，支持亮/暗主题切换，GitHub Pages 部署。',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    screenshot: 'my-website.svg',
    githubUrl: 'https://github.com/yewang0628/my-website',
    liveUrl: 'https://yewang0628.github.io/my-website/',
    detail: {
      background:
        '需要一个专业且有个性的个人品牌站来展示项目作品和技术能力，同时作为学习 React 19 + Tailwind CSS v4 的实践项目。',
      solution: [
        'React 19 函数式组件 + TypeScript 全量类型覆盖',
        'Tailwind CSS v4 + 暗色模式支持（CSS 变量 + dark: 前缀）',
        'Canvas 静态粒子背景，科技感视觉风格',
        'GitHub Pages 自动化部署（gh-pages + npm run deploy）',
        'OpenSpec 规范驱动开发工作流',
      ],
      results: [
        '首屏加载 < 2 秒，Lighthouse 评分 95+',
        '完整的 SEO 优化（meta 标签 + Open Graph + robots.txt）',
        '响应式设计覆盖桌面/平板/移动端',
        '所有图片 lazy loading，支持加载失败降级',
      ],
      iterations: [],
    },
  },
]
