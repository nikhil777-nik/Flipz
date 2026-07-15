import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5Z"/><path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1Z"/></svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const CheckCircleBig = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
);

const Approved = ({ token }) => {
  const [approvedDesigns, setApprovedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovedDesigns = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${backendUrl}/api/product/approved-designs`, { headers: { token } });
      if (response.data.success) {
        setApprovedDesigns(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch approved designs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this approved design? It will be removed from the store.");
    if (!confirmed) return;

    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id: productId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Design deleted successfully.");
        await fetchApprovedDesigns();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchApprovedDesigns();
  }, [token]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 text-left animate-fade-in">
      
      {/* Title */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
            <SparklesIcon />
            Approved Creator Catalog
          </h3>
          <p className="text-xs text-slate-400 font-bold uppercase mt-1">Live active designer products</p>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          {approvedDesigns.length} Live designs
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : approvedDesigns.length === 0 ? (
        <div className="text-center py-20 border border-slate-200/60 rounded-3xl text-slate-500 bg-white shadow-lg shadow-slate-100/50 max-w-lg mx-auto">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 border border-slate-100">
            <CheckCircleBig />
          </div>
          <h4 className="text-base font-bold text-slate-800">No approved designs yet</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">Designs approved from the "Approvals" queue will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedDesigns.map((design) => (
            <div key={design._id} className="bg-white border border-slate-150 rounded-2xl p-5 shadow-md shadow-slate-100/50 flex flex-col md:flex-row gap-5 hover:border-slate-350 transition-all duration-300">
              
              {/* Product mockup image preview */}
              <div className="w-full md:w-32 aspect-[3/4] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                <img 
                  src={design.image?.[0] || 'https://via.placeholder.com/150'} 
                  className="w-full h-full object-cover" 
                  alt={design.name} 
                />
              </div>

              {/* Product details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {design.category} ➔ {design.subCategory}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 border border-slate-200 px-1.5 py-0.5 rounded-md uppercase tracking-wider bg-white">
                      Approved
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 text-base">{design.name}</h4>
                  
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{design.description}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <UserIcon />
                    <span>Uploaded by: <span className="font-semibold text-slate-700">{design.designerName}</span></span>
                  </div>

                  <div className="border-t border-slate-100 pt-2 flex justify-between text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Royalty Payout</p>
                      <p className="font-extrabold text-indigo-600 text-sm">{currency}{design.royalty}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-slate-400 font-medium">Store Price</p>
                      <p className="font-black text-slate-800 text-sm">{currency}{design.price}</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2.5 mt-4 pt-3 border-t border-slate-50">
                  <button 
                    onClick={() => handleDelete(design._id)}
                    className="w-full py-2 px-3 border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
                  >
                    <TrashIcon /> Delete Design
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Approved;
