// E:\gitHub_Docs\zylokart_full_project\src\app\seller\seller-Addproduct\page.js
'use client'
import { useState, useEffect } from 'react'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'
import SellerDashboardSidebar from '@/app/components/sidebars/seller-sidebar'
import { createClient } from '@supabase/supabase-js'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { UploadCloud, AlertCircle, CheckCircle } from 'lucide-react'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

const CATEGORY_OPTIONS = [
  "Clothing",
  "Home decoration",
  "Beauty",
  "Furniture",
  "Footwear",
  "Accessories"
];

// --- Helper function for file upload (placeholder) ---
// You'll need to implement this function to upload files to Supabase Storage
// and return the public URL.
async function uploadFileToSupabase(file) {
  if (!file) return null;

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `product-images/${fileName}`; // Adjust bucket/path as needed

  // console.log(`Uploading ${filePath}`); // Debug log

  const { data, error } = await supabase.storage
    .from('store-product-images') // Make sure this bucket exists and has correct policies
    .upload(filePath, file);

  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
  
  // console.log('Upload successful, data:', data); // Debug log

  const { data: publicUrlData } = supabase.storage
    .from('store-product-images')
    .getPublicUrl(filePath);

  // console.log('Public URL data:', publicUrlData); // Debug log
  
  if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error('Error getting public URL for path:', filePath, publicUrlData);
      throw new Error('Could not get public URL for uploaded file.');
  }

  return publicUrlData.publicUrl;
}
// --- End Helper function ---

const validationSchema = Yup.object({
  title: Yup.string().required('Product title is required').min(3, 'Title is too short'),
  price: Yup.number().required('MRP is required').positive('MRP must be positive'),
  discount: Yup.number().min(0, 'Discount cannot be negative').max(100, 'Discount cannot exceed 100').nullable(),
  description: Yup.string().required('Description is required').min(10, 'Description is too short'),
  imageFile: Yup.mixed().required('Main image is required').test(
    "fileType",
    "Unsupported file format (PNG, JPG, GIF only)",
    value => value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
  ),
  thumbnailFiles: Yup.array().of(
    Yup.mixed().nullable().test(
      "fileType",
      "Unsupported file format in thumbnails (PNG, JPG, GIF only)",
      value => !value || (value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type))
    )
  ).max(4, 'You can upload up to 4 thumbnails'),
  stock: Yup.number().required('Stock quantity is required').integer('Stock must be an integer').min(0, 'Stock cannot be negative'),
  category: Yup.string().required('Category is required').oneOf(CATEGORY_OPTIONS, 'Invalid category'),
});

export default function SellerAddProduct() {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '', // This will be MRP
      oldPrice: '', // This will be the calculated Offered Price
      discount: '',
      description: '',
      imageFile: null, // For the main image file input
      thumbnailFiles: [null, null, null, null], // For thumbnail file inputs
      stock: '',
      category: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      setSuccessMessage('');
      setErrorMessage('');

      try {
        // 1. Upload main image
        const imageUrl = await uploadFileToSupabase(values.imageFile);
        if (!imageUrl) throw new Error('Main image upload failed.');

        // 2. Upload thumbnail images
        const thumbnailUrls = await Promise.all(
          values.thumbnailFiles.map(file => file ? uploadFileToSupabase(file) : null)
        );
        const validThumbnailUrls = thumbnailUrls.filter(url => url !== null);

        // 3. Prepare product data for Supabase
        const productData = {
          title: values.title,
          price: Number(values.price), // MRP
          oldPrice: values.oldPrice ? Number(values.oldPrice) : null, // Offered Price
          discount: values.discount ? Number(values.discount) : null,
          description: values.description,
          image: imageUrl,
          thumbnails: validThumbnailUrls,
          stock: Number(values.stock),
          category: values.category,
          // You might want to add seller_id here if your table requires it
          // seller_id: supabase.auth.user()?.id // Example
        };
        
        // console.log("Submitting product data:", productData); // Debug log

        // 4. Insert into Supabase
        const { error: supabaseError } = await supabase
          .from('products')
          .insert([productData]);

        if (supabaseError) {
          // console.error("Supabase error:", supabaseError); // Debug log
          throw new Error(supabaseError.message);
        }

        setSuccessMessage('Product added successfully!');
        resetForm();
      } catch (err) {
        // console.error("Submit error:", err); // Debug log
        setErrorMessage(err.message || 'Failed to add product.');
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


  const renderFileInput = (name, label, index = -1) => (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type="file"
        accept="image/png, image/jpeg, image/gif"
        onChange={(event) => {
          if (index > -1) {
            formik.setFieldValue(`${name}[${index}]`, event.currentTarget.files[0]);
          } else {
            formik.setFieldValue(name, event.currentTarget.files[0]);
          }
        }}
        className="w-full border px-3 py-2 rounded file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
      />
      {index > -1 ? (
        formik.touched.thumbnailFiles && formik.errors.thumbnailFiles && formik.errors.thumbnailFiles[index] && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={14} /> {typeof formik.errors.thumbnailFiles[index] === 'string' ? formik.errors.thumbnailFiles[index] : 'Invalid file'}
          </div>
        )
      ) : (
        formik.touched[name] && formik.errors[name] && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1">
            <AlertCircle size={14} /> {formik.errors[name]}
          </div>
        )
      )}
    </div>
  );

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

              {renderFileInput('imageFile', 'Main Image')}

              <p className="text-sm font-medium text-gray-700 mt-4">Thumbnails (up to 4)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formik.values.thumbnailFiles.map((_, index) => (
                  renderFileInput('thumbnailFiles', `Thumbnail Image ${index + 1}`, index)
                ))}
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

              {successMessage && (
                <div className="text-green-600 mt-2 p-3 bg-green-50 border border-green-300 rounded flex items-center gap-2">
                  <CheckCircle size={18} /> {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="text-red-600 mt-2 p-3 bg-red-50 border border-red-300 rounded flex items-center gap-2">
                  <AlertCircle size={18} /> {errorMessage}
                </div>
              )}
            </form>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}
