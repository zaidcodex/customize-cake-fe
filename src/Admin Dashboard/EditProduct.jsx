
import React, { useState, useEffect, useContext } from 'react'
import AppContext from '../Context/appContext'
import Jodit from '../Components/Jodit'
import ImgCrop from "../Components/ImgCrop"
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const EditProduct = () => {
    const history = useHistory()
    const context = useContext(AppContext)
  const {content, setContent, updateProducts, createProducts, deleteProduct, getCategories, getSubCategories, getProduct} = context;



    const [uploadImgModal, setUploadImgModal] = useState(false)
    const [yourImage, setYourImage] = useState("")
    const [croppedImage, setCroppedImage] = useState(null);
    const [size, setSize] = useState([]); 
const [currentSize, setCurrentSize] = useState("");
const [currentPrice, setCurrentPrice] = useState("");
const [sizeType, setSizeType] = useState("");

    const [flavoursInp, setFlavoursInp] = useState(false);
    const [flavours, setFlavours] = useState([]);
    const [flavoursVal, setFlavoursVal] = useState("");
    const [shapes, setShapes] = useState([]);
    const [shapesVal, setShapesVal] = useState("");
    const [croppedImageUrls, setCroppedImageUrls] = useState([]);
    const [isEnabled, setIsEnabled] = useState(true);
    const [isAvailable, setIsAvailable] = useState(true);
    const [categories, setCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [categoryId, setCategoryId] = useState("")
    const [subCategoryId, setSubCategoryId] = useState("")
    const [delProductModal, setDelProductModal] = useState(false)

    const [fetchProduct, setFetchProduct] = useState({})

    const [productData, setProductData] = useState({
        productName: "",
        productDesc: content,
        metaTitle: "",
        metaDesc:"",
        images: croppedImageUrls,
        sizes: size,
        flavours:flavours,
        shapes:shapes,
        eggType:"",
        customMessageAllowed:isEnabled,
        isAvailable:isAvailable,
        preparationTime:''
    })

    const {slug} = useParams();
    
    useEffect(() => {
  const fetchData = async () => {
    const product = await getProduct(slug)
    console.log("pro",product)
    setProductData(product.product)
    setFetchProduct(product.product)
    setCroppedImageUrls(product.product.images)
    setSize(product.product.sizes)
    setFlavours(product.product.flavours)
    setShapes(product.product.shapes)
    setIsEnabled(product.product.customMessageAllowed)
    setIsAvailable(product.product.isAvailable)
    setContent(product.product.productDesc)


    const subCats = await getSubCategories();
    setSubCategories(Array.isArray(subCats) ? subCats : []);
    console.log("edit page subcat",subCats)
    
    const cats = await getCategories();
    setCategories(Array.isArray(cats) ? cats : []);
    console.log("edit page cat",cats)
  };

  fetchData();
}, []);


     useEffect(() => {
  setProductData(prev => ({
    ...prev,
    productDesc: content,
    flavours,
    shapes,
    images: croppedImageUrls,
    customMessageAllowed: isEnabled,
    isAvailable,
    sizes: size,
  }));
}, [content, flavours, shapes, croppedImageUrls, isEnabled, isAvailable, size]);







    const handleChange = (e)=>{
        const {name, value} = e.target;
        setProductData(prev=>{
            return{
            ...prev,
            [name]: value
            }
        })
}

const handleChangeShapes = (e)=>{
    setShapesVal(e.target.value)
}

    const handleAddShapes = (shape)=>{
        setShapes(prev => {
           return [
            ...prev,
            shape
           ]
        })
        console.log(productData)
    }

    const handleDelShape = (shape)=>{
        const filterShapes = shapes.filter((sh)=>shape!==sh)
        setShapes(filterShapes)
    }

    
const handleChangeFlavour = (e)=>{
    setFlavoursVal(e.target.value)
}

    const handleAddFlavours = (flavor)=>{
        setFlavours(prev => {
           return [
            ...prev,
            flavor
           ]
        })
    }

    const handleDelFlavours = (flavor)=>{
        const filterFlavour = flavours.filter((fl)=>flavor!==fl)
        setFlavours(filterFlavour)
    }

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setYourImage(URL.createObjectURL(file)); // preview for crop
};

const isFormValid = () => {
  const {
    categoryId,
    subCategoryId,
    productName,
    productDesc,
    metaTitle,
    metaDesc,
    images
  } = productData;

  return (
    categoryId &&
    subCategoryId &&
    productName?.trim() &&
    productDesc?.trim() &&
    metaTitle?.trim() &&
    metaDesc?.trim() &&
    images?.length > 0
  );
};



const handleSubmit = async () => {
  setProductData(prev=> {
    return{
        ...prev,
        categoryId,
        subCategoryId,
         productDesc: content,
         images: croppedImageUrls,
         flavours:flavours,
    shapes:shapes,
    customMessageAllowed:isEnabled,
        isAvailable:isAvailable,
        sizes: size,
    }
  })
  
  console.log(productData);
  const res = await updateProducts(slug, productData)
 if (res.success) {
  setProductData(res.updatedProduct)
  setCategoryId(res.updatedProduct.categoryId)
  setSubCategoryId(res.updatedProduct.subCategoryId)
}

// const res = {success:true}
//   if(res.success){
//     setContent("")
//     setSize([])
//     setFlavours([])
//     setShapes([])
//     setCategoryId("")
//     setSubCategoryId("")
//     setCroppedImageUrls([])
//     setProductData({ productName: "",
//         productDesc: content,
//         metaTitle: "",
//         metaDesc:"",
//         images: croppedImageUrls,
//         sizes: size,
//         flavours:flavours,
//         shapes:shapes,
//         eggType:"",
//         customMessageAllowed:isEnabled,
//         isAvailable:isAvailable,
//         preparationTime:''})
//   }
};

const handleAddSize = () => {
  if (!currentSize || !currentPrice) return;

  setSize(prev => [
    ...prev,
    {
      size: Number(currentSize),
      price: Number(currentPrice)
    }
  ]);

  setCurrentSize("");
  setCurrentPrice("");
  setSizeType("");
};


const handleRemoveImg = (imgId)=>{
  const removingImg = croppedImageUrls.filter((imgUrls)=>imgId!==imgUrls.url)
  setCroppedImageUrls(removingImg)
}




const handleDeleteProduct = async (id)=>{
    const delProduct = await deleteProduct(id)
    if(delProduct.success){
    history.push("/admin-dashboard/view-products")
}
}





    const uploadToCloudinary = async (croppedBlob) => {
  const formData = new FormData();
  formData.append("file", croppedBlob);
  formData.append("upload_preset", "customize-cake");
  formData.append("cloud_name", "drdk4hrkn");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/drdk4hrkn/image/upload",
    {
      method: "POST",
      body: formData
    }
  );
const data = await res.json();
  console.log("Cloudinary URL:", data.secure_url);
  setCroppedImageUrls(prev => [
  ...prev,
  {
    url: data.secure_url,
    public_id: data.public_id
  }
]);

   return data.secure_url;
};


  return (
    <>
        <h1 className='' style={{fontFamily:'revert-layer'}}>Edit Product</h1>
       <div class="m-3">
        <h2 className="text-start">Meta Details</h2>
    <input type="text" value={productData.metaTitle} class="form-control p-2 mb-3" placeholder='Enter Meta Title' name='metaTitle' onChange={handleChange}/>
    <input type="text" value={productData.metaDesc} class="form-control p-2" placeholder='Enter Meta Description' name='metaDesc' onChange={handleChange}/>
        <h2 className="text-start my-3">Product Details</h2>
<select className="form-select my-2" 
 value={productData?.categoryId}   
onChange={(e)=>{setCategoryId(e.target.value)}}
>
  <option value="">Select Category</option>
  {categories  && categories.map((category)=>{return(<option value={category._id}>{category.categoryName}</option>)})}
  {/* <option value="2">2 Pound</option>
  <option value="custom">Custom</option> */}
</select>

<select className="form-select my-2" value={productData?.subCategoryId}
 onChange={(e)=>{setSubCategoryId(e.target.value)}}
  > <option value="">Select Sub Category</option> 
  {subCategories && subCategories.map((subCategory)=>{
     if(subCategory.categoryId == productData.categoryId){ return( 
     <option value={subCategory._id}>{subCategory.subCategoryName}</option> 
     ) } })} {/* <option value="2">2 Pound</option> <option value="custom">Custom</option> */} 
     </select>

    <input type="text" name='productName' value={productData.productName} class="form-control p-2 mb-3" placeholder='Enter Product Name' onChange={handleChange}/>
    <Jodit className="text-start"  name="productDesc" placeholder={"Enter Product Details"} onChange={handleChange}/>
    <div className="my-3 d-flex flex-column align-items-start">
  <button
    type="button"
    className="btn btn-outline-secondary mb-2"
    onClick={()=>{setUploadImgModal(true)}}
  >
    Upload Image
  </button>

<div className='d-flex m-1'>
  {croppedImageUrls.map((img, )=>{return(<div style={{position:'relative', display:'inline-block'}}>
  <img className='rounded mx-1' src={img.url} alt="Image" style={{display:'block', height:'180px', maxWidth:'500px'}} />
  <button onClick={()=>handleRemoveImg(img.url)} style={{position:'absolute', top:'5px', right:'5px', background:'red', color:'white', border:'none', borderRadius:'50%', width:'25px', height:'25px', cursor:'pointer', fontSize:'16px', lineHeight:'1'}}>×</button>
</div> )})}
</div>
  
</div >

<div className="d-flex align-items-start my-3">
  {size.map((s, i) => {
    return (
      <div
        key={i}
        className="d-flex align-items-center px-3 py-2 rounded mx-1"
        style={{ backgroundColor: "#e8e8e8" }}
      >
        <span style={{ fontSize: "16px", color: "#333" }}>
          {s.size} lb — Rs {s.price}
        </span>

        <button
          onClick={() =>
            setSize(prev => prev.filter((_, idx) => idx !== i))
          }
          className="d-flex align-items-center justify-content-center"
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "0",
            width: "24px",
            height: "24px",
            fontSize: "20px",
            color: "#666",
            transition: "color 0.2s",
            fontWeight: "500",
            marginLeft: "6px"
          }}
          onMouseEnter={(e) => (e.target.style.color = "#000")}
          onMouseLeave={(e) => (e.target.style.color = "#666")}
        >
          ×
        </button>
      </div>
    );
  })}
