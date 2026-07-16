import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price, designerName }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link className="group block border border-slate-100 hover:border-indigo-500/50 hover:shadow-[0_10px_35px_-5px_rgba(99,102,241,0.3)] hover:-translate-y-2 transition-all duration-300 ease-out rounded-2xl bg-white p-3 text-slate-700 cursor-pointer overflow-hidden relative" to={`/product/${id}`} >
      <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>
      
      <div className='overflow-hidden rounded-xl relative z-10 bg-slate-50 aspect-square flex items-center justify-center'>
        {designerName && (
          <div className="absolute top-2 left-2 z-20 bg-indigo-600/80 backdrop-blur-md text-white border border-indigo-400/30 text-[9px] sm:text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_4px_12px_rgba(99,102,241,0.3)]">
            <span className="text-[10px] sm:text-[11px]">🎨</span> Creator Design
          </div>
        )}
        <img className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full object-cover rounded-xl" src={image[0]} />
      </div>
      
      <div className="relative z-10 pt-3">
        <p className='pb-0.5 text-sm font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1'>{name}</p>
        
        {designerName ? (
          <div className="flex items-center justify-between mt-1">
            <p className='text-xs font-bold text-indigo-600'>by {designerName}</p>
            <p className='text-sm font-extrabold text-slate-900'>{currency}{price}</p>
          </div>
        ) : (
          <p className='text-sm font-bold text-slate-900 mt-1'>{currency}{price}</p>
        )}
      </div>
    </Link>
  )
}

export default ProductItems
