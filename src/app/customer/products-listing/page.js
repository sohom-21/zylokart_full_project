'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import supabase from '@/app/utiils/supabase/client'

// This file defines the product listing page.
// It displays a list of products, with options for filtering and sorting.
export default function ProductsListingPage() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('name')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const categories = ['All', 'clothing', 'Home decoration', 'beauty', 'furniture', 'footwear', 'accessories']

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, selectedCategory, sortBy])

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('Products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching products:', error)
      setProducts([])
    } else {
      setProducts(data || [])
    }
    setLoading(false)
  }

  const filterAndSortProducts = () => {
    let filtered = products
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }
    
    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'price_low':
          return (a.price_offered || a.price) - (b.price_offered || b.price)
        case 'price_high':
          return (b.price_offered || b.price) - (a.price_offered || a.price)
        case 'newest':
          return new Date(b.created_at) - new Date(a.created_at)
        default:
          return 0
      }
    })
    
    setFilteredProducts(filtered)
  }

  const handleProductClick = (productId) => {
    router.push(`/customer/product-details/${productId}`)
  }

  if (loading) {
    return (
      <div>
        <CustomerNavbar />
        <div className="min-h-screen flex items-center justify-center">Loading products...</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CustomerNavbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 self-center mr-2">Category:</span>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value="name">Name</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-gray-600 mb-6">{filteredProducts.length} products found</p>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={product.image_url || 'https://placehold.co/300x300'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                      -{product.discount}%
                    </span>
                  )}
                  <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs ${
                    product.stock > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                  }`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2 uppercase">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        ₹{product.price_offered || product.price}
                      </span>
                      {product.price && product.price_offered && product.price !== product.price_offered && (
                        <span className="text-sm text-gray-500 line-through">₹{product.price}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">(42)</span>
                  </div>
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