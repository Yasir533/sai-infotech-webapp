import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward } from 'react-icons/fi'

import isoBadge from '../assets/iso-seal.png'
import qualityVeritas from '../assets/quality-veritas.png'

const mvvSections = [
  {
    id: 'mission',
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.45)',
    bg: 'rgba(30, 64, 175, 0.35)',
    border: 'rgba(96,165,250,0.7)',
    divider: 'rgba(96,165,250,0.5)',
    dotFrom: '#60a5fa',
    dotTo: '#93c5fd',
    desc: 'Deliver reliable and innovative IT solutions that empower businesses to grow and succeed.',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    id: 'vision',
    icon: '/icons/icons8-vision-24.png',
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.45)',
    bg: 'rgba(8, 145, 178, 0.30)',
    border: 'rgba(34,211,238,0.7)',
    divider: 'rgba(34,211,238,0.5)',
    dotFrom: '#22d3ee',
    dotTo: '#67e8f9',
    desc: 'To be a trusted leader in IT services, known for excellence, innovation, and integrity.',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    id: 'values',
    icon: '/icons/icons8-values-50.png',
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.45)',
    bg: 'rgba(79, 70, 229, 0.30)',
    border: 'rgba(167,139,250,0.7)',
    divider: 'rgba(167,139,250,0.5)',
    dotFrom: '#a78bfa',
    dotTo: '#c4b5fd',
    desc: 'Integrity, innovation, customer focus, and commitment to excellence drive everything we do.',
    points: [
      'Honesty — Transparent in every interaction',
      'Teamwork — Collaborative approach to solutions',
      'Efficiency — Smart solutions that save time & cost',
    ],
  },
]

