import React, {useContext, useEffect, useState} from 'react'
import AppContext from '../Context/appContext'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { Link } from 'react-router-dom/cjs/react-router-dom'

const Products = () => {
    const history = useHistory()
    const context = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const {getAllProduct} = context;

    const [allProducts, setAllProducts] = useState([])
    useEffect(() => {
            const fetchFunc = async()=>{
              setLoading(true)
             const products = await getAllProduct()
             console.log(products)
            setAllProducts(products.allProducts)
            setLoading(false)
        }
        fetchFunc()
    }, []);


    if(loading){
      return(
        <div>
        <h1>Products</h1>
        <div class="spinner-border my-4" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</div>
      )
    }

  return (
    <div>
      <h1>Products</h1>
      <div className='d-flex'>
        <div className="card d-flex flex-wrap mx-2" style={{width:'100%', border:'0px'}}>
  {allProducts?.map((product) => {
  return (
    <div
      key={product._id}
      className="card-body d-flex gap-3 align-items-start mb-3 p-3"
      style={{
        border: '1px solid #dee2e6',  // light gray border
        borderRadius: '8px',          // rounded corners
        backgroundColor: '#fff',      // optional, makes each card stand out
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          className='rounded'
          style={{ width: "80px", height: "100px", objectFit: "cover" }}
          src={product.images[0].url}
          alt="Card"
        />
      </div>

      <div className="flex-grow-1 text-start d-flex flex-column">
        <div className="flex-grow-1">
          <h5 className="card-title mb-2">{product.productName.slice(0, 20)}...</h5>
          <p className="card-text text-muted">
            {product.isAvailable 
              ? <span className="badge bg-success">Available</span> 
              : <span className="badge bg-danger">Unavailable</span>}
          </p>
        </div>

        <div className="mt-auto">
          <Link
            to={`/admin-dashboard/edit/product/${product._id}`}
            className="btn btn-primary btn-sm mt-2 px-3"
          >
            Edit
          </Link>
        </div>
      </div>

      <span className="badge rounded-pill bg-warning text-dark">Warning</span>
    </div>
  )
})}

</div>
</div>
    </div>
  )
}

export default Products