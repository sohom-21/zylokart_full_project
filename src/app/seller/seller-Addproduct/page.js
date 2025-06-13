// E:\gitHub_Docs\zylokart_full_project\src\app\seller\seller-Addproduct\page.js
'use client'
import { useState, useEffect } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'
import { insertProduct, uploadProductImage } from '@/app/utiils/supabase/products'
import supabase from '@/app/utiils/supabase/client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UploadCloud, AlertCircle } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast';

const CATEGORY_OPTIONS = [
  "Clothing",
  "Home decoration",
  "Beauty",
  "Furniture",
  "Footwear",
  "Accessories"
];

const validationSchema = Yup.object({
  title: Yup.string().required('Product title is required').min(3, 'Title is too short'),
  price: Yup.number().required('MRP is required').positive('MRP must be positive'),
  discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100').nullable(),
  description: Yup.string().required('Description is required').min(10, 'Description is too short'),
  imageFile: Yup.mixed().required('Main image is required').test(
    "fileType",
    "Unsupported file format (PNG, JPG, GIF only)",
    value => value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type)
  ),
  thumbnailFile1: Yup.mixed().nullable().test(
    "fileType",
    "Unsupported file format (PNG, JPG only)",
    value => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
  ),
  thumbnailFile2: Yup.mixed().nullable().test(
    "fileType",
    "Unsupported file format (PNG, JPG only)",
    value => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
  ),
  thumbnailFile3: Yup.mixed().nullable().test(
    "fileType",
    "Unsupported file format (PNG, JPG only)",
    value => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
  ),
  thumbnailFile4: Yup.mixed().nullable().test(
    "fileType",
    "Unsupported file format (PNG, JPG only)",
    value => !value || (value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type))
  ),
  stock: Yup.number().required('Stock quantity is required').integer('Stock must be an integer').min(0, 'Stock cannot be negative'),
  category: Yup.string().required('Category is required').oneOf(CATEGORY_OPTIONS, 'Invalid category'),
});

