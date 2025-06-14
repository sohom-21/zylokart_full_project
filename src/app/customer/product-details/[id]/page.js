'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'

const fallbackProduct = {
  title: 'Minimalist Ceramic Vase',
  image: 'https://placehold.co/439x630',
  thumbnails: ['https://placehold.co/100x100', 'https://placehold.co/100x100'],
  price: '$59.00',
  oldPrice: '$89.00',
  discount: 24,
  rating: 5,
  ratingCount: 42,
  description: 'A beautiful minimalist vase for your home.',
  suggested: [],
  sections: [],
  reviews: [],
}

// This file defines the product details page.
// It displays detailed information about a specific product, including images, description, and price.
export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        // If backend returns invalid data, use fallback
        if (!data || !data.title) {
          setProduct(fallbackProduct)
        } else {
          setProduct(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setProduct(fallbackProduct)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!product) return null

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left: Images */}
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            <div className="flex md:flex-col gap-4">
              {(product.thumbnails || [product.image]).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded border border-zinc-200"
                />
              ))}
            </div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-md h-[400px] object-cover rounded shadow"
            />
          </div>
          {/* Right: Details */}
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-3xl font-medium font-['Playfair_Display'] text-zinc-800">{product.title}</h1>
            <div className="flex items-center gap-2">
              {[...Array(product.rating || 0)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">★</span>
              ))}
              <span className="text-zinc-500 text-sm">({product.ratingCount || 0})</span>
            </div>
            {product.discount && (
              <div className="text-red-600 text-xl font-thin">-{product.discount}%</div>
            )}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-zinc-800">{product.price}</span>
              {product.oldPrice && (
                <span className="text-zinc-500 line-through text-lg">{product.oldPrice}</span>
              )}
            </div>
            <div className="text-black text-base">Inclusive of all taxes</div>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xl">Quantity</span>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-zinc-300 rounded"
              />
            </div>
            <div className="text-black text-sm font-light mt-2">Free shipping on orders above $500</div>
            <button className="mt-6 w-full bg-amber-300 text-black py-4 rounded text-xl font-normal font-['Inter'] hover:bg-amber-400 transition">
              Add to Cart
            </button>
            <button className="w-full bg-amber-300 text-black py-4 rounded text-xl font-normal font-['Inter'] hover:bg-amber-400 transition">
              Add to Wishlist
            </button>
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-2">Details</h2>
              <p className="text-zinc-700">{product.description || 'No description available.'}</p>
            </div>
            {/* FAQ, Reviews, etc. can be added here */}
          </div>
        </div>
        {/* Suggested Products */}
        {product.suggested && product.suggested.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4">Suggested Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {product.suggested.map(s => (
                <div key={s.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <img src={s.image} alt={s.title} className="w-32 h-32 object-cover mb-2" />
                  <div className="font-medium">{s.title}</div>
                  <div className="text-zinc-500">{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Description Sections */}
        {product.sections && product.sections.length > 0 && (
          <div className="mt-16 space-y-12">
            {product.sections.map((section, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-8 items-center">
                {section.image && (
                  <img src={section.image} alt="" className="w-full md:w-1/2 h-60 object-cover rounded bg-zinc-100" />
                )}
                <div className="flex-1 text-4xl font-normal text-black">{section.text}</div>
              </div>
            ))}
          </div>
        )}
        {/* Reviews */}
        {product.reviews && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-4">Reviews</h2>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(product.rating || 0)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-4xl">★</span>
              ))}
              <span className="text-zinc-500 text-2xl">({product.ratingCount || 0})</span>
              <span className="text-black text-5xl font-normal ml-4">{product.avgRating || product.rating || 0}</span>
            </div>
            {/* List reviews here */}
            {/* Example: */}
            {/* <div className="border-b py-4">Great product!</div> */}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
