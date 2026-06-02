import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logoIcon from '../assets/logo.png'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Clients', href: '#clients' },
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

      // Auto-detect active section on scroll
      const sections = navLinks.map(link => link.href.replace('#', ''))
      let current = '#home'
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            current = `#${section}`
          }
        }
      }
      setActive(current)
    }

    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setActive(href)
    setMenuOpen(false)
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ fontFamily: "'Bookman Old Style', 'Bookman', serif" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'nav-glass shadow-lg shadow-black/30 py-2'
          : 'py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <img
              src={logoIcon}
              alt="SAI INFOTECH"
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <div className="text-slate-900 text-base sm:text-lg font-extrabold tracking-[0.16em]">
                SAI
                <span className="text-[#345f9a]"> INFOTECH</span>
              </div>
              <div className="text-[10px] sm:text-[11px] text-slate-500 tracking-[0.32em] uppercase mt-1">
                Technology Services
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-2 text-[15px] font-medium transition-all duration-200 relative ${
                  active === link.href
                    ? 'text-slate-900 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#345f9a] after:rounded-full'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className={`ml-3 px-4 py-2 text-[15px] font-medium transition-all duration-200 relative ${
                active === '#contact'
                  ? 'text-slate-900 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#345f9a] after:rounded-full'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Get Service
            </a>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg nav-glass text-slate-600 hover:text-slate-900"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
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
            className="lg:hidden nav-glass mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                    active === link.href
                      ? 'text-[#345f9a] border-l-2 border-[#345f9a]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                  active === '#contact'
                    ? 'text-[#345f9a] border-l-2 border-[#345f9a]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                Get Service
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  )
}