export default function SellerAddProduct() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [sellerId, setSellerId] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSessionAndSellerId = async () => {
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      setSession(currentSession);
      if (currentSession) {
        const currentSellerId = typeof window !== 'undefined' ? localStorage.getItem('seller_id') : null;
        setSellerId(currentSellerId);
      } else {
        setSellerId(null);
      }
    };
    fetchSessionAndSellerId();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '', // This will be MRP
      oldPrice: '', // This will be the calculated Offered Price
      discount: '',
      description: '',
      imageFile: null, // For the main image file input
      thumbnailFile1: null,
      thumbnailFile2: null,
      thumbnailFile3: null,
      thumbnailFile4: null,
      stock: '',
      category: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      if (!session || !sellerId) {
        toast.error('You must be logged in as a seller and your seller ID must be available.');
        setSubmitting(false);
        return;
      }

      try {
        // 1. Upload main image
        const { url: imageUrl, error: imageError } = await uploadProductImage(values.imageFile);
        if (imageError) throw new Error('Main image upload failed.');

        // 2. Upload thumbnail images
        const { url: thumbnailUrl1, error: thumbnailError1 } = values.thumbnailFile1 ? await uploadProductImage(values.thumbnailFile1) : { url: null, error: null };
        if (thumbnailError1) throw new Error('Thumbnail 1 upload failed.');

        const { url: thumbnailUrl2, error: thumbnailError2 } = values.thumbnailFile2 ? await uploadProductImage(values.thumbnailFile2) : { url: null, error: null };
        if (thumbnailError2) throw new Error('Thumbnail 2 upload failed.');

        const { url: thumbnailUrl3, error: thumbnailError3 } = values.thumbnailFile3 ? await uploadProductImage(values.thumbnailFile3) : { url: null, error: null };
        if (thumbnailError3) throw new Error('Thumbnail 3 upload failed.');

        const { url: thumbnailUrl4, error: thumbnailError4 } = values.thumbnailFile4 ? await uploadProductImage(values.thumbnailFile4) : { url: null, error: null };
        if (thumbnailError4) throw new Error('Thumbnail 4 upload failed.');

        // 3. Prepare product data
        const productData = {
          name: values.title,
          price: Number(values.price),
          description: values.description,
          image_url: imageUrl,
          image_url_1: thumbnailUrl1,
          image_url_2: thumbnailUrl2,
          image_url_3: thumbnailUrl3,
          image_url_4: thumbnailUrl4,
          stock: Number(values.stock),
          category: values.category,
          seller_id: sellerId,
          is_verified: true,
        };

        // 4. Insert into Products table
        const { error: supabaseError } = await insertProduct(productData);
        if (supabaseError) throw new Error(supabaseError.message);

        toast.success('Product added successfully!');
        resetForm();
      } catch (err) {
        toast.error(err.message || 'Failed to add product.');
      }
      setSubmitting(false);
    },
  });

  // Effect to auto-calculate offered price (oldPrice)
  useEffect(() => {
    const { price, discount } = formik.values;
    let calculatedOldPrice = '';
    if (price) {
      const mrp = Number(price);
      if (discount) {
        const discPercent = Number(discount);
        calculatedOldPrice = (mrp - Math.round((mrp * discPercent) / 100)).toFixed(2);
      } else {
        calculatedOldPrice = mrp.toFixed(2);
      }
    }
    formik.setFieldValue('oldPrice', calculatedOldPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.price, formik.values.discount]);


  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <SellerNavbar />
      <div className="flex flex-1 pt-14">
        <SellerDashboardSidebar />
        <main className="flex-1 px-8 py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-5 bg-white p-6 rounded shadow">
              <div>
                <label htmlFor="title" className="block mb-1 font-medium">Product Title</label>
                <input
                  id="title"
                  name="title"
                  {...formik.getFieldProps('title')}
                  className={`w-full border px-3 py-2 rounded ${formik.touched.title && formik.errors.title ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Minimalist Ceramic Vase"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.title}</div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="price" className="block mb-1 font-medium">MRP (₹)</label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    {...formik.getFieldProps('price')}
                    className={`w-full border px-3 py-2 rounded ${formik.touched.price && formik.errors.price ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. 999"
                  />
                  {formik.touched.price && formik.errors.price && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.price}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="discount" className="block mb-1 font-medium">Discount (%)</label>
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    {...formik.getFieldProps('discount')}
                    className={`w-full border px-3 py-2 rounded ${formik.touched.discount && formik.errors.discount ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. 20"
                  />
                  {formik.touched.discount && formik.errors.discount && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.discount}</div>
                  )}
                </div>
                <div className="flex-1">
                  <label htmlFor="oldPrice" className="block mb-1 font-medium">Offered Price (₹)</label>
                  <input
                    id="oldPrice"
                    name="oldPrice"
                    type="number"
                    value={formik.values.oldPrice}
                    readOnly
                    className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
                    placeholder="Auto-calculated"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="stock" className="block mb-1 font-medium">Stock</label>
                <input
                  id="stock"
                  name="stock"
                  type="number"
                  {...formik.getFieldProps('stock')}
                  className={`w-full border px-3 py-2 rounded ${formik.touched.stock && formik.errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="100"
                />
                {formik.touched.stock && formik.errors.stock && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.stock}</div>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                <select
                  id="category"
                  name="category"
                  {...formik.getFieldProps('category')}
                  className={`w-full border px-3 py-2 rounded ${formik.touched.category && formik.errors.category ? 'border-red-500' : 'border-gray-300'}`}
                >
                  <option value="">Select Category</option>
                  {CATEGORY_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.category}</div>
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">Main Image</label>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/gif"
                  onChange={(event) => formik.setFieldValue('imageFile', event.currentTarget.files[0])}
                  className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {formik.touched.imageFile && formik.errors.imageFile && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={14} /> {formik.errors.imageFile}
                  </div>
                )}
              </div>

              <p className="text-sm font-medium text-gray-700 mt-4">Thumbnails (up to 4)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium">Thumbnail Image 1</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => formik.setFieldValue('thumbnailFile1', event.currentTarget.files[0])}
                    className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formik.touched.thumbnailFile1 && formik.errors.thumbnailFile1 && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formik.errors.thumbnailFile1}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Thumbnail Image 2</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => formik.setFieldValue('thumbnailFile2', event.currentTarget.files[0])}
                    className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formik.touched.thumbnailFile2 && formik.errors.thumbnailFile2 && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formik.errors.thumbnailFile2}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Thumbnail Image 3</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => formik.setFieldValue('thumbnailFile3', event.currentTarget.files[0])}
                    className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formik.touched.thumbnailFile3 && formik.errors.thumbnailFile3 && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formik.errors.thumbnailFile3}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 font-medium">Thumbnail Image 4</label>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={(event) => formik.setFieldValue('thumbnailFile4', event.currentTarget.files[0])}
                    className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  {formik.touched.thumbnailFile4 && formik.errors.thumbnailFile4 && (
                    <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {formik.errors.thumbnailFile4}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                <textarea
                  id="description"
                  name="description"
                  {...formik.getFieldProps('description')}
                  rows="4"
                  className={`w-full border px-3 py-2 rounded ${formik.touched.description && formik.errors.description ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Premium lifestyle products for the modern individual. Quality, design, and sustainability in every piece."
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={14} />{formik.errors.description}</div>
                )}
              </div>

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-amber-500 text-black py-3 rounded font-semibold hover:bg-amber-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <UploadCloud size={20} />
                {formik.isSubmitting ? 'Adding Product...' : 'Add Product'}
              </button>

              
            </form>
          </div>
        </main>
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}
