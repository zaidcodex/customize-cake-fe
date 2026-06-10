import React, { useContext, useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../Context/appContext'

/* ── Star Rating ── */
const Stars = ({ rating = 4.5 }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center' }}>
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={i < full ? 'fas fa-star' : i === full && half ? 'fas fa-star-half-alt' : 'far fa-star'}
          style={{ color: '#f5a623', fontSize: '12px' }}
        />
      ))}
    </span>
  )
}

const Products = () => {
  const context = useContext(AppContext)
  const { getAllProduct } = context
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const history = useHistory()
  const hasFetched = useRef(false)
  const trackRef = useRef(null)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    const func = async () => {
      try {
        setLoading(true)
        const data = await getAllProduct()
        const arr = data?.products || data?.allProducts || data?.data || data?.product || (Array.isArray(data) ? data : [])
        setProducts(arr.slice(0, 8))
      } catch (err) {
        console.error(err)
        setFetchError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    func()
  }, [])

  const scroll = (dir) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      <style>{CSS}</style>

      <section className="bs-section">
        <div className="bs-container">

          {/* ── Header ── */}
          <div className="bs-header">
            <h2 className="bs-title">Our Bestsellers</h2>
            <p className="bs-sub">Most loved cakes by our customers</p>
          </div>

          {/* ── Cards Row ── */}
          {loading ? (
            <div className="bs-center py-5">
              <div className="spinner-border" style={{ color: '#e05c8a', width: '2.5rem', height: '2.5rem' }} role="status">
                <span className="visually-hidden">Loading…</span>
              </div>
            </div>
          ) : fetchError ? (
            <div className="bs-center py-4" style={{ color: '#aaa', fontSize: '13px' }}>⚠️ {fetchError}</div>
          ) : products.length === 0 ? (
            <div className="bs-center py-4" style={{ color: '#aaa', fontSize: '13px' }}>No products found.</div>
          ) : (
            <div className="bs-scroll-outer">
              {/* left arrow */}
              <button className="bs-arrow bs-arrow-left" onClick={() => scroll(-1)} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M11 4l-5 5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>

              <div className="bs-track" ref={trackRef}>
                {products.map((product, idx) => {
                  const price = product.sizes?.[0]?.price || product.price || product.basePrice || 0
                  const img = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop'
                  const desc = product.productDesc
                    ? product.productDesc.replace(/<[^>]+>/g, '').slice(0, 40) + (product.productDesc.length > 40 ? '…' : '')
                    : ''
                  const rating = product.rating || (4.5 + (idx % 3) * 0.1)
                  const isBestSeller = idx === 2 // middle card gets badge
                  const isHovered = hoveredId === product._id

                  return (
                    <div
                      key={product._id}
                      className={`bs-card${isBestSeller ? ' bs-card--featured' : ''}${isHovered ? ' bs-card--hovered' : ''}`}
                      style={{ animationDelay: `${idx * 0.07}s` }}
                      onClick={() => history.push(`/product/${product._id}`)}
                      onMouseEnter={() => setHoveredId(product._id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      {/* Best Seller badge */}
                      {isBestSeller && (
                        <div className="bs-badge">⭐ Best Seller</div>
                      )}

                      {/* Wishlist heart */}
                      <button
                        className="bs-heart"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="Wishlist"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                        </svg>
                      </button>

                      {/* Image */}
                      <div className="bs-img-wrap">
                        <img src={img} alt={product.productName} className="bs-img" />
                        {!product.isAvailable && (
                          <span className="bs-oos">Out of Stock</span>
                        )}
                      </div>

                      {/* Body */}
                      <div className="bs-body">
                        <p className="bs-name">{product.productName}</p>
                        {desc && <p className="bs-desc">{desc}</p>}

                        <div className="bs-row">
                          <span className="bs-price">${price}</span>
                          <span className="bs-rating-wrap">
                            <Stars rating={rating} />
                            <span className="bs-rating-num">{rating.toFixed(1)}</span>
                          </span>
                        </div>

                        <button
                          className="bs-btn-cart"
                          onClick={(e) => { e.stopPropagation(); history.push(`/product/${product._id}`) }}
                          disabled={!product.isAvailable}
                        >
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '7px', flexShrink: 0 }}>
                            <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                            <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.68l1.6-9.32H6"/>
                          </svg>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* right arrow */}
              <button className="bs-arrow bs-arrow-right" onClick={() => scroll(1)} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          )}

          {/* ── CTA ── */}
          <div className="bs-center mt-5">
            <button className="bs-cta" onClick={() => history.push('/cakes')}>
              View All Cakes &nbsp;→
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

/* ── CSS ── */
const CSS = `
  .bs-section {
    background: #fff;
    padding: 72px 0 80px;
    font-family: 'DM Sans', sans-serif;
  }
  .bs-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 48px;
  }

  .bs-center { display: flex; justify-content: center; align-items: center; }

  /* header */
  .bs-header { text-align: center; margin-bottom: 48px; }
  .bs-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(26px, 3vw, 36px);
    font-weight: 700;
    color: #1a0a0a;
    margin: 0 0 10px;
  }
  .bs-sub { font-size: 15px; color: #aaa; margin: 0; font-weight: 400; }

  /* scroll outer */
  .bs-scroll-outer {
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  /* track */
  .bs-track {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding: 20px 2px 24px;
    flex: 1;
    min-width: 0;
  }
  .bs-track::-webkit-scrollbar { display: none; }

  /* arrow buttons */
  .bs-arrow {
    flex-shrink: 0;
    width: 42px; height: 42px;
    border-radius: 50%;
    border: 2px solid #f2d4dc;
    background: #fff;
    color: #e05c8a;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: background .2s, border-color .2s, transform .15s;
    box-shadow: 0 4px 12px rgba(224,92,138,.10);
  }
  .bs-arrow:hover {
    background: #e05c8a;
    border-color: #e05c8a;
    color: #fff;
    transform: scale(1.08);
  }

  /* card */
  .bs-card {
    flex: 0 0 300px;
    width: 300px;
    scroll-snap-align: start;
    background: #fff;
    border-radius: 20px;
    border: 1.5px solid #f5e8ec;
    overflow: visible;
    position: relative;
    cursor: pointer;
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s;
    animation: bs-fadein .5s ease both;
  }
  @keyframes bs-fadein {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .bs-card--hovered,
  .bs-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 18px 44px rgba(224,92,138,.18);
    border-color: #f4c5d4;
  }
  .bs-card--featured {
    border-color: #e05c8a;
    box-shadow: 0 8px 32px rgba(224,92,138,.18);
  }

  /* best seller badge */
  .bs-badge {
    position: absolute;
    top: -13px; left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(90deg, #e05c8a, #f4a0b8);
    color: #fff;
    font-size: 11px; font-weight: 700;
    padding: 4px 14px;
    border-radius: 100px;
    white-space: nowrap;
    z-index: 2;
    box-shadow: 0 3px 10px rgba(224,92,138,.35);
    letter-spacing: .02em;
  }

  /* wishlist heart */
  .bs-heart {
    position: absolute;
    top: 12px; right: 12px;
    z-index: 2;
    width: 30px; height: 30px;
    border-radius: 50%;
    background: rgba(255,255,255,.88);
    border: none;
    display: flex; align-items: center; justify-content: center;
    color: #ccc;
    cursor: pointer;
    transition: color .2s, background .2s;
    backdrop-filter: blur(4px);
  }
  .bs-heart:hover { color: #e05c8a; background: #fff; }

  /* image */
  .bs-img-wrap {
    height: 260px;
    border-radius: 18px 18px 0 0;
    overflow: hidden;
    position: relative;
  }
  .bs-img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform .4s ease;
  }
  .bs-card:hover .bs-img { transform: scale(1.07); }
  .bs-oos {
    position: absolute; top: 10px; left: 10px;
    background: rgba(220,53,69,.85); color: #fff;
    font-size: 10px; font-weight: 700;
    padding: 3px 10px; border-radius: 100px;
  }

  /* body */
  .bs-body { padding: 18px 18px 20px; }
  .bs-name {
    font-family: 'Playfair Display', serif;
    font-size: 18px; font-weight: 700;
    color: #1a0a0a; margin: 0 0 6px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .bs-desc {
    font-size: 13px; color: #bbb; margin: 0 0 14px;
    font-weight: 400; line-height: 1.5;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }

  /* price + stars row */
  .bs-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .bs-price {
    font-size: 20px; font-weight: 700; color: #1a0a0a;
  }
  .bs-rating-wrap { display: flex; align-items: center; gap: 5px; }
  .bs-rating-num { font-size: 12px; font-weight: 600; color: #888; }

  /* add to cart button */
  .bs-btn-cart {
    width: 100%;
    padding: 13px 0;
    border-radius: 12px;
    border: none;
    background: #e05c8a;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: background .2s, transform .15s, box-shadow .2s;
    box-shadow: 0 4px 14px rgba(224,92,138,.28);
  }
  .bs-btn-cart:hover:not(:disabled) {
    background: #c9496f;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(224,92,138,.38);
  }
  .bs-btn-cart:disabled {
    background: #f0d0d0; color: #b09090; cursor: not-allowed;
    box-shadow: none;
  }

  /* view all cta */
  .bs-cta {
    background: #fff;
    color: #e05c8a;
    border: 2px solid #e05c8a;
    border-radius: 50px;
    padding: 12px 32px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px; font-weight: 600;
    cursor: pointer;
    transition: background .2s, color .2s, transform .15s;
  }
  .bs-cta:hover {
    background: #e05c8a;
    color: #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .bs-container { padding: 0 20px; }
    .bs-card { flex: 0 0 calc(100vw - 120px); width: calc(100vw - 120px); }
    .bs-img-wrap { height: 220px; }
  }
`

export default Products