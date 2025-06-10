'use client'
import Navbar from '@/app/components/Navbar'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { useState } from 'react'
import { signIn } from '@/app/utiils/supabase/auth'
import { Toaster, toast } from 'react-hot-toast'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    setLoading(true)
    try {
      const { error } = await signIn(form.email, form.password)
      if (error) {
        setMessage(error.message)
        toast.error(error.message)
      } else {
        setMessage('Login successful! Redirecting...')
        toast.success('Login successful! Redirecting...')
        // Optionally redirect to a dashboard or home page
        // window.location.href = '/dashboard'
      }
    } catch(error) {
      setMessage(error.message || 'An error occurred. Please try again later.')
      toast.error(error.message || 'An error occurred. Please try again later.')
      console.error('Login error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#6683AC_0%,_rgba(66,52,147,0.94)_100%)]">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12 gap-12 max-w-6xl mx-auto w-full">
        {/* Left: Shop at your leisure */}
        <div className="flex-1 flex flex-col justify-center items-start mb-12 md:mb-0">
          <span className="block text-white text-3xl font-normal font-['Inter'] mb-2">
            Shop at your leisure ......
          </span>
          <span className="block text-white text-7xl font-normal font-['Inter']">
            🛒
          </span>
        </div>
        {/* Right: Login Form */}
        <div className="flex-1 w-full max-w-md bg-white/20 rounded-2xl shadow-lg border border-white/20 p-8 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <span className="text-3xl font-bold font-['Playfair_Display'] text-white tracking-widest">Zylokart</span>
          </div>
          <div className="flex justify-center mb-8 gap-8">
            <Link href="/auth/signup" className="text-white text-lg font-bold font-['Inter'] opacity-70 hover:opacity-100 transition">Sign Up</Link>
            <span className="text-white text-lg font-bold font-['Inter'] border-b-2 border-white pb-1">Login</span>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-base font-normal mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <label className="block text-white text-base font-normal mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="accent-indigo-500"
                />
                <label htmlFor="remember" className="text-white text-sm">Remember me</label>
              </div>
              <Link href="/auth/resetpassword" className="text-xs text-white/80 hover:underline">Forgot Password?</Link>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-lg bg-white/20 text-white font-bold font-['Inter'] text-lg shadow hover:bg-white/30 transition"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
            {message && (
              <div className="text-center text-white mt-2">{message}</div>
            )}
          </form>
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}