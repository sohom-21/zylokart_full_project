// This file defines the Admin Settings page.
// It is used to configure various settings for the admin panel.
'use client'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import AdminLayout from '@/app/components/admin/AdminLayout'
import { 
  Settings, 
  Save, 
  Upload,
  Shield,
  Bell,
  Globe,
  Database,
  Mail,
  Palette,
  Monitor,
  Users,
  Key,
  Trash2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { useState } from 'react'
export default function SettingsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'integrations', name: 'Integrations', icon: Globe },
    { id: 'advanced', name: 'Advanced', icon: Database },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex-1 flex flex-col">
        <AdminLayout onSidebarOpen={() => setSidebarCollapsed(false)}>
          <div className="space-y-6 p-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-600">Manage your application settings and preferences</p>
              </div>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-4 text-sm font-medium border-b-2 ${
                          activeTab === tab.id
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {tab.name}
                      </button>
                    )
                  })}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site Name
                        </label>
                        <input
                          type="text"
                          defaultValue="ZyloKart Admin"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Site URL
                        </label>
                        <input
                          type="url"
                          defaultValue="https://admin.zylokart.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          defaultValue="admin@zylokart.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Default Language
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        rows={3}
                        defaultValue="ZyloKart Admin Dashboard - Manage your e-commerce business efficiently"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Logo
                      </label>
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold text-xl">ZK</span>
                        </div>
                        <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload New Logo
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Appearance Settings</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Theme
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500">
                            <div className="w-full h-16 bg-white border rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Light</p>
                          </div>
                          <div className="border border-blue-500 bg-blue-50 rounded-lg p-4 cursor-pointer">
                            <div className="w-full h-16 bg-gray-800 rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Dark</p>
                          </div>
                          <div className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:border-blue-500">
                            <div className="w-full h-16 bg-gradient-to-r from-white to-gray-800 rounded mb-2"></div>
                            <p className="text-sm font-medium text-center">Auto</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex space-x-2">
                          <div className="w-8 h-8 bg-blue-600 rounded-full border-2 border-blue-600"></div>
                          <div className="w-8 h-8 bg-green-600 rounded-full border-2 border-gray-300"></div>
                          <div className="w-8 h-8 bg-purple-600 rounded-full border-2 border-gray-300"></div>
                          <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-gray-300"></div>
                          <div className="w-8 h-8 bg-yellow-600 rounded-full border-2 border-gray-300"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Sidebar Auto-collapse</h4>
                          <p className="text-sm text-gray-600">Automatically collapse sidebar on smaller screens</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Animations</h4>
                          <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Email Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">New customer registrations</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">New orders</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Low inventory alerts</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">System maintenance</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Push Notifications</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Browser notifications</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Mobile notifications</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notification Email Template
                        </label>
                        <textarea
                          rows={4}
                          defaultValue="Hello {{name}}, you have a new notification from ZyloKart Admin..."
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Security Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                          Security Policies
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Require two-factor authentication</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Force password reset every 90 days</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable session timeout</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session Timeout (minutes)
                          </label>
                          <input
                            type="number"
                            defaultValue="30"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Max Login Attempts
                          </label>
                          <input
                            type="number"
                            defaultValue="5"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="bg-yellow-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-2">API Security</h4>
                        <p className="text-sm text-gray-600 mb-3">Manage API access and rate limiting</p>
                        <div className="flex space-x-4">
                          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg text-sm font-medium hover:bg-yellow-700">
                            Regenerate API Key
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                            View Rate Limits
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'integrations' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Integrations</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Email Service</h4>
                          <span className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Connected
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">SendGrid Email API</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Payment Gateway</h4>
                          <span className="text-sm text-green-600 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Connected
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Stripe Payment Processing</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Analytics</h4>
                          <span className="text-sm text-gray-500">Not Connected</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Google Analytics</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Connect</button>
                      </div>

                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">Cloud Storage</h4>
                          <span className="text-sm text-gray-500">Not Connected</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">AWS S3 Storage</p>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Connect</button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Settings</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Database Settings</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Backup Frequency
                            </label>
                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Retention Period (days)
                            </label>
                            <input
                              type="number"
                              defaultValue="30"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Performance</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable caching</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Compress responses</span>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Enable CDN</span>
                            <input type="checkbox" className="rounded" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Trash2 className="h-5 w-5 text-red-600 mr-2" />
                          Danger Zone
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">These actions cannot be undone</p>
                        <div className="space-y-2">
                          <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50">
                            Clear All Cache
                          </button>
                          <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg text-sm font-medium hover:bg-red-50">
                            Reset All Settings
                          </button>
                          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
                            Delete All Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </AdminLayout>
      </div>
    </div>
  )
}
