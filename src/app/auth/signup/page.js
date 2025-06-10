'use client'
import Navbar from '@/app/components/Navbars/Navbar-landing'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { signUp } from '@/app/utiils/supabase/auth'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
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
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match')
      toast.error('Passwords do not match')
      return
    }
    if (!form.terms) {
      setMessage('You must agree to the terms')
      toast.error('You must agree to the terms')
      return
    }
    setLoading(true)
    try {
      const { error } = await signUp(form.email, form.password)
      if (error) {
        setMessage(error.message)
        toast.error(error.message)
      } else {
        setMessage('Sign up successful! Please check your email for confirmation.')
        toast.success('Sign up successful! Please check your email for confirmation.')
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        })
      }
    }
    catch (error) {
      setMessage('An error occurred. Please try again later.')
      toast.error('An error occurred. Please try again later.')
      console.error('Sign up error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,_#7175CC_17%,_rgba(66,_52,_147,_0.89)_87%)]">
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
        {/* Right: Signup Form */}
        <div className="flex-1 w-full max-w-md bg-white/20 rounded-2xl shadow-lg border border-white/20 p-8 backdrop-blur-md">
          <div className="flex justify-center mb-6">
            <span className="text-3xl font-bold font-['Playfair_Display'] text-white tracking-widest">Zylokart</span>
          </div>
          <div className="flex justify-center mb-8 gap-8">
            <span className="text-white text-lg font-bold font-['Inter'] border-b-2 border-white pb-1">Sign Up</span>
            <Link href="/auth/login" className="text-white text-lg font-bold font-['Inter'] opacity-70 hover:opacity-100 transition">Login</Link>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-white text-base font-normal mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>
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
                autoComplete="new-password"
                required
              />
            </div>
            <div>
              <label className="block text-white text-base font-normal mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={form.terms}
                onChange={handleChange}
                className="accent-indigo-500"
                required
              />
              <label htmlFor="terms" className="text-white text-sm">I agree to the <Link href="/terms" className="underline">Terms and Conditions</Link></label>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-2 rounded-lg bg-white/20 text-white font-bold font-['Inter'] text-lg shadow hover:bg-white/30 transition"
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
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