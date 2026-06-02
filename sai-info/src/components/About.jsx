import React from 'react'
import { motion } from 'framer-motion'
import { FiAward, FiCheckCircle, FiShield } from 'react-icons/fi'

const mvvSections = [
  {
    icon: '/icons/icons8-mission-50.png',
    title: 'Our Mission',
    color: 'from-blue-600 to-blue-400',
    glow: 'rgba(37,99,235,0.15)',
    desc: 'Deliver reliable and innovative IT solutions that empower businesses to grow and succeed.',
    points: [
      'Deliver innovative, reliable IT solutions to every client',
      'Maintain excellence and trust in every engagement',
      'Stay ahead with cutting-edge technology adoption',
    ],
  },
  {
    icon: '/icons/icons8-vision-24.png',
    title: 'Our Vision',
    color: 'from-cyan-600 to-cyan-400',
    glow: 'rgba(6,182,212,0.15)',
    desc: 'To be a trusted leader in IT services, known for excellence, innovation, and integrity.',
    points: [
      "Be Bangalore's most trusted IT service provider",
      'Build lasting partnerships through quality and integrity',
      'Continuously innovate to lead in a fast-changing industry',
    ],
  },
  {
    icon: '/icons/icons8-values-50.png',
    title: 'Our Values',
    color: 'from-indigo-600 to-violet-400',
    glow: 'rgba(99,102,241,0.15)',
    desc: 'Integrity, innovation, customer focus, and commitment to excellence drive everything we do.',
    points: [
      'Honesty — Transparent in every interaction',
      'Teamwork — Collaborative approach to solutions',
      'Efficiency — Smart solutions that save time & cost',
    ],
  },
]

export default function About() {
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
          className="text-center mb-20"
        >
          <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
            About Us
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            About <span className="text-gradient">Sai Infotech</span>
          </h2>
          <p className="max-w-3xl mx-auto text-slate-400 text-lg leading-relaxed">
            Delivering innovative IT solutions, infrastructure services,
            networking, surveillance systems, and managed technology support
            with a commitment to quality, reliability, and customer success.
          </p>
        </motion.div>

        {/* ================= ABOUT US CONTENT ================= */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-28">
          {/* About Image - Comes from Left */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-blue-500/10 rounded-3xl blur-xl group-hover:bg-blue-500/20 transition-all duration-500" />
            <img
              src="/about.jpeg"
              alt="About Sai Infotech"
              className="w-full rounded-3xl border border-white/10 shadow-2xl relative z-10 hover:border-blue-500/30 transition-all duration-500"
            />
          </motion.div>

          {/* About Content - Comes from Right */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
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

            <div className="space-y-4 text-slate-300 text-base leading-relaxed">
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

        {/* ================= MISSION, VISION & VALUES ================= */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-3">
              What Drives Us
            </p>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
              Mission, Vision & <span className="text-gradient">Values</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full mt-4" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-28">
          {mvvSections.map((sec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass rounded-3xl border border-white/10 p-8 flex flex-col hover:border-blue-500/30 transition-all duration-300 relative group overflow-hidden"
              style={{
                boxShadow: `0 12px 40px ${sec.glow}`,
              }}
            >
              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${sec.color} opacity-85`} />
              
              <div className="mb-6 flex items-center justify-between">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center shadow-lg`} style={{ boxShadow: `0 8px 24px ${sec.glow}` }}>
                  <img
                    src={sec.icon}
                    alt={sec.title}
                    className="w-7 h-7 object-contain brightness-0 invert"
                  />
                </div>
                <span className="text-slate-600/30 text-5xl font-black select-none group-hover:text-blue-500/10 transition-colors duration-300">0{i+1}</span>
              </div>

              <h4 className="text-white text-xl font-bold mb-4">{sec.title}</h4>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">{sec.desc}</p>

              <ul className="space-y-3 mt-auto border-t border-white/5 pt-4">
                {sec.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                    <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${sec.color} mt-1.5 flex-shrink-0`} />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* ================= CERTIFICATE SECTION ================= */}
        {/* Scroll Target with offset */}
        <div id="certificate" className="absolute -mt-24" />

        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-cyan-400 text-sm font-semibold tracking-widest uppercase mb-3">
              Quality Standards
            </p>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
              Our <span className="text-gradient">Certifications</span>
            </h3>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-indigo-500 mx-auto rounded-full mt-4" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="glass rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px]" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px]" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* ISO Badge column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center text-center py-4 border-b lg:border-b-0 lg:border-r border-white/10 lg:pr-8">
              <div className="relative w-36 h-36 flex items-center justify-center mb-6">
                {/* Outer animated rings */}
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30 animate-pulse" />
                <div className="absolute -inset-2 rounded-full border border-cyan-400 opacity-60 animate-spin" style={{ animationDuration: '10s' }} />
                <div className="absolute inset-2 rounded-full border border-dashed border-blue-400 opacity-40 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
                <div className="absolute inset-4 rounded-full bg-slate-900 border border-white/10 shadow-inner flex flex-col items-center justify-center">
                  <p className="text-cyan-400 text-[10px] font-black tracking-widest uppercase">Certified</p>
                  <p className="text-white text-3xl font-black leading-none my-1">ISO</p>
                  <p className="text-white text-xs font-bold">9001:2015</p>
                  <div className="flex justify-center mt-1">
                    <FiCheckCircle className="text-cyan-400" size={14} />
                  </div>
                </div>
              </div>
              <h4 className="text-white text-2xl font-black">ISO 9001:2015</h4>
              <p className="text-cyan-400 font-bold text-sm tracking-wide uppercase mt-1">Quality Management System</p>
            </div>

            {/* Info Content column */}
            <div className="lg:col-span-7 space-y-5 lg:pl-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                  <FiShield className="text-cyan-400 text-lg" />
                </div>
                <h4 className="text-white text-xl font-bold">Quality Assurance & Trust</h4>
              </div>
              
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  SAI INFOTECH is officially certified under the ISO 9001:2015 Quality
                  Management System, reflecting our commitment to world-class IT services.
                </p>
                <p>
                  This certification demonstrates our dedication to quality,
                  reliability, customer satisfaction, and continuous improvement. We ensure that
                  our technical workflows and customer support processes adhere to the highest international standards.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <FiCheckCircle className="text-cyan-400 flex-shrink-0" />
                  <span>Standardized Workflows</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <FiCheckCircle className="text-cyan-400 flex-shrink-0" />
                  <span>Customer Satisfaction Focus</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <FiCheckCircle className="text-cyan-400 flex-shrink-0" />
                  <span>Continuous Self-Auditing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <FiCheckCircle className="text-cyan-400 flex-shrink-0" />
                  <span>Reliable IT Governance</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}