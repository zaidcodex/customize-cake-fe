import React from 'react'

const Typesofcake = () => {
  const hoverStyle = `
    .zoom-hover {
      transition: transform 0.3s ease;
    }
    .zoom-hover:hover img {
      transform: scale(1.1);
    }
    .zoom-hover img {
      transition: transform 0.3s ease;
    }
  `;

  return (
    <div className='py-5' style={{backgroundColor: '#f8f9fa'}}>
      <style>{hoverStyle}</style>
      <div className='container'>
        <div className='text-center mb-5'>
          <h2 className='fw-bold mb-3' style={{color: '#FDACAC'}}>Our Special Collections</h2>
          <p className='text-muted'>Explore our handcrafted gift boxes, bouquets, and sweet treats</p>
        </div>
        
        <div className='row g-4'>
          <div className='col-12 col-md-6'>
            <div className='position-relative overflow-hidden rounded-4 shadow-lg zoom-hover' style={{height: '400px', cursor: 'pointer'}}>
              <img 
                src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=2070&auto=format&fit=crop" 
                className='w-100 h-100' 
                alt="Flower Bouquet & Boxes"
                style={{objectFit: 'cover'}}
              />
              <div className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <h3 className='display-6 fw-light mb-0' style={{fontStyle: 'italic', color: '#fff'}}>Flower</h3>
                <h2 className='display-4 fw-bold text-uppercase' style={{color: '#FDACAC', letterSpacing: '2px'}}>BOUQUET & BOXES</h2>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6'>
            <div className='position-relative overflow-hidden rounded-4 shadow-lg zoom-hover' style={{height: '400px', cursor: 'pointer'}}>
              <img 
                src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=2071&auto=format&fit=crop" 
                className='w-100 h-100' 
                alt="Chocolate Baskets"
                style={{objectFit: 'cover'}}
              />
              <div className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <h3 className='display-6 fw-light mb-0' style={{fontStyle: 'italic', color: '#fff'}}>Chocolate</h3>
                <h2 className='display-4 fw-bold text-uppercase' style={{color: '#FDACAC', letterSpacing: '2px'}}>BASKETS</h2>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6'>
            <div className='position-relative overflow-hidden rounded-4 shadow-lg zoom-hover' style={{height: '400px', cursor: 'pointer'}}>
              <img 
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=2074&auto=format&fit=crop" 
                className='w-100 h-100' 
                alt="Gift Boxes"
                style={{objectFit: 'cover'}}
              />
              <div className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <h3 className='display-6 fw-light mb-0' style={{fontStyle: 'italic', color: '#fff'}}>Gift</h3>
                <h2 className='display-4 fw-bold text-uppercase' style={{color: '#FDACAC', letterSpacing: '2px'}}>BOXES</h2>
              </div>
            </div>
          </div>
          
          <div className='col-12 col-md-6'>
            <div className='position-relative overflow-hidden rounded-4 shadow-lg zoom-hover' style={{height: '400px', cursor: 'pointer'}}>
              <img 
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2089&auto=format&fit=crop" 
                className='w-100 h-100' 
                alt="Theme Dessert Platter"
                style={{objectFit: 'cover'}}
              />
              <div className='position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white' style={{backgroundColor: 'rgba(0,0,0,0.4)'}}>
                <h3 className='display-6 fw-light mb-0' style={{fontStyle: 'italic', color: '#fff'}}>Theme</h3>
                <h2 className='display-4 fw-bold text-uppercase' style={{color: '#FDACAC', letterSpacing: '2px'}}>DESSERT</h2>
                <h3 className='display-6 fw-light mt-0' style={{fontStyle: 'italic', color: '#fff'}}>platter</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Typesofcake