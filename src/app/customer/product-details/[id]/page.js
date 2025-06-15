'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import { getProductById } from '@/app/utiils/supabase/products'
import { addToCart } from '@/app/utiils/supabase/cart'
import { addToWishlist } from '@/app/utiils/supabase/wishlist'

// This file defines the product details page.
// It displays detailed information about a specific product, including images, description, and price.
export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [mainImage, setMainImage] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      const { data, error } = await getProductById(id)
      if (!error && data) {
        setProduct(data)
        setMainImage(data.image_url || data.image_url_1 || '')
      } else {
        setProduct(null)
      }
      setLoading(false)
    }
    fetchProduct()
  }, [id])

  const handleAddToCart = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      alert('User not logged in. Please log in to add to cart.')
      return
    }
    const { error } = await addToCart(userId, id, quantity)
    if (error) alert('Failed to add to cart: ' + error.message)
    else alert('Product added to cart!')
  }

  const handleAddToWishlist = async () => {
    const userId = localStorage.getItem('userId')
    if (!userId) {
      alert('User not logged in. Please log in to add to wishlist.')
      return
    }
    const { error } = await addToWishlist(userId, id)
    if (error) alert('Failed to add to wishlist: ' + error.message)
    else alert('Product added to wishlist!')
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!product) return <div className="min-h-screen flex items-center justify-center">Product not found</div>

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Images */}
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            <div className="flex md:flex-col gap-4">
              {[product.image_url_1, product.image_url_2, product.image_url_3, product.image_url_4].filter(Boolean).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded border border-zinc-200 cursor-pointer"
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            <img
              src={mainImage || product.image_url}
              alt={product.name}
              className="w-full max-w-md h-[400px] object-cover rounded shadow"
            />
          </div>
          {/* Right: Details */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-medium font-['Playfair_Display'] text-zinc-800">{product.name}</h1>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="text-zinc-500 text-sm">(42)</span>
            </div>
            {product.discount && (
              <div className="text-red-600 text-xl font-thin">-{product.discount}%</div>
            )}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-zinc-800">₹{product.price_offered || product.price}</span>
              {product.price && product.price_offered && product.price !== product.price_offered && (
                <span className="text-zinc-500 line-through text-lg">₹{product.price}</span>
              )}
            </div>
            <div className="text-black text-base">Inclusive of all taxes</div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xl">Quantity</span>
              <input
                type="number"
                min={1}
                max={product.stock || 99}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-zinc-300 rounded"
              />
              <span className="text-sm text-zinc-500">({product.stock || 0} available)</span>
            </div>
            <div className="text-black text-sm font-light mt-2">Free shipping on orders above ₹500</div>
            <button 
              className="mt-6 w-full bg-amber-300 text-black py-4 rounded text-xl font-normal font-['Inter'] hover:bg-amber-400 transition" 
              onClick={handleAddToCart}
              disabled={!product.stock || product.stock === 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              className="w-full bg-amber-300 text-black py-4 rounded text-xl font-normal font-['Inter'] hover:bg-amber-400 transition" 
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">Details</h2>
              <p className="text-zinc-700">{product.description || 'No description available.'}</p>
            </div>
            {/* Category */}
            {product.category && (
              <div className="mt-4">
                <span className="text-sm text-zinc-500 uppercase tracking-wider">Category: {product.category}</span>
              </div>
            )}
          </div>
        </div>      </main>
      <Footer />
    </div>
  )
}

