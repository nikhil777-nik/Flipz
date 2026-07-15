import React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Rohan Sharma',
    handle: '@rohan_fits',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
    stars: 5,
    text: 'The print quality on AstroArt\'s hoodie is incredible. The heavy fabric feels premium and the graphics haven\'t cracked after multiple washes. Getting to support independent creators is the best part!'
  },
  {
    name: 'Aisha Patel',
    handle: '@aisha_wear',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    stars: 5,
    text: 'Upgraded to a CyberVibe oversized tee and got so many compliments on campus. The fit is perfect and the materials feel high-end, similar to luxury streetwear brands that cost triple.'
  },
  {
    name: 'Vikram Singh',
    handle: '@vik_street',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    stars: 5,
    text: 'Fast shipping for the Marketwear hoodies, and the Signature series is next level. FLIPZ royalty dashboard concept makes me feel confident that my purchase actually rewards the artist.'
  }
]

const CustomerReviews = () => {
  return (
    <div className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4'>
        
        <div className='text-center max-w-2xl mx-auto mb-16'>
          <span className='text-accent font-bold tracking-widest text-xs uppercase font-heading'>TESTIMONIALS</span>
          <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
            What Creators & Buyers Say
          </h2>
        </div>

        <div className='grid md:grid-cols-3 gap-6 md:gap-8'>
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className='bg-glass border border-white/5 rounded-[24px] p-6 text-left relative flex flex-col justify-between group shadow-xl hover:border-white/10 transition-colors'
            >
              <Quote className='absolute right-6 top-6 w-8 h-8 text-white/5 group-hover:text-accent-cyan/10 transition-colors pointer-events-none' />

              <div>
                {/* Stars */}
                <div className='flex items-center text-yellow-500 gap-0.5 mb-4'>
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className='w-4 h-4 fill-yellow-500 stroke-none' />
                  ))}
                </div>

                <p className='text-gray-300 font-body text-xs leading-relaxed mb-6 italic'>
                  "{rev.text}"
                </p>
              </div>

              {/* User details */}
              <div className='flex items-center gap-3 mt-4 pt-4 border-t border-white/5'>
                <img 
                  src={rev.avatar} 
                  alt={rev.name} 
                  className='w-9 h-9 rounded-full object-cover border border-white/10'
                />
                <div>
                  <h4 className='font-heading font-bold text-white text-xs'>{rev.name}</h4>
                  <p className='text-[10px] text-gray-500 font-body mt-0.5'>{rev.handle}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CustomerReviews
