import React, { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
        <path d="M12 8v4M12 16h.01" strokeWidth="2"/>
      </svg>
    ),
    title: 'Freshly Baked',
    sub: 'Made fresh daily\nwith premium ingredients',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    title: 'Custom Made',
    sub: 'Design your cake\nexactly how you want',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Fast Delivery',
    sub: 'On-time delivery\nat your doorstep',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>
      </svg>
    ),
    title: 'Secure Payment',
    sub: '100% safe & secure\npayment options',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      </svg>
    ),
    title: 'Best Support',
    sub: '24/7 customer support\nwe\'re here to help',
  },
];

const WhyChoose = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />
      <style>{CSS}</style>

      <section className="wc-root" ref={ref}>
        {/* Heading */}
        <h2 className={`wc-title${visible ? ' wc-visible' : ''}`}>
          Why Choose CakeShake?
        </h2>

        {/* Cards row */}
        <div className="wc-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className={`wc-card${visible ? ' wc-card-visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="wc-icon-wrap">
                {f.icon}
              </div>
              <div className="wc-text">
                <p className="wc-card-title">{f.title}</p>
                <p className="wc-card-sub">
                  {f.sub.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const CSS = `
  .wc-root {
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    padding: 36px 64px 32px;
  }

  /* heading */
  .wc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 2.8vw, 34px);
    font-weight: 700;
    color: #1a0a0a;
    text-align: center;
    margin: 0 0 28px;
    opacity: 0;
    transform: translateY(20px);
    transition: opacity .6s ease, transform .6s ease;
  }
  .wc-title.wc-visible { opacity: 1; transform: translateY(0); }

  /* grid */
  .wc-grid {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* card */
  .wc-card {
    flex: 1 1 0;
    min-width: 180px;
    max-width: 240px;
    background: #fff;
    border-radius: 18px;
    padding: 24px 20px 26px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    box-shadow: 0 2px 16px rgba(224,92,138,.07), 0 1px 4px rgba(0,0,0,.04);
    border: 1.5px solid #fce8ec;
    cursor: default;
    opacity: 0;
    transform: translateY(24px);
    transition: opacity .55s ease, transform .55s ease,
                box-shadow .25s ease, border-color .25s ease, transform .25s ease;
  }
  .wc-card.wc-card-visible {
    opacity: 1;
    transform: translateY(0);
  }
  .wc-card:hover {
    box-shadow: 0 12px 36px rgba(224,92,138,.16);
    border-color: #f4a0b8;
    transform: translateY(-5px) !important;
  }

  /* icon circle */
  .wc-icon-wrap {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: #fce8ec;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s;
  }
  .wc-card:hover .wc-icon-wrap { background: #e05c8a; }
  .wc-icon-wrap svg {
    width: 22px;
    height: 22px;
    color: #e05c8a;
    transition: color .2s;
  }
  .wc-card:hover .wc-icon-wrap svg { color: #fff; }

  /* text */
  .wc-text { flex: 1; min-width: 0; }
  .wc-card-title {
    font-size: 15px;
    font-weight: 700;
    color: #1a0a0a;
    margin: 0 0 6px;
    line-height: 1.3;
  }
  .wc-card-sub {
    font-size: 13px;
    color: #aaa;
    margin: 0;
    line-height: 1.55;
    font-weight: 400;
  }

  /* responsive */
  @media (min-width: 1400px) {
    .wc-root { padding: 36px 120px 32px; }
    .wc-card { max-width: 280px; padding: 28px 24px 30px; }
  }

  @media (max-width: 900px) {
    .wc-root { padding: 32px 32px 28px; }
    .wc-card { min-width: 160px; max-width: 210px; }
  }

  @media (max-width: 640px) {
    .wc-root { padding: 28px 20px 24px; }
    .wc-grid { gap: 14px; }
    .wc-card {
      flex: 0 0 calc(50% - 7px);
      max-width: none;
      min-width: 0;
    }
  }

  @media (max-width: 380px) {
    .wc-card { flex: 0 0 100%; }
  }
`;

export default WhyChoose;