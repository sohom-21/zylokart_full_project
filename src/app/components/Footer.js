'use client'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="w-full bg-zinc-800 text-zinc-400 pt-12 pb-6 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-8">
        {/* Brand & Social */}
        <div className="flex-1 min-w-[220px] flex flex-col gap-4">
          <div className="text-white text-2xl font-['Playfair_Display']">Zylokart</div>
          <div className="text-xs leading-snug">
            Premium lifestyle products for the modern individual. Quality, design, and sustainability in every piece.
          </div>
          <div className="flex gap-3 mt-2">
            {/* Replace with real links/icons as needed */}
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition">
              <span className="sr-only">Instagram</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.5"/><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="17.5" cy="6.5" r="1"/></svg>
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition">
              <span className="sr-only">Facebook</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M17 2.5h-2.5A4.5 4.5 0 0 0 10 7v2H7v3h3v7h3v-7h2.5l.5-3H13V7a1.5 1.5 0 0 1 1.5-1.5H17V2.5z"/></svg>
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition">
              <span className="sr-only">Twitter</span>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path d="M22 5.92a8.38 8.38 0 0 1-2.36.65A4.13 4.13 0 0 0 21.4 4.1a8.19 8.19 0 0 1-2.6 1A4.11 4.11 0 0 0 12 8.09c0 .32.04.64.1.94A11.65 11.65 0 0 1 3 4.89a4.11 4.11 0 0 0 1.27 5.48A4.07 4.07 0 0 1 2.8 9.1v.05a4.11 4.11 0 0 0 3.29 4.03 4.09 4.09 0 0 1-1.85.07 4.12 4.12 0 0 0 3.84 2.85A8.24 8.24 0 0 1 2 19.54a11.62 11.62 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22 5.92z"/></svg>
            </a>
          </div>
        </div>
        {/* Links */}
        <div className="flex-1 min-w-[180px] flex flex-col gap-2">
          <div className="text-white text-base font-medium font-['Playfair_Display'] mb-2">Shop</div>
          <Link href="/shop" className="hover:text-white text-sm">All Products</Link>
          <Link href="/shop?filter=new" className="hover:text-white text-sm">New Arrivals</Link>
          <Link href="/shop?filter=best" className="hover:text-white text-sm">Best Sellers</Link>
          <Link href="/shop?filter=sale" className="hover:text-white text-sm">On Sale</Link>
        </div>
        <div className="flex-1 min-w-[180px] flex flex-col gap-2">
          <div className="text-white text-base font-medium font-['Playfair_Display'] mb-2">About</div>
          <Link href="/about#story" className="hover:text-white text-sm">Our Story</Link>
          <Link href="/about#sustainability" className="hover:text-white text-sm">Sustainability</Link>
          <Link href="/about#careers" className="hover:text-white text-sm">Careers</Link>
          <Link href="/about#press" className="hover:text-white text-sm">Press</Link>
        </div>
        <div className="flex-1 min-w-[180px] flex flex-col gap-2">
          <div className="text-white text-base font-medium font-['Playfair_Display'] mb-2">Customer Service</div>
          <Link href="/contact" className="hover:text-white text-sm">Contact Us</Link>
          <Link href="/shipping-returns" className="hover:text-white text-sm">Shipping & Returns</Link>
          <Link href="/faq" className="hover:text-white text-sm">FAQ</Link>
          <Link href="/privacy" className="hover:text-white text-sm">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white text-sm">Terms & Conditions</Link>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 border-t border-white/10 pt-4 text-center text-zinc-400 text-sm">
        © 2024 Zylokart. All rights reserved.
      </div>
    </footer>
  )
}