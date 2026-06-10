import React, { useContext, useState, useEffect } from 'react'
import AppContext from '../Context/appContext'
import { useParams } from 'react-router-dom/cjs/react-router-dom'

const flavourEmoji = {
  chocolate: '🍫', vanilla: '⭐', 'red velvet': '🍓', butterscotch: '🧡',
  strawberry: '🍓', blueberry: '🫐', mango: '🥭', lemon: '🍋',
}
const shapeIcons = {
  round: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9"/>
    </svg>
  ),
  heart: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
    </svg>
  ),
  square: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
    </svg>
  ),
  rectangle: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
    </svg>
  ),
}
const Stars = ({ rating = 4.5 }) => {
  const full = Math.floor(rating), half = rating % 1 >= 0.5
  return (
    <span style={{ display:'inline-flex', gap:'2px' }}>
      {[...Array(5)].map((_,i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24"
          fill={i < full ? '#f5a623' : i===full&&half ? '#f5a623' : '#e8e8e8'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  )
}

const ProductPage = ({ cartItems, setCartItems, setShowCart }) => {
  const { getProduct } = useContext(AppContext)
  const { id } = useParams()

  const [product, setProduct]           = useState(null)
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [mainImgIdx, setMainImgIdx]     = useState(0)
  const [selectedFlavour, setSelectedFlavour] = useState('')
  const [selectedShape, setSelectedShape]     = useState('')
  const [selectedSize, setSelectedSize]       = useState(null)
  const [topperText, setTopperText]     = useState('')
  const [wishText, setWishText]         = useState('')
  const [cardMessage, setCardMessage]   = useState('')
  const [quantity, setQuantity]         = useState(1)

  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true)
        const data = await getProduct(id)
        const p = data.product
        setProduct(p)
      } catch { setError('Failed to load product.') }
      finally { setLoading(false) }
    }
    func()
  }, [id])

  const topperPrice = 150, cardPrice = 150
  const getBasePrice = () => selectedSize?.price || product?.price || product?.basePrice || 0
  const calculateTotal = () => {
    let t = getBasePrice() * quantity
    if (topperText) t += topperPrice
    if (cardMessage) t += cardPrice
    return t
  }
  const isCartReady = product && (
    (!product.sizes?.length    || selectedSize) &&
    (!product.flavours?.length || selectedFlavour) &&
    (!product.shapes?.length   || selectedShape)
  )
  const handleAddToCart = () => {
    if (!isCartReady) return
    const url = product.images?.[0]?.url || ''
    setCartItems(prev => [...prev, {
      cartId: Date.now(), productId: id,
      productName: product.productName,
      image: url, productImage: url,
      userCake: false, isCustomCake: false,
      quantity, selectedFlavour, selectedShape,
      selectedSize: selectedSize?.size || selectedSize?.label || '',
      topperText, wishText, cardMessage,
      itemTotal: calculateTotal(),
    }])
    setShowCart(true)
  }
  const imgs = product?.images || []
  const prevImg = () => setMainImgIdx(i => (i - 1 + imgs.length) % imgs.length)
  const nextImg = () => setMainImgIdx(i => (i + 1) % imgs.length)

  if (loading) return (
    <div style={{ display:'flex', justifyContent:'center', padding:'80px 0' }}>
      <div style={{ width:40, height:40, border:'3px solid #fce8ec', borderTopColor:'#e05c8a', borderRadius:'50%', animation:'pp-spin .8s linear infinite' }}/>
      <style>{`@keyframes pp-spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
  if (error || !product) return (
    <div style={{ textAlign:'center', padding:'60px 20px', color:'#e05c8a', fontFamily:'DM Sans,sans-serif' }}>
      {error || 'Product not found.'}
    </div>
  )

  const missingFields = [
    product.sizes?.length && !selectedSize && 'a size',
    product.flavours?.length && !selectedFlavour && 'a flavour',
    product.shapes?.length && !selectedShape && 'a shape',
  ].filter(Boolean)

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
      <style>{CSS}</style>

      <div className="pp-root">
        <div className="pp-inner">

          {/* ── LEFT: images ── */}
          <div className="pp-left">

            {/* Main image */}
            <div className="pp-main-img-wrap">
              {/* Bestseller badge */}
              <div className="pp-bestseller">BESTSELLER</div>

              {imgs.length > 0 ? (
                <img src={imgs[mainImgIdx]?.url} alt={product.productName} className="pp-main-img"/>
              ) : (
                <div style={{ color:'#ccc', fontSize:'14px' }}>No Image</div>
              )}

              {/* Wishlist */}
              <button className="pp-heart" aria-label="Wishlist">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
                </svg>
              </button>

              {/* Image arrows */}
              {imgs.length > 1 && <>
                <button className="pp-img-arrow pp-img-arrow--l" onClick={prevImg}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="pp-img-arrow pp-img-arrow--r" onClick={nextImg}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </>}
            </div>

            {/* Thumbnails */}
            {imgs.length > 0 && (
              <div className="pp-thumbs">
                {imgs.slice(0, 4).map((img, i) => (
                  <div key={i} className={`pp-thumb${mainImgIdx===i?' pp-thumb--active':''}`}
                    onClick={() => setMainImgIdx(i)}>
                    <img src={img.url} alt={`thumb-${i}`}/>
                  </div>
                ))}
                {imgs.length > 4 && (
                  <div className="pp-thumb pp-thumb-more" onClick={() => setMainImgIdx(4)}>
                    +{imgs.length - 4}<br/>
                    <span>More</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ── RIGHT: details ── */}
          <div className="pp-right">

            {/* Name */}
            <h1 className="pp-name">{product.productName}</h1>

            {/* Stars + reviews */}
            <div className="pp-rating-row">
              <Stars rating={product.rating || 4.9}/>
              <span className="pp-rating-num">{(product.rating || 4.9).toFixed(1)}</span>
              <span className="pp-reviews">(124 Reviews)</span>
            </div>

            {/* Price */}
            <div className="pp-price">
              Rs. {getBasePrice().toLocaleString()}
            </div>

            {/* Description */}
            {product.productDesc && (
              <div className="pp-desc"
                dangerouslySetInnerHTML={{ __html: product.productDesc.replace(/<[^>]+>/g,'').slice(0,140) }}/>
            )}

            {/* Badges */}
            <div className="pp-badges">
              <span className={`pp-badge pp-badge--${product.isAvailable?'green':'red'}`}>
                {product.isAvailable ? '● In Stock' : '● Out of Stock'}
              </span>
              {product.preparationTime && (
                <span className="pp-badge pp-badge--gray">🕐 Prep: {product.preparationTime} Hours</span>
              )}
              {product.eggType && (
                <span className="pp-badge pp-badge--gray">🥚 {product.eggType}</span>
              )}
            </div>

            <div className="pp-divider"/>

            {/* 1. Size */}
            {product.sizes?.length > 0 && (
              <div className="pp-section">
                <div className="pp-section-head">
                  <span className="pp-section-title">1. Select Size</span>
                  {!selectedSize && <span className="pp-required">Required</span>}
                </div>
                <div className="pp-size-grid">
                  {product.sizes.map((s, i) => {
                    const label = s.size || s.label || s.name || `Size ${i+1}`
                    const active = selectedSize === s
                    return (
                      <button key={i} className={`pp-size-btn${active?' pp-size-btn--active':''}`}
                        onClick={() => setSelectedSize(s)}>
                        <span className="pp-size-label">{label}</span>
                        {s.price && <span className="pp-size-price">Rs. {s.price.toLocaleString()}</span>}
                        {active && (
                          <span className="pp-size-check">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 2. Flavour */}
            {product.flavours?.length > 0 && (
              <div className="pp-section">
                <div className="pp-section-head">
                  <span className="pp-section-title">2. Choose Your Flavour</span>
                  {!selectedFlavour && <span className="pp-required">Required</span>}
                </div>
                <div className="pp-pills">
                  {product.flavours.map((f, i) => {
                    const key = f.toLowerCase()
                    const emoji = flavourEmoji[key] || '🎂'
                    const active = selectedFlavour === f
                    return (
                      <button key={i} className={`pp-pill${active?' pp-pill--active':''}`}
                        onClick={() => setSelectedFlavour(f)}>
                        <span>{emoji}</span> {f}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 3. Shape */}
            {product.shapes?.length > 0 && (
              <div className="pp-section">
                <div className="pp-section-head">
                  <span className="pp-section-title">3. Choose Shape</span>
                  {!selectedShape && <span className="pp-required">Required</span>}
                </div>
                <div className="pp-shapes">
                  {product.shapes.map((sh, i) => {
                    const key = sh.toLowerCase()
                    const active = selectedShape === sh
                    return (
                      <button key={i} className={`pp-shape-btn${active?' pp-shape-btn--active':''}`}
                        onClick={() => setSelectedShape(sh)}>
                        {/* <span className="pp-shape-icon">{shapeIcons[key] || '🔲'}</span> */}
                        <span className="pp-shape-label">{sh}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Topper */}
            <div className="pp-field">
              <label className="pp-label">
                Topper Text <span className="pp-label-price">(+ Rs. {topperPrice})</span>
              </label>
              <div className="pp-input-wrap">
                <input className="pp-input" type="text" maxLength={30}
                  placeholder="e.g., Happy Birthday Sarah!"
                  value={topperText} onChange={e => setTopperText(e.target.value)}/>
                <span className="pp-char">{topperText.length}/30</span>
              </div>
            </div>

            {/* Wish */}
            <div className="pp-field">
              <label className="pp-label">Your Wish On Cake</label>
              <div className="pp-input-wrap">
                <input className="pp-input" type="text" maxLength={50}
                  placeholder="e.g., Happy Anniversary"
                  value={wishText} onChange={e => setWishText(e.target.value)}/>
                <span className="pp-char">{wishText.length}/50</span>
              </div>
            </div>

            {/* Card message */}
            {product.customMessageAllowed && (
              <div className="pp-field">
                <label className="pp-label">
                  Card With Message <span className="pp-label-price">(+ Rs. {cardPrice})</span>
                </label>
                <div className="pp-input-wrap">
                  <textarea className="pp-input pp-textarea" rows={3} maxLength={150}
                    placeholder="Write a personal message..."
                    value={cardMessage} onChange={e => setCardMessage(e.target.value)}/>
                  <span className="pp-char pp-char--ta">{cardMessage.length}/150</span>
                </div>
              </div>
            )}

            {/* ── Sticky bottom bar ── */}
            <div className="pp-bottom-bar">
              {/* Quantity */}
              <div className="pp-qty">
                <span className="pp-qty-label">Quantity</span>
                <div className="pp-qty-ctrl">
                  <button className="pp-qty-btn" onClick={() => setQuantity(q => Math.max(1,q-1))} disabled={quantity<=1}>−</button>
                  <span className="pp-qty-val">{quantity}</span>
                  <button className="pp-qty-btn" onClick={() => setQuantity(q => q+1)}>+</button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                className={`pp-add-btn${isCartReady && product.isAvailable ? '' : ' pp-add-btn--disabled'}`}
                onClick={handleAddToCart}
                disabled={!isCartReady || !product.isAvailable}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" style={{ marginRight:8 }}>
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 001.98-1.68l1.6-9.32H6"/>
                </svg>
                {!product.isAvailable ? 'Unavailable' : !isCartReady ? 'Select Options' : 'Add to Cart'}
                {isCartReady && product.isAvailable && (
                  <span className="pp-add-price">Rs. {calculateTotal().toLocaleString()}</span>
                )}
              </button>
            </div>

            {/* Hint */}
            {product.isAvailable && missingFields.length > 0 && (
              <p className="pp-hint">Please select {missingFields.join(', ')} to continue</p>
            )}

          </div>
        </div>
      </div>
    </>
  )
}

const CSS = `
  .pp-root {
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    min-height: 100vh;
    padding: 32px 60px 80px;
  }
  .pp-inner {
    max-width: 1160px;
    margin: 0 auto;
    display: flex;
    gap: 52px;
    align-items: flex-start;
  }

  /* ── LEFT ── */
  .pp-left { flex: 0 0 460px; position: sticky; top: 20px; }

  .pp-main-img-wrap {
    position: relative;
    background: #fafafa;
    border-radius: 20px;
    overflow: hidden;
    height: 420px;
    display: flex; align-items: center; justify-content: center;
    border: 1.5px solid #f5e8ec;
  }
  .pp-main-img {
    width: 100%; height: 100%;
    object-fit: contain;
    transition: opacity .25s ease;
  }
  .pp-bestseller {
    position: absolute; top: 14px; left: 14px;
    background: #e05c8a; color: #fff;
    font-size: 10px; font-weight: 700;
    letter-spacing: .1em; padding: 4px 12px;
    border-radius: 6px; z-index: 2;
  }
  .pp-heart {
    position: absolute; top: 14px; right: 14px;
    width: 34px; height: 34px; border-radius: 50%;
    background: #fff; border: 1.5px solid #f4c5d4;
    display: flex; align-items: center; justify-content: center;
    color: #ccc; cursor: pointer; z-index: 2;
    transition: color .2s, border-color .2s;
  }
  .pp-heart:hover { color: #e05c8a; border-color: #e05c8a; }
  .pp-img-arrow {
    position: absolute; top: 50%; transform: translateY(-50%);
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,.9); border: 1.5px solid #f4c5d4;
    display: flex; align-items: center; justify-content: center;
    color: #888; cursor: pointer; z-index: 2;
    transition: background .2s, border-color .2s, color .2s;
  }
  .pp-img-arrow:hover { background: #e05c8a; border-color: #e05c8a; color: #fff; }
  .pp-img-arrow--l { left: 12px; }
  .pp-img-arrow--r { right: 12px; }

  /* thumbs */
  .pp-thumbs {
    display: flex; gap: 10px; margin-top: 14px; flex-wrap: wrap;
  }
  .pp-thumb {
    width: 80px; height: 64px; border-radius: 10px;
    border: 2px solid transparent;
    overflow: hidden; cursor: pointer;
    background: #fafafa;
    display: flex; align-items: center; justify-content: center;
    transition: border-color .2s, box-shadow .2s;
  }
  .pp-thumb img { width: 100%; height: 100%; object-fit: cover; }
  .pp-thumb--active { border-color: #e05c8a; box-shadow: 0 0 0 1px #e05c8a; }
  .pp-thumb-more {
    font-size: 13px; font-weight: 700;
    color: #e05c8a; text-align: center; line-height: 1.3;
    background: #fce8ec;
  }
  .pp-thumb-more span { font-size: 11px; font-weight: 400; color: #888; }

  /* ── RIGHT ── */
  .pp-right { flex: 1; min-width: 0; }

  .pp-name {
    font-family: 'Playfair Display', serif;
    font-size: clamp(20px, 2.4vw, 28px);
    font-weight: 700; color: #1a0a0a;
    margin: 0 0 10px; text-transform: uppercase; letter-spacing: .02em;
  }
  .pp-rating-row { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
  .pp-rating-num { font-size: 14px; font-weight: 700; color: #f5a623; }
  .pp-reviews { font-size: 13px; color: #aaa; }

  .pp-price {
    font-size: 28px; font-weight: 700;
    color: #e05c8a; margin-bottom: 10px;
    font-family: 'DM Sans', sans-serif;
  }
  .pp-desc { font-size: 13px; color: #777; line-height: 1.65; margin-bottom: 14px; }

  .pp-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
  .pp-badge {
    display: inline-flex; align-items: center; gap: 4px;
    font-size: 12px; font-weight: 600; padding: 4px 12px;
    border-radius: 100px;
  }
  .pp-badge--green { background: #e8f9ee; color: #1a8a4a; }
  .pp-badge--red   { background: #fdecea; color: #c0392b; }
  .pp-badge--gray  { background: #f5f5f5; color: #555; }

  .pp-divider { height: 1px; background: #f5e8ec; margin: 18px 0; }

  /* sections */
  .pp-section { margin-bottom: 22px; }
  .pp-section-head {
    display: flex; justify-content: space-between;
    align-items: center; margin-bottom: 12px;
  }
  .pp-section-title { font-size: 14px; font-weight: 700; color: #1a0a0a; }
  .pp-required { font-size: 12px; font-weight: 600; color: #e05c8a; }

  /* size cards */
  .pp-size-grid { display: flex; gap: 10px; flex-wrap: wrap; }
  .pp-size-btn {
    position: relative; min-width: 90px;
    padding: 10px 16px; border-radius: 12px;
    border: 1.5px solid #f5e8ec; background: #fff;
    cursor: pointer; text-align: center;
    transition: border-color .2s, box-shadow .2s, background .2s;
  }
  .pp-size-btn:hover { border-color: #f4a0b8; }
  .pp-size-btn--active {
    border-color: #e05c8a;
    background: #fff8fb;
    box-shadow: 0 0 0 1px #e05c8a;
  }
  .pp-size-label { display: block; font-size: 13px; font-weight: 700; color: #1a0a0a; }
  .pp-size-price { display: block; font-size: 11px; color: #aaa; margin-top: 2px; }
  .pp-size-check {
    position: absolute; top: -7px; right: -7px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #e05c8a;
    display: flex; align-items: center; justify-content: center;
  }

  /* flavour pills */
  .pp-pills { display: flex; gap: 8px; flex-wrap: wrap; }
  .pp-pill {
    display: inline-flex; align-items: center; gap: 5px;
    padding: 7px 14px; border-radius: 100px;
    border: 1.5px solid #f5e8ec; background: #fff;
    font-size: 13px; font-weight: 500; color: #555;
    cursor: pointer; transition: border-color .2s, background .2s, color .2s;
  }
  .pp-pill:hover { border-color: #f4a0b8; }
  .pp-pill--active {
    border-color: #e05c8a; background: #e05c8a; color: #fff;
    box-shadow: 0 4px 12px rgba(224,92,138,.28);
  }

  /* shape buttons */
  .pp-shapes { display: flex; gap: 10px; flex-wrap: wrap; }
  .pp-shape-btn {
    display: flex; flex-direction: column;
    align-items: center; gap: 6px;
    padding: 12px 18px; border-radius: 12px;
    border: 1.5px solid #f5e8ec; background: #fff;
    min-width: 80px; cursor: pointer;
    transition: border-color .2s, background .2s;
  }
  .pp-shape-btn:hover { border-color: #f4a0b8; }
  .pp-shape-btn--active {
    border-color: #e05c8a; background: #fff8fb;
    box-shadow: 0 0 0 1px #e05c8a;
  }
  .pp-shape-icon { color: #e05c8a; display: flex; }
  .pp-shape-btn--active .pp-shape-icon { color: #e05c8a; }
  .pp-shape-label { font-size: 12px; font-weight: 600; color: #555; }
  .pp-shape-btn--active .pp-shape-label { color: #e05c8a; }

  /* fields */
  .pp-field { margin-bottom: 16px; }
  .pp-label {
    display: block; font-size: 13px; font-weight: 600;
    color: #444; margin-bottom: 6px;
  }
  .pp-label-price { font-weight: 400; color: #aaa; }
  .pp-input-wrap { position: relative; }
  .pp-input {
    width: 100%; padding: 10px 48px 10px 12px;
    border: 1.5px solid #f4c5d4; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; color: #333;
    background: #fff; outline: none; resize: none;
    transition: border-color .2s, box-shadow .2s;
    box-sizing: border-box;
  }
  .pp-input:focus { border-color: #e05c8a; box-shadow: 0 0 0 3px rgba(224,92,138,.1); }
  .pp-input::placeholder { color: #ccc; }
  .pp-textarea { padding-right: 12px; padding-bottom: 28px; }
  .pp-char {
    position: absolute; bottom: 8px; right: 10px;
    font-size: 11px; color: #ccc; pointer-events: none;
  }
  .pp-char--ta { bottom: 8px; right: 10px; }

  /* bottom bar */
  .pp-bottom-bar {
    display: flex; align-items: center; gap: 16px;
    margin-top: 24px; padding-top: 20px;
    border-top: 1.5px solid #f5e8ec;
  }
  .pp-qty { display: flex; flex-direction: column; gap: 4px; }
  .pp-qty-label { font-size: 11px; font-weight: 600; color: #aaa; text-transform: uppercase; letter-spacing: .06em; }
  .pp-qty-ctrl { display: flex; align-items: center; gap: 0; border: 1.5px solid #f4c5d4; border-radius: 10px; overflow: hidden; }
  .pp-qty-btn {
    width: 36px; height: 36px; border: none; background: #fff;
    font-size: 18px; color: #e05c8a; cursor: pointer;
    transition: background .15s; display: flex; align-items: center; justify-content: center;
  }
  .pp-qty-btn:hover { background: #fce8ec; }
  .pp-qty-btn:disabled { color: #ddd; cursor: not-allowed; }
  .pp-qty-val { width: 36px; text-align: center; font-size: 15px; font-weight: 700; color: #1a0a0a; }

  .pp-add-btn {
    flex: 1; height: 48px;
    background: #e05c8a; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px; font-weight: 700;
    cursor: pointer; display: flex;
    align-items: center; justify-content: center; gap: 4px;
    box-shadow: 0 6px 20px rgba(224,92,138,.32);
    transition: background .2s, transform .15s;
  }
  .pp-add-btn:hover:not(.pp-add-btn--disabled) {
    background: #c9496f; transform: translateY(-1px);
  }
  .pp-add-btn--disabled {
    background: #f0d0d0; color: #b09090;
    cursor: not-allowed; box-shadow: none;
  }
  .pp-add-price {
    margin-left: 10px; padding-left: 10px;
    border-left: 1px solid rgba(255,255,255,.4);
    font-size: 15px; font-weight: 700;
  }

  .pp-hint { font-size: 12px; color: #aaa; text-align: center; margin-top: 10px; }

  /* responsive */
  @media (max-width: 1024px) {
    .pp-root { padding: 24px 32px 60px; }
    .pp-inner { gap: 36px; }
    .pp-left { flex: 0 0 380px; }
  }
  @media (max-width: 820px) {
    .pp-root { padding: 20px 20px 60px; }
    .pp-inner { flex-direction: column; gap: 28px; }
    .pp-left { flex: 0 0 auto; width: 100%; position: static; }
    .pp-main-img-wrap { height: 320px; }
  }
`

export default ProductPage