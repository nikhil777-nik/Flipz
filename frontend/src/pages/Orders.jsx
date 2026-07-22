import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import { Package, RefreshCw } from 'lucide-react'

const Orders = () => {
  const { currency, token, backendUrl } = useContext(ShopContext)
  const [orderData, setOrderData] = useState([])

  const fetchOrderData = async () => {
    try {
      if (!token) {
        return null
      }

      const res = await axios.post(backendUrl + "/api/order/userorders", {}, { headers: { token } })
      if (res.data.success) {
        let allOrdersItem = [] 
        res.data.data.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
        toast.error("Failed to fetch orders")
    }
  }

  useEffect(() => {
    fetchOrderData();
  }, [token])

  return (
    <div className='border-t border-slate-100 pt-8 text-left font-sans-editorial animate-fade-in space-y-8 pb-20'>
      <div className='pb-2 border-b border-slate-100 flex items-center justify-between'>
        <Title text1={'MY'} text2={'ORDERS'} />
        <button 
          onClick={fetchOrderData}
          className="text-xs font-heading font-bold text-slate-600 hover:text-slate-950 flex items-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          REFRESH
        </button>
      </div>

      <div className='space-y-4'>
        {orderData.length === 0 ? (
          <div className="text-center py-20 border border-slate-200/80 rounded-2xl bg-white p-8 space-y-3">
            <Package className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-heading font-bold text-base text-slate-900">No orders placed yet</p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">When you purchase items from Flipz, your tracking details will appear here.</p>
          </div>
        ) : (
          orderData.map((item, index) => (
            <div key={index} className='p-5 bg-white border border-slate-200/80 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-xs hover:border-slate-300 transition-all'>
              <div className='flex items-start gap-5 text-xs sm:text-sm flex-1 min-w-0'>
                <img 
                  className="w-20 h-24 object-cover rounded-xl bg-slate-50 border border-slate-100 shrink-0" 
                  src={item.image && item.image[0] ? item.image[0] : assets.logo} 
                  alt={item.name} 
                />
                <div className="space-y-1.5 min-w-0">
                  <p className='font-heading font-bold text-sm text-slate-950 truncate'>
                    {item.name}
                  </p>
                  <div className='flex items-center gap-3 text-xs text-slate-600'>
                    <span className='font-heading font-extrabold text-slate-950 text-base'>{currency}{item.price}</span>
                    <span className="text-slate-300">•</span>
                    <span>Qty: {item.quantity}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono-tag text-[10px] bg-slate-100 px-2.5 py-0.5 rounded-full font-bold">Size: {item.size}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                    <p>Date: <span className='font-medium text-slate-800'>{new Date(item.date).toDateString()}</span></p>
                    <p>Payment: <span className='font-mono-tag uppercase text-[10px] font-bold text-slate-800'>{item.paymentMethod}</span></p>
                  </div>
                </div> 
              </div>

              <div className='md:w-1/2 flex items-center justify-between sm:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-slate-100'>
                <div className='flex items-center gap-2 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1.5 rounded-full'>
                  <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse' />
                  <span className='text-xs font-mono-tag font-bold uppercase text-emerald-800 tracking-wider'>{item.status}</span>
                </div>
                
                <button 
                  onClick={fetchOrderData} 
                  className='border border-slate-200 bg-white hover:bg-slate-950 hover:text-white text-slate-900 px-5 py-2.5 text-xs font-heading font-extrabold uppercase tracking-wider rounded-full transition-all duration-300 shadow-xs cursor-pointer shrink-0'
                >
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Orders
