// src/pages/Login.jsx
import { useState } from 'react'
import { Brain, Zap, Eye, EyeOff, AlertTriangle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import DisclaimerBanner from '../components/layout/DisclaimerBanner'

export default function Login() {
  const { login, demoLogin, loading } = useAuth()
  const [email, setEmail]           = useState('')
  const [password, setPassword]     = useState('')
  const [showPass, setShowPass]     = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <div className="min-h-screen bg-[#080D14] flex flex-col">
      <DisclaimerBanner />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          {/* Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-14 w-14 rounded-2xl bg-[rgba(10,132,255,0.1)] border border-[rgba(10,132,255,0.3)] items-center justify-center mb-2">
              <Brain size={28} className="text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-[#E8F0FF]">MedVision AI</h1>
            <p className="text-sm text-[#7A90B0]">Sign in to your account</p>
          </div>

          {/* Card */}
          <div className="bg-[#0F1623] border border-[#1E2D45] rounded-2xl p-6 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full bg-[#161F30] border border-[#1E2D45] rounded-xl px-4 py-3 text-sm text-[#E8F0FF] placeholder-[#3D5470] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7A90B0] uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full bg-[#161F30] border border-[#1E2D45] rounded-xl px-4 py-3 pr-10 text-sm text-[#E8F0FF] placeholder-[#3D5470] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3D5470] hover:text-[#7A90B0] transition-colors"
                  >
                    {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="w-full py-3 rounded-xl bg-primary text-white font-semibold text-sm hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in…' : 'Sign In'}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1E2D45]" />
              <span className="text-xs text-[#3D5470]">OR</span>
              <div className="flex-1 h-px bg-[#1E2D45]" />
            </div>

            {/* Demo mode — critical for hackathon */}
            <button
              onClick={demoLogin}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[rgba(167,139,250,0.1)] border border-[rgba(167,139,250,0.3)] text-[#A78BFA] font-semibold text-sm hover:bg-[rgba(167,139,250,0.15)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Zap size={16} />
              Enter Demo Mode
            </button>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-2 p-3 rounded-xl bg-[rgba(251,146,60,0.06)] border border-[rgba(251,146,60,0.15)]">
            <AlertTriangle size={12} className="text-[#FB923C] mt-0.5 shrink-0" />
            <p className="text-xs text-[#7A90B0]">
              This is an educational prototype. No real medical data is processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
