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
    title: 'My Website',
    description: '个人品牌站，React 19 + Vite + Tailwind CSS v4 构建，科技粒子风格。',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    screenshot: 'my-website.svg',
    githubUrl: 'https://github.com/wangye/my-website',
    liveUrl: 'https://wangye.github.io/my-website/',
  },
  {
    title: 'Project Alpha',
    description: '全栈 Web 应用，前后端分离架构。',
    tags: ['Node.js', 'Express', 'PostgreSQL'],
    screenshot: 'project-alpha.svg',
    githubUrl: 'https://github.com/wangye/project-alpha',
  },
  {
    title: 'CLI Tool',
    description: '命令行效率工具，自动化日常开发任务。',
    tags: ['Rust', 'CLI'],
    screenshot: 'cli-tool.svg',
    githubUrl: 'https://github.com/wangye/cli-tool',
    liveUrl: 'https://www.npmjs.com/package/cli-tool',
  },
  {
    title: 'Component Library',
    description: '可复用的 React 组件库，支持 Tree Shaking 和按需加载。',
    tags: ['React', 'Storybook', 'Rollup'],
    screenshot: 'component-lib.svg',
    githubUrl: 'https://github.com/wangye/component-lib',
  },
]
