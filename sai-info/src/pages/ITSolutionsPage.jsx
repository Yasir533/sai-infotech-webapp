import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const WHATSAPP = '917676952139'
const ACCENT = '#0284c7'

const categories = [
  {
    id: 'cctv',
    name: 'CCTV & Surveillance',
    icon: '📷',
    bgImage: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&q=80',
    description: 'We design, supply and install complete CCTV surveillance systems tailored to your premises. From small offices to large enterprise campuses, our solutions ensure continuous, reliable monitoring with remote access capability.',
    services: ['IP & HD Cameras', 'PTZ (Pan-Tilt-Zoom) Cameras', 'WiFi & Wireless Cameras', 'DVR & NVR Setup', 'Remote Monitoring Configuration', 'Night Vision Systems', 'Vandal-Proof Camera Solutions', 'CCTV AMC & Support'],
  },
  {
    id: 'networking',
    name: 'Network Infrastructure',
    icon: '🌐',
    bgImage: 'https://images.unsplash.com/photo-1562547256-2c5ee93b60b7?w=400&q=80',
    description: 'We build robust, high-performance network infrastructure for businesses of all sizes. Our engineers design end-to-end solutions from structured cabling to enterprise-grade switching and routing.',
    services: ['Network Design & Planning', 'Structured Cabling (Cat5e/Cat6/Fiber)', 'Switching & Routing Solutions', 'WAN, Intranet & VPN Setup', 'SDN / SD-WAN Solutions', 'NAS & SAN Solutions', 'Telephony & VoIP Systems', 'Network Audits & Optimization'],
  },
  {
    id: 'wifi',
    name: 'Enterprise Wi-Fi',
    icon: '📡',
    bgImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80',
    description: 'Our enterprise wireless solutions provide seamless, high-density Wi-Fi coverage across offices, warehouses, hospitals, and campuses. We partner with leading brands like Cisco, Ubiquiti, and Ruckus.',
    services: ['Site Survey & RF Planning', 'Enterprise Access Point Deployment', 'Wi-Fi Controller Configuration', 'Guest Network Segmentation', 'Bandwidth Management', 'Wi-Fi Security Hardening', 'Roaming & Handoff Optimization', 'Wi-Fi Troubleshooting & Support'],
  },
  {
    id: 'firewall',
    name: 'Firewall & VPN',
    icon: '🔐',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    description: 'Protect your business from evolving cyber threats. We configure and manage enterprise-grade firewalls, UTM appliances, and secure VPN tunnels for remote workforce connectivity.',
    services: ['Firewall Configuration & Management', 'UTM (Unified Threat Management)', 'VPN Tunnel Setup (Site-to-Site)', 'Remote Access VPN', 'Intrusion Detection & Prevention (IDS/IPS)', 'DLP (Data Loss Prevention)', 'Email & Web Security', 'Security Audits & Compliance'],
  },
  {
    id: 'access-control',
    name: 'Access Control',
    icon: '🚪',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    description: 'Secure your physical spaces with intelligent access control and biometric systems. From entry doors to server rooms, we implement layered security that integrates seamlessly with your existing IT infrastructure.',
    services: ['Biometric Fingerprint Access', 'Face Recognition Terminals', 'Card-Based Entry Systems', 'Boom Gates & Gating Solutions', 'Door Frame Metal Detectors', 'Visitor Management Systems', 'Integrated CCTV + Access Control', 'AMC & Maintenance Services'],
  },
  {
    id: 'pos-software',
    name: 'POS & Software',
    icon: '🖥️',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
    description: 'From point-of-sale system deployment to complete software installation and licensing, our team ensures your business-critical applications are properly configured and compliant.',
    services: ['POS System Setup & Configuration', 'OS Installation & Licensing', 'ERP & Business Software Deployment', 'Application Access Security', 'Software Audits', 'Virus & Malware Removal', 'Remote IT Support', 'Preventive Maintenance Contracts'],
  },
  {
    id: 'server',
    name: 'Server & Cloud',
    icon: '☁️',
    bgImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    description: 'We help businesses design, deploy, and manage server infrastructure — from on-premises rack servers to hybrid cloud environments. Our expertise spans virtualization, storage, and high-availability setups.',
    services: ['Server Procurement & Setup', 'VMware & Hyper-V Virtualization', 'Private Cloud Infrastructure', 'Hyper-Converged Solutions', 'Storage & Backup Solutions', 'Disaster Recovery Planning', 'Server Consolidation', 'Cloud Migration Support'],
  },
]

