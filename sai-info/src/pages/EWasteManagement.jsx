import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import logoIcon from '../assets/logo-dark-bg.png'
import logo from '../assets/logo.png'
import workflowBg from '../assets/work-flow.jpeg'

const ewasteSlides = [
  { img: new URL('../assets/Ewaste/image (1).png', import.meta.url).href, caption: 'E-Waste Sorting Facility' },
  { img: new URL('../assets/Ewaste/image (2).png', import.meta.url).href, caption: 'IT Asset Refurbishment' },
  { img: new URL('../assets/Ewaste/image (3).png', import.meta.url).href, caption: 'Recycling Plant Operations' },
  { img: new URL('../assets/Ewaste/image (4).png', import.meta.url).href, caption: 'Manual Component Sorting' },
  { img: new URL('../assets/Ewaste/image (5).png', import.meta.url).href, caption: 'Industrial Shredding Equipment' },
  { img: new URL('../assets/Ewaste/image (6).png', import.meta.url).href, caption: 'High-Volume Processing Line' },
  { img: new URL('../assets/Ewaste/image (7).png', import.meta.url).href, caption: 'Circuit Board Recovery' },
]

function EwasteCarousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % ewasteSlides.length)
    }, 3000)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const go = (dir) => {
    setCurrent(prev => (prev + dir + ewasteSlides.length) % ewasteSlides.length)
    startTimer()
  }

  return (
    <div style={{
      borderRadius: '14px',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      border: '1px solid #e2e8f0',
      position: 'relative',
      background: '#f1f5f9',
      aspectRatio: '16/9',
      width: '100%',
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <img
            src={ewasteSlides[current].img}
            alt={ewasteSlides[current].caption}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />
          {/* Bottom gradient + caption */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
            padding: '40px 20px 14px',
          }}>
            <span style={{
              color: '#fff', fontWeight: 600, fontSize: '0.92rem',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block', flexShrink: 0 }} />
              {ewasteSlides[current].caption}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Left Arrow */}
      <button onClick={() => go(-1)} style={{
        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}>
        <FiChevronLeft style={{ fontSize: '1.1rem', color: '#0f172a' }} />
      </button>

      {/* Right Arrow */}
      <button onClick={() => go(1)} style={{
        position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
        width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}>
        <FiChevronRight style={{ fontSize: '1.1rem', color: '#0f172a' }} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '12px', right: '16px', display: 'flex', gap: '5px', zIndex: 10 }}>
        {ewasteSlides.map((_, i) => (
          <button key={i} onClick={() => { setCurrent(i); startTimer() }} style={{
            width: i === current ? '20px' : '7px', height: '7px',
            borderRadius: '4px', background: i === current ? '#16a34a' : 'rgba(255,255,255,0.6)',
            border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s',
          }} />
        ))}
      </div>

      {/* Counter */}
      <div style={{
        position: 'absolute', top: '12px', right: '14px',
        background: 'rgba(0,0,0,0.45)', color: '#fff',
        fontSize: '0.72rem', fontWeight: 600, padding: '3px 9px',
        borderRadius: '20px', zIndex: 10,
      }}>
        {current + 1} / {ewasteSlides.length}
      </div>
    </div>
  )
}

const sections = [
  {
    id: 'about-ewaste', name: 'About E-Waste', icon: '♻️', color: '#16a34a',
    bgImage: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=400&q=80',
    description: (<><p>We Sai infotech partner with leading e-waste management companies specialising in IT asset Remarketing, Secure Data Destruction, Logistics and Sustainable Recycling Services across Karnataka.</p><p>Established in 2010, We brings over 20 years of industry expertise in environmentally responsible recycling and IT asset lifecycle management.</p></>),
    points: ['IT Asset Remarketing','Secure Data Destruction','Logistics Services','Sustainable Recycling','Karnataka-wide Coverage','20+ Years of Expertise'],
  },
  {
    id: 'services', name: 'Services Offered', icon: '🛠️', color: '#2f6fbf',
    bgImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
    description: null,
    points: ['IT Asset Disposition Services (ITAD)','IT Asset Remarketing Services (ITAR)','Secure Data Destruction Services','Asset Decommissioning & Installation','Secure Logistics & Transportation','E-Waste Collection & Recycling'],
  },
  {
    id: 'why-sai-infotech', name: 'Why Choose Sai Infotech', icon: '🏅', color: '#d97706',
    bgImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
    description: (<><p>Sai Infotech provides secure, reliable and environmentally responsible e-waste management solutions across Karnataka.</p></>),
    points: ['Professional E-Waste Management','Secure Data Destruction','IT Asset Recovery & Remarketing','Reliable Logistics Support','Sustainable Recycling Practices','Customer-Focused Service'],
  },
  {
    id: '6r-approach', name: 'The 6R Sustainability Approach', icon: '🌍', color: '#059669',
    bgImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80',
    description: (<><p>We follow the globally accepted 6R framework:</p></>),
    points: ['Recycle','Reduce','Repair','Rethink','Reuse','Refuse'],
    footer: 'Our mission is to minimize waste generation and maximize environmental sustainability.',
  },
  {
    id: 'data-destruction', name: 'Secure Data Destruction', icon: '🔐', color: '#7c3aed',
    bgImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80',
    description: (<><p>Data security is our highest priority. We provide secure and certified data destruction services for organizations looking to dispose of IT assets safely.</p></>),
    points: ['Onsite and Offsite Data Destruction','Hard Drive Degaussing','SSD Destruction','Bulk Hard Disk Shredding','NIST 800-88 Compliant Erasure','Data Destruction Certificates'],
  },
  {
    id: 'asset-recovery', name: 'IT Asset Recovery & Remarketing', icon: '💰', color: '#ea580c',
    bgImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&q=80',
    description: (<><p>Before recycling, We evaluates equipment for reuse and remarketing opportunities to maximize asset value recovery.</p></>),
    points: ['Refurbishment','Redeployment','Reselling','Value Recovery','Asset Tracking & Reporting'],
  },
  {
    id: 'commitment', name: 'Our Commitment', icon: '🤝', color: '#1e3a5f',
    bgImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&q=80',
    description: (<><p>Sai Infotech is committed to providing safe, secure and environmentally responsible E-Waste management solutions while helping organizations achieve sustainability goals and regulatory compliance.</p></>),
    points: ['Environmental Responsibility','Sustainability Goal Support','Regulatory Compliance','Certified Processes','Transparent Reporting','Recycle Today for a Better Tomorrow'],
    showLogo: true,
  },
]

export default function EWasteManagement() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '16px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}>
        <button onClick={() => navigate('/')} style={{
          background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px', color: '#fff', padding: '6px 14px',
          cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
        }}>← Back to Home</button>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <img src={logoIcon} alt="SAI INFOTECH" style={{ height: '40px', objectFit: 'contain' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 48px' }}>
        <AnimatePresence mode="wait">

          {/* ── GRID VIEW ── */}
          {!selected && (
            <motion.div key="grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>

              {/* Page Title */}
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, color: '#0f172a', margin: 0 }}>
                  E-Waste <span style={{ color: '#16a34a' }}>Management</span>
                  <span style={{ color: '#64748b', fontWeight: 400, fontSize: 'clamp(0.85rem, 1.5vw, 1rem)', marginLeft: '10px' }}>
                    : <span style={{ color: '#16a34a', fontWeight: 700 }}>Responsible Recycling & IT Asset Lifecycle Management.</span>
                  </span>
                </h1>
                <p style={{ color: '#64748b', marginTop: '6px', fontSize: '0.95rem', margin: '6px 0 0' }}>
                  Explore our complete e-waste management services and sustainability solutions
                </p>
              </div>

              {/* ── CAROUSEL + WORKFLOW SIDE BY SIDE ── */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '3fr 2fr',
                gap: '16px',
                marginBottom: '28px',
                alignItems: 'start',
              }}>
                {/* Left: Carousel */}
                <EwasteCarousel />

                {/* Right: Workflow image — no label, clean card */}
                <div style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  background: '#fff',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={workflowBg}
                    alt="ITAD Process Workflow"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </div>

              {/* Cards Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {sections.map((cat, i) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.14)' }}
                    onClick={() => setSelected(cat)}
                    style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}
                  >
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <img src={cat.bgImage} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        background: cat.color, borderRadius: '14px', width: '52px', height: '52px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.6rem', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                      }}>{cat.icon}</div>
                    </div>
                    <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `3px solid ${cat.color}` }}>
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
            <motion.div key={selected.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a', fontWeight: 700, fontSize: '0.9rem', padding: 0 }}>
                  ← All Categories
                </button>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{selected.name}</span>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '36px 40px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', maxWidth: '960px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ background: selected.color, borderRadius: '12px', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>{selected.icon}</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>{selected.name}</h2>
                </div>
                {selected.showLogo && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <img src={logo} alt="SAI INFOTECH" style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                    <div>
                      <h3 style={{ margin: 0, color: '#1e3a5f', fontSize: '1.1rem', fontWeight: 700 }}>SAI INFOTECH</h3>
                      <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.9rem' }}>Recycle Today for a Better Tomorrow</p>
                    </div>
                  </div>
                )}
                {selected.description && (
                  <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem', marginBottom: '24px', borderBottom: '2px solid #f1f5f9', paddingBottom: '20px' }}>{selected.description}</div>
                )}
                <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                  <span style={{ color: selected.color, fontSize: '1.1rem' }}>▶</span> Key Points
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px' }}>
                  {selected.points.map((point, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <IoCheckmarkCircle style={{ color: '#22c55e', fontSize: '1.25rem', flexShrink: 0 }} />
                      <span style={{ color: '#334155', fontWeight: 500, fontSize: '0.92rem' }}>{point}</span>
                    </motion.div>
                  ))}
                </div>
                {selected.footer && <p style={{ marginTop: '16px', color: '#64748b', fontSize: '0.93rem', fontStyle: 'italic' }}>{selected.footer}</p>}
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid #f1f5f9', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => navigate('/#contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: selected.color, color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${selected.color}55` }}>
                    Get a Quote <FiArrowRight />
                  </button>
                  <a href={`https://wa.me/917676952139?text=Hi%20SAI%20INFOTECH%2C%20I%20would%20like%20to%20enquire%20about%20${encodeURIComponent(selected.name)}%20services.`} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#25D366', color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(37,211,102,0.35)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    WhatsApp Enquiry
                  </a>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <div style={{ background: '#0f172a', padding: '20px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>
        © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
      </div>
    </div>
  )
}