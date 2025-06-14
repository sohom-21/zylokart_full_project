'use client'
import { useEffect, useState } from "react";
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from "@/app/components/Footer";
import Link from "next/link";
import supabase from "@/app/utiils/supabase/client";
import Image from 'next/image';
import { getProductsForCustomerHomePage } from "@/app/utiils/supabase/products";


// This file defines the customer homepage.
// It displays featured products, categories, and other relevant information for customers.
export default function Homepage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);


  const fetchSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session) {
          setSession(session);
        } else {
          setSession(null);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setSession(null);
      }
    };
  
    useEffect(() => {
    // Check if user is logged in
    fetchSession();
  }, [])
  

  useEffect(() => {
    // Replace these URLs with your backend endpoints
    const fetchProductsAndCategories = async () => {
      try {
        const hardcodedCategories = [
          { name: 'clothing', img: '/LandingPage/Clothing.jpeg' },
          { name: 'Home decoration', img: '/LandingPage/furniture.jpg' },
          { name: 'beauty', img: '/LandingPage/Beauty.jpg' },
          { name: 'furniture', img: '/LandingPage/furniture.jpg' },
          { name: 'footwear', img: '/LandingPage/Shoes.jpg' },
          { name: 'accessories', img: '/LandingPage/Accessories.jpg' },
        ];
        setCategories(hardcodedCategories);

        const allProducts = {};
        for (const category of hardcodedCategories) {
          const { data: productsData, error: productsError } = await getProductsForCustomerHomePage(category.name);
          if (productsError) {
            console.error(`Error fetching products for ${category.name}:`, productsError.message);
            allProducts[category.name] = [];
          } else {
            allProducts[category.name] = productsData.map(product => ({
              id: product.id,
              label: product.stock > 0 ? 'In Stock' : 'Out of Stock',
              labelColor: product.stock > 0 ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
              category: product.category,
              title: product.name,
              price: product.price_offered ? `₹${product.price_offered.toFixed(2)}` : `₹${product.price.toFixed(2)}`,
              image: product.image_url,
              rating: 5, // Placeholder, assuming no rating system yet
              ratingCount: 0, // Placeholder
            }));
          }
        }
        setProducts(allProducts);
      } catch (error) {
        console.error('Error in fetching products and categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, []);

  if (loading) return (
    <div>
      <CustomerNavbar />
      <div className="min-h-[60vh] flex items-center justify-center">Loading...</div>
      <Footer />
    </div>
  );

  return (
    <div>
      <CustomerNavbar />

      {/* Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[100vh] flex items-center justify-start overflow-hidden">
        <Image
          src="/LandingPage/Hero.jpg"
          alt="Hero"
          layout="fill" // Or specify width and height for fixed size
          objectFit="cover" // Corresponds to CSS object-fit
          quality={75} // Optional: default is 75
          priority // Optional: if this is your LCP element
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="z-10 max-w-3xl px-6 md:ml-16 flex flex-col items-start justify-center h-full text-left">
          <h1 className="text-white text-4xl md:text-6xl font-medium font-['Playfair_Display'] mb-6">
            Elevate Your Everyday
          </h1>
          <p className="text-white text-lg md:text-xl font-light font-['Inter'] mb-8">
            Discover our curated collection of premium lifestyle essentials designed for modern living.
          </p>
          <Link href="/customer/products-listing">
            <button className="bg-zinc-800 text-white px-8 py-4 rounded font-medium font-['Inter'] hover:bg-zinc-900 transition">
              Shop Collection
            </button>
          </Link>
        </div>
      </section>

      {/* Promo Bar */}
      <div className="w-full bg-zinc-800 py-1 px-2 flex flex-col sm:flex-row items-center justify-center gap-2">
        <span className="text-white text-sm tracking-wider font-['Inter']">Free shipping on all orders over ₹1000. Use code</span>
        <span className="text-white text-lg font-bold tracking-wider font-['Inter']">FREESHIP</span>
      </div>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-medium font-['Playfair_Display'] text-zinc-800">
            Shop by Category
          </h2>
          <Link href="/customer/products-listing">
            <button className="px-6 py-2 border border-zinc-800 rounded font-medium font-['Inter'] hover:bg-zinc-800 hover:text-white transition">
              View All
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={cat.name || i} className="relative rounded-lg overflow-hidden group shadow hover:shadow-lg transition">
              <Image src={cat.img} alt={cat.name} width={550} height={600} priority quality={75} className="w-full h-64 object-cover group-hover:scale-105 transition" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white text-xl font-medium font-['Playfair_Display']">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-medium font-['Playfair_Display'] text-zinc-800">Best Sellers</h2>
          <Link href="/customer/products-listing">
            <button className="px-6 py-2 border border-zinc-800 rounded font-medium font-['Inter'] hover:bg-zinc-800 hover:text-white transition">View All</button>
          </Link>
        </div>
        {Object.keys(products).map(categoryName => (
            <div key={categoryName}>
              <h3 className="text-2xl font-medium font-['Playfair_Display'] text-zinc-800 mb-6 mt-10">{categoryName}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {products[categoryName].map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                    <div className="relative">
                      <img src={product.image} alt={product.title} className="w-full h-80 object-cover" />
                      {product.label && (
                        <span className={`absolute top-3 left-3 px-3 py-1 rounded-sm text-sm font-normal font-['Inter'] ${product.labelColor}`}>
                          {product.label}
                        </span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="uppercase text-zinc-500 text-xs font-['Inter'] tracking-wider mb-2">{product.category}</div>
                      <div className="text-lg font-medium font-['Playfair_Display'] text-zinc-800 mb-2">{product.title}</div>
                      <div className="text-lg font-bold font-['Inter'] text-zinc-800 mb-2">{product.price}</div>
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
            </div>
          ))}
      </section>

      {/* Newsletter */}
      <section className="w-full bg-neutral-100 py-16">
        <div className="max-w-2xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-medium font-['Playfair_Display'] text-zinc-800 mb-4 text-center">Join Our Community</h2>
          <p className="text-stone-500 text-lg font-normal font-['Inter'] mb-8 text-center">
            Subscribe to receive updates on new arrivals, special offers and other discount information.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-3xl border border-neutral-200 bg-white text-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-200 placeholder-neutral-400"
            />
            <button type="submit" className="px-8 py-4 bg-zinc-800 text-white rounded-3xl font-medium font-['Inter'] hover:bg-zinc-900 transition">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
