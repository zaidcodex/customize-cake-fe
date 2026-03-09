import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
} from "react-router-dom";

const AdminLinks = ({mobile}) => {
        const location = useLocation();
    
    return (
        <>
            <li  data-bs-dismiss={mobile&&"offcanvas"} className="nav-item w-100 py-2">
                <Link
               
                    to="/admin-dashboard/add-products"
                    className={`customlinks nav-link ${location.pathname === "/admin-dashboard/add-products" ? "active" : ""}`}
                >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 text-light">Add Products</span>
                </Link>
            </li>

            <li  data-bs-dismiss={mobile&&"offcanvas"} className="nav-item w-100 py-2">
                <Link
                    to="/admin-dashboard/view-products"
                    className={`customlinks nav-link ${location.pathname.startsWith("/admin-dashboard/view-products") ? "active" : ""}`}
                >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 text-light">View Products</span>
                </Link>
            </li>
            <li  data-bs-dismiss={mobile&&"offcanvas"} className="nav-item w-100 py-2">
                <Link
              
                    to="/admin-dashboard/categories"
                    className={`customlinks nav-link ${location.pathname.startsWith("/admin-dashboard/categories") ? "active" : ""}`}
                >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 text-light">Categories</span>
                </Link>
            </li>
            <li  data-bs-dismiss={mobile&&"offcanvas"} className="nav-item w-100 py-2">
                <Link
              
                    to="/admin-dashboard/orders"
                    className={`customlinks nav-link ${location.pathname.startsWith("/admin-dashboard/orders") ? "active" : ""}`}
                >
                    <i className="fs-4 bi-house"></i>{" "}
                    <span className="ms-1 text-light">Orders</span>
                </Link>
            </li>
            
     
        </>
    )
}

export default AdminLinks