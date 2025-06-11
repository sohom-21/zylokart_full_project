'use client'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { User, Mail, Phone, Calendar, MapPin, Save, Shield, Globe, ToggleLeft, ToggleRight, CheckCircle, XCircle } from 'lucide-react'
import { useEffect } from 'react'
import { insertUser } from '@/app/utiils/supabase/user_data'

const ROLE_OPTIONS = [
  { label: 'Admin', value: 'admin' },
  { label: 'User', value: 'user' },
  { label: 'Guest', value: 'guest' },
  { label: 'Seller', value: 'seller' },
  { label: 'Logistics', value: 'logistics' },
]

const validationSchema = Yup.object({
  name: Yup.string().min(2, 'Too short!').max(50, 'Too long!').required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().matches(/^[0-9]{10,15}$/, 'Enter a valid phone number').required('Phone is required'),
  address: Yup.string().min(5, 'Too short!').required('Address is required'),
  area_code: Yup.string().min(2, 'Too short!').max(10, 'Too long!').required('Area code is required'),
  dob: Yup.date().max(new Date(), 'DOB cannot be in the future').required('Date of birth is required'),
  role: Yup.string().oneOf(['admin', 'user', 'guest', 'seller', 'logistics'], 'Select a valid role').required('Role is required'),
  is_active: Yup.boolean(),
})

export default function UserForm() {
  const router = useRouter()
  // Fetch user_id from localStorage
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : ''

  const formik = useFormik({
    initialValues: {
      user_id: userId || '',
      name: '',
      email: '',
      phone: '',
      address: '',
      area_code: '',
      dob: '',
      role: '',
      is_active: true,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Insert user data into Users table
      const { data, error } = await insertUser(values)
      setSubmitting(false)
      if (!error) {
        // Redirect to homepage or dashboard after successful insert
        router.push('/customer/homepage')
      } else {
        alert('Error saving profile: ' + error.message)
      }
    },
  })

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl p-10 space-y-7 border border-zinc-100 animate-fade-in"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, #f5f3ff 60%, #fff 100%)',
      }}
    >
      <h2 className="text-3xl font-bold text-center mb-4 text-zinc-800 flex items-center justify-center gap-2">
        <User className="text-indigo-500 animate-bounce" size={32} /> Complete Your Profile
      </h2>

      {/* User ID (read-only) */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          User ID
        </label>
        <input
          type="text"
          name="user_id"
          value={formik.values.user_id}
          readOnly
          disabled
          className="w-full px-4 py-3 rounded-lg border border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed focus:outline-none"
        />
      </div>

      {/* Name */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <User className="text-indigo-400" size={18} /> Full Name
        </label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.name && formik.errors.name ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your full name"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.name}</div>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <Mail className="text-indigo-400" size={18} /> Email
        </label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.email}</div>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <Phone className="text-indigo-400" size={18} /> Phone
        </label>
        <input
          type="tel"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.phone && formik.errors.phone ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your phone number"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.phone}</div>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <MapPin className="text-indigo-400" size={18} /> Address
        </label>
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.address && formik.errors.address ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your address"
        />
        {formik.touched.address && formik.errors.address && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.address}</div>
        )}
      </div>

      {/* Area Code */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <Globe className="text-indigo-400" size={18} /> Area Code
        </label>
        <input
          type="text"
          name="area_code"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.area_code}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.area_code && formik.errors.area_code ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
          placeholder="Enter your area code"
        />
        {formik.touched.area_code && formik.errors.area_code && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.area_code}</div>
        )}
      </div>

      {/* Date of Birth */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <Calendar className="text-indigo-400" size={18} /> Date of Birth
        </label>
        <input
          type="date"
          name="dob"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.dob && formik.errors.dob ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200`}
        />
        {formik.touched.dob && formik.errors.dob && (
          <div className="text-red-500 text-xs mt-1 flex items-center gap-1"><XCircle size={14} />{formik.errors.dob}</div>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="flex text-zinc-700 font-medium mb-1 items-center gap-2">
          <Shield className="text-indigo-400" size={18} /> Role
        </label>
        <select
          name="role"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.role}
          className={`w-full px-4 py-3 rounded-lg border ${formik.touched.role && formik.errors.role ? 'border-red-400' : 'border-zinc-200'} focus:outline-none focus:ring-2 focus:ring-indigo-200 bg-white`}
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
        <span className="text-zinc-700 font-medium flex items-center gap-2">
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
        className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition flex items-center justify-center gap-2 animate-pulse"
      >
        <Save size={20} /> {formik.isSubmitting ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}
