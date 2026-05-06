import { useEffect, useRef } from 'react'

const SKILL_GROUPS = [
  {
    category: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'PHP', 'SQL']
  },
  {
    category: 'Mobile',
    skills: ['Flutter', 'Dart']
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Netlify', 'Figma', 'Search Console']
  },
 
]

export default function About() {
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
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-fade').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={ref}
             className="max-w-[1100px] mx-auto px-8 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

      {/* Body */}
      <div>
        <div className="reveal-left">
          <p className="section-label">About Me</p>
        </div>
        <p className="reveal text-[.95rem] leading-[1.85] text-text-dim font-light mt-6">
          I'm a <strong className="text-text-main font-medium">3rd year BS Computer Science student</strong> at the University of the Philippines Visayas (Miagao). 
          I am currently looking for internships that will help me gain practical experience and hone my skills in
          building clean, reliable, and beautifully crafted web experiences. 
          I aspire to be a full-stack developer who can seamlessly bridge the gap between design and development.
        </p>
      </div>

      {/* Sectioned Skills List */}
      <div className="space-y-6">
        <p className="section-label reveal-right justify-end md:justify-start">
          Technical Skills
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category} className="reveal">
              <h4 className="text-text-main text-[0.7rem] font-cinzel tracking-[0.15em] uppercase mb-3 opacity-60">
                {group.category}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map(skill => (
                  <span key={skill} className="skill-tag text-white border-white/10 hover:border-white/40 hover:bg-white/5">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
