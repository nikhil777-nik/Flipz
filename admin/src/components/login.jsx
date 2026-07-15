import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try { 
      e.preventDefault();
      console.log(email,password)
      const response = await axios.post(backendUrl + "/api/user/admin", { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Logged in successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full px-4 bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full border border-gray-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Admin Panel
        </h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-xl border w-full px-4 py-3 border-gray-300 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-200"
              type="email"
              placeholder="Enter your Mail"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-600 mb-2 block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-xl border w-full px-4 py-3 border-gray-300 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100 transition-all duration-200"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-200 mt-6 cursor-pointer text-center"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;