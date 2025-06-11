"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  User,
  Settings,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // For mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); // For desktop
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Companies", href: "/admin/companies", icon: Building2 },
    { name: "Account", href: "/admin/account", icon: User },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile sidebar (fixed) */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-50 bg-slate-900 shadow-lg transform transition-all duration-300 ease-in-out w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">ZyloKart Admin</h1>
          <button
            className="p-1 rounded-lg hover:bg-slate-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-300" />
          </button>
        </div>
        <nav className="mt-8 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-2 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-slate-800 hover:text-white"
                }`}
                title={item.name}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User section at bottom for mobile */}
        <div className="absolute bottom-6 left-4 right-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/admin-avatar.jpg" />
                <AvatarFallback className="text-sm bg-blue-600 text-white">
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-gray-400 truncate">Premium Plan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar (part of flex layout) */}
      <div
        className={`hidden lg:flex flex-col bg-slate-900 shadow-lg transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ minHeight: '100vh' }}
      >
        <div className="flex flex-col flex-1">
          <div>
            <div className={`flex items-center h-16 border-b border-slate-700 ${sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'}`}>
              {!sidebarCollapsed && (
                <h1 className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden">ZyloKart Admin</h1>
              )}
              <button
                className="p-1 rounded-lg hover:bg-slate-800"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {sidebarCollapsed ? (
                  <ChevronRight className="h-5 w-5 text-gray-300" />
                ) : (
                  <ChevronLeft className="h-5 w-5 text-gray-300" />
                )}
              </button>
            </div>
            <nav className={`mt-8 ${sidebarCollapsed ? 'px-2' : 'px-4'}`}>
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center py-3 text-sm font-medium rounded-lg transition-colors mb-2 w-full ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-slate-800 hover:text-white"
                    } ${
                      sidebarCollapsed
                        ? 'justify-center px-2' 
                        : 'px-4'
                    }`}
                    title={item.name}
                  >
                    <Icon className={`h-5 w-5 ${sidebarCollapsed ? '' : 'mr-3'}`} />
                    {!sidebarCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User section at bottom (desktop) */}
          {sidebarCollapsed ? (
             <div className="mt-auto p-4 flex justify-center items-center">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/admin-avatar.jpg" />
                  <AvatarFallback className="text-sm bg-blue-600 text-white">
                    AD
                  </AvatarFallback>
                </Avatar>
             </div>
          ) : (
            <div className="mt-auto p-4">
              <div className="bg-slate-800 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/admin-avatar.jpg" />
                    <AvatarFallback className="text-sm bg-blue-600 text-white">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-400 truncate">Premium Plan</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main content wrapper */}
      <div className={`flex-1 flex flex-col ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'} ml-0 transition-all duration-300`}>
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-6 w-6" />
            </button>

            {/* Search bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Header actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="h-5 w-5" />
              </button>

              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/admin-avatar.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    Admin User
                  </p>
                  <p className="text-xs text-gray-500">admin@zylokart.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>{" "}
        {/* Page content */}
        <main className="flex-1 bg-gray-50"> {/* Added flex-1 and bg-gray-50 for consistency if needed */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
