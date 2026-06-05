import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import ewasteCycle from '../assets/ewaste-cycle.jpg'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1 } })
}

const services = [
  { icon: '🖥️', title: 'IT Asset Disposition', short: 'ITAD', desc: 'End-to-end disposition of IT assets with full compliance and audit trails.' },
  { icon: '💰', title: 'Asset Remarketing', short: 'ITAR', desc: 'Maximize value recovery through certified IT asset remarketing.' },
  { icon: '🔒', title: 'Secure Data Destruction', short: 'SDD', desc: 'NIST 800-88 compliant erasure, degaussing and shredding services.' },
  { icon: '🔧', title: 'Decommissioning', short: 'DECOM', desc: 'Professional asset decommissioning and new installation services.' },
  { icon: '🚚', title: 'Secure Logistics', short: 'LOGISTICS', desc: 'Safe packing, secure transport and material handling across India.' },
  { icon: '♻️', title: 'E-Waste Recycling', short: 'RECYCLE', desc: 'Authorized, certified recycling of electronic waste sustainably.' },
]

const sixR = [
  { r: 'Refuse', desc: 'Avoid purchasing unnecessary electronics', color: '#ef4444' },
  { r: 'Reduce', desc: 'Minimize e-waste generation at source', color: '#f97316' },
  { r: 'Rethink', desc: 'Redesign processes for sustainability', color: '#eab308' },
  { r: 'Reuse', desc: 'Extend product life through redeployment', color: '#22c55e' },
  { r: 'Repair', desc: 'Restore functionality before disposal', color: '#3b82f6' },
  { r: 'Recycle', desc: 'Responsibly process remaining e-waste', color: '#8b5cf6' },
]

const dataServices = [
  'Onsite & Offsite Data Destruction',
  'Hard Drive Degaussing',
  'SSD Destruction',
  'Bulk Hard Disk Shredding',
  'NIST 800-88 Compliant Erasure',
  'Data Destruction Certificates',
]

const recoveryServices = [
  'Refurbishment', 'Redeployment', 'Reselling',
  'Value Recovery', 'Asset Tracking & Reporting',
]

const logistics = [
  'Safe Packing of IT Assets', 'Secure Transportation',
  'Material Handling & Movement', 'Asset Inspection & Segregation',
  'Recycling & Resale Processing',
]

function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / 40
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 40)
    return () => clearInterval(timer)
  }, [inView, target])
  return <span ref={ref}>{count}{suffix}</span>
}

function SectionRef({ children, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp} style={style}>
      {children}
    </motion.div>
  )
}

