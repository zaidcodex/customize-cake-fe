import React, { useState, useContext, useEffect } from 'react'
import AppContext from '../Context/appContext';

const Orders = () => {
  const context = useContext(AppContext);
  const { orders, getOrders, updateOrderStatus, updatePaymentStatus } = context;

  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [changePaymentModal, setChangePaymentModal] = useState(false);
  const [newPaymentStatus, setNewPaymentStatus] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      await getOrders();
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleOpenChangeStatus = (order) => {
    setSelectedOrder(order);
    setNewStatus(order.orderStatus);
    setChangeStatusModal(true);
  };

  const handleUpdateStatus = () => {
    if (selectedOrder && newStatus) {
      updateOrderStatus(selectedOrder._id, newStatus);
      setChangeStatusModal(false);
    }
  };

  const handleOpenChangePayment = (order) => {
    setSelectedOrder(order);
    setNewPaymentStatus(order.paymentStatus);
    setChangePaymentModal(true);
  };

  const handleUpdatePaymentStatus = () => {
    if (selectedOrder && newPaymentStatus) {
      updatePaymentStatus(selectedOrder._id, newPaymentStatus);
      setChangePaymentModal(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const map = {
      Pending: 'bg-warning text-dark',
      Confirmed: 'bg-primary',
      Baking: 'bg-info text-dark',
      'Out For Delivery': 'bg-secondary',
      Delivered: 'bg-success',
      Cancelled: 'bg-danger',
    };
    return `badge ${map[status] || 'bg-secondary'}`;
  };

  const getPaymentBadgeClass = (status) => {
    const map = { Pending: 'bg-warning text-dark', Partial: 'bg-info text-dark', Paid: 'bg-success' };
    return `badge ${map[status] || 'bg-secondary'}`;
  };

  // ── Size can be a plain string ("2 lb") or an object ({ size, price }) ──
  // This normalises both to a display string.
  const formatSize = (size) => {
    if (!size) return '—';
    if (typeof size === 'object') {
      // e.g. { size: "1 Pound", price: 1200 }
      return size.size ? `${size.size}${size.price ? ` (Rs. ${size.price})` : ''}` : '—';
    }
    return size; // plain string e.g. "2 lb"
  };

  return (
    <>
      <div className="container py-4">
        <h1>Orders</h1>
        <hr />

        {loading ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
            <div
              className="spinner-border mb-3"
              role="status"
              style={{ width: '3rem', height: '3rem', color: '#e07b8a' }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="fw-semibold" style={{ color: '#b07070' }}>Fetching orders...</p>
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center py-5 text-muted">
            <span style={{ fontSize: '3rem' }}>📦</span>
            <p className="mt-2 fw-semibold">No orders found.</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="d-flex justify-content-between align-items-center mb-3 p-3"
              style={{ border: '1px solid #dee2e6', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
            >
              <div className="d-flex gap-3 align-items-center">
                {/* Priority: first non-empty productImage across all items → payment screenshot → cake emoji placeholder */}
                {(() => {
                  const cardImg = order.items?.map(i => i.productImage).find(url => url && url.trim() !== '');
                  const thumbStyle = { width: '80px', height: '100px', objectFit: 'cover', flexShrink: 0, borderRadius: '8px' };
                  if (cardImg) {
                    return <img src={cardImg} alt="product" style={thumbStyle} />;
                  }
                  if (order.paymentScreenshotUrl) {
                    return <img src={order.paymentScreenshotUrl} alt="Payment" style={thumbStyle} />;
                  }
                  return (
                    <div
                      className="d-flex flex-column align-items-center justify-content-center text-muted"
                      style={{ width: '80px', height: '100px', backgroundColor: '#fff8f8', border: '1px dashed #fce8e8', flexShrink: 0, borderRadius: '8px', fontSize: '11px', gap: '4px' }}
                    >
                      <span style={{ fontSize: '28px' }}>🎂</span>
                      <span style={{ color: '#d4b0b0' }}>No image</span>
                    </div>
                  );
                })()}

                <div>
                  <h5 className="mb-1 fw-bold">#{order.trackingId}</h5>

                  {order.items?.some(i => i.isCustomCake) && (
                    <span className="badge mb-1" style={{ backgroundColor: '#fce8e8', color: '#e07b8a', fontSize: '0.72rem' }}>
                      ✨ Custom Cake
                    </span>
                  )}

                  <div className="text-muted">Customer: {order.customer?.name}</div>
                  <div className="text-muted">Phone: {order.customer?.phone}</div>
                  <div className="text-muted">Total: Rs. {order.totalAmount}</div>
                  <div className="text-muted">
                    Delivery: {order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}
                  </div>
                  <div className="mt-1 d-flex gap-2">
                    <span className={getStatusBadgeClass(order.orderStatus)}>{order.orderStatus}</span>
                    <span className={getPaymentBadgeClass(order.paymentStatus)}>{order.paymentStatus}</span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleOpenChangeStatus(order)}>
                  📦 Order Status
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => handleOpenChangePayment(order)}>
                  💳 Payment Status
                </button>
                <button className="btn btn-outline-secondary btn-sm" onClick={() => { setViewDetailsModal(true); setSelectedOrder(order); }}>
                  🔍 View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Change Payment Status Modal ── */}
      {changePaymentModal && selectedOrder && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">💳 Payment Status — #{selectedOrder.trackingId}</h5>
                  <button type="button" className="btn-close" onClick={() => setChangePaymentModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3 d-flex justify-content-between text-muted" style={{ fontSize: '13px' }}>
                    <span>Total: <strong>Rs. {selectedOrder.totalAmount}</strong></span>
                    <span>Method: <strong>{selectedOrder.paymentMethod}</strong></span>
                  </div>
                  <label className="form-label">Update Payment Status</label>
                  <select className="form-select" value={newPaymentStatus} onChange={(e) => setNewPaymentStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Paid">Paid</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setChangePaymentModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdatePaymentStatus}>Update Payment</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      
      {changeStatusModal && selectedOrder && (
        <>
          <div className="modal-backdrop fade show"></div>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Change Order Status — #{selectedOrder.trackingId}</h5>
                  <button type="button" className="btn-close" onClick={() => setChangeStatusModal(false)}></button>
                </div>
                <div className="modal-body">
                  <label className="form-label">Update Status</label>
                  <select className="form-select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Baking">Baking</option>
                    <option value="Out For Delivery">Out For Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setChangeStatusModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdateStatus}>Update Status</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── View Details Modal ── */}
      {viewDetailsModal && selectedOrder && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-xl">
              <div className="modal-content">

                <div className="modal-header">
                  <h5 className="modal-title">Order #{selectedOrder.trackingId} — Details</h5>
                  <button type="button" className="btn-close" onClick={() => setViewDetailsModal(false)}></button>
                </div>

                <div className="modal-body">

                  {/* ── Cake / Product Images Gallery ── */}
                  {(() => {
                    const allImages = selectedOrder.items
                      ?.flatMap(item => item.productImage ? [item.productImage] : [])
                      .filter(Boolean) ?? [];
                    return allImages.length > 0 ? (
                      <>
                        <h6 className="fw-bold mb-3">Cake Images</h6>
                        <div className="d-flex flex-wrap gap-3 mb-4 justify-content-center">
                          {allImages.map((url, i) => (
                            <img
                              key={i}
                              src={url}
                              alt={`Cake ${i + 1}`}
                              className="rounded shadow-sm"
                              style={{
                                width: '160px',
                                height: '160px',
                                objectFit: 'cover',
                                border: '2px solid #fce8e8',
                                cursor: 'pointer',
                                transition: 'transform .2s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                              onClick={() => window.open(url, '_blank')}
                            />
                          ))}
                        </div>
                        <hr />
                      </>
                    ) : (
                      <div
                        className="rounded d-flex flex-column align-items-center justify-content-center text-muted mx-auto mb-4"
                        style={{ height: '110px', maxWidth: '320px', backgroundColor: '#fff8f8', border: '1px dashed #fce8e8' }}
                      >
                        <span style={{ fontSize: '2rem' }}>🎂</span>
                        <span className="mt-1" style={{ fontSize: '13px' }}>No cake images uploaded</span>
                      </div>
                    );
                  })()}

                  {/* Customer Info */}
                  <h6 className="fw-bold mb-2">Customer Information</h6>
                  <div className="row mb-3">
                    <div className="col-md-4"><p><strong>Name:</strong> {selectedOrder.customer?.name}</p></div>
                    <div className="col-md-4"><p><strong>Phone:</strong> {selectedOrder.customer?.phone}</p></div>
                    <div className="col-md-4"><p><strong>Address:</strong> {selectedOrder.customer?.address}</p></div>
                  </div>

                  <hr />

                  {/* Order Items */}
                  <h6 className="fw-bold mb-2">Order Items</h6>
                  <div className="table-responsive mb-3">
                    <table className="table table-bordered table-sm align-middle">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: 70 }}>Image</th>
                          <th>Product</th>
                          <th>Type</th>
                          <th>Qty</th>
                          <th>Price</th>
                          <th>Size</th>
                          <th>Flavour</th>
                          <th>Shape</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              {item.productImage ? (
                                <img
                                  src={item.productImage}
                                  alt={item.productName}
                                  className="rounded"
                                  style={{ width: '52px', height: '52px', objectFit: 'cover' }}
                                />
                              ) : (
                                <div
                                  className="rounded d-flex align-items-center justify-content-center"
                                  style={{ width: '52px', height: '52px', backgroundColor: '#fff0f0', border: '1px dashed #FDACAC', fontSize: '1.4rem' }}
                                >
                                  🎂
                                </div>
                              )}
                            </td>
                            <td>{item.productName}</td>
                            <td>
                              {item.isCustomCake
                                ? <span className="badge" style={{ backgroundColor: '#fce8e8', color: '#e07b8a' }}>✨ Custom</span>
                                : <span className="badge bg-light text-dark border">Regular</span>
                              }
                            </td>
                            <td>{item.quantity}</td>
                            <td>Rs. {item.price}</td>
                            {/* formatSize handles both string "2 lb" and object { size, price } */}
                            <td>{formatSize(item.selectedSize)}</td>
                            <td>{item.selectedFlavour || '—'}</td>
                            <td>{item.selectedShape || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <hr />

                  {/* Payment Info */}
                  <h6 className="fw-bold mb-2">Payment Information</h6>
                  <div className="row mb-3">
                    <div className="col-md-3"><p><strong>Total Amount:</strong> Rs. {selectedOrder.totalAmount}</p></div>
                    <div className="col-md-3"><p><strong>Advance Paid:</strong> Rs. {selectedOrder.advanceAmount ?? 0}</p></div>
                    <div className="col-md-3"><p><strong>Remaining:</strong> Rs. {selectedOrder.remainingAmount ?? 0}</p></div>
                    <div className="col-md-3"><p><strong>Method:</strong> {selectedOrder.paymentMethod}</p></div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <p><strong>Payment Status:</strong>{' '}
                        <span className={getPaymentBadgeClass(selectedOrder.paymentStatus)}>{selectedOrder.paymentStatus}</span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p><strong>Order Status:</strong>{' '}
                        <span className={getStatusBadgeClass(selectedOrder.orderStatus)}>{selectedOrder.orderStatus}</span>
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p><strong>Delivery Date:</strong>{' '}
                        {selectedOrder.deliveryDate ? new Date(selectedOrder.deliveryDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <p><strong>Ordered At:</strong>{' '}{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                    </div>
                  </div>

                  {/* Payment screenshot — inside payment section */}
                  {selectedOrder.paymentScreenshotUrl ? (
                    <div className="mt-3">
                      <p className="fw-semibold mb-2" style={{ fontSize: '13px' }}>
                        📸 Payment Screenshot
                      </p>
                      <img
                        src={selectedOrder.paymentScreenshotUrl}
                        alt="Payment Screenshot"
                        className="img-fluid rounded shadow-sm"
                        style={{
                          maxHeight: '220px',
                          objectFit: 'contain',
                          border: '1px solid #f5c2c7',
                          cursor: 'pointer',
                        }}
                        onClick={() => window.open(selectedOrder.paymentScreenshotUrl, '_blank')}
                      />
                    </div>
                  ) : (
                    <div
                      className="d-flex align-items-center gap-2 mt-2 text-muted"
                      style={{ fontSize: '13px' }}
                    >
                      <span>💵</span>
                      <span>Cash on Delivery — no payment screenshot</span>
                    </div>
                  )}
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={() => setViewDetailsModal(false)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
};

export default Orders;