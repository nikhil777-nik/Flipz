import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-slate-200/80 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden bg-white relative group my-6 transition-all duration-700 animate-fade-in'>
      <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient bg-[length:200%_auto] z-0'></div>
      
      {/* Hero left side  */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-12 sm:py-16 relative z-10 p-8 sm:p-12'>
        <div className='text-slate-800 space-y-4'>
          <div className='flex items-center gap-2 mb-4'>
            <p className='w-8 md:w-11 h-[3px] rounded-full bg-gradient-to-r from-indigo-500 to-pink-500'></p>
            <p className='font-bold text-sm md:text-base text-gradient-primary tracking-widest font-heading'>OUR BESTSELLERS</p>
          </div>
          <h1 className='font-heading text-4xl sm:py-3 lg:text-7xl leading-tight text-gradient-primary animate-gradient bg-[length:200%_auto] drop-shadow-sm font-bold'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2 cursor-pointer mt-6 group/btn'>
            <p className='font-bold text-sm md:text-base group-hover/btn:text-pink-500 transition-colors tracking-wide font-heading'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-slate-800 group-hover/btn:bg-pink-500 transition-colors group-hover/btn:w-16 duration-300'></p>
          </div>
        </div>
      </div>
      
      {/* Hero right side - Floating Editorial Composition with 40% Larger Model */}
      <div className='w-full sm:w-1/2 overflow-hidden relative z-10 bg-slate-50/80 min-h-[500px] sm:min-h-[640px] flex items-center justify-center p-6 sm:p-10'>
        {/* Soft Background Aura */}
        <div className="absolute inset-4 rounded-3xl bg-gradient-to-tr from-indigo-500/10 via-purple-500/15 to-pink-500/10 blur-2xl pointer-events-none" />
        
        <div className="relative w-full h-full max-w-[480px] max-h-[620px] flex items-center justify-center animate-float">
          {/* Floating Editorial Glass Chip */}
          <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-lg text-[9px] font-mono-tag font-bold tracking-[0.2em] text-slate-800 uppercase flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            EDITORIAL DROP '26
          </div>

          <img 
            className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" 
            src="https://i.pinimg.com/736x/ab/55/b9/ab55b915b657342c1f7ed4f2c9383739.jpg" 
            alt="Hero Model Showcase"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
