import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from './ProductItems';

const RelatedProduct = ({category,subCategory}) => {

     const {products}=useContext(ShopContext);
     const [related,setRelated]=useState([])

     useEffect(()=>{
        if(products.length>0){
            let productsCopy=products.slice();

            productsCopy=productsCopy.filter((item)=>category === item.category)
            productsCopy=productsCopy.filter((item)=> subCategory === item.subCategory);

            setRelated(productsCopy.slice(1,6));
            
        }
     },[products, category, subCategory])
  return (
    <div className='my-24 text-left'>
        <div className='mb-8 border-b border-white/5 pb-4'>
            <h2 className='text-xl md:text-2xl font-heading font-extrabold text-white uppercase tracking-wider'>
              Related Apparel
            </h2>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item,index)=>(
                <ProductItems key={index} id={item._id} name={item.name} price={item.price} image={item.image} index={index}/>
            ))}

        </div>
    </div>
  )
}

export default RelatedProduct
