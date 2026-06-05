import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiMenu, FiX, FiChevronRight, FiPhone, FiMail } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const categories = [
  {
    id: 'cctv',
    label: 'CCTV & Surveillance',
    description:
      'We design, supply and install complete CCTV surveillance systems tailored to your premises. From small offices to large enterprise campuses, our solutions ensure continuous, reliable monitoring with remote access capability.',
    services: [
      'IP & HD Cameras',
      'PTZ (Pan-Tilt-Zoom) Cameras',
      'WiFi & Wireless Cameras',
      'DVR & NVR Setup',
      'Remote Monitoring Configuration',
      'Night Vision Systems',
      'Vandal-Proof Camera Solutions',
      'CCTV AMC & Support',
    ],
  },
  {
    id: 'networking',
    label: 'Network Infrastructure',
    description:
      'We build robust, high-performance network infrastructure for businesses of all sizes. Our engineers design end-to-end solutions from structured cabling to enterprise-grade switching and routing.',
    services: [
      'Network Design & Planning',
      'Structured Cabling (Cat5e/Cat6/Fiber)',
      'Switching & Routing Solutions',
      'WAN, Intranet & VPN Setup',
      'SDN / SD-WAN Solutions',
      'NAS & SAN Solutions',
      'Telephony & VoIP Systems',
      'Network Audits & Optimization',
    ],
  },
  {
    id: 'wifi',
    label: 'Enterprise Wi-Fi',
    description:
      'Our enterprise wireless solutions provide seamless, high-density Wi-Fi coverage across offices, warehouses, hospitals, and campuses. We partner with leading brands like Cisco, Ubiquiti, and Ruckus.',
    services: [
      'Site Survey & RF Planning',
      'Enterprise Access Point Deployment',
      'Wi-Fi Controller Configuration',
      'Guest Network Segmentation',
      'Bandwidth Management',
      'Wi-Fi Security Hardening',
      'Roaming & Handoff Optimization',
      'Wi-Fi Troubleshooting & Support',
    ],
  },
  {
    id: 'firewall',
    label: 'Firewall & VPN',
    description:
      'Protect your business from evolving cyber threats. We configure and manage enterprise-grade firewalls, UTM appliances, and secure VPN tunnels for remote workforce connectivity.',
    services: [
      'Firewall Configuration & Management',
      'UTM (Unified Threat Management)',
      'VPN Tunnel Setup (Site-to-Site)',
      'Remote Access VPN',
      'Intrusion Detection & Prevention (IDS/IPS)',
      'DLP (Data Loss Prevention)',
      'Email & Web Security',
      'Security Audits & Compliance',
    ],
  },
  {
    id: 'access-control',
    label: 'Access Control',
    description:
      'Secure your physical spaces with intelligent access control and biometric systems. From entry doors to server rooms, we implement layered security that integrates seamlessly with your existing IT infrastructure.',
    services: [
      'Biometric Fingerprint Access',
      'Face Recognition Terminals',
      'Card-Based Entry Systems',
      'Boom Gates & Gating Solutions',
      'Door Frame Metal Detectors',
      'Visitor Management Systems',
      'Integrated CCTV + Access Control',
      'AMC & Maintenance Services',
    ],
  },
  {
    id: 'pos-software',
    label: 'POS & Software',
    description:
      'From point-of-sale system deployment to complete software installation and licensing, our team ensures your business-critical applications are properly configured and compliant.',
    services: [
      'POS System Setup & Configuration',
      'OS Installation & Licensing',
      'ERP & Business Software Deployment',
      'Application Access Security',
      'Software Audits',
      'Virus & Malware Removal',
      'Remote IT Support',
      'Preventive Maintenance Contracts',
    ],
  },
  {
    id: 'server',
    label: 'Server & Cloud',
    description:
      'We help businesses design, deploy, and manage server infrastructure — from on-premises rack servers to hybrid cloud environments. Our expertise spans virtualization, storage, and high-availability setups.',
    services: [
      'Server Procurement & Setup',
      'VMware & Hyper-V Virtualization',
      'Private Cloud Infrastructure',
      'Hyper-Converged Solutions',
      'Storage & Backup Solutions',
      'Disaster Recovery Planning',
      'Server Consolidation',
      'Cloud Migration Support',
    ],
  },
]

