import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../hooks/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)

  const { loading, handleRegister } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Use email as the username to satisfy the backend model
      const derivedUsername = email.split('@')[0] + Math.random().toString(36).substring(2, 6)
      await handleRegister({ username: derivedUsername, email, password })
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "Registration failed")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <span className="text-slate-400 font-medium">Creating account...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0A0F1C] px-6 relative overflow-hidden font-sans py-12">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        <div className="w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-[2.5rem] shadow-2xl p-10 md:p-12 relative z-10">
        
        {/* Back link */}
        <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        </Link>

        <div className="text-center mb-10 mt-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Create Account</h1>
          <p className="text-slate-400 text-sm font-light">Join AI Interviewer to get started</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-4 mb-8 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2.5 pl-1" htmlFor="email">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              id="email" 
              required
              className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-white placeholder:text-slate-500 font-light"
              placeholder="you@example.com" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2.5 pl-1" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input 
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"} 
                id="password" 
                required
                className="w-full px-5 py-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none transition-all text-white placeholder:text-slate-500 font-light pr-12"
                placeholder="••••••••" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] mt-6"
          >
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </main>
  )
}

export default Register
