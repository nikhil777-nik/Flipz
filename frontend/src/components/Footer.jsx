import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="bg-slate-50 pt-10 pb-2 px-8 rounded-t-3xl mt-20 shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)] relative overflow-hidden group/footer">
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient bg-[length:200%_auto]'></div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mb-10 text-sm relative z-10'>
        <div>
          <img src={assets.logo} className="mb-5 w-32 drop-shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer" alt="" />
          <p className='w-full md:w-2/3 text-slate-600 leading-relaxed'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>
        <div>
          <p className='text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600'>COMPANY</p>
          <ul className='flex flex-col gap-3 text-slate-600 font-medium'>
            <li className='cursor-pointer hover:text-indigo-600 transition-colors hover:translate-x-2 transform duration-300 w-max'>Home</li>
            <li className='cursor-pointer hover:text-indigo-600 transition-colors hover:translate-x-2 transform duration-300 w-max'>About us</li>
            <li className='cursor-pointer hover:text-indigo-600 transition-colors hover:translate-x-2 transform duration-300 w-max'>Delivery</li>
            <li className='cursor-pointer hover:text-indigo-600 transition-colors hover:translate-x-2 transform duration-300 w-max'>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className='text-xl font-bold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-indigo-600'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-3 text-slate-600 font-medium'>
            <li className='cursor-pointer hover:text-pink-600 transition-colors hover:-translate-y-1 transform duration-300 w-max'>+1-212-456-7890</li>
            <li className='cursor-pointer hover:text-pink-600 transition-colors hover:-translate-y-1 transform duration-300 w-max'>contactus@flipz.com</li>
          </ul>
        </div>
      </div>
      <div className='relative z-10'>
        <hr className='border-slate-200' />
        <p className='py-5 text-sm text-center text-slate-500 font-medium tracking-wide'>Copyright 2024@ greatstack.dev - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
