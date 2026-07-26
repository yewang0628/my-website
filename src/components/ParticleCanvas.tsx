import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

function getParticleCount(): number {
  return window.innerWidth < 768 ? 40 : 80
}

function getParticleColor(theme: 'light' | 'dark'): string {
  return theme === 'dark' ? 'rgba(99, 102, 241, 0.25)' : 'rgba(99, 102, 241, 0.3)'
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    function draw() {
      const rect = canvas!.getBoundingClientRect()
      const w = rect.width
      const h = rect.height

      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = getParticleCount()
      const color = getParticleColor(theme)
      ctx!.fillStyle = color

      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        const r = Math.random() * 2.5 + 1
        ctx!.beginPath()
        ctx!.arc(x, y, r, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    draw()

    const observer = new ResizeObserver(() => draw())
    observer.observe(canvas)

    return () => observer.disconnect()
  }, [theme])

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" />
}
