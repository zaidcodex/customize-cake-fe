import React, { useState, useRef } from 'react'

const FLAVOUR_OPTIONS = [
  'Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet',
  'Mango', 'Butterscotch', 'Blueberry', 'Lemon'
]
const SHAPE_OPTIONS = ['Round', 'Heart', 'Square', 'Hexagon', 'Oval', 'Tier']
const SIZE_PRESETS = ['1', '2', '3']

const BuildYourCake = ({ setCartItems, setShowCart }) => {
  const fileRef = useRef(null)

  const [step, setStep] = useState(1)
  const TOTAL_STEPS = 3

  const [selectedFlavours, setSelectedFlavours] = useState([])
  const [customFlavourVal, setCustomFlavourVal] = useState('')
  const [showCustomFlavour, setShowCustomFlavour] = useState(false)

  const [selectedShape, setSelectedShape] = useState('')
  const [eggType, setEggType] = useState('')

  const [sizeType, setSizeType] = useState('')
  const [customSizeVal, setCustomSizeVal] = useState('')

  const [topperText, setTopperText] = useState('')
  const [wishText, setWishText] = useState('')
  const [cardMessage, setCardMessage] = useState('')

  const [images, setImages] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [imgUploading, setImgUploading] = useState(false)

  // ── Cloudinary upload ──
  const uploadToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'customize-cake')
    formData.append('cloud_name', 'drdk4hrkn')
    const res = await fetch('https://api.cloudinary.com/v1_1/drdk4hrkn/image/upload', {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return { url: data.secure_url, public_id: data.public_id }
  }

  // sizeValue is the raw number string e.g. "2" or "1.5"
  const sizeValue = sizeType === 'custom' ? customSizeVal : sizeType

  const toggleFlavour = (f) => {
    setSelectedFlavours(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )
  }

  const addCustomFlavour = () => {
    const val = customFlavourVal.trim()
    if (!val || selectedFlavours.includes(val)) return
    setSelectedFlavours(prev => [...prev, val])
    setCustomFlavourVal('')
    setShowCustomFlavour(false)
  }

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files)
    const remaining = 5 - images.filter(i => !i.uploading).length
    if (remaining <= 0) return
    const toUpload = files.slice(0, remaining)

    const placeholders = toUpload.map(f => ({
      url: URL.createObjectURL(f),
      public_id: null,
      uploading: true,
    }))
    setImages(prev => [...prev, ...placeholders])
    setImgUploading(true)

    const results = await Promise.all(toUpload.map(f => uploadToCloudinary(f)))

    setImages(prev => {
      const updated = [...prev]
      let ri = results.length - 1
      for (let i = updated.length - 1; i >= 0 && ri >= 0; i--) {
        if (updated[i].uploading) {
          updated[i] = { url: results[ri].url, public_id: results[ri].public_id, uploading: false }
          ri--
        }
      }
      return updated
    })
    setImgUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeImg = (idx) => setImages(prev => prev.filter((_, i) => i !== idx))

  const stepValid = {
    1: selectedFlavours.length > 0 && selectedShape && eggType,
    2: sizeValue !== '',
    3: true,
  }

  // ── Add to cart ──
  const handleAddToCart = () => {
    if (imgUploading) return

    // First successfully uploaded Cloudinary image is the product image
    const firstImageUrl = images.find(i => !i.uploading && i.url)?.url || ''

    const newItem = {
      cartId: Date.now(),
      productId: `custom_${Date.now()}`,
      productName: 'Custom Cake',

      // image fields
      image: firstImageUrl,              // cart sidebar thumbnail
      productImage: firstImageUrl,       // saved to Order.items[].productImage

      referenceImages: images.map(i => ({ url: i.url, public_id: i.public_id })),

      // custom cake flags
      userCake: true,                    // used in App.jsx cart UI
      isCustomCake: true,                // saved to Order.items[].isCustomCake

      // cake details — selectedSize stored as "2 lb" string for display
      quantity,
      selectedFlavour: selectedFlavours.join(', '),
      selectedShape,
      selectedSize: sizeValue ? `${sizeValue} lb` : '',
      eggType,
      topperText,
      wishText,
      cardMessage,
      itemTotal: 0,
    }

    setCartItems(prev => [...prev, newItem])
    setShowCart(true)
  }

  return (
    <>
      <style>{styles}</style>

      <div className="byc-wrap">

        <div className="byc-header">
          <span className="byc-eyebrow">Made Just For You</span>
          <h1 className="byc-title">Build Your Own Cake</h1>
          <p className="byc-sub">Pick your flavours, shape, size and we'll take care of the rest.</p>
        </div>

        <div className="byc-stepper">
          {['Style', 'Size', 'Extras'].map((label, i) => {
            const s = i + 1
            return (
              <React.Fragment key={s}>
                <div className="byc-step-item">
                  <div className={`byc-step-dot ${step > s ? 'done' : step === s ? 'active' : ''}`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className={`byc-step-label ${step === s ? 'active' : ''}`}>{label}</span>
                </div>
                {i < 2 && <div className={`byc-step-line ${step > s ? 'done' : ''}`} />}
              </React.Fragment>
            )
          })}
        </div>

        <div className="byc-card">

          {/* ════ STEP 1: Style ════ */}
          {step === 1 && (
            <div className="byc-section">
              <h2 className="byc-section-title">Cake Style</h2>

              <div className="byc-field">
                <label className="byc-label">Flavours <span className="req">*</span></label>
                <div className="byc-pills">
                  {FLAVOUR_OPTIONS.map(f => (
                    <button key={f} type="button"
                      className={`byc-pill ${selectedFlavours.includes(f) ? 'sel' : ''}`}
                      onClick={() => toggleFlavour(f)}
                    >{f}</button>
                  ))}
                  {selectedFlavours.filter(f => !FLAVOUR_OPTIONS.includes(f)).map(f => (
                    <button key={f} type="button"
                      className="byc-pill sel custom"
                      onClick={() => toggleFlavour(f)}
                    >{f} ×</button>
                  ))}
                </div>
                {showCustomFlavour ? (
                  <div className="byc-inline">
                    <input
                      type="text" className="byc-input"
                      placeholder="Type flavour name..."
                      value={customFlavourVal}
                      onChange={e => setCustomFlavourVal(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && addCustomFlavour()}
                      autoFocus
                    />
                    <button type="button" className="byc-inline-save"
                      disabled={!customFlavourVal.trim()} onClick={addCustomFlavour}
                    >Save</button>
                    <button type="button" className="byc-inline-cancel"
                      onClick={() => { setShowCustomFlavour(false); setCustomFlavourVal('') }}
                    >×</button>
                  </div>
                ) : (
                  <button type="button" className="byc-add-link"
                    onClick={() => setShowCustomFlavour(true)}
                  >+ Add custom flavour</button>
                )}
              </div>

              <div className="byc-field">
                <label className="byc-label">Shape <span className="req">*</span></label>
                <div className="byc-shape-grid">
                  {SHAPE_OPTIONS.map(sh => (
                    <button key={sh} type="button"
                      className={`byc-shape-card ${selectedShape === sh ? 'sel' : ''}`}
                      onClick={() => setSelectedShape(sh)}
                    >
                      <span className="byc-shape-icon">{shapeEmoji(sh)}</span>
                      <span className="byc-shape-name">{sh}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="byc-field">
                <label className="byc-label">Cake Type <span className="req">*</span></label>
                <div className="byc-pills">
                  {['Egg', 'Eggless'].map(t => (
                    <button key={t} type="button"
                      className={`byc-pill ${eggType === t ? 'sel' : ''}`}
                      onClick={() => setEggType(t)}
                    >{t === 'Egg' ? '🥚 Egg' : '🥛 Eggless'}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 2: Size ════ */}
          {step === 2 && (
            <div className="byc-section">
              <h2 className="byc-section-title">Cake Size</h2>

              <div className="byc-field">
                <label className="byc-label">Select Size (lbs) <span className="req">*</span></label>
                <div className="byc-size-chips">
                  {SIZE_PRESETS.map(s => (
                    <button key={s} type="button"
                      className={`byc-size-chip ${sizeType === s ? 'sel' : ''}`}
                      onClick={() => { setSizeType(s); setCustomSizeVal('') }}
                    >
                      <span className="byc-size-num">{s}</span>
                      <span className="byc-size-unit">lb</span>
                    </button>
                  ))}
                  <button type="button"
                    className={`byc-size-chip ${sizeType === 'custom' ? 'sel' : ''}`}
                    onClick={() => setSizeType('custom')}
                  >
                    <span className="byc-size-num" style={{ fontSize: 16 }}>Custom</span>
                    <span className="byc-size-unit">lb</span>
                  </button>
                </div>

                {sizeType === 'custom' && (
                  <input
                    type="number" step="0.5" min="0.5"
                    className="byc-input" style={{ marginTop: 12, maxWidth: 220 }}
                    placeholder="Enter size in lbs (e.g. 1.5)"
                    value={customSizeVal}
                    onChange={e => setCustomSizeVal(e.target.value)}
                    autoFocus
                  />
                )}

                <p className="byc-note">💡 Price will be confirmed by our team after order review.</p>
              </div>

              <div className="byc-field">
                <label className="byc-label">Quantity</label>
                <div className="byc-qty">
                  <button type="button" className="byc-qty-btn"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >−</button>
                  <span className="byc-qty-val">{quantity}</span>
                  <button type="button" className="byc-qty-btn"
                    onClick={() => setQuantity(q => q + 1)}
                  >+</button>
                </div>
              </div>
            </div>
          )}

          {/* ════ STEP 3: Extras ════ */}
          {step === 3 && (
            <div className="byc-section">
              <h2 className="byc-section-title">Final Touches</h2>

              <div className="byc-field">
                <label className="byc-label">Topper Text <span className="opt">(optional)</span></label>
                <input type="text" className="byc-input"
                  placeholder='e.g. "Happy Birthday Sarah!"'
                  value={topperText} onChange={e => setTopperText(e.target.value)}
                />
              </div>

              <div className="byc-field">
                <label className="byc-label">Wish on Cake <span className="opt">(optional)</span></label>
                <input type="text" className="byc-input"
                  placeholder='e.g. "Happy Anniversary"'
                  value={wishText} onChange={e => setWishText(e.target.value)}
                />
              </div>

              <div className="byc-field">
                <label className="byc-label">Card Message <span className="opt">(optional)</span></label>
                <textarea className="byc-textarea" rows="3"
                  placeholder="Write a personal message for the card..."
                  maxLength={200} value={cardMessage}
                  onChange={e => setCardMessage(e.target.value)}
                />
                <span className="byc-char">{cardMessage.length}/200</span>
              </div>

              <div className="byc-field">
                <label className="byc-label">
                  Reference Images <span className="opt">(optional, up to 5)</span>
                </label>
                <div
                  className={`byc-upload ${images.length >= 5 ? 'disabled' : ''}`}
                  onClick={() => images.length < 5 && fileRef.current.click()}
                >
                  <input ref={fileRef} type="file" accept="image/*" multiple
                    style={{ display: 'none' }} onChange={handleFiles}
                  />
                  {imgUploading
                    ? <>
                        <div className="byc-spinner" />
                        <p className="byc-upload-text">Uploading to Cloudinary...</p>
                      </>
                    : <>
                        <span style={{ fontSize: 28 }}>📎</span>
                        <p className="byc-upload-text">
                          {images.length >= 5
                            ? 'Maximum 5 images reached'
                            : <><strong>Click to upload</strong> reference images</>
                          }
                        </p>
                        <p className="byc-upload-hint">PNG, JPG — up to 5 images ({images.length}/5)</p>
                      </>
                  }
                </div>
                {images.length > 0 && (
                  <div className="byc-img-row">
                    {images.map((img, i) => (
                      <div key={i} className="byc-img-thumb">
                        <img src={img.url} alt="" />
                        {img.uploading
                          ? <div className="byc-thumb-overlay"><div className="byc-spinner-sm" /></div>
                          : <button type="button" className="byc-img-remove" onClick={() => removeImg(i)}>×</button>
                        }
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="byc-nav">
            {step > 1
              ? <button type="button" className="byc-btn-ghost" onClick={() => setStep(s => s - 1)}>← Back</button>
              : <div />
            }
            {step < TOTAL_STEPS
              ? <button type="button" className="byc-btn" disabled={!stepValid[step]} onClick={() => setStep(s => s + 1)}>Continue →</button>
              : <button type="button" className="byc-btn" disabled={imgUploading} onClick={handleAddToCart}>
                  {imgUploading ? '⏳ Uploading...' : '🛒 Add to Cart'}
                </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}

function shapeEmoji(sh) {
  return { Round: '⭕', Heart: '❤️', Square: '⬛', Hexagon: '⬡', Oval: '🥚', Tier: '🎂' }[sh] || '🎂'
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&family=DM+Sans:wght@300;400;500;600&display=swap');
  .byc-wrap { min-height:100vh; background:#fff8f8; font-family:'DM Sans',sans-serif; padding:48px 20px 80px; color:#2d1a1a; }
  .byc-header { text-align:center; margin-bottom:36px; }
  .byc-eyebrow { display:inline-block; background:#FDACAC; color:#7a2020; font-size:11px; font-weight:600; letter-spacing:.14em; text-transform:uppercase; padding:4px 16px; border-radius:100px; margin-bottom:12px; }
  .byc-title { font-family:'Playfair Display',serif; font-size:clamp(28px,5vw,46px); font-weight:700; color:#2d1a1a; line-height:1.1; margin-bottom:10px; }
  .byc-sub { font-size:14px; color:#b07070; font-weight:300; }
  .byc-stepper { display:flex; align-items:center; justify-content:center; max-width:360px; margin:0 auto 32px; }
  .byc-step-item { display:flex; flex-direction:column; align-items:center; gap:6px; }
  .byc-step-dot { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; background:#f5dede; color:#c9a0a0; transition:all .3s; }
  .byc-step-dot.active { background:#FDACAC; color:#fff; box-shadow:0 0 0 4px rgba(253,172,172,.25); }
  .byc-step-dot.done { background:#e07b8a; color:#fff; }
  .byc-step-label { font-size:11px; color:#c9a0a0; font-weight:500; }
  .byc-step-label.active { color:#e07b8a; font-weight:700; }
  .byc-step-line { flex:1; height:2px; background:#f5dede; min-width:40px; margin:0 6px; margin-bottom:20px; transition:background .3s; }
  .byc-step-line.done { background:#e07b8a; }
  .byc-card { max-width:560px; margin:0 auto; background:#fff; border-radius:24px; box-shadow:0 8px 40px rgba(224,123,138,.13); padding:36px 32px 28px; }
  .byc-section { display:flex; flex-direction:column; gap:26px; }
  .byc-section-title { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#2d1a1a; padding-bottom:14px; border-bottom:1px solid #fce8e8; }
  .byc-field { display:flex; flex-direction:column; gap:10px; }
  .byc-label { font-size:12px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:#b07070; }
  .req { color:#e07b8a; } .opt { color:#d4b0b0; font-weight:400; text-transform:none; letter-spacing:0; font-size:11px; }
  .byc-pills { display:flex; flex-wrap:wrap; gap:8px; }
  .byc-pill { padding:7px 16px; border-radius:100px; border:1.5px solid #f5dede; background:#fff; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all .2s; color:#7a4040; }
  .byc-pill:hover { border-color:#FDACAC; color:#e07b8a; }
  .byc-pill.sel { border-color:#FDACAC; background:#FDACAC; color:#fff; }
  .byc-pill.custom { background:#e07b8a; border-color:#e07b8a; }
  .byc-shape-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
  .byc-shape-card { display:flex; flex-direction:column; align-items:center; gap:5px; padding:14px 8px; border-radius:16px; border:1.5px solid #f5dede; background:#fff; cursor:pointer; transition:all .2s; font-family:'DM Sans',sans-serif; }
  .byc-shape-card:hover { border-color:#FDACAC; background:#fff5f5; }
  .byc-shape-card.sel { border-color:#e07b8a; background:#fff0f0; box-shadow:0 0 0 3px rgba(253,172,172,.22); }
  .byc-shape-icon { font-size:22px; } .byc-shape-name { font-size:12px; font-weight:600; color:#7a4040; }
  .byc-size-chips { display:flex; flex-wrap:wrap; gap:10px; }
  .byc-size-chip { display:flex; flex-direction:column; align-items:center; padding:12px 20px; border-radius:16px; min-width:72px; border:1.5px solid #f5dede; background:#fff; cursor:pointer; transition:all .2s; }
  .byc-size-chip:hover { border-color:#FDACAC; background:#fff5f5; }
  .byc-size-chip.sel { border-color:#e07b8a; background:#fff0f0; box-shadow:0 0 0 3px rgba(253,172,172,.22); }
  .byc-size-num { font-family:'Playfair Display',serif; font-size:22px; font-weight:700; color:#2d1a1a; }
  .byc-size-unit { font-size:11px; color:#b07070; font-weight:600; }
  .byc-note { font-size:12px; color:#c9a0a0; margin-top:4px; }
  .byc-qty { display:flex; align-items:center; gap:16px; }
  .byc-qty-btn { width:38px; height:38px; border-radius:50%; border:1.5px solid #f5dede; background:#fff; font-size:20px; cursor:pointer; color:#e07b8a; transition:all .2s; display:flex; align-items:center; justify-content:center; }
  .byc-qty-btn:hover:not(:disabled) { border-color:#FDACAC; background:#fff5f5; }
  .byc-qty-btn:disabled { opacity:.35; cursor:not-allowed; }
  .byc-qty-val { font-size:20px; font-weight:700; min-width:28px; text-align:center; }
  .byc-input { width:100%; padding:11px 14px; border-radius:12px; border:1.5px solid #f5dede; background:#fff; font-family:'DM Sans',sans-serif; font-size:14px; color:#2d1a1a; outline:none; transition:border-color .2s; }
  .byc-input:focus { border-color:#FDACAC; } .byc-input::placeholder { color:#d4b0b0; }
  .byc-textarea { width:100%; min-height:80px; padding:11px 14px; border-radius:12px; border:1.5px solid #f5dede; background:#fff; font-family:'DM Sans',sans-serif; font-size:14px; color:#2d1a1a; resize:vertical; outline:none; transition:border-color .2s; }
  .byc-textarea:focus { border-color:#FDACAC; } .byc-textarea::placeholder { color:#d4b0b0; }
  .byc-char { font-size:11px; color:#d4b0b0; text-align:right; }
  .byc-inline { display:flex; gap:6px; }
  .byc-inline .byc-input { border-radius:12px 0 0 12px; }
  .byc-inline-save { padding:0 16px; border-radius:0 12px 12px 0; border:1.5px solid #FDACAC; background:#FDACAC; color:#fff; font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; }
  .byc-inline-save:disabled { opacity:.4; cursor:not-allowed; }
  .byc-inline-cancel { padding:0 14px; border-radius:12px; border:1.5px solid #f5dede; background:#fff; font-size:18px; cursor:pointer; color:#b07070; line-height:1; }
  .byc-add-link { background:none; border:none; padding:0; font-size:13px; color:#e07b8a; cursor:pointer; font-family:'DM Sans',sans-serif; font-weight:600; text-decoration:underline; text-underline-offset:3px; width:fit-content; }
  .byc-upload.disabled { opacity:.5; cursor:not-allowed; }
  .byc-spinner { width:28px; height:28px; border-radius:50%; border:3px solid #f5dede; border-top-color:#e07b8a; animation:byc-spin .7s linear infinite; }
  .byc-spinner-sm { width:20px; height:20px; border-radius:50%; border:2px solid rgba(255,255,255,.4); border-top-color:#fff; animation:byc-spin .7s linear infinite; }
  @keyframes byc-spin { to { transform:rotate(360deg); } }
  .byc-thumb-overlay { position:absolute; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:center; justify-content:center; border-radius:10px; }
  .byc-upload { border:2px dashed #f5dede; border-radius:16px; padding:22px; text-align:center; cursor:pointer; background:#fffafa; transition:all .2s; display:flex; flex-direction:column; align-items:center; gap:6px; }
  .byc-upload:hover { border-color:#FDACAC; background:#fff5f5; }
  .byc-upload-text { font-size:13px; color:#b07070; } .byc-upload-text strong { color:#e07b8a; }
  .byc-upload-hint { font-size:11px; color:#d4b0b0; }
  .byc-img-row { display:flex; flex-wrap:wrap; gap:8px; margin-top:10px; }
  .byc-img-thumb { position:relative; width:72px; height:72px; border-radius:10px; overflow:hidden; border:1.5px solid #f5dede; }
  .byc-img-thumb img { width:100%; height:100%; object-fit:cover; }
  .byc-img-remove { position:absolute; top:3px; right:3px; width:20px; height:20px; border-radius:50%; background:rgba(0,0,0,.5); color:#fff; border:none; cursor:pointer; font-size:14px; display:flex; align-items:center; justify-content:center; line-height:1; }
  .byc-nav { display:flex; justify-content:space-between; align-items:center; margin-top:30px; padding-top:20px; border-top:1px solid #fce8e8; }
  .byc-btn { padding:13px 32px; border-radius:14px; border:none; background:#e07b8a; color:#fff; font-family:'DM Sans',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:background .2s; }
  .byc-btn:hover:not(:disabled) { background:#c9606f; } .byc-btn:disabled { opacity:.4; cursor:not-allowed; }
  .byc-btn-ghost { padding:13px 20px; border-radius:14px; border:1.5px solid #f5dede; background:transparent; font-family:'DM Sans',sans-serif; font-size:14px; color:#b07070; cursor:pointer; transition:all .2s; }
  .byc-btn-ghost:hover { border-color:#FDACAC; color:#e07b8a; }
`

export default BuildYourCake