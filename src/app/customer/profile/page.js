'use client'
import { useState } from 'react'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/components/userProfile/userform'
import { User } from 'lucide-react'

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
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="min-h-screen flex flex-col custom-bg">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col items-center py-10 px-2 md:px-0">
        <div className="w-full max-w-4xl">
          <ProfileHeader />
          <div className="bg-white/80 dark:bg-zinc-900/80 rounded-2xl shadow-xl p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16">
            <div className="flex-1 flex flex-col justify-center">
              <UserForm isEdit={isEdit} />
              <div className="flex justify-end mt-6">
                <button
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-lg shadow hover:from-indigo-600 hover:to-purple-600 transition"
                  onClick={() => setIsEdit((prev) => !prev)}
                >
                  {isEdit ? 'Cancel' : 'Update Profile'}
                </button>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-6 justify-center w-80">
              <div className="bg-gradient-to-br from-indigo-400/80 to-purple-400/80 rounded-2xl shadow-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-2">Profile Tips</h2>
                <ul className="list-disc pl-5 space-y-1 text-zinc-100">
                  <li>Keep your contact info up to date</li>
                  <li>Use a strong, unique password</li>
                  <li>Set your role correctly for best experience</li>
                  <li>Check your address and area code</li>
                </ul>
              </div>
              <div className="bg-white/20 rounded-2xl shadow p-6 text-zinc-700 dark:text-zinc-200">
                <h3 className="font-semibold mb-1">Need Help?</h3>
                <p className="text-sm">Contact support or visit our FAQ for more information about managing your profile.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}