import React, { useState, useEffect } from 'react'

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <img src="http://res.cloudinary.com/dyytzksdp/image/upload/v1767538460/apcdpwzr6wgwvbnjmf9b.png"  alt="Banner"
        className="w-100 rounded"
        style={{ height: '600px', objectFit: 'cover'}}/>
     <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '20px'
        }}
      >

        <div>
         <h1 className='mb-5'>CHOCOLATE CAKES</h1>
         
         {isMobile ? (
           // Mobile Layout
           <div className='d-flex flex-column align-items-center'>
             <div className='mb-3'>
               <img src="https://images.unsplash.com/photo-1706696628425-07811fc5d6f0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" style={{width: '200px', maxWidth: '100%'}}/>
             </div>
             <div className='p-3'>
               <h1>The cake</h1>
               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis cumque maiores voluptate repellendus reiciendis, hic pariatur debitis et quam nulla, illo sed obcaecati, modi officia fugit vel expedita adipisci eius ipsum. Unde, iure ab.</p>
             </div>
           </div>
         ) : (
           // Desktop Layout
           <div className='d-flex'>
             <div>
               <img src="https://images.unsplash.com/photo-1706696628425-07811fc5d6f0?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt=""  className='w-50'/>
             </div>
             <hr style={{ border: "1px solid #ffffffff", margin: "30px 0" }} />
             <div className='w-50 p-5 mx-4 my-5'>
               <h1>The cake</h1>
               <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis cumque maiores voluptate repellendus reiciendis, hic pariatur debitis et quam nulla, illo sed obcaecati, modi officia fugit vel expedita adipisci eius ipsum. Unde, iure ab.</p>
             </div>
             <div>

             </div>
           </div>
         )}
         
        </div>
      </div>
  
    </div>
  )
}

export default Banner