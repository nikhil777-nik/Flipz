import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { ShoppingBag, Star, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

const Product = () => {

  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")
  const [activeTab, setActiveTab] = useState('description')

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
    <div className='border-t border-slate-100 pt-8 font-sans-editorial animate-fade-in space-y-16'>
      {/* Product Main Container */}
      <div className='flex flex-col lg:flex-row gap-10 lg:gap-14 items-start'>
        
        {/* Product Image Gallery Left */}
        <div className='w-full lg:w-1/2 flex flex-col-reverse sm:flex-row gap-4'>
          {/* Thumbnails */}
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-3 sm:w-24 shrink-0 no-scrollbar'>
            {productData.image.map((item, index) => (
              <div 
                key={index}
                onClick={() => setImage(item)}
                className={`w-20 sm:w-full aspect-square rounded-xl overflow-hidden bg-slate-50 border cursor-pointer transition-all ${
                  image === item ? 'border-orange-500 ring-2 ring-orange-500/20' : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <img src={item} alt="" className='w-full h-full object-cover' />
              </div>
            ))}
          </div>

          {/* Featured Large Image */}
          <div className='flex-1 rounded-3xl bg-white border border-slate-200/80 p-3 shadow-sm overflow-hidden aspect-[3/4] flex items-center justify-center relative group'>
            {productData.designerName && (
              <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md text-white text-[9px] font-mono-tag font-bold tracking-widest px-3 py-1.5 uppercase rounded-full shadow-md">
                <span>✦ CREATOR DROP</span>
              </div>
            )}
            <img src={image} className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-700" alt={productData.name} />
          </div>
        </div>

        {/* Product Info Right */}
        <div className='w-full lg:w-1/2 space-y-6'>
          <div>
            <div className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.25em] uppercase mb-2">
              {productData.category} / {productData.subCategory}
            </div>
            <h1 className='font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 leading-tight'>
              {productData.name}
            </h1>
            
            {/* Rating */}
            <div className='flex items-center gap-2 mt-3 text-xs text-slate-500 font-medium'>
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current opacity-40" />
              </div>
              <span className="font-bold text-slate-800">4.8</span>
              <span>(122 verified reviews)</span>
            </div>
          </div>

          {/* Price */}
          <div className='pt-2 border-t border-slate-100'>
            <p className='font-heading text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight'>
              {currency}{productData.price}
            </p>
            <p className='text-xs text-slate-500 mt-1'>Taxes included. Free shipping on orders over {currency}1000.</p>
          </div>

          {/* Description Snippet */}
          <p className='text-xs sm:text-sm text-slate-600 leading-relaxed font-medium'>
            {productData.description}
          </p>

          {/* Size Selector */}
          <div className='space-y-3 pt-4 border-t border-slate-100'>
            <div className="flex justify-between items-center text-xs font-heading font-bold text-slate-900 tracking-wider uppercase">
              <span>SELECT SIZE</span>
              <span className="text-slate-400 font-normal cursor-pointer hover:underline text-[11px]">Size Guide</span>
            </div>

            <div className='flex flex-wrap gap-2.5'>
              {productData.sizes.map((item, index) => (
                <button 
                  key={index}
                  onClick={() => setSize(item)} 
                  className={`min-w-[48px] py-2.5 px-4 rounded-full font-heading text-xs font-bold transition-all cursor-pointer select-none ${
                    item === size 
                      ? 'bg-slate-950 text-white shadow-md shadow-slate-950/20 scale-105' 
                      : 'bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-400'
                  }`}
                > 
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-4">
            <button 
              onClick={() => addToCart(productData._id, size)}
              className='w-full sm:w-auto py-4 px-10 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98]'
            >
              <ShoppingBag className="w-4 h-4" />
              ADD TO CART
            </button>
          </div>

          {/* Value Props & Guarantee */}
          <div className='pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-medium text-slate-600'>
            <div className="flex items-center gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Original</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <Truck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
              <RefreshCw className="w-4 h-4 text-orange-500 shrink-0" />
              <span>7 Days Return</span>
            </div>
          </div>

        </div>
      </div>

      {/* Description & Review Tabs */}
      <div className='space-y-4'>
        <div className='flex gap-3 border-b border-slate-200 pb-px'>
          <button 
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-xs sm:text-sm font-heading font-extrabold tracking-wider uppercase transition-colors cursor-pointer relative ${
              activeTab === 'description' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Description
            {activeTab === 'description' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
          
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-heading font-extrabold tracking-wider uppercase transition-colors cursor-pointer relative ${
              activeTab === 'reviews' ? 'text-slate-950' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Reviews (122)
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
            )}
          </button>
        </div>

        <div className='border border-slate-200/80 p-6 sm:p-8 rounded-2xl bg-white shadow-xs text-xs sm:text-sm text-slate-600 leading-relaxed space-y-4 font-medium'>
          {activeTab === 'description' ? (
            <>
              <p>
                Flipz delivers premium fashion engineered with luxury editorial aesthetics. Each piece undergoes meticulous quality inspections using high-grade fabrics designed for comfort, durability, and contemporary urban style.
              </p>
              <p>
                Whether exploring official seasonal collections or creator community drops, every garment reflects modern craftsmanship tailored for everyday wearability.
              </p>
            </>
          ) : (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                  <span>Alex M.</span>
                  <span className="text-slate-400 font-mono-tag">2 days ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Exceptional quality and fit. The material feels ultra premium!</p>
              </div>
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                  <span>Sarah K.</span>
                  <span className="text-slate-400 font-mono-tag">1 week ago</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">Super fast shipping and packaging was top notch.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='py-20 text-center text-slate-400 font-mono-tag text-xs'>Loading product details...</div>
}

export default Product