</div>


<select
  className="form-select"
  value={sizeType}
  onChange={(e) => {
    const val = e.target.value;
    setSizeType(val);

    if (val !== "custom") {
      setCurrentSize(val);
    } else {
      setCurrentSize("");
    }
  }}
>
  <option value="">Select size</option>
  <option value="1">1 Pound</option>
  <option value="2">2 Pound</option>
  <option value="custom">Custom</option>
</select>


{sizeType === "custom" && (
  <input
    type="number"
    step="0.1"
    className="form-control mt-2"
    placeholder="Enter size (lb)"
    value={currentSize}
    onChange={(e) => setCurrentSize(e.target.value)}
  />
)}
<div className="d-flex my-3">
  <input
    type="number"
    className="form-control mb-2"
    placeholder="Enter price"
    value={currentPrice}
    onChange={(e) => setCurrentPrice(e.target.value)}
  />

  <button
    disabled={currentPrice === "" || currentSize === ""}
    type="button"
    className="btn btn-outline-primary fw-bold mb-2 mx-2"
    onClick={handleAddSize}
  >
    Save
  </button>
</div>






<h3 className='text-start mt-4'>Available Flavours</h3>

<div className='d-flex flex-column align-items-start '>
<div className='d-flex align-items-center justify-content-center mb-3'>
   
    {flavours.map((flavor, i)=>{
        return(<div key={i} className='d-flex align-items-center px-3 py-2 rounded mx-1' 
         style={{backgroundColor: '#e8e8e8'}}>
        <span style={{fontSize: '16px', color: '#333'}}>{flavor}</span>
        <button 
        onClick={()=>{handleDelFlavours(flavor)}}
            className='d-flex align-items-center justify-content-center' 
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px',
                fontSize: '20px',
                color: '#666',
                transition: 'color 0.2s',
                fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.color = '#000'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
        >
            ×
        </button>
    </div>
    )})
}
</div>
<div className='d-flex'>
{flavoursInp && (
    <>
  <input
    type="text"
    // step="0.1"
    className="form-control mb-2"
    placeholder="Enter Flavours"
    value={flavoursVal}
    style={{borderRight: '0px', borderTopRightRadius:'0px',  borderBottomRightRadius:'0px'}}
    onChange={handleChangeFlavour}
    />
    <button type="button" class="btn btn-outline-danger fw-bold mb-2" style={{borderTopLeftRadius:'0px',  borderBottomLeftRadius:'0px'}} onClick={()=>{setFlavoursInp(false);setFlavoursVal("")}}>x</button>
    <button disabled={flavoursVal==""} type="button" class="btn btn-outline-primary fw-bold mb-2 mx-2" onClick={()=>{setFlavoursInp(false);handleAddFlavours(flavoursVal); setFlavoursVal("")}}>Save</button>
    </>
)}
</div>
</div>
<div className='d-flex flex-column align-items-start'>
<button type="button" class="btn btn-outline-secondary  fw-bold " onClick={()=>{setFlavoursInp(true)}}>Add Flavours +</button>
  </div>