const highlights = [
  { icon: '📡', title: 'End-to-End Solutions', desc: 'Design, supply, install & support' },
  { icon: '🏢', title: 'Enterprise Grade', desc: 'Cisco, Ubiquiti, Ruckus & more' },
  { icon: '🔐', title: 'Security First', desc: 'ISO-aligned secure deployments' },
  { icon: '🔧', title: 'AMC Support', desc: 'Ongoing maintenance contracts' },
]

export default function ITSolutionsPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* Highlights strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {highlights.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0' }}>
              <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#1e293b' }}>{item.title}</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Header Banner */}
      <div style={{ background: 'linear-gradient(135deg, #0c1445 0%, #1e3a8a 50%, #0284c7 100%)', padding: '36px 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>IT Solutions</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: '12px 0 8px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            IT Solutions &amp; Services
          </h1>
          <p style={{ color: '#e0f2fe', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '600px', margin: '0 auto 20px' }}>
            CCTV, network infrastructure, enterprise Wi-Fi, firewall security and access control — complete IT solutions for modern businesses.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+918310338544" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', padding: '9px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              <FiPhone size={14} /> +91 83103 38544
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=Hi%20SAI%20INFOTECH%2C%20I%20need%20IT%20Solutions%20for%20my%20business.`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#25D366', color: '#fff', padding: '9px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
          </div>
        </motion.div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 48px' }}>
        <AnimatePresence mode="wait">

          {/* GRID VIEW */}
          {!selected && (
            <motion.div key="grid" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Our Solutions</h2>
                <p style={{ color: '#64748b', marginTop: '4px', fontSize: '0.9rem' }}>Click any category to see full solution details</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                {categories.map((cat, i) => (
                  <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.14)' }}
                    onClick={() => setSelected(cat)}
                    style={{ background: '#fff', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', border: '1px solid #e2e8f0' }}>
                    <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                      <img src={cat.bgImage} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: ACCENT, borderRadius: '14px', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                        {cat.icon}
                      </div>
                    </div>
                    <div style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `3px solid ${ACCENT}` }}>
                      <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{cat.name}</span>
                      <FiArrowRight style={{ color: ACCENT, fontSize: '1.1rem' }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* DETAIL VIEW */}
          {selected && (
            <motion.div key={selected.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT, fontWeight: 700, fontSize: '0.9rem', padding: 0 }}>
                  ← All Solutions
                </button>
                <span style={{ color: '#cbd5e1' }}>/</span>
                <span style={{ color: '#64748b', fontSize: '0.9rem' }}>{selected.name}</span>
              </div>
              <div style={{ background: '#fff', borderRadius: '16px', padding: '36px 40px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0', maxWidth: '960px', margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <div style={{ background: ACCENT, borderRadius: '12px', width: '52px', height: '52px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', flexShrink: 0 }}>{selected.icon}</div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>{selected.name}</h2>
                </div>
                <p style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem', marginBottom: '28px', borderBottom: '2px solid #f1f5f9', paddingBottom: '24px' }}>{selected.description}</p>
                <h3 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.05rem' }}>
                  <span style={{ color: ACCENT }}>▶</span> Service Offerings
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px 20px' }}>
                  {selected.services.map((svc, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.045 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                      <IoCheckmarkCircle style={{ color: '#22c55e', fontSize: '1.25rem', flexShrink: 0 }} />
                      <span style={{ color: '#334155', fontWeight: 500, fontSize: '0.92rem' }}>{svc}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '2px solid #f1f5f9', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: ACCENT, color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(2,132,199,0.35)' }}>
                    Get a Quote <FiArrowRight />
                  </a>
                  <a href={`https://wa.me/${WHATSAPP}?text=Hi%20SAI%20INFOTECH%2C%20I%20need%20${encodeURIComponent(selected.name)}%20solutions.`} target="_blank" rel="noopener noreferrer"
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

      <Footer />
      <ScrollToTop />
    </div>
  )
}