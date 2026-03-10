import React from 'react'

const Banner = () => {
  return (
    <>
      <style>{css}</style>
      <section className="bn-wrap">

        {/* Background image */}
        <img
          src="http://res.cloudinary.com/dyytzksdp/image/upload/v1767538460/apcdpwzr6wgwvbnjmf9b.png"
          alt="Banner"
          className="bn-bg"
        />

        {/* Overlay */}
        <div className="bn-overlay" />

        {/* Content */}
        <div className="bn-content">

          {/* Left — cake photo */}
          <div className="bn-img-wrap">
            <div className="bn-img-ring" />
            <img
              src="https://images.unsplash.com/photo-1706696628425-07811fc5d6f0?q=80&w=880&auto=format&fit=crop"
              alt="Chocolate Cake"
              className="bn-cake-img"
            />
          </div>

          {/* Divider */}
          <div className="bn-divider" />

          {/* Right — text */}
          <div className="bn-text">
            <span className="bn-eyebrow">Our Signature</span>
            <h1 className="bn-title">Chocolate<br />Cakes</h1>
            <p className="bn-desc">
              Rich, indulgent, and made from scratch every single day.
              Our chocolate cakes are layered with velvety ganache and
              finished with a dusting of pure cocoa — a timeless treat
              for every occasion.
            </p>
            <a href="/product" className="bn-btn">Explore Collection →</a>
          </div>

        </div>

        {/* Decorative floating circles */}
        <span className="bn-dot bn-dot--1" />
        <span className="bn-dot bn-dot--2" />
        <span className="bn-dot bn-dot--3" />

      </section>
    </>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .bn-wrap {
    position: relative;
    width: 100%;
    height: 420px;
    overflow: hidden;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Background ── */
  .bn-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transform: scale(1.04);
    filter: blur(1px);
  }
  .bn-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      110deg,
      rgba(15,5,5,.85) 0%,
      rgba(15,5,5,.65) 48%,
      rgba(15,5,5,.35) 100%
    );
  }

  /* ── Layout ── */
  .bn-content {
    position: relative;
    z-index: 2;
    height: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    align-items: center;
  }

  /* ── Cake image ── */
  .bn-img-wrap {
    position: relative;
    flex-shrink: 0;
    width: 230px;
    height: 230px;
  }
  .bn-img-ring {
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 1.5px solid rgba(253,172,172,.35);
    animation: bn-spin 18s linear infinite;
  }
  @keyframes bn-spin { to { transform: rotate(360deg); } }

  .bn-cake-img {
    width: 230px;
    height: 230px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    border: 3px solid rgba(253,172,172,.5);
    box-shadow:
      0 8px 48px rgba(224,123,138,.35),
      0 0 0 8px rgba(253,172,172,.07);
    display: block;
  }

  /* ── Divider ── */
  .bn-divider {
    width: 1px;
    height: 160px;
    background: linear-gradient(to bottom, transparent, rgba(253,172,172,.5), transparent);
    margin: 0 44px;
    flex-shrink: 0;
  }

  /* ── Text ── */
  .bn-text {
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: bn-fadein .65s ease both;
  }
  @keyframes bn-fadein {
    from { opacity:0; transform:translateX(18px); }
    to   { opacity:1; transform:translateX(0); }
  }

  .bn-eyebrow {
    display: inline-block;
    background: #FDACAC;
    color: #5a1a1a;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: .14em;
    text-transform: uppercase;
    padding: 3px 14px;
    border-radius: 100px;
    margin-bottom: 14px;
  }
  .bn-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 4vw, 44px);
    font-weight: 700;
    color: #fff;
    line-height: 1.1;
    margin: 0 0 16px;
    text-shadow: 0 2px 16px rgba(0,0,0,.3);
  }
  .bn-desc {
    font-size: 13.5px;
    font-weight: 300;
    color: rgba(255,255,255,.78);
    line-height: 1.75;
    margin: 0 auto 24px;
    max-width: 380px;
    text-align: center;
  }
  .bn-btn {
    display: inline-block;
    background: #FDACAC;
    color: #4a1010;
    font-size: 13px;
    font-weight: 600;
    padding: 10px 24px;
    border-radius: 100px;
    text-decoration: none;
    transition: background .2s, transform .2s, box-shadow .2s;
    box-shadow: 0 4px 18px rgba(224,123,138,.35);
  }
  .bn-btn:hover {
    background: #e07b8a;
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(224,123,138,.45);
  }

  /* ── Decorative dots ── */
  .bn-dot {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1;
  }
  .bn-dot--1 { width:200px; height:200px; top:-70px; right:50px;  background:rgba(253,172,172,.12); }
  .bn-dot--2 { width:90px;  height:90px;  bottom:28px; right:190px; background:rgba(253,172,172,.09); }
  .bn-dot--3 { width:44px;  height:44px;  top:36px; right:260px; background:rgba(253,172,172,.18); }

  /* ── Mobile ── */
  @media (max-width: 700px) {
    .bn-wrap { height: auto; min-height: 380px; }
    .bn-content {
      flex-direction: column;
      justify-content: center;
      text-align: center;
      padding: 40px 24px 36px;
      gap: 20px;
    }
    .bn-img-wrap { width: 150px; height: 150px; }
    .bn-cake-img { width: 150px; height: 150px; }
    .bn-divider {
      width: 100px; height: 1px; margin: 0;
      background: linear-gradient(to right, transparent, rgba(253,172,172,.5), transparent);
    }
    .bn-text { display:flex; flex-direction:column; align-items:center; }
    .bn-desc { text-align: center; }
    .bn-dot--1 { display: none; }
  }
`

export default Banner