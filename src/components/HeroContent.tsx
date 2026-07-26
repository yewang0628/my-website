import { profile } from '../data/profile'

export default function HeroContent() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4">
        {profile.name}
      </h1>
      <p className="text-xl md:text-2xl text-purple-600 dark:text-cyan-400 font-medium mb-3">
        {profile.title}
      </p>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-md">
        {profile.intro}
      </p>
      <a
        href="#projects"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-6 py-3 text-purple-600 dark:text-cyan-400 hover:bg-purple-500/10 dark:hover:bg-cyan-400/10 transition-colors"
      >
        查看我的项目
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  )
}
