import Navbar from "./components/Navbar";
import Sidebar from "./components/sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Add from "./pages/add";
import List from "./pages/list";
import Orders from "./pages/orders";
import Approval from "./pages/Approval";
import Approved from "./pages/Approved";
import Dashboard from "./pages/Dashboard";
import { useState, useEffect, useCallback } from "react";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSessionManager from "./hooks/useSessionManager";

export const backendUrl = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/+$/, "");
export const currency = "₹";

const App = () => {
  const [token, setToken] = useState(() => sessionStorage.getItem("adminToken") || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const logout = useCallback(() => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminLoginTime");
    setToken("");
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("adminToken", token);
    } else {
      sessionStorage.removeItem("adminToken");
      sessionStorage.removeItem("adminLoginTime");
    }
  }, [token]);

  // Clear any legacy localStorage token
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  // Activate inactivity-based session manager only when logged in
  useSessionManager(token ? logout : null);

  if (!token) {
    return (
      <>
        <ToastContainer position="top-right" autoClose={2000} />
        <Login setToken={setToken} />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg)" }}>
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Sidebar */}
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Sticky Navbar */}
        <Navbar logout={logout} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <Routes>
            <Route path="/" element={<Dashboard token={token} />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/approval" element={<Approval token={token} />} />
            <Route path="/approved" element={<Approved token={token} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;