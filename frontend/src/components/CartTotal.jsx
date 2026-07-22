import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    const shippingFee = getCartAmount() === 0 ? 0 : delivery_fee;
    const total = getCartAmount() === 0 ? 0 : getCartAmount() + shippingFee;

  return (
    <div className='w-full bg-white border border-slate-200/80 rounded-2xl p-6 text-left shadow-xs font-sans-editorial space-y-5'>
        <div className='pb-3 border-b border-slate-100'>
            <h3 className='font-heading font-extrabold text-sm text-slate-950 uppercase tracking-wider'>
              ORDER SUMMARY
            </h3>
        </div>
        <div className='space-y-3.5 text-xs font-medium text-slate-600'>
            <div className='flex justify-between items-center'>
                <p>Subtotal</p>
                <p className='text-slate-900 font-bold font-heading'>{currency}{getCartAmount().toLocaleString()}.00</p>
            </div>
            <div className='flex justify-between items-center'>
                <p>Shipping Logistics</p>
                <p className='text-slate-900 font-bold font-heading'>{currency}{shippingFee.toLocaleString()}.00</p>
            </div>
            <div className='pt-3 border-t border-slate-100 flex justify-between items-center text-sm'>
                <p className='text-slate-950 font-extrabold font-heading'>Total</p> 
                <p className='text-slate-950 font-extrabold font-heading text-xl'>{currency}{total.toLocaleString()}.00</p>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
