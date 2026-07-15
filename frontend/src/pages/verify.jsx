import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify =()=>{

    const {navigate,token,setCartItems,backendUrl}=useContext(ShopContext)
    const [searchParams,setSearchParams]=useSearchParams()
    const success=searchParams.get('success')
    const orderId=searchParams.get('orderId')
    

    const verifyPayment =async ()=>{
        try {
            if(!token){
                return null
            }else{
                const res=await axios.post(backendUrl+'/api/order/verifyStripe',{success,orderId},{headers:{token}})

                if(res.data.success){
                    setCartItems({})
                    toast.success('Order Placed Successfully')
                    navigate('/orders')
                }else{
                    toast.error('Order Failed')
                    navigate('/cart')
                }
            }
        } catch (error) {
            toast.error("Error Verifying Order")
            navigate('/cart')
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])
    return (
        <div>
            
        </div>
    )
}

export default Verify