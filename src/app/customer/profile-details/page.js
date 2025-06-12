'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CustomerNavbar from '@/app/components/Navbars/navbar-customer'
import Footer from '@/app/components/Footer'
import UserForm from '@/app/components/userProfile/userform'

export default function ProfilePage() {
  const [accessToken, setAccessToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash
      if (hash) {
        const params = new URLSearchParams(hash.substring(1))
        const token = params.get('access_token')
        if (token) {
          setAccessToken(token)
          localStorage.setItem('supabase_access_token', token)
          // Decode JWT to get user id (sub)
          try {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userIdFromToken = payload.sub
            setUserId(userIdFromToken)
            localStorage.setItem('userId', userIdFromToken)
          } catch (error) {
            console.error('Error decoding JWT:', error)
          }
          // Clean up the URL (remove the hash fragment)
          router.replace('/customer/profile-details', undefined, { shallow: true })
        }
      }
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col custom-bg">
      <CustomerNavbar />
      <main className="flex-1 flex flex-col justify-center py-8">
        <UserForm accessToken={accessToken} userId={userId} />
      </main>
      <Footer />
    </div>
  )
}