import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItems from '../components/ProductItems';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showfilter, setShowfilter] = useState(false);
  const [filterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavant');

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
       setSubCategory(prev => [...prev, e.target.value])
    }
  }

  const applyfilter = () => {
    let productsCopy = products.slice();
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProduct(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProduct.slice();
    switch(sortType) {
      case 'low-high':
        setFilterProduct(fpCopy.sort((a,b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProduct(fpCopy.sort((a,b) => (b.price - a.price)));
        break;
      default:
        applyfilter(); 
        break; 
    }
  }

  useEffect(() => {
    applyfilter()
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct()
  }, [sortType])

  useEffect(() => {
    setSubCategory(prev => prev.filter(sub => {
      if (sub === 'Set') {
        return category.includes("Gen alpha") || category.length === 0;
      }
      return true;
    }));
  }, [category]);

  return (
    <div className='flex flex-col sm:flex-row gap-6 sm:gap-10 pt-8 border-t border-slate-100 font-sans-editorial animate-fade-in'>
      
      {/* Filter Options Sidebar */}
      <div className='min-w-64 space-y-4'>
        <button  
          onClick={() => setShowfilter(!showfilter)} 
          className='w-full text-xs font-heading font-extrabold tracking-wider uppercase text-slate-900 flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50 sm:bg-transparent border sm:border-none border-slate-200/80 cursor-pointer'
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-orange-500" />
            FILTERS
          </span>
          <ChevronDown className={`w-4 h-4 sm:hidden transition-transform duration-300 ${showfilter ? 'rotate-180' : ''}`} />
        </button>

        {/* Category Filter */}
        <div className={`border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs ${showfilter ? 'block' : 'hidden'} sm:block space-y-3`}>
          <p className='text-xs font-heading font-bold tracking-wider text-slate-900 uppercase'>CATEGORIES</p>
          <div className='flex flex-col gap-2.5 text-xs font-medium text-slate-700'>
            {['Men', 'Women', 'Gen alpha'].map((cat) => (
              <label key={cat} className='flex items-center gap-2.5 cursor-pointer hover:text-slate-950 transition-colors select-none'>
                <input 
                  className='w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500/20 cursor-pointer' 
                  type='checkbox' 
                  value={cat} 
                  onChange={toggleCategory}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-slate-200/80 bg-white rounded-2xl p-5 shadow-xs ${showfilter ? 'block' : 'hidden'} sm:block space-y-3`}>
          <p className='text-xs font-heading font-bold tracking-wider text-slate-900 uppercase'>TYPE</p>
          <div className='flex flex-col gap-2.5 text-xs font-medium text-slate-700'>
            {['Topwear', 'Bottomwear'].map((sub) => (
              <label key={sub} className='flex items-center gap-2.5 cursor-pointer hover:text-slate-950 transition-colors select-none'>
                <input 
                  className='w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500/20 cursor-pointer' 
                  type='checkbox' 
                  value={sub} 
                  checked={subCategory.includes(sub)} 
                  onChange={toggleSubCategory}
                />
                <span>{sub}</span>
              </label>
            ))}

            {(category.includes('Gen alpha') || category.length === 0) && (
              <label className='flex items-center gap-2.5 cursor-pointer hover:text-slate-950 transition-colors select-none'>
                <input 
                  className='w-4 h-4 rounded border-slate-300 text-orange-500 focus:ring-orange-500/20 cursor-pointer' 
                  type='checkbox' 
                  value={'Set'} 
                  checked={subCategory.includes('Set')} 
                  onChange={toggleSubCategory}
                />
                <span>Set</span>
              </label>
            )}
          </div>
        </div>
      </div>

      {/* Right Product Grid Column */}
      <div className='flex-1 space-y-6'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4'>
          <Title text1={"ALL"} text2={"COLLECTION"} />

          {/* Product Sort Dropdown */}
          <div className="relative">
            <select 
              onChange={(e) => setSortType(e.target.value)} 
              className='appearance-none border border-slate-200 bg-white rounded-xl px-4 py-2.5 pr-8 text-xs font-heading font-bold text-slate-800 shadow-xs outline-none focus:border-orange-500 cursor-pointer'
            >
              <option value="relavant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Price Low to High</option>
              <option value="high-low">Sort by: Price High to Low</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Products Grid */}
        {filterProduct.length > 0 ? (
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
            {filterProduct.map((item, index) => (
              <ProductItems 
                key={index} 
                name={item.name} 
                id={item._id} 
                price={item.price} 
                image={item.image} 
                designerName={item.designerName}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 space-y-3">
            <p className="font-heading font-bold text-base text-slate-800">No products match your filters</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">Try resetting your category or type selections to explore more items.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Collection