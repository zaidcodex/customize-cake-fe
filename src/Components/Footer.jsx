import React from 'react'

const Footer = () => {
  return (
    <footer className='text-white pt-5 pb-4 text-start' style={{backgroundColor: '#FDACAC'}}>
      <div className='container'>
        <div className='row g-4'>
          <div className='col-12 col-md-6 col-lg-3'>
            <h5 className='fw-bold mb-3'>About Us</h5>
            <p className='text-white-50'>
              We create beautiful gift boxes, flower bouquets, and themed desserts to make your special moments memorable.
            </p>
          </div>
          
          <div className='col-12 col-md-6 col-lg-3'>
            <h5 className='fw-bold mb-3'>Quick Links</h5>
            <ul className='list-unstyled'>
              <li className='mb-2'>
                <a href='#' className='text-white text-decoration-none'>Home</a>
              </li>
              <li className='mb-2'>
                <a href='#' className='text-white text-decoration-none'>Products</a>
              </li>
              <li className='mb-2'>
                <a href='#' className='text-white text-decoration-none'>About</a>
              </li>
              <li className='mb-2'>
                <a href='#' className='text-white text-decoration-none'>Contact</a>
              </li>
            </ul>
          </div>
          
          <div className='col-12 col-md-6 col-lg-3'>
            <h5 className='fw-bold mb-3'>Contact Info</h5>
            <ul className='list-unstyled text-white-50'>
              <li className='mb-2'>
                <i className='bi bi-geo-alt-fill me-2'></i>
                123 Main Street, Karachi
              </li>
              <li className='mb-2'>
                <i className='bi bi-telephone-fill me-2'></i>
                +92 300 1234567
              </li>
              <li className='mb-2'>
                <i className='bi bi-envelope-fill me-2'></i>
                info@example.com
              </li>
            </ul>
          </div>
          
          <div className='col-12 col-md-6 col-lg-3'>
            <h5 className='fw-bold mb-3'>Follow Us</h5>
            <div className='d-flex gap-3'>
              <a href='#' className='text-white fs-4'>
                <i className='bi bi-facebook'></i>
              </a>
              <a href='#' className='text-white fs-4'>
                <i className='bi bi-instagram'></i>
              </a>
              <a href='#' className='text-white fs-4'>
                <i className='bi bi-twitter'></i>
              </a>
              <a href='#' className='text-white fs-4'>
                <i className='bi bi-whatsapp'></i>
              </a>
            </div>
          </div>
        </div>
        
        <hr className='my-4 bg-white opacity-25'/>
        
        <div className='row'>
          <div className='col-12 text-center'>
            <p className='mb-0 text-white-50'>
              &copy; 2026 Your Company. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer