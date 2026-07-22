import React, { useState } from 'react'
import { toast } from 'react-toastify'

const NewsLetterBox = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success('Subscribed successfully! Check your inbox for exclusive early drops.');
    setEmail('');
  }

  return (
    <div className='my-16 bg-slate-950 text-white p-8 sm:p-12 md:p-16 text-center max-w-4xl mx-auto rounded-sm relative overflow-hidden shadow-xl font-sans-editorial'>
      {/* Background Subtle Accent */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none'></div>
      
      <div className='relative z-10 space-y-4'>
        <div className='inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-sm'>
          <span className="text-orange-500 font-bold text-xs">✦</span>
          <span className='text-[9px] font-bold text-slate-300 uppercase tracking-[0.25em]'>VIP Editorial Circle</span>
        </div>

        <h2 className='text-2xl sm:text-4xl font-editorial font-medium text-white tracking-tight'>
          Subscribe For Early Drops
        </h2>
        <p className='text-slate-400 max-w-md mx-auto text-xs sm:text-sm font-medium leading-relaxed tracking-wide'>
          Join our global fashion circle. Receive exclusive alerts on limited-edition creator drops and private editorial releases.
        </p>

        <form onSubmit={onSubmitHandler} className='w-full sm:max-w-md flex flex-col sm:flex-row items-center gap-2 mx-auto pt-4'>
          <input 
            className="w-full sm:flex-1 outline-none text-slate-900 bg-white py-3.5 px-4 text-xs font-semibold rounded-sm tracking-wide placeholder:text-slate-400" 
            type='email' 
            placeholder='Enter your email address...' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button 
            type='submit' 
            className='w-full sm:w-auto bg-orange-500 text-white hover:bg-orange-600 font-bold text-[10px] tracking-[0.2em] uppercase py-3.5 px-6 rounded-sm transition-colors cursor-pointer shadow-md'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsLetterBox
