import React, { useContext, useState, useEffect, useRef } from 'react'
import AppContext from '../Context/appContext'
import { useParams } from 'react-router-dom/cjs/react-router-dom'

const CART_KEY = 'cart_items'

const ProductPage = () => {
  const context = useContext(AppContext)
  const { getProduct } = context
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mainImage, setMainImage] = useState('')

  // ── Cart — init from localStorage ──────────────────────────────────────
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  // User selections
  const [selectedFlavour, setSelectedFlavour] = useState('')
  const [selectedShape, setSelectedShape] = useState('')
  const [selectedSize, setSelectedSize] = useState(null)
  const [topperText, setTopperText] = useState('')
  const [wishText, setWishText] = useState('')
  const [cardMessage, setCardMessage] = useState('')
  const [quantity, setQuantity] = useState(1)

  const offcanvasBtnRef = useRef(null)

  useEffect(() => {
    const func = async () => {
      try {
        setLoading(true)
        const data = await getProduct(id)
        const p = data.product
        setProduct(p)
        if (p.images?.length > 0) setMainImage(p.images[0].url)
      } catch (err) {
        setError('Failed to load product.')
      } finally {
        setLoading(false)
      }
    }
    func()
  }, [id])

  const topperPrice = 1960
  const cardPrice = 150

  const getBasePrice = () => {
    if (!product) return 0
    if (selectedSize?.price) return selectedSize.price
    return product.price || product.basePrice || 0
  }

  const calculateTotal = () => {
    let total = getBasePrice() * quantity
    if (topperText) total += topperPrice
    if (cardMessage) total += cardPrice
    return total
  }

  const handleQuantityChange = (type) => {
    if (type === 'increment') setQuantity((prev) => prev + 1)
    else if (type === 'decrement' && quantity > 1) setQuantity((prev) => prev - 1)
  }

  // ── Compute whether all required selections are made ─────────────────
  const isCartReady = product && (
    (!product.sizes?.length    || selectedSize) &&
    (!product.flavours?.length || selectedFlavour) &&
    (!product.shapes?.length   || selectedShape)
  )

  const handleAddToCart = () => {
    if (!isCartReady) return

    const newItem = {
      cartId: Date.now(),
      productId: id,
      productName: product.productName,
      image: product.images?.[0]?.url || '',
      quantity,
      selectedFlavour,
      selectedShape,
      selectedSize: selectedSize?.size || selectedSize?.label || '',
      topperText,
      wishText,
      cardMessage,
      itemTotal: calculateTotal(),
    }

    setCartItems((prev) => [...prev, newItem])
    if (offcanvasBtnRef.current) offcanvasBtnRef.current.click()
  }

  const handleRemoveFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId))
  }

  const cartGrandTotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0)

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" style={{ color: '#FDACAC' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-danger">{error || 'Product not found.'}</div>
      </div>
    )
  }

  return (
    <>
      {/* Hidden offcanvas trigger */}
      <button
        ref={offcanvasBtnRef}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartOffcanvas"
        aria-controls="cartOffcanvas"
        style={{ display: 'none' }}
      />

      {/* ── Product Page ── */}
      <div className="container py-5 text-start">
        <div className="row g-5">

          {/* Left: Image */}
          <div className="col-md-6">

            {/* Main Image */}
            <div
              className="rounded-3 overflow-hidden d-flex align-items-center justify-content-center"
              style={{ background: '#f9f9f9', minHeight: '380px' }}
            >
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.productName}
                  className="img-fluid"
                  style={{
                    maxHeight: '420px',
                    width: '100%',
                    objectFit: 'contain',
                    transition: 'opacity 0.2s ease',
                  }}
                />
              ) : (
                <div className="text-muted">No Image Available</div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images?.length > 0 && (
              <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
                {product.images.map((img, i) => {
                  const isActive = mainImage === img.url
                  return (
                    <div
                      key={i}
                      onClick={() => setMainImage(img.url)}
                      style={{
                        cursor: 'pointer',
                        borderRadius: '10px',
                        padding: '6px',
                        border: isActive ? '2px solid #FDACAC' : '2px solid transparent',
                        background: '#ffffff',
                        transition: 'border 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: isActive ? '0 0 0 1px #FDACAC' : 'none',
                        width: '90px',
                        height: '70px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={img.url}
                        alt={`thumb-${i}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: '6px',
                          opacity: isActive ? 1 : 0.65,
                          transition: 'opacity 0.2s ease',
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="col-md-6">
            <h1 className="h2 mb-2 text-uppercase fw-bold">{product.productName}</h1>

            <div className="d-flex flex-wrap gap-2 mb-3">
              {product.isAvailable ? (
                <span className="badge bg-success">In Stock</span>
              ) : (
                <span className="badge bg-danger">Out of Stock</span>
              )}
              {product.preparationTime && (
                <span className="badge bg-light text-dark border">
                  🕐 Prep: {product.preparationTime} hours
                </span>
              )}
              {product.eggType && (
                <span className="badge bg-light text-dark border text-capitalize">
                  🥚 {product.eggType}
                </span>
              )}
            </div>

            <div className="mb-3">
              <h3 style={{ color: '#e07b8a' }}>
                {getBasePrice() > 0 ? `₨${getBasePrice().toLocaleString()}` : 'Price varies by size'}
              </h3>
            </div>

            {product.productDesc && (
              <div
                className="mb-4 text-muted"
                style={{ fontSize: '0.93rem', lineHeight: '1.7' }}
                dangerouslySetInnerHTML={{ __html: product.productDesc }}
              />
            )}

            <hr />

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-4">
                <label className="form-label fw-bold">
                  * Select Size
                  {!selectedSize && <span className="text-danger ms-1" style={{ fontSize: '0.78rem' }}>Required</span>}
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => {
                    const label = s.size || s.label || s.name || `Size ${i + 1}`
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`btn btn-sm ${selectedSize === s ? 'btn-dark' : 'btn-outline-secondary'}`}
                      >
                        {label}{s.price ? ` — ₨${s.price.toLocaleString()}` : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Flavours */}
            {product.flavours?.length > 0 && (
              <div className="mb-3">
                <label className="form-label fw-bold">
                  * Choose Your Flavour
                  {!selectedFlavour && <span className="text-danger ms-1" style={{ fontSize: '0.78rem' }}>Required</span>}
                </label>
                <select
                  className="form-select"
                  value={selectedFlavour}
                  onChange={(e) => setSelectedFlavour(e.target.value)}
                >
                  <option value="">Select a flavour</option>
                  {product.flavours.map((f, i) => (
                    <option key={i} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Shapes */}
            {product.shapes?.length > 0 && (
              <div className="mb-4">
                <label className="form-label fw-bold">
                  * Choose Shape
                  {!selectedShape && <span className="text-danger ms-1" style={{ fontSize: '0.78rem' }}>Required</span>}
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {product.shapes.map((shape, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedShape(shape)}
                      className={`btn btn-sm ${selectedShape === shape ? 'btn-dark' : 'btn-outline-secondary'}`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Topper */}
            <div className="mb-3">
              <label className="form-label">
                Topper Text <span className="text-muted">(+₨{topperPrice.toLocaleString()})</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Happy Birthday Sarah!"
                value={topperText}
                onChange={(e) => setTopperText(e.target.value)}
              />
            </div>

            {/* Wish */}
            <div className="mb-3">
              <label className="form-label">Your Wish On Cake</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., Happy Anniversary"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
              />
            </div>

            {/* Card Message */}
            {product.customMessageAllowed && (
              <div className="mb-3">
                <label className="form-label">
                  Card With Message <span className="text-muted">(+₨{cardPrice.toLocaleString()})</span>
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Write a personal message..."
                  value={cardMessage}
                  onChange={(e) => setCardMessage(e.target.value)}
                ></textarea>
              </div>
            )}

            <hr />

            {/* Total & Quantity */}
            <div className="pt-2 mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold fs-5">Final Total</span>
                <h4 className="mb-0" style={{ color: '#e07b8a' }}>₨{calculateTotal().toLocaleString()}</h4>
              </div>

              <div className="d-flex align-items-center gap-3 mb-3">
                <button
                  className="btn btn-outline-secondary px-3"
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >−</button>
                <input
                  type="number"
                  className="form-control text-center"
                  style={{ width: '80px' }}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                />
                <button
                  className="btn btn-outline-secondary px-3"
                  onClick={() => handleQuantityChange('increment')}
                >+</button>
              </div>

              {/* Add to Cart — disabled until all required fields selected */}
              <button
                className="btn w-100 py-2 fw-semibold"
                style={{
                  backgroundColor: isCartReady && product.isAvailable ? '#FDACAC' : '#e0e0e0',
                  border: 'none',
                  fontSize: '1rem',
                  color: isCartReady && product.isAvailable ? '#333' : '#999',
                  cursor: isCartReady && product.isAvailable ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.2s ease',
                }}
                onClick={handleAddToCart}
                disabled={!isCartReady || !product.isAvailable}
              >
                {!product.isAvailable
                  ? 'Currently Unavailable'
                  : !isCartReady
                  ? 'Select Required Options to Add'
                  : '🛒 Add to Cart'}
              </button>

              {/* Helper text showing what's still missing */}
              {product.isAvailable && !isCartReady && (
                <p className="text-muted text-center mt-2 mb-0" style={{ fontSize: '0.8rem' }}>
                  Please select{' '}
                  {[
                    product.sizes?.length && !selectedSize && 'a size',
                    product.flavours?.length && !selectedFlavour && 'a flavour',
                    product.shapes?.length && !selectedShape && 'a shape',
                  ]
                    .filter(Boolean)
                    .join(', ')}
                </p>
              )}
            </div>

            {product.categories?.length > 0 && (
              <div className="text-muted small">
                <strong>Categories: </strong>
                {product.categories.map((c) => c.categoryName || c).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Cart Offcanvas ── */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
        style={{ width: '420px' }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="cartOffcanvasLabel">
            🛒 Your Cart
            {cartItems.length > 0 && (
              <span
                className="badge ms-2 rounded-pill"
                style={{ backgroundColor: '#FDACAC', color: '#333', fontSize: '0.8rem' }}
              >
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''}
              </span>
            )}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body p-0 d-flex flex-column" style={{ height: '100%' }}>

          <div className="flex-grow-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                <div style={{ fontSize: '3rem' }}>🧁</div>
                <p className="mt-3">Your cart is empty</p>
              </div>
            ) : (
              <div className="p-3 d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="card border-0 shadow-sm rounded-3"
                    style={{ fontSize: '0.88rem' }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start gap-3">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="rounded-2"
                            style={{ width: '64px', height: '64px', objectFit: 'cover', flexShrink: 0 }}
                          />
                        )}
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <h6 className="fw-bold mb-1 text-uppercase" style={{ fontSize: '0.85rem' }}>
                              {item.productName}
                            </h6>
                            <button
                              className="btn btn-sm p-0 ms-2 text-danger"
                              style={{ lineHeight: 1, fontSize: '1rem' }}
                              onClick={() => handleRemoveFromCart(item.cartId)}
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>
                          <div className="text-muted" style={{ lineHeight: '1.6' }}>
                            <span className="badge bg-light text-dark border me-1">Qty: {item.quantity}</span>
                            {item.selectedSize && <span className="badge bg-light text-dark border me-1">Size: {item.selectedSize}</span>}
                            {item.selectedFlavour && <span className="badge bg-light text-dark border me-1">🍫 {item.selectedFlavour}</span>}
                            {item.selectedShape && <span className="badge bg-light text-dark border me-1">◆ {item.selectedShape}</span>}
                          </div>
                        </div>
                      </div>

                       {(item.topperText || item.wishText || item.cardMessage) && (
                        <div
                          className="mt-2 pt-2 border-top text-muted d-flex  gap-1"
                          style={{ fontSize: '0.82rem' }}
                        >
                          {item.topperText && (
                            <span class="badge bg-info text-dark">Topper Text</span>
                            // <div>🎂 <strong>Topper:</strong> {item.topperText}</div>
                          )}
                          {item.wishText && (
                          <span class="badge bg-info text-dark">Wish Text</span>
                          // <div>✍️ <strong>Wish:</strong> {item.wishText}</div>
                        )}
                          {item.cardMessage && (
                        <span class="badge bg-info text-dark">Card Message</span>
                            // <div>💌 <strong>Card:</strong> {item.cardMessage}</div>
                          )}
                        </div>
                      )}

                      <div className="mt-2 text-end fw-bold" style={{ color: '#e07b8a' }}>
                        ₨{item.itemTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 border-top bg-white" style={{ flexShrink: 0 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-6">Grand Total</span>
              <h5 className="mb-0 fw-bold" style={{ color: '#e07b8a' }}>
                ₨{cartGrandTotal.toLocaleString()}
              </h5>
            </div>
            <button
              className="btn w-100 py-2 fw-semibold text-white"
              style={{ backgroundColor: '#e07b8a', border: 'none', fontSize: '1rem' }}
              onClick={() => alert('Proceeding to checkout...')}
            >
              Proceed to Checkout →
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default ProductPage