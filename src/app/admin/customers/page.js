'use client'
import { useState } from "react";
import AdminSidebar from '@/app/components/admin/AdminSidebar';
import AdminLayout from '@/app/components/admin/AdminLayout'
import { 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  MoreHorizontal,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'

export default function CustomersPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const customers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      orders: 12,
      spent: '$2,340',
      status: 'active',
      joinDate: '2023-06-15',
      avatar: 'JD'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, USA',
      orders: 8,
      spent: '$1,890',
      status: 'active',
      joinDate: '2023-08-22',
      avatar: 'SS'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Chicago, USA',
      orders: 15,
      spent: '$3,120',
      status: 'inactive',
      joinDate: '2023-04-10',
      avatar: 'MJ'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1 (555) 321-0987',
      location: 'Miami, USA',
      orders: 6,
      spent: '$1,560',
      status: 'active',
      joinDate: '2023-09-05',
      avatar: 'ED'
    },
    {
      id: 5,
      name: 'Chris Wilson',
      email: 'chris@example.com',
      phone: '+1 (555) 654-3210',
      location: 'Seattle, USA',
      orders: 22,
      spent: '$4,780',
      status: 'active',
      joinDate: '2023-03-18',
      avatar: 'CW'
    }
  ]

  const getStatusColor = (status) => {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex-1 flex flex-col pl-4"> {/* Added pl-4 for gap */}
        <AdminLayout onSidebarOpen={() => setSidebarCollapsed(false)}>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                <p className="text-gray-600">Manage your customer base</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </button>
                <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Customer
                </button>
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
                      placeholder="Search customers..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">All Customers</h3>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Customer</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Contact</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Location</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Orders</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Spent</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Status</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Join Date</th>
                      <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm font-medium text-blue-600">{customer.avatar}</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{customer.name}</div>
                              <div className="text-sm text-gray-500">ID: {customer.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-4 w-4 mr-2" />
                              {customer.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-4 w-4 mr-2" />
                              {customer.phone}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="h-4 w-4 mr-2" />
                            {customer.location}
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium text-gray-900">{customer.orders}</td>
                        <td className="py-4 px-6 font-medium text-gray-900">{customer.spent}</td>
                        <td className="py-4 px-6">
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600">{customer.joinDate}</td>
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
      </div>
    </div>
  )
}
