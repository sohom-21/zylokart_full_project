'use client'
import { useEffect, useState } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true)
      try {
        // Replace with your actual API endpoint for seller orders
        const res = await fetch('/api/seller/orders', { cache: 'no-store' })
        const data = await res.json()
        setOrders(data.orders || [])
      } catch (e) {
        setOrders([])
      }
      setLoading(false)
    }
    fetchOrders()
  }, [])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
      <SellerNavbar />
      <div className="pt-14 flex flex-1">
        <SellerDashboardSidebar />
        <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
          {/* Topbar */}
          <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
            <div className="flex-1 text-3xl font-extrabold text-neutral-950 tracking-tight">Orders</div>
            <div className="flex items-center gap-4">
              <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full border-2 border-amber-200 shadow" />
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-stone-100">
            <div className="text-lg font-extrabold text-neutral-800 mb-6">All Orders</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-500 border-b">
                    <th className="py-3 px-4 font-semibold">Order No</th>
                    <th className="py-3 px-4 font-semibold">Product</th>
                    <th className="py-3 px-4 font-semibold">Customer</th>
                    <th className="py-3 px-4 font-semibold">Quantity</th>
                    <th className="py-3 px-4 font-semibold">Total (₹)</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : orders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">No orders found.</td>
                    </tr>
                  ) : (
                    orders.map((order, idx) => (
                      <tr
                        key={order.id || idx}
                        className="border-b hover:bg-amber-50 transition"
                      >
                        <td className="py-3 px-4 font-medium">{order.orderNo}</td>
                        <td className="py-3 px-4 flex items-center gap-2">
                          {order.productImage && (
                            <img src={order.productImage} alt="" className="w-8 h-8 rounded object-cover border" />
                          )}
                          <span>{order.productName}</span>
                        </td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.quantity}</td>
                        <td className="py-3 px-4">₹{order.total}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              order.status === 'Completed'
                                ? 'bg-green-400'
                                : order.status === 'Processing'
                                  ? 'bg-orange-400'
                                  : order.status === 'Cancelled'
                                    ? 'bg-red-400'
                                    : 'bg-gray-300'
                            }`}
                          ></span>
                          {order.status}
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
