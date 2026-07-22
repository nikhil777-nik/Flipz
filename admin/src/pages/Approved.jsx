import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Approved = ({ token }) => {
  const [approvedDesigns, setApprovedDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const fetchApprovedDesigns = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/approved-designs`, { headers: { token } });
      if (response.data.success) {
        setApprovedDesigns(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to fetch approved designs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId, name) => {
    if (!window.confirm(`Remove "${name}" from the store?`)) return;
    setDeleting(productId);
    try {
      const response = await axios.post(`${backendUrl}/api/product/remove`, { id: productId }, { headers: { token } });
      if (response.data.success) {
        toast.success("Design removed from store.");
        await fetchApprovedDesigns();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  useEffect(() => { fetchApprovedDesigns(); }, [token]);

  const filtered = approvedDesigns.filter((d) =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.designerName?.toLowerCase().includes(search.toLowerCase())
  );

  const SkeletonCard = () => (
    <div className="admin-card p-5 flex gap-5">
      <div className="skeleton w-28 aspect-[3/4] rounded-xl shrink-0" />
      <div className="flex-1 space-y-3 py-2">
        <div className="skeleton h-4 w-16 rounded-full" />
        <div className="skeleton h-4 w-40" />
        <div className="skeleton h-3 w-32" />
        <div className="flex gap-2 mt-4">
          <div className="skeleton h-8 flex-1 rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Approved Designs</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Live creator products in your store</p>
        </div>
        {!loading && (
          <span className="badge badge-green text-xs py-1 px-3">
            {approvedDesigns.length} Live
          </span>
        )}
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          placeholder="Search by name or designer…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="md:col-span-2 admin-card py-20 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center text-slate-400 border border-slate-200">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <p className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide">
              {search ? "No designs match" : "No approved designs yet"}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {search ? "Try a different search." : "Approved designs from the queue will appear here."}
            </p>
          </div>
        ) : (
          filtered.map((design) => (
            <div key={design._id} className="admin-card p-5 flex flex-col sm:flex-row gap-5 hover:shadow-lg transition-shadow">
              {/* Image */}
              <div className="w-full sm:w-28 aspect-[3/4] rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0 relative">
                <img
                  src={design.image?.[0] || "https://via.placeholder.com/150"}
                  alt={design.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 badge badge-green text-[9px]">Live</span>
              </div>

              {/* Details */}
              <div className="flex flex-col justify-between flex-1">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="badge badge-green text-[9px]">
                      {design.category} → {design.subCategory}
                    </span>
                    <span className="badge badge-slate text-[9px]">Approved</span>
                  </div>
                  <h4 className="font-heading font-extrabold text-slate-900 text-base leading-tight">{design.name}</h4>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{design.description}</p>

                  <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    <span>By <span className="font-bold text-slate-800">{design.designerName}</span></span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Royalty Payout</p>
                      <p className="font-heading font-extrabold text-indigo-600 text-sm">{currency}{design.royalty}</p>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Store Price</p>
                      <p className="font-heading font-extrabold text-slate-900 text-sm">{currency}{design.price}</p>
                    </div>
                  </div>
                </div>

                {/* Delete action */}
                <div className="flex gap-2.5 mt-4 pt-3 border-t border-slate-50">
                  <button
                    onClick={() => handleDelete(design._id, design.name)}
                    disabled={deleting === design._id}
                    className="w-full py-2.5 px-3 border border-rose-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 text-rose-600 font-heading font-extrabold rounded-xl text-[10px] uppercase tracking-wider flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {deleting === design._id ? (
                      <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    )}
                    Remove from Store
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

export default Approved;
