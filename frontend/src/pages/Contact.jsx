import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
import { MapPin, Phone, Mail, Briefcase } from 'lucide-react'

const Contact = () => {
  return (
    <div className="font-sans-editorial text-left animate-fade-in space-y-16 pt-8 border-t border-slate-100">
      
      {/* Title */}
      <div className='pb-2 border-b border-slate-100'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center'>
        <div className="md:col-span-6 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs aspect-[4/3] sm:aspect-[3/2] relative group">
          <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={assets.contact_img} alt="Contact Flipz Store" />
          <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md text-white text-[9px] font-mono-tag font-bold tracking-widest px-3 py-1.5 uppercase rounded-full">
            <span>FLIPZ HEADQUARTERS</span>
          </div>
        </div>

        <div className='md:col-span-6 space-y-6'>
          <div className="space-y-4 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <h3 className='font-heading text-xl font-extrabold text-slate-950 uppercase tracking-wider'>
              OUR FLAGSHIP STORE
            </h3>
            
            <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium pt-2 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <p className='leading-relaxed'>
                  5567 Washington Ave, Suite 350,<br />
                  America, 32289
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <p>Tel: <span className="font-bold text-slate-900">7654544343</span></p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                <p>Email: <span className="font-bold text-slate-900">supportflipz@gmail.com</span></p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-slate-950 font-heading font-extrabold text-base uppercase">
              <Briefcase className="w-5 h-5 text-orange-500" />
              CAREERS AT FLIPZ
            </div>
            <p className='text-xs text-slate-500 leading-relaxed font-medium'>
              Join our fast-growing fashion tech team and help shape the future of independent creator apparel.
            </p>
            <button className='px-6 py-3 rounded-full bg-slate-950 hover:bg-orange-500 text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer'>
              EXPLORE OPEN POSITIONS
            </button>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default Contact