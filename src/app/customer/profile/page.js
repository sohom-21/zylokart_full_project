'use client'
// User Profile Page for onboarding after login
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/components/userProfile/userform'

export default function ProfilePage() {
  // No onSubmit prop passed to UserForm; UserForm handles DB insert and redirect

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-50 to-purple-100">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col justify-center py-8">
        <UserForm />
      </main>
      <Footer />
    </div>
  )
}
