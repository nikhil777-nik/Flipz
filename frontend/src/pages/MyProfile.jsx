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

  // Base production cost depending on subcategory: Topwear (800), Bottomwear (1000), Set (1200)
  const getBaseCost = () => {
    if (subCategory === "Bottomwear") return 1000;
    if (subCategory === "Set") return 1200;
    return 800;
  };
  const baseCost = getBaseCost();
  const projectedPrice = royalty ? Number(royalty) + baseCost : baseCost;

  // Fetch designer profile stats
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

  // Fetch designer uploaded designs
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
      formData.append("royalty", royalty);
      formData.append("designerId", userProfile?._id || "");
      formData.append("designerName", userProfile?.name || "");

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(`${backendUrl}/api/product/upload-design`, formData, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName('');
        setDescription('');
        setRoyalty('');
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setActiveTab('catalog');
        await fetchMyDesigns();
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

  const handleWithdraw = () => {
    if (!userProfile?.royaltyBalance || userProfile.royaltyBalance <= 0) {
      toast.info("No balance available to withdraw currently.");
      return;
    }
    toast.success(`Withdrawal request for ${currency}${userProfile.royaltyBalance} submitted successfully!`);
  };

  return (
    <div className="pt-8 text-left max-w-6xl mx-auto pb-20 animate-fade-in">
      
      {/* Page Title */}
      <div className="mb-8 border-b border-slate-100 pb-4">
        <h2 className="text-2xl font-heading font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Compass className="w-6 h-6 text-indigo-500 animate-pulse" />
          Designer <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">Royalty Dashboard</span>
        </h2>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Creator Hub & Passive Income Manager</p>
      </div>

      {/* Analytics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        
        {/* Total Earnings */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-md shadow-slate-100/50 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-16 h-16 bg-indigo-50 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 relative z-10">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-slate-400 font-bold uppercase">Total Royalties Earned</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">{currency}{(userProfile?.royaltyEarned || 0).toLocaleString()}</h3>
          </div>
        </div>

        {/* Available Balance */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-md shadow-slate-100/50 flex items-center justify-between gap-4 relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-16 h-16 bg-pink-50 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase">Available Balance</p>
              <h3 className="text-2xl font-black text-slate-800 mt-1">{currency}{(userProfile?.royaltyBalance || 0).toLocaleString()}</h3>
            </div>
          </div>
          <button 
            onClick={handleWithdraw}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-xl text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-md shadow-indigo-500/10 cursor-pointer relative z-10"
          >
            Withdraw
          </button>
        </div>

        {/* Total Sales count */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-md shadow-slate-100/50 flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-16 h-16 bg-emerald-50 rounded-full blur-xl group-hover:scale-150 transition-all duration-500"></div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 relative z-10">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div className="relative z-10">
            <p className="text-xs text-slate-400 font-bold uppercase">Mockup Product Sales</p>
            <h3 className="text-2xl font-black text-slate-800 mt-1">0 Sales</h3>
          </div>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-100 mb-8">
        <button 
          onClick={() => setActiveTab('upload')}
          className={`pb-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'upload' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Submit New Canvas
        </button>
        <button 
          onClick={() => setActiveTab('catalog')}
          className={`pb-4 px-6 font-bold text-sm uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
            activeTab === 'catalog' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          My Creative Catalog ({myDesigns.length})
        </button>
      </div>

      {/* Tab 1: Submit Form */}
      {activeTab === 'upload' && (
        <form onSubmit={onSubmitHandler} className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/30 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10">
          
          {/* Column Left: Upload Details */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Apparel Mockup Name</label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-sm text-slate-800" 
                type="text" 
                placeholder="e.g. Astro Retro Heavy Hoodie" 
                required 
              />
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 block mb-2">Design Concept Description</label>
              <textarea 
                onChange={(e) => setDescription(e.target.value)} 
                value={description} 
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-sm text-slate-800" 
                placeholder="Describe your graphic elements, printing parameters, or story behind this canvas..." 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Target Category</label>
                <select 
                  onChange={(e) => setCategory(e.target.value)} 
                  value={category}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-sm text-slate-800"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Gen alpha">Gen alpha</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">Apparel Subcategory</label>
                <select 
                  onChange={(e) => setSubCategory(e.target.value)} 
                  value={subCategory}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all font-medium text-sm text-slate-800"
                >
                  <option value="Topwear">Topwear</option>
                  <option value="Bottomwear">Bottomwear</option>
                  {category === "Gen alpha" && <option value="Set">Set</option>}
                </select>
              </div>
            </div>

            {/* Sizes Selection */}
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-3">Available Target Sizes</label>
              <div className="flex gap-2.5">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div 
                    key={size} 
                    onClick={() => handleSizeToggle(size)}
                    className={`w-12 h-12 flex items-center justify-center font-bold text-sm border rounded-xl cursor-pointer transition-all active:scale-95 ${
                      sizes.includes(size) ? 'bg-indigo-500 border-indigo-500 text-white shadow-md shadow-indigo-500/20' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Royalty settings slider & display */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Your Chosen Royalty</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Amount you earn per sale</p>
                </div>
                <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-xl">
                  <span className="text-slate-400 font-bold text-sm">{currency}</span>
                  <input 
                    type="number" 
                    value={royalty} 
                    onChange={(e) => setRoyalty(e.target.value)} 
                    className="w-16 text-right font-black text-slate-900 outline-none text-base"
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
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />

              {/* Price visual breakdown */}
              <div className="border-t border-slate-200/50 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Calculated Selling Price</h4>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Base Manufacturing & Logistics + Royalty</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 font-semibold">{currency}{baseCost} + {currency}{royalty || 0} =</span>
                  <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">{currency}{projectedPrice.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column Right: Mockup Previews */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <label className="text-sm font-bold text-slate-700 block mb-3">Upload Design & Mockup Canvas (Up to 4)</label>
              <div className="grid grid-cols-2 gap-4">
                
                {/* Image 1 */}
                <label htmlFor="image1" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-indigo-400 transition-all overflow-hidden relative group">
                  {image1 ? (
                    <img src={URL.createObjectURL(image1)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <UploadCloud className="w-8 h-8 text-slate-400 mb-2 group-hover:-translate-y-1 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Mock</span>
                    </>
                  )}
                  <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                </label>

                {/* Image 2 */}
                <label htmlFor="image2" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-indigo-400 transition-all overflow-hidden relative group">
                  {image2 ? (
                    <img src={URL.createObjectURL(image2)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-slate-400 mb-1 group-hover:rotate-90 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Side angle</span>
                    </>
                  )}
                  <input onChange={(e) => setImage2(e.target.files[0])} type="file" id="image2" hidden />
                </label>

                {/* Image 3 */}
                <label htmlFor="image3" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-indigo-400 transition-all overflow-hidden relative group">
                  {image3 ? (
                    <img src={URL.createObjectURL(image3)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-slate-400 mb-1 group-hover:rotate-90 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Detail Print</span>
                    </>
                  )}
                  <input onChange={(e) => setImage3(e.target.files[0])} type="file" id="image3" hidden />
                </label>

                {/* Image 4 */}
                <label htmlFor="image4" className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100/50 hover:border-indigo-400 transition-all overflow-hidden relative group">
                  {image4 ? (
                    <img src={URL.createObjectURL(image4)} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <>
                      <Plus className="w-6 h-6 text-slate-400 mb-1 group-hover:rotate-90 transition-transform" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Packaging</span>
                    </>
                  )}
                  <input onChange={(e) => setImage4(e.target.files[0])} type="file" id="image4" hidden />
                </label>

              </div>
            </div>

            <button 
              type="submit"
              disabled={uploading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-95 font-heading font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98] disabled:bg-slate-300 disabled:from-slate-400 disabled:to-slate-400"
            >
              {uploading ? "Publishing Canvas..." : "Publish to Flipz Marketplace"}
            </button>
          </div>

        </form>
      )}

      {/* Tab 2: Designs Catalog */}
      {activeTab === 'catalog' && (
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/30 min-h-[40vh]">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : myDesigns.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <Compass className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-base font-bold text-slate-700">No mockups submitted yet</h4>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">Submit your first creation in the Submit tab and start earning royalties!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {myDesigns.map((design) => (
                <div key={design._id} className="bg-white border border-slate-150 rounded-2xl p-4 shadow-md shadow-slate-100/50 flex gap-4 hover:border-slate-350 transition-all duration-300">
                  <div className="w-20 aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                    <img 
                      src={design.image?.[0]} 
                      className="w-full h-full object-cover" 
                      alt="" 
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 text-left min-w-0">
                    <div className="space-y-1.5 min-w-0">
                      <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider block w-fit">
                        {design.category} ➔ {design.subCategory}
                      </span>
                      <h4 className="font-bold text-slate-800 text-sm truncate">{design.name}</h4>
                      
                      <div className="flex justify-between items-center text-[11px] pt-1">
                        <div>
                          <p className="text-slate-400 font-medium">Royalty</p>
                          <p className="font-extrabold text-indigo-600">{currency}{design.royalty || 0}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-400 font-medium">Selling Price</p>
                          <p className="font-black text-slate-800">{currency}{design.price}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400">Status</span>
                      {design.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 border border-emerald-250 text-emerald-600">
                          <CheckCircle className="w-3 h-3" /> Approved
                        </span>
                      )}
                      {design.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-250 text-amber-600">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                      {design.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 border border-rose-250 text-rose-600">
                          <XCircle className="w-3 h-3" /> Rejected
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default MyProfile;
