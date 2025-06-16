'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const AnimatedSVG = ({ src, alt, className, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      <Image
        src={src}
        alt={alt}
        width={120}
        height={140}
        className="w-full h-full object-contain"
      />
    </motion.div>
  )
}

const FloatingIcons = () => {
  const icons = [
    { src: '/1.svg', delay: 0.2, position: 'top-10 left-10' },
    { src: '/2.svg', delay: 0.4, position: 'top-20 right-20' },
    { src: '/3.svg', delay: 0.6, position: 'bottom-20 left-20' },
    { src: '/4.svg', delay: 0.8, position: 'bottom-10 right-10' },
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((icon, index) => (
        <motion.div
          key={index}
          className={`absolute ${icon.position} w-12 h-12 opacity-20`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 2,
            delay: icon.delay,
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Image
            src={icon.src}
            alt={`Floating icon ${index + 1}`}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </motion.div>
      ))}
    </div>
  )
}

export { AnimatedSVG, FloatingIcons }
