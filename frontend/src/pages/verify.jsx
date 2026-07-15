import React from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();
    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    useEffect(() => {
        if (token === "") {
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                toast.error("Access denied. Please login to verify payment.");
                navigate('/login');
                return;
            }
        }

        const verifyPayment = async () => {
            try {
                const res = await axios.post(
                    `${backendUrl}/api/order/verifyStripe`,
                    { success, orderId },
                    { headers: { token } }
                );

                if (res.data.success) {
                    setCartItems({});
                    toast.success('Order Placed Successfully!');
                    navigate('/orders');
                } else {
                    toast.error('Order verification failed.');
                    navigate('/cart');
                }
            } catch (error) {
                toast.error("Error verifying payment.");
                navigate('/cart');
            }
        };

        if (token) {
            verifyPayment();
        }
    }, [token, backendUrl, success, orderId, navigate, setCartItems]);

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-slate-500 font-medium">Verifying transaction secure signature...</p>
        </div>
    );
};

export default Verify