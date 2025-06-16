'use client'
import Navbar from '@/app/components/Navbars/Navbar-landing'
import Footer from '@/app/components/Footer'
import Link from 'next/link'
import { signUp } from '@/app/utiils/supabase/auth'
import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import useTypewriter, { useMultiTypewriter } from '@/app/utiils/animation/typewriter'
import { AnimatedSVG, FloatingIcons } from '@/app/components/animations/AnimatedSVG'
import Image from 'next/image'

// This file defines the user signup page.
// It handles the registration process for new customers.
export default function Signup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()
  // Typewriter effects with better configuration
  const welcomeTexts = [
    "Join the Zylokart family!",
    "Start your shopping adventure...",
    "Create your account today!",
    "Unlock amazing deals and offers!"
  ]
  const typewriterText = useMultiTypewriter(welcomeTexts, 60, 1500, 2500)
  const shopText = useTypewriter("Begin your journey", 80, 800)

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMessage('')
    if (form.password !== form.confirmPassword) {
      setMessage('Passwords do not match')
      toast.error('Passwords do not match')
      return
    }
    if (!form.terms) {
      setMessage('You must agree to the terms')
      toast.error('You must agree to the terms')
      return
    }
    setLoading(true)
    try {
      const { error } = await signUp(form.email, form.password, { full_name: form.name })
      if (error) {
        setMessage(error.message)
        toast.error(error.message)
      } else {
        setMessage('Sign up successful! Please check your email for confirmation.')
        toast.success('Sign up successful! Please check your email for confirmation.')
        setForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false,
        })
        router.push('/customer/profile-details?role=user')
      }
    }
    catch (error) {
      setMessage('An error occurred. Please try again later.')
      toast.error('An error occurred. Please try again later.')
      console.error('Sign up error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col custom-bg-2 relative overflow-hidden">
      <FloatingIcons />
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-12 gap-12 max-w-6xl mx-auto w-full relative z-10">
        {/* Left: Animated welcome section */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-start mb-12 md:mb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4"
          >
            <span className="block text-white text-3xl font-normal font-['Inter'] mb-2 typewriter-container typewriter-stable">
              {shopText}
            </span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-6"
          >
            <span className="block text-white/80 text-xl font-light font-['Inter'] typewriter-container typewriter-stable">
              {typewriterText}
            </span>
          </motion.div>

          {/* Animated shopping icons */}
          <div className="flex items-center gap-6 mt-8">
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <AnimatedSVG 
                src="/4.svg" 
                alt="Shopping icon 4" 
                className="w-20 h-20"
                delay={1.2}
              />
              <AnimatedSVG 
                src="/5.svg" 
                alt="Shopping icon 5" 
                className="w-20 h-20"
                delay={1.4}
              />
              <AnimatedSVG 
                src="/6.svg" 
                alt="Shopping icon 6" 
                className="w-20 h-20"
                delay={1.6}
              />
            </motion.div>
            <motion.span 
              className="block text-white text-6xl font-normal font-['Inter']"
              initial={{ opacity: 0, scale: 0.5, rotate: 20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
              whileHover={{ 
                scale: 1.2, 
                rotate: -10,
                transition: { duration: 0.3 }
              }}
            >
              🎉
            </motion.span>
          </div>
        </motion.div>

        {/* Right: Animated Signup Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              className="flex-1 w-full max-w-md"
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="glass-card hover:glass-card-hover rounded-2xl shadow-lg border border-white/20 p-8 backdrop-blur-md"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.span 
                    className="text-3xl font-bold font-['Playfair_Display'] text-white tracking-widest"
                    whileHover={{ scale: 1.1, color: "#e0e7ff" }}
                    transition={{ duration: 0.3 }}
                  >
                    Zylokart
                  </motion.span>
                </motion.div>

                <motion.div 
                  className="flex justify-center mb-8 gap-8"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.span 
                    className="text-white text-lg font-bold font-['Inter'] border-b-2 border-white pb-1"
                    initial={{ borderBottomWidth: 0 }}
                    animate={{ borderBottomWidth: 2 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    Sign Up
                  </motion.span>
                  <Link href="/auth/login">
                    <motion.span 
                      className="text-white text-lg font-bold font-['Inter'] opacity-70 hover:opacity-100 transition cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login
                    </motion.span>
                  </Link>
                </motion.div>

                <motion.form 
                  className="space-y-5" 
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <label className="block text-white text-base font-normal mb-1">Full Name</label>
                    <motion.input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                      whileFocus={{ scale: 1.02, borderColor: "#818cf8" }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                  >
                    <label className="block text-white text-base font-normal mb-1">Email Address</label>
                    <motion.input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                      placeholder="Enter your email"
                      autoComplete="email"
                      required
                      whileFocus={{ scale: 1.02, borderColor: "#818cf8" }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    <label className="block text-white text-base font-normal mb-1">Password</label>
                    <motion.input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      required
                      whileFocus={{ scale: 1.02, borderColor: "#818cf8" }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <label className="block text-white text-base font-normal mb-1">Confirm Password</label>
                    <motion.input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      required
                      whileFocus={{ scale: 1.02, borderColor: "#818cf8" }}
                    />
                  </motion.div>

                  <motion.div 
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <motion.input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={form.terms}
                      onChange={handleChange}
                      className="accent-indigo-500"
                      required
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <label htmlFor="terms" className="text-white text-sm">
                      I agree to the{' '}
                      <Link href="/terms">
                        <motion.span 
                          className="underline cursor-pointer"
                          whileHover={{ color: "#e0e7ff" }}
                        >
                          Terms and Conditions
                        </motion.span>
                      </Link>
                    </label>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-lg bg-white/20 text-white font-bold font-['Inter'] text-lg shadow hover:bg-white/30 transition-all duration-300"
                    disabled={loading}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(255, 255, 255, 0.3)",
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      initial={false}
                      animate={{ opacity: loading ? 0.7 : 1 }}
                    >
                      {loading ? (
                        <motion.div
                          className="flex items-center justify-center gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Signing Up...
                        </motion.div>
                      ) : (
                        'Sign Up'
                      )}
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {message && (
                      <motion.div 
                        className="text-center text-white mt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        {message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}
