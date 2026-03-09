import React , {useContext, useEffect, useState}from 'react'
import logo from '../images/logo.png'
import {
  Link
} from "react-router-dom";
import AppContext from '../Context/appContext';

const Navbar = () => {

  const context = useContext(AppContext)
  const {getCategories, getSubCategories} = context

  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])

 useEffect(() => {
  const func = async () => {
    const cat = await getCategories()
    const subCat = await getSubCategories()

    setCategories(cat || [])
    setSubCategories(subCat || [])
  }
  func()
}, [])

  return (
    <>
  <nav className="py-2 navbar  w-90 p-3 navbar-expand-lg sticky-top "style={{ backgroundColor:'#FDACAC'}}>
  <div className= " container-fluid d-flex justify-content-between " style={{ width: '80%' }}>
    <Link className="navbar-brand me-3" to="/"><img className='' style={{ width: '60px' }} src={logo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav"  style={{ borderRadius: '8px', padding: '1rem' }}>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item mx-2">
          <Link className="nav-link active fs-5 fw-bold" aria-current="page" to="/">Home</Link>
        </li>

      {categories?.map((cat) => (
  <li key={cat._id} className="nav-item dropdown mx-2">

    <span
      className="nav-link fs-5 fw-bold dropdown-toggle"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      style={{ cursor: "pointer" }}
    >
      {cat.categoryName}
    </span>

    <ul className="dropdown-menu" style={{ backgroundColor: "#FDACAC" }}>

      {subCategories
        ?.filter((subCat) => subCat.categoryId === cat._id)
        .map((subCat) => (
          <li key={subCat._id}>
    <Link
  className="dropdown-item"
  to={`/${cat.categoryName.toLowerCase().replace(/\s+/g, '-')}${subCat.slug}/${subCat._id}`}
>
             {subCat.subCategoryName}
            </Link>
          </li>
        ))}

    </ul>
  </li>
))}

        <li className="nav-item mx-2">
          <Link className="nav-link fs-5 fw-bold" to="/about-us">About Us</Link>
        </li>
        <li className="nav-item mx-2">
          <Link className="nav-link fs-5 fw-bold" to="/contact-us">Contact US</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>

    </>
  )
}

export default Navbar
