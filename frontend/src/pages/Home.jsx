import React, { useContext, useState, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItems from '../components/ProductItems'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion'
import heroSuit from '../assets/hero_suit.png'
import heroSuitBack from '../assets/hero_suit_back.png'

const Home = () => {
  const { products, navigate, token } = useContext(ShopContext);
  const [activeTab, setActiveTab] = useState('shop'); // 'shop' | 'creator'
  const [activeSubTab, setActiveSubTab] = useState('bestseller'); // 'new' | 'bestseller' | 'men' | 'women' | 'kids'
  const [activeEditorialCategory, setActiveEditorialCategory] = useState('Jacket');
  const [rotationAngle, setRotationAngle] = useState(0);

  const handleSpin360 = (e) => {
    if (e) e.stopPropagation();
    setRotationAngle(prev => prev + 360);
  };

  // Inertia Mouse 3D Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 180, damping: 16 });
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 180, damping: 16 });

  const handleHeroMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHeroFlipped(false);
  };

  // Filter official products (no designer)
  const officialProducts = useMemo(() => {
    return products.filter(item => !item.designerId && !item.designerName);
  }, [products]);

  // Filter creator products (uploaded by community)
  const creatorProducts = useMemo(() => {
    return products.filter(item => item.designerId || item.designerName);
  }, [products]);

  // Sub-tabs products calculations for the bottom directory
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
      default:
        return officialProducts.slice(0, 10);
    }
  }, [activeTab, activeSubTab, officialProducts, creatorProducts]);

  // Editorial Spotlight: Find a product dynamically matching the selected category from the active tab pool
  const editorialSpotlightProduct = useMemo(() => {
    if (!products || products.length === 0) return null;
    
    const pool = activeTab === 'creator' ? creatorProducts : officialProducts;
    
    const filtered = pool.filter(item => {
      const name = item.name.toLowerCase();
      const sub = item.subCategory?.toLowerCase() || '';
      
      switch (activeEditorialCategory) {
        case 'Shirt':
          return sub === 'topwear' || name.includes('shirt') || name.includes('top');
        case 'Jacket':
          return name.includes('jacket') || name.includes('hoodie') || name.includes('pullover') || sub === 'winterwear';
        case 'Jeans':
          return sub === 'bottomwear' || name.includes('jeans') || name.includes('pant');
        case 'Outer':
          return sub === 'winterwear' || name.includes('jacket') || name.includes('coat');
        case 'Shoes':
          return name.includes('shoe') || name.includes('sneaker') || name.includes('boot');
        default:
          return true;
      }
    });

    // Return matching product or null if none found in this pool/category
    const bestsellerMatch = filtered.find(item => item.bestseller);
    return bestsellerMatch || filtered[0] || null;
  }, [products, activeTab, activeEditorialCategory, officialProducts, creatorProducts]);

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
      default:
        return {
          title1: 'LATEST',
          title2: 'COLLECTION',
          desc: 'Explore our latest official arrivals.'
        };
    }
  }, [activeSubTab]);

  return (
    <div className="relative bg-white min-h-screen text-slate-850 overflow-hidden font-sans-editorial pb-12">
      
      {/* Background Editorial Grid Guidelines */}
      <div className="absolute inset-0 flex justify-between pointer-events-none px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] z-0">
        <div className="w-[1px] bg-slate-100/60 h-full"></div>
        <div className="w-[1px] bg-slate-100/60 h-full hidden sm:block"></div>
        <div className="w-[1px] bg-slate-100/60 h-full hidden md:block"></div>
        <div className="w-[1px] bg-slate-100/60 h-full hidden lg:block"></div>
        <div className="w-[1px] bg-slate-100/60 h-full"></div>
      </div>

      <div className="relative z-10 space-y-16">

        {/* Levitating Sticky Toggle Bar */}
        <div className="sticky top-6 z-50 flex justify-center pt-2 pointer-events-none">
          <div className="liquid-glass rounded-full p-1.5 flex items-center justify-between pointer-events-auto max-w-sm w-full relative">
            <button 
              onClick={() => setActiveTab('shop')} 
              className={`flex-1 py-2.5 text-center text-[10px] font-bold tracking-widest uppercase rounded-full transition-all duration-300 relative z-10 flex items-center justify-center cursor-pointer ${activeTab === 'shop' ? 'text-white font-semibold' : 'text-slate-500 hover:text-slate-905'}`}
            >
              Shop Edition
            </button>
            <button 
              onClick={() => {
                setActiveTab('creator');
                setActiveSubTab('new');
              }} 
              className={`flex-1 py-2.5 text-center text-[10px] font-bold tracking-widest uppercase rounded-full transition-all duration-300 relative z-10 flex items-center justify-center cursor-pointer ${activeTab === 'creator' ? 'text-white font-semibold' : 'text-slate-500 hover:text-slate-905'}`}
            >
              Creator Edition
            </button>
            
            {/* Sliding indicator */}
            <motion.div 
              className="absolute top-1.5 bottom-1.5 left-1.5 bg-slate-950/85 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_4px_12px_rgba(0,0,0,0.3)]"
              animate={{
                x: activeTab === 'shop' ? 0 : '100%',
              }}
              style={{
                width: 'calc(50% - 6px)'
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            />
          </div>
        </div>
        
        {/* Section 1: Editorial Hero Layout */}
        <AnimatePresence mode="wait">
          {activeTab === 'shop' ? (
            <motion.div
              key="shop-hero"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-stretch relative font-sans-editorial"
            >
              {/* Left Column (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex flex-col justify-between z-10 py-4"
              >
                {/* Big Title Left */}
                <div className="text-[12vw] lg:text-[7.5vw] leading-[0.85] text-slate-900 select-none font-display">
                  <div>where</div>
                  <div className="whitespace-nowrap">- style</div>
                </div>
                
                {/* Description & Label */}
                <div className="mt-8 lg:mt-16 space-y-4">
                  <div className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase font-mono-tag">
                    //FASHION
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed max-w-[280px]">
                    Explore curated collections exclusive drops and everyday essentials all thoughtfully designed in one stylish shopping destination.
                  </p>
                </div>

                {/* Season Code */}
                <div className="mt-8 lg:mt-16">
                  <div className="text-[10px] font-bold text-slate-800 tracking-wider font-mono-tag">
                    / New
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono-tag">
                    Collection 2026
                  </div>
                </div>
              </motion.div>

              {/* Center Column - Floating Editorial Composition with 45% Larger Model (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex justify-center items-center z-20 py-4 relative"
              >
                {/* Soft Glowing Editorial Aura */}
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-indigo-500/15 via-purple-500/20 to-pink-500/15 blur-3xl -z-10 pointer-events-none" />

                <div 
                  className="w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-[3/4.2] [perspective:1400px] relative group/model animate-float"
                  onMouseMove={handleHeroMouseMove}
                  onMouseLeave={handleHeroMouseLeave}
                >
                  {/* Floating Top Editorial Chip */}
                  <div className="absolute top-4 left-4 z-30 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-lg text-[9px] font-mono-tag font-bold tracking-[0.2em] text-slate-800 uppercase flex items-center gap-2 pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    EDITORIAL DROP '26
                  </div>

                  {/* Floating Bottom 360 Spin Trigger Button */}
                  <button 
                    type="button"
                    onClick={handleSpin360}
                    className="absolute bottom-4 right-4 z-30 px-4 py-2 rounded-full bg-slate-950/90 backdrop-blur-md border border-slate-700 shadow-2xl text-[9px] font-bold tracking-widest text-white uppercase flex items-center gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer font-mono-tag group/btn"
                  >
                    <span>360° SPIN</span> 
                    <span className="text-orange-400 font-bold group-hover/btn:rotate-180 transition-transform duration-700">↻</span>
                  </button>

                  <motion.div
                    className="relative w-full h-full [transform-style:preserve-3d] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] rounded-2xl overflow-hidden cursor-pointer"
                    onClick={handleSpin360}
                    animate={{ 
                      rotateY: rotationAngle
                    }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    style={{
                      rotateX: tiltX
                    }}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-slate-50/80 via-white to-slate-100/90 border border-white/90 p-3 shadow-inner [backface-visibility:hidden] flex items-center justify-center">
                      <img 
                        className="w-full h-full object-contain filter drop-shadow-xl pointer-events-none scale-110 group-hover/model:scale-115 transition-transform duration-700" 
                        src={heroSuit} 
                        alt="Flipz Model Showcase Front" 
                      />
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-slate-50/80 via-white to-slate-100/90 border border-white/90 p-3 shadow-inner [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center">
                      <img 
                        className="w-full h-full object-contain filter drop-shadow-xl pointer-events-none scale-110 group-hover/model:scale-115 transition-transform duration-700" 
                        src={heroSuitBack} 
                        alt="Flipz Model Showcase Back" 
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Column (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end text-left lg:text-right z-10 py-4 pl-0 lg:pl-4 lg:pr-6"
              >
                {/* Big Title Right */}
                <div className="text-[12vw] lg:text-[7.5vw] leading-[0.85] text-slate-900 select-none font-display w-full text-left lg:text-right">
                  <div>lives</div>
                  <div className="whitespace-nowrap">- now</div>
                </div>

                {/* Styled label */}
                <div className="mt-8 lg:mt-16 space-y-4 w-full flex flex-col items-start lg:items-end">
                  <div className="text-[9px] font-bold tracking-[0.25em] text-slate-400 uppercase leading-relaxed font-mono-tag">
                    //STYLED FOR<br/>LIFE.
                  </div>
                  
                  {/* Avatar stack */}
                  <div className="flex items-center gap-1 mt-2">
                    <img className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80" alt="" />
                    <img className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80" alt="" />
                    <button className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md hover:bg-orange-600 transition-colors">
                      +
                    </button>
                  </div>
                </div>

                {/* Graphic Accent & Members count */}
                <div className="mt-8 lg:mt-16 flex flex-col items-start lg:items-end gap-4 w-full">
                  {/* Orange Star Graphic */}
                  <div className="text-orange-500">
                    <svg className="w-5 h-5 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24">
                      <path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight font-heading">
                      12.4K+
                    </div>
                    <div className="text-[8px] font-bold text-slate-400 tracking-widest uppercase font-mono-tag">
                      HAPPY CUSTOMERS
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="creator-hero"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-stretch relative font-sans-editorial"
            >
              {/* Left Column (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex flex-col justify-between z-10 py-4"
              >
                {/* Big Title Left */}
                <div className="text-[12vw] lg:text-[7.5vw] font-bold leading-[0.85] tracking-tighter text-slate-900 select-none font-display">
                  <div>creative</div>
                  <div className="whitespace-nowrap">- minds</div>
                </div>
                
                {/* Description & Label */}
                <div className="mt-8 lg:mt-16 space-y-4">
                  <div className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase font-mono-tag">
                    //CREATOR LAB
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 font-semibold leading-relaxed max-w-[280px]">
                    Flipz Creator Collection hosts apparel artwork designed by independent global artists. Join the design movement today.
                  </p>
                </div>

                {/* Season Code */}
                <div className="mt-8 lg:mt-16">
                  <div className="text-[10px] font-bold text-slate-800 tracking-wider font-mono-tag">
                    / Artist
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tracking-wider font-mono-tag">
                    Drops &copy;2026
                  </div>
                </div>
              </motion.div>

              {/* Center Column - Floating Creator Model (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex justify-center items-center z-20 py-4 relative"
              >
                {/* Soft Aura */}
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-orange-500/15 via-purple-500/20 to-indigo-500/15 blur-3xl -z-10 pointer-events-none" />

                <div className="relative w-full max-w-[480px] sm:max-w-[520px] lg:max-w-[560px] aspect-[3/4.2] overflow-hidden rounded-2xl bg-white/90 border border-white/90 p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] animate-float">
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <img 
                      className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:brightness-100 transition-all duration-1000 scale-105 hover:scale-110" 
                      src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80" 
                      alt="Flipz Creator Showcase" 
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right Column (lg:col-span-4) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-4 flex flex-col justify-between items-start lg:items-end text-left lg:text-right z-10 py-4 pl-0 lg:pl-4 lg:pr-6"
              >
                {/* Big Title Right */}
                <div className="text-[12vw] lg:text-[7.5vw] font-bold leading-[0.85] tracking-tighter text-slate-900 select-none font-display w-full text-left lg:text-right">
                  <div>design</div>
                  <div className="whitespace-nowrap">- now</div>
                </div>

                {/* Styled label */}
                <div className="mt-8 lg:mt-16 space-y-4 w-full flex flex-col items-start lg:items-end">
                  <div className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase leading-relaxed font-mono-tag">
                    //DIRECT ARTIST<br/>ROYALTY.
                  </div>
                </div>

                {/* Graphic Accent & Members count */}
                <div className="mt-8 lg:mt-16 flex flex-col items-start lg:items-end gap-4 w-full">
                  {/* Orange Star Graphic */}
                  <div className="text-orange-500">
                    <svg className="w-5 h-5 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24">
                      <path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  
                  <div>
                    <div className="text-xl lg:text-2xl font-bold text-slate-800 tracking-tight font-heading">
                      1.2K+
                    </div>
                    <div className="text-[8px] font-bold text-slate-400 tracking-widest uppercase font-mono-tag">
                      ACTIVE DESIGNERS
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section 2: Infinite Partner Logo Ticker Marquee */}
        <div className="w-full bg-slate-950 text-white py-4 overflow-hidden border-y border-slate-950 shadow-sm">
          <div className="flex whitespace-nowrap animate-marquee">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex gap-12 md:gap-16 text-[10px] tracking-[0.3em] font-sans-editorial font-bold uppercase items-center px-4">
                <span>✦ NIKE</span>
                <span>✦ ADIDAS</span>
                <span>✦ ZARA</span>
                <span>✦ H&M</span>
                <span>✦ UNIQLO</span>
                <span>✦ LEVI'S</span>
                <span>✦ PUMA</span>
                <span>✦ CALVIN KLEIN</span>
                <span>✦ TOMMY HILFIGER</span>
                <span>✦ RALPH LAUREN</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: "All - about moments ©26" Storytelling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="py-8 relative"
        >
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <svg className="w-4 h-4 text-orange-500 fill-current animate-[spin_10s_linear_infinite]" viewBox="0 0 24 24">
                  <path d="M12 0v24M0 12h24M3.5 3.5l17 17M20.5 3.5l-17 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <span className="font-sans-editorial font-bold tracking-[0.25em] text-[10px] text-orange-500 uppercase">
                  {activeTab === 'creator' ? 'Artist story' : 'Featured story'}
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-slate-900 leading-tight">
                {activeTab === 'creator' ? 'All - about creation ©26' : 'All - about moments ©26'}
              </h2>
            </div>
            <p className="font-sans-editorial text-slate-500 text-xs sm:text-sm tracking-wider leading-relaxed max-w-sm mt-4 md:mt-0 font-medium">
              {activeTab === 'creator' 
                ? 'We connect independent designers directly with collectors. Support the artist economy with custom prints.'
                : 'We curate everyday styles to fit premium wardrobes. Browse signature items designed to tell a distinct brand story.'
              }
            </p>
          </div>

          {/* Asymmetric Storytelling Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Column A (Lookbook Poster with Cut-Corner Octagonal Chamfer Mask) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-4 flex flex-col justify-between border border-slate-100 p-4 bg-slate-50/30 rounded-sm relative"
            >
              <div className="relative aspect-[3/4.2] w-full bg-slate-100 overflow-hidden mb-4 clip-chamfer-lg shadow-md group">
                
                {/* Orange 4-Petal Flower Emblem Graphic on Top-Left */}
                <div className="absolute top-2 left-2 z-20 pointer-events-none">
                  <svg className="w-9 h-9 text-orange-500 fill-current filter drop-shadow-md" viewBox="0 0 24 24">
                    <path d="M12 2a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm0 12a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm-6-6a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4zm12 0a4 4 0 0 1 4 4 4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4z"/>
                  </svg>
                </div>

                <img 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                  src={activeTab === 'creator' 
                    ? "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80"
                    : "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
                  } 
                  alt="Styling model lookbook" 
                />

                {/* Horizontal Split-Gap Line across center */}
                <div className="absolute top-1/2 left-0 w-full h-2 bg-white/90 shadow-sm transform -translate-y-1/2 z-10"></div>
              </div>

              <div>
                <div className="font-sans-editorial text-[10px] tracking-wide text-slate-800 font-semibold mb-4">
                  &copy;International - going distance 2026
                </div>
                <button 
                  onClick={() => {
                    if (activeTab === 'creator') {
                      token ? navigate('/myprofile') : navigate('/login');
                    } else {
                      navigate('/collection');
                    }
                  }} 
                  className="w-full py-3.5 border border-slate-900 text-slate-900 text-xs font-bold tracking-widest uppercase hover:bg-slate-900 hover:text-white transition-all duration-300 rounded-sm flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {activeTab === 'creator' ? 'Submit Design' : 'Learn More'}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </motion.div>

            {/* Column B (Interactive Category Directory & Live Product Spotlight) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="md:col-span-5 grid grid-cols-1 sm:grid-cols-12 gap-6 border border-slate-100 p-5 bg-white shadow-sm rounded-sm"
            >
              
              {/* Category Selector List */}
              <div className="sm:col-span-5 flex flex-col justify-center space-y-4 font-sans-editorial">
                {[
                  { id: 'Shirt', label: 'Shirt' },
                  { id: 'Jacket', label: 'Jacket' },
                  { id: 'Jeans', label: 'Jeans' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveEditorialCategory(item.id)}
                    className={`text-left pb-2 border-b transition-all duration-300 group flex justify-between items-baseline cursor-pointer ${
                      activeEditorialCategory === item.id 
                        ? 'border-slate-900 text-slate-900 font-bold scale-102' 
                        : 'border-slate-100 text-slate-400 hover:text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-editorial text-sm tracking-wide">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Spotlight Product Display */}
              <div className="sm:col-span-7 flex flex-col justify-between font-sans-editorial">
                {editorialSpotlightProduct ? (
                  <div 
                    onClick={() => navigate(`/product/${editorialSpotlightProduct._id}`)} 
                    className="group cursor-pointer flex flex-col justify-between h-full p-2 hover:bg-slate-50/50 transition-colors duration-300 rounded-sm"
                  >
                    <div className="relative aspect-[3/3.8] bg-slate-50 overflow-hidden mb-4 clip-chamfer border border-slate-100">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={editorialSpotlightProduct.image[0]} 
                        alt={editorialSpotlightProduct.name} 
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900 text-white text-[7px] font-bold tracking-widest px-2 py-0.5 uppercase rounded-sm">
                        {activeTab === 'creator' ? 'CREATOR DROP' : 'OVERSIZED FIT'}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-orange-500 text-white text-[7px] font-bold tracking-widest px-2 py-0.5 uppercase rounded-sm">
                        SPOTLIGHT
                      </div>
                    </div>
                    <div>
                      <h4 className="font-editorial text-xs font-semibold text-slate-800 truncate mb-1 group-hover:text-slate-950">
                        {editorialSpotlightProduct.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        <span className="font-editorial text-xs text-slate-900 font-semibold tracking-wider">
                          ( ₹{editorialSpotlightProduct.price} )
                        </span>
                        <span className="text-[9px] font-bold text-slate-800 tracking-wider uppercase group-hover:underline">
                          Buy Now &rarr;
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col justify-between h-full p-4 bg-slate-50/60 border border-dashed border-slate-200 rounded-sm font-sans-editorial text-center">
                    <div className="flex flex-col items-center justify-center my-auto py-6">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold mb-3 shadow-md">
                        ✦
                      </div>
                      <h4 className="font-editorial text-sm font-bold text-slate-900 tracking-wide uppercase">
                        Be First To Upload
                      </h4>
                      <p className="font-sans-editorial text-[10px] text-slate-500 font-medium mt-2 max-w-[200px] leading-relaxed">
                        No design listed in {activeEditorialCategory} yet. Submit your custom apparel art and earn royalties on every sale!
                      </p>
                    </div>
                    <button 
                      onClick={() => token ? navigate('/myprofile') : navigate('/login')} 
                      className="w-full py-2.5 bg-slate-900 text-white text-[9px] font-bold tracking-widest uppercase rounded-sm hover:bg-slate-800 transition-colors shadow-sm cursor-pointer mt-2"
                    >
                      Be First To Upload &rarr;
                    </button>
                  </div>
                )}
              </div>

            </motion.div>

            {/* Column C (Customer Review & Secondary Lookbook Poster) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="md:col-span-3 flex flex-col justify-between gap-6"
            >
              
              {/* Testimonial Panel */}
              <div className="bg-slate-50/60 border border-slate-100 rounded-sm p-6 flex flex-col justify-between h-full relative">
                <div className="flex items-center gap-0.5 mb-4 text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="font-sans-editorial text-[8px] text-slate-400 font-bold ml-1 tracking-widest">(5.0 REVIEW)</span>
                </div>
                
                <p className="font-sans-editorial text-slate-700 text-[11px] font-semibold leading-relaxed tracking-wide italic mb-6">
                  {activeTab === 'creator'
                    ? "Supporting independent designers directly through direct artist payout royalty program. Completely transformed my shopping logic!"
                    : "Everything is absolutely perfect! From the fabric quality to the flawless fit, every piece feels premium. This brand has completely transformed my wardrobe."
                  }
                </p>
                
                <div className="flex items-center gap-2.5 pt-4 border-t border-slate-200/60 font-sans-editorial">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" 
                    alt="Olivia" 
                    className="w-7 h-7 rounded-full object-cover border border-slate-100"
                  />
                  <div>
                    <h5 className="font-editorial text-[11px] font-semibold text-slate-800">Olivia</h5>
                    <p className="font-sans-editorial text-[8px] text-slate-400 font-bold tracking-widest uppercase">Customer</p>
                  </div>
                </div>
              </div>

              {/* Secondary Lookbook Photo with Cut-Corner Polygon Mask */}
              <div>
                <div className="relative aspect-[3/3.2] w-full bg-slate-50 clip-chamfer border border-slate-100 shadow-sm overflow-hidden group">
                  <img 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80" 
                    alt="Lookbook details" 
                  />
                </div>
                <div className="font-sans-editorial text-[10px] tracking-wide text-slate-800 font-semibold mt-2">
                  &copy;International - just do it 2026
                </div>
              </div>

            </motion.div>

          </div>
        </motion.div>

        {/* Section 4: Creator Program Storyboard */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 border-t border-slate-100 bg-slate-50/20 -mx-4 px-4 sm:-mx-[5vw] sm:px-[5vw] md:-mx-[7vw] md:px-[7vw] lg:-mx-[9vw] lg:px-[9vw] relative"
        >
          
          {/* Section gridlines overlay */}
          <div className="absolute inset-0 flex justify-between pointer-events-none px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] z-0">
            <div className="w-[1px] bg-slate-100/60 h-full"></div>
            <div className="w-[1px] bg-slate-100/60 h-full hidden sm:block"></div>
            <div className="w-[1px] bg-slate-100/60 h-full hidden md:block"></div>
            <div className="w-[1px] bg-slate-100/60 h-full hidden lg:block"></div>
            <div className="w-[1px] bg-slate-100/60 h-full"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10 px-4">
            
            <div className="text-center max-w-2xl mx-auto mb-10 font-sans-editorial">
              <span className="bg-slate-900 text-white text-[8px] font-bold px-3 py-1 tracking-[0.25em] uppercase rounded-sm">
                Independent Artist Network
              </span>
              <h3 className="font-editorial text-2xl sm:text-4xl text-slate-900 font-medium mt-4 tracking-tight">
                Flipz Creator Program
              </h3>
              <p className="font-sans-editorial text-slate-500 text-xs sm:text-sm font-medium tracking-wide mt-3 leading-relaxed">
                Discover unique designs created by independent fashion designers globally. Every purchase rewards artists with direct royalty payouts, while Flipz handles logistics.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto font-sans-editorial">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-slate-100/80 p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1 text-slate-800">🎨</div>
                <h4 className="font-editorial text-xs font-bold text-slate-800 uppercase tracking-widest">1. Upload Design</h4>
                <p className="font-sans-editorial text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed">Publish apparel artwork & set your royalty rates.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-slate-100/80 p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1 text-slate-800">⚙️</div>
                <h4 className="font-editorial text-xs font-bold text-slate-800 uppercase tracking-widest">2. Flipz Fulfils</h4>
                <p className="font-sans-editorial text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed">We handle manufacturing, high-quality printing & logistics.</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-slate-100/80 p-5 rounded-sm shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-2xl mb-1 text-slate-800">💰</div>
                <h4 className="font-editorial text-xs font-bold text-slate-800 uppercase tracking-widest">3. Get Royalties</h4>
                <p className="font-sans-editorial text-[10px] text-slate-500 font-medium mt-1.5 leading-relaxed">Payouts are sent directly after dispatch/delivery windows close.</p>
              </motion.div>
            </div>

          </div>
        </motion.div>

        {/* Section 5: The Editorial Product Directory / Shop catalog */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="py-4 border-t border-slate-100 font-sans-editorial"
        >
          
          {/* Sub-tabs directory header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-8 pb-4 border-b border-slate-100 font-sans-editorial">
            <div>
              <span className="font-sans-editorial font-bold text-[10px] tracking-[0.25em] text-slate-400 uppercase">FLIPZ DIRECTORY</span>
              <h3 className="font-editorial text-2xl tracking-wide font-medium text-slate-900 mt-1">
                The Editorial <span className="text-slate-400 font-normal">Catalog</span>
              </h3>
            </div>
            
            {/* Catalog Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mt-4 sm:mt-0">
              {[
                { id: 'bestseller', label: 'Bestsellers' },
                { id: 'new', label: 'New Arrivals' },
                { id: 'men', label: "Men" },
                { id: 'women', label: "Women" },
                { id: 'kids', label: 'Kids' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab('shop');
                    setActiveSubTab(tab.id);
                  }}
                  className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    activeSubTab === tab.id && activeTab === 'shop'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => {
                  setActiveTab('creator');
                }}
                className={`px-3 py-1.5 rounded-sm text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                  activeTab === 'creator'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-slate-850'
                }`}
              >
                🎨 Creators
              </button>
x            </div>
          </div>

          {/* Description summary */}
          <p className="font-sans-editorial text-slate-500 text-[11px] font-medium tracking-wide max-w-xl mb-8 -mt-2">
            {activeTab === 'creator' 
              ? 'Browse clothing designs uploaded by the community. Shop styles, support creators, and grow the artist economy.'
              : subTabMeta.desc
            }
          </p>

          {/* Product Items Grid */}
          {products.length === 0 ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-8 h-8 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20 text-slate-400 font-semibold text-xs tracking-wider border border-dashed border-slate-100">
              No products found in this directory segment.
            </div>
          ) : (
            <motion.div 
              key={`${activeTab}-${activeSubTab}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 font-sans-editorial"
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

        {/* Policies and Newsletter updated with scroll storytelling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-100 pt-10"
        >
          <OurPolicy />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.6 }}
          className="border-t border-slate-100 pt-10"
        >
          <NewsLetterBox />
        </motion.div>

      </div>

    </div>
  )
}

export default Home
