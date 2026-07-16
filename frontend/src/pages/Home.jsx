import React, { useContext, useState, useMemo } from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import { ShopContext } from '../context/ShopContext'
import ProductItems from '../components/ProductItems'
import Title from '../components/Title'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
  const { products } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'creator'
  const [activeSubTab, setActiveSubTab] = useState('bestseller'); // 'new' | 'bestseller' | 'men' | 'women' | 'kids' | 'seasonal'

  // Filter official products (no designer)
  const officialProducts = useMemo(() => {
    return products.filter(item => !item.designerId && !item.designerName);
  }, [products]);

  // Filter creator products (uploaded by community)
  const creatorProducts = useMemo(() => {
    return products.filter(item => item.designerId || item.designerName);
  }, [products]);

  // Sub-tabs products calculations
  const displayedProducts = useMemo(() => {
    if (activeTab === 'creator') {
      return creatorProducts;
    }
    
    switch (activeSubTab) {
      case 'new':
        return officialProducts.slice().sort((a, b) => b.date - a.date).slice(0, 10);
      case 'bestseller':
        return officialProducts.filter(item => item.bestseller).slice(0, 10);
      case 'men':
        return officialProducts.filter(item => item.category === 'Men');
      case 'women':
        return officialProducts.filter(item => item.category === 'Women');
      case 'kids':
        return officialProducts.filter(item => item.category === 'Gen alpha');
      case 'seasonal':
        return officialProducts.filter(item => 
          item.subCategory === 'Set' || 
          item.name.toLowerCase().includes('linen') || 
          item.name.toLowerCase().includes('cotton') || 
          item.price > 1200
        ).slice(0, 10);
      default:
        return officialProducts.slice(0, 10);
    }
  }, [activeTab, activeSubTab, officialProducts, creatorProducts]);

  // Active sub-tab title and description
  const subTabMeta = useMemo(() => {
    switch (activeSubTab) {
      case 'new':
        return {
          title1: 'NEW',
          title2: 'ARRIVALS',
          desc: 'Explore our latest official arrivals, featuring fresh designs and premium fabrics crafted for maximum comfort and style.'
        };
      case 'bestseller':
        return {
          title1: 'BEST',
          title2: 'SELLERS',
          desc: 'Browse our most popular, high-demand official classics. These customer favorites are top-rated for comfort and fit.'
        };
      case 'men':
        return {
          title1: 'MENS',
          title2: 'COLLECTION',
          desc: 'Premium streetwear and everyday apparel curated exclusively for men. Engineered with high-quality fits and materials.'
        };
      case 'women':
        return {
          title1: 'WOMENS',
          title2: 'COLLECTION',
          desc: 'Elevated silhouettes, premium fabrics, and contemporary streetwear designed specifically for women.'
        };
      case 'kids':
        return {
          title1: 'KIDS',
          title2: 'COLLECTION',
          desc: 'Durable, ultra-comfortable, and stylish street apparel made for the next generation of style creators.'
        };
      case 'seasonal':
        return {
          title1: 'SEASONAL',
          title2: 'CURATIONS',
          desc: 'Handpicked selections tailored for the current season, from light cotton layouts to heavy comfort wear.'
        };
      default:
        return {
          title1: 'LATEST',
          title2: 'COLLECTION',
          desc: 'Explore our latest official arrivals.'
        };
    }
  }, [activeSubTab]);

  return (
    <div className="space-y-6">
      <Hero />
      
      {/* Premium Sticky Toggle Bar */}
      <div className="sticky top-0 z-40 py-4 bg-white border-b border-slate-100/80 -mx-4 px-4 sm:-mx-[5vw] sm:px-[5vw] md:-mx-[7vw] md:px-[7vw] lg:-mx-[9vw] lg:px-[9vw] flex justify-center transition-all duration-300 shadow-sm shadow-slate-100/40">
        <div className="bg-slate-100/90 backdrop-blur-xl border border-slate-200/60 rounded-2xl p-1 flex items-center justify-between shadow-[0_10px_25px_rgba(0,0,0,0.04)] relative max-w-md w-full">
          <button 
            onClick={() => setActiveTab('shop')} 
            className={`flex-1 py-3 text-center text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'shop' ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>🛍️</span> Shop Collection
          </button>
          <button 
            onClick={() => {
              setActiveTab('creator');
              setActiveSubTab('new');
            }} 
            className={`flex-1 py-3 text-center text-xs sm:text-sm font-extrabold rounded-xl transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'creator' ? 'text-white' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <span>🎨</span> Creator Collection
          </button>
          
          {/* Sliding indicator */}
          <motion.div 
            className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-xl shadow-[0_4px_15px_rgba(99,102,241,0.35)]"
            animate={{
              x: activeTab === 'shop' ? 0 : '100%',
            }}
            style={{
              width: 'calc(50% - 4px)'
            }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          />
        </div>
      </div>

      {/* Main Content Area with Fade/Slide Animations */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'shop' ? (
            <motion.div
              key="shop-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Shop Sub-tabs */}
              <div className="flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto pb-4 my-2">
                {[
                  { id: 'new', label: '🌟 New Arrivals' },
                  { id: 'bestseller', label: '🔥 Best Sellers' },
                  { id: 'men', label: "🧔 Men's" },
                  { id: 'women', label: "👩 Women's" },
                  { id: 'kids', label: '🧸 Kids' },
                  { id: 'seasonal', label: '🍂 Seasonal' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveSubTab(tab.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                      activeSubTab === tab.id
                        ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Title & Description */}
              <div className='text-center py-8 text-3xl animate-fade-in'>
                <Title text1={subTabMeta.title1} text2={subTabMeta.title2}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-500 mt-2 font-semibold leading-relaxed max-w-2xl'>
                  {subTabMeta.desc}
                </p>
              </div>

              {/* Grid of official products */}
              {products.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : displayedProducts.length === 0 ? (
                <div className="text-center py-20 text-slate-400 font-bold">
                  No products found in this category.
                </div>
              ) : (
                <motion.div 
                  key={activeSubTab}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                >
                  {displayedProducts.map((item, index) => (
                    <ProductItems 
                      key={index} 
                      id={item._id} 
                      image={item.image} 
                      name={item.name}
                      price={item.price} 
                      designerName={item.designerName}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="creator-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              {/* Creator Program Glassmorphic Info Banner */}
              <div className="bg-gradient-to-br from-indigo-950/5 via-purple-950/5 to-pink-950/5 border border-indigo-500/15 rounded-3xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -z-10 group-hover:scale-125 transition-transform duration-700"></div>
                
                <div className="flex flex-col lg:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <span className="bg-indigo-600 text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-[0_4px_12px_rgba(99,102,241,0.2)]">Community Marketplace</span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-3 tracking-tight">Flipz Creator Program</h2>
                    <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-semibold">
                      Discover unique streetwear designed by creators worldwide. Every purchase pays royalties directly to the artist. Flipz handles manufacturing, logistics, and returns while creators receive their royalties after successful delivery and return period.
                    </p>
                  </div>
                  
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:border-indigo-400/20 transition-all duration-300">
                      <div className="text-xl">🎨</div>
                      <h4 className="font-extrabold text-slate-800 text-sm mt-1">1. Upload Design</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1">Creators upload designs & set their own royalty rate.</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:border-purple-400/20 transition-all duration-300">
                      <div className="text-xl">🛠️</div>
                      <h4 className="font-extrabold text-slate-800 text-sm mt-1">2. Flipz Fulfils</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1">We handle printing, shipping, and customer support.</p>
                    </div>
                    <div className="bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm hover:shadow-md hover:border-pink-400/20 transition-all duration-300">
                      <div className="text-xl">💰</div>
                      <h4 className="font-extrabold text-slate-800 text-sm mt-1">3. Get Paid</h4>
                      <p className="text-[11px] text-slate-500 font-semibold mt-1">Receive royalty after delivery and return period ends.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className='text-center py-8 text-3xl animate-fade-in'>
                <Title text1={'CREATOR'} text2={'COLLECTION'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-slate-500 mt-2 font-semibold leading-relaxed max-w-2xl'>
                  Browse clothing designs uploaded by the community. Shop styles, support creators, and grow the artist economy.
                </p>
              </div>

              {/* Grid of creator products */}
              {products.length === 0 ? (
                <div className="flex justify-center items-center py-20">
                  <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : displayedProducts.length === 0 ? (
                <div className="text-center py-20 text-slate-400 font-bold">
                  No creator designs published yet. Be the first to publish!
                </div>
              ) : (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                  {displayedProducts.map((item, index) => (
                    <ProductItems 
                      key={index} 
                      id={item._id} 
                      image={item.image} 
                      name={item.name}
                      price={item.price} 
                      designerName={item.designerName}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <OurPolicy />
      <NewsLetterBox />
    </div>
  )
}

export default Home
