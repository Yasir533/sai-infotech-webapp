import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FiAward, FiCheckCircle, FiShield, FiX } from 'react-icons/fi'

const mvvSections = [
  {
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.25)',
    desc: 'Deliver reliable and innovative IT solutions that empower businesses to grow and succeed.',
  },
  {
    icon: '/icons/icons8-vision-24.png',
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.25)',
    desc: 'To be a trusted leader in IT services, known for excellence, innovation, and integrity.',
  },
  {
    icon: '/icons/icons8-values-50.png',
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.25)',
    desc: 'Integrity, innovation, customer focus, and commitment to excellence drive everything we do.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [activeMVV, setActiveMVV] = useState(null)

  return (
    <section id="about" className="section-pad relative">
      <div id="certificate" />
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
    About
    <span className="text-gradient block">Sai Infotech</span>
  </h2>

  <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
    Delivering innovative IT solutions, infrastructure services,
    networking, surveillance systems, and managed technology support
    with a commitment to quality, reliability, and customer success.
  </p>
</motion.div>

{/* ================= ROW 1 ================= */}
<div className="grid lg:grid-cols-2 gap-10 items-center mb-12">

  {/* About Image */}
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <img
      src={aboutImg}
      alt="About Sai Infotech"
      className="w-full rounded-3xl border border-white/10 shadow-2xl"
    />
  </motion.div>

  {/* About Content */}
  <motion.div
    initial={{ opacity: 0, x: 100 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="glass rounded-3xl p-8 border border-white/10"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
        <FiAward className="text-blue-400 text-xl" />
      </div>

      <div>
        <h3 className="text-white text-2xl font-bold">
          About Sai Infotech
        </h3>
        <p className="text-slate-400 text-sm">
          Your Trusted Technology Partner
        </p>
      </div>
    </div>

    <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
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

{/* ================= ROW 2 ================= */}
<div className="grid lg:grid-cols-2 gap-10">

  {/* Mission Vision Values */}
  <div className="glass rounded-3xl p-6 border border-white/10">
    <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mb-1">
      What Drives Us
    </p>

    <h4 className="text-white font-bold text-xl mb-6">
      Mission, Vision & <span className="text-gradient">Values</span>
    </h4>

    <div className="grid grid-cols-3 gap-4">
      {mvvSections.map((sec, i) => (
        <motion.button
          key={i}
          onClick={() => setActiveMVV(sec)}
          className="glass rounded-2xl p-4 border border-white/10 flex flex-col items-center text-center gap-3 hover:border-blue-500/40 transition-all"
        >
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center`}
          >
            <img
              src={sec.icon}
              alt={sec.title}
              className="w-7 h-7 object-contain brightness-0 invert"
            />
          </div>

          <h5 className="text-white font-bold text-sm">
            {sec.title}
          </h5>
        </motion.button>
      ))}
    </div>
  </div>

          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
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
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-400 opacity-80"
                    style={{ boxShadow: '0 0 20px rgba(6,182,212,0.7), 0 0 50px rgba(6,182,212,0.3)' }} />
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

    <p className="text-slate-300 text-sm leading-relaxed mb-4">
      SAI INFOTECH is officially certified under the ISO 9001:2015 Quality
      Management System, reflecting our commitment to world-class IT services.
    </p>

    <p className="text-slate-300 text-sm leading-relaxed">
      This certification demonstrates our dedication to quality,
      reliability, customer satisfaction, and continuous improvement.
    </p>
  </motion.div>

</div>

      <AnimatePresence>
        {activeMVV && (
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
                className="relative rounded-2xl p-6 w-[440px] max-w-[95vw] glass border"
                style={{ boxShadow: `0 16px 60px ${activeMVV.glow}`, borderColor:'rgba(255,255,255,0.06)' }}
                onClick={(e) => e.stopPropagation()}
              >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setActiveMVV(null)}
              >
                <FiX size={20} />
              </button>

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${activeMVV.color} flex items-center justify-center mb-4`} style={{ boxShadow: `0 10px 30px ${activeMVV.glow}` }}>
                <img src={activeMVV.icon} alt={activeMVV.title} className="w-8 h-8 object-contain" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{activeMVV.title}</h3>
              <div className={`w-full h-px bg-gradient-to-r ${activeMVV.color} opacity-60 mb-4`} />
              <p className="text-slate-300 text-sm leading-relaxed">{activeMVV.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}