import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { detail } = project
  if (!detail) return null

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [handleKeyDown])

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-slate-800 dark:hover:text-gray-300"
          aria-label="关闭"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title & Tags */}
        <h2 className="mb-3 pr-8 text-2xl font-bold text-gray-900 dark:text-white">
          {project.title}
        </h2>
        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700 dark:bg-cyan-900/30 dark:text-cyan-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Background */}
        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            项目背景
          </h3>
          <p className="leading-relaxed text-gray-600 dark:text-gray-400">
            {detail.background}
          </p>
        </section>

        {/* Solution */}
        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            解决方案
          </h3>
          <ul className="space-y-2">
            {detail.solution.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-500 dark:bg-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            项目成果
          </h3>
          <ul className="space-y-2">
            {detail.results.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-gray-600 dark:text-gray-400"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Iterations */}
        {detail.iterations.length > 0 && (
          <section className="mb-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              迭代优化历程
            </h3>
            {detail.iterations.map((iter, i) => (
              <div
                key={i}
                className="mb-4 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <h4 className="mb-1 font-semibold text-purple-700 dark:text-cyan-400">
                  {iter.title}
                </h4>
                <p className="mb-3 text-sm text-gray-500 dark:text-gray-500">
                  {iter.description}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-slate-700">
                        <th className="pb-2 pr-4 font-medium text-gray-700 dark:text-gray-300">
                          优化维度
                        </th>
                        <th className="pb-2 pr-4 font-medium text-red-500">
                          优化前
                        </th>
                        <th className="pb-2 pr-4 font-medium text-green-500">
                          优化后
                        </th>
                        <th className="pb-2 font-medium text-gray-700 dark:text-gray-300">
                          原因
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {iter.improvements.map((imp, j) => (
                        <tr
                          key={j}
                          className="border-b border-gray-100 dark:border-slate-800"
                        >
                          <td className="py-2 pr-4 font-medium text-gray-800 dark:text-gray-200">
                            {imp.aspect}
                          </td>
                          <td className="py-2 pr-4 text-red-600 dark:text-red-400">
                            {imp.before}
                          </td>
                          <td className="py-2 pr-4 text-green-600 dark:text-green-400">
                            {imp.after}
                          </td>
                          <td className="py-2 text-gray-500 dark:text-gray-500">
                            {imp.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <div className="flex gap-4 border-t border-gray-100 pt-4 dark:border-slate-700">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-purple-600 hover:underline dark:text-cyan-400"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-purple-600 hover:underline dark:text-cyan-400"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                在线预览
              </a>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
