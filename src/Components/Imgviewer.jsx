import React from 'react'

const Imgviewer = () => {
  return (
    <div className='py-5' style={{backgroundColor: 'white', }}>
      <div className='container '>
        <div id="carouselExample" className="carousel slide " data-bs-ride="carousel" style={{height:'235px'}}>
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner rounded-4 shadow-lg">
            <div className="carousel-item active">
              <img src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?q=80&w=2070&auto=format&fit=crop" className="d-block w-100" alt="Dairy Products" style={{objectFit: 'cover', height:'275px'}}/>
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded-3 p-3">
                <h5 className='fw-bold'>First slide label</h5>
                <p>Some representative placeholder content for the first slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=2074&auto=format&fit=crop" className="d-block w-100" alt="Dairy Products" style={{objectFit: 'cover', height:'275px'}}/>
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded-3 p-3">
                <h5 className='fw-bold'>Second slide label</h5>
                <p>Some representative placeholder content for the second slide.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=2065&auto=format&fit=crop" className="d-block w-100" alt="Dairy Products" style={{ objectFit: 'cover', height:'275px'}}/>
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-75 rounded-3 p-3">
                <h5 className='fw-bold'>Third slide label</h5>
                <p>Some representative placeholder content for the third slide.</p>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev" >
            <span className="carousel-control-prev-icon p-4 rounded" aria-hidden="true" style={{backgroundColor:'#FFCDC9'}}></span>
            <span className="visually-hidden ">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon p-4 rounded" aria-hidden="true" style={{backgroundColor:'#FFCDC9'}}></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Imgviewer