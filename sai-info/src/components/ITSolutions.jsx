import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  FiMonitor, FiShield, FiDownload,
  FiAlertTriangle, FiWifi, FiCloud, FiTool,
} from 'react-icons/fi'

const solutions = [
  { icon: FiMonitor, title: 'POS Systems', desc: 'Point-of-sale system setup, configuration & maintenance' },
  { icon: FiShield, title: 'Routers & Firewalls', desc: 'Enterprise-grade network security infrastructure' },
  { icon: FiDownload, title: 'Software Installation', desc: 'OS, applications & driver installation & licensing' },
  { icon: FiAlertTriangle, title: 'Virus Removal', desc: 'Complete malware, ransomware & virus elimination' },
  { icon: FiWifi, title: 'Wireless LAN', desc: 'WiFi planning, installation & optimization for offices' },
  { icon: FiCloud, title: 'Remote Support', desc: 'Instant remote desktop support without travel delays' },
  { icon: FiTool, title: 'Preventive Maintenance', desc: 'Scheduled maintenance to prevent costly downtime' },
]

export default function ITSolutions() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="it-solutions" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/5 rounded-full blur-[120px]" />
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
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Enterprise Ready</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            IT <span className="text-gradient">Solutions</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-xl mx-auto">
            Comprehensive IT solutions designed to keep your business running smoothly and securely.
          </p>
        </motion.div>

        {/* Solutions grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              
              className="glass rounded-3xl p-7 border border-white/8 hover:border-blue-500/25 group transition-all duration-300 cursor-default"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-500/20 border border-blue-500/20 flex items-center justify-center flex-shrink-0 ">
                  <sol.icon className="text-blue-400 " size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2 ">{sol.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{sol.desc}</p>
                </div>
              </div>
              <div className="mt-6 h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-blue-600/0  rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 glass rounded-3xl border border-blue-500/15 p-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-500/5 to-blue-600/5" />
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Need a Custom IT Solution?</h3>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
              Our team of experts is ready to design a tailored IT solution for your business needs.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="#contact" className="btn-primary px-8 py-4 rounded-2xl font-semibold text-white text-base">
                <span>Contact Our Team</span>
              </a>
              <a
                href="tel:+918310338544"
                className="px-8 py-4 rounded-2xl font-semibold glass border border-white/10 text-white hover:border-blue-500/40 transition-all text-base"
              >
                +91 83 10 33 85 44
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}