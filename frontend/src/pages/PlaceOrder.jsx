import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { Truck, CreditCard, Check } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [formdata, setformdata] = useState({
    firstname:'',
    lastname:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zip:'',
    country:'',
    phone:'',
  })

  const onchangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setformdata(data => ({
      ...data,
      [name]: value
    }))
  }

  const initPayment = async (order, orderId) => {
    var options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Flipz Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      handler: async (response) => {
        try {
          const res = await axios.post(backendUrl + '/api/order/verifyRazorpay', {
            orderId,
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature
          }, { headers: { token } })
          if (res.data.success) {
            setCartItems({})
            toast.success("Payment Successful")
            navigate('/orders')
          } else {
            toast.error(res.data.message)
            navigate('/cart')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
          navigate('/cart')
        }
      },
    }
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      let orderItems = []

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
    
      let orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            toast.success(response.data.message)
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            toast.success('Redirecting to Stripe payment...')
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            initPayment(responseRazorpay.data.order, responseRazorpay.data.orderId)
          } else {
            toast.error(responseRazorpay.data.message)
          }
          break;

        default:
          break;
      }
     } catch (error) {
       console.log(error)
       toast.error(error.message)
     }
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col lg:flex-row justify-between gap-10 pt-8 text-left min-h-[75vh] font-sans-editorial animate-fade-in'>
      
      {/* Delivery Information Column */}
      <div className='flex flex-col gap-4 w-full lg:max-w-[500px] space-y-2'>
        <div className='mb-4 border-b border-slate-100 pb-3'>
          <h2 className='text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-3'>
            <Truck className='w-6 h-6 text-orange-500' /> 
            SHIPPING DETAILS
          </h2>
        </div>
        
        <div className='flex gap-3'>
          <input name='firstname' value={formdata.firstname} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='First name' required />
          <input name='lastname' value={formdata.lastname} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='Last name' required />
        </div>
        <input name='email' value={formdata.email} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="email" placeholder='Email address' required />
        <input name='street' value={formdata.street} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='Street Address' required />
        
        <div className='flex gap-3'>
          <input name='city' value={formdata.city} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='City' required />
          <input name='state' value={formdata.state} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='State' required />
        </div>
        
        <div className='flex gap-3'>
          <input name='zip' value={formdata.zip} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="number" placeholder='Zip Code' required />
          <input name='country' value={formdata.country} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="text" placeholder='Country' required />
        </div>
        <input name='phone' value={formdata.phone} onChange={onchangehandler} className="bg-white border border-slate-200/90 text-xs sm:text-sm py-3.5 px-4 rounded-xl w-full text-slate-900 placeholder:text-slate-400 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-xs" type="number" placeholder='Phone Number' required />
      </div>

      {/* Checkout Summary & Payment Method */}
      <div className='flex-1 max-w-lg space-y-8'>
        
        {/* Totals */}
        <CartTotal />

        {/* Payment Methods */}
        <div className="space-y-4">
          <div className='pb-3 border-b border-slate-100'>
            <h2 className='text-sm font-heading font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-2'>
              <CreditCard className='w-4 h-4 text-orange-500' /> PAYMENT METHOD
            </h2>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            
            {/* Stripe */}
            <div 
              onClick={() => setMethod('stripe')} 
              className={`flex items-center justify-between bg-white border p-3.5 rounded-2xl cursor-pointer transition-all ${
                method === 'stripe' ? 'border-orange-500 bg-orange-500/5 text-slate-950 ring-2 ring-orange-500/20 shadow-xs' : 'border-slate-200/80 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className='flex items-center gap-2.5'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === 'stripe' ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'}`}>
                  {method === 'stripe' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <img className='h-4' src={assets.stripe_logo} alt="Stripe" />
              </div>
            </div>

            {/* Razorpay */}
            <div 
              onClick={() => setMethod('razorpay')} 
              className={`flex items-center justify-between bg-white border p-3.5 rounded-2xl cursor-pointer transition-all ${
                method === 'razorpay' ? 'border-orange-500 bg-orange-500/5 text-slate-950 ring-2 ring-orange-500/20 shadow-xs' : 'border-slate-200/80 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className='flex items-center gap-2.5'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === 'razorpay' ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'}`}>
                  {method === 'razorpay' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
              </div>
            </div>

            {/* COD */}
            <div 
              onClick={() => setMethod('cod')} 
              className={`flex items-center justify-between bg-white border p-3.5 rounded-2xl cursor-pointer transition-all ${
                method === 'cod' ? 'border-orange-500 bg-orange-500/5 text-slate-950 ring-2 ring-orange-500/20 shadow-xs' : 'border-slate-200/80 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div className='flex items-center gap-2.5'>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${method === 'cod' ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'}`}>
                  {method === 'cod' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className='text-[10px] font-heading font-bold text-slate-900 uppercase tracking-wider'>Cash on Delivery</span>
              </div>
            </div>

          </div>
        </div>

        {/* Place Order CTA */}
        <div className='pt-2'>
          <button 
            type='submit'
            className='w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-sm tracking-wider uppercase transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-[0.98]'
          >
            CONFIRM & PLACE ORDER
          </button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
