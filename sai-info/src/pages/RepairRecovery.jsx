import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronRight, FiPhone, FiMail } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const categories = [
  {
    id: 'laptop-repair',
    label: 'Laptop Repairs',
    icon: '💻',
    accent: '#ea580c',
    bgColor: '#fff7ed',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&q=80',
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
    icon: '🖥️',
    accent: '#0284c7',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1593640408182-31c228f505e7?w=600&q=80',
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
    icon: '🔬',
    accent: '#7c3aed',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
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
    icon: '💾',
    accent: '#059669',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80',
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
    icon: '⚙️',
    accent: '#d97706',
    bgColor: '#fffbeb',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
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
    icon: '🚗',
    accent: '#dc2626',
    bgColor: '#fef2f2',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80',
    description:
      "Can't visit our service centre? No problem. Our certified technicians come to you — whether at your office or home — to diagnose and resolve hardware and software issues on the spot.",
    services: [
      'Doorstep Laptop Repair',
      'Office Desktop Servicing',
      'Network Troubleshooting',
      'Printer Setup & Repair',
      'Peripheral Configuration',
      'Emergency Breakdown Support',
      'Scheduled Maintenance Visits',
      'Corporate AMC Services',
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
  const [selected, setSelected] = useState(null)

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
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #ea580c 100%)' }} />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
            }} />
            <div className="relative z-10 p-8 lg:p-12 flex flex-col items-center justify-center text-center" style={{ minHeight: '220px' }}>
              <div className="text-4xl mb-3">🛠️</div>
              <h1 className="font-black mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ffffff', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
                Repair &amp; <span style={{ color: '#fed7aa' }}>Recovery</span>
              </h1>
              <p className="max-w-2xl" style={{ color: '#ffedd5', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
                Expert laptop, desktop, chip-level repair &amp; data recovery services. Fast turnaround, transparent pricing, trusted by businesses across Bangalore.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <a href="tel:+917676952139" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', backdropFilter: 'blur(8px)' }}>
                  <FiPhone size={15} /> +91 76769 52139
                </a>
                <a href="/#contact" onClick={handleGetInTouch} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: '#ea580c', border: '1.5px solid #f97316', color: '#fff' }}>
                  <FiMail size={15} /> Get a Quote
                </a>
              </div>
            </div>
          </motion.div>

          {/* Grid view */}
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Our Services</h2>
                  <p className="text-slate-500 mt-1">Browse our complete range of repair &amp; recovery services</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat, idx) => (
                    <motion.div
                      key={cat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      onClick={() => setSelected(cat.id)}
                      className="cursor-pointer rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
                      style={{ borderBottom: `3px solid ${cat.accent}` }}
                    >
                      {/* Image area */}
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.label}
                          className="w-full h-full object-cover"
                        />
                        {/* Icon badge centered */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg"
                            style={{ background: cat.accent }}>
                            {cat.icon}
                          </div>
                        </div>
                      </div>
                      {/* Label row */}
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="font-bold text-slate-800 text-base">{cat.label}</span>
                        <FiArrowRight size={18} style={{ color: cat.accent }} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                {(() => {
                  const cat = categories.find(c => c.id === selected)
                  return (
                    <div className="max-w-3xl mx-auto">
                      <button
                        onClick={() => setSelected(null)}
                        className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                      >
                        ← All Services
                      </button>
                      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="h-2" style={{ background: cat.accent }} />
                        <div className="p-8 sm:p-10">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow"
                              style={{ background: cat.bgColor }}>
                              {cat.icon}
                            </div>
                            <h2 className="text-3xl font-black text-slate-900">{cat.label}</h2>
                          </div>

                          <p className="text-slate-600 text-base leading-relaxed mb-8">{cat.description}</p>

                          <div className="mb-10">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <span style={{ color: cat.accent }}>▸</span> Service Offerings
                            </h3>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {cat.services.map((service, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03 }}
                                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:opacity-90 transition-colors"
                                  style={{ background: cat.bgColor }}
                                >
                                  <IoCheckmarkCircle className="flex-shrink-0" size={18} style={{ color: cat.accent }} />
                                  <span className="text-slate-700 font-medium">{service}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                            <p className="text-sm text-slate-500">Free diagnosis available. Call or walk in to our centre.</p>
                            <div className="flex flex-wrap gap-3">
                              <a
                                href="/#contact"
                                onClick={handleGetInTouch}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all"
                                style={{ background: cat.accent }}
                              >
                                Get a Quote <FiArrowRight size={15} />
                              </a>
                              <a
                                href={`https://wa.me/917676952139?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(cat.label)}%20services.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm text-white transition-all"
                                style={{ background: '#25D366' }}
                              >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                WhatsApp Enquiry
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}