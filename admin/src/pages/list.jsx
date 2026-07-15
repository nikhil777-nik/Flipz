import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";
import { currency } from "../App";
const List = ({ token }) => {
    const [list,setList]=useState([])
    const fetchList=async()=>{
        try {
            const response = await axios.get(backendUrl+"/api/product/list");
            if(response.data.success){
                setList(response.data.products);
            }else{
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    const removeAllProductsHandler = async () => {
        const confirmed = window.confirm("Are you sure you want to delete all products? This action cannot be undone.");
        if (!confirmed) return;

        try {
            const response = await axios.post(backendUrl + "/api/product/remove-all", {}, { headers: { token } });
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchList();
    },[])
    return (
        <>
        <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-semibold text-slate-800">All Products List</p>
            {list.length > 0 && (
                <button
                    onClick={removeAllProductsHandler}
                    className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md shadow-red-500/20 cursor-pointer"
                >
                    Delete All Products
                </button>
            )}
        </div>
        <div className="flex flex-col gap-2">
            <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border bg-gray-100 text-sm">
                <b>Image</b>
                 <b>Name</b>
                  <b>Category</b>
                   <b>Price</b>
                    <b className="pl-4">Action</b>
            </div>
            {
                list.map((item,index)=>(
                    <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border hover:bg-gray-50 text-sm" key={index}>
                        <img className="w-12" src={item.image[0]} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{currency}{item.price}</p>
                        <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-sm">X</p>
                    </div>
                ))
            }
        </div>
        </>
    );
};

export default List;