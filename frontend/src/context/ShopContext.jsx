import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ShopContext = createContext()
const ShopContextProvider = (props) =>{

    const currency = '₹';
    const delivery_fee =10;
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [search,setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localCart = localStorage.getItem('cartItems');
            return localCart ? JSON.parse(localCart) : {};
        } catch (error) {
            return {};
        }
    });
    const [products,setproducts]=useState([])
    const navigate = useNavigate()
    const [token,setToken]=useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

    
   const addToCart = async (itemId,size)=>{

    let cartData = structuredClone(cartItems)

    if (!size) {
        toast.error('Select Product Size');
        return
    }
    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size]+=1
        }
        else{
            cartData[itemId][size] = 1;
        }
    }
    else{
        cartData[itemId]={}
        cartData[itemId][size]=1
    }
    setCartItems(cartData)

    if(token){
        try {
            await axios.post(`${backendUrl}/api/cart/add`,{itemId,size},{
                headers:{token}
            })
            toast.success("Item added to cart");
        } catch (error) {
            toast.error(error.message);
        }
    }
   }

    const getCartCount= () =>{
        let totalcount=0;
        for(const items in cartItems){
            for ( const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0 ){
                        totalcount+=cartItems[items][item];
                    }
                }catch(erro){

                }
            }
        }
        return totalcount;
    }



    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData= structuredClone(cartItems);
        cartData[itemId][size]=quantity
        setCartItems(cartData)

        if (token) {
            try {
                await axios.put(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }
  
    const getCartAmount = () =>{
        let totalAmount=0;
        for(const items in cartItems){
            let itemInfo=products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price * cartItems[items][item];
                    }
                }catch(error){

                }
            }
        }
        return totalAmount;
    }

    const getproductdata=async()=>{
       try{
        const res = await axios.get(`${backendUrl}/api/product/list`);
        if (res.data.success) {
            setproducts(res.data.products);
        } else {
            toast.error(res.data.message);
        }
       }catch(error){
        console.log(error);
        toast.error(error.message);
       }
    }
    const getUserCart = async (token) => {
        try {
            const res = await axios.get(`${backendUrl}/api/cart/get`, { headers: { token } })
            if (res.data.success) {
                setCartItems(res.data.cartData || {})
            } else {
                // Token is invalid/stale (e.g., after database wipe/reseeding), clear it
                setToken('');
                setCartItems({});
                localStorage.removeItem('token');
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const deleteCart = async (itemId,size)=>{
        let cartData= structuredClone(cartItems);
        delete cartData[itemId][size]
        setCartItems(cartData)

        if (token) {
            try {
                await axios.delete(`${backendUrl}/api/cart/delete`, { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    

    useEffect(()=>{
        getproductdata();
    },[])

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            getUserCart(token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const value ={
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,addToCart,getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        token,setToken
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;