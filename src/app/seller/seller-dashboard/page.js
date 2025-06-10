'use client'
import { useEffect, useState } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardChart from '@/app/components/charts/Monthlyorderschart'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'
import SellerDoughnutChart from '@/app/components/charts/Doughnutchart'

export default function SellerDashboard() {
    // Example state for backend data
    const [stats, setStats] = useState({
        products: 0,
        payments: 0,
        recentOrders: 0,
        user: { name: '', role: '' },
        orders: [],
        chartData: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace this with your actual API endpoint
        async function fetchDashboardData() {
            setLoading(true);
            try {
                const res = await fetch('/api/seller/dashboard', { cache: 'no-store' });
                const data = await res.json();
                setStats({
                    products: data.products,
                    payments: data.payments,
                    recentOrders: data.recentOrders,
                    user: data.user,
                    orders: data.orders,
                    chartData: data.chartData,
                });
            } catch (e) {
                // Handle error or show fallback UI
            }
            setLoading(false);
        }
        fetchDashboardData();
    }, []);

    return (
        <div className="bg-white min-h-screen w-full">
            <SellerNavbar />
            <div className="pt-16">
                <div className="flex">
                    {/* Sidebar as component */}
                    <SellerDashboardSidebar />

                    {/* Main Content */}
                    <main className="flex-1 relative min-h-[1221px] bg-stone-50 px-10 pt-8 pb-24">
                        {/* Topbar */}
                        <div className="w-full h-16 bg-white shadow flex items-center px-8 mb-8 rounded-2xl relative">
                            <div className="flex-1 text-2xl font-extrabold text-neutral-950 tracking-tight">Overview</div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-zinc-800 text-sm font-medium">
                                        {stats.user.name || 'Loading...'}
                                    </div>
                                    <div className="text-gray-400 text-xs">
                                        {stats.user.role || ''}
                                    </div>
                                </div>
                                <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full" />
                                <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="flex gap-8 mb-8">
                            <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center w-1/3 min-w-[300px]">
                                <div className="text-3xl font-black text-neutral-800">
                                    {loading ? '...' : stats.products}
                                </div>
                                <div className="text-neutral-500 text-sm">Number of Products</div>
                                <button className="mt-4 bg-orange-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-700 transition">View Products</button>
                            </div>
                            <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center w-1/3 min-w-[300px]">
                                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold mb-2">
                                    {loading ? '...' : stats.payments}
                                </div>
                                <div className="text-neutral-500 text-sm">Total payments received</div>
                            </div>
                            <div className="bg-white rounded-3xl shadow p-8 flex flex-col items-center w-1/3 min-w-[300px]">
                                <div className="w-16 h-16 rounded-full bg-amber-300 flex items-center justify-center text-black text-2xl font-bold mb-2">
                                    {loading ? '...' : stats.recentOrders}
                                </div>
                                <div className="text-neutral-500 text-sm">Recent Orders</div>
                            </div>
                        </div>
                        <div className='flex mb-8 gap-8 w-full flex-wrap justify-between'>
                        {/* Monthly Orders Chart */}
                        <div className="bg-white rounded-lg shadow p-8 mb-8 max-w-4xl min-w-3xl">
                            <div className="text-lg font-medium text-neutral-800 mb-1">Monthly Orders</div>
                            <div className="text-sm text-neutral-500 mb-4">Orders placed each month</div>
                            <SellerDashboardChart chartData={stats.chartData} loading={loading} />
                        </div>
                        <div className="bg-white rounded-lg shadow p-8 mb-8 max-w-xs">
                            <div className="text-lg font-medium text-neutral-800 mb-1">Order Status</div>
                            <div className="text-sm text-neutral-500 mb-4">Distribution of order statuses</div>
                            <SellerDoughnutChart data={stats.doughnutData} loading={loading} />
                        </div>
                        </div>

                        {/* Recent Orders Table */}
                        <div className="bg-white rounded-2xl shadow p-8">
                            <div className="text-lg font-extrabold text-neutral-800 mb-4">Recent Orders</div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <thead>
                                        <tr className="text-left text-neutral-500 border-b">
                                            <th className="py-2 px-4">Order No</th>
                                            <th className="py-2 px-4">Customer</th>
                                            <th className="py-2 px-4">Store/Market</th>
                                            <th className="py-2 px-4">Date</th>
                                            <th className="py-2 px-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="py-4 text-center text-gray-400">Loading...</td>
                                            </tr>
                                        ) : stats.orders.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-4 text-center text-gray-400">No orders found.</td>
                                            </tr>
                                        ) : (
                                            stats.orders.map((order, idx) => (
                                                <tr key={order.id || idx} className="border-b">
                                                    <td className="py-2 px-4">{order.orderNo}</td>
                                                    <td className="py-2 px-4">{order.customer}</td>
                                                    <td className="py-2 px-4">{order.store}</td>
                                                    <td className="py-2 px-4">{order.date}</td>
                                                    <td className="py-2 px-4">
                                                        <span
                                                            className={`inline-block w-2 h-2 rounded-full mr-2 ${order.status === 'Completed'
                                                                    ? 'bg-green-400'
                                                                    : order.status === 'Processing'
                                                                        ? 'bg-orange-400'
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
            </div>
            <Footer />
        </div>
    )
}