'use client'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'
import { 
  getSellerOrdersWithDetails, 
  getSellerOrdersByStatus, 
  updateSellerOrderStatus, 
  getSellerOrderStats,
  searchSellerOrders 
} from '@/app/utiils/supabase/seller-orders'
import { getSellerByUserId } from '@/app/utiils/supabase/seller'

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [currentSeller, setCurrentSeller] = useState(null)
  const [filteredOrders, setFilteredOrders] = useState([])
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [updateLoading, setUpdateLoading] = useState({})
  const [selectedOrders, setSelectedOrders] = useState([])
  useEffect(() => {
    initializeSeller()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function initializeSeller() {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        console.error('No user ID found')
        setLoading(false)
        return
      }

      const { data: seller, error: sellerError } = await getSellerByUserId(userId)
      if (sellerError || !seller) {
        console.error('Seller not found:', sellerError)
        setLoading(false)
        return
      }

      setCurrentSeller(seller)
      await fetchOrders(seller.seller_id)
      await fetchStats(seller.seller_id)
    } catch (error) {
      console.error('Error initializing seller:', error)
      setLoading(false)
    }
  }

  async function fetchOrders(seller_id) {
    setLoading(true)
    try {
      const { data, error } = await getSellerOrdersWithDetails(seller_id, 1, 50)
      if (error) {
        console.error('Error fetching orders:', error)
        setOrders([])
      } else {
        setOrders(data || [])
        setFilteredOrders(data || [])
      }
    } catch (e) {
      console.error('Fetch orders error:', e)
      setOrders([])
    }
    setLoading(false)
  }

  async function fetchStats(seller_id) {
    try {
      const { data, error } = await getSellerOrderStats(seller_id)
      if (!error && data) {
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  async function handleStatusUpdate(orderId, newStatus) {
    setUpdateLoading(prev => ({ ...prev, [orderId]: true }))
    try {
      const { data, error } = await updateSellerOrderStatus(orderId, newStatus)
      if (error) {
        alert('Failed to update order status')
        return
      }
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      setFilteredOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ))
      
      // Refresh stats
      if (currentSeller) {
        await fetchStats(currentSeller.seller_id)
      }
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update order status')
    } finally {
      setUpdateLoading(prev => ({ ...prev, [orderId]: false }))
    }
  }
  const filterOrders = useCallback(() => {
    let filtered = orders

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toString().includes(searchTerm.toLowerCase()) ||
        order.Products?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Users?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.Users?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredOrders(filtered)
  }, [orders, statusFilter, searchTerm])

  useEffect(() => {
    filterOrders()
  }, [filterOrders])

  function getStatusColor(status) {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount)
  }  if (!currentSeller && !loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">You need to be a registered seller to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
      <SellerNavbar />
      <div className="pt-14 flex flex-1">
        <SellerDashboardSidebar />
        <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
          {/* Header */}
          <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
            <div className="flex-1">
              <h1 className="text-3xl font-extrabold text-neutral-950 tracking-tight">Orders Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage and track your product orders</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right text-sm">
                <div className="font-semibold text-gray-900">{currentSeller?.shop_name || 'Seller'}</div>
                <div className="text-gray-500">Online</div>
              </div>
              <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
            </div>
          </div>

          {/* Statistics Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total_orders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.total_revenue)}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pending_orders}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-stone-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-green-600">{stats.delivered_orders}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Search */}
          <div className="bg-white/90 rounded-2xl p-6 shadow-lg border border-stone-100 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by order ID, customer name, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'pending', 'processing', 'delivered', 'cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      statusFilter === status
                        ? 'bg-amber-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-white/90 rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Orders ({filteredOrders.length})
                </h2>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider truncate">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
                          <span className="ml-3 text-gray-500">Loading orders...</span>
                        </div>
                      </td>
                    </tr>
                  ) : filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <div className="text-gray-400">
                          <svg className="mx-auto h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <p className="mt-2 text-sm font-medium">No orders found</p>
                          <p className="text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                          <div className="text-sm text-gray-500">Qty: {order.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">                            {order.Products?.image_url && (
                              <div className="flex-shrink-0 h-10 w-10">
                                <img 
                                  className="h-12 w-12 rounded object-cover border" 
                                  src={order.Products.image_url} 
                                  alt={order.Products.name || "Product"} 
                                  // className="h-20 w-20 object-cover rounded"
                                />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-50">{order.Products?.name}</div>
                              <div className="text-sm text-gray-500">{order.Products?.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.Users?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{order.Users?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{formatCurrency(order.total_price)}</div>
                          <div className="text-sm text-gray-500">
                            {formatCurrency(order.Products?.price_offered || order.Products?.price || 0)} × {order.quantity}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                            disabled={updateLoading[order.id]}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-amber-500 focus:border-transparent disabled:opacity-50"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          {updateLoading[order.id] && (
                            <div className="mt-1">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-amber-500"></div>
                            </div>
                          )}
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
