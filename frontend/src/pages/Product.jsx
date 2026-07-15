import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

  const fetchProductData = () => {
    const item = products.find((p) => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image?.[0] || "");
    }
  };

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className=' border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* --------------product Data------------*/}
      <div className='flex sm:gap-12 flex-col gap-12  sm:flex-row'>
        {/* --------------product Image------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row' >
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className=' w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} className=" w-full h-auto" alt="" />
          </div>
        </div>
        {/* --------------product Info------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_icon} alt="" className='w-3 5' />
            <img src={assets.star_dull_icon} alt="" className='w-3 5' />
            <p className='pl-2'>122</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>
              Select Size
            </p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index} > {item}</button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={() => addToCart(productData._id, size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* ----------------- Description & Review Section ---------------- */}
      <div className='mt-20 animate-fade-in group/desc'>
        <div className='flex gap-2 mb-[-1px] relative z-10'>
          <p className='border-t-2 border-l-2 border-r-2 border-indigo-200 bg-white px-8 py-4 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 rounded-t-2xl shadow-[0_-5px_15px_-5px_rgba(99,102,241,0.2)] cursor-pointer'>
            Description
          </p>
          <p className='border border-slate-200 bg-slate-50 px-8 py-4 text-sm font-medium text-slate-500 hover:text-indigo-500 transition-colors cursor-pointer rounded-t-2xl hover:bg-white'>
            Review (122)
          </p>
        </div>
        <div className='flex flex-col gap-5 border border-indigo-200 px-8 py-10 text-sm text-slate-600 rounded-b-2xl rounded-tr-2xl shadow-[0_10px_30px_-10px_rgba(236,72,153,0.15)] bg-white relative overflow-hidden'>
          <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100 to-transparent opacity-50 rounded-bl-full pointer-events-none'></div>
          <p className='leading-relaxed relative z-10 text-base'>
            An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
          </p>
          <p className='leading-relaxed relative z-10 text-base'>
            E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
          </p>
        </div>
      </div>
      {/*  ---------------- display related products ----------------*/}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
