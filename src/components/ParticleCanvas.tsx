import { useEffect, useRef } from 'react'
import { useTheme } from './ThemeProvider'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

function getParticleCount(): number {
  const w = window.innerWidth
  if (w < 768) return 40
  if (w < 1280) return 70
  return 110
}

function getConnectionDist(): number {
  return window.innerWidth < 768 ? 100 : 150
}

// ── Sci-fi color palettes ──
function palette(theme: 'light' | 'dark') {
  return theme === 'dark'
    ? {
        // neon cyan + electric indigo on deep dark
        particle: '56, 189, 248',       // sky-400
        accent: '34, 211, 238',         // cyan-400
        line: '56, 189, 248',           // sky-400
        glowA: 0.55,
        coreA: 0.9,
        lineA: 0.22,
      }
    : {
        // deep indigo + violet on light
        particle: '79, 70, 229',        // indigo-600
        accent: '124, 58, 237',         // violet-600
        line: '79, 70, 229',            // indigo-600
        glowA: 0.3,
        coreA: 0.75,
        lineA: 0.12,
      }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef(0)
  const sizeRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let count = getParticleCount()
    const connDist = getConnectionDist()

    function resize() {
      const w = window.innerWidth
      const h = document.documentElement.scrollHeight
      sizeRef.current = { w, h }
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      count = getParticleCount()
    }

    function seed(w: number, h: number): Particle[] {
      return Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 1,
      }))
    }

    resize()
    particlesRef.current = seed(sizeRef.current.w, sizeRef.current.h)

    function animate() {
      const pal = palette(theme)
      const { w, h } = sizeRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx!.clearRect(0, 0, w, h)

      const ps = particlesRef.current

      // ensure count matches if viewport changed
      while (ps.length < count) {
        ps.push({ x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, r: Math.random() * 2 + 1 })
      }

      for (let i = 0; i < ps.length; i++) {
        const p = ps[i]

        // move
        p.x += p.vx
        p.y += p.vy

        // mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 130 && d > 0) {
          const f = 0.5 * (1 - d / 130)
          p.vx += (dx / d) * f * 0.12
          p.vy += (dy / d) * f * 0.12
        }

        // damping
        p.vx *= 0.997
        p.vy *= 0.997

        // speed management
        const s = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (s > 1.5) { p.vx = (p.vx / s) * 1.5; p.vy = (p.vy / s) * 1.5 }
        if (s < 0.15) { p.vx += (Math.random() - 0.5) * 0.04; p.vy += (Math.random() - 0.5) * 0.04 }

        // wrap
        if (p.x < -50) p.x = w + 50
        if (p.x > w + 50) p.x = -50
        if (p.y < -50) p.y = h + 50
        if (p.y > h + 50) p.y = -50

        // glow
        const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5)
        grad.addColorStop(0, `rgba(${pal.particle}, ${pal.glowA + 0.2})`)
        grad.addColorStop(0.4, `rgba(${pal.particle}, ${pal.glowA * 0.35})`)
        grad.addColorStop(1, `rgba(${pal.particle}, 0)`)
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2)
        ctx!.fillStyle = grad
        ctx!.fill()

        // core
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${pal.accent}, ${pal.coreA})`
        ctx!.fill()
      }

      // connections
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x
          const dy = ps[i].y - ps[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < connDist) {
            const a = (1 - d / connDist) * pal.lineA
            ctx!.beginPath()
            ctx!.moveTo(ps[i].x, ps[i].y)
            ctx!.lineTo(ps[j].x, ps[j].y)
            ctx!.strokeStyle = `rgba(${pal.line}, ${a})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    // ── ResizeObserver on document body to catch height changes ──
    const ro = new ResizeObserver(() => {
      resize()
      // adjust particle count for new dimensions
      const newCount = getParticleCount()
      if (newCount !== count) {
        count = newCount
        particlesRef.current = seed(sizeRef.current.w, sizeRef.current.h)
      }
    })
    ro.observe(document.documentElement)

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY }
    }

    window.addEventListener('mousemove', onMouse, { passive: true })

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMouse)
    }
  }, [theme])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />
}
