'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Save, Shield, Globe, ToggleLeft, ToggleRight, CheckCircle, XCircle } from 'lucide-react'
import { getUserById,updateUserById,insertUser } from '../utiils/supabase/user_data'

const ROLE_OPTIONS = [
  { label: 'Seller', value: 'seller' },
]

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Enter a valid phone number').required('Phone is required'),
  address: Yup.string().min(5, 'Too short!').required('Address is required'),
  area_code: Yup.string().min(2, 'Too short!').max(10, 'Too long!').required('Area code is required'),
  role: Yup.string().oneOf(['admin', 'user', 'guest', 'seller', 'logistics'], 'Select a valid role').required('Role is required'),
  is_active: Yup.boolean(),
})

export default function SellerProfileDetails({ userId: propUserId, isEdit }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fixedRole = searchParams.get('role')
  const localUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : ''
  const userId = propUserId || localUserId

  const [initialValues, setInitialValues] = useState({
    user_id: userId || '',
    name: '',
    email: '',
    phone: '',
    address: '',
    area_code: '',
    role: fixedRole || 'user',
    is_active: true,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      if (!userId) return setLoading(false)
      const { data, error } = await getUserById(userId)
      if (data) {
        setInitialValues({
          user_id: data.user_id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          area_code: data.area_code || '',
          role: data.role || fixedRole || 'user',
          is_active: data.is_active ?? true,
        })
      }
      setLoading(false)
    }
    fetchUser()
  }, [userId, fixedRole])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
      let result
      if (isEdit) {
        result = await updateUserById(userId, values)
      } else {
        result = await insertUser(values)
      }
      setSubmitting(false)
      const { error } = result
      if (!error) {
        router.push('/customer/homepage')
      } else {
        alert('Error saving profile: ' + error.message)
      }
    },
  })

  if (loading) {
    return <div className="text-center py-10 text-lg text-zinc-500">Loading profile...</div>
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-2xl w-full mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-7 border border-gray-300 animate-fade-in"
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-black flex items-center justify-center gap-2">
        <User className="text-gray-700 animate-bounce" size={32} /> Complete Your Profile
      </h2>

      {/* User ID (read-only) */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          User ID
        </label>
        <input
          type="text"
          name="user_id"
          value={formik.values.user_id}
          readOnly
          disabled
          placeholder="User ID will be auto-generated"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 placeholder-gray-500 cursor-not-allowed focus:outline-none"
        />
      </div>

      {/* Name */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <User className="text-gray-600" size={18} /> Full Name
        </label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-gray-300'} bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          placeholder="Enter your full name"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.name}</div>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <Mail className="text-gray-600" size={18} /> Email
        </label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300'} bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.email}</div>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <Phone className="text-gray-600" size={18} /> Phone
        </label>
        <input
          type="tel"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-gray-300'} bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          placeholder="Enter your phone number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.phone}</div>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <MapPin className="text-gray-600" size={18} /> Address
        </label>
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.address && formik.errors.address ? 'border-red-400' : 'border-gray-300'} bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          placeholder="Enter your address"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.address}</div>
        )}
      </div>

      {/* Area Code */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <Globe className="text-gray-600" size={18} /> Area Code
        </label>
        <input
          type="text"
          name="area_code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.area_code}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.area_code && formik.errors.area_code ? 'border-red-400' : 'border-gray-300'} bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          placeholder="Enter your area code"
        />
        {formik.touched.area_code && formik.errors.area_code && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.area_code}</div>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="flex text-gray-700 font-medium mb-1 items-center gap-2">
          <Shield className="text-gray-600" size={18} /> Role
        </label>
        <select
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.role && formik.errors.role ? 'border-red-400' : 'border-gray-300'} bg-white text-black focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={!fixedRole}
        >
          <option value="">Select role</option>
          {ROLE_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {formik.touched.role && formik.errors.role && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.role}</div>
        )}
      </div>

      {/* Is Active Toggle */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium flex items-center gap-2">
          {formik.values.is_active ? <CheckCircle className="text-green-500" size={18} /> : <XCircle className="text-red-400" size={18} />} Active
        </span>
        <button
          type="button"
          onClick={() => formik.setFieldValue('is_active', !formik.values.is_active)}
          className={`transition-colors duration-200 ${formik.values.is_active ? 'bg-green-200' : 'bg-red-200'} rounded-full p-1 flex items-center`}
        >
          {formik.values.is_active ? <ToggleRight className="text-green-600" size={28} /> : <ToggleLeft className="text-red-500" size={28} />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={formik.isSubmitting}
        className="w-full py-3 rounded-lg bg-black text-white font-bold text-lg shadow hover:bg-gray-800 transition flex items-center justify-center gap-2"
      >
        <Save size={20} /> {formik.isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
