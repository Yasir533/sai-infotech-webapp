import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiTarget, FiEye, FiHeart, FiX } from 'react-icons/fi'

const highlights = [
  { icon: '/icons/icons8-experience-50.png', label: 'Experience', value: '25+ Years' },
  { icon: '/icons/icons8-tick-50.png', label: 'Success Rate', value: '100%' },
  { icon: '/icons/icons8-happy-50.png', label: 'Happy Clients', value: '100+' },
  { icon: '/icons/icons8-certified-50.png', label: 'Quality', value: 'ISO Certified' },
]

const mvvSections = [
  {
    icon: FiTarget,
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.25)',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    icon: FiEye,
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.25)',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    icon: FiHeart,
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.25)',
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
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeMVV, setActiveMVV] = useState(null)

  return (
    <section id="about" className="section-pad relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Who We Are</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            About <span className="text-gradient">SAI INFOTECH</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass rounded-3xl p-8 border border-white/8 mb-8">
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                <span className="text-blue-400 font-semibold">SAI INFOTECH</span> is a premier computer refurbishing, service, sales, and networking company headquartered in Bangalore since 2019.
              </p>
              <p className="text-slate-400 leading-relaxed mb-6">
                We offer comprehensive IT services through drop-off, walk-in, on-site, and pickup service modes — designed to maximize convenience for our clients across Bangalore.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our mission is to deliver <span className="text-white font-medium">high-quality IT solutions</span> while maximizing customer satisfaction through innovation, reliability, and technical excellence.
              </p>
            </div>

            {/* Service modes */}
            <div className="grid grid-cols-2 gap-4">
              {serviceModes.map((mode, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="glass rounded-2xl p-4 border border-white/8 hover-card"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mb-3" />
                  <h4 className="text-white font-semibold">{mode.label}</h4>
                  <p className="text-slate-500 text-sm">{mode.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  className="glass rounded-3xl p-6 border border-white/8 hover-card text-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center mx-auto mb-4">
                    <img src={item.icon} alt={item.label} className="w-6 h-6 object-contain" />
                  </div>
                  <div className="text-2xl font-black text-gradient mb-1">{item.value}</div>
                  <div className="text-slate-500 text-sm">{item.label}</div>
                </motion.div>
              ))}
            </div>

            {/* MVV icons inside right column */}
            <div className="glass rounded-3xl p-6 border border-white/8">
              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">What Drives Us</p>
              <h4 className="text-white font-bold text-lg mb-4">Mission, Vision & <span className="text-gradient">Values</span></h4>
              <div className="flex justify-around">
                {mvvSections.map((sec, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMVV(sec)}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                      <sec.icon className="text-white" size={24} />
                    </div>
                    <span className="text-slate-400 text-xs font-semibold group-hover:text-white transition-colors">{sec.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeMVV && (() => {
          const ModalIcon = activeMVV.icon
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveMVV(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.25 }}
                className="relative bg-[#06111f] border border-white/10 rounded-2xl p-8 w-[400px] max-w-[90vw]"
                style={{ boxShadow: `0 0 60px ${activeMVV.glow}` }}
                onClick={e => e.stopPropagation()}
              >
                <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors" onClick={() => setActiveMVV(null)}>
                  <FiX size={20} />
                </button>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeMVV.color} flex items-center justify-center mb-5 shadow-lg`}>
                  <ModalIcon className="text-white" size={26} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-5">{activeMVV.title}</h3>
                <div className={`w-full h-px bg-gradient-to-r ${activeMVV.color} opacity-30 mb-5`} />
                <ul className="space-y-3">
                  {activeMVV.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${activeMVV.color} mt-2 flex-shrink-0`} />
                      <span className="text-slate-300 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </section>
  )
}
