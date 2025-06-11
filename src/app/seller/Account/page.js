'use client'
import { useEffect, useState } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'

export default function SellerAccountPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  })
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function fetchAccount() {
      setLoading(true)
      setMsg('')
      try {
        // Replace with your actual API endpoint for seller account
        const res = await fetch('/api/seller/account', { cache: 'no-store' })
        const data = await res.json()
        setForm({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        })
      } catch (e) {
        setMsg('Failed to fetch account data.')
      }
      setLoading(false)
    }
    fetchAccount()
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setMsg('')
    setLoading(true)
    try {
      // Replace with your actual API endpoint for updating seller account
      const res = await fetch('/api/seller/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to update account')
      setMsg('Account updated successfully!')
      setEditMode(false)
    } catch (e) {
      setMsg('Failed to update account.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
      <SellerNavbar />
      <div className="pt-14 flex flex-1">
        <SellerDashboardSidebar />
        <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
          {/* Topbar */}
          <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
            <div className="flex-1 text-3xl font-extrabold text-neutral-950 tracking-tight">My Account</div>
            <div className="flex items-center gap-4">
              <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full border-2 border-amber-200 shadow" />
              <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
            </div>
          </div>

          <div className="max-w-xl mx-auto bg-white/90 rounded-3xl shadow-xl p-8 border border-stone-100">
            <div className="text-lg font-extrabold text-neutral-800 mb-6">Personal Information</div>
            {msg && <div className="mb-4 text-center text-sm text-blue-600">{msg}</div>}
            {loading ? (
              <div className="text-center text-gray-400 py-8">Loading...</div>
            ) : (
              <form className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    placeholder="you@email.com"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Address</label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="w-full border px-3 py-2 rounded bg-gray-50"
                    placeholder="Address"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  {editMode ? (
                    <>
                      <button
                        type="button"
                        className="bg-green-500 text-white px-6 py-2 rounded font-semibold hover:bg-green-600 transition"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="bg-gray-300 text-black px-6 py-2 rounded font-semibold hover:bg-gray-400 transition"
                        onClick={() => setEditMode(false)}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition"
                      onClick={() => setEditMode(true)}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
