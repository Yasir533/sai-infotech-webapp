import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiMenu, FiX, FiChevronRight } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import VideoBackground from '../components/VideoBackground'
import Navbar from '../components/Navbar'
import BrandTicker from '../components/BrandTicker'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const categories = [
  {
    id: 'computing',
    label: 'Computing',
    description: 'Our aim is to develop tomorrow\'s information technology that supports innovative applications, from big data analytics to the Internet of Things. It covers all aspects of information technology including energy efficient and robust hardware systems, software defined networks, secure distributed systems, scalability and integration in increasing computing density, reliability and lower power consumption and costs.',
    products: [
      'Desktops', 'Processors', 'Zero Client', 'Printers',
      'Monitors', 'Thin Client', 'All-in-Ones', 'Workstation'
    ],
  },
  {
    id: 'data-centers',
    label: 'Data Centers',
    description: 'We determine optimum solutions for data center implementation that provide innovative technology, enabling agile infrastructure and cloud transformation.',
    products: [
      'Storage Applications', 'Data Protection & Backup Recovery', 'High Performance Computing Solutions',
      'Virtualization Solutions', 'Data Center Management Solutions', 'Storage Networking',
      'Private Cloud', 'Hyper-Converged Solutions', 'Server Consolidation Solutions'
    ],
  },
  {
    id: 'electronic-security',
    label: 'Electronic Security',
    description: 'Comprehensive surveillance and access control solutions for enterprise-level security.',
    products: [
      'IP & HD Cameras', 'PTZ Cameras', 'WiFi Cameras', 'DVR & NVR',
      'Gating Solutions', 'Home Barriers', 'Boom Gates', 'Swing Gates',
      'P Gates', 'Door Frame Metal Detectors', 'Hand Held Detectors', 'Biometric Access Controls',
      'Facial Access Controls', 'Intrusion Analytics', 'Incident Handling', 'Motion Detectors', 'Access Controls'
    ],
  },
  {
    id: 'it-accessories',
    label: 'IT Accessories',
    description: 'We offer a wide variety of IT accessories to cater to present-day technology requirements and professional environments.',
    products: [
      'SSD/HDD', 'Graphic Cards', 'Advanced Headsets', 'Gaming Keyboards',
      'Gaming Headsets', 'RAM', 'Routers', 'Projectors', 'Gaming Mouse'
    ],
  },
  {
    id: 'it-security',
    label: 'IT Security',
    description: 'As technology grows more advanced and sophisticated, businesses must remain vigilant against cyber security threats. We provide complete protection utilizing secure applications and security methodologies.',
    products: [
      'Anti Virus & Firewall', 'Application Access Security', 'DLP (Data Loss Prevention)',
      'Email & Web Security Isolation', 'UTM Unified Threat Management', 'Data Encryption',
      'IoT & Server Security', 'Intrusion Analysis & Incident Handling'
    ],
  },
  {
    id: 'mobility',
    label: 'Mobility',
    description: 'Mobile technology continues transforming business operations and productivity through powerful and flexible device ecosystems.',
    products: [
      'Laptops', 'Smart Phones', 'POS Solutions', 'Chromebooks',
      'Industrial Thermal Scanners', 'Tablets', 'Wireless Cameras', 'Mobile Workstations', 'KIOSK Systems'
    ],
  },
  {
    id: 'networking',
    label: 'Networking',
    description: 'We provide secure, robust and scalable high-performance networking solutions tailored to business requirements.',
    products: [
      'SDN / SDWAN', 'Wireless Solutions', 'NAS & SAN Solutions', 'Telephony Systems & VoIP',
      'Email & Collaboration Solutions', 'Network Infrastructure', 'WAN, Intranet & VPN', 'Switching & Routing Solutions', 'Passive Cabling'
    ],
  }
]

export default function ITProductsSales() {
  const [activeCategory, setActiveCategory] = useState('computing')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const currentCategory = categories.find(cat => cat.id === activeCategory)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      <VideoBackground />
      <Navbar />

      {/* Brand Ticker — just below navbar */}
      <div className="relative z-10 pt-24 sm:pt-28 lg:pt-32">
        <BrandTicker />
      </div>

      {/* Main content */}
      <main className="flex-1 relative z-10 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <FiChevronRight size={16} />
            <span className="text-slate-900 font-semibold">IT Products & Sales</span>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3">
              IT Products <span className="text-cyan-600">&amp; Sales</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl">
              Explore our comprehensive portfolio of IT solutions across computing, security, networking, and more.
            </p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Left Sidebar */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1">

              {/* Mobile toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-full mb-4 flex items-center justify-between gap-2 px-4 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                <span className="flex items-center gap-2">
                  <FiMenu size={20} />
                  Categories
                </span>
                {mobileMenuOpen ? <FiX size={20} /> : null}
              </button>

              {/* Sidebar menu */}
              <AnimatePresence>
                {(mobileMenuOpen || true) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="hidden lg:block space-y-2">
                    {categories.map((cat, idx) => (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          setActiveCategory(cat.id)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          activeCategory === cat.id
                            ? 'bg-red-600 text-white shadow-lg'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        }`}>
                        <span>{cat.label}</span>
                        <motion.div
                          animate={{ x: activeCategory === cat.id ? 4 : 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}>
                          <FiArrowRight size={18} />
                        </motion.div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile menu items */}
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="lg:hidden space-y-2 mt-4">
                  {categories.map((cat, idx) => (
                    <motion.button
                      key={cat.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => {
                        setActiveCategory(cat.id)
                        setMobileMenuOpen(false)
                      }}
                      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                        activeCategory === cat.id
                          ? 'bg-red-600 text-white shadow-lg'
                          : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                      }`}>
                      <span>{cat.label}</span>
                      <motion.div
                        animate={{ x: activeCategory === cat.id ? 4 : 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}>
                        <FiArrowRight size={18} />
                      </motion.div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>

            {/* Right Content Area */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-3 bg-white rounded-2xl p-8 sm:p-10 shadow-lg border border-slate-200">

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}>

                  {/* Category Title */}
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                    {currentCategory?.label}
                  </h2>

                  {/* Description */}
                  {currentCategory?.description && (
                    <p className="text-slate-600 text-base leading-relaxed mb-8">
                      {currentCategory.description}
                    </p>
                  )}

                  {/* Product Offerings */}
                  <div className="mb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span className="text-red-600">▸</span> Product Offerings
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentCategory?.products.map((product, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                          <IoCheckmarkCircle className="text-green-500 flex-shrink-0" size={18} />
                          <span className="text-slate-700 font-medium">{product}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                    <a
                      href="/#contact"
                      className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-red-700 transition-colors text-sm">
                      Get in Touch <FiArrowRight size={16} />
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}