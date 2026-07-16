import React from 'react'
import { assets } from "../assets/assets"
const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-slate-200 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden animate-fade-in bg-white relative group'>
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-[length:200%_auto] z-0'></div>
      {/* Hero left side  */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 relative z-10'>
        <div className='text-slate-800 p-8'>
          <div className='flex items-center gap-2 mb-4'>
            <p className='w-8 md:w-11 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-pink-500'></p>
            <p className='font-bold text-sm md:text-base text-gradient-primary tracking-widest'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-4xl sm:py-3 lg:text-7xl leading-tight text-gradient-primary animate-gradient bg-[length:200%_auto] drop-shadow-sm font-bold'>Latest Arrivals</h1>
          <div className='flex items-center gap-2 cursor-pointer mt-6 group/btn'>
            <p className='font-bold text-sm md:text-base group-hover/btn:text-pink-500 transition-colors tracking-wide'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-slate-800 group-hover/btn:bg-pink-500 transition-colors group-hover/btn:w-16 duration-300'></p>
          </div>
        </div>
      </div>
      <div className='w-full sm:w-1/2 overflow-hidden relative z-10 bg-slate-50'>
        <img className="w-full h-full object-cover animate-float hover:scale-110 transition-transform duration-700" src="https://i.pinimg.com/736x/ab/55/b9/ab55b915b657342c1f7ed4f2c9383739.jpg" />
      </div>
    </div>
  )
}

export default Hero
