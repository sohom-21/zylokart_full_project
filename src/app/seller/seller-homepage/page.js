'use client'
import Link from 'next/link'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'

export default function SellerHomepage() {
  return (
    <div className="bg-white min-h-screen text-zinc-800 font-['Inter']">
      <SellerNavbar />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/Landing page/Hero.jpg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slide-down text-zinc-900">
          Reach More Customers. Sell with Confidence.
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-fade-in text-zinc-600">
          Grow your business with powerful tools, secure transactions, and a trusted customer base.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Link href="/seller/onboarding">
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-lg animate-bounce">
              Start Selling Now
            </button>
          </Link>
          <Link href="#features">
            <button className="bg-transparent border border-amber-500 hover:bg-amber-500 hover:text-white text-amber-500 font-semibold px-8 py-4 rounded-full transition-all duration-300 text-lg">
              Explore Features
            </button>
          </Link>
        </div>
      </section>

      {/* Why Sell With Us */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="why">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in text-zinc-900">
          ✅ Trusted by Thousands of Sellers
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg flex flex-col items-center animate-fade-in-up">
            <span className="text-5xl mb-4">🌍</span>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900">Wide Reach</h3>
            <p className="text-zinc-500">Access thousands of daily customers looking for your products.</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-5xl mb-4">📊</span>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900">Simple Dashboard</h3>
            <p className="text-zinc-500">Easy product listing, order management & real-time analytics.</p>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-5xl mb-4">💸</span>
            <h3 className="text-xl font-semibold mb-2 text-zinc-900">Low Fees, High Returns</h3>
            <p className="text-zinc-500">Transparent commission structure. No hidden charges.</p>
          </div>
        </div>
      </section>

      {/* Seller Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto" id="features">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in text-zinc-900">
          🚀 Tools Built for Your Success
        </h2>
        <div className="grid md:grid-cols-5 gap-6 text-center">
          <div className="bg-gradient-to-br from-amber-100 to-white border border-amber-200 rounded-xl p-6 shadow-lg animate-fade-in-up">
            <span className="text-4xl mb-2 block">📦</span>
            <div className="font-semibold text-zinc-900">Smart Inventory</div>
            <div className="text-zinc-500 text-sm">Manage stock with ease</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-white border border-amber-200 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-4xl mb-2 block">📈</span>
            <div className="font-semibold text-zinc-900">Sales Analytics</div>
            <div className="text-zinc-500 text-sm">Real-time insights</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-white border border-amber-200 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-4xl mb-2 block">🚚</span>
            <div className="font-semibold text-zinc-900">1-Click Fulfillment</div>
            <div className="text-zinc-500 text-sm">Fast order processing</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-white border border-amber-200 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-4xl mb-2 block">🎯</span>
            <div className="font-semibold text-zinc-900">Promotions</div>
            <div className="text-zinc-500 text-sm">Discount tools</div>
          </div>
          <div className="bg-gradient-to-br from-amber-100 to-white border border-amber-200 rounded-xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-4xl mb-2 block">🔗</span>
            <div className="font-semibold text-zinc-900">Easy Integration</div>
            <div className="text-zinc-500 text-sm">API ready</div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in text-zinc-900">
          🔒 Sell Safely & Securely
        </h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center animate-fade-in-up">
            <span className="text-4xl mb-2">🔐</span>
            <div className="font-semibold text-zinc-900">End-to-End Encryption</div>
            <div className="text-zinc-500 text-sm">Your data is always protected</div>
          </div>
          <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-4xl mb-2">💳</span>
            <div className="font-semibold text-zinc-900">Secure Payments</div>
            <div className="text-zinc-500 text-sm">Trusted payment gateway</div>
          </div>
          <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="text-4xl mb-2">🛡️</span>
            <div className="font-semibold text-zinc-900">Fraud Detection</div>
            <div className="text-zinc-500 text-sm">Seller protection</div>
          </div>
          <div className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-4xl mb-2">📜</span>
            <div className="font-semibold text-zinc-900">GDPR Ready</div>
            <div className="text-zinc-500 text-sm">Full compliance</div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fade-in text-zinc-900">
          💬 Hear from Our Top Sellers
        </h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg max-w-md animate-fade-in-up">
            <div className="flex items-center gap-4 mb-4">
              <img src="/avatars/seller1.jpg" alt="Seller 1" className="w-14 h-14 rounded-full border-2 border-amber-500" />
              <div>
                <div className="font-semibold text-zinc-900">Priya Sharma</div>
                <div className="text-zinc-500 text-sm">Priya's Home Decor</div>
              </div>
            </div>
            <div className="italic text-zinc-600">
              “Within 3 months, my sales tripled. The dashboard and customer insights are game changers.”
            </div>
          </div>
          <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-4 mb-4">
              <img src="/avatars/seller2.jpg" alt="Seller 2" className="w-14 h-14 rounded-full border-2 border-amber-500" />
              <div>
                <div className="font-semibold text-zinc-900">Amit Verma</div>
                <div className="text-zinc-500 text-sm">Verma Electronics</div>
              </div>
            </div>
            <div className="italic text-zinc-600">
              “The security and support are top-notch. I can focus on my products, not the tech.”
            </div>
          </div>
        </div>
      </section>

      {/* Join Marketplace */}
      <section className="py-16 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in text-zinc-900">
          🌐 Get Discovered by Thousands of Shoppers
        </h2>
        <div className="bg-white border border-zinc-200 rounded-xl p-8 shadow-lg mb-6 animate-fade-in-up">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1">
              <div className="text-lg mb-2 text-zinc-900">🔐 Safe onboarding</div>
              <div className="text-lg mb-2 text-zinc-900">📦 Instant product listing</div>
              <div className="text-lg mb-2 text-zinc-900">📲 24/7 support</div>
            </div>
            <Link href="/seller/onboarding">
              <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-lg animate-bounce">
                Start Selling Today
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s cubic-bezier(.4,0,.2,1);
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-down {
          animation: slide-down 1s cubic-bezier(.4,0,.2,1);
        }
        .animate-bounce {
          animation: bounce 1.2s infinite alternate;
        }
        @keyframes bounce {
          from { transform: translateY(0);}
          to { transform: translateY(-8px);}
        }
      `}</style>
    </div>
  )
}