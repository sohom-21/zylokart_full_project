'use client'
import { useEffect, useState } from 'react'
import SellerForm from '../SellerForm'
import UserForm from '@/app/components/userProfile/userform'

export default function SellerDetailsPage() {
  const [userId, setUserId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0) // 1 for UserForm, 2 for SellerForm

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserId = localStorage.getItem('userId')
      setUserId(storedUserId)
      // If userId exists, assume UserForm is already filled and move to SellerForm
      if (storedUserId) {
        setCurrentStep(1)
      }
    }
  }, [])

  const handleUserFormSubmit = (newUserId) => {
    setUserId(newUserId)
    localStorage.setItem('userId', newUserId) // Save userId to local storage
    setCurrentStep(2)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 custom-bg">
      <div className="w-full max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-white mb-8">Seller Profile</h1>
        {userId ? (
          currentStep === 1 ? (
            <UserForm userId={userId} onNext={handleUserFormSubmit} />
          ) : (
            <SellerForm userId={userId} />
          )
        ) : (
          <div className="text-center text-white text-lg">Please log in to view seller details.</div>
        )}
      </div>
    </div>
  )
}