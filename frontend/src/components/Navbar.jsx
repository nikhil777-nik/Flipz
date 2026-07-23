import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext)
  
  const logoutHandler = () => {
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-6 font-medium border-b border-slate-100/80 mb-6 relative z-30'>
      
      {/* Left Menu Button (Hamburger inside circle) */}
      <div 
        onClick={() => setVisible(true)} 
        className="rounded-full border border-slate-200/90 bg-white w-10 h-10 flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all duration-300"
      >
        <svg className="w-5 h-5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>

      {/* Center Logo - Brand Text */}
      <Link to="/" className="flex items-center gap-2.5 group cursor-pointer ml-4 sm:ml-8">
        <img 
          src={assets.logo} 
          alt="Flipz Logo" 
          className="h-8 w-8 object-contain opacity-90 group-hover:scale-110 transition-transform duration-300"
        />
        <span className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 tracking-[0.18em] uppercase select-none">
          FLIPZ
        </span>
      </Link>

      {/* Right Icons Row */}
      <div className='flex items-center gap-4.5'>
        
        {/* Search */}
        <div 
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }} 
          className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all duration-300"
        >
          <img src={assets.search_icon} className='w-4.5 opacity-80' alt='Search' />
        </div>

        {/* Profile */}
        <div className='group relative'>
          <div 
            onClick={() => token ? navigate('/myprofile') : navigate('/login')} 
            className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] cursor-pointer hover:bg-slate-50 hover:scale-105 transition-all duration-300"
          >
            <img src={assets.profile_icon} className='w-4.5 opacity-80' alt='Profile' />
          </div>
          
          {token &&
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50 animate-fade-in'>
            <div className='flex flex-col gap-2.5 w-40 py-4 px-5 bg-white shadow-xl text-slate-600 rounded-lg border border-slate-100'>
              <p onClick={() => navigate('/myprofile')} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>My profile</p>
              <p onClick={() => navigate('/Orders')} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>Orders</p>
              <p onClick={logoutHandler} className='cursor-pointer hover:text-slate-950 font-sans-editorial text-xs font-semibold tracking-wider transition-all hover:translate-x-1'>Logout</p>
            </div>
          </div>
          }
        </div>

        {/* Cart */}
        <Link to='/cart' className='relative hover:scale-105 transition-transform'>
          <div className="w-10 h-10 rounded-full border border-slate-200/90 bg-white flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:bg-slate-50 transition-all duration-300">
            <img src={assets.cart_icon} alt="Cart" className='w-4.5 opacity-80' />
          </div>
          <p className='absolute right-[-2px] bottom-[-2px] w-4.5 h-4.5 flex items-center justify-center bg-slate-950 text-white rounded-full text-[9px] font-sans-editorial font-bold shadow-md'>{getCartCount()}</p>
        </Link>
      </div>

      {/* Drawer menu for navigation links */}
      <div className={`fixed top-0 left-0 bottom-0 overflow-hidden bg-slate-950 text-white transition-all duration-500 z-50 shadow-2xl ${visible ? "w-80 border-r border-slate-800" : "w-0"}`}>
        <div className='flex flex-col h-full justify-between p-8 font-sans-editorial'>
          <div>
            <div className="flex justify-between items-center pb-8 border-b border-slate-900">
              <div className="flex items-center gap-2.5">
                <img 
                  src={assets.logo} 
                  alt="Flipz Logo" 
                  className="h-7 w-7 object-contain brightness-0 invert opacity-90"
                />
                <span className="font-heading font-extrabold text-xl tracking-[0.15em] text-white uppercase select-none">
                  FLIPZ
                </span>
              </div>
              <button 
                onClick={() => setVisible(false)} 
                className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-white font-bold hover:bg-slate-900 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <nav className="flex flex-col gap-6 mt-12 text-sm font-bold tracking-widest uppercase">
              <NavLink onClick={() => setVisible(false)} to="/" className={({isActive}) => `hover:text-orange-500 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-350'}`}>
                HOME
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to="/collection" className={({isActive}) => `hover:text-orange-500 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-350'}`}>
                COLLECTION
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to="/about" className={({isActive}) => `hover:text-orange-500 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-350'}`}>
                ABOUT
              </NavLink>
              <NavLink onClick={() => setVisible(false)} to="/contact" className={({isActive}) => `hover:text-orange-500 transition-colors ${isActive ? 'text-orange-500' : 'text-slate-350'}`}>
                CONTACT
              </NavLink>
            </nav>
          </div>
          
          <div className="text-[10px] text-slate-500 tracking-wider font-semibold leading-relaxed">
            &copy; 2026 FLIPZ STUDIOS.<br/>
            ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>

      {/* Backdrop blur overlay when drawer is open */}
      {visible && (
        <div 
          onClick={() => setVisible(false)} 
          className="fixed inset-0 bg-slate-950/20 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

    </div>
  )
}

export default Navbar
