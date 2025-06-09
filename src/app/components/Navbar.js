'use client'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <nav className="w-full bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold font-['Playfair_Display']">
            Zylokart
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="font-medium hover:text-zinc-600 dark:hover:text-white">
              Home
            </Link>
            <Link href="/shop" className="font-medium hover:text-zinc-600 dark:hover:text-white">
              Shop
            </Link>
            <Link href="/collections" className="font-medium hover:text-zinc-600 dark:hover:text-white">
              Collections
            </Link>
            <Link href="/about" className="font-medium hover:text-zinc-600 dark:hover:text-white">
              About
            </Link>
            <Link href="/contact" className="font-medium hover:text-zinc-600 dark:hover:text-white">
              Contact
            </Link>
          </div>

          {/* Search, Theme Toggle, and Icons */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="hidden md:block w-48 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-700 placeholder-zinc-400 dark:placeholder-zinc-500"
            />

            <ThemeToggle />

            {/* Cart Icon */}
            <div className="relative">
              <button className="p-2">
                <span className="sr-only">Cart</span>
                <div className="w-6 h-6 relative border-2 border-zinc-800 dark:border-zinc-200 rounded-sm"/>
                <span className="absolute -top-2 -right-2 bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-800 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </div>

            {/* User Icon */}
            <button className="p-2">
              <span className="sr-only">User account</span>
              <div className="w-6 h-6 rounded-full border-2 border-zinc-800 dark:border-zinc-200"/>
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white dark:bg-black text-black dark:text-white">
        Test: This box should turn black in dark mode.
      </div>
    </nav>
  )
}