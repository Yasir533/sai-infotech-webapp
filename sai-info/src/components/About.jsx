import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAward, FiShield, FiX, FiExternalLink } from 'react-icons/fi'

import isoBadge from '../assets/iso-badge.png'
import qualityVeritas from '../assets/quality-veritas.png'
import isoDoc from '../assets/iso-certificate-doc.jpeg'

const mvvSections = [
  {
    id: 'mission',
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.2)',
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
    glow: 'rgba(6,182,212,0.2)',
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
    glow: 'rgba(99,102,241,0.2)',
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
  const [modalOpen, setModalOpen] = useState(false)

  // Use hovered item if available, otherwise default to Mission to keep the section populated without blank space
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
        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          
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
              <div className="grid grid-cols-3 gap-3 mb-4">
                {mvvSections.map((sec) => {
                  const isActive = activeMVV.id === sec.id
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

            {/* Hover Detail Panel - Dynamic Height, Default Populated */}
            <div className="w-full mt-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMVV.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="w-full glass-card p-5 rounded-2xl border border-blue-500/20 bg-slate-950/60 flex flex-col justify-center shadow-lg"
                  style={{
                    boxShadow: `inset 0 0 20px ${activeMVV.glow}`,
                  }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${activeMVV.color}`} />
                    <h4 className="text-white text-base font-bold">{activeMVV.title}</h4>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    {activeMVV.desc}
                  </p>
                  <ul className="space-y-1.5 border-t border-white/5 pt-2">
                    {activeMVV.points.map((pt, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-400 text-xs leading-relaxed">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${activeMVV.color} mt-1.5 flex-shrink-0`} />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
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
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div>
              <p className="text-cyan-400 text-xs font-semibold tracking-widest uppercase mb-1">
                Quality Standard
              </p>
              <h4 className="text-white font-bold text-2xl mb-6">
                ISO Certification
              </h4>

              {/* Brand Logos block - Bureau Veritas & ISO badges rendered in full color */}
              <div className="flex items-center justify-center gap-8 bg-slate-950/40 border border-white/5 rounded-2xl p-4 mb-5">
                <img
                  src={qualityVeritas}
                  alt="Bureau Veritas Logo"
                  className="h-16 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
                <div className="h-12 w-px bg-white/10" />
                <img
                  src={isoBadge}
                  alt="ISO 9001:2015 Certified Logo"
                  className="h-16 w-auto object-contain hover:scale-105 transition-all duration-300"
                />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                SAI INFOTECH is officially certified under the **ISO 9001:2015** Quality
                Management System. This reflects our compliance with international operational standards.
              </p>
            </div>

            {/* Document Preview Card */}
            <div
              onClick={() => setModalOpen(true)}
              className="group cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/30 rounded-2xl p-4 flex items-center justify-between gap-4 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <FiShield className="text-cyan-400 text-lg" />
                </div>
                <div>
                  <h5 className="text-white font-bold text-xs sm:text-sm leading-tight">View Certificate Document</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">Click to preview full document</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                <FiExternalLink size={14} />
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* ================= CERTIFICATE MODAL ================= */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full bg-slate-900 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <FiX size={18} />
              </button>
              
              <img
                src={isoDoc}
                alt="ISO Certificate Document"
                className="w-full max-h-[85vh] object-contain rounded-xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}