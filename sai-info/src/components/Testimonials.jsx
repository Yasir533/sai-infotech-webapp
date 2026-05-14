import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { FaQuoteLeft } from 'react-icons/fa'

const testimonials = [
  {
    name: 'Ravi Kumar',
    role: 'IT Manager, HCL Technologies',
    initials: 'RK',
    colorFrom: '#1d4ed8',
    colorTo: '#60a5fa',
    rating: 5,
    text: 'SAI INFOTECH has been our go-to IT partner for over 3 years. Their chip-level repair expertise saved us lakhs in equipment replacement costs. Absolutely professional and reliable team.',
  },
  {
    name: 'Priya Sharma',
    role: 'Admin Head, Ram Krishna Hospital',
    initials: 'PS',
    colorFrom: '#0e7490',
    colorTo: '#22d3ee',
    rating: 5,
    text: 'We had a critical data recovery emergency and SAI INFOTECH recovered everything within 24 hours. Their fast response and technical competence are unmatched. Highly recommended!',
  },
  {
    name: 'Anand Reddy',
    role: 'Director, RMS Technologies',
    initials: 'AR',
    colorFrom: '#3730a3',
    colorTo: '#818cf8',
    rating: 5,
    text: 'The networking and firewall setup SAI INFOTECH did for our office has been flawless for 2 years. Zero downtime, excellent ongoing support, and very competitive pricing.',
  },
  {
    name: 'Meena Gopal',
    role: 'Operations, Shahi Exports',
    initials: 'MG',
    colorFrom: '#5b21b6',
    colorTo: '#c084fc',
    rating: 5,
    text: "Our 50-workstation office runs smoothly thanks to SAI INFOTECH's preventive maintenance program. They proactively identify issues before they become problems. Exceptional service!",
  },
  {
    name: 'Suresh Babu',
    role: 'CEO, Suprawin Technologies',
    initials: 'SB',
    colorFrom: '#0369a1',
    colorTo: '#38bdf8',
    rating: 5,
    text: 'I brought in 3 laptops written off by other shops, and SAI INFOTECH repaired all of them at chip level. Saved us significant hardware budget. True experts in their field.',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const go = (idx) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
  }
  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % testimonials.length)
  }

  const t = testimonials[current]

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section id="testimonials" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
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
          <p className="text-slate-400 mt-6 max-w-xl mx-auto text-sm sm:text-base">
            Real feedback from real clients. Our track record speaks for itself.
          </p>
        </motion.div>

        {/* Main Carousel Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-10"
        >
          <div
            className="relative glass rounded-3xl border border-white/8 overflow-hidden"
            style={{ boxShadow: '0 24px 80px rgba(37,99,235,0.1), 0 0 0 1px rgba(255,255,255,0.03)' }}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

            <div className="p-8 sm:p-12 relative">
              <FaQuoteLeft
                className="absolute top-8 right-8 sm:top-12 sm:right-12 opacity-10"
                style={{ color: '#06b6d4', fontSize: 56 }}
              />

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: 'easeInOut' }}
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FiStar
                        key={i}
                        size={20}
                        fill="#facc15"
                        color="#facc15"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(250,204,21,0.6))' }}
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-8 italic relative z-10">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${t.colorFrom}, ${t.colorTo})`,
                        boxShadow: `0 0 20px ${t.colorTo}50`,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-base">{t.name}</div>
                      <div className="text-slate-400 text-sm mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prev}
              className="w-11 h-11 glass rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 transition-all duration-200"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    background: i === current
                      ? 'linear-gradient(90deg, #2563eb, #06b6d4)'
                      : 'rgba(255,255,255,0.15)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-11 h-11 glass rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500/40 transition-all duration-200"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        {/* Mini avatar cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {testimonials.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.07 }}
              onClick={() => go(i)}
              className="glass rounded-2xl p-4 border text-left transition-all duration-300"
              style={{
                borderColor: i === current ? 'rgba(59,130,246,0.5)' : 'rgba(255,255,255,0.07)',
                background: i === current ? 'rgba(59,130,246,0.07)' : 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${item.colorFrom}, ${item.colorTo})` }}
                >
                  {item.initials}
                </div>
                <div className="text-slate-300 text-xs font-medium truncate">{item.name}</div>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, j) => (
                  <FiStar key={j} size={10} fill="#facc15" color="#facc15" />
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