<h3 className='text-start mt-4'>Shapes</h3>
<div className='d-flex align-items-start  my-3 '>
 {shapes.map((shape, i)=>{
        return(<div key={i} className='d-flex align-items-center px-3 py-2 rounded mx-1' 
         style={{backgroundColor: '#e8e8e8'}}>
        <span style={{fontSize: '16px', color: '#333'}}>{shape}</span>
        <button 
        onClick={()=>{handleDelShape(shape)}}
            className='d-flex align-items-center justify-content-center' 
            style={{
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                width: '24px',
                height: '24px',
                fontSize: '20px',
                color: '#666',
                transition: 'color 0.2s',
                fontWeight: '500'
            }}
            onMouseEnter={(e) => e.target.style.color = '#000'}
            onMouseLeave={(e) => e.target.style.color = '#666'}
        >
            ×
        </button>
    </div>
    )})
}
</div>
<div className='d-flex my-3'>
  <input
    type="text"
    // step="0.1"
    className="form-control mb-2"
    placeholder="Enter Shapes"
    // style={{borderRight: '0px', borderTopRightRadius:'0px',  borderBottomRightRadius:'0px'}}
    onChange={handleChangeShapes}
    />
    <button disabled={shapesVal==""} type="button" class="btn btn-outline-primary fw-bold mb-2 mx-2" onClick={()=>{handleAddShapes(shapesVal)}}>Save</button>

  </div>

    <h3 className='text-start mt-4'>Cake Type</h3>
  <div className='d-flex align-items-start  my-3 '>
  <div className="form-check mx-2">
  <input
    className="form-check-input"
    type="radio"
    name="eggType"
    value="egg"
    checked={productData.eggType === 'egg'}
    onChange={handleChange}
    id="egg"
  />
  <label className="form-check-label" htmlFor="egg">
    Egg
  </label>
