'use client'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold font-['Playfair_Display'] text-zinc-800 mb-6 text-center">About Zylokart</h1>
        <p className="text-lg text-zinc-600 mb-8">
          Welcome to <span className="font-semibold text-zinc-800">Zylokart</span> — a modern e-commerce platform built by developers, for people who value quality, speed, and a seamless shopping experience. We’re not dropshippers or resellers; we’re passionate creators who believe online shopping should be simple, transparent, and enjoyable.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Our Journey</h2>
          <p className="text-zinc-600">
            Founded in 2024 by a small team of self-driven developers, Zylokart was born from a desire to build something better for Indian shoppers. After years of freelance and product work, we realized we could deliver a platform that’s fast, secure, and truly customer-focused — so we did.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Our Mission</h2>
          <ul className="list-disc pl-6 text-zinc-600 space-y-1">
            <li>Deliver <span className="font-medium">high-quality lifestyle and utility products</span></li>
            <li>Provide a <span className="font-medium">secure, fast, and mobile-friendly</span> shopping experience</li>
            <li>Keep it <span className="font-medium">clean</span> — no gimmicks, no spam, no hidden fees</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Built by Developers</h2>
          <p className="text-zinc-600 mb-2">
            Zylokart is a fully custom platform, not a template or a Shopify clone. Our stack:
          </p>
          <ul className="list-disc pl-6 text-zinc-600 space-y-1">
            <li>⚛️ <span className="font-medium">Next.js</span> with Tailwind CSS (Frontend)</li>
            <li>🔐 <span className="font-medium">Supabase</span> for authentication, database, and hosting</li>
            <li>📦 <span className="font-medium">Custom CMS</span> for products, orders, and analytics</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Why Shop With Us?</h2>
          <ul className="list-disc pl-6 text-zinc-600 space-y-1">
            <li>✅ <span className="font-medium">Secure Checkout</span> (Stripe + Firebase Auth)</li>
            <li>📱 <span className="font-medium">Fully Mobile-Responsive</span></li>
            <li>⚡ <span className="font-medium">Fast Loading</span> with optimized images and routing</li>
            <li>🛒 <span className="font-medium">Curated Products</span> — handpicked, no random resellers</li>
            <li>🧑‍💻 <span className="font-medium">Support by Real Developers</span> — talk to us directly</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Meet the Team</h2>
          <ul className="pl-2 text-zinc-600 space-y-1">
            <li><span className="font-medium text-zinc-800">Manas Raj</span> – Lead Developer & UI/UX Designer</li>
            <li><span className="font-medium text-zinc-800">Sohom Ghosh</span> – Backend & Infrastructure</li>
            <li><span className="font-medium text-zinc-800">Rahul Choudhary</span> – Product Management & Quality</li>
          </ul>
          <p className="text-zinc-500 mt-2 text-sm">We’re coders first, sellers second.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-800 mb-2 text-center">Contact Us</h2>
          <p className="text-zinc-600 mb-1">Have questions, suggestions, or need help?</p>
          <p className="text-zinc-600 mb-1">📧 <a href="mailto:manas.raj.8271@gmail.com" className="underline hover:text-amber-500">manas.raj.8271@gmail.com</a></p>
          <p className="text-zinc-600 mb-1">📍 India</p>
          <p className="text-zinc-600">📱 Instagram: <span className="italic text-zinc-500">Coming soon</span></p>
        </section>

        <div className="mt-12 flex flex-col items-center">
          <Link href="/customer/products-listing">
            <button className="bg-zinc-800 text-white px-8 py-4 rounded font-medium font-['Inter'] hover:bg-zinc-900 transition">
              Explore Products →
            </button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}