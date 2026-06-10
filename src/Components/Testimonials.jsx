import React, { useState, useRef, useEffect } from 'react';

const reviews = [
  {
    stars: 5,
    text: '"The cake was better than I imagined! Super delicious and on-time delivery."',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    stars: 5,
    text: '"I ordered a custom birthday cake and it was absolutely perfect. Highly recommend!"',
    name: 'Michael Brown',
    location: 'Los Angeles, USA',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    stars: 5,
    text: '"The design, the taste, the packing — everything was just perfect." Will order again!"',
    name: 'Emily Davis',
    location: 'Chicago, USA',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    stars: 5,
    text: '"Absolutely stunning cake! Everyone at the party was amazed. 10/10 experience."',
    name: 'James Wilson',
    location: 'Houston, USA',
    avatar: 'https://randomuser.me/api/portraits/men/54.jpg',
  },
  {
    stars: 5,
    text: '"Ordered for my wedding — the cake looked and tasted exactly as requested. Love it!"',
    name: 'Olivia Martinez',
    location: 'Miami, USA',
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
  },
];

const CARDS_PER_PAGE = 3;
const TOTAL_PAGES = Math.ceil(reviews.length / CARDS_PER_PAGE);

const Stars = ({ count }) => (
  <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="18" height="18" viewBox="0 0 24 24"
        fill={i < count ? '#f5a623' : '#e8e8e8'}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ))}
  </div>
);

const Testimonials = () => {
  const [page, setPage] = useState(0);
  const [animDir, setAnimDir] = useState(null);
  const [animating, setAnimating] = useState(false);

  const goTo = (next) => {
    if (animating || next === page) return;
    setAnimDir(next > page ? 'left' : 'right');
    setAnimating(true);
    setTimeout(() => {
      setPage(next);
      setAnimating(false);
      setAnimDir(null);
    }, 280);
  };

  const prev = () => goTo(page === 0 ? TOTAL_PAGES - 1 : page - 1);
  const next = () => goTo(page === TOTAL_PAGES - 1 ? 0 : page + 1);

  const visible = reviews.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>

      <section className="tm-root">

        {/* Heading */}
        <h2 className="tm-title">What Our Customers Say</h2>

        {/* Row: arrow + cards + arrow */}
        <div className="tm-row">

          {/* Left arrow */}
          <button className="tm-arrow" onClick={prev} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Cards */}
          <div className={`tm-cards${animating ? ` tm-slide-${animDir}` : ''}`}>
            {visible.map((r, i) => (
              <div key={`${page}-${i}`} className="tm-card">
                <Stars count={r.stars} />
                <p className="tm-text">{r.text}</p>
                <div className="tm-author">
                  <img src={r.avatar} alt={r.name} className="tm-avatar" />
                  <div>
                    <p className="tm-name">{r.name}</p>
                    <p className="tm-loc">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button className="tm-arrow" onClick={next} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

        </div>

        {/* Dots */}
        <div className="tm-dots">
          {[...Array(TOTAL_PAGES)].map((_, i) => (
            <button
              key={i}
              className={`tm-dot${i === page ? ' tm-dot-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Page ${i + 1}`}
            />
          ))}
        </div>

      </section>
    </>
  );
};

const CSS = `
  .tm-root {
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    padding: 52px 40px 40px;
  }

  /* heading */
  .tm-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 2.4vw, 30px);
    font-weight: 700;
    color: #1a0a0a;
    text-align: center;
    margin: 0 0 32px;
  }

  /* row: arrow + cards + arrow */
  .tm-row {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  /* arrow buttons */
  .tm-arrow {
    flex-shrink: 0;
    width: 40px; height: 40px;
    border-radius: 50%;
    border: 2px solid #f2d4dc;
    background: #fff;
    color: #e05c8a;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .15s;
    box-shadow: 0 3px 10px rgba(224,92,138,.10);
  }
  .tm-arrow:hover {
    background: #e05c8a;
    border-color: #e05c8a;
    color: #fff;
    transform: scale(1.08);
  }

  /* cards container */
  .tm-cards {
    flex: 1;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    transition: opacity .28s ease, transform .28s ease;
  }
  .tm-slide-left  { opacity: 0; transform: translateX(-24px); }
  .tm-slide-right { opacity: 0; transform: translateX(24px); }

  /* single card */
  .tm-card {
    background: #fff;
    border: 1.5px solid #f5e8ec;
    border-radius: 18px;
    padding: 24px 22px 22px;
    box-shadow: 0 2px 14px rgba(224,92,138,.07);
    transition: transform .22s ease, box-shadow .22s ease, border-color .22s;
  }
  .tm-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 30px rgba(224,92,138,.14);
    border-color: #f4c5d4;
  }

  .tm-text {
    font-size: 14px;
    color: #444;
    line-height: 1.65;
    margin: 0 0 20px;
    font-style: italic;
    font-weight: 400;
  }

  /* author row */
  .tm-author {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .tm-avatar {
    width: 46px; height: 46px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid #f4c5d4;
    flex-shrink: 0;
  }
  .tm-name {
    font-size: 13px; font-weight: 700;
    color: #1a0a0a; margin: 0 0 2px;
  }
  .tm-loc {
    font-size: 12px; color: #bbb;
    margin: 0; font-weight: 400;
  }

  /* dots */
  .tm-dots {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
  }
  .tm-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    border: none;
    background: #f4c5d4;
    cursor: pointer;
    transition: background .2s, transform .2s, width .2s;
    padding: 0;
  }
  .tm-dot-active {
    background: #e05c8a;
    width: 22px;
    border-radius: 4px;
    transform: none;
  }

  /* responsive */
  @media (max-width: 860px) {
    .tm-root { padding: 40px 20px 32px; }
    .tm-cards { grid-template-columns: repeat(2, 1fr); }
    .tm-card:last-child { display: none; }
  }
  @media (max-width: 540px) {
    .tm-cards { grid-template-columns: 1fr; }
    .tm-card:nth-child(2),
    .tm-card:last-child { display: none; }
  }
`;

export default Testimonials;