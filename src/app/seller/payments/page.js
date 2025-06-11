'use client'
import { useEffect, useState } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'

export default function SellerPaymentsPage() {
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true)
      try {
        // Replace with your actual API endpoint for seller payments
        const res = await fetch('/api/seller/payments', { cache: 'no-store' })
        const data = await res.json()
        setPayments(data.payments || [])
      } catch (e) {
        setPayments([])
      }
      setLoading(false)
    }
    fetchPayments()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
      <SellerNavbar />
      <div className="pt-14 flex flex-1">
        <SellerDashboardSidebar />
        <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
          {/* Topbar */}
          <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
            <div className="flex-1 text-3xl font-extrabold text-neutral-950 tracking-tight">Payments</div>
            <div className="flex items-center gap-4">
              <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full border-2 border-amber-200 shadow" />
              <span className="w-3 h-3 bg-blue-500 rounded-full inline-block" />
            </div>
          </div>

          {/* Payments Table */}
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-stone-100">
            <div className="text-lg font-extrabold text-neutral-800 mb-6">All Payments</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-500 border-b">
                    <th className="py-3 px-4 font-semibold">Order No</th>
                    <th className="py-3 px-4 font-semibold">Customer</th>
                    <th className="py-3 px-4 font-semibold">Amount (₹)</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : payments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-400">No payments found.</td>
                    </tr>
                  ) : (
                    payments.map((payment, idx) => (
                      <tr
                        key={payment.id || idx}
                        className="border-b hover:bg-amber-50 transition"
                      >
                        <td className="py-3 px-4 font-medium">{payment.orderNo}</td>
                        <td className="py-3 px-4">{payment.customer}</td>
                        <td className="py-3 px-4 font-semibold text-green-700">₹{payment.amount}</td>
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              payment.status === 'Paid'
                                ? 'bg-green-400'
                                : payment.status === 'Pending'
                                  ? 'bg-orange-400'
                                  : 'bg-gray-300'
                            }`}
                          ></span>
                          {payment.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
