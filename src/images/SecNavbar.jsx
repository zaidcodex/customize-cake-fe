import React from 'react'

const SecNavbar = () => {
  return (
    <div className='d-none d-lg-flex justify-content-around align-items-center' style={{backgroundColor:'#FFCDC9', height:'40px', boxShadow: '0 6px 12px -4px rgba(0, 0, 0, 0.35)', position: 'relative', zIndex: 10}}>
        <div className='d-flex'>
            <div className='d-flex align-items-center mx-4'>
                <i className="fa-solid fa-envelope mx-1" style={{fontSize:'22px'}}></i>
                <p className='mx-1 mb-0'>abc@gmail.com</p>
            </div>  
            <div className='d-flex align-items-center mx-4'>
                <i className="fa-solid fa-phone mx-1" style={{fontSize:'22px'}}></i>
                <p className='mx-1 mb-0'>+92-34232112</p>
            </div>
        </div>
        <div>
            <p className='mb-0'>Welcome to the Cake Shake</p>
        </div>
    </div>
  )
}

export default SecNavbar