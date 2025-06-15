'use client'
import Link from 'next/link'
import { useState } from 'react'

// This file defines the Navbar component for the landing page.
// It provides navigation links specific to the unauthenticated landing experience.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-zinc-800 text-white shadow-md transition-colors duration-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <img src="/Logo.gif" alt="Zylokart" className="h-15 w-auto" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-amber-400 text-white">
              Home
            </Link>
            <Link href="/auth/login" className="font-medium hover:text-amber-400 text-white">
              Collections
            </Link>
            <Link href="/pages/about" className="font-medium hover:text-amber-400 text-white">
              About
            </Link>
            <Link href="/pages/contact-us" className="font-medium hover:text-amber-400 text-white">
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>

          {/* Search and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Login and Sign Up */}
            <Link href="/auth/login" className="px-4 py-2 rounded font-medium hover:bg-zinc-900 transition text-white">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 rounded font-medium bg-zinc-800 text-white hover:bg-zinc-700 transition">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-black rounded shadow-lg p-4">
            <Link href="/" className="block font-medium hover:text-amber-400 text-white" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/auth/login" className="block font-medium hover:text-amber-400 text-white" onClick={() => setMenuOpen(false)}>
              Collections
            </Link>
            <Link href="/pages/about" className="block font-medium hover:text-amber-400 text-white" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/pages/contact-us" className="block font-medium hover:text-amber-400 text-white" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <div className="flex items-center space-x-2 mt-4">
              <Link href="/auth/login" className="px-3 py-1 rounded font-medium hover:bg-zinc-900 transition text-white" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/auth/signup" className="px-3 py-1 rounded font-medium hover:bg-zinc-900 transition text-white" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

