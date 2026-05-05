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
    skills: ['Flutter']
  },
  {
    category: 'Cloud & Databases',
    skills: ['Firebase', 'Firestore', 'Auth', 'MongoDB']
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Netlify', 'Search Console', 'Figma']
  },
  {
    category: 'Other',
    skills: ['SEO', 'Wireframing', 'Design Thinking', 'Agile']
  }
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

  const allSkills = SKILL_GROUPS.flatMap(group => group.skills)

  return (
    <section id="about" ref={ref}
             className="max-w-[1100px] mx-auto px-8 py-28 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

      {/* Body */}
      <div>
        <div className="reveal-left">
          <p className="section-label">About Me</p>
          <h2 className="section-title">Hi! I'm Johann</h2>
          <div className="divider" />
        </div>
        <p className="reveal text-[.95rem] leading-[1.85] text-text-dim font-light mt-6">
          I'm a <strong className="text-text-main font-medium">3rd year BS Computer Science student</strong> at the University of the Philippines Visayas in Miagao. 
          I am currently finding internships that will help me gain practical experience in
          building clean, fast, and beautifully crafted web experiences and hone my skills. 
          I aspire to be a full-stack developer who can seamlessly bridge the gap between design and development, 
          and create products that are not only functional but also delightful to use.
        </p>
      </div>

      {/* Unified Skills List */}
      <div className="md:pt-4">
        <h3 className="reveal-right font-cinzel text-teal-light text-[.7rem] tracking-[.3em] uppercase mb-6 opacity-80">
          Technical Skills
        </h3>
        <div className="reveal flex flex-wrap gap-2.5">
          {allSkills.map(skill => (
            <span key={skill} className="skill-tag text-white border-white/20 hover:border-white/50 hover:bg-white/5">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
