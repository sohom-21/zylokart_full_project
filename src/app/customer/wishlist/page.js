'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import { getWishlistItems, removeFromWishlist } from '@/app/utiils/supabase/wishlist'
import { addToCart } from '@/app/utiils/supabase/cart'
import { Trash2, ShoppingCart } from 'lucide-react'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    fetchWishlistItems()
  }, [])

  const fetchWishlistItems = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      setLoading(false)
      return
    }
    
    const wishlistData = await getWishlistItems(userId)
    setWishlist(wishlistData || [])
    setLoading(false)
  }

  const handleDelete = async (wishlistId) => {
    const { error } = await removeFromWishlist(wishlistId)
    if (error) {
      console.error('Error removing from wishlist:', error)
      return
    }
    
    setWishlist(wishlist.filter(item => item.id !== wishlistId))
  }

  const handleAddToCart = async (productId) => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      alert('Please log in to add items to cart')
      return
    }

    const { error } = await addToCart(userId, productId, 1)
    if (error) {
      alert('Error adding to cart: ' + error.message)
    } else {
      alert('Added to cart!')
    }
  }

  const handleProductClick = (productId) => {
    router.push(`/customer/product-details/${productId}`)
  }

  if (loading) {
    return (
      <div>
        <CustomerNavbar />
        <div className="min-h-screen flex items-center justify-center">Loading wishlist...</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
            <a 
              href="/customer/products-listing" 
              className="bg-amber-300 text-black px-6 py-3 rounded font-medium hover:bg-amber-400 transition"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <img
                    src={item.Products?.image_url || 'https://placehold.co/300x300'}
                    alt={item.Products?.name || 'Product'}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => handleProductClick(item.product_id)}
                  />
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                  <span className={`absolute top-2 left-2 px-2 py-1 rounded text-xs ${
                    item.Products?.stock > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {item.Products?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 
                    className="font-medium text-gray-900 mb-2 line-clamp-2 cursor-pointer hover:text-blue-600"
                    onClick={() => handleProductClick(item.product_id)}
                  >
                    {item.Products?.name || 'Unknown Product'}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 uppercase">{item.Products?.category}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{item.Products?.price_offered || item.Products?.price || 0}
                      </span>
                      {item.Products?.price && item.Products?.price_offered && item.Products?.price !== item.Products?.price_offered && (
                        <span className="text-sm text-gray-500 line-through">₹{item.Products?.price}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddToCart(item.product_id)}
                    disabled={!item.Products?.stock || item.Products?.stock === 0}
                    className="w-full bg-amber-300 text-black py-2 rounded font-medium hover:bg-amber-400 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={16} />
                    {item.Products?.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}