'use client'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/components/userProfile/userform'

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col custom-bg">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col justify-center py-8">
        <UserForm />
      </main>
      <Footer />
    </div>
  )
}