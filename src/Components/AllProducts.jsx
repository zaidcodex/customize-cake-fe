import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppContext from '../Context/appContext';
import ImgViewer from './Imgviewer';

/* ── Stars ── */
const Stars = ({ rating = 4.5 }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < full ? '#f5a623' : i === full && half ? 'url(#half)' : '#e8e8e8'}>
          {i === full && half && (
            <defs>
              <linearGradient id="half"><stop offset="50%" stopColor="#f5a623"/><stop offset="50%" stopColor="#e8e8e8"/></linearGradient>
            </defs>
          )}
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
};

const AllProducts = () => {
  const context = useContext(AppContext);
  const { getProductBySubCat } = context;
  const { id } = useParams();

  const [allProducts, setAllProducts]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [search, setSearch]             = useState('');
  const [filterOpen, setFilterOpen]     = useState(false);
  const [sortBy, setSortBy]             = useState('latest');
  const [priceMin, setPriceMin]         = useState('');
  const [priceMax, setPriceMax]         = useState('');
  const [inStockOnly, setInStockOnly]   = useState(false);
  const [hoveredId, setHoveredId]       = useState(null);

  useEffect(() => {
    setLoading(true);
    const func = async () => {
      const data = await getProductBySubCat(id);
      setAllProducts(data?.products || []);
      setLoading(false);
    };
    func();
  }, [id]);

  /* filtering + sorting */
  const filtered = allProducts
    .filter(p => {
      const name = p.productName?.toLowerCase() || '';
      if (search && !name.includes(search.toLowerCase())) return false;
      const price = p.sizes?.[0]?.price || 0;
      if (priceMin && price < Number(priceMin)) return false;
      if (priceMax && price > Number(priceMax)) return false;
      if (inStockOnly && !p.isAvailable) return false;
      return true;
    })
    .sort((a, b) => {
      const pa = a.sizes?.[0]?.price || 0;
      const pb = b.sizes?.[0]?.price || 0;
      if (sortBy === 'priceLowHigh') return pa - pb;
      if (sortBy === 'priceHighLow') return pb - pa;
      return 0;
    });

  const resetFilters = () => {
    setSortBy('latest'); setPriceMin(''); setPriceMax(''); setInStockOnly(false);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>

      {/* Image viewer banner */}
      <div style={{ padding: '0 16px' }}><ImgViewer /></div>

      {/* ── Search + Filter bar ── */}
      <div className="ap-bar">
        <div className="ap-search-wrap">
          <svg className="ap-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            className="ap-search"
            type="text"
            placeholder="Search cakes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button className="ap-search-clear" onClick={() => setSearch('')}>✕</button>
          )}
        </div>

        <button className="ap-filter-btn" onClick={() => setFilterOpen(true)}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/>
            <line x1="11" y1="18" x2="13" y2="18"/>
          </svg>
          Filter &amp; Sort
        </button>
      </div>

      {/* ── Product Grid ── */}
      <div className="ap-root">
        {loading ? (
          <div className="ap-center">
            <div className="ap-spinner"/>
          </div>
        ) : filtered.length === 0 ? (
          <div className="ap-center">
            <p style={{ color: '#bbb', fontSize: '15px' }}>No cakes found.</p>
          </div>
        ) : (
          <div className="ap-grid">
            {filtered.map((product, idx) => {
              const price = product.sizes?.[0]?.price || product.price || 0;
              const img   = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop';
              const desc  = product.productDesc?.replace(/<[^>]+>/g, '').slice(0, 72) + '...' || '';
              const rating = product.rating || 4.5;
              const isHov = hoveredId === product._id;

              return (
                <div
                  key={product._id}
                  className={`ap-card${isHov ? ' ap-card--hov' : ''}${!product.isAvailable ? ' ap-card--oos' : ''}`}
                  style={{ animationDelay: `${idx * 0.06}s` }}
                  onMouseEnter={() => setHoveredId(product._id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => window.location.href = `/product/${product._id}`}
                >
                  {/* Wishlist */}
                  <button className="ap-heart" onClick={e => e.stopPropagation()} aria-label="Wishlist">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                    </svg>
                  </button>

                  {/* Image */}
                  <div className="ap-img-wrap">
                    <img src={img} alt={product.productName} className="ap-img"/>
                    {!product.isAvailable && <span className="ap-oos-badge">Out of Stock</span>}
                  </div>

                  {/* Body */}
                  <div className="ap-body">
                    <h5 className="ap-name">{product.productName}</h5>
                    {desc && <p className="ap-desc">{desc}</p>}

                    <div className="ap-row">
                      <span className="ap-price">Rs. {price}</span>
                      <span className="ap-rating">
                        <Stars rating={rating}/>
                        <span className="ap-rating-num">{rating.toFixed(1)}</span>
                      </span>
                    </div>

                    <div className="ap-actions">
                      <button
                        className="ap-btn-cart"
                        disabled={!product.isAvailable}
                        onClick={e => { e.stopPropagation(); window.location.href = `/product/${product._id}`; }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ marginRight: '6px', flexShrink: 0 }}>
                          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                          <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.68l1.6-9.32H6"/>
                        </svg>
                        Add to Cart
                      </button>
                      <Link
                        to={`/product/${product._id}`}
                        className="ap-btn-eye"
                        onClick={e => e.stopPropagation()}
                        title="View Details"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Filter Drawer ── */}
      {filterOpen && (
        <div className="ap-overlay" onClick={() => setFilterOpen(false)}>
          <div className="ap-drawer" onClick={e => e.stopPropagation()}>
            <div className="ap-drawer-head">
              <h4>Filter &amp; Sort</h4>
              <button className="ap-drawer-close" onClick={() => setFilterOpen(false)}>✕</button>
            </div>

            <div className="ap-drawer-body">
              {/* Sort */}
              <div className="ap-fgroup">
                <label className="ap-flabel">Sort By</label>
                <select className="ap-fselect" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                  <option value="latest">Latest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                </select>
              </div>

              {/* Price */}
              <div className="ap-fgroup">
                <label className="ap-flabel">Price Range (Rs.)</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input className="ap-finput" type="number" placeholder="Min" value={priceMin} onChange={e => setPriceMin(e.target.value)}/>
                  <input className="ap-finput" type="number" placeholder="Max" value={priceMax} onChange={e => setPriceMax(e.target.value)}/>
                </div>
              </div>

              {/* Availability */}
              <div className="ap-fgroup">
                <label className="ap-flabel">Availability</label>
                <label className="ap-fcheck">
                  <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)}/>
                  In Stock Only
                </label>
              </div>
            </div>

            <div className="ap-drawer-foot">
              <button className="ap-fbtn-reset" onClick={resetFilters}>Reset</button>
              <button className="ap-fbtn-apply" onClick={() => setFilterOpen(false)}>Apply Filters</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CSS = `
  /* ── search bar ── */
  .ap-bar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 28px 60px 20px;
    font-family: 'DM Sans', sans-serif;
    max-width: 1280px;
    margin: 0 auto;
  }
  .ap-search-wrap {
    flex: 1;
    position: relative;
    max-width: 520px;
  }
  .ap-search-icon {
    position: absolute;
    left: 14px; top: 50%;
    transform: translateY(-50%);
    color: #ccc;
    pointer-events: none;
  }
  .ap-search {
    width: 100%; height: 44px;
    border: 1.5px solid #f4c5d4;
    border-radius: 12px;
    padding: 0 40px 0 40px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; color: #333;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    background: #fff;
  }
  .ap-search:focus { border-color: #e05c8a; box-shadow: 0 0 0 3px rgba(224,92,138,.1); }
  .ap-search-clear {
    position: absolute; right: 12px; top: 50%;
    transform: translateY(-50%);
    background: none; border: none;
    color: #ccc; cursor: pointer; font-size: 13px;
  }
  .ap-search-clear:hover { color: #e05c8a; }
  .ap-filter-btn {
    display: flex; align-items: center; gap: 7px;
    height: 44px; padding: 0 20px;
    background: #fff;
    border: 1.5px solid #f4c5d4;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    color: #e05c8a; cursor: pointer;
    transition: background .2s, border-color .2s;
    white-space: nowrap;
  }
  .ap-filter-btn:hover { background: #fce8ec; border-color: #e05c8a; }

  /* ── grid ── */
  .ap-root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 60px 60px;
    font-family: 'DM Sans', sans-serif;
  }
  .ap-center {
    display: flex; justify-content: center;
    align-items: center; padding: 60px 0;
  }
  .ap-spinner {
    width: 40px; height: 40px;
    border: 3px solid #fce8ec;
    border-top-color: #e05c8a;
    border-radius: 50%;
    animation: ap-spin .8s linear infinite;
  }
  @keyframes ap-spin { to { transform: rotate(360deg); } }

  .ap-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  /* ── card ── */
  .ap-card {
    background: #fff;
    border-radius: 20px;
    border: 1.5px solid #f5e8ec;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s;
    animation: ap-fadein .5s ease both;
  }
  @keyframes ap-fadein {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ap-card--hov {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(224,92,138,.16);
    border-color: #f4c5d4;
  }
  .ap-card--oos { opacity: .75; }

  /* wishlist */
  .ap-heart {
    position: absolute; top: 12px; right: 12px; z-index: 2;
    width: 30px; height: 30px; border-radius: 50%;
    background: rgba(255,255,255,.88); border: none;
    display: flex; align-items: center; justify-content: center;
    color: #ccc; cursor: pointer;
    transition: color .2s, background .2s;
    backdrop-filter: blur(4px);
  }
  .ap-heart:hover { color: #e05c8a; background: #fff; }

  /* image */
  .ap-img-wrap { height: 220px; overflow: hidden; position: relative; }
  .ap-img { width: 100%; height: 100%; object-fit: cover; transition: transform .4s ease; }
  .ap-card--hov .ap-img { transform: scale(1.06); }
  .ap-oos-badge {
    position: absolute; top: 10px; left: 10px;
    background: rgba(220,53,69,.85); color: #fff;
    font-size: 10px; font-weight: 700;
    padding: 3px 10px; border-radius: 100px;
  }

  /* body */
  .ap-body { padding: 16px 16px 18px; }
  .ap-name {
    font-family: 'Playfair Display', serif;
    font-size: 16px; font-weight: 700; color: #1a0a0a;
    margin: 0 0 5px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .ap-desc {
    font-size: 12px; color: #bbb;
    margin: 0 0 12px; line-height: 1.5;
    display: -webkit-box; -webkit-line-clamp: 2;
    -webkit-box-orient: vertical; overflow: hidden;
  }
  .ap-row {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 14px;
  }
  .ap-price { font-size: 18px; font-weight: 700; color: #1a0a0a; }
  .ap-rating { display: flex; align-items: center; gap: 5px; }
  .ap-rating-num { font-size: 12px; font-weight: 600; color: #888; }

  /* actions */
  .ap-actions { display: flex; gap: 10px; }
  .ap-btn-cart {
    flex: 1; height: 42px; border-radius: 12px;
    border: none; background: #e05c8a; color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center;
    transition: background .2s, transform .15s;
    box-shadow: 0 4px 12px rgba(224,92,138,.25);
  }
  .ap-btn-cart:hover:not(:disabled) { background: #c9496f; transform: translateY(-1px); }
  .ap-btn-cart:disabled { background: #f0d0d0; color: #b09090; cursor: not-allowed; box-shadow: none; }
  .ap-btn-eye {
    width: 42px; height: 42px; border-radius: 12px;
    border: 1.5px solid #fce8ec; background: #fff;
    color: #e05c8a; display: flex;
    align-items: center; justify-content: center;
    text-decoration: none; flex-shrink: 0;
    transition: background .2s, border-color .2s;
  }
  .ap-btn-eye:hover { background: #fce8ec; border-color: #f4c5d4; color: #e05c8a; }

  /* ── filter drawer ── */
  .ap-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,.35);
    z-index: 1000;
    display: flex; justify-content: flex-end;
    animation: ap-fade-in .2s ease;
  }
  @keyframes ap-fade-in { from { opacity: 0; } to { opacity: 1; } }
  .ap-drawer {
    width: 340px; height: 100%;
    background: #fff;
    display: flex; flex-direction: column;
    font-family: 'DM Sans', sans-serif;
    animation: ap-slide-in .25s ease;
  }
  @keyframes ap-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
  .ap-drawer-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px; border-bottom: 1px solid #fce8ec;
  }
  .ap-drawer-head h4 {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700; color: #1a0a0a; margin: 0;
  }
  .ap-drawer-close {
    background: none; border: none; font-size: 18px;
    color: #aaa; cursor: pointer; transition: color .15s;
  }
  .ap-drawer-close:hover { color: #e05c8a; }
  .ap-drawer-body { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 24px; }
  .ap-fgroup { display: flex; flex-direction: column; gap: 8px; }
  .ap-flabel { font-size: 12px; font-weight: 700; color: #888; text-transform: uppercase; letter-spacing: .06em; }
  .ap-fselect, .ap-finput {
    flex: 1; height: 42px; border: 1.5px solid #f4c5d4;
    border-radius: 10px; padding: 0 12px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #333;
    background: #fff; outline: none; transition: border-color .2s;
  }
  .ap-fselect:focus, .ap-finput:focus { border-color: #e05c8a; }
  .ap-fcheck {
    display: flex; align-items: center; gap: 10px;
    font-size: 14px; color: #555; cursor: pointer;
    background: #fafafa; padding: 12px 14px;
    border-radius: 10px; border: 1.5px solid #f5e8ec;
  }
  .ap-fcheck input { accent-color: #e05c8a; width: 16px; height: 16px; cursor: pointer; }
  .ap-drawer-foot {
    padding: 16px 24px; border-top: 1px solid #fce8ec;
    display: flex; gap: 10px;
  }
  .ap-fbtn-reset {
    flex: 1; height: 42px; border-radius: 12px;
    border: 1.5px solid #f4c5d4; background: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    font-weight: 600; color: #888; cursor: pointer;
    transition: border-color .2s, color .2s;
  }
  .ap-fbtn-reset:hover { border-color: #e05c8a; color: #e05c8a; }
  .ap-fbtn-apply {
    flex: 1; height: 42px; border-radius: 12px;
    border: none; background: #e05c8a; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px;
    font-weight: 600; cursor: pointer;
    transition: background .2s;
  }
  .ap-fbtn-apply:hover { background: #c9496f; }

  /* responsive */
  @media (max-width: 1024px) {
    .ap-bar  { padding: 24px 32px 16px; }
    .ap-root { padding: 0 32px 48px; }
    .ap-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .ap-bar  { padding: 20px 16px 14px; }
    .ap-root { padding: 0 16px 40px; }
    .ap-grid { grid-template-columns: 1fr; }
    .ap-drawer { width: 100%; }
  }
`;

export default AllProducts;