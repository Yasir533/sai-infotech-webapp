import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

import {
  FiAward,
  FiCheckCircle,
  FiX,
} from 'react-icons/fi'

const highlights = [
  {
    icon: '/icons/icons8-experience-50.png',
    label: 'Experience',
    value: '25+ Years',
  },
  {
    icon: '/icons/icons8-tick-50.png',
    label: 'Success Rate',
    value: '100%',
  },
  {
    icon: '/icons/icons8-happy-50.png',
    label: 'Happy Clients',
    value: '100+',
  },
  {
    icon: '/icons/icons8-certified-50.png',
    label: 'Quality',
    value: 'ISO Certified',
  },
]

const mvvSections = [
  {
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.18)',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    icon: '/icons/icons8-vision-24.png',
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.18)',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    icon: '/icons/icons8-values-50.png',
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.18)',
    points: [
      'Honesty — Transparent in every interaction',
      'Teamwork — Collaborative approach to solutions',
      'Efficiency — Smart solutions that save time & cost',
    ],
  },
]

const serviceModes = [
  { label: 'Drop-off', desc: 'Walk in anytime' },
  { label: 'Walk-in', desc: 'No appointment needed' },
  { label: 'On-site', desc: 'We come to you' },
  { label: 'Pickup', desc: 'Doorstep collection' },
]

export default function About() {

  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  // ✅ FIXED: Use click-only state, no hover timeout logic
  const [activeMVV, setActiveMVV] = useState(null)

  return (

    <section id="about" className="section-pad relative">

      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >

          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Us
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Trusted IT Solutions for
            <span className="text-gradient block">
              Modern Businesses
            </span>
          </h2>

          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            We provide end-to-end IT infrastructure, networking,
            surveillance, cloud, and enterprise solutions with
            25+ years of trusted expertise.
          </p>

        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >

            <div className="glass rounded-3xl p-8 border border-white/10">

              <div className="flex items-center gap-3 mb-5">

                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <FiAward className="text-blue-400 text-xl" />
                </div>

                <div>
                  <h3 className="text-white text-2xl font-bold">
                    Why Choose Us
                  </h3>

                  <p className="text-slate-400 text-sm">
                    Excellence in every solution
                  </p>
                </div>

              </div>

              <div className="space-y-4">

                {[
                  'Certified & experienced technical team',
                  'Advanced infrastructure & tools',
                  'Enterprise-grade service quality',
                  'Fast response & support',
                ].map((point, i) => (

                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + i * 0.1,
                    }}
                    className="flex items-center gap-3"
                  >

                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <FiCheckCircle className="text-blue-400 text-sm" />
                    </div>

                    <span className="text-slate-300">
                      {point}
                    </span>

                  </motion.div>

                ))}

              </div>

            </div>

            {/* Service Modes */}
            <div className="grid grid-cols-2 gap-4">

              {serviceModes.map((mode, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.4 + i * 0.1,
                  }}
                  className="glass rounded-2xl p-4 border border-white/10"
                >

                  <div className="w-2 h-2 rounded-full bg-blue-400 mb-3" />

                  <h4 className="text-white font-semibold">
                    {mode.label}
                  </h4>

                  <p className="text-slate-500 text-sm">
                    {mode.desc}
                  </p>

                </motion.div>

              ))}

            </div>

          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-6">

              {highlights.map((item, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.1,
                  }}
                  className="glass rounded-3xl p-6 border border-white/10 text-center"
                >

                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4">

                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-6 h-6 object-contain"
                    />

                  </div>

                  <div className="text-2xl font-black text-gradient mb-1">
                    {item.value}
                  </div>

                  <div className="text-slate-500 text-sm">
                    {item.label}
                  </div>

                </motion.div>

              ))}

            </div>

            {/* Mission Vision Values */}
            <div className="glass rounded-3xl p-6 border border-white/10">

              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">
                What Drives Us
              </p>

              <h4 className="text-white font-bold text-lg mb-4">
                Mission, Vision &{' '}
                <span className="text-gradient">
                  Values
                </span>
              </h4>

              <div className="flex justify-around">

                {mvvSections.map((sec, i) => (

                  // ✅ FIXED: onClick only — removed onMouseEnter and onMouseLeave entirely
                  <button
                    key={i}
                    onClick={() => setActiveMVV(sec)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >

                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center shadow-lg `}
                    >

                      <img
                        src={sec.icon}
                        alt={sec.title}
                        className="w-7 h-7 object-contain brightness-0 invert"
                      />

                    </div>

                    <span className="text-slate-400 text-xs font-semibold ">
                      {sec.title}
                    </span>

                  </button>

                ))}

              </div>

            </div>

          </motion.div>

        </div>

      </div>

      {/* Modal — ✅ FIXED: Only opens on click, closes on X button or backdrop click */}
      <AnimatePresence>

        {activeMVV && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            // ✅ Click backdrop to close
            onClick={() => setActiveMVV(null)}
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 20,
              }}
              transition={{ duration: 0.25 }}
              className="relative bg-[#06111f] border border-white/10 rounded-2xl p-8 w-[400px] max-w-[90vw]"
              style={{
                boxShadow: `0 0 40px ${activeMVV.glow}`,
              }}
              // ✅ Prevent backdrop click from firing when clicking inside modal
              onClick={(e) => e.stopPropagation()}
            >

              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setActiveMVV(null)}
              >
                <FiX size={20} />
              </button>

              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeMVV.color} flex items-center justify-center mb-5 shadow-lg`}
              >

                <img
                  src={activeMVV.icon}
                  alt={activeMVV.title}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />

              </div>

              <h3 className="text-2xl font-bold text-white mb-5">
                {activeMVV.title}
              </h3>

              <div
                className={`w-full h-px bg-gradient-to-r ${activeMVV.color} opacity-30 mb-5`}
              />

              <ul className="space-y-3">

                {activeMVV.points.map((point, j) => (

                  <li
                    key={j}
                    className="flex items-start gap-3"
                  >

                    <div
                      className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${activeMVV.color} mt-2 flex-shrink-0`}
                    />

                    <span className="text-slate-300 text-sm">
                      {point}
                    </span>

                  </li>

                ))}

              </ul>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  )
}