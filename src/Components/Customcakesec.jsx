import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import cakeImg from '../images/ck.png';

const steps = [
  { icon: '🎂', step: 'Step 1', title: 'Choose Shape',        sub: 'Round, Heart, Square'      },
  { icon: '🍵', step: 'Step 2', title: 'Select Flavor',       sub: 'Chocolate, Vanilla & more' },
  { icon: '🎨', step: 'Step 3', title: 'Pick Theme',          sub: 'Birthday, Wedding & more'  },
  { icon: '✏️', step: 'Step 4', title: 'Add Personalization', sub: 'Name, Photo, Message'      },
  { icon: '🎉', step: 'Step 5', title: 'Place Order',         sub: "We'll handle the rest!"    },
];

const DashedArrow = () => (
  <svg
    className="cc-connector-svg"
    viewBox="0 0 60 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
  >
    {/* dashed line */}
    <line
      x1="0" y1="10" x2="48" y2="10"
      stroke="#f4a0b8" strokeWidth="2"
      strokeDasharray="5 4" strokeLinecap="round"
    />
    {/* arrowhead */}
    <path
      d="M46 5 L54 10 L46 15"
      stroke="#e05c8a" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const CustomCakeSection = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
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

      <section className="cc-root" ref={ref}>

        {/* ── LEFT ── */}
        <div className={`cc-left${visible ? ' cc-visible' : ''}`}>
          <h2 className="cc-title">Create Your Custom Cake</h2>
          <p className="cc-sub">Easy steps to design your perfect cake</p>

          {/* Steps — each step + connector in a single flex row */}
          <div className="cc-steps">
            {steps.map((s, i) => (
              <React.Fragment key={i}>

                {/* Step */}
                <div className="cc-step" style={{ animationDelay: `${i * 0.1}s` }}>
                  {/* Icon circle */}
                  <div className="cc-icon-wrap">
                    <span className="cc-icon">{s.icon}</span>
                  </div>
                  {/* Text below icon */}
                  <div className="cc-step-text">
                    <span className="cc-step-label">{s.step}</span>
                    <p className="cc-step-title">{s.title}</p>
                    <p className="cc-step-sub">{s.sub}</p>
                  </div>
                </div>

                {/* Connector between steps */}
                {i < steps.length - 1 && (
                  <div className="cc-connector">
                    <DashedArrow />
                  </div>
                )}

              </React.Fragment>
            ))}
          </div>

          {/* CTA */}
          <div className="cc-cta-wrap">
            <button className="cc-cta" onClick={() => history.push('/create-your-own-cake')}>
              Start Designing Now &nbsp;→
            </button>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={`cc-right${visible ? ' cc-visible' : ''}`}>
          <div className="cc-blob" />
          {[
            { size: 10, top: '10%', left: '6%',  delay: '0s'   },
            { size:  7, top: '25%', left: '86%', delay: '.4s'  },
            { size: 13, top: '65%', left: '10%', delay: '.8s'  },
            { size:  8, top: '75%', left: '78%', delay: '1.2s' },
            { size:  6, top: '42%', left: '3%',  delay: '.6s'  },
          ].map((p, i) => (
            <div key={i} className="cc-petal" style={{
              width: p.size, height: p.size,
              top: p.top, left: p.left,
              animationDelay: p.delay,
            }} />
          ))}
          <img src={cakeImg} alt="Custom cake" className="cc-cake-img" />
        </div>

      </section>
    </>
  );
};

