import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

import missionIcon from '../icons/icons8-mission-50.png'
import visionIcon from '../icons/icons8-vision-24.png'
import valuesIcon from '../icons/icons8-values-50.png'

const sections = [
  {
    icon: missionIcon,
    title: 'Our Mission',
    summary: 'Deliver reliable and innovative IT solutions that empower businesses to grow and succeed.',
    color: 'from-blue-600 to-blue-400',
    borderColor: 'rgba(37,99,235,0.65)',
    bgCard: 'rgba(8, 20, 55, 0.92)',
    bgPanel: 'rgba(6, 16, 48, 0.97)',
    glow: 'rgba(37,99,235,0.22)',
    dotFrom: '#2563eb',
    dotTo: '#60a5fa',
    accentBar: 'linear-gradient(90deg,#1d4ed8,#60a5fa)',
    dividerColor: 'rgba(37,99,235,0.4)',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    icon: visionIcon,
    title: 'Our Vision',
    summary: 'To be a trusted leader in IT services, known for excellence, innovation, and integrity.',
    color: 'from-cyan-500 to-cyan-300',
    borderColor: 'rgba(6,182,212,0.65)',
    bgCard: 'rgba(3, 24, 38, 0.92)',
    bgPanel: 'rgba(2, 20, 32, 0.97)',
    glow: 'rgba(6,182,212,0.22)',
    dotFrom: '#0891b2',
    dotTo: '#22d3ee',
    accentBar: 'linear-gradient(90deg,#0891b2,#22d3ee)',
    dividerColor: 'rgba(6,182,212,0.4)',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    icon: valuesIcon,
    title: 'Our Values',
    summary: 'Integrity, innovation, customer focus, and commitment to excellence drive everything we do.',
    color: 'from-indigo-500 to-violet-400',
    borderColor: 'rgba(99,102,241,0.65)',
    bgCard: 'rgba(14, 8, 50, 0.92)',
    bgPanel: 'rgba(11, 6, 44, 0.97)',
    glow: 'rgba(99,102,241,0.22)',
    dotFrom: '#6366f1',
    dotTo: '#a78bfa',
    accentBar: 'linear-gradient(90deg,#4f46e5,#a78bfa)',
    dividerColor: 'rgba(99,102,241,0.4)',
    points: [
      'Honesty — Transparent in every interaction',
      'Teamwork — Collaborative approach to solutions',
      'Efficiency — Smart solutions that save time & cost',
    ],
  },
]

function HoverDetails({ sections, hoverIdx }) {
  const sec = typeof hoverIdx === 'number' ? sections[hoverIdx] : null

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0">
      <div
        className="rounded-3xl p-7 border transition-all duration-300 min-h-[300px] flex flex-col"
        style={{
          background: sec ? sec.bgPanel : 'rgba(12, 18, 38, 0.85)',
          border: `1.5px solid ${sec ? sec.borderColor : 'rgba(255,255,255,0.08)'}`,
          boxShadow: sec
            ? `0 8px 48px ${sec.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`
            : '0 4px 24px rgba(0,0,0,0.4)',
        }}
      >
        <AnimatePresence mode="wait">
          {sec ? (
            <motion.div
              key={hoverIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col flex-1"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-5 flex-shrink-0`}
                style={{ boxShadow: `0 6px 24px ${sec.glow}` }}
              >
                <img src={sec.icon} alt={sec.title} className="w-8 h-8 object-contain brightness-0 invert" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{sec.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">{sec.summary}</p>
              <div className="h-px w-full mb-5" style={{ background: `linear-gradient(to right, ${sec.dividerColor}, transparent)` }} />
              <ul className="space-y-3 flex-1">
                {sec.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-start gap-3 text-slate-200 text-sm leading-relaxed"
                  >
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                      style={{ background: `linear-gradient(135deg, ${sec.dotFrom}, ${sec.dotTo})` }}
                    />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center flex-1 gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-500 text-lg">
                ✦
              </div>
              <p className="text-slate-500 text-sm text-center leading-relaxed">
                Hover a card to<br />explore details
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function MissionVisionValues() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [hoverIdx, setHoverIdx] = useState(null)

  return (
    <section id="mission" className="section-pad relative overflow-hidden">

      {/* Background ambient blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-[520px] h-[280px] bg-blue-700/10 rounded-full blur-[110px]" />
        <div className="absolute top-20 right-1/4 w-[400px] h-[240px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-cyan-600/5 rounded-full blur-[90px]" />
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

        {/* Layout: detail panel + cards */}
        <div className="lg:flex lg:items-start lg:gap-8">

          <HoverDetails sections={sections} hoverIdx={hoverIdx} />

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 flex-1">
            {sections.map((sec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.14 }}
                className="rounded-3xl overflow-hidden cursor-pointer"
                style={{
                  background: sec.bgCard,
                  border: `1.5px solid ${hoverIdx === i ? sec.borderColor : 'rgba(255,255,255,0.09)'}`,
                  boxShadow: hoverIdx === i
                    ? `0 20px 56px ${sec.glow}, inset 0 1px 0 rgba(255,255,255,0.08)`
                    : '0 6px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)',
                  transform: hoverIdx === i ? 'translateY(-5px) scale(1.015)' : 'translateY(0) scale(1)',
                  transition: 'all 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx(null)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                tabIndex={0}
              >
                {/* Coloured top accent bar */}
                <div
                  className="h-1.5 w-full"
                  style={{
                    background: sec.accentBar,
                    opacity: hoverIdx === i ? 1 : 0.75,
                    transition: 'opacity 0.28s',
                  }}
                />

                <div className="p-7">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center mb-5`}
                    style={{ boxShadow: `0 8px 28px ${sec.glow}` }}
                  >
                    <img src={sec.icon} alt={sec.title} className="w-9 h-9 object-contain brightness-0 invert" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">{sec.title}</h3>

                  {/* Summary */}
                  <p className="text-slate-300 text-sm leading-relaxed mb-5">{sec.summary}</p>

                  {/* Divider */}
                  <div
                    className="h-px w-full mb-5"
                    style={{ background: `linear-gradient(to right, ${sec.dividerColor}, transparent)` }}
                  />

                  {/* Bullet points */}
                  <ul className="space-y-3">
                    {sec.points.map((point, j) => (
                      <motion.li
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.32, delay: 0.2 + i * 0.1 + j * 0.07 }}
                        className="flex items-start gap-3 text-slate-200 text-sm leading-relaxed"
                      >
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                          style={{ background: `linear-gradient(135deg, ${sec.dotFrom}, ${sec.dotTo})` }}
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
      </div>
    </section>
  )
}