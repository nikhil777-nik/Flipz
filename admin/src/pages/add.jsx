import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [price, setPrice] = useState("");
    const [sizes, setSizes] = useState([]);
    const [bestseller, setBestseller] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message);
                setName('');
                setDescription('');
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);
                setPrice('');
                setSizes([]);
                setBestseller(false);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
            <div className="flex flex-col gap-4 w-full">
                <div>
                    <p className="mb-2">Upload Image</p>
                    <div className="flex gap-2">
                        <label htmlFor="image1">
                            <img className="w-20" src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                            <input onChange={(e) => { setImage1(e.target.files[0]) }} type="file" id="image1" hidden />
                        </label>
                        <label htmlFor="image2">
                            <img className="w-20" src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                            <input onChange={(e) => { setImage2(e.target.files[0]) }} type="file" id="image2" hidden />
                        </label>
                        <label htmlFor="image3">
                            <img className="w-20" src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                            <input onChange={(e) => { setImage3(e.target.files[0]) }} type="file" id="image3" hidden />
                        </label>
                        <label htmlFor="image4">
                            <img className="w-20" src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                            <input onChange={(e) => { setImage4(e.target.files[0]) }} type="file" id="image4" hidden />
                        </label>
                    </div>
                </div>

                <div className="w-full">
                    <p className="mb-2">Product name</p>
                    <input onChange={(e)=>{setName(e.target.value)}} value={name}className="w-full max-w-[500px] border border-gray-300 rounded-md p-2" type="text" placeholder="Enter product name" required />
                </div>

                <div className="w-full">
                    <p className="mb-2">Product description</p>
                    <textarea onChange={(e)=>{setDescription(e.target.value)}} value={description} className="w-full max-w-[500px] border border-gray-300 rounded-md p-2" placeholder="Enter product description" required />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                    <div>
                        <p className="mb-2">Product category</p>
                        <select 
                            onChange={(e) => {
                                setCategory(e.target.value);
                                setSubCategory("Topwear");
                            }}  
                            value={category}
                            className="w-full px-2 py-2"
                        >
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Gen alpha">Gen alpha</option>
                        </select>
                    </div>
                    <div>
                        <p className="mb-2">Sub category</p>
                        <select 
                            onChange={(e) => setSubCategory(e.target.value)} 
                            value={subCategory} 
                            className="w-full px-2 py-2"
                        >
                            {category === "Women" ? (
                                <>
                                    <option value="Topwear">Topwear</option>
                                    <option value="Bottomwear">Bottomwear</option>
                                </>
                            ) : (
                                <>
                                    <option value="Topwear">Topwear</option>
                                    <option value="Bottomwear">Bottomwear</option>
                                    <option value="Set">Set</option>
                                </>
                            )}
                        </select>
                    </div>
                    <div>
                        <p className="mb-2">Product price</p>
                        <input onChange={(e)=>{setPrice(e.target.value)}} value={price} className="w-full px-2 py-2 sm:w-[120px]" type="text" placeholder="Enter price" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <p className="">Product sizes</p>
                        <button
                            type="button"
                            onClick={() => {
                                const allSizes = ["S", "M", "L", "XL", "XXL"];
                                if (sizes.length === allSizes.length) {
                                    setSizes([]);
                                } else {
                                    setSizes(allSizes);
                                }
                            }}
                            className="text-xs bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded px-2.5 py-1 font-medium cursor-pointer transition-all active:scale-95 text-slate-700"
                        >
                            {sizes.length === 5 ? "Deselect All" : "Select All"}
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                            <p className={`${sizes.includes("S") ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                            <p className={`${sizes.includes("M") ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                            <p className={`${sizes.includes("L") ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                            <p className={`${sizes.includes("XL") ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p>
                        </div>
                        <div onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter(item => item !== "XXL") : [...prev, "XXL"])}>
                            <p className={`${sizes.includes("XXL") ? "bg-pink-100 border border-pink-400" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-2 mt-3">
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id="bestseller" />
                <label htmlFor="bestseller" className="cursor-pointer">Add as best seller</label>
            </div>
            <button disabled={loading} className="w-28 py-3 bg-black text-white cursor-pointer disabled:bg-gray-700">
                {loading ? "Adding..." : "Add Product"}
            </button>
        </form>
    );
};

export default Add;