const CSS = `
  /* ─── root ─────────────────────────────────────── */
  .cc-root {
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    padding: 24px 60px 24px 72px;
    overflow: hidden;
    position: relative;
    min-height: 400px;
  }

  /* ─── left col ───────────────────────────────── */
  .cc-left {
    flex: 1 1 0;
    min-width: 0;
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .7s ease, transform .7s ease;
  }
  .cc-left.cc-visible { opacity: 1; transform: translateY(0); }

  .cc-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(22px, 2.4vw, 34px);
    font-weight: 700;
    color: #1a0a0a;
    margin: 0 0 8px;
  }
  .cc-sub {
    font-size: 14px;
    color: #aaa;
    margin: 0 0 24px;
    font-weight: 400;
  }

  /* ─── steps row ──────────────────────────────── */
  /*
    Key layout technique:
    - Each .cc-step gets flex: 1 so ALL steps share equal width
    - Each .cc-connector gets flex: 0 0 auto (fixed width)
    - This makes the icons always evenly distributed, connectors always between them
    - The connector is vertically centered using align-items: center on the row
      and a negative translateY that shifts it UP by half the text-below-icon height
  */
  .cc-steps {
    display: flex;
    flex-direction: row;
    align-items: flex-start;  /* top-align so icon+text stay together */
    gap: 0;
    margin-bottom: 24px;
    width: 100%;
  }

  /* each step takes equal share of the row */
  .cc-step {
    flex: 1 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    animation: cc-popin .5s ease both;
  }
  @keyframes cc-popin {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* icon circle */
  .cc-icon-wrap {
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #fce8ec;
    border: 2px solid #f4c5d4;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s, transform .2s, border-color .2s;
  }
  .cc-step:hover .cc-icon-wrap {
    background: #e05c8a;
    border-color: #e05c8a;
    transform: translateY(-4px);
  }
  .cc-step:hover .cc-icon { filter: brightness(10); }
  .cc-icon { font-size: 24px; line-height: 1; transition: filter .2s; }

  /* text group sits below the icon */
  .cc-step-text {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }
  .cc-step-label {
    font-size: 12px;
    font-weight: 600;
    color: #e05c8a;
    letter-spacing: .03em;
  }
  .cc-step-title {
    font-size: 13px;
    font-weight: 700;
    color: #1a0a0a;
    margin: 0;
    line-height: 1.3;
  }
  .cc-step-sub {
    font-size: 11px;
    color: #bbb;
    margin: 0;
    line-height: 1.4;
    font-weight: 400;
  }

  /* ─── connector ──────────────────────────────── */
  /*
    The connector sits in the SAME flex row as the steps.
    We DON'T use flex:1 here — fixed width keeps it tight.
    To vertically center the arrow with the ICON (not the full card),
    we use align-self: flex-start + padding-top to match the icon center.
    Icon height = 64px, so center = 32px from top of step.
  */
  .cc-connector {
    flex: 0 0 auto;
    align-self: flex-start;
    padding-top: 22px;        /* pushes connector down to icon vertical center */
    display: flex;
    align-items: center;
  }
  .cc-connector-svg {
    width: clamp(32px, 4vw, 60px);
    height: 20px;
    display: block;
  }

  /* ─── CTA ────────────────────────────────────── */
  .cc-cta-wrap { display: flex; justify-content: center; }
  .cc-cta {
    background: #e05c8a;
    color: #fff;
    border: none;
    border-radius: 50px;
    padding: 14px 36px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s, transform .15s, box-shadow .2s;
    box-shadow: 0 6px 20px rgba(224,92,138,.32);
    letter-spacing: .01em;
    white-space: nowrap;
  }
  .cc-cta:hover {
    background: #c9496f;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(224,92,138,.42);
  }

  /* ─── right col ──────────────────────────────── */
  .cc-right {
    flex: 0 0 clamp(240px, 28vw, 380px);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transform: translateX(32px);
    transition: opacity .8s ease .2s, transform .8s ease .2s;
    min-height: 320px;
  }
  .cc-right.cc-visible { opacity: 1; transform: translateX(0); }

  .cc-blob {
    position: absolute;
    width: 90%; height: 90%;
    max-width: 340px; max-height: 340px;
    border-radius: 50%;
    background: radial-gradient(circle, #fce8ec 0%, #fff5f8 55%, transparent 100%);
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
  }
  .cc-petal {
    position: absolute;
    border-radius: 50% 0 50% 0;
    background: #f4a0b8;
    opacity: 0.55;
    z-index: 1;
    animation: cc-float 4s ease-in-out infinite;
  }
  @keyframes cc-float {
    0%,100% { transform: translateY(0) rotate(0deg); opacity: .45; }
    50%      { transform: translateY(-12px) rotate(20deg); opacity: .75; }
  }
  .cc-cake-img {
    position: relative; z-index: 2;
    width: 100%;
    object-fit: contain;
    filter: drop-shadow(0 20px 40px rgba(224,92,138,.22));
    animation: cc-float-cake 5s ease-in-out infinite;
  }
  @keyframes cc-float-cake {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-14px); }
  }

  /* ─── responsive ─────────────────────────────── */

  /* large screens: more breathing room */
  @media (min-width: 1400px) {
    .cc-root { padding: 32px 120px; }
    .cc-icon-wrap { width: 72px; height: 72px; }
    .cc-icon { font-size: 28px; }
    .cc-connector { padding-top: 26px; }
    .cc-step-title { font-size: 14px; }
    .cc-step-sub   { font-size: 12px; }
  }

  /* tablet: slightly tighter */
  @media (max-width: 1100px) {
    .cc-root { padding: 28px 40px; gap: 24px; }
    .cc-icon-wrap { width: 54px; height: 54px; }
    .cc-icon { font-size: 20px; }
    .cc-connector { padding-top: 17px; }
  }

  /* stack vertically */
  @media (max-width: 860px) {
    .cc-root {
      flex-direction: column;
      padding: 32px 24px 36px;
      text-align: center;
    }
    .cc-left  { width: 100%; }
    .cc-steps { justify-content: center; }
    .cc-right {
      flex: 0 0 auto;
      width: clamp(200px, 65vw, 300px);
      margin-top: 24px;
    }
    .cc-connector { padding-top: 17px; }
  }

  /* small mobile: hide connectors, wrap steps in grid */
  @media (max-width: 540px) {
    .cc-steps {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px 12px;
    }
    .cc-connector { display: none; }
    .cc-icon-wrap { width: 48px; height: 48px; }
    .cc-icon { font-size: 18px; }
  }
`;

export default CustomCakeSection;