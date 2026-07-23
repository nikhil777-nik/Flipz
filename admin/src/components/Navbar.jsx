import React, { useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";

const Navbar = ({ logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminLoginTime");
    setDropdownOpen(false);
    logout();
  };

  return (
    <header
      className="glass-navbar sticky top-0 z-50 flex items-center justify-between px-6 py-3"
      style={{ height: "60px" }}
    >
      {/* Left — Brand */}
      <div className="flex items-center gap-3">
        <img 
          src={assets.logo} 
          alt="Flipz Logo" 
          className="h-8 w-8 object-contain opacity-90"
        />
        <span className="font-heading font-extrabold text-xl text-slate-950 tracking-tight uppercase select-none">
          Flipz<span className="text-orange-500">.</span>
        </span>
        <span className="hidden sm:inline text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
          Admin
        </span>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-3">

        {/* Notification bell */}
        <button className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 flex items-center justify-center transition-all cursor-pointer">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>

        {/* Admin Avatar dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((p) => !p)}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-950 text-white flex items-center justify-center font-heading font-black text-xs select-none">
              A
            </div>
            <span className="hidden sm:block text-xs font-bold text-slate-800 group-hover:text-slate-950">
              Admin
            </span>
            <svg
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              className={`text-slate-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 py-2 z-50 animate-scale-in">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-extrabold text-slate-900">System Admin</p>
                <p className="text-[10px] text-slate-400 mt-0.5">admin@ecommerce.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;