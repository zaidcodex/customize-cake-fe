import React, { useEffect, useState, useContext } from 'react'
import AppContext from '../Context/appContext'

const Categories = () => {
  const context = useContext(AppContext)
  const {createCategories, updateCategories, updateSubCategories, getCategories,setAllSubCategories, setAllCategories, deleteSubCategory, deleteCategory, allSubCategories, getSubCategories, allCategories, createSubCategories} = context;

  const [loading, setLoading] = useState(false)
  const [addCategoryModal, setAddCategoryModal] = useState(false)
  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false)
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false)
  const [editSubCategoryModal, setEditSubCategoryModal] = useState(false)
  const [editCategoryModal, setEditCategoryModal] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState(false)
  const [subCategoryId, setSubCategoryId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [subCategory, setSubCategory] = useState({
    metaTitle:'',
    metaDescription:'',
    subCategoryName:'',
    slug:''
  })

const func = async ()=>{
  setLoading(true)
  getSubCategories()
 const allCat = await getCategories();
 setLoading(false)
}
useEffect(() => {

func()
}, []);

useEffect(() => {
  console.log(subCategory)
}, [subCategory])





  const handelChangeCategoryName = (e)=>{
      setCategoryName(e.target.value)
}  

  const handelChangeSubCategory = (e)=>{
    const {name, value} = e.target
      setSubCategory(prevSubCategory =>{
          return {
            ...prevSubCategory,
            [name]: value
        }
      })
}  



const handleCreateCategory = async (categoryName)=>{
  const newCategory = await createCategories(categoryName)
  // console.log(req)
  if(newCategory.success == true){
      setAllCategories(categories => [...categories, newCategory.save]);
    console.log(newCategory.save)
  }
  setCategoryId('')
  setAddCategoryModal(false)
  
}

const handleCreateSubCategory = async (subCategory)=>{
   const payload = {
    ...subCategory,
    categoryId
  }
  // console.log(payload)
  const newSubCategory = await createSubCategories(payload)
  console.log(subCategory)
  if(newSubCategory.success == true){
    setAllSubCategories(subCategories=> [...subCategories, newSubCategory.save])
    console.log(newSubCategory.save)
  }
  setSubCategoryId('')
  setAddSubCategoryModal(false)
  
  
}



const handleDeleteCategory = async ()=>{
  // console.log(categoryId)
  const deletedCategory = await deleteCategory(categoryId)
  const newCategories = allCategories.filter(category=>category._id !== categoryId)
  setAllCategories(newCategories)
  setCategoryId('')
  setDeleteCategoryModal(false)
}

const handleDeleteSubCategory = async ()=>{
  // console.log(subCategoryId)
  const deletedSubCategory = await deleteSubCategory(subCategoryId)
  const newSubCategories = allSubCategories.filter(subCategory => subCategory._id !== subCategoryId)
  setAllSubCategories(newSubCategories)
  setDeleteSubCategoryModal(false)
}


const handleUpdateCategories = async () => {
  const updateCategory = await updateCategories(categoryId, categoryName);

  if (updateCategory.success) {
    setAllCategories(oldCategories =>
      oldCategories.map(category =>
        category._id === categoryId
          ? updateCategory.updateCategory // replace the old category with updated one
          : category
      )
    );
    // optional: reset editing states
    setEditCategoryModal(false);
    setCategoryId('');
    setCategoryName('');
  }
};

const EditSubCategoryData = async(subCategoryId)=>{
  setSubCategoryId(subCategoryId)
  const editSubCat = allSubCategories.filter(subCategory=> subCategory._id == subCategoryId)
  console.log(editSubCat)
  setSubCategory(editSubCat[0])
}

const handleEditSubCategory = async (id, subCat)=>{
  const updateSubCat = await updateSubCategories(id, subCat)
  if(updateSubCat.success){
    // console.log(updateSubCat)
    const newSubCat = allSubCategories.map(subCat=>
      subCat._id === id ? updateSubCat.updateSubCategory : subCat
    )
    console.log(newSubCat)
    setAllSubCategories(newSubCat)
  }
  setSubCategoryId('')
}


const toogleEditModal = ()=>{
  if(editCategoryModal){
    setEditCategoryModal(false)
    handleUpdateCategories()
    setCategoryName('')
  }
  else{
    setEditCategoryModal(true)
  }
}

  if(loading){
      return(
        <>
        <div className='d-flex justify-content-between '>
      <h3 className='py-2'>Categories </h3>
      <div className='py-2'>
      <button type="button" class="btn btn-primary" onClick={()=>{setAddCategoryModal(true); console.log(addCategoryModal)}}>+ Add Categories</button>
    </div>
    </div>
    <hr className='mx-4'/>
  <div class="spinner-border my-4" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>
</>
      )
    }

return (
    <>
    <div className='d-flex justify-content-between '>
      <h3 className='py-2'>Categories </h3>
      <div className='py-2'>
      <button type="button" class="btn btn-primary" onClick={()=>{setAddCategoryModal(true); console.log(addCategoryModal)}}>+ Add Categories</button>
    </div>
    </div>
    <hr className='mx-4'/>
    {loading && <div class="spinner-border my-4" style={{width: "3rem", height: "3rem"}} role="status">
  <span class="visually-hidden">Loading...</span>
</div>}
    <div className='d-flex mx-2'>
    <div className="card-body">
          <div className="row g-4">
             {allCategories.map((category)=>{
                   return (
            <div className="col-12 col-md-6">
              <div className='card h-100'>
                <div className="card-header bg-light d-flex justify-content-between">
 <h5>
  {editCategoryModal && categoryId === category._id ? (
    <input
    type="text" class="form-control"
      value={categoryName}
      onChange={handelChangeCategoryName}
      autoFocus
    />
  ) : (
    category.categoryName
  )}
</h5>


                  <div>
                  <button type="button" class="btn btn-sm me-1 btn-outline-primary" onClick={()=>{toogleEditModal(); setCategoryId(category._id); setCategoryName(category.categoryName)}}><i class="fa-solid fa-pen-to-square"></i></button>
                      <button type="button" class="btn btn-sm me-1 btn-outline-danger" onClick={()=>{setDeleteCategoryModal(true); setCategoryId(category._id)}}><i class="fa-solid fa-trash-can"></i></button>
                      </div>
                </div>
                <div className='card-body'>
                  <ul className='list-group '>
                    {allSubCategories.map((subCategory)=>{
                      if(category._id == subCategory.categoryId){
                      return(
                      <li className='list-group-item d-flex justify-content-between align-items-center '>
                      <span>{subCategory.subCategoryName}</span>
                      <div>
                      <button type="button" class="btn btn-sm me-1 btn-outline-primary" onClick={()=>{ setEditSubCategoryModal(true);EditSubCategoryData(subCategory._id)}}><i class="fa-solid fa-pen-to-square"></i></button>
                      <button type="button" class="btn btn-sm me-1 btn-outline-danger" onClick={()=>{setDeleteSubCategoryModal(true);setSubCategoryId(subCategory._id)}}><i class="fa-solid fa-trash-can"></i></button>
                      </div>
                    </li>)}
                    })
                    }
                      <button type="button" class="btn btn-sm mt-3 btn-primary" onClick={()=>{setAddSubCategoryModal(true);setCategoryId(category._id)}}>+ Add Sub Category</button>

                  </ul>
                </div>
              </div>

            </div>)})}
          </div>
    </div>
    </div>
    {addCategoryModal && (
      <>
      <div className="modal-backdrop fade show"></div>
      <div class="modal d-block" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setAddCategoryModal(false)}></button>
      </div>
      <div class="modal-body">
         {/* <label for="exampleFormControlInput1" class="form-label">Category Name:</label> */}
  <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Category Name" onChange={handelChangeCategoryName}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setAddCategoryModal(false)}>Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>{handleCreateCategory(categoryName)}}>Create Category</button>
      </div>
    </div>
  </div>
</div>
</>
)}

    {addSubCategoryModal && (
      <>
      <div className="modal-backdrop fade show"></div>
      <div class="modal d-block" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Add Sub Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setAddSubCategoryModal(false)}}></button>
      </div>
      <div class="modal-body">
         {/* <label for="exampleFormControlInput1" class="form-label">Category Name:</label> */}
  <input type="text" class="form-control my-2" id="metaTitle" name='metaTitle' placeholder="Meta Title" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" id="metaDescription" name='metaDescription' placeholder="Meta Description" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" id="subCategoryName" name='subCategoryName' placeholder="Sub Category Name" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" id="slug" name='slug' placeholder="Slug" onChange={handelChangeSubCategory}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setAddSubCategoryModal(false)}>Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>{handleCreateSubCategory(subCategory)}}>Create Sub Category</button>
      </div>
    </div>
  </div>
</div>
</>
)}
    {deleteCategoryModal && (
      <>
       <div className="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setDeleteCategoryModal(false)}}></button>
      </div>
      <div class="modal-body">
        <p>Are you sure, do you want to delete category?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setDeleteCategoryModal(false)}>No</button>
        <button type="button" class="btn btn-danger" onClick={()=>{handleDeleteCategory()}}>Yes</button>
      </div>
    </div>
  </div>
</div>
</>
)}
    {deleteSubCategoryModal && (
      <>
       <div className="modal-backdrop fade show"></div>
      <div class="modal fade show d-block" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Sub Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setDeleteSubCategoryModal(false)}}></button>
      </div>
      <div class="modal-body">
        <p>Are you sure, do you want to delete sub category?</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setDeleteSubCategoryModal(false)}>No</button>
        <button type="button" class="btn btn-danger" onClick={()=>{handleDeleteSubCategory()}}>Yes</button>
      </div>
    </div>
  </div>
</div>
</>
)}

{editSubCategoryModal && (
      <>
      <div className="modal-backdrop fade show"></div>
      <div class="modal d-block" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Edit Sub Category</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setEditSubCategoryModal(false)}}></button>
      </div>
      <div class="modal-body">
         {/* <label for="exampleFormControlInput1" class="form-label">Category Name:</label> */}
  <input type="text" class="form-control my-2" value={subCategory.metaTitle} id="metaTitle" name='metaTitle' placeholder="Meta Title" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" value={subCategory.metaDescription} id="metaDescription" name='metaDescription' placeholder="Meta Description" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" value={subCategory.subCategoryName} id="subCategoryName" name='subCategoryName' placeholder="Sub Category Name" onChange={handelChangeSubCategory}/>
  <input type="text" class="form-control my-2" value={subCategory.slug} id="slug" name='slug' placeholder="Slug" onChange={handelChangeSubCategory}/>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setEditSubCategoryModal(false)}>Close</button>
        <button type="button" class="btn btn-primary" onClick={()=>{handleEditSubCategory(subCategoryId, subCategory);setEditSubCategoryModal(false)}}>Update Sub Category</button>
      </div>
    </div>
  </div>
</div>
</>
)}
    </>
  )
}

export default Categories
