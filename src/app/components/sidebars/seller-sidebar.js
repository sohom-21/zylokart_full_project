'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiOutlineViewGrid, HiOutlineCreditCard, HiOutlineCube, HiOutlineClipboardList, HiOutlineUser, HiOutlineChevronDoubleLeft, HiOutlineChevronDoubleRight } from 'react-icons/hi'

export default function Sellersidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  // On mount, read productsOpen from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('sellerSidebarProductsOpen');
    if (stored === 'true') setProductsOpen(true);
  }, []);

  // Whenever productsOpen changes, store it
  useEffect(() => {
    localStorage.setItem('sellerSidebarProductsOpen', productsOpen);
  }, [productsOpen]);

  const isProductsActive =
    pathname === '/seller/seller-productlistings' ||
    pathname === '/seller/seller-Addproduct' ||
    pathname === '/seller/products' ||
    pathname === '/seller/product-list' ||
    pathname.startsWith('/seller/products');

  return (
    <aside className={`hidden lg:flex flex-col bg-slate-900 shadow-lg transition-all duration-300 ${collapsed ? 'w-20' : 'w-50'} min-h-screen text-white py-6 relative`}>
      {/* Collapse/Expand Button */}
      <button
        className="absolute top-3 right-[-18px] z-20 bg-slate-900 border border-slate-700 rounded-full p-1 hover:bg-slate-800 transition"
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        type="button"
      >
        {collapsed ? <HiOutlineChevronDoubleRight size={20} /> : <HiOutlineChevronDoubleLeft size={20} />}
      </button>
      <nav className="flex flex-col gap-2 w-full px-2">
        <Link href="/seller/seller-dashboard">
          <div className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 cursor-pointer gap-3
            ${pathname === '/seller/seller-dashboard'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
            <HiOutlineViewGrid size={20} className={`${pathname === '/seller/seller-dashboard' ? 'text-white' : 'text-gray-400'}`} />
            {!collapsed && <span>Dashboard</span>}
          </div>
        </Link>
        <Link href="/seller/payments">
          <div className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 cursor-pointer gap-3
            ${pathname === '/seller/payments'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
            <HiOutlineCreditCard size={20} className={`${pathname === '/seller/payments' ? 'text-white' : 'text-gray-400'}`} />
            {!collapsed && <span>Payments</span>}
          </div>
        </Link>
        {/* Products menu with click dropdown */}
        <div className="relative">
          <div
            className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 cursor-pointer gap-3
              ${isProductsActive || productsOpen
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}
            onClick={() => setProductsOpen(open => !open)}
          >
            <HiOutlineCube size={20} className={`${isProductsActive || productsOpen ? 'text-white' : 'text-gray-400'}`} />
            {!collapsed && <span className="flex-1">Products</span>}
            {!collapsed && (
              <span className="ml-2 text-white">
                {productsOpen ? <span>&#9650;</span> : <span>&#9660;</span>}
                {/* ▲ (up) when open, ▼ (down) when closed */}
              </span>
            )}
          </div>
          {/* Dropdown options */}
          {productsOpen && !collapsed && (
            <div className="ml-8 mt-1 flex flex-col gap-1">
              <Link href="/seller/product-list">
                <div className={`px-4 py-2 text-xs flex items-center gap-2 rounded-lg cursor-pointer
                  ${pathname === '/seller/product-list'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
                  <HiOutlineClipboardList size={16} className={`${pathname === '/seller/product-list' ? 'text-white' : 'text-gray-400'}`} />
                  Product Listings
                </div>
              </Link>
              <Link href="/seller/seller-Addproduct">
                <div className={`px-4 py-2 text-xs flex items-center gap-2 rounded-lg cursor-pointer
                  ${pathname === '/seller/seller-Addproduct'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
                  <HiOutlineCube size={16} className={`${pathname === '/seller/seller-Addproduct' ? 'text-white' : 'text-gray-400'}`} />
                  Add New Product
                </div>
              </Link>
            </div>
          )}
        </div>
        <Link href="/seller/Orders">
          <div className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 cursor-pointer gap-3
            ${pathname.toLowerCase() === '/seller/orders'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
            <HiOutlineClipboardList size={20} className={`${pathname.toLowerCase() === '/seller/orders' ? 'text-white' : 'text-gray-400'}`} />
            {!collapsed && <span>Orders</span>}
          </div>
        </Link>
        <Link href="/seller/Account">
          <div className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 cursor-pointer gap-3
            ${pathname.toLowerCase() === '/seller/account'
              ? 'bg-blue-600 text-white'
              : 'text-gray-300 hover:bg-slate-800 hover:text-white'}`}>
            <HiOutlineUser size={20} className={`${pathname.toLowerCase() === '/seller/account' ? 'text-white' : 'text-gray-400'}`} />
            {!collapsed && <span>My Account</span>}
          </div>
        </Link>
      </nav>
      {/* User section at bottom */}
      <div className={`mt-auto p-4 transition-all duration-200 ${collapsed ? 'flex justify-center' : ''}`}>
        <div className={`bg-slate-800 rounded-lg p-4 flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            SL
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Seller User
              </p>
              <p className="text-xs text-gray-400 truncate">Seller Panel</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}