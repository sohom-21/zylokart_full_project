'use client'
import { useState } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client (replace with your keys or use env vars)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const CATEGORY_OPTIONS = [
  "Clothing (T-Shirts, Jeans, Dresses, Jackets, Hoodies, Ethnic Wear)",
  "Home decoration (Wall Art, Indoor Plants, Lamps, Vases, Cushions, Candles)",
  "Beauty (Skincare Kits, Lipsticks, Perfumes, Hair Products, Makeup Brushes, Face Masks)",
  "Furniture (Sofas, Dining Tables, Bed Frames, Bookshelves, Coffee Tables, Office Chairs)",
  "Footwear (Sneakers, Heels, Loafers, Flip-Flops, Sandals, Boots)",
  "Accessories (Watches, Sunglasses, Handbags, Wallets, Belts, Jewelry)"
];

export default function SellerAddProduct() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    oldPrice: '',
    discount: '',
    description: '',
    image: '',
    thumbnails: ['', '', '', '', ''],
    stock: '',
    category: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Auto-calculate offered price when MRP and discount are filled
  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'price') {
      // If discount is present, recalculate oldPrice
      if (form.discount) {
        const mrp = Number(value)
        const discount = Number(form.discount)
        const offer = mrp - Math.round((mrp * discount) / 100)
        setForm(prev => ({
          ...prev,
          price: value,
          oldPrice: offer ? offer : '',
        }))
        return
      }
    }
    if (name === 'discount') {
      // If price is present, recalculate oldPrice
      if (form.price) {
        const mrp = Number(form.price)
        const discount = Number(value)
        const offer = mrp - Math.round((mrp * discount) / 100)
        setForm(prev => ({
          ...prev,
          discount: value,
          oldPrice: offer ? offer : '',
        }))
        return
      }
    }
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleThumbnailChange = (idx, value) => {
    const newThumbs = [...form.thumbnails]
    newThumbs[idx] = value
    setForm(prev => ({ ...prev, thumbnails: newThumbs }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      const { error: supabaseError } = await supabase
        .from('products')
        .insert([
          {
            title: form.title,
            price: Number(form.price),
            oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
            discount: form.discount ? Number(form.discount) : null,
            description: form.description,
            image: form.image,
            thumbnails: form.thumbnails,
            stock: Number(form.stock),
            category: form.category,
          }
        ])
      if (supabaseError) throw new Error(supabaseError.message)
      setSuccess('Product added successfully!')
      setForm({
        title: '',
        price: '',
        oldPrice: '',
        discount: '',
        description: '',
        image: '',
        thumbnails: ['', '', '', '', ''],
        stock: '',
        category: '',
      })
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <SellerNavbar />
      <div className="flex flex-1 pt-14">
        <SellerDashboardSidebar />
        <main className="flex-1 px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded shadow">
              <div>
                <label className="block mb-1 font-medium">Product Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Minimalist Ceramic Vase"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block mb-1 font-medium">MRP (₹)</label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g. 999"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Offered Price (₹)</label>
                  <input
                    name="oldPrice"
                    type="number"
                    value={form.oldPrice}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100"
                    placeholder="Auto-calculated"
                  />
                </div>
                <div className="flex-1">
                  <label className="block mb-1 font-medium">Discount (%)</label>
                  <input
                    name="discount"
                    type="number"
                    value={form.discount}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                    placeholder="e.g. 20"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium">Stock</label>
                <input
                  name="stock"
                  type="number"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="100"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Category</option>
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Main Image URL</label>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="https://placehold.co/577x650"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[0, 1, 2, 3, 4].map(idx => (
                  <div key={idx}>
                    <label className="block mb-1 font-medium">{`Thumbnail ${idx + 1} URL`}</label>
                    <input
                      value={form.thumbnails[idx]}
                      onChange={e => handleThumbnailChange(idx, e.target.value)}
                      className="w-full border px-3 py-2 rounded"
                      placeholder={`https://placehold.co/100x100`}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block mb-1 font-medium">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                  placeholder="Premium lifestyle products for the modern individual. Quality, design, and sustainability in every piece."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-300 text-black py-3 rounded font-semibold hover:bg-amber-400 transition"
              >
                {loading ? 'Adding...' : 'Add Product'}
              </button>
              {success && <div className="text-green-600 mt-2">{success}</div>}
              {error && <div className="text-red-600 mt-2">{error}</div>}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}