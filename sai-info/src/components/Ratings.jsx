import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { FiUsers } from 'react-icons/fi'
import { IoPeopleSharp } from 'react-icons/io5'
import { BsShieldFillCheck } from 'react-icons/bs'
import { MdOutlineTrackChanges } from 'react-icons/md'

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

const stats = [
  {
    icon: <IoPeopleSharp size={22} />,
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
    glow: 'rgba(59,130,246,0.35)',
    value: '100+',
    label: 'Happy Clients',
    delay: 0,
  },
  {
    icon: <BsShieldFillCheck size={20} />,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glow: 'rgba(99,102,241,0.35)',
    value: '25+',
    label: 'Years Experience',
    delay: 0.1,
  },
  {
    icon: <MdOutlineTrackChanges size={22} />,
    gradient: 'linear-gradient(135deg, #0ea5e9, #22d3ee)',
    glow: 'rgba(14,165,233,0.35)',
    value: '100%',
    label: 'Success Rate',
    delay: 0.2,
  },
]

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
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + stat.delay }}
              >
                {/* Gradient icon box — matches the style in your screenshot */}
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
                  style={{
                    background: stat.gradient,
                    boxShadow: `0 4px 14px ${stat.glow}`,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <span className="text-blue-400 font-black text-lg">{stat.value}</span>
                  <span className="text-slate-300 text-sm ml-2">{stat.label}</span>
                </div>
              </motion.div>
            ))}
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