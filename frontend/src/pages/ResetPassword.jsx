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
  const [isValidToken, setIsValidToken] = useState(null);

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
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 font-sans-editorial animate-fade-in text-left">
      <div className="max-w-md w-full space-y-6 bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xs">
        
        {isValidToken === null && (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
            <p className="text-slate-400 text-xs font-mono-tag uppercase tracking-wider">VERIFYING TOKEN...</p>
          </div>
        )}

        {isValidToken === false && (
          <div className="text-center py-4 space-y-6">
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 mx-auto mb-2">
              <XCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider">LINK EXPIRED</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                This password recovery link has already been used or has expired.
              </p>
            </div>

            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-1.5"
            >
              <ArrowLeft size={14} /> REQUEST NEW LINK
            </button>
          </div>
        )}

        {isValidToken === true && (
          <>
            {/* Header */}
            <div className="text-center space-y-1.5 pb-2 border-b border-slate-100">
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider">RESET PASSWORD</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Create a new password that meets security requirements.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="space-y-4">
              
              {/* New Password */}
              <div>
                <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">Confirm New Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs"
                  />
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password Strength Card */}
              {password.length > 0 && (
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 text-xs text-left space-y-2 animate-fade-in text-slate-500">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-heading font-bold text-slate-800 text-[11px] uppercase">Strength:</span>
                    <span className={`font-mono-tag font-bold ${strength.text} text-[10px] uppercase`}>{strength.label}</span>
                  </div>
                  
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${(strengthScore / 5) * 100}%` }}></div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1 pt-1 text-[11px]">
                    <div className={`flex items-center gap-1.5 font-medium ${hasLength ? 'text-emerald-600 font-bold' : ''}`}>
                      <span>{hasLength ? '✓' : '○'}</span> At least 8 characters
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium ${hasUppercase ? 'text-emerald-600 font-bold' : ''}`}>
                      <span>{hasUppercase ? '✓' : '○'}</span> Uppercase letter (A-Z)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium ${hasLowercase ? 'text-emerald-600 font-bold' : ''}`}>
                      <span>{hasLowercase ? '✓' : '○'}</span> Lowercase letter (a-z)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium ${hasNumber ? 'text-emerald-600 font-bold' : ''}`}>
                      <span>{hasNumber ? '✓' : '○'}</span> Numeric character (0-9)
                    </div>
                    <div className={`flex items-center gap-1.5 font-medium ${hasSpecial ? 'text-emerald-600 font-bold' : ''}`}>
                      <span>{hasSpecial ? '✓' : '○'}</span> Special symbol (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? "UPDATING..." : "UPDATE PASSWORD"}</span>
                <ArrowRight size={14} />
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
};

export default ResetPassword;
