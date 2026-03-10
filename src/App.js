import "./App.css";
import AppContext from "./Context/appContext";
import { useContext, useState, useEffect, useRef } from "react";
import Navbar from "./Components/Navbar";
import SecNavbar from "./Components/SecNavbar";
import Footer from "./Components/Footer";
import AllProducts from "./Components/AllProducts";

import { Switch, Route, useLocation } from "react-router-dom";

import Home from "./Components/Home";
import ProductPage from "./Components/ProductPage";
import Login from "./Admin Dashboard/Login";
import Dashboard from "./Admin Dashboard/Dashboard";
import CreateYourCake from "./Components/CreateYourCake";
import BigLoader from "./Components/BigLoader";

const CART_KEY = "cart_items";

function App() {
  const context = useContext(AppContext);
  let location = useLocation();
  const { helloworld, handlePlaceOrder } = context;

  console.log(helloworld);

  // ── Offcanvas open/close state ──────────────────────────────────────────
  const [showCart, setShowCart] = useState(false);

  // ── Checkout Modal state ────────────────────────────────────────────────
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryDate: "",
    paymentMethod: "COD",
  });

  // ── Advance payment screenshot state ───────────────────────────────────
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] = useState(null);
  const [screenshotUploading, setScreenshotUploading] = useState(false);
  const [screenshotCloudinaryUrl, setScreenshotCloudinaryUrl] = useState(null);
  const fileInputRef = useRef(null);

  // ── Upload screenshot to Cloudinary ────────────────────────────────────
  const uploadScreenshotToCloudinary = async (file) => {
    setScreenshotUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "customize-cake");
      formData.append("cloud_name", "drdk4hrkn");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drdk4hrkn/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      console.log("Payment Screenshot Cloudinary URL:", data.secure_url);
      setScreenshotCloudinaryUrl(data.secure_url);
      return data.secure_url;
    } catch (err) {
      console.error("Screenshot upload failed:", err);
      alert("Failed to upload screenshot. Please try again.");
      return null;
    } finally {
      setScreenshotUploading(false);
    }
  };

  const handleScreenshotChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPaymentScreenshot(file);
    setPaymentScreenshotPreview(URL.createObjectURL(file));
    setScreenshotCloudinaryUrl(null); // reset previous URL
    // Upload immediately on selection
    await uploadScreenshotToCloudinary(file);
  };

  const handleRemoveScreenshot = () => {
    setPaymentScreenshot(null);
    setPaymentScreenshotPreview(null);
    setScreenshotCloudinaryUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({ ...prev, [name]: value }));
    // Clear screenshot if switching away from ADVANCE
    if (name === "paymentMethod" && value !== "ADVANCE") {
      handleRemoveScreenshot();
    }
  };

  // ── Cart state — initialized from localStorage ──────────────────────────
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Auto-sync cartItems → localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Lock body scroll when offcanvas or modal is open
  useEffect(() => {
    if (showCart || showCheckoutModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCart, showCheckoutModal]);

  const handleRemoveFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const cartGrandTotal = cartItems.reduce(
    (sum, item) => sum + item.itemTotal,
    0,
  );

  // Close offcanvas first, then open modal
  const handleProceedToCheckout = () => {
    setShowCart(false);
    setShowCheckoutModal(true);
  };

  const resetForm = () => {
    setCheckoutData({
      name: "",
      phone: "",
      address: "",
      deliveryDate: "",
      paymentMethod: "COD",
    });
    handleRemoveScreenshot();
  };

  // Determine if Place Order button should be disabled
  const isAdvance = checkoutData.paymentMethod === "ADVANCE";
  const canPlaceOrder = !isAdvance || (isAdvance && screenshotCloudinaryUrl && !screenshotUploading);

  // ── Build enriched items for the order payload ──────────────────────────
  // Each cart item already carries `image` (first product image or custom cake
  // reference image) and `userCake` (true for custom cakes). We remap them to
  // the field names the backend / Order schema expects.
  const buildOrderItems = () =>
    cartItems.map((item) => ({
      productName: item.productName,
      quantity: item.quantity,
      price: item.itemTotal,                          // total price for this line
      selectedSize: item.selectedSize || null,
      selectedFlavour: item.selectedFlavour || null,
      selectedShape: item.selectedShape || null,
      productImage: item.image || null,               // ← Cloudinary URL
      isCustomCake: item.userCake === true,           // ← boolean flag
    }));

  const hideNavbarRoutes = [
    "/admin-login",
    "/admin-dashboard",
    "/admin-dashboard/view-products",
    "/admin-dashboard/add-products",
    "/admin-dashboard/categories",
    "/admin-dashboard/edit-product",
  ];

  const shouldHideNavbar = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <>
      <div className="App">
        {!shouldHideNavbar && <Navbar />}
        {!shouldHideNavbar && <SecNavbar />}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/:category/:slug/:id">
            <AllProducts />
          </Route>
<Route exact path="/product/:id">
  <ProductPage cartItems={cartItems} setCartItems={setCartItems} setShowCart={setShowCart} />
</Route>

          <Route exact path="/admin-login">
            <Login />
          </Route>
          <Route exact path="/create-your-own-cake">
            <CreateYourCake setCartItems={setCartItems} setShowCart={setShowCart} />
          </Route>

          <Route path="/admin-dashboard">
            <Dashboard />
          </Route>
        </Switch>

        {!shouldHideNavbar && <Footer />}
      </div>

      {/* ── Floating Cart Button ── */}
      <button
        type="button"
        onClick={() => setShowCart(true)}
        className="btn position-fixed d-flex align-items-center gap-2"
        style={{
          bottom: "24px",
          right: "24px",
          backgroundColor: "#FDACAC",
          border: "none",
          borderRadius: "50px",
          padding: "12px 20px",
          fontWeight: "600",
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          zIndex: 1040,
        }}
      >
        <i className="fas fa-shopping-cart"></i>
        {cartItems.length > 0 && (
          <span
            className="badge rounded-pill text-white"
            style={{ backgroundColor: "#e07b8a", fontSize: "0.75rem" }}
          >
            {cartItems.length}
          </span>
        )}
      </button>

      {/* ================= OFFCANVAS BACKDROP ================= */}
      {showCart && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={() => setShowCart(false)}
          style={{ zIndex: 1044 }}
        ></div>
      )}

      {/* ================= OFFCANVAS ================= */}
      <div
        className={`offcanvas offcanvas-end ${showCart ? "show" : ""}`}
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
        style={{
          width: "420px",
          visibility: showCart ? "visible" : "hidden",
          zIndex: 1045,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="cartOffcanvasLabel">
            🛒 Your Cart
            {cartItems.length > 0 && (
              <span
                className="badge ms-2 rounded-pill"
                style={{
                  backgroundColor: "#FDACAC",
                  color: "#333",
                  fontSize: "0.8rem",
                }}
              >
                {cartItems.length} item{cartItems.length > 1 ? "s" : ""}
              </span>
            )}
          </h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowCart(false)}
            aria-label="Close"
          ></button>
        </div>

        <div
          className="offcanvas-body p-0 d-flex flex-column"
          style={{ height: "100%" }}
        >
          {/* Items Area */}
          <div className="flex-grow-1 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                <div style={{ fontSize: "3rem" }}>🧁</div>
                <p className="mt-3">Your cart is empty</p>
              </div>
            ) : (
              <div className="p-3 d-flex flex-column gap-3">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="card border-0 shadow-sm rounded-3"
                    style={{ fontSize: "0.88rem" }}
                  >
                    <div className="card-body p-3">
                      <div className="d-flex align-items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.productName}
                            className="rounded-2"
                            style={{
                              width: "64px",
                              height: "64px",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                        ) : (
                          /* Placeholder for custom cakes with no reference image */
                          <div
                            className="rounded-2 d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              flexShrink: 0,
                              backgroundColor: "#fff0f0",
                              border: "1px dashed #FDACAC",
                              fontSize: "1.6rem",
                            }}
                          >
                            🎂
                          </div>
                        )}

                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <h6
                                className="fw-bold mb-1 text-uppercase"
                                style={{ fontSize: "0.85rem" }}
                              >
                                {item.productName}
                              </h6>
                              {/* Custom cake badge */}
                              {item.userCake && (
                                <span
                                  className="badge mb-1"
                                  style={{
                                    backgroundColor: "#fce8e8",
                                    color: "#e07b8a",
                                    fontSize: "0.72rem",
                                  }}
                                >
                                  ✨ Custom Cake
                                </span>
                              )}
                            </div>
                            <button
                              className="btn btn-sm p-0 ms-2 text-danger"
                              style={{ lineHeight: 1, fontSize: "1rem" }}
                              onClick={() => handleRemoveFromCart(item.cartId)}
                              title="Remove"
                            >
                              ✕
                            </button>
                          </div>

                          <div className="text-muted" style={{ lineHeight: "1.6" }}>
                            <span className="badge bg-light text-dark border me-1">
                              Qty: {item.quantity}
                            </span>
                            {item.selectedSize && (
                              <span className="badge bg-light text-dark border me-1">
                                Size: {item.selectedSize}
                              </span>
                            )}
                            {item.selectedFlavour && (
                              <span className="badge bg-light text-dark border me-1">
                                🍫 {item.selectedFlavour}
                              </span>
                            )}
                            {item.selectedShape && (
                              <span className="badge bg-light text-dark border me-1">
                                ◆ {item.selectedShape}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {(item.topperText || item.wishText || item.cardMessage) && (
                        <div
                          className="mt-2 pt-2 border-top text-muted d-flex gap-1"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {item.topperText && (
                            <span className="badge bg-info text-dark">Topper Text</span>
                          )}
                          {item.wishText && (
                            <span className="badge bg-info text-dark">Wish Text</span>
                          )}
                          {item.cardMessage && (
                            <span className="badge bg-info text-dark">Card Message</span>
                          )}
                        </div>
                      )}

                      <div className="mt-2 text-end fw-bold" style={{ color: "#e07b8a" }}>
                        ₨{item.itemTotal.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer — pinned to bottom */}
          <div className="p-3 border-top bg-white" style={{ flexShrink: 0 }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="fw-bold fs-6">Grand Total</span>
              <h5 className="mb-0 fw-bold" style={{ color: "#e07b8a" }}>
                ₨{cartGrandTotal.toLocaleString()}
              </h5>
            </div>
            <button
              className="btn w-100 py-2 fw-semibold text-white"
              style={{ backgroundColor: "#e07b8a", border: "none", fontSize: "1rem" }}
              onClick={handleProceedToCheckout}
            >
              Proceed to Checkout →
            </button>
          </div>
        </div>
      </div>
      {/* ================= OFFCANVAS END ================= */}

      {/* ================= CHECKOUT MODAL ================= */}
      {showCheckoutModal && (
        <>
          <div
            className="modal fade show d-block"
            tabIndex="-1"
            style={{ zIndex: 1055 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowCheckoutModal(false);
            }}
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title fw-bold">Checkout</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowCheckoutModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={checkoutData.name}
                        onChange={handleCheckoutChange}
                        className="form-control"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={checkoutData.phone}
                        onChange={handleCheckoutChange}
                        className="form-control"
                        placeholder="e.g. 03001234567"
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea
                        name="address"
                        value={checkoutData.address}
                        onChange={handleCheckoutChange}
                        className="form-control"
                        rows="3"
                        placeholder="Enter your delivery address"
                        required
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Delivery Date</label>
                      <input
                        type="date"
                        name="deliveryDate"
                        value={checkoutData.deliveryDate}
                        onChange={handleCheckoutChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Payment Method</label>
                      <select
                        name="paymentMethod"
                        value={checkoutData.paymentMethod}
                        onChange={handleCheckoutChange}
                        className="form-select"
                      >
                        <option value="COD">Cash on Delivery</option>
                        <option value="ADVANCE">Advance Payment (30%)</option>
                      </select>
                    </div>

                    {/* ── Advance Payment Section ── */}
                    {isAdvance && (
                      <div className="col-12">
                        <div
                          className="p-3 rounded-3"
                          style={{ backgroundColor: "#fff5f6", border: "1px solid #f5c2c7" }}
                        >
                          {/* Amount breakdown */}
                          <div className="d-flex justify-content-between mb-1" style={{ fontSize: "0.9rem" }}>
                            <span className="text-muted">Advance Amount (30%):</span>
                            <strong style={{ color: "#e07b8a" }}>
                              ₨{Math.round(cartGrandTotal * 0.3).toLocaleString()}
                            </strong>
                          </div>
                          <div className="d-flex justify-content-between mb-3" style={{ fontSize: "0.9rem" }}>
                            <span className="text-muted">Remaining on Delivery:</span>
                            <strong>
                              ₨{(cartGrandTotal - Math.round(cartGrandTotal * 0.3)).toLocaleString()}
                            </strong>
                          </div>

                          <hr className="my-2" />

                          {/* Upload instruction */}
                          <p className="mb-2 fw-semibold" style={{ fontSize: "0.9rem" }}>
                            📸 Upload Payment Screenshot
                          </p>
                          <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>
                            Please transfer ₨{Math.round(cartGrandTotal * 0.3).toLocaleString()} and upload the screenshot below to confirm your order.
                          </p>

                          {/* Upload area */}
                          {!paymentScreenshotPreview ? (
                            <div
                              onClick={() => fileInputRef.current?.click()}
                              className="d-flex flex-column align-items-center justify-content-center rounded-3 gap-2"
                              style={{
                                border: "2px dashed #e07b8a",
                                padding: "24px",
                                cursor: "pointer",
                                backgroundColor: "#fff",
                                transition: "background 0.2s",
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fdf0f2"}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
                            >
                              <div style={{ fontSize: "2rem" }}>📷</div>
                              <span style={{ color: "#e07b8a", fontWeight: "600", fontSize: "0.9rem" }}>
                                Click to upload screenshot
                              </span>
                              <span className="text-muted" style={{ fontSize: "0.78rem" }}>
                                JPG, PNG, WEBP supported
                              </span>
                            </div>
                          ) : (
                            <div className="position-relative">
                              <img
                                src={paymentScreenshotPreview}
                                alt="Payment Screenshot"
                                className="rounded-3 w-100"
                                style={{ maxHeight: "220px", objectFit: "cover", border: "1px solid #f5c2c7" }}
                              />
                              {/* Remove button — only show when not uploading */}
                              {!screenshotUploading && (
                                <button
                                  type="button"
                                  onClick={handleRemoveScreenshot}
                                  className="btn btn-sm position-absolute"
                                  style={{
                                    top: "8px",
                                    right: "8px",
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    color: "#fff",
                                    borderRadius: "50%",
                                    width: "28px",
                                    height: "28px",
                                    padding: "0",
                                    lineHeight: "1",
                                    fontSize: "0.85rem",
                                  }}
                                >
                                  ✕
                                </button>
                              )}

                              {/* Upload status */}
                              <div className="mt-2 d-flex align-items-center gap-2" style={{ fontSize: "0.82rem" }}>
                                {screenshotUploading ? (
                                  <>
                                    <div
                                      className="spinner-border spinner-border-sm"
                                      role="status"
                                      style={{ color: "#e07b8a", width: "14px", height: "14px" }}
                                    ></div>
                                    <span className="text-muted">Uploading screenshot...</span>
                                  </>
                                ) : screenshotCloudinaryUrl ? (
                                  <>
                                    <span style={{ color: "#198754" }}>✅</span>
                                    <span style={{ color: "#198754", fontWeight: "600" }}>
                                      Screenshot uploaded successfully
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span style={{ color: "#dc3545" }}>⚠️</span>
                                    <span style={{ color: "#dc3545" }}>Upload failed — please remove and try again</span>
                                  </>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Hidden file input */}
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleScreenshotChange}
                            style={{ display: "none" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong style={{ color: "#e07b8a" }}>
                      ₨{cartGrandTotal.toLocaleString()}
                    </strong>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn w-100 py-2 text-white fw-semibold"
                    style={{
                      backgroundColor: canPlaceOrder ? "#e07b8a" : "#f5a5b0",
                      border: "none",
                      fontSize: "1rem",
                      cursor: canPlaceOrder ? "pointer" : "not-allowed",
                    }}
                    disabled={!canPlaceOrder}
                    onClick={() => {
                      handlePlaceOrder(
                        buildOrderItems(),          // ← enriched items with productImage + isCustomCake
                        cartGrandTotal,
                        {
                          ...checkoutData,
                          paymentScreenshotUrl: screenshotCloudinaryUrl || null,
                        },
                        setCartItems,
                      );
                      setShowCheckoutModal(false);
                      resetForm();
                    }}
                  >
                    {screenshotUploading
                      ? "Uploading Screenshot..."
                      : isAdvance && !screenshotCloudinaryUrl
                      ? "Upload Screenshot to Place Order"
                      : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Backdrop */}
          <div className="modal-backdrop fade show" style={{ zIndex: 1054 }}></div>
        </>
      )}
       {!shouldHideNavbar &&<BigLoader/>}
    </>
  );
}

export default App;