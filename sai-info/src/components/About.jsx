import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FiAward, FiCheckCircle, FiShield } from 'react-icons/fi'

const mvvSections = [
  {
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    desc: 'Deliver reliable and innovative IT solutions that empower businesses to grow and succeed.',
  },
  {
    icon: '/icons/icons8-vision-24.png',
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    desc: 'To be a trusted leader in IT services, known for excellence, innovation, and integrity.',
  },
  {
    icon: '/icons/icons8-values-50.png',
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    desc: 'Integrity, innovation, customer focus, and commitment to excellence drive everything we do.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

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
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">About Us</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            Trusted IT Solutions for
            <span className="text-gradient block">Modern Businesses</span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            We provide end-to-end IT infrastructure, networking, surveillance, cloud, and enterprise solutions with 25+ years of trusted expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* ── LEFT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >

            {/* Why Choose Us */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <FiAward className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold">Why Choose Us</h3>
                  <p className="text-slate-400 text-sm">Excellence in every solution</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  'Certified & experienced technical team',
                  'Advanced infrastructure & tools',
                  'Enterprise-grade service quality',
                  'Fast response & support',
                  'Client satisfaction is our priority',
                ].map((point, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="text-blue-400 text-sm" />
                    </div>
                    <span className="text-slate-300">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mission Vision Values */}
            <div className="glass rounded-3xl p-6 border border-white/10">
              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">What Drives Us</p>
              <h4 className="text-white font-bold text-xl mb-6">
                Mission, Vision & <span className="text-gradient">Values</span>
              </h4>

              <div className="grid grid-cols-3 gap-4">
                {mvvSections.map((sec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="glass rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center gap-3"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center shadow-lg`}>
                      <img src={sec.icon} alt={sec.title} className="w-7 h-7 object-contain brightness-0 invert" />
                    </div>
                    <h5 className="text-white font-bold text-sm">{sec.title}</h5>
                    <div className={`w-8 h-0.5 bg-gradient-to-r ${sec.color} rounded-full`} />
                    <p className="text-slate-400 text-xs leading-relaxed">{sec.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-6"
          >

            {/* Quality Assurance Card */}
            <div className="glass rounded-3xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                  <FiShield className="text-blue-400 text-xl" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-bold">Quality Assurance</h3>
                  <p className="text-slate-400 text-sm">Committed to the highest standards</p>
                </div>
              </div>

              {/* ISO Badge */}
              <div className="glass rounded-2xl border border-blue-500/20 p-6 mb-6 flex items-center gap-6">
                <div className="flex-shrink-0 w-24 h-24 relative flex items-center justify-center">
                  {/* Glowing ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-70"
                    style={{ boxShadow: '0 0 20px rgba(6,182,212,0.6), 0 0 40px rgba(6,182,212,0.3)' }} />
                  <div className="text-center">
                    <p className="text-cyan-400 text-[9px] font-bold tracking-widest uppercase">Certified</p>
                    <p className="text-white text-lg font-black leading-none">ISO</p>
                    <p className="text-white text-[10px] font-bold">9001:2015</p>
                    <div className="flex justify-center mt-1">
                      <FiCheckCircle className="text-cyan-400" size={14} />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white text-2xl font-black">ISO 9001:2015</h4>
                  <p className="text-blue-400 text-xl font-bold">Certified</p>
                  <p className="text-slate-400 text-sm mt-1">Quality Management System</p>
                </div>
              </div>

              {/* Divider with dot */}
              <div className="relative flex items-center mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-blue-400 mx-3" />
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                SAI INFOTECH is officially certified under the{' '}
                <span className="text-blue-400 font-semibold">ISO 9001:2015 Quality Management System</span>,
                reflecting our commitment to consistent, world-class IT service delivery.
              </p>

              {/* Divider with dot */}
              <div className="relative flex items-center mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <div className="w-2 h-2 rounded-full bg-blue-400 mx-3" />
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                This international certification confirms that SAI INFOTECH meets rigorous quality management standards — ensuring every client receives reliable, high-quality computer hardware services backed by a globally recognised quality framework.
              </p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}