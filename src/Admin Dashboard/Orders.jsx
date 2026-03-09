import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Orders = () => {
    const [changeStatusmodal, setChangeStatusModal] = useState(false)
    const [viewDetailsModal, setViewDetailsModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)

 const products = [
  {
    _id: "69871f41ad3e722698f2fd5f",
    categoryId: "69768ec11a3ca27a28f78154",
    subCategoryId: "697758bdb76d8db9375915c5",

    productName: "Chocolate Fudge Cake",
    status:"Pending Approval",
    productDesc: `
      <p>Rich and moist chocolate cake layered with creamy fudge frosting.</p>
      <ul>
        <li>Premium cocoa used</li>
        <li>Soft sponge texture</li>
        <li>Perfect for birthdays</li>
      </ul>
    `,

    metaTitle: "Chocolate Fudge Cake – Sweet Treats",
    metaDesc: "Indulge in our delicious Chocolate Fudge Cake made with rich cocoa and creamy frosting.",

    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        public_id: "cake1"
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        public_id: "cake2"
      }
    ],

    sizes: [
      { size: "1 Pound", price: 1200 },
      { size: "2 Pound", price: 2200 }
    ],

    flavours: ["Chocolate", "Dark Chocolate"],
    shapes: ["Round", "Heart"],

    eggType: "egg",
    customMessage: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem itaque expedita totam culpa autem corporis tempore, est voluptate nihil, minima quos quia eius exercitationem assumenda inventore. Nam veritatis hic quos odio blanditiis.",
    isAvailable: true,
    preparationTime: 4,

    createdAt: "2026-02-07T11:17:21.618+00:00"
  },

  {
    _id: "79871f41ad3e722698f2fd5g",
    categoryId: "69768ec11a3ca27a28f78155",
    subCategoryId: "697758bdb76d8db9375915c6",

    productName: "Vanilla Dream Cake",
    status:"Pending Approval",
    productDesc: `
      <p>Soft vanilla sponge layered with smooth buttercream frosting.</p>
      <ul>
        <li>Light and fluffy texture</li>
        <li>Fresh dairy cream</li>
        <li>Perfect for weddings & anniversaries</li>
      </ul>
    `,

    metaTitle: "Vanilla Dream Cake – Classic Delight",
    metaDesc: "Experience the smooth and creamy taste of our Vanilla Dream Cake.",

    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        public_id: "vanilla1"
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        public_id: "vanilla2"
      },
      {
        url: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        public_id: "vanilla3"
      }
    ],

    sizes: [
      { size: "1 Pound", price: 1000 },
      { size: "3 Pound", price: 3000 }
    ],

    flavours: ["Vanilla", "Strawberry", "Pineapple"],
    shapes: ["Round", "Square", "Rectangle"],

    eggType: "eggless",
    customMessage: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem itaque expedita totam culpa autem corporis tempore, est voluptate nihil, minima quos quia eius exercitationem assumenda inventore. Nam veritatis hic quos odio blanditiis.",
    isAvailable: false,
    preparationTime: 6,

    createdAt: "2026-02-10T09:30:00.000+00:00"
  }
];

  return (
    <>
    <div className="container py-4">
      <h1>Orders</h1>
      <hr />

      {products.map((product) => (
        <div
          key={product._id}
          className="d-flex justify-content-between align-items-center mb-3 p-3"
          style={{
            border: "1px solid #dee2e6",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div className="d-flex gap-3 align-items-center">
            <img
              className="rounded"
              style={{ width: "80px", height: "100px", objectFit: "cover" }}
              src={product.images[0].url}
              alt="product"
            />

            <div>
              <h5 className="mb-1 fw-bold">
                {product.productName}
              </h5>
              <div className="text-muted">Status: {product.status}</div>
              <div className="text-muted">Price: {product.sizes[0].price}</div>
              <div className="text-muted">Weight: {product.sizes[0].size}</div>
            </div>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={()=>{setChangeStatusModal(true)}}>
              Change Status
            </button>
            <button className="btn btn-outline-secondary" onClick={()=>{setViewDetailsModal(true);  setSelectedProduct(product)}}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>

{changeStatusmodal && (
  <>
      <div className="modal-backdrop fade show"></div>
      <div class="modal d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Sub Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setChangeStatusModal(false)}} ></button>
      </div>
      <div class="modal-body">
         <label for="exampleFormControlInput1" class="form-label">Update Status</label>
         <select
  className="form-select"
//   value={sizeType}
//   onChange={}
>
  <option value="Pending Approval">Pending Approval</option>
  <option value="Processing">Processing</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancel">Cancel</option>
</select>
      </div>
      <div class="modal-footer">
         <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setChangeStatusModal(false)}>Close</button>
                 {/* <button type="button" class="btn btn-primary" onClick={()=>{handleEditSubCategory(subCategoryId, subCategory);setEditSubCategoryModal(false)}}>Update Sub Category</button>  */}
      </div>
    </div>
  </div>
</div>
</>
)}


{viewDetailsModal && selectedProduct && (
  <>
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              {selectedProduct.productName}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setViewDetailsModal(false)}
            ></button>
          </div>

          <div className="modal-body">

            {/* ALL IMAGES */}
            <h6 className="fw-bold mb-2">Product Images</h6>
            <div className="row mb-4">
              {selectedProduct.images.map((img, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <img
                    src={img.url}
                    alt="product"
                    className="img-fluid rounded shadow-sm"
                    style={{ height: "200px", objectFit: "cover", width: "100%" }}
                  />
                </div>
              ))}
            </div>

            {/* BASIC INFO */}
            <div className="row">
              <div className="">

                {/* <p><strong>Status:</strong> {selectedProduct.isAvailable ? "Available" : "Not Available"}</p> */}
                <p><strong>Egg Type:</strong> {selectedProduct.eggType}</p>
                <p><strong>Preparation Time:</strong> {selectedProduct.preparationTime} Hours</p>
                <p><strong>Custom Message:</strong> {selectedProduct.customMessage}</p>
                <p><strong>Created At:</strong> {new Date(selectedProduct.createdAt).toLocaleString()}</p>

              </div>

              {/* <div className="col-md-6">
                <p><strong>Product ID:</strong> {selectedProduct._id}</p>
                <p><strong>Category ID:</strong> {selectedProduct.categoryId}</p>
                <p><strong>Sub Category ID:</strong> {selectedProduct.subCategoryId}</p>
                <p><strong>Meta Title:</strong> {selectedProduct.metaTitle}</p>
                <p><strong>Meta Description:</strong> {selectedProduct.metaDesc}</p>
              </div> */}
            </div>

            <hr />

            {/* DESCRIPTION (HTML SAFE RENDER) */}
            <h6 className="fw-bold">Product Description</h6>
            <div
              dangerouslySetInnerHTML={{ __html: selectedProduct.productDesc }}
            ></div>

            <hr />

          {/* ORDER DETAILS */}

<h6 className="fw-bold mt-4">Order Details</h6>

<p>
  <strong>Selected Size:</strong>{" "}
  {selectedProduct.selectedSize?.size} - Rs.{" "}
  {selectedProduct.selectedSize?.price}
</p>

<p>
  <strong>Selected Flavour:</strong>{" "}
  {selectedProduct.selectedFlavour}
</p>

<p>
  <strong>Selected Shape:</strong>{" "}
  {selectedProduct.selectedShape}
</p>

<p>
  <strong>Quantity:</strong> {selectedProduct.quantity}
</p>

<p>
  <strong>Total Price:</strong> Rs. {selectedProduct.totalPrice}
</p>

{selectedProduct.customMessage && (
  <p>
    <strong>Custom Message:</strong>{" "}
    {selectedProduct.customMessage}
  </p>
)}
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setViewDetailsModal(false)}
            >
              Close
            </button>
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