export default function About() {
  const [hoveredMVV, setHoveredMVV] = useState(null)

  // Use hovered item if available, otherwise default to Mission when not hovered (to avoid blank layout spaces)
  const activeMVV = hoveredMVV || mvvSections[0]

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Us
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            About <span className="text-gradient">Sai Infotech</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mt-4" />
        </motion.div>

        {/* ================= ROW 1: ABOUT US IMAGE & CONTENT ================= */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* About Image - Bounded side-by-side view */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative group flex justify-center"
          >
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
            <img
              src="/about.jpeg"
              alt="About Sai Infotech"
              className="w-full max-w-[480px] max-h-[340px] md:max-h-[385px] object-cover rounded-3xl border border-white/10 shadow-2xl relative z-10 hover:border-blue-500/30 transition-all duration-500"
            />
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 sm:p-10 border border-white/10 shadow-xl relative"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                <FiAward className="text-blue-400 text-xl" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-bold">About Sai Infotech</h3>
                <p className="text-slate-400 text-sm">Your Trusted Technology Partner</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                Sai Infotech is a leading IT solutions and technology services company
                based in Bangalore, committed to delivering innovative, reliable, and
                cost-effective technology solutions.
              </p>
              <p>
                We specialize in component-level refurbishing, IT asset management,
                networking solutions, CCTV surveillance, AV solutions, cloud solutions,
                and managed IT services.
              </p>
              <p>
                Our experienced team delivers customized solutions that improve
                productivity, security, and operational efficiency.
              </p>
              <p>
                As an ISO 9001:2015 Certified Company, we maintain the highest
                standards of quality and customer satisfaction.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ================= ROW 2: SPLIT MVV & CERTIFICATE ================= */}
        {/* Align items-start to prevent columns stretching and creating empty space */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* LEFT COLUMN: Mission Vision Values with interactive hover */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between"
          >
            <div>
              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">
                What Drives Us
              </p>
              <h4 className="text-white font-bold text-2xl mb-6">
                Mission, Vision & <span className="text-gradient">Values</span>
              </h4>

              {/* Buttons Grid */}
              <div className="grid grid-cols-3 gap-3">
                {mvvSections.map((sec) => {
                  const isActive = hoveredMVV?.id === sec.id
                  return (
                    <div
                      key={sec.id}
                      onMouseEnter={() => setHoveredMVV(sec)}
                      onMouseLeave={() => setHoveredMVV(null)}
                      className={`glass rounded-2xl p-3 sm:p-4 border cursor-pointer flex flex-col items-center text-center gap-3 transition-all duration-300 ${
                        isActive
                          ? 'border-blue-500/50 bg-blue-500/10 shadow-lg scale-105'
                          : 'border-white/10 hover:border-blue-500/30'
                      }`}
                      style={{
                        boxShadow: isActive ? `0 8px 24px ${sec.glow}` : 'none',
                      }}
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sec.color} flex items-center justify-center`}
                      >
                        <img
                          src={sec.icon}
                          alt={sec.title}
                          className="w-6 h-6 object-contain brightness-0 invert"
                        />
                      </div>
                      <h5 className="text-white font-bold text-xs sm:text-sm">
                        {sec.title.split(' ')[1]}
                      </h5>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Hover Detail Panel - Shows details only on hover and collapses to 0 height when not hovered */}
            <AnimatePresence>
              {hoveredMVV && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="w-full overflow-hidden"
                >
                  <div
                    className="w-full p-5 rounded-2xl flex flex-col justify-center"
                    style={{
                      background: hoveredMVV.bg,
                      border: `1.5px solid ${hoveredMVV.border}`,
                      boxShadow: `0 8px 32px ${hoveredMVV.glow}, inset 0 1px 0 rgba(255,255,255,0.07)`,
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ background: `linear-gradient(135deg, ${hoveredMVV.dotFrom}, ${hoveredMVV.dotTo})` }}
                      />
                      <h4 className="text-white text-base font-bold tracking-wide">{hoveredMVV.title}</h4>
                    </div>
                    <p className="text-white text-xs sm:text-sm leading-relaxed mb-3 font-medium">
                      {hoveredMVV.desc}
                    </p>
                    <div
                      className="h-px w-full mb-3"
                      style={{ background: `linear-gradient(to right, ${hoveredMVV.divider}, transparent)` }}
                    />
                    <ul className="space-y-2">
                      {hoveredMVV.points.map((pt, index) => (
                        <li key={index} className="flex items-start gap-2 text-white text-xs sm:text-sm leading-relaxed font-medium">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                            style={{ background: `linear-gradient(135deg, ${hoveredMVV.dotFrom}, ${hoveredMVV.dotTo})` }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* RIGHT COLUMN: ISO Certification Section */}
          <motion.div
            id="certificate"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              {/* Header with Bureau Veritas logo */}
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={qualityVeritas}
                  alt="Quality Veritas Logo"
                  className="w-12 h-12 rounded-xl object-contain bg-white p-0.5 shadow-md flex-shrink-0"
                />
                <div>
                  <h3 className="text-white text-2xl font-bold">Quality Assurance</h3>
                  <p className="text-slate-400 text-sm">Committed to the highest standards</p>
                </div>
              </div>

              {/* Glowing Badge with ISO badge logo (iso-seal.png) - round seal */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6 mb-6 flex items-center gap-6">
                <div className="flex-shrink-0 w-24 h-24 relative flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-80"
                    style={{ boxShadow: '0 0 20px rgba(6,182,212,0.7), 0 0 50px rgba(6,182,212,0.3)' }}
                  />
                  <img
                    src={isoBadge}
                    alt="ISO Certification Badge"
                    className="w-20 h-20 object-contain relative z-10 rounded-full shadow-inner"
                  />
                </div>
                <div>
                  <h4 className="text-white text-2xl font-black">ISO 9001:2015</h4>
                  <p className="text-blue-400 text-xl font-bold">Certified</p>
                  <p className="text-slate-400 text-sm mt-1">Quality Management System</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                SAI INFOTECH is officially certified under the ISO 9001:2015 Quality
                Management System, reflecting our commitment to world-class IT services.
              </p>

              <p className="text-slate-300 text-sm leading-relaxed">
                This certification demonstrates our dedication to quality,
                reliability, customer satisfaction, and continuous improvement.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}