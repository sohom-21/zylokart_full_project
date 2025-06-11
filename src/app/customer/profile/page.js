// User Profile Page for onboarding after login
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/components/userProfile/userform'

export default function ProfilePage() {
  // TODO: Add logic to fetch/check user profile and redirect if already filled
  // You can use useEffect + router.push('/customer/homepage') if profile is complete

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-zinc-50 to-purple-100">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col justify-center py-8">
        <UserForm onSubmit={(values) => {
          // TODO: Save user profile to DB, then redirect
          // Example: router.push('/customer/homepage')
          alert('Profile saved! (Implement DB save and redirect logic)')
        }} />
      </main>
      <Footer />
    </div>
  )
}
