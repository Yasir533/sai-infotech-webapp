import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiMenu, FiX, FiChevronRight, FiPhone, FiMail } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const categories = [
  {
    id: 'laptop-repair',
    label: 'Laptop Repairs',
    description:
      'We provide expert laptop repair services with skilled technicians who diagnose and fix hardware and software issues quickly. Our focus is quality and transparency, ensuring your device is restored to peak performance with minimal downtime.',
    services: [
      'Screen Replacement',
      'Keyboard Repair & Replacement',
      'Battery & Adapter Issues',
      'Motherboard Servicing',
      'RAM & SSD Upgrades',
      'Hinge & Chassis Repair',
      'Touchpad Repair',
      'Speaker & Audio Fix',
    ],
  },
  {
    id: 'desktop-repair',
    label: 'Desktop Repairs',
    description:
      'From power supply failures to full system overhauls, our desktop repair service covers all brands and configurations. We handle walk-in and on-site repairs for homes and businesses alike.',
    services: [
      'Power Supply Replacement',
      'Hard Disk / SSD Installation',
      'Graphics Card Upgrades',
      'Cooling & Fan Repairs',
      'Complete System Diagnostics',
      'RAM & Component Upgrades',
      'SMPS Replacement',
      'Cabinet & Port Repairs',
    ],
  },
  {
    id: 'chip-level',
    label: 'Chip-Level Repairs',
    description:
      'Our chip-level repair specialists handle the most complex PCB-level faults. Using advanced diagnostic equipment, we identify and resolve component-level failures that other technicians cannot.',
    services: [
      'Chip-Level PCB Repair',
      'Motherboard Fault Detection',
      'IC Replacement',
      'BGA Re-balling & Rebonding',
      'Power Rail Diagnostics',
      'Capacitor & MOSFET Replacement',
      'BIOS Recovery',
      'Short Circuit Repair',
    ],
  },
  {
    id: 'data-recovery',
    label: 'Data Recovery',
    description:
      'Accidental deletion, drive failure, or corruption — our data recovery team handles all scenarios. We support HDDs, SSDs, USB drives, memory cards, and RAID configurations with high success rates.',
    services: [
      'HDD Data Recovery',
      'SSD Data Recovery',
      'RAID Array Recovery',
      'USB & Flash Drive Recovery',
      'Memory Card Recovery',
      'Corrupted Partition Recovery',
      'Data Backup Services',
      'Secure Data Transfer',
    ],
  },
  {
    id: 'value-added',
    label: 'Value-Added Services',
    description:
      'Beyond hardware repair, we offer a range of software and maintenance services to keep your systems healthy, secure, and running efficiently in the long term.',
    services: [
      'Operating System Installation',
      'Virus & Malware Removal',
      'Data Backup & Recovery',
      'Preventive Maintenance',
      'Software Troubleshooting',
      'Driver & Firmware Updates',
      'Network & Connectivity Fixes',
      'Performance Optimization',
    ],
  },
  {
    id: 'on-site',
    label: 'On-Site Service',
    description:
      'Can\'t visit our service centre? No problem. Our certified technicians come to you — whether at your office or home — to diagnose and resolve hardware and software issues on the spot.',
    services: [
      'Corporate AMC Services',
      'Minor Doorstep Repairs',
      'Office Desktop Servicing',
      'Network Troubleshooting',
      'Printer Setup & Repair',
      'Hardware Setup',
      'Emergency Breakdown Support',
      'Scheduled Maintenance Visits',
    ],
  },
]

