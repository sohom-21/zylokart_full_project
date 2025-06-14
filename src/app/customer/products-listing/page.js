'use client'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'

const sampleProducts = [
  {
    id: 1,
    category: 'Home',
    label: 'New',
    labelColor: 'bg-zinc-800 text-white',
    title: 'Minimalist Ceramic Vase',
    price: '$89.00',
    image: 'https://placehold.co/439x630',
    rating: 5,
    ratingCount: 42,
  },
  {
    id: 2,
    category: 'Footwear',
    title: 'Premium Leather Sneakers',
    price: '$195.00',
    image: 'https://placehold.co/512x366',
    rating: 5,
    ratingCount: 87,
  },
  {
    id: 3,
    category: 'Clothing',
    label: 'Best Seller',
    labelColor: 'bg-zinc-800 text-white',
    title: 'Cashmere Sweater',
    price: '$249.00',
    image: 'https://placehold.co/439x658',
    rating: 5,
    ratingCount: 124,
  },
]

export default function Productslistings() {
  // Placeholder for backend connection:
  // const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   fetch('/api/products')
  //     .then(res => res.json())
  //     .then(data => setProducts(data));
  // }, []);

  const products = sampleProducts // Replace with backend data

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-zinc-900 transition-colors">
      <CustomerNavbar />
      {/* Promo Bar */}
      <div className="w-full bg-zinc-800 py-3 px-2 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="text-white text-sm tracking-wider font-['Inter']">Free shipping on all orders over $100. Use code</span>
        <span className="text-white text-lg font-bold tracking-wider font-['Inter']">FREESHIP</span>
      </div>
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold font-['Playfair_Display'] text-zinc-800 dark:text-white mb-8">Products</h1>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-zinc-800 rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-80 object-cover"
                />
                {product.label && (
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-sm text-sm font-normal font-['Inter'] ${product.labelColor}`}>
                    {product.label}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="uppercase text-zinc-500 text-xs font-['Inter'] tracking-wider mb-2">{product.category}</div>
                <div className="text-lg font-medium font-['Playfair_Display'] text-zinc-800 dark:text-white mb-2">{product.title}</div>
                <div className="text-lg font-bold font-['Inter'] text-zinc-800 dark:text-white mb-2">{product.price}</div>
                <div className="flex items-center mb-4">
                  {[...Array(product.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg leading-none">★</span>
                  ))}
                  <span className="ml-2 text-zinc-500 text-xs font-['Inter']">({product.ratingCount})</span>
                </div>
                <button className="mt-auto w-full bg-zinc-800 text-white py-3 rounded hover:bg-zinc-900 transition font-['Inter']">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Backend integration placeholder */}
        {/* Replace sampleProducts with data from your backend */}
      </main>
      <Footer />
    </div>
  )
}
// This file defines the product listing page.
// It displays a list of products, with options for filtering and sorting.