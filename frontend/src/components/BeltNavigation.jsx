import React from 'react'
import { Link, useLocation } from 'react-router-dom'

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[90%] sm:w-[500px] md:w-[560px] h-12 md:h-14 rounded-r-md select-none flex items-center leather-belt hover:scale-[1.01] transition-transform duration-300 font-sans-editorial">
      
      {/* Buckle label (Classic Men's loop indicator) */}
      <div className="absolute left-[-72px] sm:left-[-80px] flex flex-col items-center gap-1 select-none pointer-events-none">
        <div className="w-8 h-8 rounded-full border border-slate-200 bg-white flex items-center justify-center shadow-md">
          {/* Buckle Icon */}
          <svg className="w-4 h-4 text-[#44220b]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <span className="text-[8px] font-bold text-slate-500 tracking-tight leading-none">Classic Men's</span>
      </div>

      {/* Golden Brass Buckle Frame */}
      <div className="brass-buckle w-12 sm:w-14 h-9 sm:h-11 rounded-lg flex items-center justify-center relative -left-1.5 z-20">
        {/* Buckle Tongue/Prong */}
        <div className="w-5 h-1 bg-[#291204] absolute rounded-full left-3.5 top-1/2 -translate-y-1/2 shadow-[0_1px_1px_rgba(255,255,255,0.2)]"></div>
        {/* Center opening visual spacer */}
        <div className="w-6 h-5 sm:h-6 bg-[#44220b]/20 rounded border border-black/10"></div>
      </div>

      {/* Golden Brass Keeper Loop */}
      <div className="brass-keeper w-8 sm:w-10 h-12 sm:h-14 flex flex-col items-center justify-around py-1 text-[8px] sm:text-[9px] z-30 text-[#44220b]/90 font-bold relative left-[-2px] pointer-events-none shadow-sm">
        {/* Keeper Loop vertical settings icons */}
        <span>👤</span>
        <span>🔑</span>
        <span>⚙️</span>
        <span>📄</span>
      </div>

      {/* Navigation Belt Strap */}
      <div className="flex-1 flex justify-around items-center px-4 sm:px-6 relative z-10">
        
        {/* Link 1: HOME */}
        <Link 
          to="/" 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            isLinkActive('/') ? 'leather-stamp-active' : 'leather-stamp hover:text-orange-950/90'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest">HOME</span>
        </Link>

        {/* Link 2: SHOP */}
        <Link 
          to="/collection" 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            isLinkActive('/collection') ? 'leather-stamp-active' : 'leather-stamp hover:text-orange-950/90'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest">SHOP</span>
        </Link>

        {/* Link 3: CONTACT */}
        <Link 
          to="/contact" 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            isLinkActive('/contact') ? 'leather-stamp-active' : 'leather-stamp hover:text-orange-950/90'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest">CONTACT</span>
        </Link>

        {/* Link 4: PROFILE */}
        <Link 
          to="/myprofile" 
          className={`flex flex-col items-center gap-0.5 cursor-pointer ${
            isLinkActive('/myprofile') ? 'leather-stamp-active' : 'leather-stamp hover:text-orange-950/90'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[7.5px] sm:text-[8px] font-bold tracking-widest">PROFILE</span>
        </Link>

      </div>

      {/* Far Right Stamped Accent Sparkle */}
      <div className="absolute right-4 text-[#dfc085]/60 hover:text-[#dfc085] transition-colors pointer-events-none select-none font-bold">
        ✦
      </div>

    </div>
  )
}

export default BeltNavigation
