import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import { getApiBase } from '../utils/apiBase'
import OrbitalServices from './OrbitalServices'
import ITProductsCard from './ITProductsCard'

const typingPhrases = [
  'Component Level Refurbishing',
  'AV Solutions',
  'Surveillance / CCTV',
  'Managed Services',
  'IT / ITeS Lifecycle Management',
  'E-Waste Management',
  'Wind Energy Controls',
  'PLC & Automation Systems',
]

export default function Hero() {
  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const heroImage = `${getApiBase()}/uploads/repair.jpsg`

  useEffect(() => {
    const phrase = typingPhrases[currentPhrase]
    let timeout

    if (!isDeleting && displayText === phrase) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setCurrentPhrase((p) => (p + 1) % typingPhrases.length)
    } else {
      const speed = isDeleting ? 50 : 80

      timeout = setTimeout(() => {
        setDisplayText(
          isDeleting
            ? phrase.slice(0, displayText.length - 1)
            : phrase.slice(0, displayText.length + 1)
        )
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentPhrase])

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-28 pb-10"
      >
        <div className="relative z-10 w-full py-4 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative isolate overflow-hidden rounded-none border border-white/15 shadow-[0_30px_100px_rgba(2,8,23,0.35)] min-h-[78vh] lg:min-h-[82vh]"
          >
            <motion.img
              src={heroImage}
              alt="Sai Infotech repair and IT services"
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ scale: 1.08 }}
              animate={{ scale: [1.08, 1.14, 1.08] }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.88)_0%,rgba(2,6,23,0.62)_36%,rgba(2,6,23,0.22)_72%,rgba(2,6,23,0.35)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_75%_22%,rgba(59,130,246,0.16),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.14),transparent_28%)]" />

            <motion.div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-cyan-300/10 via-sky-300/5 to-transparent blur-3xl"
              animate={{ x: ['-10%', '10%', '-10%'] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative z-10 flex min-h-[78vh] lg:min-h-[82vh] items-end lg:items-center">
              <div className="w-full px-6 sm:px-10 lg:px-14 py-10 lg:py-14">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.05 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100 backdrop-blur-md"
                  >
                    <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.9)]" />
                    Premium IT Solutions Since 2019
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    className="mt-5 text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[0.9] tracking-[-0.06em] text-white"
                  >
                    SAI <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-white bg-clip-text text-transparent">INFOTECH</span>
                  </motion.h1>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mt-5 max-w-2xl text-sm sm:text-lg font-semibold text-slate-100/90"
                  >
                    IT / ITeS / Technology Services & Managed Services
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.28 }}
                    className="mt-4 flex min-h-8 items-center"
                  >
                    <div className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-[11px] sm:text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100 backdrop-blur-md shadow-[0_0_30px_rgba(14,165,233,0.18)]">
                      {displayText || 'Component Level Refurbishing'}
                      <span className="typing-cursor ml-1" />
                    </div>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.36 }}
                    className="mt-6 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-100/90"
                  >
                    Premium IT services in Bangalore since 2019. We specialize in enterprise-grade technology solutions,
                    managed IT services, component-level refurbishing, automation systems, surveillance infrastructure,
                    and end-to-end IT lifecycle management.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.44 }}
                    className="mt-8 flex flex-wrap gap-4"
                  >
                    <a
                      href="#about"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/92 px-7 py-3 text-sm font-bold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_16px_30px_rgba(255,255,255,0.16)]"
                    >
                      <span>About Us</span>
                      <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>

                    <a
                      href="#contact"
                      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 px-7 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(14,165,233,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_42px_rgba(14,165,233,0.34)]"
                    >
                      <span>Contact Us</span>
                      <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mt-8 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] items-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="rounded-[2rem] border border-white/10 bg-white/8 p-4 sm:p-6 backdrop-blur-xl shadow-[0_18px_60px_rgba(2,8,23,0.18)]"
              >
                <div className="min-h-[300px] sm:min-h-[340px] max-w-[520px] mx-auto">
                  <OrbitalServices />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
                className="rounded-[2rem] border border-white/10 bg-white/8 p-4 sm:p-6 backdrop-blur-xl shadow-[0_18px_60px_rgba(2,8,23,0.18)]"
              >
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-100/90">
                    View Products
                  </p>
                  <h3 className="mt-2 text-xl sm:text-2xl font-black text-white">
                    Product Highlights
                  </h3>
                </div>
                <ITProductsCard />
              </motion.div>
            </div>
          </div>
        </div>

      </section>
    </>
  )
}