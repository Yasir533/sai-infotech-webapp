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

// Stars
function StarRow({ size = 22, color = '#facc15' }) {
  return (
    <div className="flex items-center justify-center gap-1 w-full">
      {[...Array(5)].map((_, i) => (
        <HiStar
          key={i}
          size={size}
          color={color}
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
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-cyan-500/4 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
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

        {/* Rating Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center"
        >

          <div
            className="glass rounded-2xl border border-white/10 p-8 w-full max-w-md"
            style={{
              boxShadow:
                '0 12px 40px rgba(0,0,0,0.25)',
            }}
          >

            {/* Rating */}
            <div className="text-center mb-8">

              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5">
                Overall Rating
              </h3>

              <div className="flex items-end justify-center leading-none mb-5">

                <span className="text-6xl font-black text-yellow-400">
                  {ratingWhole}.{ratingDec}
                </span>

                <span className="text-slate-500 text-lg font-bold mb-2 ml-1">
                  /5
                </span>
              </div>

              {/* Centered Stars */}
              <div className="flex justify-center items-center w-full">
                <StarRow size={24} />
              </div>

              <p className="text-slate-400 text-xs mt-4">
                Based on {customerCount}+ reviews
              </p>
            </div>

            {/* Footer */}
            <div className="pt-5 border-t border-white/10">

              <div className="flex items-center justify-center gap-2 mb-3">
                <FiUsers
                  className="text-emerald-400"
                  size={16}
                />

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