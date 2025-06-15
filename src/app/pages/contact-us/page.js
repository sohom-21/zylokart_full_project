'use client'
import { useState } from 'react'
import Navbar from '../../components/Navbars/AuthNavbar'
import Footer from '../../components/Footer'

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send message')
      setSuccess(true)
      setForm({ name: '', email: '', message: '' })
    } catch {
      setError('Something went wrong. Please try again later.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-zinc-800 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-lg text-zinc-600 mb-8 text-center">
          Have questions, suggestions, or need help? Reach out to us and our team will get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow p-8">
          <div>
            <label className="block mb-1 font-medium text-zinc-700">Your Name</label>
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
            <label className="block mb-1 font-medium text-zinc-700">Your Email</label>
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
            <label className="block mb-1 font-medium text-zinc-700">Message</label>
            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-zinc-200 rounded focus:outline-none focus:ring-2 focus:ring-zinc-200"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-zinc-800 text-white rounded font-medium hover:bg-zinc-900 transition"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
          {success && (
            <div className="mt-4 text-center text-emerald-600">
              Message sent successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 text-center text-red-600">
              {error}
            </div>
          )}
        </form>
        <div className="mt-8 text-center text-zinc-600">
          Or email us directly at{' '}
          <a href="mailto:manas.raj.8271@gmail.com" className="underline hover:text-amber-500">
            manas.raj.8271@gmail.com
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}