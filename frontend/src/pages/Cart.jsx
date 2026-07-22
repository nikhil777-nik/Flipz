import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <div className='pt-8 border-t border-slate-100 text-left pb-20 font-sans-editorial animate-fade-in space-y-8'>
      {/* Title */}
      <div className='pb-4 flex items-center justify-between border-b border-slate-100'>
        <h2 className='text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-3'>
          <ShoppingBag className='w-6 h-6 text-orange-500' /> 
          YOUR SHOPPING CART
        </h2>
        <span className='text-xs font-mono-tag font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-full uppercase tracking-widest'>
          {cartData.length} {cartData.length === 1 ? 'ITEM' : 'ITEMS'}
        </span>
      </div>

      {/* Cart List */}
      {cartData.length === 0 ? (
        <div className='text-center py-20 border border-slate-200/80 rounded-2xl text-slate-500 bg-white shadow-xs max-w-lg mx-auto my-10 animate-fade-in p-8 space-y-4'>
          <div className='w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-slate-50 text-slate-800 border border-slate-200/60 shadow-inner'>
            <ShoppingBag className='w-9 h-9 stroke-[1.5]' />
          </div>
          <h3 className='text-lg font-heading font-bold text-slate-900'>Your cart is empty</h3>
          <p className='text-xs text-slate-500 max-w-xs mx-auto leading-relaxed'>Add curated fashion pieces to your bag and refine your wardrobe.</p>
          <button
            onClick={() => navigate('/collection')}
            className='inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-slate-950 hover:bg-orange-500 text-white font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer'
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className='space-y-8'>
          <div className='space-y-4'>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id)
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className='p-5 bg-white border border-slate-200/80 rounded-2xl flex items-center justify-between gap-4 sm:gap-6 hover:border-slate-300 transition-all shadow-xs duration-300'
                >
                  <div className='flex items-center gap-4 sm:gap-5 flex-1 min-w-0'>
                    <img
                      className="w-20 h-24 sm:w-24 sm:h-28 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div className='min-w-0 flex-1 space-y-1.5'>
                      <h3 
                        className='text-sm sm:text-base font-heading font-bold text-slate-900 hover:text-orange-500 transition-colors truncate cursor-pointer' 
                        onClick={() => navigate(`/product/${item._id}`)}
                      >
                        {productData.name}
                      </h3>
                      <div className='flex items-center gap-3'>
                        <p className='text-base font-heading font-extrabold text-slate-950'>{currency}{productData.price.toLocaleString()}</p>
                        <span className='text-[10px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-mono-tag font-bold uppercase tracking-wider'>Size: {item.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center gap-4 sm:gap-6 shrink-0'>
                    <input
                      className="w-14 bg-slate-50 border border-slate-200 text-slate-900 px-2 py-2 rounded-xl text-center font-heading font-bold text-xs outline-none focus:border-orange-500 focus:bg-white transition-all"
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item._id, item.size, Number(e.target.value))}
                    />

                    <button
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="text-slate-400 hover:text-rose-500 p-2.5 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Totals Section */}
          <div className='flex justify-end pt-4'>
            <div className='w-full sm:w-[450px] space-y-6'>
              <CartTotal />
              <button
                onClick={() => navigate('/place-order')}
                className='w-full py-4 px-6 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.98]'
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
