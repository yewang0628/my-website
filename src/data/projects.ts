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
            {
              aspect: '公司别名匹配（5 阶段递进管道）',
              before: '用户输入口语化公司名（"茅台""宁王""BYD""603871"），直接文本匹配准确率低，歧义消解困难（如"隆基"→隆基绿能 vs 隆基机械）',
              after: 'Stage1 股票代码直查(score=1.0) → Stage2 倒排索引精确别名(19496 key, score=0.95) → Stage3 子串匹配(长度比分, 0.7~0.95) → Stage4 difflib.SequenceMatcher 模糊匹配 → Stage5 正则提取("分析XXX"模式, score=0.3)。三级复合排序：70只优先股 > 匹配分数 > 别名数量',
              reason: '5529 家公司 × 多别名(全称/简称/英文/品牌/旧称) → 19496 个倒排索引 key。优先级让茅台/宁德等大票在歧义匹配中自动胜出',
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
              aspect: '兜底链 (4 级 Fallback)',
              before: '工具超时或数据不可用时，Agent 直接报错或返回空结果，用户体验差',
              after: 'MCP 工具(优先) → RAG 知识库(数据不足补充) → LLM 通用知识(RAG无匹配兜底) → 优雅降级提示("部分数据不可用，建议缩小查询范围或稍后重试")。每级失败自动 fallback，`_build_fallback_result` 构造带建议的友好降级文本',
              reason: '面向投资者的产品不能暴露技术错误细节。4 级降级确保任何情况下都有可读输出',
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
              aspect: '三级检索降级 + 数据结构强制过滤',
              before: 'Mem0 不可用时长期记忆完全失效，无降级方案；元知识提取完全依赖 LLM prompt 约束，规则降级粗糙',
              after: '①Mem0 向量检索(最优) → ②本地 Embedder + numpy.dot 余弦相似度(次优) → ③关键词打分(preferences匹配+3, domain/code匹配+2)。SessionSummary dataclass 字段层面强制过滤：只有 user_preferences/methodology/mistakes/stocks 四个字段，无任何价格/财务数字 slot。正则降级兜底：re.findall 从消息中提取股票名+主题',
              reason: '数据结构强约束 + 运行时三级降级 = 双重保障。"存什么"由 Schema 决定而非靠 prompt 约束，这是最可靠的过滤',
            },
            {
              aspect: 'Skills 插件架构',
              before: 'RAG 功能与 Agent 代码硬耦合，新增能力需修改所有 Agent',
              after: 'pkgutil.walk_packages 扫描 src/skills/ → importlib 按需加载 → 提取 SKILL 对象 → 注册为 LangChain Tool → 注入所有 Agent。新增 Skill 只需在目录加一个 .py 文件。40+ trigger_keywords 匹配 + LLM 渐进式披露 tool description',
              reason: '"本质是规则+RAG检索"的模块应独立封装。Skill 架构让 Agent 和能力解耦，改 RAG 逻辑不影响 Agent 代码',
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
    title: 'MediX — 多智能体医疗助手',
    description:
      'Skills-Agent 双层架构的医疗 AI 系统。3 个专业 Agent + 7 个原子 Skills 解耦协作，ReAct Loop 自主调用工具（硬限3次），Swarm 智能路由（70%单Agent/30%协作），双层记忆（MD5去重+Mem0），约束系统自动修复输出。',
    tags: ['LangGraph', 'ReAct', 'Mem0', 'LoRA', 'GSPO', 'vLLM', 'Milvus'],
    screenshot: 'medix.svg',
    githubUrl: 'https://github.com/yewang0628/MediX',
    detail: {
      background:
        '传统单 Agent 医疗问答存在响应慢、复杂问题分析不全、多轮对话上下文理解弱等问题。面对多症状、多维度的医疗咨询时，准确性与稳定性不足，缺乏长效记忆机制，难以满足实际医疗场景的需求。',
      solution: [
        'Skills-Agent 两层架构：底层 7 个原子 Skills（知识检索/风险评估/症状分析/生活方式/ICD-10编码/临床指南/深度研究），上层 3 个专业 Agent（健康咨询/症状诊断/医学研究）按需调用，Skills 与 Agent 完全解耦',
        'Agent Loop 执行机制：基于 ReAct 实现 Think-Act-Observe 循环，LLM 自主决策工具调用并观察结果，硬性限制最多 3 次工具调用（防过度调用），单 Agent 响应时间控制在 15 秒以内',
        'Swarm 协作系统：LeadAgent 判断问题复杂度并分解任务，智能路由 70% 单 Agent 快速通道 / 30% Swarm 协作模式，Agent 间通过 SharedContext 间接共享任务状态和执行结果',
        '双层记忆机制：短期记忆管理会话级对话历史（单例模式共享上下文，MD5 去重 + 超限压缩 35%，加载最近 5 轮），长期记忆通过 Mem0 云服务向量化存储会话总结，支持跨会话相似案例检索',
        'Harness Engineering 约束系统：YAML 显式定义 Agent 能力边界并运行时验证，输出自动修复（缺少免责声明自动添加、高危症状自动附加就医警告）',
        'VLM 模型训练：Qwen3.5-2B SFT（40K 医学 VQA）+ GSPO RL（2.5K），级联 Reward（Embed 双阈值过滤 + LLM Judge 三档），chat_template 修复确保格式学习，RTX 5070 12GB 单卡完成',
      ],
      results: [
        '路由准确率 88%→95%，知识库检索准确率 87%，单 Agent 5–15s，Swarm 20–30s，多轮对话理解准确率 60%→92%',
        '医学专业人员三维度盲评：系统 4.5 分 vs doubao-seed-2.0-pro 3.9 分',
        'VLM 平均得分 0.58→0.78（+34%），AB test 0.78 vs DeepSeek 0.72 / Doubao 0.75，推理 2–5s/次，可用性 99.8%',
        '约束系统自动修复率 100%（免责声明/就医警告零遗漏），格式完整率 100%，主力模态识别 90–100%',
      ],
      metrics: [
        { label: '路由准确率', value: '95%', desc: '88%→95%' },
        { label: '多轮理解', value: '92%', desc: '60%→92%' },
        { label: '盲评得分', value: '4.5', desc: 'vs doubao 3.9' },
        { label: 'VLM得分', value: '0.78', desc: '基座 0.58' },
        { label: '单Agent', value: '5-15s', desc: '硬限3次工具' },
        { label: '可用性', value: '99.8%', desc: 'vLLM部署' },
      ],
      iterations: [
        {
          title: '第一轮迭代：Skills-Agent 架构 + ReAct Loop',
          description:
            '初版为单 Agent 直接调用工具，Prompt 过长导致指令遵循下降，工具调用无节制（可无限循环），响应时间不稳定（5–45s），且新增能力需修改所有 Agent 代码。',
          improvements: [
            {
              aspect: 'Skills-Agent 解耦架构',
              before: '工具逻辑与 Agent 代码硬耦合，新增一个能力（如 ICD-10 编码）需修改 3 个 Agent',
              after: '7 个原子 Skills 独立封装（每个含 SKILL.md + Python 脚本），pkgutil 自动发现 → importlib 按需加载 → 注册为 OpenAI Function Tool。Agent 只关心"调用哪个 Skill"，不关心 Skill 内部实现',
              reason: '医疗领域知识更新频繁（指南/编码/研究），Skill 架构让知识更新无需改动 Agent 代码',
            },
            {
              aspect: 'ReAct Loop + 硬性工具限制',
              before: 'Agent 无工具调用上限，复杂问题可能调用 8–10 次，响应 30–45s',
              after: 'max_tool_calls=2（后调至 3），到达硬限后自动注入"请基于已有信息提供最终答复"，强制 LLM 输出最终答案。流式推理时 DFA 状态机实时过滤 <think> 标签',
              reason: '医学场景中前 2–3 次检索已覆盖核心信息，更多调用边际收益递减。StreamThinkFilter 用字符级状态机处理跨 token 边界的标签',
            },
            {
              aspect: '消息去重 + 熵压缩',
              before: '对话历史无管理，相同 tool result 重复存储，上下文膨胀',
              after: 'MD5 去重（role:content[:200] 取 hash）→ 超限压缩（消息 >12 条时保留 system prompt + 最近 6 条，中间用规则摘要替代）。MemoryEntropyManager 提供去重→压缩→熵估算完整管线，压缩率约 35%',
              reason: 'vLLM 4096 context 限制下，每条消息都宝贵。规则压缩比 LLM 压缩更快且确定性更强',
            },
            {
              aspect: '知识库混合检索 Pipeline（5 步）',
              before: '简单的关键词匹配检索，医学口语查询（"血压高"→"高血压"）无法正确映射，单一 BM25 或向量检索各有盲区',
              after: '①Query 语义增强：KG 1-hop 邻居扩展(25,058 实体共现图) + HyDE(LLM 生成假设答案→embed 答案做检索) + 短 query(<8字)BM25 关键词扩展 → ②双路召回各 100 条(BM25 + MedEmbed-large-v0.1 COSINE) → ③RRF 融合(k=20, top-60)消除量纲差异 → ④元数据 AND 过滤(逐级放宽 specialty→section_type) → ⑤BGE-Reranker-v2-m3-medical Cross-Encoder 精排 → 阈值截断(先≥1.0, 不够降至≥0.5)输出 top-3',
              reason: '"血压高"通过语义检索自动映射到"高血压"文档。HyDE 用 LLM 生成假设答案的 embedding 做检索，精度 > 直接用关键词做向量检索（答案语义空间更接近文档语义空间）',
            },
            {
              aspect: 'BM25 医学领域定制',
              before: '通用分词器将医学术语拆散（"静脉血栓栓塞症"被拆为"静脉/血栓/栓塞/症"），检索召回质量差',
              after: 'jieba 精准模式 + 60+ 医学术语词典注入(DOAC/VTE/髋部骨折/静脉血栓栓塞症等) + n-gram(2,3)复合词扩展 + 停用词过滤(中英双语)。BM25 参数：k1=1.5, b=0.75。pickle 持久化索引',
              reason: '医学领域有大量复合术语和缩写，通用分词器不认识。词典注入 + ngram 确保"静脉血栓栓塞症"作为一个整体被索引，而不是 4 个碎片',
            },
          ],
        },
        {
          title: '第二轮迭代：Swarm 协作 + 智能路由 + 双模型架构',
          description:
            '单 Agent 对复杂多症状问题分析不全面，无法同时兼顾诊断、指南检索和生活建议。所有请求走同一 LLM 造成简单问题也要等待模型推理。',
          improvements: [
            {
              aspect: 'LeadAgent 智能路由（3 策略）',
              before: '所有问题走单一 Agent，感冒咨询和复杂鉴别诊断用同一流程',
              after: '策略1(简单→ConsultationAgent,~70%)：单一常见症状/健康科普。策略2(复杂症状→Diagnostic+Consultation,~20%)：多症状组合/持续加重。策略3(需指南→Research+Consultation,~10%)：询问治疗方案/需要权威证据。LeadAgent 用 DeepSeek V4 Pro 做任务分解',
              reason: '70% 的问题都是简单咨询（"感冒了怎么办"），走单 Agent 快通道节省 LLM 调用和推理时间',
            },
            {
              aspect: '双模型架构（Lead vs Worker）',
              before: '所有 Agent 用同一个 LLM，任务分解和医学推理抢同一推理资源',
              after: 'LeadAgent → DeepSeek V4 Pro (API, 负责任务分解/分配/汇总)。3 个 Worker Agent → 本地 RL 训练医学模型 (vLLM, 负责医学检索/诊断/咨询)。Worker 池通过 SwarmCoordinator 统一管理，短期记忆注入所有 Worker 的 Loop',
              reason: '分而治之：任务分解需要强推理（API 模型），医学回答需要领域知识（本地专用模型）。双模型各司其职',
            },
            {
              aspect: 'SharedContext 间接通信',
              before: 'Agent 间无通信机制，多 Agent 结果各自独立无法交叉验证',
              after: 'LeadAgent 分解任务→发布 SubTask 到 SharedContext→Worker 自主认领→完成后 write 结果→其他 Worker 可 read 上下文。asyncio.Lock 保护并发写入。发布 Swarm 启动/完成事件',
              reason: '间接通信避免 Agent 间强耦合。Worker 只通过 SharedContext 感知其他 Agent 的存在，不直接调用',
            },
            {
              aspect: '引用来源追溯系统',
              before: 'LLM 回答无来源引用，用户无法验证信息的可靠性。医疗场景下来源可追溯是基本要求',
              after: 'extract_sources_from_tool_result() 针对 5 种 Skill 返回格式做统一解析。LLM 回答中用 [来源N] 标注引用位置，末尾附【参考来源】段落。每条来源含 title/url/locator/snippet/source_type/evidence_level/year/score 8 个字段。locator 结构化定位串(doc=XXX;heading=XXX;chunk=N/N)前端可据此跳转原文',
              reason: '来源追溯不仅是 UX，更是医疗合规。locator 设计让前端可精确跳转到知识库文档的原文段落',
            },
          ],
        },
        {
          title: '第三轮迭代：VLM 训练管线 + 约束系统',
          description:
            '通用 LLM 缺乏医学影像理解能力，输出质量不稳定（遗漏免责声明、缺少就医警告），需要自训 VLM 并建立输出质量保障体系。',
          improvements: [
            {
              aspect: 'Qwen3.5-2B SFT→GSPO RL 两阶段训练',
              before: '通用模型医学 VQA 平均得分 0.58，无 CoT 推理能力，格式输出不稳定',
              after: 'Stage1 SFT：40K 医学 VQA（16 模态，48K 全量采样 7K）+ DeepSeek Flash 生成 CoT 推理链（分 3 档复杂度），3 epochs。Stage2 GSPO RL：2.5K 样本，8 generations/prompt，级联 Reward（Embed 双阈值 0.45/0.85 过滤 + LLM Judge 三档 EQUIVALENT/PARTIAL/DIFFERENT），beta=0.01 KL 约束，2250 steps ~12.5h',
              reason: 'Embed 双阈值过滤 ~70% 明确样本不调 API，大幅降低 Judge 成本。chat_template 修复是关键（Qwen3.5 原生模板会丢弃 <MODALITY> 前缀，修复后格式才真正生效）',
            },
            {
              aspect: 'Reward 设计演进（v1→v2）',
              before: 'v1: 4 个 reward 平行加权（format/llm/embed/modality），LLM Judge 二元 YES/NO 每条都调 API，Modality 恒为 0（chat_template bug）',
              after: 'v2: 级联 reward = 0.10×format + 0.90×content。content = 0.05×modality + 0.375×embed_sim + 0.575×llm_judge。Format 3-tier 渐进（有MOD→有think→完整）。Embed 双阈值快速过滤 + LLM Judge 仅 ~30% 样本调 API',
              reason: 'v1 每条都调 Judge API，2.5K×8=20K 次调用，成本高且噪音大。v2 Embed 预判后仅 ~6K 次 API 调用',
            },
            {
              aspect: 'GSPO 训练踩坑与调优',
              before: '初始配置：num_generations=4, temperature=0.8, beta=0.04, cascaded reward',
              after: 'num_generations 4→8（GSPO advantage 方差为0→梯度死掉）；temperature 0.8→1.2（entropy 过低）；beta 0.04→0.01（约束过强→策略不更新）；cascaded→并行加权（低阈值默认满分→reward 过早饱和）。RLMonitorCallback 三级监控：紧急熔断(entropy<0.3)/收敛停车/预警',
              reason: 'RL 训练的"玄学"时刻：num_generations=4 时 advantage 方差为零完全无梯度，提到 8 才解决。这些踩坑经验本身就是工程能力的体现',
            },
            {
              aspect: 'Harness Engineering 约束系统',
              before: 'LLM 输出无质量保障，约 15% 的回答缺少免责声明，高危症状（如"胸痛伴呼吸困难"）未触发就医警告',
              after: 'YAML 定义 Agent 能力边界（可用 Skills 列表/禁止操作/输出规范）→ 运行时 agent_loop 每个 tool_call 前验证 → 输出后 auto_fix（缺失免责声明自动追加、检测到高危症状关键词自动插入就医警告）。修复率 100%',
              reason: '医疗场景的合规底线。约束系统与 Agent 代码完全解耦，修改约束不需要重新部署 Agent',
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
