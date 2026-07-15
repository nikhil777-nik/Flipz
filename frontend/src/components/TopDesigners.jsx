import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, UserPlus, UserCheck, Flame, Award, DollarSign } from 'lucide-react'

const designersData = [
  {
    id: 'des_1',
    name: 'Kira D.',
    handle: '@kira_designs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    followers: '28.4K',
    sales: '1,420',
    royalties: '₹3,40,500',
    specialty: 'Graphic Hoodies',
    glow: 'from-purple-500/10 to-indigo-500/10'
  },
  {
    id: 'des_2',
    name: 'AstroArt',
    handle: '@astro_wear',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    followers: '42.1K',
    sales: '2,900',
    royalties: '₹6,96,000',
    specialty: 'Futuristic Tees',
    glow: 'from-cyan-500/10 to-blue-500/10'
  },
  {
    id: 'des_3',
    name: 'CyberVibe',
    handle: '@cybervibe',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    followers: '19.8K',
    sales: '940',
    royalties: '₹2,25,600',
    specialty: 'Cyberpunk Jackets',
    glow: 'from-pink-500/10 to-rose-500/10'
  },
  {
    id: 'des_4',
    name: 'SantiWear',
    handle: '@santi_cuts',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    followers: '31.2K',
    sales: '1,850',
    royalties: '₹4,44,000',
    specialty: 'Oversized Styles',
    glow: 'from-orange-500/10 to-yellow-500/10'
  }
]

const TopDesigners = () => {
  const [following, setFollowing] = useState({})

  const toggleFollow = (id) => {
    setFollowing(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  return (
    <div id="designers-section" className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex flex-col md:flex-row md:items-end justify-between mb-16'>
          <div className='text-left'>
            <span className='text-accent-cyan font-bold tracking-widest text-xs uppercase font-heading'>CREATIVE ELITE</span>
            <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
              Meet the Designers
            </h2>
          </div>
          <p className='text-gray-400 text-sm font-body max-w-sm mt-4 md:mt-0 text-left md:text-right'>
            Every purchase pays royalties directly to the artist. Powering the creator economy.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {designersData.map((designer, idx) => {
            const isFollowing = following[designer.id]

            return (
              <motion.div
                key={designer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='bg-glass border border-white/5 hover:border-white/15 rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between group shadow-xl'
              >
                {/* Glow Background effect */}
                <div className={`absolute -right-12 -bottom-12 w-32 h-32 rounded-full bg-gradient-to-br ${designer.glow} blur-2xl group-hover:scale-150 transition-transform duration-500`}></div>

                <div>
                  {/* Top line with Avatar and verification */}
                  <div className='flex items-start justify-between'>
                    <div className='relative'>
                      <img 
                        src={designer.avatar} 
                        alt={designer.name} 
                        className='w-16 h-16 rounded-2xl object-cover border border-white/10 group-hover:border-accent-cyan/40 transition-colors'
                      />
                      <span className='absolute -bottom-1 -right-1 bg-accent-cyan text-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-black font-extrabold text-[8px]'>
                        ✓
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFollow(designer.id)}
                      className={`py-1.5 px-3.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isFollowing 
                          ? 'border-accent-cyan bg-accent-cyan/10 text-accent-cyan' 
                          : 'border-white/15 bg-white/5 text-gray-300 hover:bg-white/10 hover:border-white/30'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className='w-3.5 h-3.5' /> Following
                        </>
                      ) : (
                        <>
                          <UserPlus className='w-3.5 h-3.5' /> Follow
                        </>
                      )}
                    </button>
                  </div>

                  {/* Name & Specialty */}
                  <div className='text-left mt-5'>
                    <h3 className='font-heading font-bold text-white text-lg tracking-tight group-hover:text-accent-cyan transition-colors'>
                      {designer.name}
                    </h3>
                    <p className='text-gray-400 text-xs font-body mt-0.5'>{designer.handle}</p>
                    
                    <span className='inline-block text-[9px] font-bold text-accent tracking-wider font-heading uppercase bg-accent/10 px-2 py-0.5 border border-accent/20 rounded mt-3.5'>
                      {designer.specialty}
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className='grid grid-cols-3 gap-2 mt-8 pt-4 border-t border-white/5 text-left relative z-10'>
                  <div>
                    <p className='text-[10px] text-gray-500 font-body uppercase font-semibold'>Followers</p>
                    <p className='font-heading font-bold text-white text-sm mt-0.5'>{designer.followers}</p>
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500 font-body uppercase font-semibold'>Sales</p>
                    <p className='font-heading font-bold text-white text-sm mt-0.5'>{designer.sales}</p>
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500 font-body uppercase font-semibold'>Royalties</p>
                    <p className='font-heading font-bold text-accent-cyan text-sm mt-0.5'>{designer.royalties}</p>
                  </div>
                </div>

              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TopDesigners
