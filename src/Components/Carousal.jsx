import React from 'react';
import { Link } from 'react-router-dom';
import cakeImg from '../images/cake.png'; // ← move the uploaded cake image here

/* ── floating orb data ───────────────────────────────────── */
const orbs = [
  { size: 18, top: '8%',  left: '52%',  delay: '0s',   dur: '4s'  },
  { size: 13, top: '6%',  left: '72%',  delay: '0.6s', dur: '5s'  },
  { size: 22, top: '18%', left: '88%',  delay: '1.2s', dur: '3.5s'},
  { size: 16, top: '42%', left: '57%',  delay: '0.3s', dur: '4.5s'},
  { size: 11, top: '68%', left: '64%',  delay: '1.8s', dur: '3.8s'},
  { size: 20, top: '78%', left: '82%',  delay: '0.9s', dur: '5.2s'},
  { size: 14, top: '55%', left: '94%',  delay: '2.1s', dur: '4.2s'},
];

const Hero = () => (
  <>
    {/* ── Google Fonts ── */}
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap"
      rel="stylesheet"
    />

    <style>{`
      @keyframes floatY {
        0%,100% { transform: translateY(0px) scale(1); }
        50%      { transform: translateY(-14px) scale(1.05); }
      }
      @keyframes floatCake {
        0%,100% { transform: translateY(0px); }
        50%      { transform: translateY(-18px); }
      }
      @keyframes fadeSlideUp {
        from { opacity:0; transform:translateY(24px); }
        to   { opacity:1; transform:translateY(0); }
      }
      @keyframes popIn {
        from { opacity:0; transform:scale(0.8) translateY(10px); }
        to   { opacity:1; transform:scale(1) translateY(0); }
      }
      @keyframes arrowBounce {
        0%,100% { transform: translateX(0); }
        50%      { transform: translateX(6px); }
      }

      .hs-root {
        background: #fff;
        font-family: 'DM Sans', sans-serif;
        min-height: 88vh;
        display: flex;
        align-items: center;
        padding: 60px 80px 40px;
        overflow: hidden;
        position: relative;
      }

      /* left col */
      .hs-left {
        flex: 1;
        max-width: 520px;
        animation: fadeSlideUp .9s ease both;
      }
      .hs-badge {
        display: inline-flex; align-items: center; gap: 8px;
        background: #fce8ec; color: #e05c8a;
        font-size: 13px; font-weight: 600;
        padding: 6px 16px; border-radius: 50px;
        margin-bottom: 28px;
      }
      .hs-heading {
        font-family: 'Playfair Display', serif;
        font-size: clamp(42px, 5vw, 62px);
        font-weight: 800;
        line-height: 1.1;
        color: #1a0a0a;
        margin: 0 0 24px;
      }
      .hs-heading span { color: #e05c8a; }
      .hs-sub {
        font-size: 16px; color: #666; line-height: 1.65;
        margin: 0 0 36px; max-width: 380px;
      }
      .hs-btns { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
      .hs-btn-primary {
        background: #e05c8a; color: #fff;
        border: none; border-radius: 50px;
        padding: 14px 30px; font-size: 15px; font-weight: 600;
        cursor: pointer; text-decoration: none;
        transition: background .2s, transform .15s, box-shadow .2s;
        box-shadow: 0 6px 20px rgba(224,92,138,.35);
      }
      .hs-btn-primary:hover {
        background: #c9496f; transform: translateY(-2px);
        box-shadow: 0 10px 28px rgba(224,92,138,.45);
        color: #fff;
      }
      .hs-btn-secondary {
        background: #fff; color: #1a0a0a;
        border: 2px solid #e8e8e8; border-radius: 50px;
        padding: 14px 28px; font-size: 15px; font-weight: 600;
        cursor: pointer; text-decoration: none;
        transition: border-color .2s, transform .15s;
      }
      .hs-btn-secondary:hover {
        border-color: #e05c8a; color: #e05c8a;
        transform: translateY(-2px);
      }
      .hs-divider {
        width: 48px; height: 3px;
        background: linear-gradient(90deg, #e05c8a, #f4a0b8);
        border-radius: 2px; margin-bottom: 28px;
      }
      .hs-features { display: flex; gap: 32px; flex-wrap: wrap; }
      .hs-feat {
        display: flex; align-items: flex-start; gap: 12px;
      }
      .hs-feat-icon {
        width: 40px; height: 40px; background: #fce8ec;
        border-radius: 10px; display: flex; align-items: center;
        justify-content: center; font-size: 18px; flex-shrink: 0;
      }
      .hs-feat-text strong { display:block; font-size:14px; font-weight:700; color:#1a0a0a; }
      .hs-feat-text span  { font-size:12px; color:#999; }

      /* right col */
      .hs-right {
        flex: 1; position: relative;
        display: flex; justify-content: center; align-items: center;
        min-height: 560px;
        animation: fadeSlideUp 1s ease .15s both;
      }

      /* big blurred circle bg */
      .hs-blob {
        position: absolute;
        width: 480px; height: 480px;
        background: radial-gradient(circle, #fce8ec 0%, #fff5f8 60%, transparent 100%);
        border-radius: 50%;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }

      /* cake image */
      .hs-cake {
        position: relative; z-index: 1;
        width: clamp(320px, 40vw, 500px);
        animation: floatCake 5s ease-in-out infinite;
        filter: drop-shadow(0 24px 48px rgba(224,92,138,.18));
      }

      /* floating pink orbs */
      .hs-orb {
        position: absolute; border-radius: 50%; z-index: 2;
        background: radial-gradient(circle at 35% 35%, #f4a0b8, #e05c8a);
        box-shadow: 0 4px 12px rgba(224,92,138,.3);
      }

      /* badge cards */
      .hs-card {
        position: absolute; z-index: 3;
        background: #fff;
        border-radius: 14px;
        box-shadow: 0 8px 32px rgba(0,0,0,.10);
        padding: 12px 16px;
        display: flex; align-items: center; gap: 10px;
        animation: popIn .7s ease both;
      }
      .hs-card-customers {
        top: 12%; right: 4%;
        animation-delay: .6s;
      }
      .hs-card-love {
        bottom: 14%; right: 0%;
        flex-direction: column; align-items: flex-end;
        text-align: right;
        animation-delay: .9s;
      }
      .hs-card-avatars {
        display: flex;
      }
      .hs-avatar {
        width: 28px; height: 28px; border-radius: 50%;
        border: 2px solid #fff; margin-left: -8px;
        font-size: 14px; background: #fce8ec;
        display: flex; align-items: center; justify-content: center;
      }
      .hs-avatar:first-child { margin-left: 0; }
      .hs-card-text strong { font-size:14px; font-weight:700; color:#1a0a0a; }
      .hs-card-text span   { font-size:11px; color:#999; display:block; }
      .hs-arrow {
        position: absolute; bottom: 22%; right: 10%;
        z-index: 3; animation: arrowBounce 1.4s ease-in-out infinite;
      }
      .hs-love-label {
        font-size: 13px; font-weight: 700; color: #1a0a0a; line-height: 1.3;
      }
      .hs-love-sub { font-size: 11px; color: #999; }

      @media (max-width: 900px) {
        .hs-root { flex-direction: column; padding: 40px 24px 32px; text-align: center; }
        .hs-left { max-width: 100%; }
        .hs-btns, .hs-features { justify-content: center; }
        .hs-right { min-height: 340px; }
        .hs-cake { width: 260px; }
        .hs-blob { width: 300px; height: 300px; }
      }
    `}</style>

    <section className="hs-root">

      {/* ── LEFT ── */}
      <div className="hs-left">
        <div className="hs-badge">
          🎂 Design Your Dream Cake
        </div>

        <h1 className="hs-heading">
          Make Every<br />
          Occasion <span>Sweeter</span>
        </h1>

        <p className="hs-sub">
          Create and order custom cakes online.<br />
          Fresh, delicious &amp; made with love ❤️
        </p>

        <div className="hs-btns">
          <Link to="/create-your-own-cake" className="hs-btn-primary">
            Create Your Own Cake
          </Link>
          <Link to="/cakes" className="hs-btn-secondary">
            Explore Cakes 🎨
          </Link>
        </div>

        <div className="hs-divider" />

        <div className="hs-features">
          <div className="hs-feat">
            <div className="hs-feat-icon">🌿</div>
            <div className="hs-feat-text">
              <strong>100% Eggless</strong>
              <span>Fresh &amp; Healthy</span>
            </div>
          </div>
          <div className="hs-feat">
            <div className="hs-feat-icon">🚚</div>
            <div className="hs-feat-text">
              <strong>On-Time Delivery</strong>
              <span>Your Cakery, On Time</span>
            </div>
          </div>
          <div className="hs-feat">
            <div className="hs-feat-icon">⭐</div>
            <div className="hs-feat-text">
              <strong>Best Quality</strong>
              <span>Premium Ingredients</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT ── */}
      <div className="hs-right">
        {/* background blob */}
        <div className="hs-blob" />

        {/* floating orbs */}
        {orbs.map((o, i) => (
          <div key={i} className="hs-orb" style={{
            width: o.size, height: o.size,
            top: o.top, left: o.left,
            animation: `floatY ${o.dur} ease-in-out ${o.delay} infinite`,
          }} />
        ))}

        {/* cake image — use the uploaded cake-hero.png */}
        <img
          src={cakeImg}
          alt="CakeShake signature cake"
          className="hs-cake"
        />

        {/* 10K+ Happy Customers card */}
        <div className="hs-card hs-card-customers">
          <div className="hs-card-avatars">
            <div className="hs-avatar">😊</div>
            <div className="hs-avatar">🥰</div>
          </div>
          <div className="hs-card-text">
            <strong>10K+ 🎉</strong>
            <span>Happy Customers</span>
          </div>
        </div>

        {/* arrow + Made with Love & Care */}
        <div style={{ position:'absolute', bottom:'12%', right:'2%', zIndex:3, textAlign:'right' }}>
          {/* curved arrow SVG */}
          <svg width="48" height="40" viewBox="0 0 48 40" fill="none"
            style={{ display:'block', marginLeft:'auto', marginRight:'12px',
              animation:'arrowBounce 1.4s ease-in-out infinite' }}>
            <path d="M4 4 C12 4, 36 10, 44 36" stroke="#e05c8a" strokeWidth="2"
              strokeLinecap="round" fill="none" strokeDasharray="4 3"/>
            <path d="M38 32 L44 36 L40 28" stroke="#e05c8a" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <div className="hs-love-label">Made with</div>
          <div className="hs-love-sub">Love &amp; Care</div>
        </div>
      </div>
    </section>
  </>
);

export default Hero;