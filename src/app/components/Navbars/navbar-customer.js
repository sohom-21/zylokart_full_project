'use client'
// This file defines the Navbar component for customer pages.
// It provides navigation links and features specific to authenticated customer users.
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { signOut } from "@/app/utiils/supabase/auth";
import supabase from "@/app/utiils/supabase/client";


export default function CustomerNavbar() {
  const router = useRouter();
  
  const handleProfileClick = () => {
    router.push("/customer/profile");
  };
  const handleUserlogout = async ()  => {
    const userSession = await supabase.auth.getSession();
    signOut();
    localStorage.removeItem('userSession');
    localStorage.removeItem("userId");
    router.push("/");
  };


  return (
    <nav className="w-full bg-zinc-800 text-white shadow-md transition-colors duration-200 flex items-center justify-between px-6">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center"
      >
        <img src="/Logo.gif" alt="Zylokart" className="h-15 w-auto" />
      </Link>
      {/* Main Nav */}
      <div className="hidden md:flex gap-8">
        <Link
          href="/customer/homepage"
          className="flex items-center gap-1 font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-400 text-white"
        >
          Home
        </Link>
        <Link
          href="/customer/products-listing"
          className="flex items-center gap-1 font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-400 text-white"
        >
          Collections
        </Link>
        <Link
          href="/pages/about"
          className="flex items-center gap-1 font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-400 text-white"
        >
          About
        </Link>
        <Link
          href="/pages/contact-us"
          className="flex items-center gap-1 font-medium font-['Inter'] uppercase tracking-wide hover:text-amber-400 text-white"
        >
          Contact
        </Link>
      </div>
      {/* Icons */}
      <div className="flex items-center gap-6">
        <input
          type="text"
          placeholder="Search..."
          className="w-48 px-4 py-2 rounded-full border border-zinc-700 bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 placeholder-zinc-400"
        />
        <Link href="/customer/cart" className="relative group">
          <FiShoppingCart className="text-2xl text-white group-hover:text-amber-400 transition-colors" />
          {/* Example badge
          <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs rounded-full px-1">
            3
          </span> */}
        </Link>
        <Link href="/customer/wishlist" className="group">
          <FiHeart className="text-2xl text-white group-hover:text-amber-400 transition-colors" />
        </Link>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="pr-0.5">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick}>Profile</DropdownMenuItem>
            <DropdownMenuItem>Your orders</DropdownMenuItem>
            <DropdownMenuItem onClick={handleUserlogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
