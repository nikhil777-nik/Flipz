import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { useNavigate } from "react-router-dom";

const StatCard = ({ icon, label, value, color, loading, onClick }) => (
  <div
    onClick={onClick}
    className={`admin-card p-5 animate-fade-in cursor-pointer ${onClick ? "hover:scale-[1.02] active:scale-[0.99]" : ""} transition-all`}
  >
    <div className="flex items-start justify-between mb-4">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background: color.bg, color: color.icon }}
      >
        {icon}
      </div>
    </div>
    {loading ? (
      <div className="space-y-2">
        <div className="skeleton h-7 w-20" />
        <div className="skeleton h-3 w-28" />
      </div>
    ) : (
      <>
        <div className="font-heading text-3xl font-extrabold text-slate-950 mt-1">{value}</div>
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">{label}</div>
      </>
    )}
  </div>
);

const Dashboard = ({ token }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ products: 0, orders: 0, pending: 0, approved: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [productsRes, ordersRes, pendingRes, approvedRes] = await Promise.allSettled([
          axios.get(`${backendUrl}/api/product/list`),
          axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } }),
          axios.get(`${backendUrl}/api/product/pending-designs`, { headers: { token } }),
          axios.get(`${backendUrl}/api/product/approved-designs`, { headers: { token } }),
        ]);

        const products = productsRes.status === "fulfilled" && productsRes.value.data.success
          ? productsRes.value.data.products : [];
        const orders = ordersRes.status === "fulfilled" && ordersRes.value.data.success
          ? ordersRes.value.data.data : [];
        const pending = pendingRes.status === "fulfilled" && pendingRes.value.data.success
          ? pendingRes.value.data.data : [];
        const approved = approvedRes.status === "fulfilled" && approvedRes.value.data.success
          ? approvedRes.value.data.data : [];

        setStats({
          products: products.length,
          orders: orders.length,
          pending: pending.length,
          approved: approved.length,
        });
        setRecentOrders(orders.slice(0, 5));
        setRecentProducts(products.slice(0, 6));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [token]);

  const STATUS_COLORS = {
    "Order Placed": "badge-blue",
    Packing: "badge-amber",
    Shipped: "badge-orange",
    "Out For Delivery": "badge-orange",
    Delivered: "badge-green",
    Cancelled: "badge-red",
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Dashboard</h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          loading={loading}
          value={stats.products}
          label="Total Products"
          onClick={() => navigate("/list")}
          color={{ bg: "#EFF6FF", icon: "#2563EB" }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
              <path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>
            </svg>
          }
        />
        <StatCard
          loading={loading}
          value={stats.orders}
          label="Total Orders"
          onClick={() => navigate("/orders")}
          color={{ bg: "#F0FDF4", icon: "#16A34A" }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
              <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          }
        />
        <StatCard
          loading={loading}
          value={stats.pending}
          label="Pending Approvals"
          onClick={() => navigate("/approval")}
          color={{ bg: "#FFFBEB", icon: "#D97706" }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
          }
        />
        <StatCard
          loading={loading}
          value={stats.approved}
          label="Approved Designs"
          onClick={() => navigate("/approved")}
          color={{ bg: "#FFF7ED", icon: "#EA580C" }}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>
            </svg>
          }
        />
      </div>

      {/* Recent Orders + Recent Products */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

        {/* Recent Orders */}
        <div className="admin-card xl:col-span-3 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wide">Recent Orders</h2>
            <button
              onClick={() => navigate("/orders")}
              className="text-[10px] font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wider cursor-pointer"
            >
              View All →
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-4">
                  <div className="skeleton w-8 h-8 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-40" />
                    <div className="skeleton h-2.5 w-24" />
                  </div>
                  <div className="skeleton h-5 w-16 rounded-full" />
                </div>
              ))
            ) : recentOrders.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-medium">No orders yet.</div>
            ) : (
              recentOrders.map((order, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {order.address?.firstname} {order.address?.lastname}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {order.items?.length} item{order.items?.length !== 1 ? "s" : ""} · {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="font-heading font-extrabold text-xs text-slate-950">{currency}{order.amount}</span>
                    <span className={`badge ${STATUS_COLORS[order.status] || "badge-slate"}`}>{order.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className="admin-card xl:col-span-2 overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100">
            <h2 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wide">Recent Products</h2>
            <button
              onClick={() => navigate("/list")}
              className="text-[10px] font-bold text-orange-500 hover:text-orange-600 uppercase tracking-wider cursor-pointer"
            >
              View All →
            </button>
          </div>
          <div className="divide-y divide-slate-50">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <div className="skeleton w-10 h-12 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton h-3 w-32" />
                    <div className="skeleton h-2.5 w-16" />
                  </div>
                </div>
              ))
            ) : recentProducts.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs font-medium">No products yet.</div>
            ) : (
              recentProducts.map((product, i) => (
                <div key={i} className="flex items-center gap-3 p-4 hover:bg-slate-50/60 transition-colors">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="w-10 h-12 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-100"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{product.name}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{product.category} · {product.subCategory}</p>
                  </div>
                  <span className="font-heading font-extrabold text-xs text-slate-950 shrink-0">{currency}{product.price}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="admin-card p-5">
        <h2 className="font-heading font-extrabold text-sm text-slate-900 uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/add")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-heading font-extrabold uppercase tracking-wider hover:bg-orange-500 transition-all duration-200 cursor-pointer shadow-md"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            Add Product
          </button>
          <button
            onClick={() => navigate("/approval")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-heading font-extrabold uppercase tracking-wider hover:bg-amber-100 transition-all duration-200 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            Review Approvals {stats.pending > 0 && `(${stats.pending})`}
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-heading font-extrabold uppercase tracking-wider hover:border-slate-400 hover:text-slate-950 transition-all duration-200 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/>
            </svg>
            Manage Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
