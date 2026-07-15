import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { KeyRound, Lock, Eye, EyeOff, ArrowRight, XCircle, ArrowLeft } from 'lucide-react';

const ResetPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(null); // null = loading, true = valid, false = invalid

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/reset-password/${token}`);
        if (response.data.success) {
          setIsValidToken(true);
        } else {
          setIsValidToken(false);
        }
      } catch (error) {
        setIsValidToken(false);
      }
    };
    if (token) {
      checkTokenValidity();
    }
  }, [token, backendUrl]);

  // Password strength checks (matches Signup logic)
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasLength = password.length >= 8;
  const strengthScore = [hasUppercase, hasLowercase, hasNumber, hasSpecial, hasLength].filter(Boolean).length;

  const getStrengthIndicator = () => {
    if (strengthScore <= 2) return { color: 'bg-rose-500', label: 'Weak', text: 'text-rose-500' };
    if (strengthScore <= 4) return { color: 'bg-amber-500', label: 'Medium', text: 'text-amber-500' };
    return { color: 'bg-emerald-500', label: 'Strong', text: 'text-emerald-500' };
  };

  const strength = getStrengthIndicator();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (strengthScore < 5) {
      toast.error("Please satisfy all password strength requirements.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/reset-password/${token}`, { password });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/login');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200/60 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
        
        {isValidToken === null && (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Verifying secure token...</p>
          </div>
        )}

        {isValidToken === false && (
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-2">
              <XCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Link Expired</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                This password recovery link has already been used or has expired. Please request a new recovery link.
              </p>
            </div>

            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full py-3 bg-black hover:opacity-90 active:scale-95 text-white font-medium rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} /> Request New Link
            </button>
          </div>
        )}

        {isValidToken === true && (
          <>
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Reset Password</h2>
              <p className="mt-2 text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto text-center">
                Create a new password that is secure and meets strength requirements.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="mt-6 space-y-5">
              
              {/* New Password */}
              <div className="relative">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm text-slate-800"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <KeyRound size={16} />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm text-slate-800"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <KeyRound size={16} />
                  </div>
                </div>
              </div>

              {/* Password Strength Card */}
              {password.length > 0 && (
                <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-left space-y-2 animate-fade-in shadow-sm shadow-slate-100 text-slate-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-700">Password Strength:</span>
                    <span className={`font-black ${strength.text} uppercase tracking-wider`}>{strength.label}</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${(strengthScore / 5) * 100}%` }}></div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1 pt-1">
                    <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasLength ? 'text-emerald-600' : ''}`}>
                      <span className="text-xs">{hasLength ? '✓' : '○'}</span> At least 8 characters
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasUppercase ? 'text-emerald-600' : ''}`}>
                      <span className="text-xs">{hasUppercase ? '✓' : '○'}</span> Uppercase letter (A-Z)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasLowercase ? 'text-emerald-600' : ''}`}>
                      <span className="text-xs">{hasLowercase ? '✓' : '○'}</span> Lowercase letter (a-z)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasNumber ? 'text-emerald-600' : ''}`}>
                      <span className="text-xs">{hasNumber ? '✓' : '○'}</span> Numeric character (0-9)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasSpecial ? 'text-emerald-600' : ''}`}>
                      <span className="text-xs">{hasSpecial ? '✓' : '○'}</span> Special symbol (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black hover:opacity-90 active:scale-95 text-white font-medium rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 disabled:bg-slate-350 disabled:active:scale-100"
              >
                {loading ? "Updating Password..." : "Update Password"} <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
