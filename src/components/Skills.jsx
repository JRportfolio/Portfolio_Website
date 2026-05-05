import { useEffect, useRef } from 'react'

const SKILLS = [
  'React', 'JavaScript', 'HTML / CSS', 'Tailwind',
  'Node.js', 'Python', 'Netlify', 'Git', 'Figma', 'SEO',
]

const MARQUEE_ITEMS = [
  'React', 'Tailwind CSS', 'JavaScript', 'Node.js',
  'HTML5', 'Python', 'Netlify', 'Git', 'Figma', 'SEO',
  'Web Design', 'Data Analysis',
]

export default function Skills() {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: .12 })
    ref.current?.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // double for seamless loop
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div ref={ref}>
      {/* Skill tags (appears inside About section visually) */}
      <div className="max-w-[1100px] mx-auto px-8 pb-16 reveal">
        <div className="flex flex-wrap gap-3">
          {SKILLS.map(s => (
            <span key={s} className="skill-tag">{s}</span>
          ))}
        </div>
      </div>

      {/* Marquee */}
      <div className="overflow-hidden py-6 border-t border-b"
           style={{ borderColor: 'rgba(13,84,112,.25)' }}>
        <div className="flex gap-16 w-max whitespace-nowrap"
             style={{ animation: 'marquee 22s linear infinite' }}>
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center gap-16
                                     font-cinzel text-[.7rem] tracking-[.35em] uppercase"
                  style={{ color: 'var(--teal-dim)' }}>
              {item}
              <span className="w-1 h-1 rounded-full inline-block bg-current" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}