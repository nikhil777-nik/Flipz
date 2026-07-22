import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="font-sans-editorial text-left animate-fade-in space-y-16 pt-8 border-t border-slate-100">
      
      {/* Title */}
      <div className='pb-2 border-b border-slate-100'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* Hero Narrative Section */}
      <div className='grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 items-center'>
        <div className="md:col-span-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs aspect-[3/4] relative group">
          <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src={assets.about_img} alt="About Flipz Studios" />
          <div className="absolute top-4 left-4 z-20 bg-slate-950/85 backdrop-blur-md text-white text-[9px] font-mono-tag font-bold tracking-widest px-3 py-1.5 uppercase rounded-full">
            <span>ABOUT FLIPZ</span>
          </div>
        </div>
        
        <div className='md:col-span-7 space-y-5 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium'>
          <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-950">
            Pioneering Luxury Streetwear & Creator Royalties
          </h3>
          <p>
            Flipz was born out of a passion for innovation and a desire to revolutionize contemporary apparel shopping. Our platform connects fashion lovers directly with curated seasonal drops and global independent creators.
          </p>
          <p>
            Since inception, we've worked tirelessly to curate a diverse catalog of high-grade garments and streetwear artwork. Every piece embodies precision tailoring, premium material sourcing, and fair artist royalty monetization.
          </p>

          <div className="pt-4 border-t border-slate-100 space-y-2">
            <h4 className='font-heading font-extrabold text-slate-950 text-sm uppercase tracking-wider text-orange-500'>OUR MISSION</h4>
            <p className="text-slate-600">
              Our mission at Flipz is to empower customers with choice, convenience, and absolute confidence, while championing artist creators with transparent royalties on every piece sold.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="space-y-6 pt-6">
        <div className='pb-2 border-b border-slate-100'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='border border-slate-200/80 bg-white rounded-2xl p-8 space-y-3 shadow-xs hover:border-slate-300 transition-all'>
            <h4 className='font-heading font-extrabold text-sm text-slate-950 uppercase tracking-wider'>Quality Assurance</h4>
            <p className='text-xs text-slate-500 leading-relaxed font-medium'>We meticulously inspect and vet each garment to ensure it exceeds stringent luxury quality parameters.</p>
          </div>

          <div className='border border-slate-200/80 bg-white rounded-2xl p-8 space-y-3 shadow-xs hover:border-slate-300 transition-all'>
            <h4 className='font-heading font-extrabold text-sm text-slate-950 uppercase tracking-wider'>Seamless Shopping</h4>
            <p className='text-xs text-slate-500 leading-relaxed font-medium'>With our Apple-inspired liquid UI and hassle-free checkout, acquiring exclusive drops is seamless.</p>
          </div>

          <div className='border border-slate-200/80 bg-white rounded-2xl p-8 space-y-3 shadow-xs hover:border-slate-300 transition-all'>
            <h4 className='font-heading font-extrabold text-sm text-slate-950 uppercase tracking-wider'>Dedicated Support</h4>
            <p className='text-xs text-slate-500 leading-relaxed font-medium'>Our dedicated fashion team is here 24/7 to ensure your complete satisfaction from order to delivery.</p>
          </div>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
