"use client";
import React from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";

const AdminLayout = ({ children, onSidebarOpen }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 flex-col">
      {/* Top header/navbar only */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between h-16 px-6">
          <button className="lg:hidden" onClick={onSidebarOpen}>
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
      </header>
      {/* Page content */}
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
