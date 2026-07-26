import { useState } from 'react'
import { bioParagraphs, brandTags } from '../data/about'
import profilePhoto from '../assets/hero.png'

export default function About() {
  const [imgError, setImgError] = useState(false)

  return (
    <section
      id="about"
      className="scroll-mt-16 bg-white/70 py-20 backdrop-blur-sm dark:bg-slate-950/70"
    >
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
          关于我
        </h2>

        {/* Photo + Bio: side-by-side on desktop, stacked on mobile */}
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Left: Photo */}
          <div className="shrink-0">
            {imgError ? (
              <div className="h-48 w-48 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600" />
            ) : (
              <img
                src={profilePhoto}
                alt="个人照片"
                loading="lazy"
                className="h-48 w-48 rounded-full border-4 border-purple-200 object-cover dark:border-cyan-900"
                onError={() => setImgError(true)}
              />
            )}
          </div>

          {/* Right: Bio */}
          <div className="flex-1 space-y-4 text-center md:text-left">
            {bioParagraphs.map((paragraph, i) => (
              <p
                key={i}
                className="leading-relaxed text-gray-600 dark:text-gray-400"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Brand Tags */}
        {brandTags.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {brandTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-purple-100 px-4 py-1.5 text-sm font-medium text-purple-700 dark:bg-cyan-900/30 dark:text-cyan-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