const highlights = [
  { icon: '📡', title: 'End-to-End Solutions', desc: 'Design, supply, install & support' },
  { icon: '🏢', title: 'Enterprise Grade', desc: 'Cisco, Ubiquiti, Ruckus & more' },
  { icon: '🔐', title: 'Security First', desc: 'ISO-aligned secure deployments' },
  { icon: '🔧', title: 'AMC Support', desc: 'Ongoing maintenance contracts' },
]

export default function ITSolutionsPage() {
  const [activeCategory, setActiveCategory] = useState('cctv')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const currentCategory = categories.find(cat => cat.id === activeCategory)

  const handleGetInTouch = (e) => {
    e.preventDefault()
    window.location.href = '/#contact'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Highlights strip */}
      <div className="relative z-10 pt-4 pb-2 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {highlights.map((item, i) => (
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
            <span className="text-slate-900 font-semibold">IT Solutions</span>
          </motion.div>

          {/* Header banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-2xl overflow-hidden relative"
            style={{ minHeight: '220px' }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #0c2461 0%, #0284c7 60%, #0ea5e9 100%)',
              }}
            />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
              }}
            />

            <div className="relative z-10 p-8 lg:p-12 flex flex-col items-center justify-center text-center" style={{ minHeight: '220px' }}>
              <div className="text-4xl mb-3">📡</div>
              <h1
                className="font-black mb-3"
                style={{
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#ffffff',
                  textShadow: '0 2px 16px rgba(0,0,0,0.8)',
                }}
              >
                IT <span style={{ color: '#bae6fd' }}>Solutions</span>
              </h1>
              <p
                className="max-w-2xl"
                style={{
                  color: '#e0f2fe',
                  fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
                  textShadow: '0 1px 8px rgba(0,0,0,0.7)',
                }}
              >
                CCTV, network infrastructure, enterprise Wi-Fi, firewall security and access control — complete IT solutions for modern businesses.
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
                  style={{ background: '#0284c7', border: '1.5px solid #38bdf8', color: '#fff' }}
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
                className="lg:hidden w-full mb-4 flex items-center justify-between gap-2 px-4 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-colors"
                style={{ background: '#0284c7' }}
              >
                <span className="flex items-center gap-2">
                  <FiMenu size={20} />
                  {mobileMenuOpen ? 'Hide Categories' : `Solutions — ${currentCategory?.label}`}
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
                    style={activeCategory === cat.id ? { background: '#0284c7' } : {}}
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
                        style={activeCategory === cat.id ? { background: '#0284c7' } : {}}
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
                      <span style={{ color: '#0284c7' }}>▸</span> Service Offerings
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {currentCategory?.services.map((service, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="flex items-center gap-3 px-4 py-2.5 bg-slate-50 rounded-lg hover:bg-sky-50 transition-colors"
                        >
                          <IoCheckmarkCircle className="flex-shrink-0" size={18} style={{ color: '#0284c7' }} />
                          <span className="text-slate-700 font-medium">{service}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-slate-500">Custom solutions available. Contact us for a free consultation.</p>
                    <div className="flex gap-3">
                      <a
                        href="tel:+918310338544"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors text-white"
                        style={{ background: '#0284c7' }}
                      >
                        <FiPhone size={15} /> Call Now
                      </a>
                      <a
                        href="/#contact"
                        onClick={handleGetInTouch}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-colors border"
                        style={{ color: '#0284c7', borderColor: '#0284c7', background: 'transparent' }}
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
