import React, { useRef, useEffect } from 'react'
import AppContext from './appContext'
import { useState } from 'react'

const AppState = (props) => {
    const [helloworld, setHelloworld] = useState("Helloworld")
    const [content, setContent] = useState('');
    const [allCategories, setAllCategories] = useState([])
    const [allSubCategories, setAllSubCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [authToken, setAuthToken] = useState('')

    useEffect(() => {
     console.log(content)
    }, [content])

    const generateTrackingId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};


    const loggedIn = async(credentials) =>{
        console.log('Login submitted:',credentials)
        try {
            const res = await fetch("https://customize-cake-be-www.vercel.app/api/auth/login",{
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify(credentials)
            })
            // setAuthToken(res.authToken)
            localStorage.setItem("authToken", res.authToken)
        } catch (error) {
            console.log(error)
        }
    }
    

const createCategories = async (categoryName)=>{
    try{
        const res = await fetch('https://customize-cake-be-www.vercel.app/api/category/create/',{
            method: "POST",
            headers:{
                'Content-Type': "Application/json"
            },
            body:JSON.stringify({categoryName})
        })
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(error){
    console.log(error)
        }
    }

    const getCategories = async ()=>{
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/category/get-categories/')
            const data = await res.json()
            if(data.success){
                setAllCategories(data.categories)
                console.log("cat",data.categories) 
                return data.categories
            }

        } catch (error) {
            console.log(error)
        }
    }


      const deleteCategory = async (id)=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/category/delete-category/${id}`,{
            method:'DELETE'
        })
        const data = await res.json()
        return data
    }
        catch(error){
            console.log(error)
        }


    }


    const updateCategories = async (id, newCategory)=>{
    try{
        const res = await fetch(`https://customize-cake-be-www.vercel.app/api/category/update/${id}`,{
            method: "POST",
            headers:{
                'Content-Type': "Application/json"
            },
            body:JSON.stringify({newCategory})
        })
        console.log(newCategory)
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(error){
    console.log(error)
        }
    }

    
    const createSubCategories = async (subCategory)=>{
        console.log(subCategory)
        try{
        const res = await fetch('https://customize-cake-be-www.vercel.app/api/subcategory/create', {
            method:'POST',
            headers:{
            "Content-type": "application/json",
            },
            body:JSON.stringify(subCategory)
        })
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(error){
        console.log(error)
    }

    }

     const getSubCategories = async ()=>{
        try {
            const res = await fetch('https://customize-cake-be-www.vercel.app/api/subcategory/get-sub-categories/')
            const data = await res.json()
            if(data.success){
                setAllSubCategories(data.subCategories)
                console.log("all sub category",data.subCategories) 
                return data.subCategories
            }

        } catch (error) {
            console.log(error)
        }
    }
    
  
    const deleteSubCategory = async (id)=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/subcategory/delete-sub-category/${id}`,{
            method:'DELETE'
        })
        const data = await res.json()
        return data
    }
        catch(error){
            console.log(error)
        }


    }


    const updateSubCategories = async (id, newSubCategory)=>{
    try{
        const res = await fetch(`https://customize-cake-be-www.vercel.app/api/subcategory/update/${id}`,{
            method: "POST",
            headers:{
                'Content-Type': "Application/json"
            },
            body:JSON.stringify({newSubCategory})
        })
        console.log(newSubCategory)
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(error){
    console.log(error)
        }
    }


    const createProducts = async (product)=>{
        setLoading(true)
        
        console.log("sending product: ", product)
       try{
         const res = await fetch("https://customize-cake-be-www.vercel.app/api/product/create", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body : JSON.stringify(product)
        })
        
        const data = await res.json()
        console.log("product: ", data)
        return data
    }
    catch(err){
        console.log(err)

    }
    finally{
        setLoading(false)
    }
    }


    const updateProducts = async (id, newProduct)=>{
        console.log("newp", newProduct)
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/update/${id}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body : JSON.stringify(newProduct)
        })
        const data = await res.json()
        return data
    }
    catch(err){
        console.log(err)

    }
    }


    const deleteProduct = async (id)=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/delete/${id}`, {
            method: "DELETE"
        })
        const data = await res.json()
        return data
    }
    catch(err){
        console.log(err)
    }
    }

    const getProduct = async (id)=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-product/${id}`)
        const data = await res.json()
        return data
    }
    catch(err){
        console.log(err)
    }
    }

    const getProductBySubCat = async (id)=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-product-by-subcat/${id}`)
        const data = await res.json()
        return data
    }
    catch(err){
        console.log(err)
    }
    }

    const getAllProduct = async ()=>{
       try{
         const res = await fetch(`https://customize-cake-be-www.vercel.app/api/product/get-all-products`)
        const data = await res.json()
        console.log(data)
        return data
    }
    catch(err){
        console.log(err)
    }
    }


   const handlePlaceOrder = async (
  cartItems,
  cartGrandTotal,
  checkoutData,
  clearCart
) => {
  try {
    const trackingId = generateTrackingId();

    const advanceAmount =
      checkoutData.paymentMethod === "ADVANCE"
        ? Math.round(cartGrandTotal * 0.3)
        : 0;

    const remainingAmount =
      checkoutData.paymentMethod === "ADVANCE"
        ? cartGrandTotal - advanceAmount
        : cartGrandTotal;

    const orderData = {
      trackingId,
      customer: {
        name: checkoutData.name,
        phone: checkoutData.phone,
        address: checkoutData.address
      },
      items: cartItems,
      totalAmount: cartGrandTotal,
      advanceAmount,
      remainingAmount,
      paymentMethod: checkoutData.paymentMethod,
      paymentStatus:
        checkoutData.paymentMethod === "ADVANCE"
          ? "Partial"
          : "Pending",
      orderStatus: "Pending",
      deliveryDate: checkoutData.deliveryDate
    };

    const res = await fetch(
      "https://customize-cake-be-www.vercel.app/api/orders/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      }
    );

    const data = await res.json();

    if (data.success) {
      alert(`🎉 Order Placed! Tracking ID: ${trackingId}`);
      clearCart([]);
    }
  } catch (error) {
    console.log(error);
  }
};


    return (
        <AppContext.Provider value={{helloworld, cartItems, handlePlaceOrder, setCartItems, getProductBySubCat, loggedIn, content, loading, setLoading, setContent, getProduct, deleteProduct, getAllProduct, updateProducts, createProducts, updateCategories, updateSubCategories, setAllSubCategories, setAllCategories, deleteSubCategory, allSubCategories, deleteCategory, getSubCategories, createCategories, getCategories, allCategories, createSubCategories}}>
            {props.children}
        </AppContext.Provider>
    )
}


export default AppState