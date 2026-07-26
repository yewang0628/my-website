import { ThemeProvider } from './components/ThemeProvider'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'

export default function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <Hero />
      <About />
      <Projects />
      <Contact />
    </ThemeProvider>
  )
}
