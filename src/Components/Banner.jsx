import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ── Import your cake images (place them in src/images/)
import c1 from '../images/ca1.png'; // Birthday Cakes
import c2 from '../images/ca2.png'; // Wedding Cakes
import c3 from '../images/ca3.png'; // Anniversary Cakes
import c4 from '../images/ca4.png'; // Photo Cakes
import c5 from '../images/ca5.png'; // Cartoon Cakes
import c6 from '../images/ca6.png'; // Theme Cakes

const categories = [
  { id: 1, img: c1, name: 'Birthday Cakes',     price: 'Starting $25', slug: '/cakes/birthday'     },
  { id: 2, img: c2, name: 'Wedding Cakes',      price: 'Starting $80', slug: '/cakes/wedding'      },
  { id: 3, img: c3, name: 'Anniversary Cakes',  price: 'Starting $30', slug: '/cakes/anniversary'  },
  { id: 4, img: c4, name: 'Photo Cakes',        price: 'Starting $25', slug: '/cakes/photo'        },
  { id: 5, img: c5, name: 'Cartoon Cakes',      price: 'Starting $30', slug: '/cakes/cartoon'      },
  { id: 6, img: c6, name: 'Theme Cakes',        price: 'Starting $35', slug: '/cakes/theme'        },
];

const ShopByCategory = () => {
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 260, behavior: 'smooth' });
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .sbc-root {
          background: #fff;
          padding: 64px 60px 72px;
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        /* ── heading ── */
        .sbc-head {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 48px;
        }
        .sbc-head h2 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 700;
          color: #1a0a0a;
          margin: 0;
        }
        .sbc-head-icon {
          font-size: 26px;
        }

        /* ── scroll container ── */
        .sbc-outer {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sbc-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -ms-overflow-style: none;
          scrollbar-width: none;
          padding: 16px 4px 20px;
          flex: 1;
        }
        .sbc-track::-webkit-scrollbar { display: none; }

        /* ── card ── */
        .sbc-card {
          flex: 0 0 200px;
          scroll-snap-align: start;
          background: #fff5f7;
          border-radius: 20px;
          padding: 20px 16px 22px;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: transform .25s ease, box-shadow .25s ease, background .2s;
          border: 2px solid transparent;
          position: relative;
          overflow: hidden;
        }
        .sbc-card:hover,
        .sbc-card.active {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(224,92,138,.18);
          background: #fff;
          border-color: #f4c5d4;
        }

        /* shimmer on hover */
        .sbc-card::before {
          content: '';
          position: absolute;
          top: -60%; left: -60%;
          width: 60%; height: 200%;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,.55) 50%,
            transparent 60%
          );
          transform: skewX(-20deg);
          transition: left .5s ease;
          pointer-events: none;
        }
        .sbc-card:hover::before { left: 160%; }

        .sbc-img-wrap {
          width: 130px;
          height: 130px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sbc-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform .35s ease;
          filter: drop-shadow(0 8px 16px rgba(0,0,0,.12));
        }
        .sbc-card:hover .sbc-img {
          transform: scale(1.08) translateY(-4px);
        }
        .sbc-name {
          font-size: 15px;
          font-weight: 700;
          color: #1a0a0a;
          margin: 0 0 6px;
        }
        .sbc-price {
          font-size: 13px;
          color: #e05c8a;
          font-weight: 500;
          margin: 0;
        }

        /* ── arrow buttons ── */
        .sbc-arrow {
          flex-shrink: 0;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 2px solid #f2d4dc;
          background: #fff;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 18px; color: #e05c8a;
          transition: background .2s, border-color .2s, transform .15s;
          box-shadow: 0 4px 12px rgba(224,92,138,.12);
        }
        .sbc-arrow:hover {
          background: #e05c8a;
          border-color: #e05c8a;
          color: #fff;
          transform: scale(1.08);
        }
        .sbc-arrow:active { transform: scale(0.96); }

        @media (max-width: 768px) {
          .sbc-root { padding: 40px 20px 48px; }
          .sbc-card { flex: 0 0 160px; }
          .sbc-img-wrap { width: 100px; height: 100px; }
        }
      `}</style>

      <section className="sbc-root">

        {/* Heading */}
        <div className="sbc-head">
          <span className="sbc-head-icon">🎂</span>
          <h2>Shop By Category</h2>
        </div>

        {/* Scroll row */}
        <div className="sbc-outer">

          {/* Left arrow */}
          <button className="sbc-arrow" onClick={() => scroll(-1)} aria-label="Scroll left">
            ←
          </button>

          {/* Cards track */}
          <div className="sbc-track" ref={trackRef}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.slug}
                className={`sbc-card${hovered === cat.id ? ' active' : ''}`}
                onMouseEnter={() => setHovered(cat.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="sbc-img-wrap">
                  <img src={cat.img} alt={cat.name} className="sbc-img" />
                </div>
                <p className="sbc-name">{cat.name}</p>
                {/* <p className="sbc-price">{cat.price}</p> */}
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          <button className="sbc-arrow" onClick={() => scroll(1)} aria-label="Scroll right">
            →
          </button>

        </div>
      </section>
    </>
  );
};

export default ShopByCategory;