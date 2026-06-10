import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppContext from '../Context/appContext';
import Logo from '../images/logo.png'

/* ─── inline styles ─────────────────────────────────────── */
const S = {
  topBar: {
    backgroundColor: '#fce8ec',
    padding: '7px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    color: '#555',
    fontFamily: "'DM Sans', sans-serif",
  },
  topLeft: { display: 'flex', gap: '28px', alignItems: 'center' },
  topRight: { display: 'flex', gap: '24px', alignItems: 'center' },
  topItem: { display: 'flex', alignItems: 'center', gap: '6px' },
  topIcon: { color: '#e05c8a', fontSize: '14px' },

  nav: (mob) => ({
    backgroundColor: '#fff',
    padding: mob ? '0 16px' : '0 48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: mob ? '60px' : '68px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    fontFamily: "'DM Sans', sans-serif",
  }),

  logo: { display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' },
  logoText: (mob) => ({
    fontFamily: "'Playfair Display', serif",
    fontSize: mob ? '18px' : '22px', fontWeight: '700',
    color: '#1a1a1a', letterSpacing: '-0.3px',
  }),
  logoSpan: { color: '#e05c8a' },

  navList: {
    display: 'flex', alignItems: 'center',
    gap: '4px', listStyle: 'none', margin: 0, padding: 0,
    height: '68px',
  },

  navItem: {
    display: 'flex', alignItems: 'center',
    height: '100%', position: 'relative',
  },

  navLink: (active) => ({
    display: 'flex', alignItems: 'center', gap: '4px',
    padding: '0 14px', height: '100%',
    color: active ? '#e05c8a' : '#333',
    fontWeight: active ? '600' : '500',
    fontSize: '15px', textDecoration: 'none',
    cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'color .2s',
    position: 'relative',
  }),

  activeBar: {
    position: 'absolute', bottom: '0', left: '14px',
    right: '14px', height: '3px',
    backgroundColor: '#e05c8a',
    borderRadius: '2px 2px 0 0',
  },

  dropdownWrapper: {
    position: 'relative', display: 'flex',
    alignItems: 'center', height: '100%',
  },

  dropdown: {
    position: 'absolute', top: '100%', left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#fff', borderRadius: '10px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.13)',
    minWidth: '180px', padding: '8px 0',
    border: '1px solid #f2d4dc',
    zIndex: 999,
  },

  dropdownItem: {
    display: 'block', padding: '10px 20px',
    color: '#333', fontSize: '14px', fontWeight: '500',
    textDecoration: 'none', transition: 'background .15s, color .15s',
  },

  navRight: { display: 'flex', alignItems: 'center', gap: '8px' },

  cartBtn: {
    position: 'relative', background: 'none',
    border: 'none', cursor: 'pointer', padding: '4px',
    textDecoration: 'none',
  },
  cartIcon: { fontSize: '22px', color: '#333' },
  cartBadge: {
    position: 'absolute', top: '-4px', right: '-6px',
    backgroundColor: '#e05c8a', color: '#fff',
    borderRadius: '50%', width: '18px', height: '18px',
    fontSize: '10px', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },

  loginBtn: (mob) => ({
    backgroundColor: '#e05c8a', color: '#fff',
    border: 'none', borderRadius: '8px',
    padding: mob ? '7px 12px' : '10px 20px',
    fontSize: mob ? '12px' : '14px', fontWeight: '600',
    cursor: 'pointer', textDecoration: 'none',
    transition: 'background .2s, transform .15s',
    whiteSpace: 'nowrap', display: 'inline-block',
  }),

  bar: { width: '24px', height: '2px', backgroundColor: '#333', borderRadius: '2px' },
};

/* ─── component ─────────────────────────────────────────── */
const Navbar = () => {
  const location = useLocation();
  const context = useContext(AppContext);
  const { getCategories, getSubCategories } = context;

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const path = location.pathname;

  // Returns true if this nav item should be highlighted
  const isActive = (to) => {
    if (to === '/') return path === '/';
    return path.startsWith(to);
  };

  // Returns true if any subcategory of this category is in the current path
  const isCatActive = (cat) => {
    const catSlug = cat.categoryName.toLowerCase().replace(/\s+/g, '-');
    return path.startsWith(`/${catSlug}`);
  };

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const func = async () => {
      const cat = await getCategories();
      const subCat = await getSubCategories();
      setCategories(cat || []);
      setSubCategories(subCat || []);
    };
    func();
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [path]);

  const chevron = (open) => (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none"
      style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', marginTop: '1px' }}>
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const NavLink = ({ to, children, active }) => (
    <Link
      to={to}
      style={S.navLink(active)}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#e05c8a'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#333'; }}
    >
      {children}
      {active && <span style={S.activeBar} />}
    </Link>
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
        rel="stylesheet"
      />

      {/* ── Top Bar ── */}
      {!isMobile && <div style={S.topBar}>
        <div style={S.topLeft}>
          <span style={S.topItem}><span style={S.topIcon}>🎂</span> 100% Eggless Cakes</span>
          <span style={S.topItem}><span style={S.topIcon}>🚚</span> Same Day Delivery</span>
          <span style={S.topItem}><span style={S.topIcon}>📍</span> Order Tracking</span>
        </div>
        <div style={S.topRight}>
          <span style={S.topItem}><span style={S.topIcon}>📞</span> +1 (234) 567 890</span>
          <span style={S.topItem}><span style={S.topIcon}>🔄</span> Track Order</span>
        </div>
      </div>}

      {/* ── Main Navbar ── */}
      <nav style={S.nav(isMobile)}>

        {/* Logo */}
        <Link to="/" style={S.logo}>
            <img  width="70px" height="60px" src={Logo} alt="Cake Shake" />
          {/* <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#fce8ec"/>
            <path d="M9 22h18v4a2 2 0 01-2 2H11a2 2 0 01-2-2v-4z" fill="#e05c8a"/>
            <rect x="11" y="16" width="14" height="6" rx="1" fill="#f4a0b8"/>
            <path d="M14 16v-3a1 1 0 012 0v1a1 1 0 002 0v-1a1 1 0 012 0v3"
              stroke="#e05c8a" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="18" cy="11" r="1.5" fill="#e05c8a"/>
            <path d="M18 9.5V7" stroke="#e05c8a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg> */}
          {/* <span style={S.logoText(isMobile)}>Cake<span style={S.logoSpan}>Shake</span></span> */}
        </Link>

        {/* Desktop Nav */}
        {!isMobile && (
          <ul style={S.navList}>

            <li style={S.navItem}>
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
            </li>

            {categories.map((cat) => {
              const subs = subCategories.filter((s) => s.categoryId === cat._id);
              const isOpen = openDropdown === cat._id;
              const active = isCatActive(cat);
              return (
                <li key={cat._id} style={S.navItem}>
                  <div
                    style={S.dropdownWrapper}
                    onMouseEnter={() => setOpenDropdown(cat._id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <span
                      style={S.navLink(active)}
                      onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = '#e05c8a'; }}
                      onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = '#333'; }}
                    >
                      {cat.categoryName} {chevron(isOpen)}
                      {active && <span style={S.activeBar} />}
                    </span>

                    {isOpen && subs.length > 0 && (
                      <div style={S.dropdown}>
                        {subs.map((sub) => (
                          <Link
                            key={sub._id}
                            style={S.dropdownItem}
                            to={`/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}${sub.slug}/${sub._id}`}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#fce8ec'; e.currentTarget.style.color = '#e05c8a'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333'; }}
                          >
                            {sub.subCategoryName}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}

            <li style={S.navItem}>
              <NavLink to="/create-your-own-cake" active={isActive('/create-your-own-cake')}>
                Customize Cake
              </NavLink>
            </li>

            <li style={S.navItem}>
              <NavLink to="/about-us" active={isActive('/about-us')}>
                About Us
              </NavLink>
            </li>

            <li style={S.navItem}>
              <NavLink to="/contact-us" active={isActive('/contact-us')}>
                Contact Us
              </NavLink>
            </li>

          </ul>
        )}

        {/* Right: cart + login + hamburger */}
        <div style={S.navRight}>
          {/* <Link to="/cart" style={S.cartBtn}>
            <span style={S.cartIcon}>🛒</span>
            <span style={S.cartBadge}>3</span>
          </Link> */}

          <Link
            to="/login"
            style={S.loginBtn(isMobile)}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c9496f'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#e05c8a'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            Track Your Orders
          </Link>

          {isMobile && (
            <button
              style={{ display: 'flex', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span style={S.bar} />
              <span style={S.bar} />
              <span style={S.bar} />
            </button>
          )}
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isMobile && mobileOpen && (
        <div style={{
          backgroundColor: '#fff', padding: '16px 24px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          fontFamily: "'DM Sans', sans-serif",
          borderTop: '1px solid #f2d4dc',
        }}>
          {[
            { label: 'Home', to: '/' },
            { label: 'Customize Cake', to: '/create-your-own-cake' },
            { label: 'About Us', to: '/about-us' },
            { label: 'Contact Us', to: '/contact-us' },
          ].map((item) => {
            const active = isActive(item.to);
            return (
              <Link key={item.to} to={item.to}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '12px 4px',
                  color: active ? '#e05c8a' : '#333',
                  fontWeight: active ? '600' : '500',
                  fontSize: '15px', textDecoration: 'none',
                  borderBottom: '1px solid #fce8ec',
                  borderLeft: active ? '3px solid #e05c8a' : '3px solid transparent',
                  paddingLeft: '12px',
                }}>
                {item.label}
              </Link>
            );
          })}

          {categories.map((cat) => {
            const active = isCatActive(cat);
            return (
              <div key={cat._id}>
                <div style={{
                  padding: '12px 12px', fontWeight: '600',
                  color: active ? '#e05c8a' : '#555',
                  borderBottom: '1px solid #fce8ec',
                  borderLeft: active ? '3px solid #e05c8a' : '3px solid transparent',
                }}>
                  {cat.categoryName}
                </div>
                {subCategories
                  .filter((s) => s.categoryId === cat._id)
                  .map((sub) => (
                    <Link
                      key={sub._id}
                      to={`/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}${sub.slug}/${sub._id}`}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block', padding: '10px 24px',
                        color: '#555', fontSize: '14px',
                        textDecoration: 'none', borderBottom: '1px solid #fce8ec',
                      }}>
                      {sub.subCategoryName}
                    </Link>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;