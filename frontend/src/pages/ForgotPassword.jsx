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
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 text-left font-sans-editorial animate-fade-in">
      <div className="max-w-md w-full space-y-6 bg-white border border-slate-200/80 p-8 rounded-2xl shadow-xs">
        
        {!isSent ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mx-auto mb-3">
                <KeyRound className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider">FORGOT PASSWORD?</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto text-center leading-relaxed">
                Enter your registered email address to receive a secure recovery link.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="space-y-4">
              <div>
                <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">Email Address</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="email@domain.com"
                    className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer disabled:opacity-50"
              >
                {loading ? "SENDING LINK..." : "SEND RESET LINK"}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-14 h-14 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            
            <div className="space-y-1.5">
              <h2 className="text-2xl font-heading font-extrabold text-slate-950 uppercase tracking-wider">CHECK YOUR EMAIL</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                We've sent a password recovery link to <span className="font-bold text-slate-900">{email}</span>.
              </p>
            </div>

            {previewUrl && (
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-left space-y-2">
                <span className="text-[10px] font-mono-tag font-bold text-orange-500 uppercase tracking-wider">
                  Test Environment Mode
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  Local preview link available below:
                </p>
                <a 
                  href={previewUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-slate-950 hover:text-orange-500 transition-colors uppercase"
                >
                  Open Test Mailbox <ExternalLink size={12} />
                </a>
              </div>
            )}

            <button
              onClick={() => setIsSent(false)}
              className="text-xs font-heading font-bold text-slate-900 hover:text-orange-500 transition-colors block mx-auto cursor-pointer uppercase"
            >
              Didn't receive email? Try again
            </button>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-3 border-t border-slate-100 text-center">
          <button 
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-bold text-slate-500 hover:text-slate-950 transition-colors cursor-pointer uppercase"
          >
            <ArrowLeft size={14} /> Back to Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
