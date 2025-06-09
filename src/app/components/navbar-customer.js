'use client'
import Link from 'next/link'
import { FiShoppingCart, FiHeart, FiUser } from 'react-icons/fi'

export default function CustomerNavbar() {
  return (
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Logo */}
      <Link href="/" className="text-zinc-800 text-2xl font-extrabold font-['Playfair_Display'] tracking-widest">
        Zylokart
      </Link>
      {/* Main Nav */}
      <div className="hidden md:flex gap-8">
        <Link href="/" className="flex items-center gap-1 text-zinc-800 text-sm font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-500">
          Home
        </Link>
        <Link href="/customer/products-listing" className="flex items-center gap-1 text-zinc-800 text-sm font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-500">
          Shop
        </Link>
        <Link href="/collections" className="flex items-center gap-1 text-zinc-800 text-sm font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-500">
          Collections
        </Link>
        <Link href="/about" className="flex items-center gap-1 text-zinc-800 text-sm font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-500">
          About
        </Link>
        <Link href="/contact" className="flex items-center gap-1 text-zinc-800 text-sm font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-500">
          Contact
        </Link>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6">
        <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 rounded-full border border-zinc-200 bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-200  placeholder-zinc-400"
            />
        <Link href="/customer/cart" className="relative group">
          <FiShoppingCart className="text-2xl text-zinc-800 group-hover:text-amber-500" />
          {/* Example badge */}
          <span className="absolute -top-2 -right-2 bg-zinc-800 text-white text-xs rounded-full px-1">3</span>
        </Link>
        <Link href="/customer/wishlist" className="group">
          <FiHeart className="text-2xl text-zinc-800 group-hover:text-amber-500" />
        </Link>
        <Link href="/customer/profile" className="group">
          <FiUser className="text-2xl text-zinc-800 group-hover:text-amber-500" />
        </Link>
      </div>
    </nav>
  )
}