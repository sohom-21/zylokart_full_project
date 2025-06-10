'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sellersidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 min-h-[1221px] bg-black text-white flex flex-col items-center py-8 relative">
      <img src="https://placehold.co/92x45" alt="Logo" className="mb-10" />
      <nav className="flex flex-col gap-6 w-full px-6">
        <Link href="/seller/seller-dashboard">
          <div className={`font-semibold text-white rounded-lg px-4 py-3 flex items-center gap-3 cursor-pointer
            ${pathname === '/seller/seller-dashboard' ? 'bg-zinc-900' : 'bg-violet-50/10'}`}>
            <span className="w-2.5 h-2.5 bg-white rounded-full inline-block" />
            Dashboard
          </div>
        </Link>
        <Link href="/seller/payments">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer
            ${pathname === '/seller/payments' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            Payments
          </div>
        </Link>
        <Link href="/seller/products">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer
            ${pathname === '/seller/products' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            Products
          </div>
        </Link>
        <Link href="/seller/orders">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer
            ${pathname === '/seller/orders' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            Orders
          </div>
        </Link>
        <Link href="/seller/account">
          <div className={`font-normal text-white px-4 py-3 rounded-lg cursor-pointer
            ${pathname === '/seller/account' ? 'bg-zinc-900' : 'hover:bg-zinc-900'}`}>
            My Account
          </div>
        </Link>
      </nav>
    </aside>
  )
}