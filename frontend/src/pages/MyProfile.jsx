import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { 
  UploadCloud, 
  Wallet, 
  TrendingUp, 
  ShoppingBag, 
  CheckCircle, 
  Clock, 
  XCircle,
  Plus,
  Compass
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { token, backendUrl, currency, navigate } = useContext(ShopContext);
  
  // Profile & Designer states
  const [userProfile, setUserProfile] = useState(null);
  const [myDesigns, setMyDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' or 'catalog'
  
  // Design upload form states
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [royalty, setRoyalty] = useState("");
  const [uploading, setUploading] = useState(false);

  const getBaseCost = () => {
    if (subCategory === "Bottomwear") return 1000;
    if (subCategory === "Set") return 1200;
    return 800;
  };
  const baseCost = getBaseCost();
  const projectedPrice = royalty ? Number(royalty) + baseCost : baseCost;

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
      if (response.data.success) {
        setUserProfile(response.data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMyDesigns = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/product/designer-designs`, {}, { headers: { token } });
      if (response.data.success) {
        setMyDesigns(response.data.data.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load designs list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchMyDesigns();
    } else {
      navigate('/login');
    }
  }, [token]);

  const handleSizeToggle = (size) => {
    setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (sizes.length === 0) {
      toast.error("Please select at least one size.");
      return;
    }
    if (!image1 && !image2 && !image3 && !image4) {
      toast.error("Please upload at least one image mockup.");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("royalty", royalty || 0);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/submit-design`, formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setRoyalty("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setSizes([]);
        fetchMyDesigns();
        setActiveTab('catalog');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleWithdraw = async () => {
    if (!userProfile || userProfile.royaltyBalance <= 0) {
      toast.error("You have no available royalty balance to withdraw.");
      return;
    }
    toast.success(`Withdrawal request for ${currency}${userProfile.royaltyBalance} submitted successfully!`);
  };

  return (
    <div className="pt-8 text-left max-w-6xl mx-auto pb-20 animate-fade-in font-sans-editorial space-y-8">
      
      {/* Page Title */}
      <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-6 h-6 text-orange-500" />
            DESIGNER ROYALTY DASHBOARD
          </h2>
          <p className="text-xs text-slate-400 font-mono-tag font-bold uppercase tracking-wider mt-1">Creator Hub & Passive Income Manager</p>
        </div>
        
        {userProfile && (
          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl flex flex-col text-slate-700">
            <span className="text-[10px] font-mono-tag font-bold uppercase tracking-wider text-orange-500">Active Profile</span>
            <span className="text-sm font-heading font-bold text-slate-900 mt-0.5">{userProfile.name}</span>
            <span className="text-[11px] text-slate-400 font-semibold">{userProfile.email}</span>
          </div>
        )}
      </div>

      {/* Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Total Earnings */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono-tag font-bold uppercase">Total Royalties Earned</p>
            <h3 className="text-2xl font-heading font-extrabold text-slate-950 mt-0.5">{currency}{(userProfile?.royaltyEarned || 0).toLocaleString()}</h3>
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4 relative overflow-hidden group">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-950 text-white flex items-center justify-center shrink-0">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-mono-tag font-bold uppercase">Available Balance</p>
              <h3 className="text-2xl font-heading font-extrabold text-slate-950 mt-0.5">{currency}{(userProfile?.royaltyBalance || 0).toLocaleString()}</h3>
            </div>
          </div>
          <button 
            onClick={handleWithdraw}
            className="px-4 py-2 bg-slate-950 hover:bg-orange-500 text-white rounded-full text-xs font-heading font-extrabold tracking-wider uppercase transition-colors cursor-pointer"
          >
            WITHDRAW
          </button>
        </div>

        {/* Total Sales count */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-mono-tag font-bold uppercase">Mockup Product Sales</p>
            <h3 className="text-2xl font-heading font-extrabold text-slate-950 mt-0.5">0 Sales</h3>
          </div>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`pb-3 px-6 font-heading font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer relative ${
            activeTab === 'upload' ? 'border-orange-500 text-slate-950' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Submit New Canvas
        </button>
        <button 
          onClick={() => setActiveTab('catalog')}
          className={`pb-3 px-6 font-heading font-extrabold text-xs uppercase tracking-wider border-b-2 transition-all cursor-pointer relative ${
            activeTab === 'catalog' ? 'border-orange-500 text-slate-950' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          My Creative Catalog ({myDesigns.length})
        </button>
      </div>

      {/* Tab 1: Submit Form */}
      {activeTab === 'upload' && (
        <form onSubmit={onSubmitHandler} className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          
          {/* Column Left: Upload Details */}
          <div className="space-y-5">
            <div>
              <label className="text-xs font-heading font-bold text-slate-900 block mb-2 uppercase">Apparel Mockup Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-xs sm:text-sm text-slate-900 shadow-xs" 
                type="text" 
                placeholder="e.g. Astro Retro Heavy Hoodie" 
                required 
              />
            </div>

            <div>
              <label className="text-xs font-heading font-bold text-slate-900 block mb-2 uppercase">Design Concept Description</label>
              <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                rows={4}
                className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all font-medium text-xs sm:text-sm text-slate-900 shadow-xs" 
                placeholder="Describe your graphic elements, printing parameters, or story behind this canvas..." 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-heading font-bold text-slate-900 block mb-2 uppercase">Target Category</label>
                <select 
                  onChange={(e) => setCategory(e.target.value)} 
                  value={category}
                  className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all font-heading font-bold text-xs text-slate-900 shadow-xs cursor-pointer"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Gen alpha">Gen alpha</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-heading font-bold text-slate-900 block mb-2 uppercase">Apparel Subcategory</label>
                <select 
                  onChange={(e) => setSubCategory(e.target.value)} 
                  value={subCategory}
                  className="w-full px-4 py-3 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all font-heading font-bold text-xs text-slate-900 shadow-xs cursor-pointer"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  {category === "Gen alpha" && <option value="Set">Set</option>}
                </select>
              </div>
            </div>

            {/* Sizes Selection */}
            <div>
              <label className="text-xs font-heading font-bold text-slate-900 block mb-3 uppercase">Available Target Sizes</label>
              <div className="flex gap-2.5">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div 
                    key={size} 
                    onClick={() => handleSizeToggle(size)}
                    className={`w-11 h-11 flex items-center justify-center font-heading font-extrabold text-xs border rounded-xl cursor-pointer transition-all ${
                      sizes.includes(size) ? 'bg-slate-950 border-slate-950 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Royalty settings slider & display */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-heading font-bold text-slate-900 uppercase">Your Chosen Royalty</h4>
                  <p className="text-[10px] text-slate-400 font-mono-tag font-bold uppercase mt-0.5">Amount you earn per sale</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-xl">
                  <span className="text-slate-400 font-bold text-sm">{currency}</span>
                  <input 
                    type="number" 
                    value={royalty} 
                    onChange={(e) => setRoyalty(e.target.value)} 
                    className="w-16 text-right font-heading font-extrabold text-slate-950 outline-none text-base"
                    placeholder="150"
                    required
                  />
                </div>
              </div>

              {/* Slider representation */}
              <input 
                type="range" 
                min="0" 
                max="500" 
                step="10"
                value={royalty || 0} 
                onChange={(e) => setRoyalty(e.target.value)} 
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />

              {/* Price visual breakdown */}
              <div className="border-t border-slate-200/60 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-heading font-bold text-slate-900 uppercase">Calculated Selling Price</h4>
                  <p className="text-[10px] text-slate-400 font-mono-tag uppercase mt-0.5">Base Logistics + Royalty</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold">{currency}{baseCost} + {currency}{royalty || 0} =</span>
                  <p className="text-xl font-heading font-extrabold text-slate-950">{currency}{projectedPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Mockup Previews */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <label className="text-xs font-heading font-bold text-slate-900 block mb-3 uppercase">Upload Design & Mockup Canvas (Up to 4)</label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Image 1 */}
                <label htmlFor="image1" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-orange-500 transition-all overflow-hidden relative group">
                  {image1 ? (
                    <img src={URL.createObjectURL(image1)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-mono-tag font-bold text-slate-400 uppercase">Primary Mock</span>
                    </>
                  )}
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>

                {/* Image 2 */}
                <label htmlFor="image2" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-orange-500 transition-all overflow-hidden relative group">
                  {image2 ? (
                    <img src={URL.createObjectURL(image2)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-mono-tag font-bold text-slate-400 uppercase">Angle 2</span>
                    </>
                  )}
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>

                {/* Image 3 */}
                <label htmlFor="image3" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-orange-500 transition-all overflow-hidden relative group">
                  {image3 ? (
                    <img src={URL.createObjectURL(image3)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-mono-tag font-bold text-slate-400 uppercase">Angle 3</span>
                    </>
                  )}
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>

                {/* Image 4 */}
                <label htmlFor="image4" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-orange-500 transition-all overflow-hidden relative group">
                  {image4 ? (
                    <img src={URL.createObjectURL(image4)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-mono-tag font-bold text-slate-400 uppercase">Detail Mock</span>
                    </>
                  )}
                  <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>

              </div>
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className="w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {uploading ? "SUBMITTING CANVAS..." : "PUBLISH MOCKUP TO CATALOG"}
            </button>
          </div>

        </form>
      )}

      {/* Tab 2: Catalog list */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          {myDesigns.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-200/80 rounded-2xl p-8 space-y-3">
              <UploadCloud className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="font-heading font-bold text-base text-slate-900">No mockups submitted yet</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">Upload your artwork to start earning royalties on every customer purchase.</p>
              <button 
                onClick={() => setActiveTab('upload')}
                className="mt-2 px-6 py-3 bg-slate-950 hover:bg-orange-500 text-white rounded-full text-xs font-heading font-extrabold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit First Canvas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {myDesigns.map((design) => (
                <div key={design._id} className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 relative">
                    <img src={design.image[0]} className="w-full h-full object-cover" alt={design.name} />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-slate-900">{design.name}</h4>
                    <div className="flex items-center justify-between text-xs mt-2 pt-2 border-t border-slate-100">
                      <span className="text-slate-400 font-mono-tag">Royalty: <strong className="text-slate-900">{currency}{design.royalty || 0}</strong></span>
                      <span className="font-heading font-extrabold text-slate-950">{currency}{design.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default MyProfile
