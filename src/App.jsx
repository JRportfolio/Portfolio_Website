import { useEffect, useRef, useState } from 'react'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import About     from './components/About'
import Projects  from './components/Projects'
import Contacts  from './components/Contacts'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef   = useRef(null)
  const [hovered, setHovered] = useState(false)
  const mouse = useRef({ x: 0, y: 0 })
  const ring  = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    const onMove = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    const animate = () => {
      if (cursorRef.current) {
        cursorRef.current.style.left = mouse.current.x + 'px'
        cursorRef.current.style.top  = mouse.current.y + 'px'
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top  = ring.current.y + 'px'
      }
      rafId.current = requestAnimationFrame(animate)
    }
    animate()

    const onOver = e => { if (e.target.closest('a,button')) setHovered(true) }
    const onOut  = e => { if (e.target.closest('a,button')) setHovered(false) }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  return (
    <>
      {/* Custom cursor */}
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className={`cursor-ring ${hovered ? 'hovered' : ''}`} />

      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contacts />

      <footer className="px-12 py-8 flex justify-between items-center border-t border-teal-dim/30 text-[.65rem] tracking-[.15em] uppercase text-text-dim">
        <span>© 2026 Johann Ross Yap</span>
        <span>Designed &amp; built with intention</span>
      </footer>
    </>
  )
}