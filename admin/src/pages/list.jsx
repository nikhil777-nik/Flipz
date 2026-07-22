import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [deleting, setDeleting] = useState(null);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id, name) => {
    if (!window.confirm(`Remove "${name}" from the store?`)) return;
    setDeleting(id);
    try {
      const response = await axios.post(backendUrl + "/api/product/remove", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success("Product removed.");
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setDeleting(null);
    }
  };

  const removeAll = async () => {
    if (!window.confirm("Delete ALL products? This cannot be undone.")) return;
    try {
      const response = await axios.post(backendUrl + "/api/product/remove-all", {}, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchList(); }, []);

  const categories = ["All", ...new Set(list.map((p) => p.category))];

  const filtered = list.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === "All" || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const SkeletonRow = () => (
    <tr>
      <td className="px-4 py-3"><div className="skeleton w-10 h-12 rounded-lg" /></td>
      <td className="px-4 py-3"><div className="space-y-1.5"><div className="skeleton h-3 w-40" /><div className="skeleton h-2.5 w-20" /></div></td>
      <td className="px-4 py-3 hidden md:table-cell"><div className="skeleton h-5 w-16 rounded-full" /></td>
      <td className="px-4 py-3 hidden lg:table-cell"><div className="skeleton h-3 w-12" /></td>
      <td className="px-4 py-3"><div className="skeleton h-7 w-7 rounded-lg ml-auto" /></td>
    </tr>
  );

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Products</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">{list.length} products total</p>
        </div>
        {list.length > 0 && (
          <button
            onClick={removeAll}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider hover:bg-rose-50 hover:border-rose-300 transition-all cursor-pointer"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            Delete All
          </button>
        )}
      </div>

      {/* Search + Filter bar */}
      <div className="admin-card p-4 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider transition-all cursor-pointer border ${
                categoryFilter === cat
                  ? "bg-slate-950 text-white border-slate-950"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={fetchList}
          className="w-9 h-9 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 flex items-center justify-center transition-all cursor-pointer bg-white shrink-0"
          title="Refresh"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
        </button>
      </div>

      {/* Table */}
      <div className="admin-card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/50">
              <th className="px-4 py-3 text-left text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Image</th>
              <th className="px-4 py-3 text-left text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-[10px] font-extrabold text-slate-500 uppercase tracking-wider hidden md:table-cell">Category</th>
              <th className="px-4 py-3 text-left text-[10px] font-extrabold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Price</th>
              <th className="px-4 py-3 text-right text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
              : filtered.length === 0
              ? (
                <tr>
                  <td colSpan={5}>
                    <div className="py-16 text-center">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center text-slate-400">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>
                      </div>
                      <p className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide">
                        {search ? "No products match" : "No products yet"}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {search ? "Try a different search term." : "Add a product to get started."}
                      </p>
                    </div>
                  </td>
                </tr>
              )
              : filtered.map((item) => (
                <tr key={item._id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="px-4 py-3">
                    <img src={item.image[0]} alt={item.name} className="w-10 h-12 object-cover rounded-lg bg-slate-100 border border-slate-100" />
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900 text-xs truncate max-w-[200px]">{item.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.subCategory}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="badge badge-slate">{item.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="font-heading font-extrabold text-xs text-slate-950">{currency}{item.price}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => removeProduct(item._id, item.name)}
                      disabled={deleting === item._id}
                      className="w-7 h-7 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 flex items-center justify-center ml-auto transition-all cursor-pointer disabled:opacity-50"
                    >
                      {deleting === item._id ? (
                        <svg className="animate-spin" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      ) : (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                      )}
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/30 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Showing {filtered.length} of {list.length} products
          </div>
        )}
      </div>
    </div>
  );
};

export default List;