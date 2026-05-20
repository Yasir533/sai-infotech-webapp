import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logoImg from '../assets/logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Certificate', href: '#certificate' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)

  const [menuOpen, setMenuOpen] = useState(false)

  const [active, setActive] = useState('#home')

  useEffect(() => {

    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }

  }, [])

  // FINAL MOBILE FIX
  const handleNavClick = (e, href) => {

    e.preventDefault()

    setActive(href)

    setMenuOpen(false)

    setTimeout(() => {

      const target = document.querySelector(href)

      if (target) {

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

      }

    }, 300)
  }

  return (

    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/30 py-2'
          : 'py-3'
      }`}
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center group flex-shrink-0"
          >

            <img
              src={logoImg}
              alt="SAI INFOTECH"
              className={`w-auto object-contain transition-all duration-300 group-hover:opacity-90 group-hover:scale-105 ${
                scrolled
                  ? 'h-12 sm:h-14'
                  : 'h-14 sm:h-16 lg:h-20'
              }`}
              style={{
                maxWidth: '260px',
                filter:
                  'drop-shadow(0 0 10px rgba(6,182,212,0.5)) drop-shadow(0 0 4px rgba(37,99,235,0.4))',
              }}
            />

          </a>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">

            {navLinks.map((link) => (

              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active === link.href
                    ? 'text-blue-400 bg-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>

            ))}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-3 btn-primary px-5 py-2 rounded-xl text-sm font-semibold text-white"
            >
              <span>Get Service</span>
            </a>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg glass text-slate-300 hover:text-white"
          >

            {menuOpen ? (
              <HiX size={24} />
            ) : (
              <HiMenuAlt3 size={24} />
            )}

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {menuOpen && (

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >

            <div className="p-4 flex flex-col gap-1">

              {navLinks.map((link) => (

                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    active === link.href
                      ? 'text-blue-400 bg-blue-500/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>

              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="mt-2 btn-primary px-4 py-3 rounded-xl text-center font-semibold text-white"
              >
                <span>Get Service</span>
              </a>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </motion.nav>
  )
}