</div>

<div className="form-check mx-2">
  <input
    className="form-check-input"
    type="radio"
    name="eggType"
    value="eggless"
    checked={productData.eggType === 'eggless'}
    onChange={handleChange}
    id="eggless"
  />
  <label className="form-check-label" htmlFor="eggless">
    Eggless
  </label>
</div>
</div>
<div>

     <div className="d-flex align-items-center my-3 gap-2">
      {/* Label first */}
      <label
        className="form-check-label mx-2"
        htmlFor="flexSwitchCheckDefault"
      >
        Custom message allowed: 
      </label>

      {/* Switch */}
      <div className="form-check form-switch">
        <input
          className="form-check-input big-switch "
          style={{fontSize:'18px'}}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isEnabled}
          onChange={(e) => setIsEnabled(e.target.checked)}
        />
      </div>

      {/* Just to show value */}
      {/* <span>{String(isEnabled)}</span> */}
    </div>


     <div className="d-flex align-items-center my-3 gap-2">
      {/* Label first */}
      <label
        className="form-check-label mx-2"
        htmlFor="flexSwitchCheckDefault"
      >
        Available:
      </label>

      {/* Switch */}
      <div className="form-check form-switch">
        <input
          className="form-check-input big-switch "
          style={{fontSize:'18px'}}
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </div>

      {/* Just to show value */}
      {/* <span>{String(isAvailable)}</span> */}
    </div>
</div>

<div className='d-flex'>
    <input name='preparationTime' type="number" value={productData.preparationTime} class="form-control p-2" placeholder='Enter Preparation Time' onChange={handleChange}/>
    <span className='justify-content-center align-item-center m-2'>hours</span>
</div>

<div className='d-flex justify-content-between'>
<button type="button" class="btn btn-danger my-4 float-end px-3" onClick={()=>setDelProductModal(true)}>Delete Product</button>
<button type="button" disabled={!isFormValid()}  class="btn btn-primary my-4 float-end px-3" onClick={handleSubmit}>Update Product</button>
</div>

  </div>
  



  {uploadImgModal&&  <>
       <div className="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Upload Image</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setUploadImgModal(false)}}></button>
      </div>
     <div className="modal-body p-0">
  <div className="crop-container">
    <ImgCrop yourImage={yourImage}  onCropDone={setCroppedImage} />
  </div>
</div>
      <div class="modal-footer d-flex  align-items-start">
        <input
  className="form-control text-start"
  style={{ width: "22%" }}
  type="file"
  accept="image/*"
  onChange={handleFileChange}
/>
        <button type="button" class="btn btn-primary" onClick={ async ()=>{ await uploadToCloudinary(croppedImage); setUploadImgModal(false)}} >Upload</button>
      </div>
    </div> 
  </div>
</div>
</>}



{delProductModal && (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal fade show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delete Product</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setDelProductModal(false)}
            ></button>
          </div>
          <div className="modal-body py-3">
            <p>Are you sure, do you want to delete this product?</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setDelProductModal(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={()=>{handleDeleteProduct(slug)}} // Call your delete function here
            >
              Delete Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}

  


    </>
  )
}

export default EditProduct
