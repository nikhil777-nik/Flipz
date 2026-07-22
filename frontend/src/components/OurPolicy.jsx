import React from 'react'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-b border-slate-100 font-sans-editorial my-12 bg-slate-50/30 rounded-sm'>
      
      <div className='flex flex-col items-center text-center px-6 space-y-2 group'>
        <div className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm mb-2">
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <h4 className='font-editorial text-sm font-semibold text-slate-900 tracking-wide uppercase'>Easy Exchange Policy</h4>
        <p className='text-slate-500 text-[11px] font-medium leading-relaxed max-w-xs'>Seamless, hassle-free size & style exchange policy on all signature items.</p>
      </div>

      <div className='flex flex-col items-center text-center px-6 space-y-2 group border-y md:border-y-0 md:border-x border-slate-100 py-6 md:py-0'>
        <div className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm mb-2">
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h4 className='font-editorial text-sm font-semibold text-slate-900 tracking-wide uppercase'>7 Days Return Guarantee</h4>
        <p className='text-slate-500 text-[11px] font-medium leading-relaxed max-w-xs'>100% money-back return guarantee within 7 days of delivery.</p>
      </div>

      <div className='flex flex-col items-center text-center px-6 space-y-2 group'>
        <div className="w-12 h-12 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 shadow-sm mb-2">
          <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h4 className='font-editorial text-sm font-semibold text-slate-900 tracking-wide uppercase'>24/7 Dedicated Support</h4>
        <p className='text-slate-500 text-[11px] font-medium leading-relaxed max-w-xs'>Our concierge fashion experts are available round-the-clock for assistance.</p>
      </div>

    </div>
  )
}

export default OurPolicy
