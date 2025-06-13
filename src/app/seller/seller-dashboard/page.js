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
        <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
            <SellerNavbar />
            <div className="pt-14 flex flex-1">
                <SellerDashboardSidebar />
                <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
                    {/* Topbar */}
                    <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
                        <div className="flex-1 text-3xl font-extrabold text-neutral-950 tracking-tight">Overview</div>
                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <div className="text-zinc-800 text-base font-semibold">
                                    {stats.user.name || 'Loading...'}
                                </div>
                                <div className="text-gray-400 text-xs">
                                    {stats.user.role || ''}
                                </div>
                            </div>
                            <img src="https://placehold.co/40x40" alt="User" className="w-10 h-10 rounded-full border-2 border-amber-200 shadow" />
                            <span className="w-3 h-3 bg-red-600 rounded-full inline-block" />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                        <div className="bg-gradient-to-br from-amber-100 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-amber-200 hover:scale-[1.02] transition-transform">
                            <div className="text-4xl font-black text-neutral-800 mb-2">
                                {loading ? '...' : stats.products}
                            </div>
                            <div className="text-neutral-500 text-base font-medium">Products</div>
                            <button className="mt-6 bg-orange-500 text-white px-7 py-2.5 rounded-lg font-semibold hover:bg-orange-600 transition shadow">
                                View Products
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-blue-200 hover:scale-[1.02] transition-transform">
                            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold mb-2 shadow-lg">
                                {loading ? '...' : stats.payments}
                            </div>
                            <div className="text-neutral-500 text-base font-medium">Payments Received</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-200 to-white rounded-3xl shadow-xl p-8 flex flex-col items-center border border-amber-300 hover:scale-[1.02] transition-transform">
                            <div className="w-16 h-16 rounded-full bg-amber-300 flex items-center justify-center text-black text-3xl font-bold mb-2 shadow-lg">
                                {loading ? '...' : stats.recentOrders}
                            </div>
                            <div className="text-neutral-500 text-base font-medium">Recent Orders</div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 mb-10 w-full">
                        {/* Monthly Orders Chart */}
                        <div className="bg-white/90 rounded-3xl shadow-xl p-8 flex-1 border border-stone-100 min-w-[320px]">
                            <div className="text-lg font-semibold text-neutral-800 mb-1">Monthly Orders</div>
                            <div className="text-sm text-neutral-500 mb-4">Orders placed each month</div>
                            <SellerDashboardChart chartData={stats.chartData} loading={loading} />
                        </div>
                        <div className="bg-white/90 rounded-3xl shadow-xl p-8 w-full max-w-xs border border-stone-100">
                            <div className="text-lg font-semibold text-neutral-800 mb-1">Order Status</div>
                            <div className="text-sm text-neutral-500 mb-4">Distribution of order statuses</div>
                            <SellerDoughnutChart data={stats.doughnutData} loading={loading} />
                        </div>
                    </div>

                    {/* Recent Orders Table */}
                    <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-stone-100">
                        <div className="text-lg font-extrabold text-neutral-800 mb-6">Recent Orders</div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-left text-neutral-500 border-b">
                                        <th className="py-3 px-4 font-semibold">Order No</th>
                                        <th className="py-3 px-4 font-semibold">Customer</th>
                                        <th className="py-3 px-4 font-semibold">Store/Market</th>
                                        <th className="py-3 px-4 font-semibold">Date</th>
                                        <th className="py-3 px-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-400">Loading...</td>
                                        </tr>
                                    ) : stats.orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="py-6 text-center text-gray-400">No orders found.</td>
                                        </tr>
                                    ) : (
                                        stats.orders.map((order, idx) => (
                                            <tr
                                                key={order.id || idx}
                                                className="border-b hover:bg-amber-50 transition"
                                            >
                                                <td className="py-3 px-4 font-medium">{order.orderNo}</td>
                                                <td className="py-3 px-4">{order.customer}</td>
                                                <td className="py-3 px-4">{order.store}</td>
                                                <td className="py-3 px-4">{order.date}</td>
                                                <td className="py-3 px-4">
                                                    <span
                                                        className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                                            order.status === 'Completed'
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
            <Footer />
        </div>
    )
}