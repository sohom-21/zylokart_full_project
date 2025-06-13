'use client'
import { useState, useEffect } from 'react'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/customer/profileform'
import { User } from 'lucide-react'
// import { getUserById } from '@/app/utiils/supabase/user_data'

function ProfileHeader() {
  return (
    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 rounded-2xl shadow-lg mb-8">
      <div className="bg-white/20 rounded-full p-3">
        <User className="text-white" size={40} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-white drop-shadow">Your Profile</h1>
        <p className="text-zinc-100 text-lg">Manage your personal information and account settings</p>
      </div>
    </div>
  )
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserId(localStorage.getItem('userId'))
    }
  }, [])

  // No need to fetch user data here, UserForm handles it internally
  // The ProfilePage only needs to pass the userId to UserForm

  // handleUpdateProfile is not needed here as UserForm handles the submission logic

  // The isEdit state and its toggle button are handled within UserForm now
  // The ProfilePage only needs to render UserForm with the correct props

  useEffect(() => {
    // Once userId is available, we can stop loading
    if (userId) {
      setIsLoading(false)
    }
  }, [userId])

  return (
    <div className="min-h-screen flex flex-col custom-bg">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col items-center py-10 px-4 md:px-6">
        <div className="w-full max-w-4xl">
          <ProfileHeader />
          <div className="glass-card rounded-2xl shadow-xl p-6 md:p-10">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-10 md:gap-16">
                <div className="flex-1 w-full md:w-2/3">
                  <UserForm 
                    userId={userId}
                    className="space-y-6"
                  />
                </div>
                <div className="hidden md:flex flex-col gap-6 justify-start w-96">
                  <div className="bg-gradient-to-br from-indigo-500/90 to-purple-500/90 rounded-2xl shadow-lg p-7 text-white">
                    <h2 className="text-2xl font-bold mb-4">Profile Tips</h2>
                    <ul className="list-disc pl-6 space-y-3 text-zinc-100">
                      <li>Keep your contact information up to date for better communication</li>
                      <li>Use a strong, unique password to secure your account</li>
                      <li>Ensure your role is set correctly for the best platform experience</li>
                      <li>Verify your address and area code for accurate service delivery</li>
                    </ul>
                  </div>
                  <div className="bg-white/30 dark:bg-zinc-700/30 rounded-2xl shadow-lg p-7 text-zinc-700 dark:text-zinc-200">
                    <h3 className="text-xl font-semibold mb-3">Need Help?</h3>
                    <p className="text-base leading-relaxed">
                      Our support team is here to help! Contact us through our support portal or visit our comprehensive FAQ section for detailed guidance on managing your profile.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}