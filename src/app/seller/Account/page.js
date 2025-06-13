// E:/gitHub_Docs/zylokart_full_project/src/app/seller/Account/page.js
'use client'
import { useState, useEffect } from 'react'
import UserForm from '@/app/userProfile/userform'
import SellerForm from '@/app/seller/SellerForm'
import SellerNavbar from '@/app/components/Navbars/Navbar-seller'
import Footer from '@/app/components/Footer'

export default function SellerAccountPage() {
  const [userId, setUserId] = useState(null)
  const [currentStep, setCurrentStep] = useState(1) // 1: UserForm, 2: SellerForm
  const [userData, setUserData] = useState(null)
  const [sellerData, setSellerData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId')
      setUserId(storedUserId)
      setCurrentStep(1)
    }
  }, [])

  useEffect(() => {
    if (!userId) return
    setLoading(true)
    // Fetch user and seller data in parallel
    Promise.all([
      fetchUserById(userId),      // Utility function for user data
      fetchSellerByUserId(userId) // Utility function for seller data
    ]).then(([userRes, sellerRes]) => {
      setUserData(userRes.data)
      setSellerData(sellerRes.data)
      setLoading(false)
    })
  }, [userId])

  // Handler for moving to next/previous step
  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 2))
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 1))

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SellerNavbar />
      <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-6">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between mb-6">
            <button
              className={`px-4 py-2 rounded ${currentStep === 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={handlePrev}
              disabled={currentStep === 1}
            >
              User Info
            </button>
            <button
              className={`px-4 py-2 rounded ${currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
              onClick={handleNext}
              disabled={currentStep === 2}
            >
              Seller Info
            </button>
          </div>
          {currentStep === 1 && (
            <UserForm
              initialValues={userData}
              userId={userId}
              onSuccess={handleNext}
              isSellerFlow={true}
            />
          )}
          {currentStep === 2 && (
            <SellerForm
              initialValues={sellerData}
              userId={userId}
              onBack={handlePrev}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Utility functions (replace with your actual imports)
import { getUserById } from '@/app/utiils/supabase/user_data'
import { getSellerByUserId } from '@/app/utiils/supabase/seller'

// Fetch user data
async function fetchUserById(user_id) {
  return await getUserById(user_id)
}

// Fetch seller data
async function fetchSellerByUserId(user_id) {
  return await getSellerByUserId(user_id)
}
