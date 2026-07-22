import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, MessageSquare, User, Image, ShoppingCart } from 'lucide-react'

const BeltNavigation = () => {
  const location = useLocation()
  const path = location.pathname

  const isLinkActive = (targetPath) => {
    if (targetPath === '/' && path === '/') return true
    if (targetPath === '/collection' && path === '/collection') return true
    if (targetPath === '/contact' && path === '/contact') return true
    if (targetPath === '/myprofile' && (path === '/myprofile' || path === '/login')) return true
    return false
  }

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 font-sans-editorial select-none">
      
      {/* Belt Wrapper Container to contain the proportions precisely */}
      <div className="relative flex flex-col items-center w-full max-w-[620px] scale-90 sm:scale-100 origin-center transition-transform duration-300">
        
        {/* Row 1: Simple text labels above the belt strap exactly matching the reference */}
        <div className="w-full flex justify-end pr-8 sm:pr-12 mb-3.5">
          <div className="flex gap-8 sm:gap-11 text-[10px] sm:text-[11px] font-heading font-bold text-[#5c3e2b] tracking-widest uppercase select-none opacity-80">
            <Link to="/" className="hover:text-orange-500 transition-colors">HOME</Link>
            <Link to="/collection" className="hover:text-orange-500 transition-colors">SHOP</Link>
            <Link to="/contact" className="hover:text-orange-500 transition-colors">CONTACT</Link>
            <Link to="/myprofile" className="hover:text-orange-500 transition-colors">PROFILE</Link>
          </div>
        </div>

        {/* Row 2: The Leather Belt & Brass Buckle Harness */}
        <div className="relative w-full flex items-center justify-start h-16 sm:h-18 pl-2">
          
          {/* Soft Shadow Beneath the Belt */}
          <div className="absolute inset-x-4 bottom-[-6px] h-3 bg-black/25 blur-md rounded-full pointer-events-none"></div>

          {/* 1. Antique Brass Buckle (Detailed Metallic Reflections) */}
          <div className="relative z-30 shrink-0 w-16 sm:w-20 h-14 sm:h-16 flex items-center justify-center drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]">
            <svg className="w-full h-full" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Antique Brass Gradient */}
                <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#735a32" />
                  <stop offset="25%" stopColor="#d9bf8c" />
                  <stop offset="50%" stopColor="#967a4e" />
                  <stop offset="75%" stopColor="#f3deb3" />
                  <stop offset="100%" stopColor="#594422" />
                </linearGradient>
                {/* Buckle Prong Gradient */}
                <linearGradient id="prong-grad" x1="0%" y1="50%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor="#4d3b1e" />
                  <stop offset="50%" stopColor="#c2a774" />
                  <stop offset="100%" stopColor="#3d2e16" />
                </linearGradient>
                {/* Inner Shadow Filter */}
                <filter id="buckle-shadow">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.5"/>
                </filter>
              </defs>
              
              {/* Main Outer D-Ring Buckle Shape */}
              <path 
                d="M 15 10 H 70 C 90 10, 95 25, 95 40 C 95 55, 90 70, 70 70 H 15 C 5 70, 5 55, 5 40 C 5 25, 5 10, 15 10 Z" 
                fill="url(#brass-grad)" 
                stroke="#3d2f16" 
                strokeWidth="1.5"
                filter="url(#buckle-shadow)"
              />
              
              {/* Inner Opening cut-out to show leather belt passing through */}
              <path 
                d="M 22 22 H 65 C 75 22, 80 30, 80 40 C 80 50, 75 58, 65 58 H 22 Z" 
                fill="#200d04" 
                stroke="#3d2f16" 
                strokeWidth="1"
              />

              {/* Belt Leather end wrapped inside buckle */}
              <path d="M 20 23 H 40 V 57 H 20 Z" fill="#401809" />

              {/* Buckle Tongue/Prong resting over the frame */}
              <rect x="18" y="37" width="60" height="6" rx="2" fill="url(#prong-grad)" stroke="#221708" strokeWidth="0.8" />
              {/* Highlight tip of prong */}
              <circle cx="75" cy="40" r="2.5" fill="#f8e3be" />
            </svg>
          </div>

          {/* 2. Antique Brass Keeper Loop (Vertically Engraved Icons) */}
          <div className="relative z-30 shrink-0 w-8 sm:w-9 h-20 sm:h-22 -ml-2.5 flex flex-col items-center justify-around py-2.5 rounded-sm border border-[#3d2f16] shadow-[2px_0_5px_rgba(0,0,0,0.3)] bg-gradient-to-r from-[#735a32] via-[#d9bf8c] to-[#594422]">
            {/* Highlights and vertical metallic reflections */}
            <div className="absolute inset-y-0 left-[20%] w-[15%] bg-white/20 pointer-events-none blur-[0.5px]"></div>
            <div className="absolute inset-y-0 right-[20%] w-[10%] bg-black/15 pointer-events-none"></div>

            {/* Vertically Engraved Icons inside Keeper */}
            <div className="flex flex-col items-center justify-between h-full w-full px-1 text-[#220b02]/85 drop-shadow-[0_1px_0.5px_rgba(255,255,255,0.4)]">
              <Home className="w-3.5 h-3.5 stroke-[2.2]" />
              <User className="w-3.5 h-3.5 stroke-[2.2]" />
              <ShoppingCart className="w-3.5 h-3.5 stroke-[2.2]" />
              <Image className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
          </div>

          {/* 3. The Main Leather Belt Strap */}
          <div 
            className="flex-1 h-15 sm:h-17 -ml-1 rounded-r-[4px] relative z-10 flex items-center justify-around px-4 sm:px-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.12),inset_0_-3px_5px_rgba(0,0,0,0.5)] border-y border-[#1a0802]"
            style={{
              background: 'linear-gradient(to bottom, #2b0f05 0%, #683015 28%, #54220c 50%, #461b0a 75%, #1f0a02 100%)',
              boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.1), inset 0 -3px 4px rgba(0,0,0,0.4), 0 3px 6px rgba(0,0,0,0.25)'
            }}
          >
            {/* Fine Stitching Lines Along the Top and Bottom Edges */}
            <div className="absolute inset-x-0 top-1.5 h-px border-t border-dashed border-[#ffcab4]/20 pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-1.5 h-px border-b border-dashed border-[#ffcab4]/20 pointer-events-none"></div>

            {/* Leather Texture Subtle Grain Overlay */}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#ffcca3] via-transparent to-black"></div>

            {/* Navigation links engraved directly into leather belt */}
            
            {/* HOME */}
            <Link 
              to="/" 
              className={`flex flex-col items-center gap-0.5 group/nav cursor-pointer transition-all duration-300 ${
                isLinkActive('/') ? 'scale-102' : 'hover:scale-102'
              }`}
            >
              {/* Home Icon Engraved */}
              <div 
                className="text-[#200d04] transition-colors group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                <Home className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <span 
                className="text-[9px] sm:text-[10px] font-heading font-extrabold tracking-widest text-[#200d04] group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                HOME
              </span>
            </Link>

            {/* SHOP */}
            <Link 
              to="/collection" 
              className={`flex flex-col items-center gap-0.5 group/nav cursor-pointer transition-all duration-300 ${
                isLinkActive('/collection') ? 'scale-102' : 'hover:scale-102'
              }`}
            >
              {/* Shop Icon Engraved */}
              <div 
                className="text-[#200d04] transition-colors group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                <ShoppingBag className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <span 
                className="text-[9px] sm:text-[10px] font-heading font-extrabold tracking-widest text-[#200d04] group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                SHOP
              </span>
            </Link>

            {/* CONTACT */}
            <Link 
              to="/contact" 
              className={`flex flex-col items-center gap-0.5 group/nav cursor-pointer transition-all duration-300 ${
                isLinkActive('/contact') ? 'scale-102' : 'hover:scale-102'
              }`}
            >
              {/* Contact Icon Engraved */}
              <div 
                className="text-[#200d04] transition-colors group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                <MessageSquare className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <span 
                className="text-[9px] sm:text-[10px] font-heading font-extrabold tracking-widest text-[#200d04] group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                CONTACT
              </span>
            </Link>

            {/* PROFILE */}
            <Link 
              to="/myprofile" 
              className={`flex flex-col items-center gap-0.5 group/nav cursor-pointer transition-all duration-300 ${
                isLinkActive('/myprofile') ? 'scale-102' : 'hover:scale-102'
              }`}
            >
              {/* Profile Icon Engraved */}
              <div 
                className="text-[#200d04] transition-colors group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                <User className="w-5.5 h-5.5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </div>
              <span 
                className="text-[9px] sm:text-[10px] font-heading font-extrabold tracking-widest text-[#200d04] group-hover/nav:text-[#150702]"
                style={{
                  filter: 'drop-shadow(0px 1px 0.5px rgba(255,255,255,0.15))'
                }}
              >
                PROFILE
              </span>
            </Link>

          </div>

          {/* Stamped accent sparkle on the belt tip */}
          <div className="absolute right-5 text-[#f5bf94]/25 pointer-events-none select-none font-bold text-base z-20">
            ✦
          </div>

        </div>

      </div>

    </div>
  )
}

export default BeltNavigation
