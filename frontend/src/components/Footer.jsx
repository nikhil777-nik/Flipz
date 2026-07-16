import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-slate-50 py-10 px-8 rounded-t-3xl mt-20 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group/footer">
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]'></div>
      <div className='flex flex-col items-center justify-center text-sm relative z-10 text-center'>
        <p className='text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600'>GET IN TOUCH</p>
        <ul className='flex flex-col items-center gap-3 text-slate-600 font-medium'>
          <li className='cursor-pointer hover:text-pink-600 transition-colors hover:-translate-y-0.5 transform duration-300 w-max'>7654544343</li>
          <li className='cursor-pointer hover:text-pink-600 transition-colors hover:-translate-y-0.5 transform duration-300 w-max'>supportflipz@gmail.com</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
