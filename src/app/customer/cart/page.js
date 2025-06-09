'use client'
import { useEffect, useState } from 'react'
import CustomerNavbar from '@/app/components/navbar-customer'
import Footer from '@/app/components/Footer'
import { FiTrash2 } from 'react-icons/fi'

const sampleCart = [
  {
    id: 1,
    title: 'Minimalist Ceramic Vase',
    image: 'https://placehold.co/79x79',
    price: 59,
    quantity: 1,
    color: 'red',
  },
  {
    id: 2,
    title: 'Premium Leather Sneakers',
    image: 'https://placehold.co/79x79',
    price: 195,
    quantity: 2,
    color: 'red',
  },
]

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with your backend fetch
    // fetch('/api/cart').then(res => res.json()).then(setCart)
    setCart(sampleCart)
    setLoading(false)
  }, [])

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0
  const total = subtotal + shipping

  const handleQuantity = (id, delta) => {
    setCart(cart =>
      cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    )
  }

  const handleDelete = (id) => {
    setCart(cart => cart.filter(item => item.id !== id))
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <h1 className="text-4xl font-extrabold font-['Playfair_Display'] text-zinc-800 mb-8">Your Cart</h1>
        <div className="flex flex-col gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-4 gap-4 bg-white rounded shadow mb-4 p-4 font-['Poppins'] font-medium text-black">
              <div>Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Subtotal</div>
            </div>
            <div className="space-y-6">
              {cart.map(item => (
                <div key={item.id} className="grid grid-cols-2 md:grid-cols-4 items-center gap-4 bg-white rounded shadow p-4 relative">
                  {/* Product */}
                  <div className="flex items-center gap-4 col-span-2 md:col-span-1">
                    <div className="relative">
                      <img src={item.image} alt={item.title} className="w-20 h-20 rounded object-cover" />
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="absolute -top-2 -left-2 w-7 h-7 bg-red-500 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-600 transition"
                        title="Remove from cart"
                      >
                        <FiTrash2 className="text-white text-base" />
                      </button>
                    </div>
                    <span className="text-zinc-800 text-lg font-normal">{item.title}</span>
                  </div>
                  {/* Price */}
                  <div className="text-black text-lg font-normal">${item.price}</div>
                  {/* Quantity */}
                  <div className="flex items-center gap-2">
                    <button
                      className="w-8 h-8 rounded border border-zinc-300 flex items-center justify-center text-xl"
                      onClick={() => handleQuantity(item.id, -1)}
                    >-</button>
                    <span className="w-8 text-center">{item.quantity.toString().padStart(2, '0')}</span>
                    <button
                      className="w-8 h-8 rounded border border-zinc-300 flex items-center justify-center text-xl"
                      onClick={() => handleQuantity(item.id, 1)}
                    >+</button>
                  </div>
                  {/* Subtotal */}
                  <div className="text-black text-lg font-normal">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button className="px-8 py-3 rounded border border-black/50 font-medium font-['Poppins'] text-black hover:bg-zinc-100 transition">
                Return To Shop
              </button>
            </div>
          </div>
          {/* Cart Summary */}
          <div className="w-full max-w-md space-y-6">
            {/* Coupon */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                className="flex-1 px-4 py-3 rounded border border-black/30 font-['Poppins']"
              />
              <button className="px-8 py-3 bg-amber-300 rounded font-medium font-['Poppins'] text-black hover:bg-amber-400 transition">
                Apply Coupon
              </button>
            </div>
            {/* Summary */}
            <div className="rounded border border-black p-6 space-y-4 font-['Poppins'] bg-white shadow">
              <div className="text-2xl font-medium mb-2">Cart Total</div>
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping}`}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-black/20 pt-2">
                <span>Total:</span>
                <span>${total}</span>
              </div>
              <button className="w-full mt-4 px-8 py-3 bg-amber-300 rounded font-medium text-black hover:bg-amber-400 transition">
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}