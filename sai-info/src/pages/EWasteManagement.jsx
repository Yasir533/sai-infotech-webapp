import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import BrandTicker from '../components/BrandTicker'
import logoIcon from '../assets/logo-dark-bg.png'
import logo from '../assets/logo.png'

const sections = [
  {
    id: 'about-ewaste',
    name: 'About E-Waste',
    icon: '♻️',
    color: '#16a34a',
    bgImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80',
    description:
      'We Sai infotech partner with leading e-waste management companies specialising in IT asset Remarketing, Secure Data Destruction, Logistics and Sustainable Recycling Services across Karnataka. Established in 2010, We brings over 20 years of industry expertise in environmentally responsible recycling and IT asset lifecycle management.',
    products: [
      'IT Asset Disposition Services (ITAD)',
      'IT Asset Remarketing Services (ITAR)',
      'Secure Data Destruction',
      'Asset Decommissioning',
      'Secure Logistics',
      'E-Waste Collection & Recycling',
    ],
  },
  {
    id: 'services',
    name: 'Services Offered',
    icon: '🛠️',
    color: '#2f6fbf',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description:
      'We offer a full spectrum of IT asset lifecycle and e-waste management services tailored to meet the needs of businesses of all sizes. Our solutions are compliant with national and international standards, ensuring your organization meets its environmental and regulatory obligations responsibly.',
    products: [
      'IT Asset Disposition Services (ITAD)',
      'IT Asset Remarketing Services (ITAR)',
      'Secure Data Destruction Services',
      'Asset Decommissioning & Installation',
      'Secure Logistics & Transportation',
      'E-Waste Collection & Recycling',
    ],
  },
  {
    id: 'why-grkms',
    name: 'Why Choose GRKMS',
    icon: '🏅',
    color: '#d97706',
    bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    description:
      'GRKMS is a trusted, certified e-waste recycling partner with a proven track record across Karnataka. Our certifications and authorizations ensure that your IT assets and data are handled with the highest levels of security, compliance, and environmental responsibility.',
    products: [
      'KSPCB Authorized E-Waste Recycler',
      'ISO 14001:2015 Certified',
      'ISO 45001:2018 Certified',
      'ISO 9001 Certified',
      'R2 Certified Recycler',
      'Nationwide Collection & Recycling Support',
    ],
  },
  {
    id: '6r-approach',
    name: 'The 6R Sustainability Approach',
    icon: '🌍',
    color: '#059669',
    bgImage: 'https://images.unsplash.com/photo-1574155376612-bfa4dff8c08d?w=400&q=80',
    description:
      'We follow the globally accepted 6R framework. Our mission is to minimize waste generation and maximize environmental sustainability. By implementing this systematic approach, we help organizations reduce their carbon footprint while extracting maximum value from retiring IT assets.',
    products: [
      'Refuse',
      'Reduce',
      'Rethink',
      'Reuse',
      'Repair',
      'Recycle',
    ],
  },
  {
    id: 'data-destruction',
    name: 'Secure Data Destruction',
    icon: '🔐',
    color: '#7c3aed',
    bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    description:
      'Data security is our highest priority. We provide secure and certified data destruction services for organizations looking to dispose of IT assets safely. Every destruction event is documented and certified to give your organization complete peace of mind and regulatory compliance.',
    products: [
      'Onsite and Offsite Data Destruction',
      'Hard Drive Degaussing',
      'SSD Destruction',
      'Bulk Hard Disk Shredding',
      'NIST 800-88 Compliant Erasure',
      'Data Destruction Certificates',
    ],
  },
  {
    id: 'asset-recovery',
    name: 'IT Asset Recovery & Remarketing',
    icon: '💰',
    color: '#ea580c',
    bgImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80',
    description:
      'Before recycling, We evaluates equipment for reuse and remarketing opportunities to maximize asset value recovery. Our remarketing process ensures organizations receive fair value for retiring assets while promoting sustainable reuse of functional equipment.',
    products: [
      'Refurbishment',
      'Redeployment',
      'Reselling',
      'Value Recovery',
      'Asset Tracking & Reporting',
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics & Transportation',
    icon: '🚛',
    color: '#0891b2',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
    description:
      'Our end-to-end logistics solution ensures that IT assets are safely packed, securely transported, and properly processed at every step of the journey. We maintain a complete chain of custody and provide full documentation throughout the entire process.',
    products: [
      'Safe Packing of IT Assets',
      'Secure Transportation',
      'Material Handling & Movement',
      'Asset Inspection & Segregation',
      'Recycling & Resale Processing',
    ],
  },
  {
    id: 'commitment',
    name: 'Our Commitment',
    icon: '🤝',
    color: '#1e3a5f',
    bgImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    description:
      'Sai Infotech is committed to providing safe, secure and environmentally responsible E-Waste management solutions while helping organizations achieve sustainability goals and regulatory compliance. We believe in a future where technology and environmental responsibility go hand in hand.',
    products: [
      'Environmental Compliance',
      'Sustainability Goals Support',
      'Regulatory Compliance',
      'Certified Processes',
      'Transparent Reporting',
      'Recycle Today for a Better Tomorrow',
    ],
  },
]

export default function EWasteManagement() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  const handleBack = () => setSelected(null)

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <button
          onClick={() => navigate('/')}
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px', color: '#fff', padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}
        >
          ← Back to Home
        </button>
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
                  E-Waste <span style={{ color: '#16a34a' }}>Management</span>
                  <span style={{ color: '#64748b', fontWeight: 400, fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', marginLeft: '10px' }}>
                    : <span style={{ color: '#16a34a', fontWeight: 700 }}>Responsible Recycling & IT Asset Lifecycle Management.</span>
                  </span>
                </h1>
                <p style={{ color: '#64748b', marginTop: '8px', fontSize: '0.95rem' }}>
                  Explore our complete e-waste management services and sustainability solutions
                </p>
              </div>

              {/* Jurisdiction Notice */}
              <div style={{
                background: '#fff7ed',
                border: '1px solid #fdba74',
                borderLeft: '5px solid #ea580c',
                padding: '14px 18px',
                borderRadius: '10px',
                marginBottom: '24px',
                color: '#7c2d12',
                lineHeight: '1.7',
                fontSize: '0.88rem'
              }}>
                <strong>Jurisdiction & Governing Law:</strong> All disputes arising out of any vendor agreements, service contracts, sales contracts, or related transactions shall be governed by and construed in accordance with the laws of India. Any dispute or difference whatsoever shall be subject to the exclusive jurisdiction of the courts located in Bangalore, India.
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '20px',
              }}>
                {sections.map((cat, i) => (
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

          {/* ── DETAIL VIEW ── */}
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
                    color: '#16a34a', fontWeight: 700, fontSize: '0.9rem',
                    padding: 0, display: 'flex', alignItems: 'center', gap: '4px',
                  }}
                >
                  ← All Sections
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

                {/* Key Points heading */}
                <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                  <span style={{ color: selected.color, fontSize: '1.1rem' }}>▶</span>
                  Key Points
                </h3>

                {/* Points grid */}
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
                    href={`https://wa.me/919986914248?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(selected.name)}%20services.`}
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
