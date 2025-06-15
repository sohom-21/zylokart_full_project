'use client'
import { useEffect, useState } from 'react'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import { getCartItems, updateCartQuantity, removeFromCart } from '@/app/utiils/supabase/cart'
import { Trash2, Plus, Minus } from 'lucide-react'
import Image from 'next/image'

// This file defines the customer's shopping cart page.
// It displays items added to the cart and allows for quantity adjustments and checkout.
export default function CartPage() {
  const [cart, setCart] = useState([])
  const [coupon, setCoupon] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setLoading(false)
      return
    }
    
    const cartData = await getCartItems(userId)
    setCart(cartData || [])
    setLoading(false)
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = item.Products?.price_offered || item.Products?.price || 0
    return sum + (price * item.quantity)
  }, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  const handleQuantity = async (id, delta) => {
    const item = cart.find(item => item.id === id)
    if (!item) return

    const newQuantity = item.quantity + delta
    if (newQuantity <= 0) {
      handleDelete(id)
      return
    }

    const { error } = await updateCartQuantity(id, newQuantity)
    if (error) {
      console.error('Error updating quantity:', error)
      return
    }

    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const handleDelete = async (id) => {
    const { error } = await removeFromCart(id)
    if (error) {
      console.error('Error removing item:', error)
      return
    }
    
    setCart(cart.filter(item => item.id !== id))
  }

  if (loading) {
    return (
      <div>
        <CustomerNavbar />
        <div className="min-h-screen flex items-center justify-center">Loading cart...</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <a 
              href="/customer/products-listing" 
              className="bg-amber-300 text-black px-6 py-3 rounded font-medium hover:bg-amber-400 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <Image
                      src={item.Products?.image_url || 'https://placehold.co/80x80'}
                      alt={item.Products?.name || 'Product'}
                      layout='fill'
                      objectFit='cover'
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.Products?.name || 'Unknown Product'}</h3>
                      <p className="text-gray-500">₹{item.Products?.price_offered || item.Products?.price || 0}</p>
                      {item.Products?.stock <= 5 && (
                        <p className="text-red-500 text-sm">Only {item.Products?.stock} left in stock</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantity(item.id, -1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantity(item.id, 1)}
                        className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                        disabled={item.quantity >= (item.Products?.stock || 0)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ₹{((item.Products?.price_offered || item.Products?.price || 0) * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-500 hover:text-red-700 mt-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-80">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cart.length} items)</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {subtotal < 500 && (
                  <p className="text-sm text-gray-600 mb-4">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                  />
                  <button className="w-full bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300">
                    Apply Coupon
                  </button>
                </div>

                <button className="w-full bg-amber-300 text-black py-3 rounded font-medium hover:bg-amber-400 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}