'use client'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../../components/Navbars/Navbar-landing'
import Footer from '../../components/Footer'
import { useRouter } from 'next/navigation'
import { signUp } from '@/app/utiils/supabase/auth'

export default function SellerSignup() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({
      ...f,
      [name]: value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      // Use the shared signUp function
      const { error: signUpError } = await signUp(form.email, form.password, { full_name: form.name, role: 'seller' })
      if (signUpError) {
        setError(signUpError.message)
      } else {
        setSuccess(true)
        setForm({ name: '', email: '', password: '', confirmPassword: '' })
        // Route to seller details page with role query parameter
        router.push('/seller/sellerDetails?role=seller')
      }
    } catch (err) {
      setError('An error occurred. Please try again later.')
      console.error('Sign up error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold font-['Playfair_Display'] text-zinc-800 mb-6 text-center">
            Seller Sign Up
          </h1>
          {success && (
            <div className="mb-4 text-green-600 text-center">
              Signup successful! Please check your email to verify your account.
            </div>
          )}
          {error && (
            <div className="mb-4 text-red-600 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 font-medium text-zinc-700">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-zinc-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-zinc-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 8.75C4.454 10.86 6.165 12.57 8.275 13.044c1.996.45 3.996-.002 3.996-.002s.002-2.001-.448-3.997c-.474-2.11-2.186-3.822-4.296-4.295C6.275 4.302 4.275 4.75 4.275 4.75s-.002 2.001.448 3.997Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25h.007v.008h-.007V17.25ZM12 17.25h.007v.008H12V17.25Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium text-zinc-700">Confirm Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.981 8.75C4.454 10.86 6.165 12.57 8.275 13.044c1.996.45 3.996-.002 3.996-.002s.002-2.001-.448-3.997c-.474-2.11-2.186-3.822-4.296-4.295C6.275 4.302 4.275 4.75 4.275 4.75s-.002 2.001.448 3.997Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25h.007v.008h-.007V17.25ZM12 17.25h.007v.008H12V17.25Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9Z" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-zinc-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-zinc-800 text-white rounded font-medium hover:bg-zinc-900 transition"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <div className="mt-4 text-center text-sm text-zinc-600">
            Already have a seller account?{' '}
            <Link href="/auth/login" className="text-zinc-800 font-medium hover:underline">
              Login
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}