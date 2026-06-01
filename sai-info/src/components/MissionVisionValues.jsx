import React, { useRef, useState } from 'react'
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

// Defined OUTSIDE the parent component to avoid stale closures
function HoverDetails({ sections, hoverIdx }) {
  const sec = typeof hoverIdx === 'number' ? sections[hoverIdx] : null

  return (
    <div className="hidden lg:block w-80 flex-shrink-0">
      <div
        className="glass rounded-3xl p-6 border border-white/8 transition-all duration-300"
        style={{ boxShadow: `0 12px 40px ${sec ? sec.glow : 'rgba(0,0,0,0.06)'}` }}
      >
        {sec ? (
          <>
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-4`}
              style={{ boxShadow: `0 8px 30px ${sec.glow}` }}
            >
              <img src={sec.icon} alt={sec.title} className="w-8 h-8 object-contain brightness-0 invert" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{sec.title}</h3>
            <ul className="space-y-3">
              {sec.points.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: 'linear-gradient(135deg, rgba(14,165,233,1), rgba(99,102,241,1))' }}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p className="text-slate-400 text-sm">Hover a card to see details</p>
        )}
      </div>
    </div>
  )
}

export default function MissionVisionValues() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  // null = no card hovered, 0/1/2 = index of hovered card
  const [hoverIdx, setHoverIdx] = useState(null)

  return (
    <section id="mission" className="section-pad relative overflow-hidden">

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
            <span className="text-cyan-400">Values</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Layout: detail panel left, cards right */}
        <div className="lg:flex lg:items-start lg:gap-8">

          {/* Pass hoverIdx as a prop — no stale closure */}
          <HoverDetails sections={sections} hoverIdx={hoverIdx} />

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-7 flex-1">
            {sections.map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.15 }}
                className="glass rounded-3xl border border-white/10 overflow-hidden cursor-pointer"
                style={{
                  boxShadow: `0 12px 40px ${sec.glow}`,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                tabIndex={0}
              >
                {/* Top accent line */}
                <div className={`h-2 bg-gradient-to-r ${sec.color} rounded-b-xl`} style={{ opacity: 0.98 }} />

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-6`}
                    style={{ boxShadow: `0 8px 30px ${sec.glow}` }}
                  >
                    <img src={sec.icon} alt={sec.title} className="w-9 h-9 object-contain brightness-0 invert" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-3">{sec.title}</h3>

                  {/* Points */}
                  <ul className="space-y-3">
                    {sec.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.35, delay: 0.25 + i * 0.12 + j * 0.07 }}
                        className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${sec.color} mt-2 flex-shrink-0`} />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}