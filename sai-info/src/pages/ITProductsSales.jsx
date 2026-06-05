import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
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
]

export default function ITProductsSales() {
  const [selected, setSelected] = useState(null)

  const handleBack = () => setSelected(null)

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
      <div style={{ position: 'relative', zIndex: 10 }}>
        <BrandTicker />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 48px' }}>

        <AnimatePresence mode="wait">

          {/* ── GRID VIEW ── */}
          {!selected && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  IT Products <span style={{ color: '#345f9a' }}>&amp; Sales</span>
                </h1>
                <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.95rem' }}>
                  Browse our complete range of IT products across all categories
                </p>
              </div>

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
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.14)' }}
                    onClick={() => setSelected(cat)}
                    style={{
                      background: '#fff',
                      borderRadius: '14px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    {/* Image area */}
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <img
                        src={cat.bgImage}
                        alt={cat.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                      <FiArrowRight style={{ color: cat.color, fontSize: '1.1rem' }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── DETAIL VIEW (no sidebar) ── */}
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Breadcrumb / back */}
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleBack}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#345f9a', fontWeight: 700, fontSize: '0.9rem',
                    padding: 0, display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  ← All Categories
                </button>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{selected.name}</span>
              </div>

              {/* Content card */}
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '36px 40px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
                maxWidth: '960px',
                margin: '0 auto',
              }}>
                {/* Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{
                    background: selected.color, borderRadius: '12px',
                    width: '52px', height: '52px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.6rem', flexShrink: 0,
                  }}>
                    {selected.icon}
                  </div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                    {selected.name}
                  </h2>
                </div>

                {/* Description */}
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem', marginBottom: '28px', borderBottom: '2px solid #f1f5f9', paddingBottom: '24px' }}>
                  {selected.description}
                </p>

                {/* Product Offerings heading */}
                <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                  <span style={{ color: selected.color, fontSize: '1.1rem' }}>▶</span>
                  Product Offerings
                </h3>

                {/* Products grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px' }}>
                  {selected.products.map((product, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '10px',
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <IoCheckmarkCircle style={{ color: '#22c55e', fontSize: '1.25rem', flexShrink: 0 }} />
                      <span style={{ color: '#334155', fontWeight: 500, fontSize: '0.92rem' }}>{product}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid #f1f5f9', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <Link
                    to="/#contact"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      background: selected.color, color: '#fff',
                      padding: '12px 28px', borderRadius: '10px',
                      fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                      boxShadow: `0 4px 16px ${selected.color}55`,
                    }}
                  >
                    Get a Quote <FiArrowRight />
                  </Link>
                  <a
                    href={`https://wa.me/919986914248?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(selected.name)}%20products.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '10px',
                      background: '#25D366', color: '#fff',
                      padding: '12px 28px', borderRadius: '10px',
                      fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                      boxShadow: '0 4px 16px rgba(37,211,102,0.35)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Enquiry
                  </a>
                </div>
              </div>
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