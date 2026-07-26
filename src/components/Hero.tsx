import ParticleCanvas from './ParticleCanvas'
import HeroContent from './HeroContent'

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-dvh items-center justify-center overflow-hidden scroll-mt-16 bg-gradient-to-br from-indigo-100 via-fuchsia-50 to-sky-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900">
      <ParticleCanvas />
      <HeroContent />
    </section>
  )
}
