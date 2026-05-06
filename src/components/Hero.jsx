import { useEffect, useRef } from 'react'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W, H, stars = [], shooters = [], t = 0, rafId

    function resize() {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < 180; i++) {
      stars.push({
        x:     Math.random(),
        y:     Math.random() * .7,
        r:     Math.random() * 1.4 + .3,
        a:     Math.random(),
        speed: Math.random() * .005 + .002,
        phase: Math.random() * Math.PI * 2,
        cross: Math.random() < .12,
      })
    }

    function spawnShooter() {
      shooters.push({
        x:     Math.random() * W * .7 + W * .1,
        y:     Math.random() * H * .3,
        vx:    Math.random() * 4 + 3,
        vy:    Math.random() * 2 + 1,
        len:   Math.random() * 80 + 60,
        life:  1,
        decay: Math.random() * .015 + .01,
      })
    }
    spawnShooter()
    const shootInterval = setInterval(spawnShooter, 4500)

    function draw() {
      ctx.clearRect(0, 0, W, H)
      t += .016

      // regular stars
      stars.forEach(s => {
        const alpha = s.a * (.5 + .5 * Math.sin(t * s.speed * 60 + s.phase))
        const x = s.x * W, y = s.y * H
        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#b0f0ff'
        ctx.shadowBlur = 6
        ctx.shadowColor = '#14b8d4'
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
        if (s.cross) {
          ctx.globalAlpha = alpha * .7
          ctx.strokeStyle = '#b0f0ff'
          ctx.lineWidth = .7
          ctx.shadowBlur = 10
          const sz = s.r * 4
          ctx.beginPath()
          ctx.moveTo(x - sz, y); ctx.lineTo(x + sz, y)
          ctx.moveTo(x, y - sz); ctx.lineTo(x, y + sz)
          ctx.stroke()
        }
        ctx.restore()
      })

      // shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i]
        const grd = ctx.createLinearGradient(
          sh.x, sh.y,
          sh.x - sh.len * (sh.vx / 5),
          sh.y - sh.len * (sh.vy / 5)
        )
        grd.addColorStop(0, `rgba(20,184,212,${sh.life * .9})`)
        grd.addColorStop(1, 'rgba(20,184,212,0)')
        ctx.save()
        ctx.strokeStyle = grd
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 8
        ctx.shadowColor = '#14b8d4'
        ctx.beginPath()
        ctx.moveTo(sh.x, sh.y)
        ctx.lineTo(sh.x - sh.len * (sh.vx / 5), sh.y - sh.len * (sh.vy / 5))
        ctx.stroke()
        ctx.restore()
        sh.x    += sh.vx
        sh.y    += sh.vy
        sh.life -= sh.decay
        if (sh.life <= 0) shooters.splice(i, 1)
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      clearInterval(shootInterval)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* Sky */}
      <div className="absolute inset-0"
           style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 55%, #073d52 0%, #051825 40%, #03080f 80%)' }} />

      {/* Stars */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Moon */}
      <div className="absolute rounded-full"
           style={{
             width: 'min(520px, 55vw)',
             aspectRatio: '1',
             top: '50%', left: '50%',
             transform: 'translate(-50%, -58%)',
             background: 'radial-gradient(circle at 50% 50%, #0c3a52 0%, #051a28 60%, transparent 72%)',
             boxShadow: '0 0 120px 40px rgba(10,127,160,.18)',
           }} />

      {/* Hills SVG */}
      <svg className="absolute bottom-0 left-0 w-full pointer-events-none"
           viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0,300 Q200,200 360,240 Q500,270 600,210 Q720,145 900,230 Q1050,280 1150,220 Q1300,155 1440,240 L1440,400 L0,400Z"
              fill="#071828" opacity=".7"/>
        <path d="M0,320 Q180,260 320,290 Q430,310 500,270 Q600,230 680,265 Q740,285 790,255 Q870,220 980,270 Q1080,305 1200,265 Q1320,225 1440,280 L1440,400 L0,400Z"
              fill="#091a2c" opacity=".85"/>
        {/* trees left */}
        <g fill="#060f1a" opacity=".9">
          {[[310,300,318,270,326],[325,305,335,268,345],[342,302,351,272,360],
            [357,307,367,274,377],[374,304,383,275,392],[388,308,399,278,410],
            [405,305,415,276,425],[420,310,432,278,444]].map(([x1,y1,x2,y2,x3],i)=>(
            <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y1}`}/>
          ))}
        </g>
        {/* trees right */}
        <g fill="#060f1a" opacity=".9">
          {[[1040,290,1050,258,1060],[1058,294,1068,260,1078],[1075,292,1085,260,1095],
            [1092,296,1103,263,1114],[1110,293,1120,262,1130]].map(([x1,y1,x2,y2,x3],i)=>(
            <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y1}`}/>
          ))}
        </g>
        {/* main hill */}
        <path d="M380,340 Q500,270 600,295 Q660,308 720,280 Q780,252 870,295 Q940,328 1060,330 L1060,400 L380,400Z"
              fill="#06111c"/>
        {/* front ground */}
        <path d="M0,360 Q360,340 720,360 Q1080,380 1440,360 L1440,400 L0,400Z"
              fill="#040b14"/>
      </svg>

      {/* Wolf */}
      <div className="absolute" style={{
        bottom: '37.5%', left: '50.5%',
        transform: 'translateX(-50%)',
        width: '48px',
        filter: 'drop-shadow(0 0 18px rgba(14,184,212,.4))',
        animation: 'wolfFloat 6s ease-in-out infinite',
      }}>
        <svg viewBox="0 0 48 60" xmlns="http://www.w3.org/2000/svg" fill="#060e14">
          <ellipse cx="24" cy="38" rx="11" ry="8"/>
          <ellipse cx="29" cy="26" rx="7" ry="6"/>
          <path d="M34,22 Q37,18 35,14 Q33,11 31,13 Q33,16 32,20Z"/>
          <polygon points="24,22 22,14 27,20"/>
          <polygon points="31,21 32,13 35,19"/>
          <path d="M13,35 Q6,28 10,22 Q14,18 16,24 Q13,28 15,33Z"/>
          <rect x="19" y="44" width="3" height="10" rx="1.5"/>
          <rect x="24" y="44" width="3" height="10" rx="1.5"/>
          <rect x="28" y="43" width="3" height="9"  rx="1.5"/>
        </svg>
      </div>

      {/* Hero Text */}
      <div className="relative z-10 text-center px-8 mt-[12vh]">
        <p className="text-[.72rem] tracking-[.4em] uppercase text-teal mb-5"
           style={{ animation: 'fadeLeft 1.4s .2s ease both' }}>
        Aspiring Web Developer 
        </p>
        <h1 className="font-cinzel font-bold text-text-bright leading-[1.05]"
            style={{
              fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
              letterSpacing: '.06em',
              textShadow: '0 0 60px rgba(20,184,212,.25)',
              animation: 'fadeRight 1.4s .35s ease both',
            }}>
          Johann Yap
        </h1>
        <p className="mt-6 font-light italic text-text-dim tracking-[.08em]"
           style={{ fontSize: 'clamp(.85rem,1.5vw,1.05rem)', animation: 'fadeLeft 1.4s .5s ease both' }}>
          Portfolio Website
        </p>
        <a href="#work" className="hero-cta mt-11 inline-flex"
           style={{ animation: 'fadeRight 1.4s .65s ease both' }}>
          View My Work <span>→</span>
        </a>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                      text-text-dim text-[.65rem] tracking-[.2em] uppercase z-10"
           style={{ animation: 'fadeUp 1.4s 1s ease both' }}>
        <span>Scroll</span>
        <div style={{
          width: '1px', height: '50px',
          background: 'linear-gradient(to bottom, var(--teal-dim), transparent)',
          animation: 'scrollPulse 2s ease-in-out infinite',
        }}/>
      </div>
    </section>
  )
}