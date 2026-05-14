import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import symmetrixLogo from '../assets/clients/symmetrix.jpeg'
import mediatekLogo from '../assets/clients/mediatek.png'
import noventiqLogo from '../assets/clients/noventiq.png'
import rmsLogo from '../assets/clients/rms.png'
import nttfLogo from '../assets/clients/nttf.png'
import mhsLogo from '../assets/clients/mhs.png'
import sanseraLogo from '../assets/clients/sansera.png'
import axcendLogo from '../assets/clients/axcend.png'
import mccannLogo from '../assets/clients/mccann.png'
import stiboLogo from '../assets/clients/stibo.png'

const clients = [
  { name: 'MediaTek', logo: mediatekLogo },
  { name: 'Noventiq', logo: noventiqLogo },
  { name: 'McCann', logo: mccannLogo },
  { name: 'Axcend', logo: axcendLogo },
  { name: 'Sansera', logo: sanseraLogo },
  { name: 'MHS', logo: mhsLogo },
  { name: 'NTTF', logo: nttfLogo },
  { name: 'RMS Technologies', logo: rmsLogo },
  { name: 'Symmetrix', logo: symmetrixLogo },
  { name: 'Stibo Systems', logo: stiboLogo },
]

// Duplicate for seamless infinite loop
const doubled = [...clients, ...clients]

export default function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="clients" className="section-pad relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Trusted By</span>
          <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
            Our <span className="text-gradient">Clients</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
          <p className="text-slate-400 mt-6 max-w-xl mx-auto">
            Trusted by leading companies, hospitals, and institutions across Bangalore and beyond.
          </p>
        </motion.div>

        {/* Infinite marquee carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative"
        >
          {/* Left fade edge */}
          <div
            className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg-color, #0a0f1e), transparent)' }}
          />
          {/* Right fade edge */}
          <div
            className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, var(--bg-color, #0a0f1e), transparent)' }}
          />

          {/* Scrolling track */}
          <div className="flex overflow-hidden">
            <div className="flex gap-6 animate-marquee min-w-max py-2">
              {doubled.map((client, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 glass rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 px-6 py-5 group cursor-default hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(59,130,246,0.10)]"
                  style={{ width: '170px', height: '115px' }}
                >
                  {/* White pill background so all logos are clearly visible */}
                  <div className="w-full flex items-center justify-center flex-1 bg-white rounded-xl px-3 py-2 group-hover:shadow-md transition-shadow duration-300" style={{ minHeight: '62px' }}>
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="max-w-[120px] max-h-[50px] object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-slate-500 group-hover:text-slate-300 text-[10px] font-medium tracking-wide uppercase transition-colors text-center truncate w-full">
                    {client.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"
        >
          <div className="glass rounded-3xl border border-white/8 p-6 grid grid-cols-3 divide-x divide-white/8">
            {[
              { value: '100+', label: 'Happy Clients' },
              { value: '25+', label: 'Years Experience' },
              { value: '100%', label: 'Success Rate' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <div className="text-3xl font-black text-gradient mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
