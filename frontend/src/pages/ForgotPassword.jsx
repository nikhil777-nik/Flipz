import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { KeyRound, Mail, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';

const ForgotPassword = () => {
  const { backendUrl, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setIsSent(true);
        if (response.data.previewUrl) {
          setPreviewUrl(response.data.previewUrl);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-left animate-fade-in">
      <div className="max-w-md w-full space-y-8 bg-white border border-slate-200/60 p-8 rounded-3xl shadow-xl shadow-slate-100/50">
        
        {!isSent ? (
          <>
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-500 mx-auto mb-4">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Forgot Password?</h2>
              <p className="mt-2 text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto text-center">
                Enter your email address below and we'll send you a secure link to reset your password.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
              <div className="relative">
                <label className="text-xs font-bold text-slate-600 block mb-1.5 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm text-slate-800"
                  />
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail size={16} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-black hover:opacity-90 active:scale-95 text-white font-medium rounded-xl text-sm transition-all cursor-pointer disabled:bg-slate-350 disabled:active:scale-100 flex items-center justify-center"
              >
                {loading ? "Sending Recovery Link..." : "Send Reset Link"}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-2 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Check your Email</h2>
              <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-xs mx-auto">
                We've sent a secure password recovery link to <span className="font-bold text-slate-700">{email}</span>.
              </p>
            </div>

            {/* Test Mail Box Preview Url */}
            {previewUrl && (
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 text-left space-y-2">
                <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Test Environment Mode
                </span>
                <p className="text-xs text-indigo-900 leading-relaxed font-medium">
                  We've intercepted the mail in local testing mode. Click below to view the message and click your recovery link:
                </p>
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Open Test Mailbox <ExternalLink size={12} />
                </a>
              </div>
            )}

            <button
              onClick={() => setIsSent(false)}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors block mx-auto cursor-pointer"
            >
              Didn't receive the email? Try again
            </button>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-2 border-t border-slate-100">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors mx-auto cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
