'use client'
// This file defines the Navbar component for seller pages.
// It provides navigation links and features specific to authenticated seller users.
import Link from 'next/link'
import { FiUser, FiBox, FiBarChart2, FiLogOut, FiHome, FiMenu } from 'react-icons/fi'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/app/utiils/supabase/auth'
export default function SellerNavbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()
 
  const handleuserLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('seller_id');
    signOut();
    router.push('/');
  };
  return (
    <nav className="w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white shadow-lg fixed top-0 left-0 z-50">
      <div className="max-w-8xl mx-auto flex items-center px-6 py-3">
        {/* Logo (Extreme Left) */}
        <div className="flex items-center">
          <Link href="/seller/sellerhomepage" className="flex items-center gap-2 text-2xl font-bold font-['Playfair_Display'] tracking-widest text-white hover:text-amber-400 transition">
            Zylokart Seller
          </Link>
        </div>

        {/* Center Nav */}
        <div className="hidden md:flex flex-1 justify-center gap-8 items-center">
          <Link href="/seller/sellerhomepage" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition">
            <FiHome className="text-xl" /> Home
          </Link>
          <Link href="/seller/product-list" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition">
            <FiBox className="text-xl" /> Products
          </Link>
          <Link href="/seller/seller-dashboard" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition">
            <FiBarChart2 className="text-xl" /> Dashboard
          </Link>
          <Link href="/seller/profile" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition">
            <FiUser className="text-xl" /> Profile
          </Link>
        </div>

        {/* Logout (Extreme Right) and Hamburger */}
        <div onClick={handleuserLogout} className="flex items-center ml-auto gap-4">
          <Link href="#" className="flex items-center gap-1 font-semibold hover:text-amber-400 transition">
            <FiLogOut className="text-xl" /> Logout
          </Link>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-zinc-800 transition"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <FiMenu className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-900 bg-opacity-95 px-6 py-4 space-y-4 shadow-lg animate-fade-in-down">
          <Link href="/seller/sellerhomepage" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition" onClick={() => setMenuOpen(false)}>
            <FiHome className="text-xl" /> Home
          </Link>
          <Link href="/seller/products" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition" onClick={() => setMenuOpen(false)}>
            <FiBox className="text-xl" /> Products
          </Link>
          <Link href="/seller/seller-dashboard" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition" onClick={() => setMenuOpen(false)}>
            <FiBarChart2 className="text-xl" /> Dashboard
          </Link>
          <Link href="/seller/profile" className="flex items-center gap-2 font-semibold uppercase tracking-wide hover:text-amber-400 transition" onClick={() => setMenuOpen(false)}>
            <FiUser className="text-xl" /> Profile
          </Link>
          <Link href="/seller/logout" className="flex items-center gap-1 font-semibold hover:text-amber-400 transition" onClick={() => setMenuOpen(false)}>
            <FiLogOut className="text-xl" /> Logout
          </Link>
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.3s cubic-bezier(.4,0,.2,1);
        }
      `}</style>
    </nav>
  )
}