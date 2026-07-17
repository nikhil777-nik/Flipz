import React, { useContext, useState } from 'react'
import { assets } from "../assets/assets"
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, cartItems,navigate,token,setToken,setCartItems } = useContext(ShopContext)
  const logoutHandler = ()=>{
    navigate("/login")
    localStorage.removeItem("token")
    setToken("")
    setCartItems({})
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to="/" className="flex items-center">
        <span className="font-heading font-black text-2xl tracking-tighter text-slate-800 uppercase flex items-center select-none">
          Flipz<span className="text-pink-500 font-extrabold text-3xl leading-none ml-0.5">.</span>
        </span>
      </Link>

      <ul className='hidden sm:flex gap-5 text-sm text-slate-800 font-bold tracking-wide'>
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-gradient-primary transition-all duration-300">
          <p className='hover:-translate-y-1 transition-transform'>HOME</p>
          <hr className='w-2/4 border-none h-[3px] rounded-full hidden bg-gradient-to-r from-indigo-500 to-pink-500' />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-gradient-primary transition-all duration-300">
          <p className='hover:-translate-y-1 transition-transform'>COLLECTION</p>
          <hr className='w-2/4 border-none h-[3px] rounded-full hidden bg-gradient-to-r from-indigo-500 to-pink-500' />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-gradient-primary transition-all duration-300">
          <p className='hover:-translate-y-1 transition-transform'>ABOUT</p>
          <hr className='w-2/4 border-none h-[3px] rounded-full hidden bg-gradient-to-r from-indigo-500 to-pink-500' />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-gradient-primary transition-all duration-300">
          <p className='hover:-translate-y-1 transition-transform'>CONTACT</p>
          <hr className='w-2/4 border-none h-[3px] rounded-full hidden bg-gradient-to-r from-indigo-500 to-pink-500' />
        </NavLink>

      </ul>

      <div className='flex items-center gap-6'>
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt='' />

        <div className='group relative'>
          {/* <Link to='/login'> */}

          <img onClick={()=>token?navigate('/myprofile'):navigate('/login')}src={assets.profile_icon} className='w-5 cursor-pointer hover:scale-125 transition-transform duration-300' />
          {/* Dropdown menu */}
    
         {token &&
         <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50 animate-fade-in'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-2xl shadow-indigo-500/20 text-slate-600 rounded-xl border border-indigo-100 backdrop-blur-md'>
              <p onClick={() => navigate('/myprofile')} className='cursor-pointer hover:text-gradient-primary font-medium transition-all hover:translate-x-1'>My profile</p>
              <p onClick={() => navigate('/Orders')} className='cursor-pointer hover:text-gradient-primary font-medium transition-all hover:translate-x-1'>Orders</p>
              <p onClick={logoutHandler} className='cursor-pointer hover:text-gradient-primary font-medium transition-all hover:translate-x-1'>Logout</p>
            </div>
          </div>
         }

        </div>
        <Link to='/cart' className='relative hover:scale-110 transition-transform'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-gradient-to-r from-indigo-500 to-pink-500 text-white aspect-square rounded-full text-[8px] shadow-[0_0_10px_rgba(236,72,153,0.8)] animate-bounce'>{getCartCount()}</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className=' w-5 cursor-pointer sm:hidden ' />
      </div>
      {/* sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 ${visible ? "w-full" : "w-0"}`}>
        <div className='flex flex-col text-gray-600'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className="h-4 rotate-180" src={assets.dropdown_icon} />
            <p className=''>back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} to="/" className="py-2 pl-6 border">HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/collection" className="py-2 pl-6 border">COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/about" className="py-2 pl-6 border">ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} to="/contact" className="py-2 pl-6 border">CONTACT</NavLink>

        </div>
      </div>
    </div>
  )
}

export default Navbar
