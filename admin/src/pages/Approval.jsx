import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Approval = ({ token }) => {
  const [pendingDesigns, setPendingDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);

  const fetchPendingDesigns = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/pending-designs`, { headers: { token } });
      if (response.data.success) {
        setPendingDesigns(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch pending designs");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (productId) => {
    setActioning(productId + "_approve");
    try {
      const response = await axios.post(`${backendUrl}/api/product/approve-design`, { productId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Design approved and published!");
        await fetchPendingDesigns();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActioning(null);
    }
  };

  const handleReject = async (productId) => {
    if (!window.confirm("Reject this design?")) return;
    setActioning(productId + "_reject");
    try {
      const response = await axios.post(`${backendUrl}/api/product/reject-design`, { productId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Design rejected.");
        await fetchPendingDesigns();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setActioning(null);
    }
  };

  useEffect(() => { fetchPendingDesigns(); }, [token]);

  const SkeletonCard = () => (
    <div className="admin-card p-5 flex gap-5">
      <div className="skeleton w-28 aspect-[3/4] rounded-xl shrink-0" />
      <div className="flex-1 space-y-3 py-2">
        <div className="skeleton h-4 w-16 rounded-full" />
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-3 w-56" />
        <div className="skeleton h-3 w-32" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-8 flex-1 rounded-xl" />
          <div className="skeleton h-8 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Design Approvals</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Review and approve creator-submitted designs</p>
        </div>
        {!loading && (
          <span className={`badge ${pendingDesigns.length > 0 ? "badge-amber" : "badge-green"} text-xs py-1 px-3`}>
            {pendingDesigns.length} Pending
          </span>
        )}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : pendingDesigns.length === 0 ? (
          <div className="md:col-span-2 admin-card py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 mx-auto mb-4 flex items-center justify-center text-emerald-500 border border-emerald-100">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
            </div>
            <p className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide">All caught up!</p>
            <p className="text-xs text-slate-400 mt-1">No designs awaiting review.</p>
          </div>
        ) : (
          pendingDesigns.map((design) => (
            <div key={design._id} className="admin-card p-5 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="w-full sm:w-28 aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                <img
                  src={design.image?.[0] || "https://via.placeholder.com/150"}
                  alt={design.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <span className="badge badge-blue text-[9px]">
                    {design.category} → {design.subCategory}
                  </span>
                  <h4 className="font-heading font-extrabold text-slate-900 text-base leading-tight">{design.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{design.description}</p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>By <span className="font-bold text-slate-800">{design.designerName}</span></span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Royalty</p>
                      <p className="font-heading font-extrabold text-indigo-600 text-sm">{currency}{design.royalty}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Store Price</p>
                      <p className="font-heading font-extrabold text-slate-900 text-sm">{currency}{design.price}</p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2.5 mt-4 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => handleApprove(design._id)}
                    disabled={!!actioning}
                    className="flex-1 py-2.5 px-3 bg-slate-950 hover:bg-emerald-600 text-white font-heading font-extrabold rounded-xl text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                  >
                    {actioning === design._id + "_approve" ? (
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5"/></svg>
                    )}
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(design._id)}
                    disabled={!!actioning}
                    className="flex-1 py-2.5 px-3 border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 text-rose-600 font-heading font-extrabold rounded-xl text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {actioning === design._id + "_reject" ? (
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    )}
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Approval;
