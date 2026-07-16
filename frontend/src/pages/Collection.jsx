 import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
 import Title from '../components/Title';
import ProductItems from '../components/ProductItems';
 const Collection = () => {
  const {products,search,showSearch}=useContext(ShopContext);
  const [showfilter,setShowfilter] = useState(false)
  const [filterProduct,setFilterProduct]=useState([]);
  const [category,setCategory] = useState([])
  const [subCategory,setSubCategory]=useState([])
  const[sortType,setSortType]=useState('relavant')


  const toggleCategory = (e)=> {
    
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }
  }

  const toggleSubCategory =(e)=>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }

    else{
       setSubCategory(prev => [...prev,e.target.value])
    }
  }

const applyfilter =()=> {
  let productsCopy = products.slice();
  if (category.length >0){
    productsCopy=productsCopy.filter(item => category.includes(item.category));

  }
if (showSearch && search){
  productsCopy = productsCopy.filter(item=> item.name.toLowerCase().includes(search.toLowerCase()))

}
  if (subCategory.length >0){
    productsCopy=productsCopy.filter(item => subCategory.includes(item.subCategory));

  }
  

  setFilterProduct(productsCopy)
}


const sortProduct =()=>{

  let fpCopy = filterProduct.slice();

  switch(sortType){
    case 'low-high':
      setFilterProduct(fpCopy.sort((a,b)=>(a.price-b.price)));
      break;

     case 'high-low':
      setFilterProduct(fpCopy.sort((a,b)=>(b.price-a.price)));
      break;
      
    default:
    applyfilter(); 
    break; 
  }
}

useEffect(()=>{
  applyfilter()
},[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    console.log(category)
  },[category])


  useEffect(()=>{
    console.log(subCategory)
  },[subCategory])

  useEffect(()=>{
sortProduct()
  },[sortType])

  useEffect(() => {
    setSubCategory(prev => prev.filter(sub => {
      if (sub === 'Set') {
        return category.includes("Gen alpha") || category.length === 0;
      }
      return true;
    }));
  }, [category]);


   return (
     <div className=' flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
       {/* Fliter Options */}
       <div className='min-w-60'>
        <p  onClick={()=>setShowfilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} alt="" />
        </p>
        {/* category filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3' type='checkbox' value={'Men'} onChange={toggleCategory}/>Men
            </p>

            <p className='flex gap-2 '>
              <input className='w-3' type='checkbox' value={'Women'} onChange={toggleCategory}/>Women
            </p>

            <p className='flex gap-2 '>
              <input className='w-3' type='checkbox' value={'Gen alpha'} onChange={toggleCategory}/>Gen alpha
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-5 ${showfilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input className='w-3' type='checkbox' value={'Topwear'} checked={subCategory.includes('Topwear')} onChange={toggleSubCategory}/>Topwear
            </p>
            <p className='flex gap-2 '>
              <input className='w-3' type='checkbox' value={'Bottomwear'} checked={subCategory.includes('Bottomwear')} onChange={toggleSubCategory}/>Bottomwear
            </p>
            {(category.includes('Gen alpha') || category.length === 0) && (
              <p className='flex gap-2 '>
                <input className='w-3' type='checkbox' value={'Set'} checked={subCategory.includes('Set')} onChange={toggleSubCategory}/>Set
              </p>
            )}
          </div>
        </div>
       </div>
       {/* Right Side */}
       <div className='flex-1'>
        <div className='flex justify-between text-balance sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTION"}/>
          {/* Porduct Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border border-gray-300 text-sm px-2'>
            <option value="relavant">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low To High</option>
            <option value="high-low">Sort by: High To Low</option>
          </select>
        </div>
        <div className='grid grid-col-2 md:grid lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item,index)=>(
              <ProductItems key={index} name={item.name} id={item._id} price={item.price} image={item.image} designerName={item.designerName}/>
            ))
          }

        </div>
       </div>
     </div>
   )
 }
 
 export default Collection
 