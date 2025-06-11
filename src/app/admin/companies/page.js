'use client'
import AdminLayout from '@/app/components/admin/AdminLayout'
import { 
  Search, 
  Filter, 
  Download, 
  Building2, 
  MoreHorizontal,
  Globe,
  Users,
  DollarSign,
  Calendar
} from 'lucide-react'

export default function CompaniesPage() {
  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      industry: 'Technology',
      website: 'techcorp.com',
      employees: 250,
      revenue: '$2.5M',
      status: 'active',
      joinDate: '2023-01-15',
      logo: 'TC',
      orders: 45,
      contact: 'contact@techcorp.com'
    },
    {
      id: 2,
      name: 'Global Industries',
      industry: 'Manufacturing',
      website: 'globalind.com',
      employees: 800,
      revenue: '$8.2M',
      status: 'active',
      joinDate: '2022-11-08',
      logo: 'GI',
      orders: 128,
      contact: 'info@globalind.com'
    },
    {
      id: 3,
      name: 'StartupX Inc',
      industry: 'Software',
      website: 'startupx.io',
      employees: 45,
      revenue: '$750K',
      status: 'pending',
      joinDate: '2023-06-22',
      logo: 'SX',
      orders: 12,
      contact: 'hello@startupx.io'
    },
    {
      id: 4,
      name: 'MegaRetail Co',
      industry: 'Retail',
      website: 'megaretail.com',
      employees: 1200,
      revenue: '$15.8M',
      status: 'active',
      joinDate: '2022-08-14',
      logo: 'MR',
      orders: 256,
      contact: 'orders@megaretail.com'
    },
    {
      id: 5,
      name: 'Innovation Labs',
      industry: 'Research',
      website: 'innovlabs.org',
      employees: 85,
      revenue: '$1.2M',
      status: 'inactive',
      joinDate: '2023-03-30',
      logo: 'IL',
      orders: 23,
      contact: 'research@innovlabs.org'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
            <p className="text-gray-600">Manage your business clients</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Building2 className="h-4 w-4 mr-2" />
              Add Company
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-50">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Companies</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-50">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Companies</p>
                <p className="text-2xl font-bold text-gray-900">132</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-yellow-50">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-50">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$28.2M</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>All Industries</option>
              <option>Technology</option>
              <option>Manufacturing</option>
              <option>Retail</option>
              <option>Software</option>
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>

        {/* Companies Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">All Companies</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Company</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Industry</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Website</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Employees</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Revenue</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Orders</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Status</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => (
                  <tr key={company.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-sm font-medium text-purple-600">{company.logo}</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{company.industry}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-blue-600">
                        <Globe className="h-4 w-4 mr-2" />
                        {company.website}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{company.employees}</td>
                    <td className="py-4 px-6 font-medium text-gray-900">{company.revenue}</td>
                    <td className="py-4 px-6 text-gray-600">{company.orders}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(company.status)}`}>
                        {company.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
