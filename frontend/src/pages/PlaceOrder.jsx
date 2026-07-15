import React, { useContext, useState } from 'react'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { Truck, CreditCard, Landmark, Check, Receipt } from 'lucide-react'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, currency, getCartCount, products } = useContext(ShopContext)
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

  const onchangehandler=(e)=>{
    const name =e.target.name;
    const value =e.target.value;

    setformdata(data=>({
      ...data,
      [name]:value
    }))
  }

  const initPayment =async(order, orderId)=>{
    var options= {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Order Payment',
      description:'Order Payment',
      order_id:order.id,
      handler :async(response)=>{
        console.log("Razorpay Response on Frontend:", response);
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
    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    if (!token) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    try{
      let orderItems= []

      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item]>0){
            const itemInfo =structuredClone(products.find(product=>product._id===items))
            if(itemInfo){
              itemInfo.size=item;
              itemInfo.quantity=cartItems[items][item];
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

        //API Calls For Payment Methods

        //Cash On Delivery 
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          if(response.data.success){
            setCartItems({})
            toast.success(response.data.message)
            navigate('/orders')
          } else {
            toast.error(response.data.message)
          }
          break;

        //Stripe Payment Method
        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } })
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data
            toast.success('Order placed successfully')
            window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
          break;

        //Razorpay Payment Method
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
    <form onSubmit={onSubmitHandler} className='flex flex-col md:flex-row justify-between gap-10 pt-6 text-left min-h-[80vh] animate-fade-in'>
      
      {/* Delivery Information Column */}
      <div className='flex flex-col gap-5 w-full md:max-w-[500px]'>
        <div className='mb-6 border-b border-slate-100 pb-4'>
          <h2 className='text-xl md:text-2xl font-heading font-black text-slate-800 uppercase tracking-wider flex items-center gap-2'>
            <Truck className='w-5.5 h-5.5 text-indigo-500' /> Shipping Details
          </h2>
        </div>
        
        <div className='flex gap-3'>
          <input name='firstname' value={formdata.firstname} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='First name' required />
          <input name='lastname' value={formdata.lastname} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='Last name' required />
        </div>
        <input name='email' value={formdata.email} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="email" placeholder='Email address' required />
        <input name='street' value={formdata.street} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='Street Address' required />
        
        <div className='flex gap-3'>
          <input name='city' value={formdata.city} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='City' required />
          <input name='state' value={formdata.state} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='State' required />
        </div>
        
        <div className='flex gap-3'>
          <input name='zip' value={formdata.zip} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="number" placeholder='Zip Code' required />
          <input name='country' value={formdata.country} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="text" placeholder='Country' required />
        </div>
        <input name='phone' value={formdata.phone} onChange={onchangehandler} className="bg-white border border-slate-200 text-xs md:text-sm py-3 px-4 rounded-xl w-full text-slate-800 placeholder-slate-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all shadow-sm" type="number" placeholder='Phone Number' required />
      </div>

      {/* Checkout Totals & Payment Method */}
      <div className='flex-1 max-w-lg md:pl-8'>
        
        {/* Totals */}
        <div className='min-w-80 mb-10'>
          <CartTotal />
        </div>

        {/* Payment Methods */}
        <div>
          <div className='mb-6 border-b border-slate-100 pb-4'>
            <h2 className='text-base md:text-lg font-heading font-black text-slate-800 uppercase tracking-wider flex items-center gap-2'>
              <CreditCard className='w-5 h-5 text-pink-500' /> Payment Method
            </h2>
          </div>

          <div className='grid sm:grid-cols-3 gap-3'>
            
            {/* Stripe */}
            <div 
              onClick={() => setMethod('stripe')} 
              className={`flex items-center justify-between bg-white border p-4 rounded-xl cursor-pointer transition-all ${
                method === 'stripe' ? 'border-indigo-500 bg-indigo-50/20 text-indigo-900 shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-500 shadow-sm'
              }`}
            >
              <div className='flex items-center gap-2'>
                <p className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${method === 'stripe' ? 'border-indigo-500' : 'border-slate-300'}`}>
                  {method === 'stripe' && <span className='w-2 h-2 rounded-full bg-indigo-500'></span>}
                </p>
                <img className='h-4' src={assets.stripe_logo} alt="Stripe" />
              </div>
            </div>

            {/* Razorpay */}
            <div 
              onClick={() => setMethod('razorpay')} 
              className={`flex items-center justify-between bg-white border p-4 rounded-xl cursor-pointer transition-all ${
                method === 'razorpay' ? 'border-pink-500 bg-pink-50/20 text-pink-900 shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-500 shadow-sm'
              }`}
            >
              <div className='flex items-center gap-2'>
                <p className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${method === 'razorpay' ? 'border-pink-500' : 'border-slate-300'}`}>
                  {method === 'razorpay' && <span className='w-2 h-2 rounded-full bg-pink-500'></span>}
                </p>
                <img className='h-4' src={assets.razorpay_logo} alt="Razorpay" />
              </div>
            </div>

            {/* COD */}
            <div 
              onClick={() => setMethod('cod')} 
              className={`flex items-center justify-between bg-white border p-4 rounded-xl cursor-pointer transition-all ${
                method === 'cod' ? 'border-slate-800 bg-slate-50 text-slate-900 shadow-sm' : 'border-slate-200 hover:border-slate-300 text-slate-500 shadow-sm'
              }`}
            >
              <div className='flex items-center gap-2'>
                <p className={`w-3.5 h-3.5 border rounded-full flex items-center justify-center ${method === 'cod' ? 'border-slate-800' : 'border-slate-300'}`}>
                  {method === 'cod' && <span className='w-2 h-2 rounded-full bg-slate-800'></span>}
                </p>
                <span className='text-[10px] font-heading font-bold text-slate-800 uppercase tracking-wider'>Cash on Delivery</span>
              </div>
            </div>

          </div>
        </div>

        {/* Place Order CTA */}
        <div className='w-full text-end mt-12'>
          <button 
            type='submit'
            className='w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 font-heading font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 active:scale-[0.98]'
          >
            Confirm & Place Order
          </button>
        </div>

      </div>

    </form>
  )
}

export default PlaceOrder
