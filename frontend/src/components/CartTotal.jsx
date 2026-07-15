import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const {currency,delivery_fee,getCartAmount,getCartCount}=useContext(ShopContext)
    const shippingFee = getCartAmount() === 0 ? 0 : delivery_fee;
    const total = getCartAmount() === 0 ? 0 : getCartAmount() + shippingFee;

  return (
    <div className='w-full bg-white border border-slate-100 rounded-3xl p-6 text-left shadow-lg shadow-slate-100/50'>
        <div className='pb-4 border-b border-slate-100 mb-6'>
            <h3 className='font-heading font-extrabold text-base text-slate-800 uppercase tracking-wider'>
              Order Summary
            </h3>
        </div>
        <div className='flex flex-col gap-4 text-xs font-body text-slate-500'>
            <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p className='text-slate-800 font-semibold'>{currency}{getCartAmount().toLocaleString()}.00</p>
            </div>
            <hr className='border-slate-100' />
            <div className='flex justify-between items-center'>
                <p>Shipping logistics</p>
                <p className='text-slate-800 font-semibold'>{currency}{shippingFee.toLocaleString()}.00</p>
            </div>
            <hr className='border-slate-100' />
            <div className='flex justify-between items-center text-sm pt-2'>
                <p className='text-slate-800 font-bold font-heading'>Estimated Total</p> 
                <p className='text-indigo-600 font-extrabold font-heading text-lg'>{currency}{total.toLocaleString()}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
