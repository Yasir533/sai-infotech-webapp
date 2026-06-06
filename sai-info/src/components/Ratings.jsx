import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'

function useCounter(target, duration = 1800, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else { setCount(Math.floor(start)) }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return count
}

function StarRow({ size = 22, color = '#facc15' }) {
  return (
    <div className="flex items-center justify-center gap-1 w-full">
      {[...Array(5)].map((_, i) => <HiStar key={i} size={size} color={color} />)}
    </div>
  )
}

// Happy Clients — group of people / community icon
function IconHappyClients({ size = 20, color = '#60a5fa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
    </svg>
  )
}

// Years Experience — hourglass / time proven icon
function IconExperience({ size = 20, color = '#60a5fa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

// Success Rate — trophy / achievement icon
function IconSuccess({ size = 20, color = '#60a5fa' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4a2 2 0 0 0 0 4h2" />
      <path d="M18 9h2a2 2 0 0 1 0 4h-2" />
      <path d="M6 9V5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4" />
      <path d="M6 13c0 3.87 2.69 7 6 7s6-3.13 6-7" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
    </svg>
  )
}

export default function Ratings() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const customerCount = useCounter(50, 1600, inView)
  const ratingWhole = useCounter(4, 1200, inView)
  const ratingDec = useCounter(9, 1400, inView)

  return (
    <div className="relative z-10 w-full">
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
          Customer Satisfaction
        </span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
          Trusted by <span className="text-blue-400">Industry Leaders</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-sm mx-auto text-sm">
          Our clients consistently rate us highly for quality, reliability, and exceptional service delivery.
        </p>
      </motion.div>

      {/* Rating Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <div className="glass rounded-2xl border border-white/10 p-8" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.25)' }}>

          {/* Overall Rating */}
          <div className="text-center mb-8 pb-6 border-b border-white/10">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Overall Rating</h3>
            <div className="flex items-end justify-center leading-none mb-4">
              <span className="text-6xl font-black text-yellow-400">{ratingWhole}.{ratingDec}</span>
              <span className="text-slate-500 text-lg font-bold mb-2 ml-1">/5</span>
            </div>
            <div className="flex justify-center items-center w-full mb-3">
              <StarRow size={26} />
            </div>
            <p className="text-slate-400 text-xs">Based on {customerCount}+ reviews</p>
          </div>

          {/* Stats */}
          <div className="space-y-4">

            {/* Happy Clients */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <IconHappyClients size={20} color="#60a5fa" />
              </div>
              <div>
                <span className="text-blue-400 font-black text-lg">100+</span>
                <span className="text-slate-300 text-sm ml-2">Happy Clients</span>
              </div>
            </div>

            {/* Years Experience */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <IconExperience size={20} color="#60a5fa" />
              </div>
              <div>
                <span className="text-blue-400 font-black text-lg">25+</span>
                <span className="text-slate-300 text-sm ml-2">Years Experience</span>
              </div>
            </div>

            {/* Success Rate */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                <IconSuccess size={20} color="#60a5fa" />
              </div>
              <div>
                <span className="text-blue-400 font-black text-lg">100%</span>
                <span className="text-slate-300 text-sm ml-2">Success Rate</span>
              </div>
            </div>

          </div>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
            <div className="flex items-center gap-2">
              <FiUsers className="text-emerald-400" size={15} />
              <span className="text-white font-semibold text-sm">{customerCount}+ Happy Clients</span>
            </div>
            <p className="text-slate-400 text-xs">✓ 100% Recommended</p>
          </div>

        </div>
      </motion.div>
    </div>
  )
}