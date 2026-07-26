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
  if (w < 768) return 50
  if (w < 1280) return 80
  return 120
}

function getConnectionDistance(): number {
  return window.innerWidth < 768 ? 100 : 150
}

function getColors(theme: 'light' | 'dark') {
  return theme === 'dark'
    ? { particle: '99, 102, 241', line: '99, 102, 241', accent: '6, 182, 212' }
    : { particle: '99, 102, 241', line: '99, 102, 241', accent: '168, 85, 247' }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const particlesRef = useRef<Particle[]>([])
  const animRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let w = 0
    let h = 0
    let count = getParticleCount()
    const connectionDist = getConnectionDistance()

    function resize() {
      w = window.innerWidth
      h = document.documentElement.scrollHeight
      canvas!.width = w * dpr
      canvas!.height = h * dpr
      canvas!.style.width = `${w}px`
      canvas!.style.height = `${h}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      count = getParticleCount()
    }

    function initParticles() {
      const particles: Particle[] = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 1,
        })
      }
      particlesRef.current = particles
    }

    resize()
    initParticles()

    function animate() {
      const colors = getColors(theme)
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      ctx!.clearRect(0, 0, w, h)

      const particles = particlesRef.current

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Move
        p.x += p.vx
        p.y += p.vy

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120 && dist > 0) {
          const force = 0.6 * (1 - dist / 120)
          p.vx += (dx / dist) * force * 0.1
          p.vy += (dy / dist) * force * 0.1
        }

        // Damping
        p.vx *= 0.998
        p.vy *= 0.998

        // Speed clamp
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 1.5) {
          p.vx = (p.vx / speed) * 1.5
          p.vy = (p.vy / speed) * 1.5
        }
        if (speed < 0.2) {
          p.vx += (Math.random() - 0.5) * 0.05
          p.vy += (Math.random() - 0.5) * 0.05
        }

        // Boundary wrap
        if (p.x < -50) p.x = w + 50
        if (p.x > w + 50) p.x = -50
        if (p.y < -50) p.y = h + 50
        if (p.y > h + 50) p.y = -50

        // Draw glow
        const gradient = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        gradient.addColorStop(0, `rgba(${colors.particle}, 0.6)`)
        gradient.addColorStop(0.5, `rgba(${colors.particle}, 0.15)`)
        gradient.addColorStop(1, `rgba(${colors.particle}, 0)`)
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx!.fillStyle = gradient
        ctx!.fill()

        // Draw core
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${colors.accent}, 0.8)`
        ctx!.fill()
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.2
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.strokeStyle = `rgba(${colors.line}, ${opacity})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animate()

    const onResize = () => {
      resize()
      initParticles()
    }
    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY }
    }
    const onScroll = () => {
      resize()
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouse)
    window.addEventListener('scroll', onScroll)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}
