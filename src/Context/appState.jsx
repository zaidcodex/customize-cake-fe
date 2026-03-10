import React, { useRef, useEffect } from 'react'
import AppContext from './appContext'
import { useState } from 'react'

const AppState = (props) => {
    const [helloworld, setHelloworld] = useState("Helloworld")
    const [content, setContent] = useState('');
    const [allCategories, setAllCategories] = useState([])
    const [allSubCategories, setAllSubCategories] = useState([])
    const [loading, setLoading] = useState(false)       // product/category operations
    const [cartItems, setCartItems] = useState([])
    const [orders, setOrders] = useState([]);
    const [globalLoader, setGlobalLoader] = useState(false)  // full-page / admin data fetches
    const [authToken, setAuthToken] = useState('')

    useEffect(() => {
        console.log(content)
    }, [content])

    // ── Auth ─────────────────────────────────────────────────────────────────
    const loggedIn = async (credentials) => {
        console.log('Login submitted:', credentials)
        setGlobalLoader(true)
        try {
            const res = await fetch("https://customize-cake-be-www.vercel.app/api/auth/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(credentials)
            })
            const data = await res.json()
            localStorage.setItem("authToken", data.authToken)
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setGlobalLoader(false)
        }
    }

    // ── Categories ───────────────────────────────────────────────────────────
    const createCategories = async (categoryName) => {
        setLoading(true)
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/category/create/', {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ categoryName })
            })
            const data = await res.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getCategories = async () => {
        setGlobalLoader(true)
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/category/get-categories/')
            const data = await res.json()
            if (data.success) {
                setAllCategories(data.categories)
                return data.categories
            }
        } catch (error) {
            console.log(error)
        } finally {
            setGlobalLoader(false)
        }
    }

    const deleteCategory = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/category/delete-category/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateCategories = async (id, newCategory) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/category/update/${id}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ newCategory })
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // ── Sub-Categories ───────────────────────────────────────────────────────
    const createSubCategories = async (subCategory) => {
        setLoading(true)
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/subcategory/create', {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(subCategory)
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const getSubCategories = async () => {
        setGlobalLoader(true)
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/subcategory/get-sub-categories/')
            const data = await res.json()
            if (data.success) {
                setAllSubCategories(data.subCategories)
                return data.subCategories
            }
        } catch (error) {
            console.log(error)
        } finally {
            setGlobalLoader(false)
        }
    }

    const deleteSubCategory = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/subcategory/delete-sub-category/${id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const updateSubCategories = async (id, newSubCategory) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/subcategory/update/${id}`, {
                method: "POST",
                headers: { 'Content-Type': "application/json" },
                body: JSON.stringify({ newSubCategory })
            })
            const data = await res.json()
            return data
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // ── Products ─────────────────────────────────────────────────────────────
    const createProducts = async (product) => {
        setLoading(true)
        try {
            const res = await fetch("https://customize-cake-be-www.vercel.app/api/product/create", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(product)
            })
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const updateProducts = async (id, newProduct) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/update/${id}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newProduct)
            })
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/delete/${id}`, {
                method: "DELETE"
            })
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const getProduct = async (id) => {
        setGlobalLoader(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-product/${id}`)
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setGlobalLoader(false)
        }
    }

    const getProductBySubCat = async (id) => {
        setGlobalLoader(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-product-by-subcat/${id}`)
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setGlobalLoader(false)
        }
    }

    const getAllProduct = async () => {
        setGlobalLoader(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-all-products`)
            const data = await res.json()
            return data
        } catch (err) {
            console.log(err)
        } finally {
            setGlobalLoader(false)
        }
    }

    // ── Orders ───────────────────────────────────────────────────────────────
    const getOrders = async () => {
        setGlobalLoader(true)
        try {
            const res = await fetch("https://customize-cake-be-www.vercel.app/api/order/", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            const data = await res.json()
            if (data.success) {
                setOrders(data.orders)
            } else {
                console.log("Failed to fetch orders")
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
        } finally {
            setGlobalLoader(false)
        }
    }

    const handlePlaceOrder = async (items, cartGrandTotal, checkoutData, clearCart) => {
        setGlobalLoader(true)
        try {
            const advanceAmount =
                checkoutData.paymentMethod === "ADVANCE"
                    ? Math.round(cartGrandTotal * 0.3)
                    : 0

            const remainingAmount =
                checkoutData.paymentMethod === "ADVANCE"
                    ? cartGrandTotal - advanceAmount
                    : cartGrandTotal

            const orderData = {
                customer: {
                    name: checkoutData.name,
                    phone: checkoutData.phone,
                    address: checkoutData.address,
                },
                items,
                totalAmount: cartGrandTotal,
                advanceAmount,
                remainingAmount,
                paymentMethod: checkoutData.paymentMethod,
                paymentScreenshotUrl:
                    checkoutData.paymentMethod === "ADVANCE"
                        ? checkoutData.paymentScreenshotUrl || null
                        : null,
                paymentStatus: checkoutData.paymentMethod === "ADVANCE" ? "Partial" : "Pending",
                orderStatus: "Pending",
                deliveryDate: checkoutData.deliveryDate,
            }

            const res = await fetch("https://customize-cake-be-www.vercel.app/api/order/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData),
            })
            const data = await res.json()

            if (data.success) {
                alert(`🎉 Order Placed! Tracking ID: ${data.order.trackingId}`)
                clearCart([])
            } else {
                alert(`❌ Failed to place order: ${data.message || "Unknown error"}`)
            }
        } catch (error) {
            console.error("Order placement error:", error)
            alert("❌ Something went wrong. Please try again.")
        } finally {
            setGlobalLoader(false)
        }
    }

    const updateOrderStatus = async (id, orderStatus) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/order/${id}/status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderStatus }),
            })
            const data = await res.json()
            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === id ? { ...o, orderStatus: data.order.orderStatus } : o))
                )
            } else {
                alert(`Failed to update order status: ${data.message}`)
            }
        } catch (err) {
            console.error("updateOrderStatus error:", err)
            alert("Something went wrong updating order status.")
        } finally {
            setLoading(false)
        }
    }

    const updatePaymentStatus = async (id, paymentStatus) => {
        setLoading(true)
        try {
            const res = await fetch(`https://customize-cake-be-www.vercel.app/api/order/${id}/payment-status`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ paymentStatus }),
            })
            const data = await res.json()
            if (data.success) {
                setOrders((prev) =>
                    prev.map((o) => (o._id === id ? { ...o, paymentStatus: data.order.paymentStatus } : o))
                )
            } else {
                alert(`Failed to update payment status: ${data.message}`)
            }
        } catch (err) {
            console.error("updatePaymentStatus error:", err)
            alert("Something went wrong updating payment status.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <AppContext.Provider value={{
            helloworld,
            // ── loaders ──
            loading, setLoading,           // mutation operations (create/update/delete)
            globalLoader, setGlobalLoader, // data fetching (get requests + place order)
            // ── auth ──
            loggedIn,
            authToken,
            // ── categories ──
            allCategories, setAllCategories,
            getCategories, createCategories, updateCategories, deleteCategory,
            // ── sub-categories ──
            allSubCategories, setAllSubCategories,
            getSubCategories, createSubCategories, updateSubCategories, deleteSubCategory,
            // ── products ──
            getProduct, getAllProduct, getProductBySubCat,
            createProducts, updateProducts, deleteProduct,
            // ── cart ──
            cartItems, setCartItems,
            // ── orders ──
            orders, setOrders,
            getOrders, handlePlaceOrder,
            updateOrderStatus, updatePaymentStatus,
            // ── misc ──
            content, setContent,
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppState