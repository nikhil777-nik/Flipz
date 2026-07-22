import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems = ({ id, image, name, price, designerName }) => {
  const { currency } = useContext(ShopContext);
  return (
    <Link 
      className="group block border border-slate-200/80 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-2xl bg-white p-3.5 text-slate-800 cursor-pointer overflow-hidden font-sans-editorial" 
      to={`/product/${id}`}
    >
      <div className='overflow-hidden rounded-xl relative bg-slate-50 aspect-[3/3.8] flex items-center justify-center border border-slate-100/80 mb-3'>
        {designerName ? (
          <div className="absolute top-2.5 left-2.5 z-20 bg-slate-950/85 backdrop-blur-md text-white text-[8px] font-mono-tag font-bold tracking-widest px-2.5 py-1 uppercase rounded-full shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>CREATOR</span>
          </div>
        ) : (
          <div className="absolute top-2.5 left-2.5 z-20 bg-white/80 backdrop-blur-md text-slate-700 text-[8px] font-mono-tag font-bold tracking-widest px-2.5 py-1 uppercase rounded-full border border-slate-200/60 shadow-xs">
            OFFICIAL
          </div>
        )}
        <img 
          className="group-hover:scale-108 transition-transform duration-700 ease-out w-full h-full object-cover rounded-xl" 
          src={image[0]} 
          alt={name}
        />
      </div>
      
      <div className="space-y-1.5">
        <h4 className='font-heading text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-500 transition-colors truncate'>
          {name}
        </h4>
        
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-sans-editorial">
          {designerName ? (
            <span className='text-[9px] font-bold text-slate-400 tracking-wider uppercase truncate max-w-[60%] font-mono-tag'>
              by {designerName}
            </span>
          ) : (
            <span className='text-[8px] font-bold text-slate-400 tracking-widest uppercase font-mono-tag'>
              FLIPZ DROP
            </span>
          )}
          <span className='font-heading text-xs sm:text-sm font-extrabold text-slate-950 tracking-wider'>
            {currency}{price}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default ProductItems
