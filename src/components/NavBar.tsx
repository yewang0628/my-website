import { profile } from '../data/profile'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: '首页', href: '#hero' },
  { label: '关于我', href: '#about' },
  { label: '项目', href: '#projects' },
  { label: '联系我', href: '#contact' },
]

export default function NavBar() {
  return (
    <nav className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
          {profile.name}
        </span>
        <div className="flex items-center gap-4 text-sm md:gap-6 md:text-base">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-cyan-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
