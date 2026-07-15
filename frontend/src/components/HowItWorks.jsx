import React from 'react'
import { motion } from 'framer-motion'
import { UploadCloud, HeartHandshake, Truck, Coins, ArrowDown } from 'lucide-react'

const steps = [
  {
    icon: UploadCloud,
    title: 'Upload Design',
    description: 'Creators upload high-resolution print artwork files and position them on our digital apparel mockup canvases.',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10'
  },
  {
    icon: HeartHandshake,
    title: 'Customers Purchase',
    description: 'Shoppers browse custom collections. They pick items from verified designer lines, direct royalties attached.',
    color: 'border-pink-500 text-pink-400 bg-pink-500/10'
  },
  {
    icon: Truck,
    title: 'We Print & Ship',
    description: 'FLIPZ processes printing, executes premium material inspections, compiles packaging, and ships right to the door.',
    color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10'
  },
  {
    icon: Coins,
    title: 'Creator Earns Royalties',
    description: 'Once delivered successfully, royalties accumulate inside the designer balance. Cash out directly to bank instantly.',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
  }
]

const HowItWorks = () => {
  return (
    <div id="how-it-works-section" className='py-24 relative overflow-hidden bg-white/[0.01] border-y border-white/5'>
      <div className='max-w-7xl mx-auto px-4 relative z-10'>
        
        <div className='text-center max-w-2xl mx-auto mb-20'>
          <span className='text-accent-cyan font-bold tracking-widest text-xs uppercase font-heading'>PROCESS FLOW</span>
          <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
            How FLIPZ Works
          </h2>
          <p className='text-gray-400 mt-4 font-body text-sm leading-relaxed'>
            We bridges the gap between digital designers and fashion buyers. We manage production, logistics, and shipping, letting you focus on the art.
          </p>
        </div>

        {/* Desktop timeline horizontal representation */}
        <div className='hidden lg:grid grid-cols-4 gap-8 relative'>
          
          {/* Connecting line */}
          <div className='absolute top-10 left-16 right-16 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 via-cyan-500 to-emerald-500 opacity-20 pointer-events-none'></div>

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className='text-left relative'
              >
                <div className={`w-20 h-20 rounded-[22px] border ${step.color} flex items-center justify-center mb-6 relative z-10 shadow-2xl`}>
                  <Icon className='w-8 h-8' />
                  <span className='absolute -top-2 -right-2 bg-white text-black w-6 h-6 rounded-full flex items-center justify-center font-heading font-bold text-xs shadow-md'>
                    {idx + 1}
                  </span>
                </div>
                
                <h3 className='font-heading font-bold text-lg text-white mb-3'>{step.title}</h3>
                <p className='text-gray-400 font-body text-xs leading-relaxed'>{step.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Mobile vertical timeline */}
        <div className='lg:hidden space-y-12 relative flex flex-col items-center'>
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className='flex flex-col items-center text-center max-w-sm px-4'
              >
                <div className={`w-16 h-16 rounded-2xl border ${step.color} flex items-center justify-center mb-4 relative shadow-lg`}>
                  <Icon className='w-7 h-7' />
                  <span className='absolute -top-1.5 -right-1.5 bg-white text-black w-5 h-5 rounded-full flex items-center justify-center font-heading font-bold text-xs'>
                    {idx + 1}
                  </span>
                </div>
                
                <h3 className='font-heading font-bold text-base text-white mb-2'>{step.title}</h3>
                <p className='text-gray-400 font-body text-xs leading-relaxed'>{step.description}</p>

                {idx < steps.length - 1 && (
                  <ArrowDown className='w-5 h-5 text-gray-700 mt-6 animate-bounce' />
                )}
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export default HowItWorks
