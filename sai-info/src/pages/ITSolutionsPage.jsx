import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronRight, FiPhone, FiMail } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import logoIcon from '../assets/logo.png'
import samsungLogo from '../assets/samsung.png'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import BrandTicker from '../components/BrandTicker'

const categories = [
  {
    id: 'cctv',
    label: 'CCTV & Surveillance',
    icon: '📷',
    accent: '#0284c7',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=600&q=80',
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
    icon: '🌐',
    accent: '#0891b2',
    bgColor: '#ecfeff',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
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
    icon: '📶',
    accent: '#7c3aed',
    bgColor: '#f5f3ff',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
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
    icon: '🔐',
    accent: '#dc2626',
    bgColor: '#fef2f2',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
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
    icon: '🪪',
    accent: '#059669',
    bgColor: '#f0fdf4',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80',
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
    id: 'server',
    label: 'Server & Cloud',
    icon: '☁️',
    accent: '#0284c7',
    bgColor: '#f0f9ff',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80',
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
      'Web & Mail Hosting Solutions',
    ],
  },
]

const brands = [
  { name: 'ASUS', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg' },
  { name: 'Acer', src: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Acer_2011.svg' },
  { name: 'Intel', src: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg' },
  { name: 'Microsoft', src: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
  { name: 'Samsung', src: samsungLogo },
  { name: 'Apple', src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Cisco', src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg' },
  { name: 'AWS', src: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
  { name: 'Dell', src: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
  { name: 'HP', src: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg' },
]

export default function ITSolutionsPage() {
  const [selected, setSelected] = useState(null)

  const handleGetInTouch = (e) => {
    e.preventDefault()
    window.location.href = '/#contact'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">

      {/* Scrolling brand logo bar */}
      <div className="bg-white border-b border-slate-200 flex items-stretch overflow-hidden" style={{ height: '64px' }}>
        <style>{`
          @keyframes marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-track-s { display: flex; align-items: center; animation: marquee-scroll 32s linear infinite; width: max-content; }
          .marquee-track-s:hover { animation-play-state: paused; }
        `}</style>
        {/* Fixed SAI INFOTECH logo left */}
        <div className="flex items-center gap-3 pl-4 pr-5 border-r border-slate-200 shrink-0 bg-white z-10">
          <img src={logoIcon} alt="SAI INFOTECH" style={{ height: '38px', objectFit: 'contain' }} />
        </div>
        {/* Scrolling logos */}
        <div className="overflow-hidden flex-1">
          <div className="marquee-track-s">
            {[...brands, ...brands].map((brand, i) => (
              <div key={i} className="flex items-center justify-center px-8 shrink-0" style={{ height: '64px' }}>
                <img src={brand.src} alt={brand.name}
                  style={{ height: '30px', maxWidth: '90px', objectFit: 'contain', transition: 'transform 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
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
            <span className="text-slate-900 font-semibold">IT Solutions</span>
          </motion.div>

          {/* Header banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 rounded-2xl overflow-hidden relative"
            style={{ minHeight: '140px' }}
          >
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0c2461 0%, #0284c7 60%, #0ea5e9 100%)' }} />
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 40%)`,
            }} />
            <div className="relative z-10 p-8 lg:p-12 flex flex-col items-center justify-center text-center" style={{ minHeight: '140px' }}>
              <div className="text-4xl mb-3">📡</div>
              <h1 className="font-black mb-3" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#ffffff', textShadow: '0 2px 16px rgba(0,0,0,0.8)' }}>
                IT <span style={{ color: '#bae6fd' }}>Solutions</span>
              </h1>
              <p className="max-w-2xl" style={{ color: '#e0f2fe', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', textShadow: '0 1px 8px rgba(0,0,0,0.7)' }}>
                CCTV, network infrastructure, enterprise Wi-Fi, firewall security and access control — complete IT solutions for modern businesses.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                <a href="tel:+917676952139" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', backdropFilter: 'blur(8px)' }}>
                  <FiPhone size={15} /> +91 76769 52139
                </a>
                <a href="/#contact" onClick={handleGetInTouch} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm transition-all"
                  style={{ background: '#0284c7', border: '1.5px solid #38bdf8', color: '#fff' }}>
                  <FiMail size={15} /> Get a Quote
                </a>
              </div>
            </div>
          </motion.div>

          {/* Grid / Detail view */}
          <AnimatePresence mode="wait">
            {!selected ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-slate-800">Our Solutions</h2>
                  <p className="text-slate-500 mt-1">Browse our complete range of IT solutions</p>
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
                        ← All Solutions
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
                            <p className="text-sm text-slate-500">Custom solutions available. Contact us for a free consultation.</p>
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
                                href={`https://wa.me/917676952139?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(cat.label)}%20solutions.`}
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