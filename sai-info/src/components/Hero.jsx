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

              {/* MAIN TITLE — reduced from clamp(2.8rem,7vw,5.5rem) to clamp(2.2rem,5.5vw,4rem) */}
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

              {/* SUBTITLE */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="text-sm sm:text-xl font-bold text-slate-700 mb-2 text-center lg:text-left leading-relaxed whitespace-nowrap"
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
                <span className="text-[#1a4a8a] tracking-wide uppercase font-bold">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </span>
              </motion.div>

              {/* DESCRIPTION — added text-justify */}
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

              {/* BUTTONS */}
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
              className="w-full lg:w-7/12 flex-shrink-0 flex items-center justify-center overflow-hidden"
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