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

const certifications = [
  { label: 'KSPCB Authorized', sub: 'E-Waste Recycler', color: '#22c55e' },
  { label: 'ISO 14001:2015', sub: 'Environmental Mgmt', color: '#3b82f6' },
  { label: 'ISO 45001:2018', sub: 'Safety Mgmt', color: '#f59e0b' },
  { label: 'ISO 9001', sub: 'Quality Mgmt', color: '#8b5cf6' },
  { label: 'R2 Certified', sub: 'Responsible Recycler', color: '#10b981' },
  { label: 'Pan India', sub: 'Collection Network', color: '#ef4444' },
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

function SectionRef({ children, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={className}
    >
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
        <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '8px', color: '#fff', padding: '8px 16px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
          ← Back to Home
        </button>
        <span style={{ color: 'rgba(255,255,255,0.4)' }}>|</span>
        <span style={{ color: '#fff', fontWeight: 700 }}>SAI INFOTECH</span>
        <span style={{ marginLeft: 'auto', background: '#22c55e', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>🌱 ECO CERTIFIED</span>
      </div>

      {/* HERO BANNER */}
      <div style={{ backgroundImage: `url(${ewasteCycle})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '64px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,15,10,0.92)' }} />
      {/* Animated circles background */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            style={{ position: 'absolute', borderRadius: '50%', border: '1px solid #22c55e', width: `${200 + i * 120}px`, height: `${200 + i * 120}px`, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          />
        ))}

        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '12px' }}>♻️</div>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 900, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            E-Waste Management
            <span style={{ color: '#4ade80', display: 'block', fontSize: '0.6em', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>Solutions</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: '600px', margin: '16px auto 0' }}>
            Partnered with <strong style={{ color: '#4ade80' }}>GRKMS</strong> — India's leading certified e-waste recycler since 2010
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '48px', flexWrap: 'wrap' }}>
          {[{ val: 20, suffix: '+', label: 'Years Experience' }, { val: 6, suffix: '', label: 'ISO Certifications' }, { val: 100, suffix: '%', label: 'Secure & Certified' }].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#4ade80' }}>
                <AnimatedCounter target={s.val} suffix={s.suffix} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ABOUT GRKMS */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px 0' }}>
        <SectionRef>
          <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', borderLeft: '5px solid #22c55e' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>About GRKMS</h2>
            <p style={{ color: '#475569', lineHeight: 1.8, marginBottom: '12px' }}>
              <strong>Global Resource Knowledge Management Service (GRKMS)</strong> is a leading E-Waste Management Company specializing in IT Asset Disposition, Asset Remarketing, Secure Data Destruction, Logistics and Sustainable Recycling Services across India.
            </p>
            <p style={{ color: '#475569', lineHeight: 1.8 }}>
              Established in 2010, GRKMS brings over <strong>20 years of industry expertise</strong> in environmentally responsible recycling and IT asset lifecycle management.
            </p>
          </div>
        </SectionRef>

        {/* CERTIFICATIONS */}
        <SectionRef className="mt-12" style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '24px', textAlign: 'center' }}>Certifications & Authorizations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
            {certifications.map((cert, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}
                style={{ background: '#fff', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', borderTop: `3px solid ${cert.color}` }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: cert.color + '20', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: cert.color }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>{cert.label}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{cert.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionRef>

        {/* SERVICES */}
        <div style={{ marginTop: '64px' }}>
          <SectionRef>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', textAlign: 'center' }}>Services Offered</h2>
            <p style={{ color: '#64748b', textAlign: 'center', marginBottom: '32px' }}>Comprehensive e-waste solutions from collection to certified recycling</p>
          </SectionRef>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {services.map((svc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(34,197,94,0.15)' }}
                style={{ background: '#fff', borderRadius: '14px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'default', transition: 'box-shadow 0.3s' }}>
                <div style={{ fontSize: '2.2rem', marginBottom: '12px' }}>{svc.icon}</div>
                <div style={{ background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: 700, padding: '2px 10px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px', letterSpacing: '0.05em' }}>{svc.short}</div>
                <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '8px', fontSize: '1rem' }}>{svc.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6 }}>{svc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 6R FRAMEWORK */}
        <div style={{ marginTop: '64px' }}>
          <SectionRef>
            <div style={{ background: 'linear-gradient(135deg, #0f172a, #14532d)', borderRadius: '20px', padding: '48px 40px', color: '#fff' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', textAlign: 'center' }}>The 6R Sustainability Approach</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', textAlign: 'center', marginBottom: '40px' }}>GRKMS follows the globally accepted 6R framework</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {sixR.map((item, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ scale: 1.04 }}
                    style={{ background: 'rgba(255,255,255,0.07)', borderRadius: '12px', padding: '20px', borderLeft: `4px solid ${item.color}`, backdropFilter: 'blur(4px)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: item.color, marginBottom: '6px' }}>{item.r}</div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                  </motion.div>
                ))}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '32px', fontSize: '0.9rem' }}>
                Our mission is to minimize waste generation and maximize environmental sustainability.
              </p>
            </div>
          </SectionRef>
        </div>

        {/* DATA DESTRUCTION */}
        <div style={{ marginTop: '64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Secure Data Destruction', icon: '🔒', color: '#3b82f6', items: dataServices, desc: 'Data security is our highest priority. We provide secure and certified data destruction services.' },
            { title: 'IT Asset Recovery & Remarketing', icon: '💼', color: '#f59e0b', items: recoveryServices, desc: 'GRKMS evaluates equipment for reuse and remarketing opportunities to maximize asset value recovery.' },
            { title: 'Logistics & Transportation', icon: '🚚', color: '#8b5cf6', items: logistics, desc: 'Safe, secure and professional handling of IT assets from pickup to final destination.' },
          ].map((block, bi) => (
            <motion.div key={bi}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: bi * 0.1 }}
              style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', borderTop: `4px solid ${block.color}` }}>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{block.icon}</div>
              <h3 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1.1rem', marginBottom: '10px' }}>{block.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>{block.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {block.items.map((item, ii) => (
                  <li key={ii} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', borderBottom: ii < block.items.length - 1 ? '1px solid #f1f5f9' : 'none', color: '#334155', fontSize: '0.88rem' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: block.color, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* COMMITMENT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ margin: '64px 0', background: 'linear-gradient(135deg, #22c55e, #16a34a)', borderRadius: '20px', padding: '48px 40px', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🌍</div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '12px' }}>Our Commitment</h2>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px', opacity: 0.95 }}>"Recycle Today for a Better Tomorrow."</p>
          <p style={{ opacity: 0.85, maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            GRKMS is committed to providing safe, secure and environmentally responsible E-Waste management solutions while helping organizations achieve sustainability goals and regulatory compliance.
          </p>
        </motion.div>

      </div>

      {/* FOOTER */}
      <div style={{ background: '#0f172a', padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem', marginTop: '0' }}>
        © {new Date().getFullYear()} SAI INFOTECH. All rights reserved. · Basavanagudi, Bangalore
      </div>

    </div>
  )
}