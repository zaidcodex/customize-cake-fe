import React from 'react'

const OrderDesignerCakes = () => {
  const cakeCategories = [
    {
      title: 'Birthday',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Anniversary',
      image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Wedding',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Mehndi',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'EID',
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Hajj / Umrah',
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Bride to be',
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Gender Reveal',
      image: 'https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: 'Every day is a Love day',
      image: 'https://images.unsplash.com/photo-1730215113554-8d6917731764?q=80&w=1164&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: "Mother's Day",
      image: 'https://i.pinimg.com/736x/9a/2f/9b/9a2f9b966db61d21373da36012bc49bb.jpg'
    },
    {
      title: "Father's Day",
      image: 'https://images.unsplash.com/photo-1557925923-cd4648e211a0?q=80&w=800&auto=format&fit=crop'
    },
    {
      title: "Women's Day",
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop'
    }
  ]

  return (
    <div className='py-5' style={{backgroundColor: '#ffff'}}>
      <div className='container'>
        <div className='text-center mb-5'>
          <h2 className='fw-bold mb-2' style={{color: '#FDACAC', letterSpacing: '2px'}}>ORDER DESIGNER CAKES</h2>
          <p className='text-muted text-uppercase' style={{fontSize: '14px', letterSpacing: '1px'}}>BY OCCASION</p>
        </div>

        <div className='row g-4'>
          {cakeCategories.map((category, index) => (
            <div key={index} className='col-6 col-md-4 col-lg-3'>
              <div className='card border-0 shadow-sm h-100 overflow-hidden' style={{cursor: 'pointer', transition: 'transform 0.3s ease', borderRadius: '15px'}}>
                <div className='position-relative' style={{height: '200px'}}>
                  <img 
                    src={category.image} 
                    className='card-img-top w-100 h-100' 
                    alt={category.title}
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className='card-body text-center py-3' style={{backgroundColor: '#fff'}}>
                  <h6 className='card-title mb-0 fw-bold' style={{fontSize: '15px', color: '#FDACAC'}}>{category.title}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .card:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </div>
  )
}

export default OrderDesignerCakes