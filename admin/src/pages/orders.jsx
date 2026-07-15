import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

  const [Orders, setOrders] = useState([])
  // 1. Fetch Orders
  const fetchorders = async () => {
    if (!token) {
      toast.error('You must be logged in to view your orders')
      return null
    }
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
      // console.log(response.data)
      if (response.data.success) {
        setOrders(response.data.data.reverse())
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
      if (response.data.success) {
        toast.success('Order status updated successfully')
        await fetchorders()
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchorders()
  }, [token])
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">Order Management</h3>
      <div className="flex flex-col gap-4">
        {Orders.map((order, index) => {
          return (
            <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-slate-200 bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200 text-xs sm:text-sm text-slate-600" key={index}>
              <div className="flex justify-center sm:justify-start">
                <img className="w-12 h-12 object-contain" src={assets.parcel_icon} alt='Parcel Icon' />
              </div>
              
              <div className="space-y-3">
                <div className="font-semibold text-slate-800">
                  {order.items.map((item, idx) => {
                    if (idx === order.items.length - 1) {
                      return <span key={idx}> {item.name} x {item.quantity} <span className="text-indigo-600 font-medium">({item.size})</span></span>
                    } else {
                      return <span key={idx}> {item.name} x {item.quantity} <span className="text-indigo-600 font-medium">({item.size})</span>, </span>
                    }
                  })}
                </div>
                {order.address && (
                  <div className="border-t border-slate-100 pt-2">
                    <p className="font-semibold text-slate-700" >{(order.address.firstname || '') + " " + (order.address.lastname || '')}</p>
                    <div className="text-slate-500 mt-1 space-y-0.5">
                      <p>{order.address?.street}</p>
                      <p>{(order.address?.city || '') + ", " + (order.address?.state || '') + ", " + (order.address?.country || '') + ", " + (order.address?.zip || '')}</p>
                      <p className="mt-1 font-medium text-slate-600">{order.address?.phone}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5 border-t sm:border-t-0 pt-3 sm:pt-0">
                <p className="text-sm font-medium text-slate-700" >Items: {order.items.length}</p>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Method:</span>
                  <span className="font-semibold text-slate-700 uppercase text-xs">{order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400">Payment:</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${order.payment ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>
                    {order.payment ? 'Done' : 'Pending'}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>Date:</span>
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>
                <div className="font-bold text-slate-800 text-base sm:text-lg border-t sm:border-t-0 pt-3 sm:pt-0">
                {currency}{order.amount}
              </div>
              </div>
              

              <div className="border-t sm:border-t-0 pt-3 sm:pt-0">
                <select 
                  onChange={(event) => statusHandler(event, order._id)} 
                  value={order.status} 
                  className="w-full p-2 font-medium bg-slate-50 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-xs sm:text-sm text-slate-700 cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out For Delivery">Out For Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

          )
        })}
      </div>
    </div>
  )
}

export default Orders