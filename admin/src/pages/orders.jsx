import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const STATUS_CONFIG = {
  "Order Placed": { class: "badge-blue",   dot: "bg-blue-500" },
  Packing:        { class: "badge-amber",  dot: "bg-amber-500" },
  Shipped:        { class: "badge-orange", dot: "bg-orange-500" },
  "Out For Delivery": { class: "badge-orange", dot: "bg-orange-400" },
  Delivered:      { class: "badge-green",  dot: "bg-emerald-500" },
  Cancelled:      { class: "badge-red",    dot: "bg-rose-500" },
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/api/order/list", {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.data.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Order status updated.");
        await fetchOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchOrders(); }, [token]);

  const filtered = orders.filter((o) => {
    const name = `${o.address?.firstname || ""} ${o.address?.lastname || ""}`.toLowerCase();
    return name.includes(search.toLowerCase()) || (o._id || "").toLowerCase().includes(search.toLowerCase());
  });

  const SkeletonCard = () => (
    <div className="admin-card p-5">
      <div className="flex gap-4">
        <div className="skeleton w-8 h-8 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-48" />
          <div className="skeleton h-2.5 w-32" />
          <div className="skeleton h-2.5 w-24" />
        </div>
        <div className="space-y-2 text-right">
          <div className="skeleton h-5 w-20 rounded-full ml-auto" />
          <div className="skeleton h-3 w-12 ml-auto" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wide">Orders</h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">{orders.length} total orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-full text-xs font-heading font-extrabold uppercase tracking-wider hover:border-slate-400 hover:text-slate-950 transition-all cursor-pointer"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="text"
          placeholder="Search by customer name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
        />
      </div>

      {/* Order cards */}
      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className="admin-card py-20 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center text-slate-400">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </div>
            <p className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wide">
              {search ? "No orders match" : "No orders yet"}
            </p>
            <p className="text-xs text-slate-400 mt-1">Orders from customers will appear here.</p>
          </div>
        ) : (
          filtered.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status] || { class: "badge-slate", dot: "bg-slate-400" };
            return (
              <div
                key={order._id}
                className="admin-card p-5 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-start">

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>

                  {/* Main content */}
                  <div className="space-y-2 min-w-0">
                    {/* Items */}
                    <div className="text-xs font-bold text-slate-900 leading-relaxed">
                      {order.items?.map((item, idx) => (
                        <span key={idx}>
                          {item.name} × {item.quantity}
                          <span className="text-indigo-500 font-extrabold"> ({item.size})</span>
                          {idx < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    {/* Address */}
                    {order.address && (
                      <div className="text-[11px] text-slate-500">
                        <span className="font-bold text-slate-700">
                          {order.address.firstname} {order.address.lastname}
                        </span>
                        {" · "}
                        {order.address.city}, {order.address.state}
                        {" · "}
                        {order.address.phone}
                      </div>
                    )}
                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-3 text-[10px]">
                      <span className="font-bold text-slate-500">{order.items?.length} item{order.items?.length !== 1 ? "s" : ""}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-bold text-slate-700 uppercase">{order.paymentMethod}</span>
                      <span className="text-slate-300">·</span>
                      <span className={`badge ${order.payment ? "badge-green" : "badge-amber"}`}>
                        {order.payment ? "Paid" : "Pending"}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500">{new Date(order.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Right column */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span className="font-heading font-extrabold text-base text-slate-950">{currency}{order.amount}</span>
                    <select
                      onChange={(e) => statusHandler(e, order._id)}
                      value={order.status}
                      className="text-[10px] font-extrabold uppercase tracking-wider bg-white border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 cursor-pointer transition-all"
                    >
                      <option>Order Placed</option>
                      <option>Packing</option>
                      <option>Shipped</option>
                      <option>Out For Delivery</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Orders;