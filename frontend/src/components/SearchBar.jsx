import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { X, Search } from 'lucide-react'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const location = useLocation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
       if (location.pathname.includes('collection')) {
        setVisible(true);
       } else {
        setVisible(false);
       }
    }, [location]);

  return showSearch && visible ? (
    <div className='py-4 px-4 bg-slate-900/5 backdrop-blur-md border-y border-slate-200/80 text-center animate-fade-in my-2'>
      <div className='inline-flex items-center justify-between border border-slate-200/90 bg-white/90 backdrop-blur-xl px-5 py-2.5 rounded-full w-full max-w-xl shadow-md transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20'> 
        <div className="flex items-center gap-3 flex-1">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            className='w-full outline-none bg-transparent text-sm text-slate-900 placeholder:text-slate-400 font-sans-editorial font-medium' 
            type='text' 
            placeholder='Search products, collections, artists...'
          />
        </div>
        <button 
          onClick={() => setShowSearch(false)}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors shrink-0 cursor-pointer ml-2"
          aria-label="Close Search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  ) : null
}

export default SearchBar
