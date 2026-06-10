import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <>
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
      rel="stylesheet"
    />
    <style>{CSS}</style>

    <footer className="ft-root">
      <div className="ft-inner">

        {/* ── Col 1: Brand ── */}
        <div className="ft-col ft-brand">
          {/* Logo */}
          <Link to="/" className="ft-logo">
            <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
              <rect width="36" height="36" rx="8" fill="#fce8ec"/>
              <path d="M9 22h18v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4z" fill="#e05c8a"/>
              <rect x="11" y="16" width="14" height="6" rx="1" fill="#f4a0b8"/>
              <path d="M14 16v-3a1 1 0 012 0v1a1 1 0 002 0v-1a1 1 0 012 0v3"
                stroke="#e05c8a" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="18" cy="11" r="1.5" fill="#e05c8a"/>
            </svg>
            <span className="ft-logo-text">Cake<span>Shake</span></span>
          </Link>

          <p className="ft-brand-desc">
            Creating memorable moments with delicious custom cakes made just for you.
          </p>

          {/* Social icons */}
          <div className="ft-socials">
            {[
              { label: 'Facebook', path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
              { label: 'Instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 6.5A1 1 0 005.5 7.5v9A1 1 0 006.5 17.5h9a1 1 0 001-1v-9a1 1 0 00-1-1h-9z' },
              { label: 'Pinterest', path: 'M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z' },
              { label: 'Twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
            ].map((s) => (
              <a key={s.label} href="#" className="ft-social-btn" aria-label={s.label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path}/>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 2: Quick Links ── */}
        <div className="ft-col">
          <h4 className="ft-col-title">Quick Links</h4>
          <ul className="ft-links">
            {[
              { label: 'Home',        to: '/'                    },
              { label: 'About Us',    to: '/about-us'            },
              { label: 'All Cakes',   to: '/cakes'               },
              { label: 'Custom Cake', to: '/create-your-own-cake'},
              { label: 'Contact Us',  to: '/contact-us'          },
            ].map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="ft-link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 3: Help ── */}
        <div className="ft-col">
          <h4 className="ft-col-title">Help</h4>
          <ul className="ft-links">
            {['FAQs', 'Shipping Policy', 'Return Policy', 'Terms & Conditions', 'Privacy Policy'].map((l) => (
              <li key={l}>
                <a href="#" className="ft-link">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Col 4: Contact Info ── */}
        <div className="ft-col">
          <h4 className="ft-col-title">Contact Info</h4>
          <ul className="ft-contact">
            <li>
              <span className="ft-ci-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </span>
              +1 (234) 567 890
            </li>
            <li>
              <span className="ft-ci-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              hello@cakeshake.com
            </li>
            <li>
              <span className="ft-ci-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </span>
              <span>123 Cake Street,<br/>Sweet City, CA 90210</span>
            </li>
          </ul>
        </div>

        {/* ── Col 5: Opening Hours ── */}
        <div className="ft-col">
          <h4 className="ft-col-title">Opening Hours</h4>
          <ul className="ft-hours">
            <li><span>Mon – Fri:</span> 9AM – 9PM</li>
            <li><span>Sat – Sun:</span> 10AM – 10PM</li>
          </ul>
          <a href="#" className="ft-track-btn">Track Your Order</a>
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="ft-bottom">
        <p>© 2024 CakeShake. All rights reserved.</p>
      </div>
    </footer>
  </>
);

const CSS = `
  .ft-root {
    background: #fce8ec;
    font-family: 'DM Sans', sans-serif;
    padding: 40px 60px 0;
  }

  /* 5-col grid */
  .ft-inner {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .ft-col {
    flex: 1 1 140px;
    min-width: 120px;
  }

  /* brand col is slightly wider */
  .ft-brand { flex: 1.4 1 180px; }

  /* logo */
  .ft-logo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    margin-bottom: 12px;
  }
  .ft-logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #1a0a0a;
  }
  .ft-logo-text span { color: #e05c8a; }

  .ft-brand-desc {
    font-size: 13px;
    color: #888;
    line-height: 1.6;
    margin: 0 0 16px;
    max-width: 200px;
  }

  /* social buttons */
  .ft-socials {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }
  .ft-social-btn {
    width: 34px; height: 34px;
    border-radius: 8px;
    background: #fff;
    border: 1.5px solid #f4c5d4;
    display: flex; align-items: center; justify-content: center;
    color: #888;
    text-decoration: none;
    transition: background .2s, color .2s, border-color .2s;
  }
  .ft-social-btn:hover {
    background: #e05c8a;
    border-color: #e05c8a;
    color: #fff;
  }

  /* column titles */
  .ft-col-title {
    font-size: 14px;
    font-weight: 700;
    color: #1a0a0a;
    margin: 0 0 14px;
    letter-spacing: .01em;
  }

  /* nav links */
  .ft-links {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .ft-link {
    font-size: 13px;
    color: #777;
    text-decoration: none;
    transition: color .15s;
  }
  .ft-link:hover { color: #e05c8a; }

  /* contact info */
  .ft-contact {
    list-style: none;
    margin: 0; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .ft-contact li {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 13px;
    color: #777;
    line-height: 1.5;
  }
  .ft-ci-icon {
    flex-shrink: 0;
    width: 26px; height: 26px;
    border-radius: 50%;
    background: #fff;
    border: 1.5px solid #f4c5d4;
    display: flex; align-items: center; justify-content: center;
    color: #e05c8a;
    margin-top: 1px;
  }

  /* opening hours */
  .ft-hours {
    list-style: none;
    margin: 0 0 18px; padding: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .ft-hours li {
    font-size: 13px;
    color: #777;
  }
  .ft-hours li span {
    font-weight: 600;
    color: #444;
  }

  /* track order button */
  .ft-track-btn {
    display: inline-block;
    background: #e05c8a;
    color: #fff;
    text-decoration: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 13px;
    font-weight: 600;
    transition: background .2s, transform .15s;
    white-space: nowrap;
  }
  .ft-track-btn:hover {
    background: #c9496f;
    transform: translateY(-1px);
    color: #fff;
  }

  /* bottom bar */
  .ft-bottom {
    margin-top: 28px;
    border-top: 1px solid #f4c5d4;
    padding: 16px 0;
    text-align: center;
  }
  .ft-bottom p {
    font-size: 13px;
    color: #aaa;
    margin: 0;
  }

  /* responsive */
  @media (max-width: 900px) {
    .ft-root { padding: 36px 32px 0; }
    .ft-inner { gap: 28px; }
  }
  @media (max-width: 640px) {
    .ft-root { padding: 32px 20px 0; }
    .ft-col { flex: 0 0 calc(50% - 14px); }
    .ft-brand { flex: 0 0 100%; }
  }
  @media (max-width: 380px) {
    .ft-col { flex: 0 0 100%; }
  }
`;

export default Footer;