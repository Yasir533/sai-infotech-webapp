import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import missionIcon from '../icons/icons8-mission-50.png'
import visionIcon from '../icons/icons8-vision-24.png'
import valuesIcon from '../icons/icons8-values-50.png'

const sections = [
  {
    icon: missionIcon,
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.12)',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    icon: visionIcon,
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.12)',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    icon: valuesIcon,
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.12)',
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

      {/* Soft Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-indigo-600/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >

          <span className="text-blue-400 text-sm font-semibold tracking-[0.2em] uppercase">
            What Drives Us
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4 leading-tight">
            Mission, Vision &{' '}
            <span className="text-cyan-400">
              Values
            </span>
          </h2>

          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {sections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.15,
              }}
              className="glass rounded-3xl border border-white/10 overflow-hidden"
              style={{
                boxShadow: `0 12px 40px ${sec.glow}`,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))'
              }}
            >

              {/* Top Line */}
              <div
                className={`h-2 bg-gradient-to-r ${sec.color} rounded-b-xl`}
                style={{ opacity: 0.98 }}
              />

              <div className="p-8">

                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-6`}
                  style={{ boxShadow: `0 8px 30px ${sec.glow}` }}
                >

                  <img
                    src={sec.icon}
                    alt={sec.title}
                    className="w-9 h-9 object-contain brightness-0 invert"
                  />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-3">
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
                        duration: 0.35,
                        delay:
                          0.25 +
                          i * 0.12 +
                          j * 0.07,
                      }}
                      className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                    >

                        <div
                          className={`w-2 h-2 rounded-full bg-gradient-to-br ${sec.color} mt-2 flex-shrink-0`}
                        />

                      <span>
                        {point}
                      </span>

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