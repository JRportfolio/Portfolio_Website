import { useState } from 'react'

export default function ProjectCard({ project }) {
  const { id, tag, title, description, tech, href, image, images, video } = project
  const [currentIdx, setCurrentIdx] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [showLightbox, setShowLightbox] = useState(false)

  const allImages = images || (image ? [image] : [])
  
  const getMediaUrl = (path) => {
    if (!path) return ''
    return path.startsWith('http') 
      ? path 
      : new URL(`../assets/${path.split('/').pop()}`, import.meta.url).href
  }

  const nextImg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev + 1) % allImages.length)
  }

  const prevImg = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIdx((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const toggleVideo = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowVideo(!showVideo)
  }

  const openLightbox = (e) => {
    if (href === '#') {
      e.preventDefault()
      e.stopPropagation()
      setShowLightbox(true)
    }
  }

  const isLocalVideo = video && (video.endsWith('.mp4') || video.endsWith('.webm') || video.endsWith('.ogg'))
  const isCover = project.imageFit === 'cover'
  const fitClass = isCover ? 'object-contain' : 'object-contain p-2'

  return (
    <>
      <article className={`project-card flex flex-col h-full`}>
        {/* Thumbnail / Video */}
        <div className="relative overflow-hidden bg-[#04111d] ph-grid group/img"
             style={{ aspectRatio: '16/9' }}>
          
          {showVideo && video ? (
            <div className="absolute inset-0 w-full h-full z-10 bg-black">
              {isLocalVideo ? (
                <video
                  src={getMediaUrl(video)}
                  controls
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <iframe
                  src={video}
                  title={`${title} video demo`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          ) : (
            <a href={href === '#' ? '#' : href}
               onClick={href === '#' ? openLightbox : undefined}
               target={href !== '#' ? '_blank' : undefined}
               rel="noopener noreferrer"
               className="block w-full h-full">
              
              {/* Smart Fill: Blurred background for "cover" projects to prevent black bars while avoiding cropping */}
              {isCover && (
                <img src={getMediaUrl(allImages[currentIdx])}
                     aria-hidden="true"
                     className="absolute inset-0 w-full h-full object-cover blur-xl opacity-30 scale-110" />
              )}

              <img src={getMediaUrl(allImages[currentIdx])}
                   alt={title}
                   className={`card-img-inner absolute inset-0 w-full h-full transition-transform duration-500 group-hover/img:scale-105 ${fitClass}`} />
            </a>
          )}

          {/* Carousel Controls */}
          {!showVideo && allImages.length > 1 && (
            <>
              <button type="button"
                      onClick={prevImg}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-20 hover:bg-black/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              <button type="button"
                      onClick={nextImg}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover/img:opacity-100 transition-opacity z-20 hover:bg-black/80">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                {allImages.map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-teal-400 w-3' : 'bg-white/50'}`} />
                ))}
              </div>
            </>
          )}

          {/* Video Toggle */}
          {video && (
            <button type="button"
                    onClick={toggleVideo}
                    className="absolute top-2 right-2 bg-black/60 text-white px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-wider opacity-0 group-hover/img:opacity-100 transition-opacity z-30 hover:bg-teal-600">
              {showVideo ? 'Close Player' : 'Watch Demo'}
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 pb-7 flex-grow flex flex-col">
          <p className="text-[.62rem] tracking-[.25em] uppercase mb-2"
             style={{ color: 'var(--teal)' }}>
            {tag}
          </p>
          <h3 className="font-cinzel font-semibold tracking-[.03em]"
              style={{ fontSize: '1.05rem', color: 'var(--text-bright)' }}>
            {title}
          </h3>
          <p className="mt-2 text-[.82rem] leading-[1.7] font-light flex-grow"
             style={{ color: 'var(--text-dim)' }}>
            {description}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-5 pt-4"
               style={{ borderTop: '1px solid rgba(13,84,112,.35)' }}>
            <div className="flex gap-2 flex-wrap">
              {tech.map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
            <a href={href === '#' ? '#' : href}
               onClick={href === '#' ? openLightbox : undefined}
               target={href !== '#' ? '_blank' : undefined}
               rel="noopener noreferrer"
               className="card-link">
              {href !== '#' ? 'Visit' : 'View'} <span>→</span>
            </a>
          </div>
        </div>
      </article>

      {/* Lightbox Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300"
             onClick={() => setShowLightbox(false)}>
          <button className="absolute top-8 right-8 text-white/70 hover:text-white z-[110]"
                  onClick={() => setShowLightbox(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>

          {/* Modal Content */}
          <div className="relative w-full max-w-5xl aspect-video flex items-center justify-center"
               onClick={e => e.stopPropagation()}>
            
            {video ? (
              <div className="w-full h-full bg-black shadow-2xl">
                {isLocalVideo ? (
                  <video
                    src={getMediaUrl(video)}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <iframe
                    src={video}
                    title={`${title} video demo`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <img src={getMediaUrl(allImages[currentIdx])}
                     alt={title}
                     className="max-w-full max-h-full object-contain" />
                
                {allImages.length > 1 && (
                  <>
                    <button onClick={prevImg}
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </button>
                    <button onClick={nextImg}
                            className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-3 pb-8">
                      {allImages.map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-teal-400 w-6' : 'bg-white/30'}`} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}