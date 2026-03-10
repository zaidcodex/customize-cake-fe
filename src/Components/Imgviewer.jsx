import React, { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2070&auto=format&fit=crop',
    tag: 'New Arrivals',
    title: 'Crafted With Love',
    sub: 'Every cake is a little piece of happiness',
  },
  {
    img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=2074&auto=format&fit=crop',
    tag: 'Custom Orders',
    title: 'Your Vision, Our Art',
    sub: 'Tell us your dream cake — we\'ll make it real',
  },
  {
    img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2065&auto=format&fit=crop',
    tag: 'Special Occasions',
    title: 'Celebrate Every Moment',
    sub: 'Birthdays, anniversaries, and everything in between',
  },
]

const Imgviewer = () => {
  const [active, setActive] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback((idx) => {
    if (animating) return
    setAnimating(true)
    setActive(idx)
    setTimeout(() => setAnimating(false), 600)
  }, [animating])

  const prev = () => goTo((active - 1 + SLIDES.length) % SLIDES.length)
  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo])

  useEffect(() => {
    const t = setInterval(next, 4500)
    return () => clearInterval(t)
  }, [next])

  return (
    <>
      <style>{css}</style>
      <section className="iv-wrap">
        <div className="iv-track">

          {/* Slides */}
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className={`iv-slide ${i === active ? 'iv-slide--active' : ''}`}
              aria-hidden={i !== active}
            >
              <img src={slide.img} alt={slide.title} className="iv-img" />
              <div className="iv-overlay" />
            </div>
          ))}

          {/* Caption */}
          <div className="iv-caption" key={active}>
            <span className="iv-tag">{SLIDES[active].tag}</span>
            <h2 className="iv-title">{SLIDES[active].title}</h2>
            <p className="iv-sub">{SLIDES[active].sub}</p>
          </div>

          {/* Arrows */}
          <button className="iv-arrow iv-arrow--prev" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="iv-arrow iv-arrow--next" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="iv-dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`iv-dot ${i === active ? 'iv-dot--active' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="iv-progress" key={`p-${active}`} />

        </div>
      </section>
    </>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500&display=swap');

  .iv-wrap {
    background: #fff8f8;
    padding: 32px 0 40px;
  }

  .iv-track {
    position: relative;
    max-width: 1300px;
    margin: 0 auto;
    height: 260px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 12px 48px rgba(224,123,138,.22), 0 2px 8px rgba(0,0,0,.06);
  }

  /* ── Slides ── */
  .iv-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity .6s ease;
    pointer-events: none;
  }
  .iv-slide--active {
    opacity: 1;
    pointer-events: auto;
  }
  .iv-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.04);
    transition: transform 6s ease;
  }
  .iv-slide--active .iv-img {
    transform: scale(1);
  }
  .iv-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      rgba(20,5,10,.62) 0%,
      rgba(20,5,10,.28) 55%,
      rgba(20,5,10,.05) 100%
    );
  }

  /* ── Caption ── */
  .iv-caption {
    position: absolute;
    bottom: 44px;
    left: 40px;
    max-width: 420px;
    animation: iv-fade-up .55s ease both;
  }
  @keyframes iv-fade-up {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .iv-tag {
    display: inline-block;
    background: #FDACAC;
    color: #5a1a1a;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: 3px 12px;
    border-radius: 100px;
    margin-bottom: 10px;
  }
  .iv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 3vw, 28px);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin: 0 0 8px;
    text-shadow: 0 2px 12px rgba(0,0,0,.25);
  }
  .iv-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: rgba(255,255,255,.82);
    margin: 0;
    line-height: 1.5;
  }

  /* ── Arrows ── */
  .iv-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,.18);
    backdrop-filter: blur(6px);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .2s, transform .2s;
    z-index: 10;
  }
  .iv-arrow:hover {
    background: rgba(253,172,172,.75);
    transform: translateY(-50%) scale(1.08);
  }
  .iv-arrow--prev { left: 16px; }
  .iv-arrow--next { right: 16px; }

  /* ── Dots ── */
  .iv-dots {
    position: absolute;
    bottom: 16px;
    right: 24px;
    display: flex;
    gap: 6px;
    z-index: 10;
  }
  .iv-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,.38);
    cursor: pointer;
    padding: 0;
    transition: background .25s, transform .25s;
  }
  .iv-dot--active {
    background: #FDACAC;
    transform: scale(1.35);
  }

  /* ── Progress bar ── */
  .iv-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FDACAC, #e07b8a);
    border-radius: 0 2px 2px 0;
    animation: iv-progress 4.5s linear forwards;
    z-index: 10;
  }
  @keyframes iv-progress {
    from { width: 0%; }
    to   { width: 100%; }
  }

  @media (max-width: 576px) {
    .iv-track { height: 200px; border-radius: 14px; }
    .iv-caption { left: 20px; bottom: 36px; max-width: 260px; }
    .iv-arrow { width: 30px; height: 30px; }
  }
`

export default Imgviewer