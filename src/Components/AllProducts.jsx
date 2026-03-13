import React, {useContext, useEffect, useState} from 'react'
import ImgViewer from './Imgviewer'
import C1 from '../images/c1.png'
import C2 from '../images/c2.png'
import C3 from '../images/c3.jpg'
import C4 from '../images/c4.jpg'
import C5 from '../images/c5.jpg'
import AppContext from '../Context/appContext'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const AllProducts = () => {

  const context = useContext(AppContext)
  const {getProductBySubCat} = context
  const {id} = useParams()
  const [allProducts, setAllProducts] = useState([])

  useEffect(() => {
    const func = async ()=>{
    const products = await getProductBySubCat(id)
    console.log("sss",products)
    setAllProducts(products.products)
    }
    func()
  }, [id]);

  return (
    <div>
      
      <ImgViewer/>
      <div className="container my-5">
        <form className="d-flex justify-content-center">
          <div className="input-group" style={{maxWidth: "1500px", width: "100%"}}>
            <input 
              type="search" 
              className="form-control rounded-start" 
              placeholder="Search" 
              aria-label="Search"
              style={{borderRight: "0"}}/>
            <button 
              className="btn rounded-end" 
              style={{backgroundColor:'#FDACAC', color: 'white'}}
              type="submit">
              Search
            </button>
          </div>
          <button 
            type="button" 
            className="btn btn-outline-primary mx-4 heading-product d-flex align-items-center" 
            data-bs-toggle="modal" 
            data-bs-target="#staticBackdrop"
            style={{borderColor: '#FDACAC', color: '#FDACAC'}}>
            <i className="fa-solid fa-sliders me-2"></i> Filter
          </button>
        </form>
      </div>
      { allProducts?.length == 0 ? <div class="spinner-border my-4" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div> : 

      <div className='container mb-5'>
        <div className='row g-4 justify-content-start'>
          {allProducts?.map((product) => (
          <div className='col-12 col-md-6 col-lg-4'>
        
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={product.images[0].url} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>{product.productName}</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>Rs. {product.sizes[0].price}</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
  <p className="card-text text-muted small">
  {product.productDesc
    ?.replace(/<[^>]+>/g, "")   // remove HTML tags
    .slice(0, 80)}...
</p>
                <div className="d-flex gap-2 mt-auto">
  <button
    className="btn text-white flex-grow-1"
    style={{ backgroundColor: "#FDACAC" }}
  >
    <i className="fas fa-shopping-cart me-2"></i>
    Add to Cart
  </button>

    <Link to={`/product/${product._id}`}>
  <button className="btn btn-outline-secondary">
    <i className="fas fa-eye"></i>
  </button>
    </Link>
</div>
              </div>
            </div>
          </div>))}
          
          {/* <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C2} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Vanilla Dream Cake</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>$22.99</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <p className="card-text text-muted flex-grow-1 small">
                  Classic vanilla sponge with creamy buttercream. A timeless favorite.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn text-white flex-grow-1" style={{backgroundColor: '#FDACAC'}}>
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C3} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Strawberry Delight</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>$26.99</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <p className="card-text text-muted flex-grow-1 small">
                  Fresh strawberry cake with whipped cream and berry compote topping.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn text-white flex-grow-1" style={{backgroundColor: '#FDACAC'}}>
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C4} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Red Velvet Supreme</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>$28.99</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                  </div>
                </div>
                <p className="card-text text-muted flex-grow-1 small">
                  Luxurious red velvet with cream cheese frosting. Simply irresistible.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn text-white flex-grow-1" style={{backgroundColor: '#FDACAC'}}>
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C5} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Caramel Heaven Cake</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>$25.99</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                <p className="card-text text-muted flex-grow-1 small">
                  Moist layers with salted caramel drizzle. Sweet and savory perfection.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn text-white flex-grow-1" style={{backgroundColor: '#FDACAC'}}>
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=1050&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Lemon Bliss Cake</h5>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="h4 fw-bold mb-0" style={{color: '#FDACAC'}}>$23.99</span>
                  <div className="text-warning">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
                <p className="card-text text-muted flex-grow-1 small">
                  Light and zesty lemon cake with tangy glaze. Refreshingly delicious.
                </p>
                <div className="d-flex gap-2">
                  <button className="btn text-white flex-grow-1" style={{backgroundColor: '#FDACAC'}}>
                    <i className="fas fa-shopping-cart me-2"></i>Add to Cart
                  </button>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>}

      {/* Filter Modal */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border-0 shadow-lg rounded-4">
            
            <div 
              className="modal-header border-0 text-white py-3" 
              style={{background: 'linear-gradient(135deg, #FDACAC 0%, #fc9090 100%)'}}>
              <h5 className="modal-title fw-bold" id="staticBackdropLabel">Filter & Sort</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>

            <div className="modal-body p-4">
              
              {/* Sort By */}
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small mb-3 text-dark">Sort By</h6>
                <select className="form-control form-select form-select-lg border-2 rounded-3">
                  <option value="latest">Latest</option>
                  <option value="priceLowHigh">Price: Low to High</option>
                  <option value="priceHighLow">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small mb-3 text-dark">Price Range</h6>
                <div className="row g-2">
                  <div className="col-6">
                    <input type="number" className="form-control form-control-lg border-2 rounded-3" placeholder="Min Price" />
                  </div>
                  <div className="col-6">
                    <input type="number" className="form-control form-control-lg border-2 rounded-3" placeholder="Max Price" />
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small mb-3 text-dark">Category</h6>
                <div className="form-check mb-2 p-3 rounded-3 bg-light">
                  <input className="form-check-input" type="checkbox" id="cakes" />
                  <label className="form-check-label fw-medium" htmlFor="cakes">Cakes</label>
                </div>
                <div className="form-check mb-2 p-3 rounded-3 bg-light">
                  <input className="form-check-input" type="checkbox" id="shakes" />
                  <label className="form-check-label fw-medium" htmlFor="shakes">Shakes</label>
                </div>
                <div className="form-check mb-2 p-3 rounded-3 bg-light">
                  <input className="form-check-input" type="checkbox" id="desserts" />
                  <label className="form-check-label fw-medium" htmlFor="desserts">Desserts</label>
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-4">
                <h6 className="fw-bold text-uppercase small mb-3 text-dark">Minimum Rating</h6>
                <select className="form-control form-select form-select-lg border-2 rounded-3">
                  <option value="4">4★ & above</option>
                  <option value="3">3★ & above</option>
                  <option value="2">2★ & above</option>
                </select>
              </div>

              {/* Availability */}
              <div className="mb-2">
                <h6 className="fw-bold text-uppercase small mb-3 text-dark">Availability</h6>
                <div className="form-check p-3 rounded-3 bg-light">
                  <input className="form-check-input" type="checkbox" id="inStock" />
                  <label className="form-check-label fw-medium" htmlFor="inStock">In Stock Only</label>
                </div>
              </div>

            </div>

            <div className="modal-footer bg-light border-0 p-3 gap-2">
              <button 
                type="button" 
                className="btn btn-outline-secondary border-2 rounded-3 px-4 py-2">
                Reset Filters
              </button>
              <button 
                type="button" 
                className="btn text-white border-0 rounded-3 px-4 py-2 shadow" 
                style={{background: 'linear-gradient(135deg, #FDACAC 0%, #fc9090 100%)'}}
                data-bs-dismiss="modal">
                Apply Filters
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default AllProducts