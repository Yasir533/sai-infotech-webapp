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
  { name: 'Symmetrix', logo: symmetrixLogo },
  { name: 'MediaTek', logo: mediatekLogo },
  { name: 'Noventiq', logo: noventiqLogo },
  { name: 'RMS Technologies', logo: rmsLogo },
  { name: 'NTTF', logo: nttfLogo },
  { name: 'MHS', logo: mhsLogo },
  { name: 'Sansera', logo: sanseraLogo },
  { name: 'Axcend', logo: axcendLogo },
  { name: 'McCann', logo: mccannLogo },
  { name: 'Stibo Systems', logo: stiboLogo },
]

const doubled = [...clients, ...clients]

export default function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="relative z-10 w-full">
      {/* Header */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-10"
      >
        <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">Trusted By</span>
        <h2 className="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">
          Our <span className="text-gradient">Clients</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto rounded-full" />
        <p className="text-slate-400 mt-6 max-w-sm mx-auto text-sm">
          Trusted by leading companies, hospitals, and institutions across Bangalore and beyond.
        </p>
      </motion.div>

      {/* Vertical scrolling logo grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative mx-auto"
        style={{ height: '520px', overflow: 'hidden', maxWidth: '380px' }}
      >
        {/* Scrolling track */}
        <div className="animate-scroll-up">
          <div className="grid grid-cols-2 gap-4 pb-4">
            {doubled.map((client, i) => (
              <div
                key={i}
                className="glass rounded-2xl border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex items-center justify-center p-3 group cursor-default"
              >
                <div className="w-full flex items-center justify-center bg-white rounded-xl px-3 py-4" style={{ minHeight: '75px' }}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-[110px] max-h-[50px] object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}