const whyChooseUs = [
  { icon: '🛠️', title: 'Expert Technicians', desc: 'Skilled in chip-level & component repairs' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'Quick service with minimal downtime' },
  { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden costs — honest quotes upfront' },
  { icon: '🔒', title: 'Trusted Partner', desc: 'Trusted by 100+ businesses across Bangalore' },
]

export default function RepairRecovery() {
  const [activeCategory, setActiveCategory] = useState('laptop-repair')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentCategory = categories.find(cat => cat.id === activeCategory)

  const handleGetInTouch = (e) => {
    e.preventDefault()
    window.location.href = '/#contact'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Why Choose Us strip */}
      <div className="relative z-10 pt-4 pb-2 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 py-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-sm font-bold text-slate-800">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 relative z-10 pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <Link to="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <FiChevronRight size={16} />
            <span className="text-slate-900 font-semibold">Repair &amp; Recovery</span>
          </motion.div>

          {/* Header banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-2xl overflow-hidden relative"
            style={{ minHeight: '220px' }}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #ea580c 100%)',
              }}
            />
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
              }}
            />

            <div className="relative z-10 p-8 lg:p-12 flex flex-col items-center justify-center text-center" style={{ minHeight: '220px' }}>
              <div className="text-4xl mb-3">🛠️</div>
              <h1
                className="font-black mb-3"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#ffffff',
                  textShadow: '0 2px 16px rgba(0,0,0,0.8)',
                }}
              >
                Repair &amp; <span style={{ color: '#fed7aa' }}>Recovery</span>
              </h1>
              <p
                className="max-w-2xl"
                style={{
                  color: '#ffedd5',
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                }}
              >
                Expert laptop, desktop, chip-level repair &amp; data recovery services. Fast turnaround, transparent pricing, trusted by businesses across Bangalore.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <a
                  href="tel:+918310338544"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', backdropFilter: 'blur(8px)' }}
                >
                  <FiPhone size={15} /> +91 83103 38544
                </a>
                <a
                  href="/#contact"
                  onClick={handleGetInTouch}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: '#ea580c', border: '1.5px solid #f97316', color: '#fff' }}
                >
                  <FiMail size={15} /> Get a Quote
                </a>
              </div>
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-4 gap-8">

            {/* Left Sidebar */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-full mb-4 flex items-center justify-between gap-2 px-4 py-3 rounded-lg font-semibold hover:opacity-90 transition-colors text-white"
                style={{ background: '#ea580c' }}
              >
                <span className="flex items-center gap-2">
                  <FiMenu size={20} />
                  {mobileMenuOpen ? 'Hide Categories' : `Services — ${currentCategory?.label}`}
                </span>
                {mobileMenuOpen ? <FiX size={20} /> : <FiArrowRight size={20} />}
              </button>

              {/* Desktop sidebar */}
              <div className="hidden lg:block space-y-2">
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'text-white shadow-lg'
                        : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    }`}
                    style={activeCategory === cat.id ? { background: '#ea580c' } : {}}
                  >
                    <span>{cat.label}</span>
                    <motion.div animate={{ x: activeCategory === cat.id ? 4 : 0 }} transition={{ type: 'spring', stiffness: 300 }}>
                      <FiArrowRight size={18} />
                    </motion.div>
                  </motion.button>
                ))}
              </div>

              {/* Mobile dropdown */}
              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="lg:hidden space-y-2 mb-4"
                  >
                    {categories.map((cat, idx) => (
                      <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => { setActiveCategory(cat.id); setMobileMenuOpen(false) }}
                        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                          activeCategory === cat.id
                            ? 'text-white shadow-lg'
                            : 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                        }`}
                        style={activeCategory === cat.id ? { background: '#ea580c' } : {}}
                      >
                        <span>{cat.label}</span>
                        <FiArrowRight size={18} />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

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
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
                    {currentCategory?.label}
                  </h2>

                  {currentCategory?.description && (
                    <p className="text-slate-600 text-base leading-relaxed mb-8">
                      {currentCategory.description}
                    </p>
                  )}

                  <div className="mb-10">
                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <span style={{ color: '#ea580c' }}>▸</span> Service Offerings
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentCategory?.services.map((service, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          <IoCheckmarkCircle className="flex-shrink-0" size={18} style={{ color: '#ea580c' }} />
                          <span className="text-slate-700 font-medium">{service}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Free diagnosis available. Call or walk in to our centre.</p>
                    <div className="flex gap-3">
                      <a
                        href="tel:+918310338544"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors text-white"
                        style={{ background: '#ea580c' }}
                      >
                        <FiPhone size={15} /> Call Now
                      </a>
                      <a
                        href="/#contact"
                        onClick={handleGetInTouch}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border"
                        style={{ color: '#ea580c', borderColor: '#ea580c', background: 'transparent' }}
                      >
                        Get Quote <FiArrowRight size={15} />
                      </a>
                    </div>
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
