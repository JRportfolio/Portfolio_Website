import { useEffect, useRef } from 'react'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 100)
          observer.unobserve(e.target)
        }
      })
    }, { threshold: .1 })
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="work" ref={ref}
             className="py-24"
             style={{ background: 'linear-gradient(to bottom, transparent, rgba(5,24,37,.6) 20%, rgba(5,24,37,.6) 80%, transparent)' }}>
      <div className="max-w-[1200px] mx-auto px-8">

        {/* Header */}
        <div className="mb-16 reveal-left">
          <p className="section-label">Project Highlights</p>
          <h2 className="section-title">Things I've<br/>built &amp; shipped.</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-12 gap-6">
          {projects.map((p, i) => (
            <div key={p.id}
                 className={`col-span-12 md:col-span-6 ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}