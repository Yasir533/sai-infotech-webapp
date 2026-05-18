import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import missionIcon from '../icons/icons8-mission-50.png'
import visionIcon from '../icons/icons8-vision-24.png'
import valuesIcon from '../icons/icons8-values-50.png'

const sections = [
  {
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.2)',
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
    glow: 'rgba(6,182,212,0.2)',
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
    glow: 'rgba(99,102,241,0.2)',
    points: [
      'Honesty — Transparent in every interaction',
      'Teamwork — Collaborative approach to solutions',
      'Efficiency — Smart solutions that save time & cost',
    ],
  },
]
export default function MissionVisionValues() {
  const ref = useRef(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px',
  })

  return (
    <section
      id="mission"
      className="section-pad relative overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-indigo-600/5 rounded-full blur-[150px]" />
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
            What Drives Us
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Mission, Vision &{' '}
            <span className="text-gradient">Values</span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
              }}
              whileHover={{ y: -8 }}
              className="glass rounded-3xl border border-white/8 overflow-hidden hover:border-blue-500/20 transition-all duration-300 group"
              style={{
                boxShadow: `0 20px 60px ${sec.glow}`,
              }}
            >

              {/* Top Gradient Line */}
              <div
                className={`h-1.5 bg-gradient-to-r ${sec.color}`}
              />

              <div className="p-8">

                {/* Custom PNG Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <img
                    src={sec.icon}
                    alt={sec.title}
                    className="w-10 h-10 object-contain brightness-0 invert"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-6">
                  {sec.title}
                </h3>

                {/* Points */}
                <ul className="space-y-3">

                  {sec.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        inView
                          ? { opacity: 1, x: 0 }
                          : {}
                      }
                      transition={{
                        duration: 0.4,
                        delay:
                          0.3 +
                          i * 0.1 +
                          j * 0.08,
                      }}
                      className="flex items-start gap-3 text-slate-400 text-sm"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${sec.color} mt-2 flex-shrink-0`}
                      />

                      {point}
                    </motion.li>
                  ))}

                </ul>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}