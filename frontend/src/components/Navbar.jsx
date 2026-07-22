import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import BeltNavigation from './BeltNavigation';

const Navbar = () => {
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  
  const logoutHandler = () => {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})
  }

  return (
    <div className='w-full bg-[#F8F4EA] border-b border-[#ebdcb9] rounded-2xl px-6 py-3 mb-6 relative z-30 flex items-center justify-between shadow-xs transition-all duration-300'>
      
      {/* Left side: Brand Title FLIPZ (Moved to left in place of three-line navbar) */}
      <Link to="/" className="flex items-center group cursor-pointer mr-4">
        <span className="font-heading text-xl sm:text-2xl font-extrabold text-[#2a1608] tracking-[0.18em] uppercase select-none">
          FLIPZ
        </span>
      </Link>

      {/* Center: Belt Navigation */}
      <div className="flex-1 flex justify-center max-w-[620px] mx-4">
        <BeltNavigation />
      </div>

      {/* Right Icons Row */}
      <div className='flex items-center gap-3 sm:gap-4.5'>
        
        {/* Search */}
        <div 
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }} 
          className="w-10 h-10 rounded-full border border-[#ebdcb9] bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all duration-300"
        >
          <img src={assets.search_icon} className='w-4.5 opacity-80' alt='Search' />
        </div>

        {/* Profile */}
        <div className='group relative'>
          <div 
            onClick={() => token ? navigate('/myprofile') : navigate('/login')} 
            className="w-10 h-10 rounded-full border border-[#ebdcb9] bg-white flex items-center justify-center shadow-sm cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all duration-300"
          >
            <img src={assets.profile_icon} className='w-4.5 opacity-80' alt='Profile' />
          </div>
          
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50 animate-fade-in'>
              <div className='flex flex-col gap-2.5 w-40 py-4 px-5 bg-white shadow-xl text-slate-600 rounded-lg border border-slate-100'>
                <p onClick={() => navigate('/myprofile')} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>My profile</p>
                <p onClick={() => navigate('/Orders')} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>Orders</p>
                <p onClick={logoutHandler} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative hover:scale-105 transition-transform'>
          <div className="w-10 h-10 rounded-full border border-[#ebdcb9] bg-white flex items-center justify-center shadow-sm hover:bg-slate-50 transition-all duration-300">
            <img src={assets.cart_icon} alt="Cart" className='w-4.5 opacity-80' />
          </div>
          <p className='absolute right-[-2px] bottom-[-2px] w-4.5 h-4.5 flex items-center justify-center bg-slate-950 text-white rounded-full text-[9px] font-sans-editorial font-bold shadow-md'>{getCartCount()}</p>
        </Link>
      </div>

    </div>
  )
}

export default Navbar
