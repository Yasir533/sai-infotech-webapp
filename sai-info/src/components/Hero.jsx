import React from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import OrbitalServices from './OrbitalServices'
import ITProductsCard from './ITProductsCard'

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-28"
      >
        <div className="hero-radial-glow" />
        <div className="hero-grid" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-[38%] flex-shrink-0">

              {/* MAIN TITLE */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-none mb-4 whitespace-nowrap tracking-[-0.04em]"
              >
                <span className="text-white">SAI </span>
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, #0b74d1, #1d7cff)',
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
                className="text-sm sm:text-lg lg:text-xl font-bold text-slate-100 mb-3 text-center lg:text-left leading-relaxed"
              >
                IT / ITeS / Technology Services & Managed Services
              </motion.h2>

              {/* TAGLINE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-xl font-semibold mb-4"
              >
                <span className="text-[#0b74d1] dark:text-cyan-300 tracking-wide uppercase">
                  PLC &amp; Automation Systems
                </span>
              </motion.div>

              {/* DESCRIPTION */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.28 }}
                className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl"
              >
                Premium IT services in Bangalore since 2019. We deliver IT / ITeS,
                security, cloud, automation, and managed technology services for
                businesses that need dependable support and fast response.
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
                  className="px-7 py-3 rounded-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 text-sm border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300"
                  style={{
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <span>About Us</span>
                  <HiArrowRight />
                </a>

                <a
                  href="#contact"
                  className="px-7 py-3 rounded-xl font-bold text-white flex items-center gap-2 text-sm bg-[#0b74d1] hover:bg-[#095fbd] shadow-[0_0_24px_rgba(11,116,209,0.24)] transition-all duration-300"
                  style={{
                    backdropFilter: 'blur(10px)',
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
              className="w-full lg:w-[62%] flex-shrink-0 flex items-center justify-center"
            >
              <div
                className="
                w-full
                flex
                items-center
                justify-center
                overflow-visible
                scale-90
                xl:scale-100
                "
              >
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