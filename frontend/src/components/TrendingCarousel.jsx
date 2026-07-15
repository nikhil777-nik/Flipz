import React, { useContext, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShopContext } from '../context/ShopContext'
import { Heart, Star, ShoppingBag, Eye, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const mockDesigners = [
  { name: 'AstroArt', handle: '@astro_wear', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80', royalty: '15%' },
  { name: 'CyberVibe', handle: '@cybervibe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80', royalty: '18%' },
  { name: 'Kira D.', handle: '@kira_designs', avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80', royalty: '20%' },
  { name: 'SantiWear', handle: '@santi_cuts', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', royalty: '16%' }
]

const TrendingCarousel = () => {
  const { products, currency, wishlist, toggleWishlist, addToCart } = useContext(ShopContext)
  const [quickViewProduct, setQuickViewProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const sliderRef = useRef(null)

  // Filter trending (e.g. best sellers or first 10 products)
  const trending = products.slice(0, 10)

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current
      const scrollAmount = clientWidth * 0.75
      sliderRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  // Get matched designer based on index
  const getProductDesigner = (idx) => {
    return mockDesigners[idx % mockDesigners.length]
  }

  return (
    <div className='py-20 relative'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-end justify-between mb-10'>
          <div>
            <span className='text-accent-cyan font-bold tracking-widest text-xs uppercase font-heading'>CRAVED LOOKS</span>
            <h2 className='text-3xl md:text-4xl font-heading font-extrabold text-white mt-2'>
              Trending Streetwear
            </h2>
          </div>
          <div className='flex items-center gap-3'>
            <button 
              onClick={() => scroll('left')}
              className='w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-accent-cyan/30 text-gray-400 hover:text-white transition-all flex items-center justify-center cursor-pointer'
            >
              <ArrowLeft className='w-5 h-5' />
            </button>
            <button 
              onClick={() => scroll('right')}
              className='w-11 h-11 rounded-full bg-white/5 border border-white/5 hover:border-accent-cyan/30 text-gray-400 hover:text-white transition-all flex items-center justify-center cursor-pointer'
            >
              <ArrowRight className='w-5 h-5' />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div 
          ref={sliderRef}
          className='flex items-stretch gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pr-4 select-none scroll-smooth'
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trending.map((product, index) => {
            const designer = getProductDesigner(index)
            const isWishlisted = wishlist.includes(product._id)

            return (
              <div 
                key={product._id} 
                className='w-[280px] md:w-[320px] shrink-0 snap-start bg-glass border border-white/5 hover:border-white/10 rounded-[20px] overflow-hidden flex flex-col justify-between group transition-all duration-300 relative'
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleWishlist(product._id); }}
                  className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full ${isWishlisted ? 'bg-accent text-white' : 'bg-black/50 text-gray-400 hover:text-white'} border border-white/10 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>

                {/* Product Image & Quick View Trigger */}
                <div className='relative aspect-[3/4] bg-black overflow-hidden'>
                  <img 
                    src={product.image[0]} 
                    alt={product.name} 
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                  />
                  <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]'>
                    <button
                      onClick={() => { setQuickViewProduct(product); setSelectedSize(''); }}
                      className='py-2.5 px-5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-accent-cyan transition-colors cursor-pointer shadow-lg'
                    >
                      <Eye className='w-4.5 h-4.5' /> Quick View
                    </button>
                  </div>
                </div>

                {/* Details Section */}
                <div className='p-5 flex flex-col justify-between flex-1'>
                  {/* Designer Credit */}
                  <div className='flex items-center gap-2 mb-3.5'>
                    <img 
                      src={designer.avatar} 
                      alt={designer.name} 
                      className='w-6 h-6 rounded-full object-cover border border-white/10'
                    />
                    <div className='text-left'>
                      <p className='text-xs text-gray-400 font-body font-semibold hover:text-accent transition-colors cursor-pointer'>{designer.handle}</p>
                    </div>
                    <span className='ml-auto text-[9px] text-accent-cyan font-bold font-heading uppercase bg-accent-cyan/15 px-2 py-0.5 rounded border border-accent-cyan/20'>
                      verified
                    </span>
                  </div>

                  <div>
                    <h3 className='font-heading font-semibold text-white text-sm tracking-tight text-left line-clamp-1 group-hover:text-accent-cyan transition-colors'>
                      {product.name}
                    </h3>
                    <div className='flex items-center gap-1.5 mt-2'>
                      <div className='flex items-center text-yellow-500'>
                        <Star className='w-3 h-3 fill-yellow-500' />
                        <Star className='w-3 h-3 fill-yellow-500' />
                        <Star className='w-3 h-3 fill-yellow-500' />
                        <Star className='w-3 h-3 fill-yellow-500' />
                        <Star className='w-3 h-3 text-gray-600' />
                      </div>
                      <span className='text-[10px] text-gray-400 font-medium font-body'>(4.2)</span>
                    </div>
                  </div>

                  {/* Pricing and Cart */}
                  <div className='flex items-center justify-between mt-5 pt-3 border-t border-white/5'>
                    <div>
                      <p className='text-xs text-gray-500 font-body'>Price</p>
                      <p className='font-heading font-bold text-white text-base'>{currency}{product.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(product._id, product.sizes[0] || 'M')}
                      className='w-9.5 h-9.5 rounded-xl bg-white/5 hover:bg-accent hover:text-white text-gray-300 border border-white/10 flex items-center justify-center transition-all cursor-pointer'
                    >
                      <ShoppingBag className='w-4.5 h-4.5' />
                    </button>
                  </div>
                </div>

              </div>
            )
          })}
        </div>
      </div>

      {/* Quick View Modal Overlay */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className='fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md'>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className='w-full max-w-4xl bg-card-dark border border-white/10 rounded-[24px] overflow-hidden shadow-2xl relative grid md:grid-cols-2'
            >
              {/* Close Button */}
              <button 
                onClick={() => setQuickViewProduct(null)}
                className='absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center border border-white/5 transition-colors cursor-pointer'
              >
                <X className='w-5 h-5' />
              </button>

              {/* Product Image Column */}
              <div className='bg-black aspect-square md:aspect-auto md:h-full relative overflow-hidden flex items-center justify-center'>
                <img 
                  src={quickViewProduct.image[0]} 
                  alt={quickViewProduct.name} 
                  className='w-full h-full object-cover'
                />
              </div>

              {/* Product Details Column */}
              <div className='p-6 md:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto'>
                <div>
                  <span className='text-xs font-semibold text-accent-cyan bg-accent-cyan/15 px-3 py-1 rounded-full border border-accent-cyan/20 uppercase tracking-widest font-heading'>
                    Trending drop
                  </span>
                  
                  <h2 className='text-2xl font-heading font-extrabold text-white mt-4 leading-tight'>
                    {quickViewProduct.name}
                  </h2>

                  <div className='flex items-center gap-3 mt-4 pb-4 border-b border-white/5'>
                    <div className='flex items-center text-yellow-500'>
                      <Star className='w-3.5 h-3.5 fill-yellow-500' />
                      <span className='text-xs text-white font-semibold font-body ml-1'>4.8</span>
                    </div>
                    <span className='text-xs text-gray-500'>&bull;</span>
                    <span className='text-xs text-gray-400 font-medium'>148 reviews</span>
                    <span className='text-xs text-gray-500'>&bull;</span>
                    <span className='text-xs text-accent font-semibold flex items-center gap-1'>
                      <Sparkles className='w-3 h-3 text-accent-cyan' /> 15% Royalties to Creator
                    </span>
                  </div>

                  <p className='text-3xl font-heading font-extrabold text-white mt-5'>
                    {currency}{quickViewProduct.price}
                  </p>

                  <p className='text-gray-400 font-body text-xs leading-relaxed mt-4'>
                    {quickViewProduct.description || "Premium streetwear garment engineered from 420gsm heavy-weight cotton loops. Pre-shrunk with reinforced ribbing on wrists and waist hem."}
                  </p>

                  {/* Size Selector */}
                  <div className='mt-6'>
                    <p className='text-xs text-gray-400 font-semibold mb-3'>Select Size</p>
                    <div className='flex gap-2.5'>
                      {quickViewProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-11 h-11 rounded-xl border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                            selectedSize === size 
                              ? 'border-accent-cyan bg-accent-cyan text-black shadow-lg shadow-accent-cyan/20' 
                              : 'border-white/15 bg-white/5 text-gray-300 hover:border-white/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className='mt-8 pt-6 border-t border-white/5 flex gap-4'>
                  <button
                    onClick={() => {
                      addToCart(quickViewProduct._id, selectedSize || quickViewProduct.sizes[0] || 'M');
                      setQuickViewProduct(null);
                    }}
                    className='flex-1 py-4 px-6 rounded-2xl bg-white text-black hover:bg-accent-cyan hover:text-black font-heading font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-accent-cyan/10'
                  >
                    <ShoppingBag className='w-4.5 h-4.5' /> Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      toggleWishlist(quickViewProduct._id);
                    }}
                    className={`p-4 rounded-2xl border ${
                      wishlist.includes(quickViewProduct._id) 
                        ? 'border-accent bg-accent/15 text-accent' 
                        : 'border-white/10 hover:border-white/30 text-gray-400 hover:text-white'
                    } flex items-center justify-center transition-colors cursor-pointer`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(quickViewProduct._id) ? 'fill-accent' : ''}`} />
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default TrendingCarousel
