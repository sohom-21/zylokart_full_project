'use client'
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { createClient } from '@supabase/supabase-js'


export default function SellerSignup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    storeName: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      // Sign up user with Supabase Auth
      const { user, error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
            store_name: form.storeName,
            role: 'seller'
          }
        }
      })
      if (signUpError) throw signUpError

      // Optionally, insert seller profile into a "sellers" table
      const { error: insertError } = await supabase
        .from('sellers')
        .insert([
          {
            user_id: user?.id,
            name: form.name,
            email: form.email,
            store_name: form.storeName,
            created_at: new Date().toISOString()
          }
        ])
      if (insertError) throw insertError

      setSuccess(true)
      setForm({ name: '', email: '', password: '', storeName: '' })
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.')
    }
    setLoading(false)
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
              <label className="block mb-1 font-medium text-zinc-700">Store Name</label>
              <input
                type="text"
                name="storeName"
                value={form.storeName}
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
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200"
              />
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