import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'

// Animated counter hook
function useCounter(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let start = 0
    const step = target / (duration / 16)

    const timer = setInterval(() => {
      start += step

      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [inView, target, duration])

  return count
}

// Five filled stars
function StarRow({ size = 22, color = '#facc15' }) {
  return (
    <div className="flex items-center justify-center gap-0.5 w-full">
      {[...Array(5)].map((_, i) => (
        <HiStar
          key={i}
          size={size}
          color={color}
          style={{
            filter: `drop-shadow(0 0 6px ${color}99)`,
          }}
        />
      ))}
    </div>
  )
}

export default function Ratings() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  })

  const customerCount = useCounter(50, 1600, inView)
  const ratingWhole = useCounter(4, 1200, inView)
  const ratingDec = useCounter(9, 1400, inView)

  return (
    <section
      id="testimonials"
      className="section-pad relative overflow-hidden"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/6 rounded-full blur-[130px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-cyan-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
            Customer Satisfaction
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Trusted by <span className="text-blue-400">Industry Leaders</span>
          </h2>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />

          <p className="text-slate-400 mt-6 max-w-2xl mx-auto text-lg">
            Our clients consistently rate us highly for quality, reliability, and exceptional service delivery.
          </p>
        </motion.div>

        {/* Main Rating Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center"
        >
          <div
            className="glass rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 p-8 w-full max-w-md relative overflow-hidden"
            style={{
              boxShadow:
                '0 24px 80px rgba(37,99,235,0.13), 0 0 0 1px rgba(255,255,255,0.04)',
            }}
          >

            {/* Glow */}
            <div
              className="absolute rounded-full blur-3xl opacity-30"
              style={{
                background:
                  'radial-gradient(circle, rgba(250,204,21,0.6) 0%, transparent 70%)',
                width: '180px',
                height: '180px',
                top: '20%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Overall Rating */}
            <div className="relative text-center mb-8 z-10">

              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">
                Overall Rating
              </h3>

              <div className="flex items-end justify-center leading-none mb-5">
                <span
                  className="text-6xl font-black"
                  style={{
                    background:
                      'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter:
                      'drop-shadow(0 0 20px rgba(250,204,21,0.4))',
                  }}
                >
                  {ratingWhole}.{ratingDec}
                </span>

                <span className="text-slate-500 text-lg font-bold mb-2 ml-1">
                  /5
                </span>
              </div>

              {/* PERFECTLY CENTERED STARS */}
              <div className="flex justify-center items-center w-full">
                <StarRow size={24} />
              </div>

              <p className="text-slate-400 text-xs mt-4">
                Based on {customerCount}+ reviews
              </p>
            </div>

            {/* Footer */}
            <div className="pt-5 border-t border-white/10 relative z-10">
              <div className="flex items-center justify-center gap-2 mb-3">
                <FiUsers className="text-emerald-400" size={16} />

                <span className="text-white font-semibold text-sm">
                  {customerCount}+ Happy Clients
                </span>
              </div>

              <p className="text-slate-400 text-xs text-center">
                ✓ 100% Recommended
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}