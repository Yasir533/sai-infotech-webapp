import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import BrandTicker from '../components/BrandTicker'

const categories = [
  {
    id: 'computing',
    name: 'Computing',
    icon: '🖥️',
    color: '#e53e3e',
    bgImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80',
    description: "Our aim is to develop tomorrow's information technology that supports innovative applications, from big data analytics to the Internet of Things. It covers all aspects of information technology including energy efficient and robust hardware systems, software defined networks, secure distributed systems, scalability and integration in increasing computing density, reliability and lower power consumption and costs.",
    products: ['Desktops', 'Processors', 'Chip Level', 'Printers', 'Monitors', 'Thin Client', 'All-in-Ones', 'Workstation', 'Laptops', 'Servers'],
  },
  {
    id: 'data-centers',
    name: 'Data Centers',
    icon: '🗄️',
    color: '#3182ce',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    description: 'We provide comprehensive data center solutions including server infrastructure, storage systems, network equipment, and cooling solutions. Our expertise ensures your data center is optimized for performance, reliability, and energy efficiency.',
    products: ['Rack Servers', 'Blade Servers', 'Storage Arrays', 'NAS/SAN', 'UPS Systems', 'PDU Units', 'Cooling Units', 'KVM Switches', 'Patch Panels', 'Cable Management'],
  },
  {
    id: 'electronic-security',
    name: 'Electronic Security',
    icon: '🛡️',
    color: '#38a169',
    bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
    description: 'Protect your premises with our state-of-the-art electronic security solutions. From CCTV surveillance to access control systems, we deliver end-to-end security infrastructure tailored to your needs.',
    products: ['CCTV Cameras', 'DVR / NVR', 'IP Cameras', 'Access Control', 'Biometric Systems', 'Video Doorbells', 'Alarm Systems', 'Fire Detection', 'PA Systems', 'Video Analytics'],
  },
  {
    id: 'it-accessories',
    name: 'IT Accessories',
    icon: '🖱️',
    color: '#d69e2e',
    bgImage: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&q=80',
    description: 'Complete your IT setup with our wide range of accessories. From peripherals to power solutions, we stock premium accessories from leading brands to enhance productivity and workflow.',
    products: ['Keyboards & Mice', 'Headsets', 'Webcams', 'USB Hubs', 'External Drives', 'Memory Cards', 'Cables & Adapters', 'Laptop Bags', 'Mouse Pads', 'Screen Filters'],
  },
  {
    id: 'it-security',
    name: 'IT Security',
    icon: '🔒',
    color: '#805ad5',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    description: 'Safeguard your digital assets with our comprehensive IT security solutions. We offer hardware and software security products to protect against cyber threats, data breaches, and unauthorized access.',
    products: ['Firewalls', 'UTM Appliances', 'Antivirus Solutions', 'VPN Gateways', 'Endpoint Security', 'Email Security', 'Web Filtering', 'SIEM Solutions', 'Encryption Devices', 'Security Tokens'],
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: '🌐',
    color: '#dd6b20',
    bgImage: 'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=400&q=80',
    description: 'Build robust, scalable network infrastructure with our comprehensive range of networking products. From enterprise switches to wireless access points, we provide solutions for every network size and complexity.',
    products: ['Managed Switches', 'Routers', 'Wireless APs', 'Network Cables', 'Fiber Optics', 'Load Balancers', 'Media Converters', 'Network Racks', 'PoE Switches', 'SD-WAN'],
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    icon: '☁️',
    color: '#2b6cb0',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    description: 'Accelerate your digital transformation with our cloud solutions. We offer cloud infrastructure, migration services, and hybrid cloud setups to help businesses scale efficiently and cost-effectively.',
    products: ['Cloud Servers', 'Backup Solutions', 'Cloud Storage', 'Virtual Desktops', 'Cloud Security', 'Disaster Recovery', 'SaaS Products', 'Cloud Migration', 'Hybrid Cloud', 'Cloud Monitoring'],
  },
  {
    id: 'av-solutions',
    name: 'AV Solutions',
    icon: '📽️',
    color: '#c05621',
    bgImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80',
    description: 'Transform your meeting rooms, auditoriums, and training centres with our professional audio-visual solutions. We deliver seamless AV integration for corporate, educational, and entertainment environments.',
    products: ['Projectors', 'LED Video Walls', 'Interactive Displays', 'Conference Cameras', 'Microphone Systems', 'Audio Amplifiers', 'Video Conferencing', 'Digital Signage', 'Control Systems', 'Presentation Tools'],
  },
]

