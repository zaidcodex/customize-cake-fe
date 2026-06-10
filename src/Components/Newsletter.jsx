import React, { useState } from 'react';
import cakeImg from '../images/sc.png';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setEmail('');
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>

      <div className="nl-outer">
        <section className="nl-banner">

          {/* Left text */}
          <div className="nl-left">
            <h3 className="nl-title">Stay Updated with Sweet Offers</h3>
            <p className="nl-sub">Subscribe to get special offers, new designs &amp; exciting discounts</p>
          </div>

          {/* Input + button */}
          <div className="nl-form">
            {submitted ? (
              <div className="nl-success">🎉 You're subscribed!</div>
            ) : (
              <>
                <input
                  className="nl-input"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                />
                <button className="nl-btn" onClick={handleSubmit}>Subscribe Now</button>
              </>
            )}
          </div>

          {/* Cake image — absolutely positioned, overflows top */}
          <div className="nl-img-wrap">
            <img src={cakeImg} alt="Sweet cake" className="nl-cake" />
          </div>

        </section>
      </div>
    </>
  );
};

const CSS = `
  .nl-outer {
    background: #fff;
    padding: 32px 48px;
    font-family: 'DM Sans', sans-serif;
  }

  .nl-banner {
    background: #fce8ec;
    border-radius: 20px;
    display: flex;
    align-items: stretch;
    gap: 40px;
    padding: 28px 40px;
    position: relative;
    overflow: visible;      /* allow cake to overflow top */
    min-height: 0;
  }

  /* left */
  .nl-left {
    flex: 0 0 auto;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .nl-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(16px, 1.6vw, 21px);
    font-weight: 700;
    color: #1a0a0a;
    margin: 0 0 6px;
    line-height: 1.3;
  }
  .nl-sub {
    font-size: 13px;
    color: #999;
    margin: 0;
    line-height: 1.5;
  }

  /* form */
  .nl-form {
    flex: 1;
    display: flex;
    align-items: stretch;
    max-width: 420px;
    align-self: center;
  }
  .nl-input {
    flex: 1;
    height: 44px;
    border: 1.5px solid #f4c5d4;
    border-right: none;
    border-radius: 10px 0 0 10px;
    padding: 0 16px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: #333;
    background: #fff;
    outline: none;
    transition: border-color .2s;
  }
  .nl-input::placeholder { color: #ccc; }
  .nl-input:focus { border-color: #e05c8a; }
  .nl-btn {
    height: 44px;
    padding: 0 20px;
    background: #e05c8a;
    color: #fff;
    border: none;
    border-radius: 0 10px 10px 0;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: background .2s;
  }
  .nl-btn:hover { background: #c9496f; }
  .nl-success {
    font-size: 14px;
    font-weight: 600;
    color: #e05c8a;
  }

  /* cake — in flow, aligned to banner bottom, overflows upward */
  .nl-img-wrap {
    flex-shrink: 0;
    width: 190px;
    height: 190px;
    margin-left: auto;
    align-self: flex-end;  /* anchor to bottom of banner */
    pointer-events: none;
    position: relative;
  }
  .nl-cake {
    width: 190px;
    height: 190px;
    object-fit: contain;
    object-position: center bottom;
    filter: drop-shadow(0 8px 20px rgba(0,0,0,.18));
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(-28px);
    animation: nl-float 4s ease-in-out infinite;
  }
  @keyframes nl-float {
    0%,100% { transform: translateY(-28px); }
    50%      { transform: translateY(-42px); }
  }

  /* responsive */
  @media (max-width: 1024px) {
    .nl-outer { padding: 24px 32px; }
    .nl-banner { padding: 24px 32px; gap: 28px; }
    .nl-img-wrap { width: 160px; height: 160px; }
    .nl-cake { width: 160px; height: 160px; }

  }

  @media (max-width: 768px) {
    .nl-outer { padding: 20px 20px; }
    .nl-banner { padding: 20px 24px; gap: 20px; flex-wrap: wrap; }
    .nl-left { max-width: 100%; flex: 0 0 100%; }
    .nl-form { max-width: 100%; flex: 1 1 auto; }
    .nl-img-wrap { width: 130px; height: 130px; }
    .nl-cake { width: 130px; height: 130px; }
  }

  @media (max-width: 480px) {
    .nl-form { margin-right: 0; }
    .nl-img-wrap { display: none; }
  }
`;

export default Newsletter;