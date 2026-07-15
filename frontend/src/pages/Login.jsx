import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

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
    
    // Enforce password strength constraint on frontend during Registration
    if (currentState === 'Sign Up' && strengthScore < 5) {
      toast.error('Please fulfill all password strength requirements.');
      return;
    }

    try {
      if (currentState === 'Sign Up') {
        const res = await axios.post(backendUrl + "/api/user/register", { name, password, email })
        console.log(res.data)
        if (res.data.success) {
          setToken(res.data.token)
          localStorage.setItem("token", res.data.token)
        } else {
          toast.error(res.data.message)
        }
      }
      else {
        const res = await axios.post(backendUrl + "/api/user/login", { email, password })
        console.log(res.data)
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

  // Get dynamic strength color & label
  const getStrengthIndicator = () => {
    if (strengthScore <= 2) return { color: 'bg-rose-500', label: 'Weak', text: 'text-rose-500' };
    if (strengthScore <= 4) return { color: 'bg-amber-500', label: 'Medium', text: 'text-amber-500' };
    return { color: 'bg-emerald-500', label: 'Strong', text: 'text-emerald-500' };
  };

  const strength = getStrengthIndicator();

  return (
    <form onSubmit={onSubmitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 animate-fade-in'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='w-full px-3 py-2 border border-gray-800 rounded-lg outline-none focus:border-indigo-500 transition-colors' placeholder="Name" required />}
      <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800 rounded-lg outline-none focus:border-indigo-500 transition-colors' placeholder="Email" required />
      
      {/* Password Container */}
      <div className='w-full relative'>
        <input 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
          type={showPassword ? "text" : "password"} 
          className='w-full px-3 py-2 border border-gray-800 rounded-lg outline-none pr-10 focus:border-indigo-500 transition-colors' 
          placeholder="Password" 
          required 
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-slate-800 cursor-pointer focus:outline-none transition-colors'
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Password Strength Checklist & Suggestions */}
      {currentState === 'Sign Up' && password.length > 0 && (
        <div className='w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-left space-y-2 animate-fade-in shadow-sm shadow-slate-100'>
          <div className='flex justify-between items-center mb-1'>
            <span className='font-bold text-slate-700'>Password Strength:</span>
            <span className={`font-black ${strength.text} uppercase tracking-wider`}>{strength.label}</span>
          </div>
          
          {/* Progress bar indicator */}
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div class={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: `${(strengthScore / 5) * 100}%` }}></div>
          </div>
          
          <div className='grid grid-cols-1 gap-1 pt-1 text-slate-500'>
            <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasLength ? 'text-emerald-600' : ''}`}>
              <span className='text-xs'>{hasLength ? '✓' : '○'}</span> At least 8 characters
            </div>
            <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasUppercase ? 'text-emerald-600' : ''}`}>
              <span className='text-xs'>{hasUppercase ? '✓' : '○'}</span> Uppercase letter (A-Z)
            </div>
            <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasLowercase ? 'text-emerald-600' : ''}`}>
              <span className='text-xs'>{hasLowercase ? '✓' : '○'}</span> Lowercase letter (a-z)
            </div>
            <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasNumber ? 'text-emerald-600' : ''}`}>
              <span className='text-xs'>{hasNumber ? '✓' : '○'}</span> Numeric character (0-9)
            </div>
            <div className={`flex items-center gap-1.5 font-medium transition-colors duration-200 ${hasSpecial ? 'text-emerald-600' : ''}`}>
              <span className='text-xs'>{hasSpecial ? '✓' : '○'}</span> Special symbol (!@#$%^&*)
            </div>
          </div>
        </div>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p onClick={() => navigate('/forgot-password')} className='cursor-pointer text-slate-500 hover:text-slate-800 transition-colors'>Forgot your password</p>
        {
          currentState === 'Login'
            ? <p onClick={() => { setCurrentState('Sign Up'); setPassword(''); }} className='cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'>Create account</p>
            : <p onClick={() => { setCurrentState('Login'); setPassword(''); }} className='cursor-pointer font-semibold text-indigo-600 hover:text-indigo-700 transition-colors'>Login Here</p>
        }
      </div>
      <button className='bg-black text-white font-medium px-8 py-2.5 rounded-lg active:scale-95 transition-all mt-4 hover:opacity-90 cursor-pointer w-full'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
