import { useEffect, useRef } from 'react'

const SOCIALS = [
  { label: 'GitHub',   href: 'https://github.com/JRYportfolio' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/johann-ross-yap-5a4988407/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BNJ6OVdh%2BRp%2BqqNNMjedpVQ%3D%3D' },
]

export default function Contacts() {
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
    ref.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" ref={ref}
             className="text-center px-8 py-32 relative">

      {/* top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20"
           style={{ background: 'linear-gradient(to bottom, transparent, var(--teal-dim))' }} />

      <div className="max-w-[600px] mx-auto">
        <p className="section-label justify-center reveal-left" style={{ '--before': 'none' }}>
          Get In Touch
        </p>
        <h2 className="section-title mt-2 reveal-right">Let's build<br/>something together.</h2>
        <p className="mt-6 text-[.92rem] leading-[1.85] text-text-dim font-light italic reveal-left">
          Whether you have a project in mind, a problem to solve, or just want to say
          hello — my inbox is always open.
        </p>
        <a href="mailto:jjyap.135@gmail.com" className="contact-email mt-10 block reveal-right">
          jjyap.135@gmail.com
        </a>
        <ul className="flex justify-center gap-8 mt-12 list-none reveal">
          {SOCIALS.map(s => (
            <li key={s.label}>
              <a href={s.href} className="social-link">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}