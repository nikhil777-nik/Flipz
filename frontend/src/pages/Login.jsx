import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';

const Login = () => {
  const { setToken, backendUrl, navigate, token } = useContext(ShopContext)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [currentState, setCurrentState] = useState('Login')

  // Password strength checks
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const hasLength = password.length >= 8;
  const strengthScore = [hasUppercase, hasLowercase, hasNumber, hasSpecial, hasLength].filter(Boolean).length;

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    
    if (currentState === 'Sign Up' && strengthScore < 5) {
      toast.error('Please fulfill all password strength requirements.');
      return;
    }

    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(backendUrl + "/api/user/register", { name, password, email })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
        } else {
          toast.error(res.data.message)
        }
      } else {
        const res = await axios.post(backendUrl + "/api/user/login", { email, password })
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const getStrengthIndicator = () => {
    if (strengthScore <= 2) return { color: 'bg-rose-500', label: 'Weak', text: 'text-rose-500' };
    if (strengthScore <= 4) return { color: 'bg-amber-500', label: 'Medium', text: 'text-amber-500' };
    return { color: 'bg-emerald-500', label: 'Strong', text: 'text-emerald-500' };
  };

  const strength = getStrengthIndicator();

  return (
    <div className="py-12 flex justify-center items-center font-sans-editorial animate-fade-in">
      <form onSubmit={onSubmitHandler} className='w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xs text-left space-y-6'>
        
        {/* Title */}
        <div className="text-center space-y-1.5 pb-2 border-b border-slate-100">
          <h2 className='font-heading text-2xl font-extrabold text-slate-950 uppercase tracking-wider'>
            {currentState === 'Login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
          </h2>
          <p className="text-xs text-slate-400 font-mono-tag uppercase">
            {currentState === 'Login' ? 'Sign in to access your account' : 'Join Flipz community & designer hub'}
          </p>
        </div>
        
        <div className="space-y-4">
          {currentState !== 'Login' && (
            <div>
              <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">Full Name</label>
              <div className="relative">
                <input 
                  onChange={(e) => setName(e.target.value)} 
                  value={name} 
                  type="text" 
                  className='w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs' 
                  placeholder="Your Name" 
                  required 
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">Email Address</label>
            <div className="relative">
              <input 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                type="email" 
                className='w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs' 
                placeholder="email@domain.com" 
                required 
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          {/* Password Container */}
          <div>
            <label className="text-xs font-heading font-bold text-slate-900 block mb-1.5 uppercase">Password</label>
            <div className='relative'>
              <input 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                type={showPassword ? "text" : "password"} 
                className='w-full pl-10 pr-10 py-3.5 bg-white border border-slate-200/90 rounded-xl outline-none focus:border-orange-500 transition-all text-xs sm:text-sm text-slate-900 shadow-xs' 
                placeholder="••••••••" 
                required 
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer focus:outline-none transition-colors'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Password Strength Checklist */}
          {currentState === 'Sign Up' && password.length > 0 && (
            <div className='bg-slate-50 border border-slate-200/60 rounded-xl p-3.5 text-xs text-left space-y-2 animate-fade-in'>
              <div className='flex justify-between items-center mb-1'>
                <span className='font-heading font-bold text-slate-800 text-[11px] uppercase'>Strength:</span>
                <span className={`font-mono-tag font-bold ${strength.text} text-[10px] uppercase`}>{strength.label}</span>
              </div>
              
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${(strengthScore / 5) * 100}%` }}></div>
              </div>
              
              <div className='grid grid-cols-1 gap-1 pt-1 text-[11px] text-slate-500'>
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
        </div>

        <div className='flex items-center justify-between text-xs pt-1'>
          <button 
            type="button"
            onClick={() => navigate('/forgot-password')} 
            className='text-slate-500 hover:text-slate-900 transition-colors font-medium cursor-pointer'
          >
            Forgot password?
          </button>
          
          {currentState === 'Login' ? (
            <button 
              type="button"
              onClick={() => { setCurrentState('Sign Up'); setPassword(''); }} 
              className='font-heading font-bold text-slate-950 hover:text-orange-500 transition-colors cursor-pointer uppercase'
            >
              Create Account
            </button>
          ) : (
            <button 
              type="button"
              onClick={() => { setCurrentState('Login'); setPassword(''); }} 
              className='font-heading font-bold text-slate-950 hover:text-orange-500 transition-colors cursor-pointer uppercase'
            >
              Sign In
            </button>
          )}
        </div>

        <button 
          type="submit"
          className='w-full py-4 rounded-full bg-slate-950 text-white hover:bg-orange-500 font-heading font-extrabold text-xs tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer'
        >
          {currentState === 'Login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
        </button>
      </form>
    </div>
  )
}

export default Login
