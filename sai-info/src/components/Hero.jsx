import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
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
        className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-28"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-5/12 flex-shrink-0">

              {/* MAIN TITLE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-3 whitespace-nowrap"
              >
                <span className="text-white">SAI </span>
                <span className="text-gradient">INFOTECH</span>
              </motion.h1>

              {/* SUBTITLE */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-sm sm:text-xl font-bold text-white mb-2 text-center lg:text-left leading-relaxed"
              >
                IT / ITeS / Technology Services & Managed Services
              </motion.h2>

              {/* TYPING TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg font-semibold mb-5 h-7"
              >
                <span className="text-cyan-400">{displayText}</span>
                <span className="text-cyan-400 typing-cursor" />
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-md"
              >
                Premium IT services in Bangalore since 2019.
                We specialize in enterprise-grade technology solutions,
                managed IT services, component-level refurbishing,
                automation systems, surveillance infrastructure,
                and end-to-end IT lifecycle management.
              </motion.p>

              {/* BUTTONS */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >

                <a
                  href="#about"
                  className="px-7 py-3 rounded-xl font-bold text-white flex items-center gap-2 text-sm"
                  style={{
                    background: 'rgba(30,40,70,0.85)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span>About Us</span>
                  <HiArrowRight />
                </a>

                <a
                  href="#contact"
                  className="px-7 py-3 rounded-xl font-bold text-white flex items-center gap-2 text-sm"
                  style={{
                    background: 'rgba(30,40,70,0.85)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <span>Contact Us</span>
                  <HiArrowRight />
                </a>

              </motion.div>

              {/* PRODUCTS CARD */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-10 w-full flex justify-center lg:justify-start"
              >
                <ITProductsCard />
              </motion.div>

            </div>

            {/* RIGHT SIDE */}
            <motion.div
              id="services"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-7/12 flex-shrink-0 flex items-center justify-center"
            >
              <div className="w-full overflow-visible flex items-center justify-center">
                <OrbitalServices />
              </div>
            </motion.div>

          </div>

        </div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >

          <span className="text-slate-600 text-xs tracking-widest">
            SCROLL
          </span>

          <div className="w-0.5 h-12 bg-gradient-to-b from-blue-500/60 to-transparent" />

        </motion.div>

      </section>
    </>
  )
}