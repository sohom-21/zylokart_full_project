'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { Building, FileText, CheckCircle, XCircle, Calendar, User, Save } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const validationSchema = Yup.object({
  shop_name: Yup.string().min(2, 'Too short!').max(100, 'Too long!').required('Shop name is required'),
  gst_number: Yup.string().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, 'Invalid GST Number').required('GST Number is required'),
  is_verified: Yup.boolean(),
  user_id: Yup.string().uuid('Invalid User ID').required('User ID is required'),
})

export default function SellerForm({ userId: propUserId }) {
  const localUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : ''
  const userId = propUserId || localUserId
  const router = useRouter()

  const [initialValues, setInitialValues] = useState({
    shop_name: '',
    gst_number: '',
    is_verified: false,
    user_id: userId || '',
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSeller() {
      if (!userId) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase.from('Sellers').select('*').eq('user_id', userId).single()
      if (data) {
        setInitialValues({
          shop_name: data.shop_name || '',
          gst_number: data.gst_number || '',
          is_verified: data.is_verified ?? false,
          user_id: data.user_id,
        })
      }
      setLoading(false)
    }
    fetchSeller()
  }, [userId])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      const { data, error } = await supabase.from('Sellers').upsert({
        user_id: values.user_id,
        shop_name: values.shop_name,
        gst_number: values.gst_number,
        is_verified: values.is_verified,
      }, { onConflict: 'user_id' })

      setSubmitting(false)
      if (error) {
        alert('Error saving seller details: ' + error.message)
      } else {
        // Set seller_id in localStorage after onboarding
        if (data && data[0] && data[0].seller_id) {
          localStorage.setItem('seller_id', data[0].seller_id);
        }
        alert('Seller details saved successfully!')
        setTimeout(() => {
          router.push('/seller/seller-homepage');
        }, 1000);
      }
    },
  })

  if (loading) {
    return <div className="text-center py-10 text-lg text-zinc-500">Loading seller details...</div>
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl w-full mx-auto glass-card rounded-3xl shadow-2xl p-10 space-y-7 border border-zinc-100 animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-zinc-800 flex items-center justify-center gap-2">
        <Building className="text-indigo-500 animate-bounce" size={32} /> Seller Details
      </h2>

      {/* User ID (read-only) */}
      <div>
        <label className="flex text-zinc-800 font-medium mb-1 items-center gap-2">
          User ID
        </label>
        <input
          type="text"
          name="user_id"
          value={formik.values.user_id}
          readOnly
          disabled
          placeholder="User ID will be auto-generated or fetched"
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-white/20 text-zinc-800 placeholder-zinc-500 cursor-not-allowed focus:outline-none"
        />
      </div>

      {/* Shop Name */}
      <div>
        <label className="flex text-zinc-800 font-medium mb-1 items-center gap-2">
          <Building className="text-indigo-500" size={18} /> Shop Name
        </label>
        <input
          type="text"
          name="shop_name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shop_name}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.shop_name && formik.errors.shop_name ? 'border-red-400' : 'border-zinc-200'} bg-white/20 text-zinc-800 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your shop name"
        />
        {formik.touched.shop_name && formik.errors.shop_name && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.shop_name}</div>
        )}
      </div>

      {/* GST Number */}
      <div>
        <label className="flex text-zinc-800 font-medium mb-1 items-center gap-2">
          <FileText className="text-indigo-500" size={18} /> GST Number
        </label>
        <input
          type="text"
          name="gst_number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gst_number}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.gst_number && formik.errors.gst_number ? 'border-red-400' : 'border-zinc-200'} bg-white/20 text-zinc-800 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your GST number (e.g., 22ABCDE1234F1Z5)"
        />
        {formik.touched.gst_number && formik.errors.gst_number && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.gst_number}</div>
        )}
      </div>

      {/* Is Verified Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-zinc-800 font-medium flex items-center gap-2">
          {formik.values.is_verified ? <CheckCircle className="text-green-500" size={18} /> : <XCircle className="text-red-400" size={18} />} Verified
        </span>
        <button
          type="button"
          onClick={() => formik.setFieldValue('is_verified', !formik.values.is_verified)}
          className={`transition-colors duration-200 ${formik.values.is_verified ? 'bg-green-200' : 'bg-red-200'} rounded-full p-1 flex items-center`}
        >
          {formik.values.is_verified ? <CheckCircle className="text-green-600" size={28} /> : <XCircle className="text-red-500" size={28} />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Save size={20} /> {formik.isSubmitting ? 'Saving...' : 'Save Seller Details'}
      </button>
    </form>
  )
}