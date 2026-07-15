import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShoppingBag, Sparkles, Check, BadgeAlert, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const MarketSignatureSection = () => {
  const navigate = useNavigate()

  return (
    <div id="signature-section" className='py-24 relative overflow-hidden'>
      {/* Background ambient lighting */}
      <div className='absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-accent/10 blur-3xl pointer-events-none'></div>
      <div className='absolute -right-20 bottom-1/4 w-96 h-96 rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none'></div>

      <div className='max-w-7xl mx-auto px-4 relative z-10'>
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <span className='text-accent font-bold tracking-widest text-xs uppercase font-heading'>dual collections</span>
          <h2 className='text-4xl md:text-5xl font-heading font-extrabold text-white mt-2'>
            One Marketplace. Two Worlds.
          </h2>
          <p className='text-gray-400 mt-4 font-body text-sm leading-relaxed'>
            Start with our affordable ready-made streetwear essentials. Then, upgrade to premium custom art pieces created by independent streetwear designers.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 md:gap-12'>
          
          {/* Card A: Flipz Market */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='bg-glass border border-white/5 hover:border-accent-cyan/30 rounded-[24px] p-8 md:p-10 flex flex-col justify-between group transition-all duration-500 shadow-2xl relative'
          >
            <div>
              <div className='flex items-center justify-between pb-6 border-b border-white/5 mb-8'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center text-accent-cyan'>
                    <ShoppingBag className='w-5.5 h-5.5' />
                  </div>
                  <div>
                    <h3 className='font-heading font-bold text-2xl text-white'>Flipz Market</h3>
                    <p className='text-accent-cyan text-xs font-semibold tracking-wider uppercase font-body mt-0.5'>Ready-to-wear essentials</p>
                  </div>
                </div>
                <span className='text-xs font-semibold text-gray-500 font-heading bg-white/5 px-3 py-1 rounded-full'>From ₹499</span>
              </div>

              <p className='text-gray-400 font-body text-sm leading-relaxed mb-8'>
                Our standard streetwear catalog features ultra-comfortable hoodies, heavy-weight cotton tees, and premium everyday activewear. Built for the daily grind with durability and style.
              </p>

              <ul className='space-y-4 mb-10'>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent-cyan/15 flex items-center justify-center text-accent-cyan'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Ready-made streetwear essentials
                </li>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent-cyan/15 flex items-center justify-center text-accent-cyan'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Affordable starting price-point
                </li>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent-cyan/15 flex items-center justify-center text-accent-cyan'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Fast, guaranteed 2-day dispatch
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/collection')}
              className='w-full py-4 px-6 rounded-2xl bg-white text-black font-heading font-bold text-sm flex items-center justify-center gap-2 hover:bg-accent-cyan hover:text-black transition-all group-hover:scale-[1.01] cursor-pointer'
            >
              Shop Marketwear <ArrowRight className='w-4 h-4' />
            </button>
          </motion.div>

          {/* Card B: Flipz Signature */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='bg-glass border border-accent/20 hover:border-accent/50 rounded-[24px] p-8 md:p-10 flex flex-col justify-between group transition-all duration-500 shadow-2xl relative glow-purple'
          >
            {/* Ambient inner card purple glow */}
            <div className='absolute right-0 top-0 w-48 h-48 bg-accent/5 rounded-bl-full pointer-events-none blur-3xl'></div>
            
            <div>
              <div className='flex items-center justify-between pb-6 border-b border-white/5 mb-8'>
                <div className='flex items-center gap-3'>
                  <div className='w-12 h-12 rounded-2xl bg-accent/25 border border-accent/30 flex items-center justify-center text-accent animate-pulse'>
                    <Sparkles className='w-5.5 h-5.5' />
                  </div>
                  <div>
                    <h3 className='font-heading font-bold text-2xl text-white'>Flipz Signature</h3>
                    <p className='text-accent text-xs font-semibold tracking-wider uppercase font-body mt-0.5'>Premium creator prints</p>
                  </div>
                </div>
                <span className='text-xs font-semibold text-accent font-heading bg-accent/15 px-3 py-1 rounded-full border border-accent/30'>Creator Royalties Included</span>
              </div>

              <p className='text-gray-400 font-body text-sm leading-relaxed mb-8'>
                Unlock exclusive collector merchandise featuring original graphics designed by independent global artists. Crafted with luxury-grade double-brushed cotton and custom embroidery.
              </p>

              <ul className='space-y-4 mb-10'>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Premium artwork curated by certified designers
                </li>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Limited-edition runs (Numbered labels)
                </li>
                <li className='flex items-center gap-3 text-sm text-gray-300 font-body'>
                  <div className='w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent'><Check className='w-3 h-3 stroke-[3]' /></div>
                  Support artists: direct royalty on every purchase
                </li>
              </ul>
            </div>

            <button
              onClick={() => navigate('/collection?type=signature')}
              className='w-full py-4 px-6 rounded-2xl bg-gradient-purple-cyan text-white font-heading font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 hover:scale-[1.01] transition-all cursor-pointer'
            >
              Explore Signature Drops <Sparkles className='w-4 h-4 text-accent-cyan' />
            </button>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default MarketSignatureSection
