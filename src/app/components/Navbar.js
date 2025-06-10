'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-400 shadow-md transition-colors duration-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-['Playfair_Display'] dark:text-white">
            Zylokart
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white">
              Home
            </Link>
            <Link href="/shop" className="font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white">
              Shop
            </Link>
            <Link href="/collections" className="font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white">
              Collections
            </Link>
            <Link href="/pages/about" className="font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white">
              About
            </Link>
            <Link href="/pages/contact-us" className="font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white">
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

          {/* Search, Theme Toggle, and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-48 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 placeholder-zinc-400 dark:placeholder-zinc-500"
            />

            <ThemeToggle />

            {/* Login and Sign Up */}
            <Link href="/auth/login" className="px-4 py-2 rounded font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition">
              Login
            </Link>
            <Link href="/auth/signup" className="px-4 py-2 rounded font-medium bg-zinc-800 text-white dark:bg-white dark:text-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2 bg-white dark:bg-zinc-800 rounded shadow-lg p-4">
            <Link href="/" className="block font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link href="/shop" className="block font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white" onClick={() => setMenuOpen(false)}>
              Shop
            </Link>
            <Link href="/collections" className="block font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white" onClick={() => setMenuOpen(false)}>
              Collections
            </Link>
            <Link href="/pages/about" className="block font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white" onClick={() => setMenuOpen(false)}>
              About
            </Link>
            <Link href="/pages/contact-us" className="block font-medium hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-white" onClick={() => setMenuOpen(false)}>
              Contact
            </Link>
            <div className="flex items-center space-x-2 mt-4">
              <ThemeToggle />
              <Link href="/auth/login" className="px-3 py-1 rounded font-medium hover:bg-zinc-100 dark:hover:bg-zinc-700 transition" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link href="/auth/signup" className="px-3 py-1 rounded font-medium bg-zinc-800 text-white dark:bg-white dark:text-zinc-800 hover:bg-zinc-700 dark:hover:bg-zinc-200 transition" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

