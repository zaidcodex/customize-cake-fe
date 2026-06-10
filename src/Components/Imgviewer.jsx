import React, { useState, useEffect, useCallback } from 'react'

const SLIDES = [
  {
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop',
    tag: 'New Arrivals',
    title: 'Crafted With Love',
    sub: 'Every cake is a little piece of happiness',
  },
  {
    img: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?q=80&w=2070&auto=format&fit=crop',
    tag: 'Custom Orders',
    title: 'Your Vision, Our Art',
    sub: "Tell us your dream cake — we'll make it real",
  },
  {
    img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=2070&auto=format&fit=crop',
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
              className={`iv-slide${i === active ? ' iv-slide--active' : ''}`}
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
                className={`iv-dot${i === active ? ' iv-dot--active' : ''}`}
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
    background: #fff;
    padding: 24px 60px 32px;
  }

  .iv-track {
    position: relative;
    max-width: 1300px;
    margin: 0 auto;
    height: 280px;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 8px 40px rgba(224,92,138,.14), 0 2px 8px rgba(0,0,0,.05);
  }

  /* ── Slides ── */
  .iv-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity .65s ease;
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
    transform: scale(1.05);
    transition: transform 6.5s ease;
  }
  .iv-slide--active .iv-img {
    transform: scale(1);
  }

  /* Pink-tinted gradient overlay — left dark for text, right light/pink */
  .iv-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(60,10,20,.68) 0%,
      rgba(180,60,90,.22) 45%,
      rgba(253,172,172,.10) 100%
    );
  }

  /* ── Caption ── */
  .iv-caption {
    position: absolute;
    bottom: 48px;
    left: 44px;
    max-width: 420px;
    animation: iv-fade-up .55s ease both;
    z-index: 5;
  }
  @keyframes iv-fade-up {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .iv-tag {
    display: inline-block;
    background: #e05c8a;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 100px;
    margin-bottom: 12px;
  }
  .iv-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 3vw, 32px);
    font-weight: 700;
    color: #fff;
    line-height: 1.2;
    margin: 0 0 10px;
    text-shadow: 0 2px 16px rgba(0,0,0,.3);
  }
  .iv-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: rgba(255,255,255,.85);
    margin: 0;
    line-height: 1.55;
  }

  /* ── Arrows ── */
  .iv-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1.5px solid rgba(255,255,255,.35);
    background: rgba(255,255,255,.15);
    backdrop-filter: blur(8px);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .2s;
    z-index: 10;
  }
  .iv-arrow:hover {
    background: #e05c8a;
    border-color: #e05c8a;
    transform: translateY(-50%) scale(1.08);
  }
  .iv-arrow--prev { left: 18px; }
  .iv-arrow--next { right: 18px; }

  /* ── Dots ── */
  .iv-dots {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 7px;
    z-index: 10;
  }
  .iv-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    border: none;
    background: rgba(255,255,255,.4);
    cursor: pointer;
    padding: 0;
    transition: background .25s, width .25s, border-radius .25s;
  }
  .iv-dot--active {
    background: #e05c8a;
    width: 22px;
    border-radius: 4px;
  }

  /* ── Progress bar ── */
  .iv-progress {
    position: absolute;
    bottom: 0; left: 0;
    height: 3px;
    background: linear-gradient(90deg, #e05c8a, #f4a0b8);
    border-radius: 0 2px 2px 0;
    animation: iv-progress 4.5s linear forwards;
    z-index: 10;
  }
  @keyframes iv-progress {
    from { width: 0%; }
    to   { width: 100%; }
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .iv-wrap  { padding: 20px 32px 28px; }
    .iv-track { height: 240px; }
  }
  @media (max-width: 640px) {
    .iv-wrap  { padding: 16px 16px 24px; }
    .iv-track { height: 200px; border-radius: 16px; }
    .iv-caption { left: 20px; bottom: 36px; max-width: 240px; }
    .iv-title { font-size: 18px; }
    .iv-arrow { width: 32px; height: 32px; }
    .iv-arrow--prev { left: 10px; }
    .iv-arrow--next { right: 10px; }
  }
`

export default Imgviewer