export default function ITProductsSales() {
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('grid') // 'grid' | 'detail'

  const handleCardClick = (cat) => {
    setSelected(cat)
    setView('detail')
  }

  const handleBack = () => {
    setView('grid')
    setSelected(null)
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <Link to="/" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px', color: '#fff', padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
          ← Back to Home
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <span style={{ color: '#fff', fontWeight: 700 }}>SAI INFOTECH</span>
      </div>

      {/* BRAND TICKER */}
      <div style={{ position: 'relative', zIndex: 10, paddingTop: '0' }}>
        <BrandTicker />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 48px' }}>

        {/* PAGE HEADER */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
            IT Products <span style={{ color: '#345f9a' }}>&amp; Sales</span>
          </h1>
          <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.95rem' }}>
            Browse our complete range of IT products across all categories
          </p>
        </div>

        <AnimatePresence mode="wait">

          {/* GRID VIEW */}
          {view === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}>
                {categories.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.14)` }}
                    onClick={() => handleCardClick(cat)}
                    style={{
                      background: '#fff',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                      transition: 'box-shadow 0.2s',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {/* Card image */}
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <img
                        src={cat.bgImage}
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      {/* Icon badge */}
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: cat.color,
                        borderRadius: '14px',
                        width: '52px', height: '52px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                      }}>
                        {cat.icon}
                      </div>
                    </div>

                    {/* Card footer */}
                    <div style={{
                      padding: '14px 18px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderTop: `3px solid ${cat.color}`,
                    }}>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{cat.name}</span>
                      <FiArrowRight style={{ color: cat.color, fontSize: '1.1rem', fontWeight: 700 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DETAIL VIEW */}
          {view === 'detail' && selected && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}
            >
              {/* SIDEBAR */}
              <div style={{
                flex: '0 0 240px',
                background: '#fff',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                border: '1px solid #e2e8f0',
              }}>
                {/* Back button */}
                <button
                  onClick={handleBack}
                  style={{
                    width: '100%', padding: '12px 18px',
                    background: '#f1f5f9', border: 'none', borderBottom: '1px solid #e2e8f0',
                    color: '#475569', fontSize: '0.82rem', fontWeight: 600,
                    cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '6px',
                  }}
                >
                  ← All Categories
                </button>
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    onClick={() => setSelected(cat)}
                    style={{
                      padding: '12px 18px',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: selected.id === cat.id ? cat.color : 'transparent',
                      color: selected.id === cat.id ? '#fff' : '#334155',
                      fontWeight: selected.id === cat.id ? 700 : 500,
                      fontSize: '0.9rem',
                      borderBottom: '1px solid #f1f5f9',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (selected.id !== cat.id) e.currentTarget.style.background = '#f8fafc' }}
                    onMouseLeave={e => { if (selected.id !== cat.id) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span>{cat.name}</span>
                    <FiChevronRight style={{ opacity: selected.id === cat.id ? 1 : 0.4 }} />
                  </div>
                ))}
              </div>

              {/* CONTENT PANEL */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    flex: '1 1 500px',
                    background: '#fff',
                    borderRadius: '14px',
                    padding: '32px 36px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                    <div style={{
                      background: selected.color, borderRadius: '12px',
                      width: '48px', height: '48px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem', flexShrink: 0,
                    }}>
                      {selected.icon}
                    </div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                      {selected.name}
                    </h2>
                  </div>

                  {/* Description */}
                  <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.97rem', marginBottom: '28px' }}>
                    {selected.description}
                  </p>

                  {/* Product Offerings */}
                  <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '22px' }}>
                    <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1rem' }}>
                      <span style={{ color: selected.color, fontSize: '1.1rem' }}>▶</span>
                      Product Offerings
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px 24px' }}>
                      {selected.products.map((product, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '10px',
                            padding: '10px 12px',
                            borderRadius: '8px',
                            background: '#f8fafc',
                            border: '1px solid #e2e8f0',
                          }}
                        >
                          <IoCheckmarkCircle style={{ color: '#22c55e', fontSize: '1.15rem', flexShrink: 0 }} />
                          <span style={{ color: '#334155', fontWeight: 500, fontSize: '0.88rem' }}>{product}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div style={{ marginTop: '28px', paddingTop: '22px', borderTop: '2px solid #f1f5f9' }}>
                    <Link
                      to="/#contact"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        background: selected.color, color: '#fff',
                        padding: '11px 24px', borderRadius: '10px',
                        fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
                        boxShadow: `0 4px 16px ${selected.color}55`,
                        transition: 'opacity 0.15s',
                      }}
                    >
                      Get a Quote <FiArrowRight />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <div style={{ background: '#0f172a', padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
      </div>

    </div>
  )
}