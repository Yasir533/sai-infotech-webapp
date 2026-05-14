import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiStar } from 'react-icons/hi'
import { FiAward, FiUsers, FiThumbsUp, FiShield } from 'react-icons/fi'

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

const trustBadges = [
  { icon: FiShield, label: 'ISO Certified', color: 'from-blue-600 to-blue-400', glow: 'rgba(37,99,235,0.25)' },
  { icon: FiAward,  label: '25+ Yrs Trust',  color: 'from-cyan-600 to-cyan-400',  glow: 'rgba(6,182,212,0.25)' },
  { icon: FiUsers,  label: '50+ Customers',  color: 'from-indigo-600 to-violet-400', glow: 'rgba(99,102,241,0.25)' },
  { icon: FiThumbsUp, label: '100% Success', color: 'from-blue-500 to-cyan-400',  glow: 'rgba(59,130,246,0.25)' },
]

// Five filled stars
function StarRow({ size = 22, color = '#facc15' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <HiStar key={i} size={size} color={color} style={{ filter: `drop-shadow(0 0 6px ${color}99)` }} />
      ))}
    </div>
  )
}

export default function Ratings() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const customerCount = useCounter(50, 1600, inView)
  const ratingWhole = useCounter(4, 1200, inView)
  const ratingDec = useCounter(9, 1400, inView)

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/6 rounded-full blur-[130px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-cyan-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-indigo-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Section Header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Customer Satisfaction</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Rated by Our <span className="text-gradient">Clients</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-xl mx-auto">
            Real results from real clients. Our track record speaks for itself.
          </p>
        </motion.div>

        {/* ── Main Rating Hero Card ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div
            className="glass rounded-3xl border border-white/10 hover:border-blue-500/30 transition-all duration-500 p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-10 sm:gap-16 max-w-2xl w-full"
            style={{ boxShadow: '0 24px 80px rgba(37,99,235,0.13), 0 0 0 1px rgba(255,255,255,0.04)' }}
          >
            {/* Big rating number */}
            <div className="text-center flex-shrink-0">
              <div className="relative">
                {/* Glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-40"
                  style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.5) 0%, transparent 70%)' }}
                />
                <div className="relative flex items-end justify-center leading-none mb-3">
                  <span
                    className="text-7xl sm:text-8xl font-black"
                    style={{
                      background: 'linear-gradient(135deg, #facc15, #fbbf24, #f59e0b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.4))',
                    }}
                  >
                    {ratingWhole}.{ratingDec}
                  </span>
                  <span className="text-slate-400 text-2xl font-bold mb-3 ml-1">/5</span>
                </div>
                <StarRow size={28} />
                <p className="text-slate-500 text-xs mt-3 tracking-widest uppercase">Average Rating</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-28 bg-white/8 hidden sm:block" />
            <div className="h-px w-28 bg-white/8 sm:hidden" />

            {/* Happy customers stat */}
            <div className="text-center flex-shrink-0">
              <div
                className="text-7xl sm:text-8xl font-black leading-none mb-3"
                style={{
                  background: 'linear-gradient(135deg, #60a5fa, #06b6d4, #818cf8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {customerCount}+
              </div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <FiUsers className="text-blue-400" size={16} />
                <span className="text-white font-semibold text-sm">Happy Customers</span>
              </div>
              <p className="text-slate-500 text-xs tracking-widest uppercase">& counting</p>
            </div>
          </div>
        </motion.div>

        {/* ── Rating Bar Breakdown ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="flex justify-center mb-12"
        >
          <div
            className="glass rounded-2xl border border-white/8 px-8 py-6 w-full max-w-lg"
            style={{ boxShadow: '0 12px 40px rgba(37,99,235,0.08)' }}
          >
            <p className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-5 text-center">Rating Breakdown</p>
            {[
              { stars: 5, pct: 88, color: '#22c55e' },
              { stars: 4, pct: 9,  color: '#84cc16' },
              { stars: 3, pct: 2,  color: '#eab308' },
              { stars: 2, pct: 1,  color: '#f97316' },
              { stars: 1, pct: 0,  color: '#ef4444' },
            ].map(({ stars, pct, color }, i) => (
              <div key={stars} className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-0.5 w-24 justify-end flex-shrink-0">
                  {[...Array(stars)].map((_, j) => (
                    <HiStar key={j} size={10} color={color} />
                  ))}
                </div>
                <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
                  />
                </div>
                <span className="text-slate-500 text-xs w-8 flex-shrink-0">{pct}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Trust Badges ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map(({ icon: Icon, label, color, glow }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl border border-white/8 hover:border-blue-500/25 transition-all duration-300 p-5 flex flex-col items-center gap-3 group"
              style={{ boxShadow: `0 12px 40px ${glow}` }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="text-white" size={22} />
              </div>
              <StarRow size={13} />
              <span className="text-white font-semibold text-sm text-center">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom verified strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-blue-500/20">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-slate-400 text-xs tracking-wide">Verified ratings from real customers · Bangalore, India</span>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