export default function EWasteManagement() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f0fdf4', minHeight: '100vh' }}>

      {/* TOP NAV */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #14532d 60%, #166534 100%)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
        <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px', color: '#fff', padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
          ← Back to Home
        </button>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <span style={{ color: '#fff', fontWeight: 700 }}>SAI INFOTECH</span>
      </div>

      {/* HERO BANNER — smaller height, image on right, text on left */}
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', background: 'linear-gradient(135deg, #0f172a 0%, #14532d 100%)', minHeight: '260px', overflow: 'hidden' }}>

        {/* Left: text */}
        <div style={{ flex: '1 1 340px', padding: '48px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>♻️</div>
            <h1 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)', fontWeight: 900, margin: '0 0 8px', lineHeight: 1.2 }}>
              E-Waste Management
              <span style={{ color: '#4ade80', display: 'block', fontSize: '0.65em', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>Solutions</span>
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', marginTop: '12px', maxWidth: '400px' }}>
              Partnered with <strong style={{ color: '#4ade80' }}>GRKMS</strong> — India's leading certified e-waste recycler since 2010
            </p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '28px', flexWrap: 'wrap' }}>
              {[{ val: 20, suffix: '+', label: 'Years Experience' }, { val: 6, suffix: '', label: 'Certifications' }, { val: 100, suffix: '%', label: 'Certified' }].map((s, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 900, color: '#4ade80' }}>
                    <AnimatedCounter target={s.val} suffix={s.suffix} />
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          style={{ flex: '1 1 480px', maxWidth: '700px', position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
          <img src={ewasteCycle} alt="E-Waste Recycling Process"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.9 }} />
        </motion.div>

      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 24px 0' }}>

        {/* ABOUT */}
        <SectionRef>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderLeft: '5px solid #22c55e' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>About GRKMS</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '12px' }}>
              <strong>Global Resource Knowledge Management Service (GRKMS)</strong> is a leading E-Waste Management Company specializing in IT Asset Disposition, Asset Remarketing, Secure Data Destruction, Logistics and Sustainable Recycling Services across India.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8 }}>
              Established in 2010, GRKMS brings over <strong>20 years of industry expertise</strong> in environmentally responsible recycling and IT asset lifecycle management.
            </p>
          </div>
        </SectionRef>

        {/* SERVICES */}
        <div style={{ marginTop: '56px' }}>
          <SectionRef>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>Services Offered</h2>
            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '32px' }}>Comprehensive e-waste solutions from collection to certified recycling</p>
          </SectionRef>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {services.map((svc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(34,197,94,0.15)' }}
                style={{ background: '#fff', borderRadius: '14px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{svc.icon}</div>
                <div style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>{svc.short}</div>
                <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '1rem' }}>{svc.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6 }}>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6R FRAMEWORK */}
        <div style={{ marginTop: '56px' }}>
          <SectionRef>
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #14532d)', borderRadius: '20px', padding: '40px', color: '#fff' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>The 6R Sustainability Approach</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', marginBottom: '32px' }}>GRKMS follows the globally accepted 6R framework</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
                {sixR.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.04 }}
                    style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${item.color}` }}>
                    <div style={{ fontSize: '1.3rem', fontWeight: 900, color: item.color, marginBottom: '6px' }}>{item.r}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                  </motion.div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '28px', fontSize: '0.9rem' }}>
                Our mission is to minimize waste generation and maximize environmental sustainability.
              </p>
            </div>
          </SectionRef>
        </div>

        {/* 3 CARDS IN A ROW */}
        <div style={{ marginTop: '56px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { title: 'Secure Data Destruction', icon: '🔒', color: '#3b82f6', items: dataServices, desc: 'Data security is our highest priority. Certified data destruction services.' },
            { title: 'IT Asset Recovery & Remarketing', icon: '💼', color: '#f59e0b', items: recoveryServices, desc: 'Evaluate equipment for reuse and remarketing to maximize asset value recovery.' },
            { title: 'Logistics & Transportation', icon: '🚚', color: '#8b5cf6', items: logistics, desc: 'Safe, secure and professional handling of IT assets from pickup to final destination.' },
          ].map((block, bi) => (
            <motion.div key={bi}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: bi * 0.1 }}
              style={{ background: '#fff', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderTop: `4px solid ${block.color}` }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{block.icon}</div>
              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem', marginBottom: '8px' }}>{block.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '14px' }}>{block.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {block.items.map((item, ii) => (
                  <li key={ii} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 0', borderBottom: ii < block.items.length - 1 ? '1px solid #f1f5f9' : 'none', color: '#334155', fontSize: '0.82rem' }}>
                    <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: block.color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* COMMITMENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ margin: '56px 0', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌍</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: '12px' }}>Our Commitment</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', opacity: 0.95 }}>"Recycle Today for a Better Tomorrow."</p>
          <p style={{ opacity: 0.85, maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            GRKMS is committed to providing safe, secure and environmentally responsible E-Waste management solutions while helping organizations achieve sustainability goals and regulatory compliance.
          </p>
        </motion.div>

      </div>

      {/* FOOTER */}
      <div style={{ background: '#0f172a', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
        © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
      </div>

    </div>
  )
}