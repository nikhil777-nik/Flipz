import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Trash2, ShoppingBag, Sparkles } from 'lucide-react';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { currency, products, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item]
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products])

  return (
    <div className='pt-10 border-t border-slate-100 text-left pb-20 animate-fade-in'>
      {/* Title */}
      <div className='mb-8 pb-4 flex items-center justify-between border-b border-slate-100'>
        <h2 className='text-2xl font-heading font-black text-slate-800 uppercase tracking-wider flex items-center gap-3'>
          <ShoppingBag className='w-6 h-6 text-indigo-500 animate-pulse' /> 
          Your <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500'>Shopping Cart</span>
        </h2>
        <span className='text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-widest'>
          {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Cart List */}
      {cartData.length === 0 ? (
        <div className='text-center py-20 border border-slate-200/60 rounded-3xl text-slate-500 bg-white shadow-lg shadow-slate-100/50 max-w-lg mx-auto my-10 animate-fade-in'>
          <div className='relative w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 animate-float'>
            <ShoppingBag className='w-10 h-10 stroke-[1.5]' />
            <span className='absolute top-2 right-2 w-3.5 h-3.5 bg-pink-500 rounded-full animate-ping'></span>
          </div>
          <h3 className='text-lg font-bold text-slate-800 mb-2'>Your cart is feeling light</h3>
          <p className='text-sm text-slate-400 mb-8 max-w-xs mx-auto leading-relaxed'>Add some premium streetwear to your collection and make it stand out.</p>
          <button
            onClick={() => navigate('/collection')}
            className='inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/25 cursor-pointer'
          >
            Explore Store Collections
          </button>
        </div>
      ) : (
        <div className='space-y-6'>
          <div className='space-y-4'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null;
              const isSignature = productData.price >= 180;

              return (
                <div
                  key={index}
                  className='p-5 bg-white border border-slate-100 rounded-2xl flex items-center justify-between gap-4 sm:gap-6 hover:border-indigo-100 transition-all hover:shadow-md hover:-translate-y-0.5 duration-300'
                >
                  <div className='flex items-start gap-4 sm:gap-5 flex-1 min-w-0'>
                    <img
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-slate-50 border border-slate-100 shadow-sm"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div className='min-w-0 flex-1 pt-1'>
                      <h3 className='text-sm sm:text-base font-heading font-extrabold text-slate-800 hover:text-indigo-600 transition-colors truncate flex items-center gap-2 cursor-pointer' onClick={() => navigate(`/product/${item._id}`)}>
                        {productData.name}
                        {isSignature && <Sparkles className='w-4 h-4 text-indigo-500 animate-pulse' />}
                      </h3>
                      <div className='flex items-center gap-4 mt-3'>
                        <p className='text-base font-black text-slate-900'>{currency}{productData.price.toLocaleString()}</p>
                        <span className='text-[10px] px-3 py-1 rounded-lg bg-slate-50 border border-slate-200/50 text-slate-600 font-bold font-body uppercase tracking-wider'>{item.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 sm:gap-8'>
                    <input
                      className="w-14 bg-slate-50 border border-slate-200 text-slate-800 px-2 py-2 rounded-xl text-center font-bold text-sm outline-none focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all"
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                    />

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-slate-400 hover:text-rose-500 p-2.5 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Totals Section */}
          <div className='flex justify-end pt-8'>
            <div className='w-full sm:w-[450px] space-y-6'>
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className='w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 font-heading font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]'
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
