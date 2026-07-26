export interface ProjectDetail {
  background: string
  solution: string[]
  results: string[]
  metrics?: { label: string; value: string; desc: string }[]
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
      '基于 LangGraph ReAct + MCP 的多 Agent 金融分析系统。4 个专用 Agent 并行分析，自研 Qwen3-1.7B LoRA 新闻情感与风险预测模型，覆盖 A 股 5000+ 股票，工具调用成功率 98%。',
    tags: ['LangGraph', 'MCP', 'Qwen3', 'LoRA', 'vLLM', 'Milvus', 'FastAPI'],
    screenshot: 'fin-mcp.svg',
    githubUrl: 'https://github.com/yewang0628/Fin-MCP',
    detail: {
      background:
        '公司希望利用大模型为普通投资者提供股票投资咨询，但初版通用大模型+网络检索方案存在数据不一致、分析维度不足、输出不专业等问题，难以直接用于投资参考。',
      solution: [
        '数据工具化：基于 MCP 协议封装 27 个金融数据 API，统一数据 Schema，确保金融数据准确性和可追溯性',
        'ReAct 框架 + 多 Agent 协作：基于 LangGraph StateGraph 实现 4 个分析 Agent（基本面/技术面/估值/新闻）+ 1 个 Summary Agent，智能路由支持 Single/Swarm 双模式（单 Agent 分析 vs 4 Agent 并行）',
        '新闻因子小模型：清洗标注约 10 万条金融新闻（来源 NASDAQ 新闻数据集），基于 Qwen3-1.7B-Instruct LoRA 全层微调情感与风险预测模型，配合 Logits 阈值校准，测试集准确率 91.3% / 88.2%',
        'RAG 知识检索：自建 Milvus 向量库 + 1022 QA 对，bge-large-zh-v1.5 Embedding，6 步在线检索 Pipeline（Query 改写→路由→HyDE→KG 扩展→Dense+Sparse 混合→RRF 融合）',
        '安全与质量：5 层安全防护（1150+ 词库 + 218 审计规则）+ 约束验证器 + 4 级自动修复器',
        '长短期记忆：短期 Redis 5 轮窗口 + MD5 去重 + LLM 压缩；长期 Mem0 元知识提取（只记"怎么分析"，不记"分析出什么"）',
      ],
      results: [
        '覆盖 A 股 5529 家公司全维度分析（基本面/技术面/估值/新闻），工具调用成功率 98%，数据一致率约 99%',
        '通过并行执行 + 三项智能优化（重复检测/充分性自检/成本标注），端到端 Token 消耗降低 24%，单次分析成本 ¥0.16→¥0.12（-25%）',
        'Head Agent 冲突裁决机制（5 维度优先级 + Agent 能力边界定义），灰度测试用户满意度接近 90%',
        '整理 1022 QA 对 + 500+ 高频问题形成 RAG 知识库，支持后续迭代与投顾知识复用',
      ],
      metrics: [
        { label: 'A股覆盖', value: '5,529', desc: '家公司' },
        { label: '工具成功率', value: '98%', desc: 'MCP 27工具' },
        { label: '情感准确率', value: '91.3%', desc: 'Qwen3-1.7B LoRA' },
        { label: '风险准确率', value: '88.2%', desc: '+Logits校准' },
        { label: 'Token节省', value: '-24%', desc: '三项智能优化' },
        { label: '单次成本', value: '¥0.12', desc: 'API模式/次' },
      ],
      iterations: [
        {
          title: '第一轮迭代：Agent 运行时效率优化',
          description:
            '初版 ReAct Agent 存在过度循环（recursion_limit=30）和无效工具调用问题，4 Agent 并行时单次分析消耗约 136K token（工具数据 106K + LLM 输出 20K），DeepSeek API 成本约 ¥0.16/次，且大量工具调用为重复查询。',
          improvements: [
            {
              aspect: '循环限制 v2（4 Agent 针对性调优）',
              before: 'fundamental 10轮/8工具, technical 7轮/5工具, valuation 7轮/5工具, news 8轮/6工具; 总工具 token ~106K',
              after: 'fundamental 8轮/6工具, technical 6轮/4工具, valuation 6轮/5工具, news 6轮/4工具; 总工具 token ~81K（-24%）',
              reason: '前 3-4 次工具调用已获取 80% 关键数据，后续边际收益递减。依据单轮 token 消耗分析（news 单轮最重 ~3000 token），针对性减轮',
            },
            {
              aspect: '重复调用检测（双路径实现）',
              before: 'Agent 可对同一工具+相同参数反复调用（如多次请求同一股票同一时段 K 线），浪费工具配额和 token',
              after: '路径A(news手动循环内拦截)：call_key(MD5映射) → Set 去重 → 返回"重复，用已有数据"。路径B(3个Agent 工具层猴子补丁)：替换 tool.ainvoke → 模块级 Set 去重 → 拦截占位结果',
              reason: 'create_react_agent 框架内工具调用无法外部拦截，需猴子补丁方案。news Agent 手动 ReAct 循环可直接拦截，不涉及框架内部',
            },
            {
              aspect: '数据充分性自检 + 工具 Token 成本标注',
              before: 'Agent 不知道何时"数据够了"，持续调工具；也不知道不同工具 token 消耗差异，可能优先调用重量工具',
              after: '每 Agent 配置 min_data_points 阈值(3-4)；工具 description 注入成本标签：🟢轻量(~200-500 token) / 🟡中等(~800-2000) / 🔴重量(~3000+)。LLM 看到标签后自然倾向优先轻量工具',
              reason: 'Agent 没有"成本意识"。成本标注让 LLM 在 ReAct 决策时自主偏好轻量工具，无需额外拦截逻辑',
            },
            {
              aspect: '端到端成本（DeepSeek API 模式）',
              before: '单次分析约 ¥0.16（工具 token 106,400 + LLM 输出 19,800），月 300 次约 ¥47',
              after: '单次分析约 ¥0.12（工具 token 81,000 + LLM 输出 15,500），月 300 次约 ¥36（-23%）',
              reason: '三项优化叠加：循环限制减少无效轮次 + 重复检测减少浪费 + 成本标注引导轻量优先',
            },
          ],
        },
        {
          title: '第二轮迭代：质量保障与安全体系',
          description:
            'LLM 输出存在质量不稳定问题：偶尔遗漏必需章节（如风险提示、数据来源）、缺少关键财务指标（ROE/毛利率），以及安全合规隐患（模型可能输出"稳赚不赔"等不当表达）。需要在安全红线之外建设质量底线。',
          improvements: [
            {
              aspect: '约束验证器（Per-Agent 输出检查）',
              before: 'Agent 输出无结构化校验，偶有遗漏必需章节（风险提示/数据来源）或关键指标（ROE/毛利率/PE/PB）',
              after: '每 Agent 独立 OutputRequirement：fundamental 需含 ROE+毛利率+净利率+营收+负债 5 项；valuation 需含 PE+PB+估值结论 3 章；news 需含情感+风险+新闻摘要。最小长度 150-200 字符',
              reason: '不同 Agent 的分析维度差异大，一刀切检查无效。针对性定义每 Agent 的输出契约',
            },
            {
              aspect: '4 级自动修复器',
              before: '缺失章节或违规词直接暴露给用户，无自动修复',
              after: '优先级修复链：①风险提示（必须补充）→ ②数据来源标注 → ③分析时间标注 → ④免责声明完整性。违规词自动过滤替换（如"梭哈"→移除标记）。修复后生成约束验证报告嵌入报告末尾',
              reason: '面向普通投资者的产品必须保证每个输出都包含风险提示和数据来源，这是合规底线',
            },
            {
              aspect: '5 层安全防护体系',
              before: '无安全防护，LLM 输出直接展示给用户',
              after: '①输入守卫(1150+金融安全词库) → ②输出审核(218条审计规则,7类) → ③工具白名单(30+只读模式) → ④检查点管理(溯源回放) → ⑤SecurityContext(统一包装+自动免责)。动作：block 拦截 / rewrite 重写 / flag 标注 / retry 重生成(最多3次)',
              reason: '金融领域合规要求高。全本地实现（零外部依赖），审核规则覆盖投资建议合规/数值范围/信息披露/市场公平性/监管要求 7 个类别',
            },
            {
              aspect: 'Head Agent 冲突裁决',
              before: '4 Agent 并行分析可能产生矛盾结论（如 fundamental 说"盈利能力好"但 technical 说"趋势破位"），LLM 直接合成易"和稀泥"',
              after: '定义 Agent 能力边界（fundamental 不管短期走势，technical 不管内在价值）+ 5 维度裁决优先级（如"估值是否合理": valuation>fundamental>technical>news）。跨维度冲突标注"背离"而非强行融合。置信度<0.6 降权',
              reason: '不做裁决的话 4 个 Agent 结果是孤立的。通过 Prompt Template 预定义裁决规则，让 LLM 合成时有据可依',
            },
          ],
        },
        {
          title: '第三轮迭代：检索增强与记忆系统',
          description:
            '初版系统无知识库和记忆能力：用户每次提问都是"全新会话"，无法记住用户偏好（如"这个用户看重现金流>PE"）；遇到 MCP 数据不足时无兜底知识源；口语化 Query（如"茅台最近咋样"）直接检索效果差。',
          improvements: [
            {
              aspect: 'RAG 在线检索 Pipeline（6 步处理）',
              before: '无知识库，MCP 数据不足时 LLM 只能靠自身参数知识回答（可能过时或不准确）',
              after: '①Query 改写(口语→专业金融Query) → ②路由(LLM-free关键词分类,定向domain) → ③HyDE(生成假设答案→embed答案做检索,精度>问题检索) → ④KG扩展(股票→行业→概念→竞品,扩展检索词) → ⑤混合检索(Dense COSINE Top-20 + Sparse BM25 Top-20 → RRF融合 Top-K) → ⑥Entity倒排索引(精确匹配直接定位,不经过向量检索)',
              reason: '口语 Query 的语义空间与专业文档不匹配。HyDE 用"答案的语义空间"检索，"茅台最近咋样"→假设答案含"PE/估值/营收"→精准检索到专业内容',
            },
            {
              aspect: '短期记忆（Redis 5 轮窗口 + LLM 压缩）',
              before: '无记忆管理，对话历史无限膨胀 → 推理变慢，上下文窗口浪费',
              after: '5 轮完整对话 Redis 窗口（TTL 自动过期）→ 第 6 轮触发 LLM 压缩早期轮次 → 摘要(用户意图+关键决策) → 维持 ≤8000 tokens。MD5 去重避免重复存储。Redis 不可用时降级内存 dict',
              reason: '金融场景对话轮次少（人均 3-5 次/天），5 轮窗口足够覆盖单次分析全过程。压缩而非截断保留语义',
            },
            {
              aspect: '长期记忆（Mem0 元知识提取）',
              before: '每次会话独立，无法利用历史分析经验',
              after: '会话结束 → LLM 提取元知识（偏好/方法/教训）→ embed → Mem0/JSON 存储。过滤规则：只存"怎么分析"（如"该用户偏好DCF估值"），不存"分析出什么"（如"茅台昨天跌了2%"）。新会话 → Top-3 检索 → 注入 System Prompt',
              reason: '金融场景时效性极强。记住用户的"分析方法偏好"有价值，记住"历史股价"反而会误导下一次分析',
            },
            {
              aspect: '容量规划与瓶颈分析',
              before: '无容量评估，无法判断系统能支撑多少用户',
              after: '瓶颈链排序：LLM推理(单GPU 1-2并发,4-6min/次) > MCP Server(单进程无连接池) > TaskManager(无TTL自动清理) > 本地模型(GPU加载耗时3-5s/次)。双模式容量对比：本地GPU 10-20次/h vs DeepSeek API 200-300次/h。日容量估算公式 + 压测方案（串行浸泡/阶梯并发/长时间浸泡/MCP独立压测）',
              reason: '容量规划决定了部署选型。对于 100 DAU，DeepSeek API 单机足够；500+ DAU 需 MCP 集群 + 消息队列',
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
