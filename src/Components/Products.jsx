import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../Context/appContext'

// Star rating helper
const Stars = ({ rating = 4.5 }) => {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="prd-stars">
      {[...Array(5)].map((_, i) => (
        <i
          key={i}
          className={
            i < full
              ? 'fas fa-star'
              : i === full && half
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }
          style={{ color: '#f5a623', fontSize: '13px' }}
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
  const history = useHistory()
  const hasFetched = React.useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true

    const func = async () => {
      try {
        setLoading(true)
        const data = await getAllProduct()
        console.log('getAllProduct FULL response:', JSON.stringify(data))
        console.log('getAllProduct keys:', data ? Object.keys(data) : 'null/undefined')
        const arr = data?.products || data?.allProducts || data?.data || data?.product || (Array.isArray(data) ? data : [])
        console.log('arr length:', arr?.length)
        setProducts(arr.slice(0, 6))
      } catch (err) {
        console.error(err)
        setFetchError('Failed to load products.')
      } finally {
        setLoading(false)
      }
    }
    func()
  }, [])

  const handleAddToCart = (e, productId) => {
    e.stopPropagation()
    history.push(`/product/${productId}`)
  }

  return (
    <>
      <style>{css}</style>
      <section className="prd-section py-5">
        <div className="container">

          {/* Header */}
          <div className="text-center mb-5">
            <span className="prd-eyebrow">Freshly Baked</span>
            <h2 className="prd-heading mt-2">Featured Products</h2>
            <p className="prd-sub">
              Handcrafted with love, every cake is made fresh to order — no compromises.
            </p>
          </div>

          {/* Grid */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border" style={{ color: '#FDACAC', width: '2.5rem', height: '2.5rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : fetchError ? (
            <div className="text-center py-4 text-muted" style={{ fontSize: '13px' }}>
              ⚠️ Could not load products: {fetchError}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-4 text-muted" style={{ fontSize: '13px' }}>
              No products found.
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {products.map((product, idx) => {
                const price = product.price || product.basePrice || 0
                const img = product.images?.[0]?.url || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop'
                const desc = product.productDesc
                  ? product.productDesc.replace(/<[^>]+>/g, '').slice(0, 72) + (product.productDesc.length > 72 ? '...' : '')
                  : ''

                return (
                  <div
                    key={product._id}
                    className="col-12 col-md-6 col-lg-4"
                    style={{ animationDelay: `${idx * 0.08}s` }}
                  >
                    <div
                      className="prd-card"
                      onClick={() => history.push(`/product/${product._id}`)}
                    >
                      {/* Image */}
                      <div className="prd-img-wrap">
                        <img src={img} alt={product.productName} className="prd-img" />
                        {!product.isAvailable && (
                          <div className="prd-unavailable">Out of Stock</div>
                        )}
                      </div>

                      {/* Body */}
                      <div className="prd-body">
                        <h5 className="prd-name">{product.productName}</h5>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="prd-price">Rs. {product.sizes[0].price}</span>
                          <Stars />
                        </div>

                        {desc && <p className="prd-desc text-center">{desc}</p>}

                        {/* Actions */}
                        <div className="prd-actions">
                          <button
                            className="prd-btn-cart"
                            onClick={(e) => handleAddToCart(e, product._id)}
                            disabled={!product.isAvailable}
                          >
                            <i className="fas fa-shopping-cart me-2" />
                            Add to Cart
                          </button>
                          <button
                            className="prd-btn-eye"
                            onClick={(e) => { e.stopPropagation(); history.push(`/product/${product._id}`) }}
                            title="View Details"
                          >
                            <i className="fas fa-eye" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Bottom CTA — unchanged as requested */}
          <div className="text-center mt-5">
            <button className="heading-product text-decoration-none" role="button">
              More Products..
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  .prd-section { background: #fff8f8; }

  /* ── Header ── */
  .prd-eyebrow {
    display: inline-block;
    background: #fce8e8;
    color: #c05060;
    font-family: 'DM Sans', sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
    padding: 4px 16px;
    border-radius: 100px;
  }
  .prd-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 4vw, 36px);
    font-weight: 700;
    color: #2d1a1a;
  }
  .prd-sub {
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 300;
    color: #b07070;
    max-width: 440px;
    margin: 0 auto;
  }

  /* ── Card ── */
  .prd-card {
    background: #fff;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(224,123,138,.12), 0 1px 4px rgba(0,0,0,.05);
    cursor: pointer;
    transition: transform .25s ease, box-shadow .25s ease;
    animation: prd-fade-in .5s ease both;
  }
  @keyframes prd-fade-in {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .prd-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(224,123,138,.22), 0 2px 8px rgba(0,0,0,.07);
  }

  /* ── Image ── */
  .prd-img-wrap {
    position: relative;
    height: 240px;
    overflow: hidden;
  }
  .prd-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform .45s ease;
  }
  .prd-card:hover .prd-img { transform: scale(1.06); }
  .prd-unavailable {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(220,53,69,.85);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    padding: 3px 10px;
    border-radius: 100px;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Body ── */
  .prd-body {
    padding: 18px 18px 16px;
    text-align: center;
  }
  .prd-name {
    font-family: 'Playfair Display', serif;
    font-size: 17px;
    font-weight: 600;
    color: #FDACAC;
    margin: 0 0 10px;
  }
  .prd-price {
    font-family: 'DM Sans', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #e07b8a;
  }
  .prd-desc {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    color: #a08080;
    line-height: 1.6;
    margin: 8px 0 14px;
    font-weight: 300;
  }

  /* ── Actions ── */
  .prd-actions {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .prd-btn-cart {
    flex: 1;
    padding: 10px 0;
    border-radius: 12px;
    border: none;
    background: #FDACAC;
    color: #4a1010;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s, transform .15s;
  }
  .prd-btn-cart:hover:not(:disabled) {
    background: #e07b8a;
    color: #fff;
    transform: translateY(-1px);
  }
  .prd-btn-cart:disabled {
    background: #f0d0d0;
    color: #b09090;
    cursor: not-allowed;
  }
  .prd-btn-eye {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    border: 1.5px solid #fce8e8;
    background: #fff;
    color: #e07b8a;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .2s, border-color .2s, transform .15s;
    flex-shrink: 0;
  }
  .prd-btn-eye:hover {
    background: #fce8e8;
    border-color: #FDACAC;
    transform: translateY(-1px);
  }
`

export default Products