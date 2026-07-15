import React from 'react'
import { motion } from 'framer-motion'
import { Shirt, Scissors, Award, Gem, Compass } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const categories = [
  { name: 'T-Shirts', icon: Shirt, count: '12 Items', path: '/collection?subcategory=Topwear&search=t-shirt', color: 'from-purple-500/20 to-indigo-500/20' },
  { name: 'Hoodies', icon: Scissors, count: '8 Items', path: '/collection?subcategory=Topwear', color: 'from-pink-500/20 to-purple-500/20' },
  { name: 'Oversized', icon: Award, count: '6 Items', path: '/collection?subcategory=Topwear', color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Accessories', icon: Gem, count: '10 Items', path: '/collection?subcategory=Bottomwear', color: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'Custom Designs', icon: Compass, count: 'Special Drops', path: '/collection?type=signature', color: 'from-orange-500/20 to-pink-500/20' }
]

const CategoriesSection = () => {
  const navigate = useNavigate()

  return (
    <div className='py-20'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-12'>
          <div>
            <span className='text-accent-cyan font-bold tracking-widest text-xs uppercase font-heading'>CURATED drops</span>
            <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
              Browse Categories
            </h2>
          </div>
          <p className='text-gray-400 text-sm font-body max-w-sm mt-4 md:mt-0'>
            Engineered with extreme comfort and premium materials, designed by creators around the globe.
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6'>
          {categories.map((cat, idx) => {
            const IconComponent = cat.icon
            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => navigate(cat.path)}
                className={`bg-glass border border-white/5 rounded-[20px] p-6 cursor-pointer flex flex-col justify-between h-48 relative overflow-hidden group hover:border-accent-cyan/30 transition-all duration-300 shadow-2xl`}
              >
                {/* Glow Background effect */}
                <div className={`absolute -right-10 -bottom-10 w-24 h-24 rounded-full bg-gradient-to-br ${cat.color} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>
                
                <div className='w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors'>
                  <IconComponent className='w-6 h-6 text-white group-hover:text-accent-cyan transition-colors' />
                </div>
                
                <div>
                  <h3 className='font-heading font-semibold text-white text-base'>{cat.name}</h3>
                  <p className='text-gray-400 text-xs font-body mt-1'>{cat.count}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CategoriesSection
