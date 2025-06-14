'use client'

// This file defines the AdminSidebar component.
// It provides navigation links for the admin panel.
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Building2,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

const navigation = [
  { name: "Overview", href: "/admin", icon: LayoutDashboard },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Companies", href: "/admin/companies", icon: Building2 },
  { name: "Account", href: "/admin/account", icon: User },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar({ collapsed, setCollapsed }) {
  const pathname = usePathname();

  return (
    <aside
      className={`hidden lg:flex flex-col bg-slate-900 shadow-lg transition-all duration-300 ease-in-out ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{ minHeight: "100vh" }}
    >
      <div className="flex flex-col flex-1">
        <div>
          <div
            className={`flex items-center h-16 border-b border-slate-700 ${
              collapsed ? "justify-center px-2" : "justify-between px-4"
            }`}
          >
            {!collapsed && (
              <h1 className="text-lg font-semibold text-white whitespace-nowrap overflow-hidden">
                ZyloKart Admin
              </h1>
            )}
            <button
              className="p-1 rounded-lg hover:bg-slate-800"
              onClick={() => setCollapsed(!collapsed)}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-300" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-300" />
              )}
            </button>
          </div>
          <nav className={`mt-8 ${collapsed ? "px-2" : "px-4"}`}>
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
                  } ${collapsed ? "justify-center px-2" : "px-4"}`}
                  title={item.name}
                >
                  <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
                  {!collapsed && (
                    <span className="whitespace-nowrap overflow-hidden">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* User section at bottom (desktop) */}
        {collapsed ? (
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
                  <p className="text-xs text-gray-400 truncate">
                    Premium Plan
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}