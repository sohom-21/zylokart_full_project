'use client'
import AdminLayout from '@/app/components/admin/AdminLayout'
import StatsCards from '@/app/components/admin/StatsCards'
import SalesChart from '@/app/components/admin/SalesChart'
import TrafficChart from '@/app/components/admin/TrafficChart'
import LatestProducts from '@/app/components/admin/LatestProducts'
import LatestOrders from '@/app/components/admin/LatestOrders'

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsCards />
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <SalesChart />
          </div>
          <div className="xl:col-span-1">
            <TrafficChart />
          </div>
        </div>

        {/* Latest Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LatestProducts />
          <LatestOrders />
        </div>
      </div>
    </AdminLayout>
  )
}
