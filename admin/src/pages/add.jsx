import React, { useState, useRef } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const SectionCard = ({ title, description, children }) => (
  <div className="admin-card p-6 animate-fade-in">
    <div className="mb-5 pb-4 border-b border-slate-100">
      <h3 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wide">{title}</h3>
      {description && <p className="text-[11px] text-slate-400 mt-1 font-medium">{description}</p>}
    </div>
    {children}
  </div>
);

const ImageSlot = ({ image, index, onChange, onRemove }) => {
  const inputRef = useRef(null);

  if (image) {
    return (
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-slate-200 group bg-slate-50">
        <img src={URL.createObjectURL(image)} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 w-6 h-6 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all shadow cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
        {index === 0 && (
          <span className="absolute bottom-2 left-2 badge badge-orange text-[9px]">Cover</span>
        )}
      </div>
    );
  }

  return (
    <label
      className="aspect-[3/4] rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-orange-400 hover:bg-orange-50/40 transition-all group"
      htmlFor={`image-slot-${index}`}
    >
      <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><path d="m16 5 3-3 3 3"/><path d="M19 2v10"/>
        </svg>
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-orange-500">
        {index === 0 ? "Cover Photo" : `Photo ${index + 1}`}
      </span>
      <input ref={inputRef} type="file" id={`image-slot-${index}`} accept="image/*" hidden onChange={onChange} />
    </label>
  );
};

const Add = ({ token }) => {
  const [images, setImages] = useState([false, false, false, false]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (index, file) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = file;
      return next;
    });
  };

  const handleImageRemove = (index) => {
    setImages((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const resetForm = () => {
    setImages([false, false, false, false]);
    setName("");
    setDescription("");
    setCategory("Men");
    setSubCategory("Topwear");
    setPrice("");
    setSizes([]);
    setBestseller(false);
    setSuccess(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!images[0]) {
      toast.error("Please upload at least one product image (Cover Photo).");
      return;
    }
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
      images.forEach((img, i) => {
        if (img) formData.append(`image${i + 1}`, img);
      });

      const response = await axios.post(backendUrl + "/api/product/add", formData, {
        headers: { token },
      });

      if (response.data.success) {
        setSuccess(true);
        toast.success("Product published successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Success state ──────────────────────────────────────
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-24 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 mb-5">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
        </div>
        <h2 className="font-heading text-xl font-extrabold text-slate-950 uppercase tracking-wide mb-1">Product Published!</h2>
        <p className="text-sm text-slate-500 mb-8">Your product is now live in the store.</p>
        <button
          onClick={resetForm}
          className="px-8 py-3 bg-slate-950 text-white rounded-full font-heading font-extrabold text-xs uppercase tracking-wider hover:bg-orange-500 transition-all duration-200 cursor-pointer"
        >
          Add Another Product
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmitHandler} className="space-y-6 animate-fade-in max-w-4xl">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Add Product</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Fill out the sections below to publish a new product.</p>
      </div>

      {/* Image Upload */}
      <SectionCard title="Product Images" description="Upload up to 4 images. First image will be used as cover.">
        <div className="grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <ImageSlot
              key={i}
              image={img}
              index={i}
              onChange={(e) => handleImageChange(i, e.target.files[0])}
              onRemove={() => handleImageRemove(i)}
            />
          ))}
        </div>
      </SectionCard>

      {/* Basic Info */}
      <SectionCard title="Basic Information" description="Product name and description shown to customers.">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Product Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="e.g. Premium Oversized Hoodie"
              required
              className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the product — materials, fit, design details..."
              required
              rows={4}
              className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none"
            />
          </div>
        </div>
      </SectionCard>

      {/* Classification + Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Classification" description="Category and subcategory.">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => { setCategory(e.target.value); setSubCategory("Topwear"); }}
                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Gen alpha">Gen Alpha</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              >
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                {category !== "Women" && <option value="Set">Set</option>}
              </select>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Pricing" description="Set the selling price for this product.">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">Price (₹) *</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₹</span>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                placeholder="999"
                required
                min="0"
                className="w-full pl-8 pr-4 py-3 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
              />
            </div>
          </div>
          {/* Bestseller toggle */}
          <div className="mt-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">Bestseller Badge</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Show this product in the Bestsellers section</p>
            </div>
            <button
              type="button"
              onClick={() => setBestseller((p) => !p)}
              className={`relative w-11 h-6 rounded-full transition-all cursor-pointer ${bestseller ? "bg-orange-500" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${bestseller ? "left-6" : "left-1"}`}
              />
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Sizes */}
      <SectionCard title="Available Sizes" description="Select all sizes available for this product.">
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={() => setSizes(sizes.length === SIZES.length ? [] : [...SIZES])}
            className="text-[10px] font-bold uppercase tracking-wider border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          >
            {sizes.length === SIZES.length ? "Deselect All" : "Select All"}
          </button>
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`px-5 py-2 rounded-xl font-heading font-extrabold text-sm transition-all cursor-pointer border ${
                sizes.includes(size)
                  ? "bg-slate-950 text-white border-slate-950"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </SectionCard>

      {/* Submit */}
      <div className="flex items-center gap-4 pb-6">
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-3.5 bg-slate-950 hover:bg-orange-500 text-white rounded-full font-heading font-extrabold text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-slate-950/20 hover:shadow-orange-500/20 active:scale-95"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
              Publishing…
            </span>
          ) : (
            "Publish Product"
          )}
        </button>
        <button
          type="button"
          onClick={resetForm}
          className="px-6 py-3.5 border border-slate-200 text-slate-600 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider hover:border-slate-400 hover:text-slate-950 transition-all cursor-pointer"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default Add;