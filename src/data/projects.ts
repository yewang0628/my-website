export interface Project {
  title: string
  description: string
  tags: string[]
  screenshot?: string
  githubUrl?: string
  liveUrl?: string
}

export const projects: Project[] = [
  {
    title: 'Fin-MCP 多智能体 A 股分析系统',
    description:
      '基于 LangGraph ReAct 框架 + MCP 协议的多 Agent 金融分析系统。4 个专用 Agent（基本面/技术面/估值/新闻）并行分析，自研 Qwen3-8B LoRA 新闻情感与风险预测模型（准确率 91%/88%），覆盖 A 股 5000+ 股票，工具调用成功率 98%，端到端时延约 90 秒。',
    tags: ['LangGraph', 'MCP', 'Qwen3', 'LoRA', 'vLLM', 'React', 'FastAPI'],
    screenshot: 'fin-mcp.svg',
    githubUrl: 'https://github.com/yewang0628/Fin-MCP',
  },
  {
    title: 'My Website',
    description:
      '个人品牌站，React 19 + Vite 7 + TypeScript + Tailwind CSS v4 构建，科技粒子风格，支持亮/暗主题切换，GitHub Pages 部署。',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    screenshot: 'my-website.svg',
    githubUrl: 'https://github.com/yewang0628/my-website',
    liveUrl: 'https://yewang0628.github.io/my-website/',
  },
]
