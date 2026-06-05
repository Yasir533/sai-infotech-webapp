import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowRight, FiPhone } from 'react-icons/fi'
import { IoCheckmarkCircle } from 'react-icons/io5'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const WHATSAPP = '917676952139'
const ACCENT = '#ea580c'

const categories = [
  {
    id: 'laptop-repair',
    name: 'Laptop Repairs',
    icon: '💻',
    bgImage: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80',
    description: 'We provide expert laptop repair services with skilled technicians who diagnose and fix hardware and software issues quickly. Our focus is quality and transparency, ensuring your device is restored to peak performance with minimal downtime.',
    services: ['Screen Replacement', 'Keyboard Repair & Replacement', 'Battery & Adapter Issues', 'Motherboard Servicing', 'RAM & SSD Upgrades', 'Hinge & Chassis Repair', 'Touchpad Repair', 'Speaker & Audio Fix'],
  },
  {
    id: 'desktop-repair',
    name: 'Desktop Repairs',
    icon: '🖥️',
    bgImage: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&q=80',
    description: 'From power supply failures to full system overhauls, our desktop repair service covers all brands and configurations. We handle walk-in and on-site repairs for homes and businesses alike.',
    services: ['Power Supply Replacement', 'Hard Disk / SSD Installation', 'Graphics Card Upgrades', 'Cooling & Fan Repairs', 'Complete System Diagnostics', 'RAM & Component Upgrades', 'SMPS Replacement', 'Cabinet & Port Repairs'],
  },
  {
    id: 'chip-level',
    name: 'Chip-Level Repairs',
    icon: '🔬',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    description: 'Our chip-level repair specialists handle the most complex PCB-level faults. Using advanced diagnostic equipment, we identify and resolve component-level failures that other technicians cannot.',
    services: ['Chip-Level PCB Repair', 'Motherboard Fault Detection', 'IC Replacement', 'BGA Re-balling & Rebonding', 'Power Rail Diagnostics', 'Capacitor & MOSFET Replacement', 'BIOS Recovery', 'Short Circuit Repair'],
  },
  {
    id: 'data-recovery',
    name: 'Data Recovery',
    icon: '💾',
    bgImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80',
    description: 'Accidental deletion, drive failure, or corruption — our data recovery team handles all scenarios. We support HDDs, SSDs, USB drives, memory cards, and RAID configurations with high success rates.',
    services: ['HDD Data Recovery', 'SSD Data Recovery', 'RAID Array Recovery', 'USB & Flash Drive Recovery', 'Memory Card Recovery', 'Corrupted Partition Recovery', 'Data Backup Services', 'Secure Data Transfer'],
  },
  {
    id: 'value-added',
    name: 'Value-Added Services',
    icon: '⚙️',
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
    description: 'Beyond hardware repair, we offer a range of software and maintenance services to keep your systems healthy, secure, and running efficiently in the long term.',
    services: ['Operating System Installation', 'Virus & Malware Removal', 'Data Backup & Recovery', 'Preventive Maintenance', 'Software Troubleshooting', 'Driver & Firmware Updates', 'Network & Connectivity Fixes', 'Performance Optimization'],
  },
  {
    id: 'on-site',
    name: 'On-Site Service',
    icon: '🚗',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80',
    description: "Can't visit our service centre? No problem. Our certified technicians come to you — whether at your office or home — to diagnose and resolve hardware and software issues on the spot.",
    services: ['Corporate AMC Services', 'Minor Doorstep Repairs', 'Office Desktop Servicing', 'Network Troubleshooting', 'Printer Setup & Repair', 'Hardware Setup', 'Emergency Breakdown Support', 'Scheduled Maintenance Visits'],
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

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f8fafc', minHeight: '100vh' }}>

      {/* Why Choose Us strip */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          {whyChooseUs.map((item, i) => (
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
      <div style={{ background: 'linear-gradient(135deg, #431407 0%, #7c2d12 40%, #ea580c 100%)', padding: '36px 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '4px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
            <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 600 }}>Repair &amp; Recovery</span>
          </div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, margin: '12px 0 8px', textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
            Repair &amp; Recovery Services
          </h1>
          <p style={{ color: '#ffedd5', fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', maxWidth: '600px', margin: '0 auto 20px' }}>
            Expert laptop, desktop, chip-level repair &amp; data recovery services. Fast turnaround, transparent pricing.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+918310338544" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', padding: '9px 20px', borderRadius: '8px', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none', backdropFilter: 'blur(8px)' }}>
              <FiPhone size={14} /> +91 83103 38544
            </a>
            <a href={`https://wa.me/${WHATSAPP}?text=Hi%20SAI%20INFOTECH%2C%20I%20need%20Repair%20%26%20Recovery%20service.`} target="_blank" rel="noopener noreferrer"
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
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>Our Services</h2>
                <p style={{ color: '#64748b', marginTop: '4px', fontSize: '0.9rem' }}>Click any category to see full service details</p>
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
                  ← All Services
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
                  <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: ACCENT, color: '#fff', padding: '12px 28px', borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', boxShadow: '0 4px 16px rgba(234,88,12,0.35)' }}>
                    Get a Quote <FiArrowRight />
                  </a>
                  <a href={`https://wa.me/${WHATSAPP}?text=Hi%20SAI%20INFOTECH%2C%20I%20need%20help%20with%20${encodeURIComponent(selected.name)}.`} target="_blank" rel="noopener noreferrer"
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