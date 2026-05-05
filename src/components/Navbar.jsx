export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full px-16 py-12 flex justify-between items-center z-50 backdrop-blur-[2px]"
         style={{ background: 'linear-gradient(to bottom, rgba(3,8,15,0.95) 0%, rgba(3,8,15,0.4) 60%, transparent 100%)' }}>
      <a href="#hero"
         className="font-cinzel text-[1.8rem] font-bold tracking-tight uppercase text-teal-light no-underline"
         style={{ cursor: 'none' }}>
        JR
      </a>
      <ul className="flex gap-16 list-none">
        {['About', 'Work', 'Contact'].map(item => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="nav-link text-[1rem] font-medium tracking-[.85em]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}