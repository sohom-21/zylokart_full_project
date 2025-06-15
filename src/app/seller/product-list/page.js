'use client'
import { useEffect, useState } from 'react'
import { getProductsBySellerId, updateProductById } from '@/app/utiils/supabase/products'
import supabase from '@/app/utiils/supabase/client'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'


export default function SellerProductList() {
  const [sellerId, setSellerId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editIdx, setEditIdx] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [actionMsg, setActionMsg] = useState('')
  const needSellerId = localStorage.getItem('seller_id')

  useEffect(() => {
    const fetchSessionAndSellerId = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const currentSellerId = typeof window !== 'undefined' ? localStorage.getItem('seller_id') : null;
        setSellerId(currentSellerId);
      } else {
        setSellerId(null);
      }
    };
    fetchSessionAndSellerId();
  }, []);

  useEffect(() => {
    if (!sellerId) return;
    setLoading(true);
    getProductsBySellerId(sellerId).then(({ data, error }) => {
      if (!error) setProducts(data || []);
      setLoading(false);
    });
  }, [sellerId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return
    setActionMsg('')
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      setActionMsg('Failed to delete product.')
    } else {
      setActionMsg('Product deleted.')
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleEdit = (idx) => {
    setEditIdx(idx)
    setEditForm({ ...products[idx] })
    setActionMsg('')
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditForm(prev => ({ ...prev, [name]: value }))
  }

  const handleEditSave = async (id) => {
    setActionMsg('')
    const { error } = await supabase.from('products').update({
      title: editForm.title,
      price: Number(editForm.price),
      discount: editForm.discount ? Number(editForm.discount) : null,
      stock: Number(editForm.stock),
      category: editForm.category,
      image: editForm.image_url,
      description: editForm.description,
      seller_id: needSellerId
    }).eq('id', id)
    if (error) {
      setActionMsg('Failed to update product.')
    } else {
      setActionMsg('Product updated.')
      setEditIdx(null)
      fetchProducts()
    }
  }

  const handleEditCancel = () => {
    setEditIdx(null)
    setEditForm({})
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-white to-stone-100 flex flex-col">
      <SellerNavbar />
      <div className="pt-14 flex flex-1">
        <SellerDashboardSidebar />
        <main className="flex-1 px-6 md:px-12 py-8 bg-transparent">
          {/* Topbar */}
          <div className="w-full h-20 bg-white/80 shadow-lg flex items-center px-8 mb-10 rounded-3xl border border-stone-100 backdrop-blur-md">
            <div className="flex-1 text-3xl font-extrabold text-neutral-950 tracking-tight">Product Listings</div>
            <div className="flex items-center gap-4">
              <a href="/seller/seller-Addproduct" className="bg-orange-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-orange-600 transition shadow">
                + Add Product
              </a>
            </div>
          </div>

          <div className="bg-white/90 rounded-3xl shadow-xl p-8 border border-stone-100">
            <div className="text-lg font-extrabold text-neutral-800 mb-6">Your Products</div>
            {actionMsg && <div className="mb-4 text-center text-sm text-blue-600">{actionMsg}</div>}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-neutral-500 border-b">
                    <th className="py-3 px-4 font-semibold">Image</th>
                    <th className="py-3 px-4 font-semibold">Title</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">MRP (₹)</th>
                    <th className="py-3 px-4 font-semibold">Discount (%)</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">Loading...</td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-6 text-center text-gray-400">No products found.</td>
                    </tr>
                  ) : (
                    products.map((product, idx) => (
                      <tr key={product.id} className="border-b hover:bg-amber-50 transition">
                        <td className="py-3 px-4">
                          <img src={product.image_url} alt={product.name} className="w-14 h-14 rounded object-cover border" />
                        </td>
                        <td className="py-3 px-4 font-medium">
                          {editIdx === idx ? (
                            <input
                              name="title"
                              value={editForm.title}
                              onChange={handleEditChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            product.name
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editIdx === idx ? (
                            <input
                              name="category"
                              value={editForm.category}
                              onChange={handleEditChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            product.category
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editIdx === idx ? (
                            <input
                              name="price"
                              type="number"
                              value={editForm.price}
                              onChange={handleEditChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            product.price
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editIdx === idx ? (
                            <input
                              name="discount"
                              type="number"
                              value={editForm.discount || ''}
                              onChange={handleEditChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            product.discount
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editIdx === idx ? (
                            <input
                              name="stock"
                              type="number"
                              value={editForm.stock}
                              onChange={handleEditChange}
                              className="border px-2 py-1 rounded w-full"
                            />
                          ) : (
                            product.stock
                          )}
                        </td>
                        <td className="py-3 px-4">
                          {editIdx === idx ? (
                            <div className="flex gap-2">
                              <button
                                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                onClick={() => handleEditSave(product.id)}
                                type="button"
                              >
                                Save
                              </button>
                              <button
                                className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                                onClick={handleEditCancel}
                                type="button"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex gap-2">
                              <button
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                onClick={() => handleEdit(idx)}
                                type="button"
                              >
                                Edit
                              </button>
                              <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                onClick={() => handleDelete(product.id)}
                                type="button"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
