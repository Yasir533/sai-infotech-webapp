import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Certificate() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certificate" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Quality Assurance</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-2">
            ISO 9001:2015 <span className="text-gradient">Certified</span>
          </h2>
          <p className="text-slate-300 text-lg font-semibold mt-2 mb-5">Quality Management System</p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Text content card only */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass rounded-3xl border border-white/8 overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(37,99,235,0.1)' }}
        >
          <div className="h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-500" />

          <div className="p-8 sm:p-12 space-y-5">
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              SAI INFOTECH is officially certified under the{' '}
              <span className="text-white font-semibold">ISO 9001:2015 Quality Management System</span>, reflecting our
              commitment to consistent, world-class IT service delivery.
            </p>
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              This international certification confirms that SAI INFOTECH meets rigorous quality management
              standards — ensuring every client receives reliable, high-quality computer hardware services
              backed by a globally recognised quality framework.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
