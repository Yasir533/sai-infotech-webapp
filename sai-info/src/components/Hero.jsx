import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import OrbitalServices from './OrbitalServices'

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
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-10 sm:pt-24 lg:py-14">

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-5/12 flex-shrink-0">

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="font-black leading-none mb-4 whitespace-nowrap tracking-[-0.02em]"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
                }}
              >
                <span className="text-slate-900">SAI </span>
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #1e5fb8, #2f6fbf)',
                  }}
                >
                  INFOTECH
                </span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-sm sm:text-xl font-bold text-slate-700 mb-2 text-center lg:text-left leading-relaxed whitespace-nowrap"
              >
                IT / ITeS / Technology Services & Managed Services
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg font-semibold mb-5 h-7"
              >
                <span className="text-[#1a4a8a] tracking-wide uppercase font-bold">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-slate-900 text-base sm:text-lg leading-relaxed mb-8 max-w-xl font-medium !text-justify"
              >
                Premium IT services in Bangalore since 2019.
                We specialize in enterprise-grade technology solutions,
                managed IT services, component-level refurbishing,
                automation systems, surveillance infrastructure,
                and end-to-end IT lifecycle management.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <a
                  href="#about"
                  className="px-7 py-3 rounded-xl font-bold text-slate-900 flex items-center gap-2 text-sm border-2 border-slate-300 bg-white hover:bg-[#2f6fbf] hover:text-white hover:border-[#2f6fbf] transition-all duration-300 shadow-[0_8px_18px_rgba(15,23,42,0.05)]"
                >
                  <span>About Us</span>
                  <HiArrowRight />
                </a>
                <a
                  href="#contact"
                  className="px-7 py-3 rounded-xl font-bold text-slate-900 flex items-center gap-2 text-sm border-2 border-slate-300 bg-white hover:bg-[#2f6fbf] hover:text-white hover:border-[#2f6fbf] transition-all duration-300 shadow-[0_8px_18px_rgba(15,23,42,0.05)]"
                >
                  <span>Contact Us</span>
                  <HiArrowRight />
                </a>
              </motion.div>

            </div>

            {/* RIGHT SIDE */}
            <motion.div
              id="services"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-7/12 flex-shrink-0 flex items-center justify-center overflow-visible"
            >
              <div className="w-full flex items-center justify-center">
                <OrbitalServices />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  )
}