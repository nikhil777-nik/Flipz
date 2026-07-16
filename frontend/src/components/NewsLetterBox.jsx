import React, { useState } from 'react'
import { Mail, Sparkles } from 'lucide-react'
import { toast } from 'react-toastify'

const NewsLetterBox = () => {
  const [email, setEmail] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault();
    toast.success('Subscribed successfully! Check your inbox for exclusive early drops.');
    setEmail('');
  }

  return (
    <div className='my-24 bg-glass border border-white/5 rounded-[28px] p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden shadow-2xl'>
      <div className='absolute -left-20 -top-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl pointer-events-none'></div>
      <div className='absolute -right-20 -bottom-20 w-48 h-48 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none'></div>
      
      <div className='relative z-10'>
        <div className='inline-flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full mb-6'>
          <Mail className='w-3.5 h-3.5 text-accent-cyan' />
          <span className='text-[10px] font-bold text-gray-300 uppercase tracking-widest font-heading'>VIP newsletter</span>
        </div>

        <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white tracking-tight'>
          Subscribe for Early Drops
        </h2>
        <p className='text-gray-400 mt-3 max-w-lg mx-auto font-body text-xs md:text-sm leading-relaxed'>
          Join our streetwear circle. Get notified of exclusive limited-edition creator collections and flash royalty events before they sell out.
        </p>

        <form onSubmit={onSubmitHandler} className='w-full sm:max-w-md flex flex-col sm:flex-row items-center gap-3 mx-auto mt-8 p-1.5 border border-white/10 rounded-2xl bg-black/40 focus-within:border-accent transition-all duration-300'>
          <input 
            className="w-full sm:flex-1 outline-none text-white bg-transparent py-3 px-3 text-xs md:text-sm font-body font-medium" 
            type='email' 
            placeholder='Enter your email address' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
          <button 
            type='submit' 
            className='w-full sm:w-auto bg-white text-black hover:bg-accent-cyan hover:text-black font-heading font-bold text-xs py-3 px-6 rounded-xl transition-all cursor-pointer shadow-lg'
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewsLetterBox
