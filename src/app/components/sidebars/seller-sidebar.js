'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'

export default function Sellersidebar() {
  const pathname = usePathname();
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const hideTimeout = useRef(null);

  // Show menu immediately on mouse enter
  const handleMouseEnter = () => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    setShowProductsMenu(true);
  };

  // Hide menu after 2 seconds on mouse leave
  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setShowProductsMenu(false);
    }, 2000);
  };

  // Helper for active state on dropdown
  const isProductsActive =
    pathname === '/seller/seller-productlistings' ||
    pathname === '/seller/seller-Addproduct' ||
    pathname === '/seller/products' ||
    pathname.startsWith('/seller/products');

  return (
    <aside className="w-60 min-h-[1221px] bg-black text-white flex flex-col items-center py-8 relative">
      <img src="https://placehold.co/92x45" alt="Logo" className="mb-10" />
      <nav className="flex flex-col gap-6 w-full px-6">
        <Link href="/seller/seller-dashboard">
          <div className={`font-semibold text-white rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer
            ${pathname === '/seller/seller-dashboard' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            {pathname === '/seller/seller-dashboard' && (
              <span className="w-2.5 h-2.5 rounded-full bg-white transition-all mr-3" />
            )}
            Dashboard
          </div>
        </Link>
        <Link href="/seller/payments">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3
            ${pathname === '/seller/payments' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            {pathname === '/seller/payments' && (
              <span className="w-2.5 h-2.5 rounded-full bg-white transition-all mr-3" />
            )}
            Payments
          </div>
        </Link>
        {/* Products menu with hover dropdown and delayed close */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer flex items-center justify-between gap-3
              ${isProductsActive ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}
          >
            {isProductsActive && (
              <span className="w-2.5 h-2.5 rounded-full bg-white transition-all mr-3" />
            )}
            <span className="flex-1">Products</span>
            <span className="ml-2">&#9662;</span>
          </div>
          {showProductsMenu && (
            <div className="absolute left-0 top-full mt-1 bg-zinc-900 rounded-lg shadow-lg z-10 w-48"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link href="/seller/seller-productlistings">
                <div className={`px-4 py-2 text-xs text-white cursor-pointer rounded-t-lg hover:bg-zinc-800 flex items-center gap-2
                  ${pathname === '/seller/seller-productlistings' ? 'bg-zinc-800' : ''}`}>
                  {pathname === '/seller/seller-productlistings' && (
                    <span className="w-2 h-2 rounded-full bg-white mr-2" />
                  )}
                  Product Listings
                </div>
              </Link>
              <Link href="/seller/seller-Addproduct">
                <div className={`px-4 py-2 text-xs text-white cursor-pointer rounded-b-lg hover:bg-zinc-800 flex items-center gap-2
                  ${pathname === '/seller/seller-Addproduct' ? 'bg-zinc-800' : ''}`}>
                  {pathname === '/seller/seller-Addproduct' && (
                    <span className="w-2 h-2 rounded-full bg-white mr-2" />
                  )}
                  Add New Product
                </div>
              </Link>
            </div>
          )}
        </div>
        <Link href="/seller/orders">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3
            ${pathname === '/seller/orders' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            {pathname === '/seller/orders' && (
              <span className="w-2.5 h-2.5 rounded-full bg-white transition-all mr-3" />
            )}
            Orders
          </div>
        </Link>
        <Link href="/seller/account">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer flex items-center gap-3
            ${pathname === '/seller/account' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            {pathname === '/seller/account' && (
              <span className="w-2.5 h-2.5 rounded-full bg-white transition-all mr-3" />
            )}
            My Account
          </div>
        </Link>
      </nav>
    </aside>
  )
}