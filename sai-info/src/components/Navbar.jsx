import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import logoIcon from '../assets/logo.png'

const navLinks = [
  { label: 'Home',        href: '#home' },
  { label: 'Services',    href: '#services' },
  { label: 'About',       href: '#about' },
  { label: 'Certificate', href: '#certificate' },
  { label: 'Clients',     href: '#clients' },
  { label: 'Products',    href: '/products', isPage: true },
  { label: 'Contact',     href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active,   setActive]   = useState('#home')

  const navigate = useNavigate()
  const location = useLocation()
  const isOnProductsPage = location.pathname === '/products'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      const anchors = navLinks.filter(l => !l.isPage).map(l => l.href.replace('#', ''))
      let current = '#home'
      for (const section of anchors) {
        const el = document.getElementById(section)
        if (el && el.getBoundingClientRect().top <= 120) current = `#${section}`
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    setActive(href)
    if (isOnProductsPage) {
      navigate('/' + href)
    } else {
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    }
  }

  const desktopLinkClass = (href) =>
    `px-4 py-2 text-[15px] font-bold transition-all duration-200 relative ${
      active === href
        ? 'text-slate-900 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#345f9a] after:rounded-full'
        : 'text-slate-600 hover:text-slate-900'
    }`

  const mobileLinkClass = (href) =>
    `px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
      active === href
        ? 'text-[#345f9a] border-l-2 border-[#345f9a]'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
    }`

  const productsDesktopClass = `px-4 py-2 text-[15px] font-bold transition-all duration-200 relative ${
    isOnProductsPage
      ? 'text-slate-900 after:absolute after:bottom-0 after:left-2 after:right-2 after:h-[2px] after:bg-[#345f9a] after:rounded-full'
      : 'text-slate-600 hover:text-slate-900'
  }`

  const productsMobileClass = `px-4 py-3 rounded-xl text-[15px] font-bold transition-all ${
    isOnProductsPage
      ? 'text-[#345f9a] border-l-2 border-[#345f9a]'
      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
  }`

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{ fontFamily: "'Bookman Old Style', 'Bookman', serif" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-glass shadow-lg shadow-black/30 py-2' : 'py-3'
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
              className="h-10 w-10 sm:h-14 sm:w-14 lg:h-20 lg:w-20 object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-none">
              <div
                style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.75rem, 3.5vw, 1.25rem)' }}
                className="text-slate-900 sm:text-xl font-black tracking-[0.16em]"
              >
                SAI<span className="text-[#345f9a]"> INFOTECH</span>
              </div>
              <div
                style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(0.45rem, 1.8vw, 0.65rem)' }}
                className="text-slate-600 tracking-[0.32em] uppercase mt-1 font-bold"
              >
                Technology Services
              </div>
            </div>
          </a>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={productsDesktopClass}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={desktopLinkClass(link.href)}
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* MOBILE BUTTON */}
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
              {navLinks.map((link) =>
                link.isPage ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={productsMobileClass}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={mobileLinkClass(link.href)}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

