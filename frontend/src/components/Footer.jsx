import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Footer = () => {
  const [emailInput, setEmailInput] = useState('')

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!emailInput) return
    toast.success('Thank you for contacting FLIPZ! We will reach out shortly.')
    setEmailInput('')
  }

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#09090B] text-white rounded-[28px] sm:rounded-[36px] pt-12 sm:pt-16 pb-10 sm:pb-12 px-6 sm:px-12 md:px-16 mt-16 mb-12 sm:mb-20 font-sans-editorial relative overflow-hidden shadow-2xl"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Top Left: Main Headline & Fast Email Contact */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tag font-bold tracking-[0.25em] text-slate-400 uppercase">
                CONTACT US
              </span>
              <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-white leading-[1.15]">
                Fast Selling Urban<br />
                <span className="inline-block w-8 sm:w-12 h-[3px] bg-white mr-2 align-middle"></span>
                Fashion Collection
              </h2>
            </div>

            {/* Email Input Field with Dashed Line & Arrow Button */}
            <form 
              onSubmit={handleEmailSubmit}
              className="pt-4 max-w-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-700/80 focus-within:border-white transition-colors">
                <input 
                  type="email" 
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Send email to us"
                  className="bg-transparent outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 w-full pr-4 font-sans-editorial"
                  required
                />
                <button 
                  type="submit" 
                  aria-label="Send email"
                  className="w-9 h-9 rounded-full bg-white text-slate-950 flex items-center justify-center hover:bg-slate-200 transition-all duration-300 transform hover:scale-105 shrink-0 cursor-pointer shadow-md"
                >
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </form>
          </div>

          {/* Top Right: Contact & Details Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8 text-xs font-sans-editorial">
            {/* Location */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                LOCATION
              </h5>
              <p className="text-slate-300 font-medium leading-relaxed">
                5567 Washington Ave,<br />
                America, 32289
              </p>
            </div>

            {/* Call Us */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                CALL US
              </h5>
              <p className="text-slate-300 font-semibold text-sm tracking-wide">
                7654544343
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                EMAIL
              </h5>
              <p className="text-slate-300 font-semibold text-xs tracking-wide hover:text-white transition-colors truncate">
                supportflipz@gmail.com
              </p>
            </div>

            {/* Open Time */}
            <div className="space-y-1.5">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                OPEN TIME
              </h5>
              <p className="text-slate-300 font-medium tracking-wide">
                08.00 - 11.00 pm
              </p>
            </div>
          </div>

        </div>

        {/* Middle Grid Section: Social Icons & Navigation Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pt-6">
          
          {/* Middle Left: Follow Us Social Icons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-semibold text-slate-300 block">
              Follow Us
            </span>
            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer font-bold text-xs"
              >
                f
              </a>
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer font-bold text-xs"
              >
                X
              </a>
              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle Right: 3 Column Links (MENU, SHOP, CART) */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs font-sans-editorial">
            
            {/* MENU Column */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                MENU
              </h5>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Industries</Link></li>
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Product</Link></li>
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Categories</Link></li>
              </ul>
            </div>

            {/* SHOP Column */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                SHOP
              </h5>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Shirt</Link></li>
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Jacket</Link></li>
                <li><Link to="/collection" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Jeans</Link></li>
              </ul>
            </div>

            {/* CART Column */}
            <div className="space-y-3">
              <h5 className="text-[10px] font-mono-tag font-bold text-slate-400 tracking-[0.2em] uppercase">
                CART
              </h5>
              <ul className="space-y-2 text-slate-300 font-medium">
                <li><Link to="/cart" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Tutorials</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Bar with Dashed Divider */}
        <div className="pt-8 border-t border-dashed border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-medium">
          <div className="flex items-center gap-6">
            <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>
          <div className="text-slate-400 font-mono-tag text-[10px]">
            &copy; 2026 FLIPZ STUDIOS. All rights reserved.
          </div>
        </div>

      </div>
    </motion.footer>
  )
}

export default Footer
