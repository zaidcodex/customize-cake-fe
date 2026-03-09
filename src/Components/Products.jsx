import React from 'react'
import C1 from '../images/c1.png'
import C2 from '../images/c2.png'
import C3 from '../images/c3.jpg'
import C4 from '../images/c4.jpg'
import C5 from '../images/c5.jpg'

const Products = () => {
  return (
    <div className='py-5' style={{backgroundColor: '#f8f9fa', minHeight: '100vh'}}>
      <div className='container'>
        <div className='text-center mb-5'>
          <h2 className=' fw-bold mb-3' style={{color: '#FDACAC'}}>Featured Products</h2>
          <p className=' px-3 text-muted'>
            Discover our carefully curated selection of premium products designed to enhance your lifestyle. 
            Each item is chosen with quality and style in mind.
          </p>
        </div>
        
        <div className='row g-4 justify-content-center'>
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C1} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6 col-lg-4'>
            <div className="card h-100 shadow-lg border-0 rounded-3">
              <img 
                src={C2} 
                className="card-img-top" 
                alt="Product"
                style={{height: '250px', objectFit: 'cover'}}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
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
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
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
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
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
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
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
                <h5 className="card-title fw-bold" style={{color: '#FDACAC'}}>Premium Product</h5>
                <p className="card-text text-muted flex-grow-1">
                  Experience exceptional quality and design with this carefully crafted product that brings both style and functionality.
                </p>
                <a href="#" className="btn text-white w-100 mt-3" style={{backgroundColor: '#FDACAC'}}>Learn More</a>
              </div>
            </div>
          </div>
        </div>
         <button 
                className="heading-product  text-decoration-none mt-5" 
                to="loan-form" 
                role="button"
              >
                Start Your Application
              </button>
      </div>
    </div>
  )
}

export default Products