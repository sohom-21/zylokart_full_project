'use client'
import AdminSidebar from '@/app/components/admin/AdminSidebar'
import AdminLayout from '@/app/components/admin/AdminLayout'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  Edit,
  Check,
  X,
  Calendar,
  Clock,
  Award,
  Activity,
  Key,
  Smartphone,
  Trash2,
  Building2
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { useState } from 'react'

export default function AccountPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'Admin User',
    email: 'admin@zylokart.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Administrator with 5+ years of experience in e-commerce management and customer service.',
    title: 'Senior Administrator',
    department: 'Operations'
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User, color: 'blue' },
    { id: 'security', name: 'Security', icon: Shield, color: 'green' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'yellow' },
    { id: 'preferences', name: 'Preferences', icon: Globe, color: 'purple' },
  ]

  const activityData = [
    { action: 'Password changed', time: '2 hours ago', icon: Key },
    { action: 'Profile updated', time: '1 day ago', icon: User },
    { action: 'Login from new device', time: '3 days ago', icon: Smartphone },
    { action: 'Email verified', time: '1 week ago', icon: Mail },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Save logic here
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="flex-1 flex flex-col pl-4">
        <AdminLayout onSidebarOpen={() => setSidebarCollapsed(false)}>
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-600 mt-1">Manage your account preferences and security settings</p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Last login</p>
                  <p className="text-sm font-medium text-gray-900">Today at 9:42 AM</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>

            {/* Profile Summary Card */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 py-6 text-white">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-white/20">
                      <AvatarImage src="/admin-avatar.jpg" />
                      <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">AD</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 p-2 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{profileData.name}</h2>
                    <p className="text-blue-100 text-lg">{profileData.title}</p>
                    <p className="text-blue-200 text-sm mt-1">{profileData.email}</p>
                    <div className="flex items-center mt-3 space-x-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-blue-200" />
                        <span className="text-sm text-blue-100">Joined January 2023</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-blue-200" />
                        <span className="text-sm text-blue-100">Premium Account</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <p className="text-sm text-blue-200">Account Score</p>
                      <p className="text-3xl font-bold">98%</p>
                      <p className="text-xs text-blue-300">Excellent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 sticky top-6">
                  <nav className="space-y-1">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                            activeTab === tab.id
                              ? 'bg-blue-50 text-blue-700 border-blue-200 border'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="mr-3 h-5 w-5" />
                          {tab.name}
                        </button>
                      )
                    })}
                  </nav>

                  {/* Activity Section */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <Activity className="h-4 w-4 mr-2" />
                      Recent Activity
                    </h4>
                    <div className="space-y-3">
                      {activityData.slice(0, 3).map((activity, index) => {
                        const Icon = activity.icon
                        return (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                              <Icon className="h-3 w-3 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-900 truncate">{activity.action}</p>
                              <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                  <div className="p-8">
                    {activeTab === 'profile' && (
                      <div className="space-y-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                          {!isEditing ? (
                            <button
                              onClick={() => setIsEditing(true)}
                              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Profile
                            </button>
                          ) : (
                            <div className="flex space-x-2">
                              <button
                                onClick={handleSaveProfile}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Save
                              </button>
                              <button
                                onClick={() => setIsEditing(false)}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Job Title
                            </label>
                            <div className="relative">
                              <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                value={profileData.title}
                                onChange={(e) => setProfileData({...profileData, title: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Location
                            </label>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                value={profileData.location}
                                onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Department
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <input
                                type="text"
                                value={profileData.department}
                                onChange={(e) => setProfileData({...profileData, department: e.target.value})}
                                disabled={!isEditing}
                                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                                  isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Bio
                          </label>
                          <textarea
                            rows={4}
                            value={profileData.bio}
                            onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                              isEditing ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50'
                            }`}
                          />
                        </div>

                        {/* Account Statistics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                          <div className="text-center p-6 bg-blue-50 rounded-xl">
                            <Clock className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                            <p className="text-2xl font-bold text-blue-600">247</p>
                            <p className="text-sm text-gray-600">Days Active</p>
                          </div>
                          <div className="text-center p-6 bg-green-50 rounded-xl">
                            <User className="h-10 w-10 text-green-600 mx-auto mb-3" />
                            <p className="text-2xl font-bold text-green-600">1,250</p>
                            <p className="text-sm text-gray-600">Customers Helped</p>
                          </div>
                          <div className="text-center p-6 bg-purple-50 rounded-xl">
                            <Award className="h-10 w-10 text-purple-600 mx-auto mb-3" />
                            <p className="text-2xl font-bold text-purple-600">98%</p>
                            <p className="text-sm text-gray-600">Satisfaction Rate</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'security' && (
                      <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
                        
                        {/* Password Section */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Change Password</h4>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Current Password
                              </label>
                              <div className="relative">
                                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-gray-400" />
                                  ) : (
                                    <Eye className="h-4 w-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  New Password
                                </label>
                                <input
                                  type="password"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Confirm New Password
                                </label>
                                <input
                                  type="password"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>

                            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                              Update Password
                            </button>
                          </div>
                        </div>

                        {/* Two-Factor Authentication */}
                        <div className="bg-green-50 rounded-xl p-6">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Two-Factor Authentication</h4>
                              <p className="text-sm text-gray-600 mb-4">Add an extra layer of security to your account</p>
                              <div className="flex items-center space-x-2 mb-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm text-gray-600">Disabled</span>
                              </div>
                            </div>
                            <Smartphone className="h-12 w-12 text-green-600" />
                          </div>
                          <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">
                            Enable 2FA
                          </button>
                        </div>

                        {/* Login Sessions */}
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-4">Active Sessions</h4>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                  <Globe className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">Chrome on Windows</p>
                                  <p className="text-sm text-gray-500">New York, USA • Current session</p>
                                </div>
                              </div>
                              <span className="text-sm text-green-600 font-medium">Active</span>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                  <Smartphone className="h-5 w-5 text-gray-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-gray-900">iPhone Safari</p>
                                  <p className="text-sm text-gray-500">Los Angeles, USA • 2 days ago</p>
                                </div>
                              </div>
                              <button className="text-sm text-red-600 hover:text-red-700">Revoke</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'notifications' && (
                      <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>
                        
                        <div className="space-y-6">
                          <div className="bg-blue-50 rounded-xl p-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">Order Notifications</h5>
                                  <p className="text-sm text-gray-600">Get notified about new orders and updates</p>
                                </div>
                                <input type="checkbox" defaultChecked className="rounded" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">Customer Messages</h5>
                                  <p className="text-sm text-gray-600">Receive customer support messages</p>
                                </div>
                                <input type="checkbox" defaultChecked className="rounded" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">System Updates</h5>
                                  <p className="text-sm text-gray-600">Get notified about system maintenance</p>
                                </div>
                                <input type="checkbox" className="rounded" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">Marketing Emails</h5>
                                  <p className="text-sm text-gray-600">Receive marketing and promotional emails</p>
                                </div>
                                <input type="checkbox" className="rounded" />
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-50 rounded-xl p-6">
                            <h4 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h4>
                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">Browser Notifications</h5>
                                  <p className="text-sm text-gray-600">Show notifications in your browser</p>
                                </div>
                                <input type="checkbox" defaultChecked className="rounded" />
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium text-gray-900">Mobile Push</h5>
                                  <p className="text-sm text-gray-600">Send notifications to your mobile device</p>
                                </div>
                                <input type="checkbox" className="rounded" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === 'preferences' && (
                      <div className="space-y-8">
                        <h3 className="text-xl font-semibold text-gray-900">General Preferences</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Language
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>English</option>
                              <option>Spanish</option>
                              <option>French</option>
                              <option>German</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Timezone
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>UTC-5 (Eastern Time)</option>
                              <option>UTC-8 (Pacific Time)</option>
                              <option>UTC+0 (GMT)</option>
                              <option>UTC+1 (Central European Time)</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Date Format
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Currency
                            </label>
                            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                              <option>USD ($)</option>
                              <option>EUR (€)</option>
                              <option>GBP (£)</option>
                              <option>JPY (¥)</option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">Dark Mode</h4>
                              <p className="text-sm text-gray-600">Enable dark theme for better night viewing</p>
                            </div>
                            <input type="checkbox" className="rounded" />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">Compact View</h4>
                              <p className="text-sm text-gray-600">Show more content in less space</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>

                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-gray-900">Auto-save</h4>
                              <p className="text-sm text-gray-600">Automatically save changes as you type</p>
                            </div>
                            <input type="checkbox" defaultChecked className="rounded" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AdminLayout>
      </div>
    </div>
  )
}
