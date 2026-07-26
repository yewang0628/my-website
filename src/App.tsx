import { ThemeProvider } from './components/ThemeProvider'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ParticleCanvas from './components/ParticleCanvas'

export default function App() {
  return (
    <ThemeProvider>
      <ParticleCanvas />
      <div className="relative z-10">
        <NavBar />
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>
    </ThemeProvider>
  )
}
