import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedLogo({ className = '' }) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {
        // Autoplay might be blocked, that's okay
      })
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.05 }}
      className={`relative ${className}`}
    >
      {/* Main container with cyber effects */}
      <div className="relative inline-block">
        
        {/* Outer glow pulse ring */}
        <motion.div
          className="absolute -inset-8 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Rotating scanning ring */}
        <motion.div
          className="absolute -inset-4"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(6,182,212,0.4) 10%, transparent 20%)',
            borderRadius: '50%',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Corner tech brackets */}
        <div className="absolute -inset-2 pointer-events-none">
          {/* Top-left bracket */}
          <motion.div
            className="absolute top-0 left-0 w-8 h-8"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
            <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>

          {/* Top-right bracket */}
          <motion.div
            className="absolute top-0 right-0 w-8 h-8"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400 to-transparent" />
            <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-cyan-400 to-transparent" />
          </motion.div>

          {/* Bottom-left bracket */}
          <motion.div
            className="absolute bottom-0 left-0 w-8 h-8"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-transparent" />
            <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-cyan-400 to-transparent" />
          </motion.div>

          {/* Bottom-right bracket */}
          <motion.div
            className="absolute bottom-0 right-0 w-8 h-8"
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-cyan-400 to-transparent" />
            <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-cyan-400 to-transparent" />
          </motion.div>
        </div>

        {/* Moving tech lines (horizontal) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`h-line-${i}`}
              className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              style={{
                top: `${30 + i * 20}%`,
              }}
              animate={{
                x: ['-100%', '200%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Moving tech lines (vertical) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`v-line-${i}`}
              className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              style={{
                left: `${25 + i * 50}%`,
              }}
              animate={{
                y: ['-100%', '200%'],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                delay: i * 1.2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Particle dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-cyan-400"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Main video container with enhanced glow */}
        <div className="relative z-10">
          <motion.div
            animate={{
              filter: [
                'drop-shadow(0 0 20px rgba(6,182,212,0.6)) drop-shadow(0 0 40px rgba(37,99,235,0.4))',
                'drop-shadow(0 0 30px rgba(6,182,212,0.8)) drop-shadow(0 0 50px rgba(37,99,235,0.6))',
                'drop-shadow(0 0 20px rgba(6,182,212,0.6)) drop-shadow(0 0 40px rgba(37,99,235,0.4))',
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="h-14 sm:h-16 w-auto object-contain"
              style={{
                maxWidth: '340px',
              }}
            >
              <source src="/logo-animated.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </div>

        {/* Hexagonal tech grid overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexagons" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path
                  d="M20 5 L30 12.5 L30 27.5 L20 35 L10 27.5 L10 12.5 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-cyan-400"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
        </div>

        {/* Data stream effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -right-full top-0 h-full w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.1) 50%, transparent 100%)',
            }}
            animate={{
              x: ['0%', '200%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

      </div>
    </motion.div>
  )
}
