import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log('ThemeToggle mounted. Current theme:', theme)
  }, [theme])

  if (!mounted) return null

  return (
    <button
      onClick={() => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(nextTheme)
        console.log('Theme toggled to:', nextTheme)
      }}
      className="p-2 rounded text-xl"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}

// Add this useEffect to your ThemeToggle.js or a top-level client component
export function ForceLightMode() {
  const { setTheme } = useTheme()
  useEffect(() => {
    setTheme('light')
    localStorage.setItem('theme', 'light')
  }, [setTheme])
  return null
}