import React from "react";
import { assets } from "../assets/assets";
const Navbar = ({ setToken })=>{
    return (
        <div className="flex items-center py-2 px-[4%] justify-between">
            <div className="flex items-center select-none">
                <span className="font-heading font-black text-2xl tracking-tighter text-slate-800 uppercase flex items-center">
                    Flipz<span className="text-pink-500 font-extrabold text-3xl leading-none ml-0.5">.</span>
                    <span className="text-[10px] font-black uppercase text-indigo-500 ml-2 tracking-wider bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">Admin</span>
                </span>
            </div>
            <button onClick={() => setToken('')} className="bg-gray-600 hover:bg-gray-700 active:scale-95 transition-all duration-200 cursor-pointer text-white px-5 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">Logout</button>
        </div>
    )
}

export default Navbar