import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiCpu, FiHardDrive, FiWifi, FiShield,
  FiMonitor, FiCloud, FiTool, FiServer,
  FiCheckCircle, FiPhone, FiMail, FiX, FiArrowRight,
  FiSpeaker, FiVideo, FiWind,
} from 'react-icons/fi'

const services = [
  { icon: FiCpu,       label: 'Chip Level Repair',       shortDesc: 'PCB, IC & SMD-level hardware repair',         iconBg: '#06b6d4', glowColor: '#06b6d4', details: { tagline: 'Precision motherboard & component-level repair', description: 'Our certified technicians perform advanced chip-level diagnostics and repair on all major laptop and desktop brands.', features: ['Motherboard diagnostics & BGA re-balling','SMD component replacement','GPU & CPU socket repair','Power-circuit fault tracing','Short-circuit & liquid-damage recovery','All brands: Dell, HP, Lenovo, Apple, ASUS'], turnaround: '24–72 hours', warranty: '3 months warranty' } },
  { icon: FiHardDrive, label: 'Data Recovery',           shortDesc: 'HDD/SSD recovery & backup solutions',          iconBg: '#3b82f6', glowColor: '#3b82f6', details: { tagline: 'Recover what matters most — fast & secure', description: 'We recover data from failed, formatted, or corrupted drives using professional-grade tools.', features: ['HDD platter & head recovery','SSD & NVMe NAND flash recovery','RAID 0/1/5/6 array reconstruction','Formatted/corrupted partition recovery','Cloud backup & disaster-recovery planning','Secure data destruction (DoD-standard wipe)'], turnaround: '24–48 hours', warranty: '100% data integrity guarantee' } },
  { icon: FiWifi,      label: 'Network Setup',           shortDesc: 'LAN/WAN, WiFi & enterprise connectivity',      iconBg: '#8b5cf6', glowColor: '#8b5cf6', details: { tagline: 'Enterprise-grade networking for every scale', description: 'From small-office WiFi to multi-site WAN infrastructure, we design, install, and manage networks that are fast, secure, and future-proof.', features: ['Structured cabling (CAT6/CAT6A)','Managed switches, routers & firewalls','Enterprise WiFi (Cisco, Ubiquiti, Ruckus)','SD-WAN & VPN setup','Network monitoring & 24/7 NOC support','ISP coordination & bandwidth management'], turnaround: '1–3 days installation', warranty: '1 year support' } },
  { icon: FiShield,    label: 'Security & Access',       shortDesc: 'CCTV surveillance & access control systems',   iconBg: '#22c55e', glowColor: '#22c55e', details: { tagline: 'Smart surveillance & access for total peace of mind', description: 'We supply, install, and maintain IP camera systems and biometric access solutions.', features: ['2MP–8MP IP & analog CCTV cameras','NVR/DVR setup with remote viewing','Biometric attendance & door-access systems','Video analytics & motion alerts','Integration with HR & ERP platforms','Preventive AMC for all security hardware'], turnaround: '1–2 days installation', warranty: '1 year hardware warranty' } },
  { icon: FiMonitor,   label: 'IT Solution',             shortDesc: 'IT sales, rentals & display infrastructure',   iconBg: '#f97316', glowColor: '#f97316', details: { tagline: 'Buy, rent, or lease — flexible IT for every budget', description: 'We offer short-term and long-term rentals on laptops, desktops, servers, projectors, and LED walls.', features: ['Laptop & desktop rental (daily/monthly/yearly)','Projector & LED display rental','Bulk procurement with OEM warranty','On-site setup & asset tracking','End-of-life buyback & disposal','Flexible upgrade cycles'], turnaround: 'Same-day delivery (Bengaluru)', warranty: 'Full replacement guarantee' } },
  { icon: FiCloud,     label: 'Cloud Products',          shortDesc: 'Cloud setup, migration & management',          iconBg: '#0ea5e9', glowColor: '#0ea5e9', details: { tagline: 'Accelerate your business with managed cloud', description: 'We help businesses migrate to and optimise AWS, Azure, and Google Cloud.', features: ['AWS, Azure & GCP migration','Microsoft 365 & Google Workspace setup','Cloud cost optimisation & FinOps','Backup-as-a-Service & DR planning','Identity management (Azure AD, SSO)','Managed cloud security & compliance'], turnaround: '1–4 weeks migration', warranty: 'Ongoing managed support' } },
  { icon: FiTool,      label: 'Annual Maintenance',      shortDesc: 'Comprehensive AMC & preventive support',       iconBg: '#ef4444', glowColor: '#ef4444', details: { tagline: 'Zero-downtime IT with proactive AMC plans', description: 'Our Annual Maintenance Contracts keep your entire IT estate running at peak performance.', features: ['Quarterly preventive maintenance visits','4-hour on-site response SLA','Patch management & OS updates','Antivirus & endpoint security monitoring','Hardware replacement pool','Monthly health reports & recommendations'], turnaround: '4-hour SLA response', warranty: 'Guaranteed uptime SLA' } },
  { icon: FiServer,    label: 'Server Maintenance',      shortDesc: 'Server upkeep, health & preventive maintenance',iconBg: '#ec4899', glowColor: '#ec4899', details: { tagline: 'Build the backbone your business deserves', description: 'From rack-and-stack to hyper-converged clusters, we design, deploy, and manage on-premise server and storage infrastructure.', features: ['Dell, HP & Lenovo server supply & racking','SAN/NAS storage configuration','Hyper-V & VMware virtualisation','Server room design & power management','Tape & disk backup solutions','Proactive hardware monitoring (SNMP/IPMI)'], turnaround: '2–5 days deployment', warranty: '1 year support contract' } },
  { icon: FiSpeaker,   label: 'AV Solutions',            shortDesc: 'Audio Visual systems & smart integration',     iconBg: '#6366f1', glowColor: '#6366f1', details: { tagline: 'Crystal-clear communication for modern workspaces', description: 'Complete audio-visual solutions for conference rooms, auditoriums, and boardrooms.', features: ['Video conferencing systems (Zoom Rooms, MS Teams)','Professional audio systems & microphones','Projectors & interactive displays','Digital signage & LED video walls','Conference room automation','Installation & ongoing support'], turnaround: '2–4 days installation', warranty: '1 year hardware warranty' } },
  { icon: FiVideo,     label: 'CCTV Solutions',          shortDesc: 'Advanced surveillance & monitoring systems',   iconBg: '#14b8a6', glowColor: '#14b8a6', details: { tagline: 'Comprehensive surveillance for complete security', description: 'State-of-the-art CCTV systems with AI-powered analytics, remote monitoring, and seamless integration.', features: ['4K IP & HD analog camera installation','NVR/DVR setup with cloud backup','AI-powered motion detection & alerts','Mobile app remote viewing','Night vision & weatherproof cameras','24/7 monitoring integration'], turnaround: '1–3 days installation', warranty: '2 year hardware warranty' } },
  { icon: FiWind,      label: 'Wind Power Control',      shortDesc: 'Industrial automation & renewable energy',     iconBg: '#10b981', glowColor: '#10b981', details: { tagline: 'Smart control systems for renewable energy', description: 'Advanced monitoring and control solutions for wind power installations, including SCADA systems.', features: ['Wind turbine monitoring & control','SCADA system integration','Real-time performance analytics','Remote diagnostics & alerts','Energy optimization systems','Preventive maintenance scheduling'], turnaround: '1–2 weeks deployment', warranty: '1 year support contract' } },
]

/* ─── Modal ─────────────────────────────────────────────────────── */
function ServiceModal({ service, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const h = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', h) }
  }, [onClose])
  const Icon = service.icon
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}>
      <motion.div initial={{ opacity: 0, scale: 0.82, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.82, y: 50 }}
        transition={{ type: 'spring', damping: 22, stiffness: 240 }}
        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
        style={{ background: 'linear-gradient(145deg,rgba(8,12,28,.99),rgba(12,18,40,.99))', border: `1px solid ${service.glowColor}50`, boxShadow: `0 0 80px ${service.glowColor}25,0 30px 70px rgba(0,0,0,.8)`, maxHeight: '88vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}>
        <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg,transparent,${service.glowColor},transparent)` }} />
        <div className="flex items-start justify-between p-6 pb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{ background: service.iconBg, boxShadow: `0 0 30px ${service.glowColor}55` }}>
              <Icon className="text-white w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{service.label}</h3>
              <p className="text-sm font-medium mt-0.5" style={{ color: service.glowColor }}>{service.details.tagline}</p>
            </div>
          </div>
          <button onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <FiX size={17} />
          </button>
        </div>
        <div className="px-6 pb-6 space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">{service.details.description}</p>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-2.5 font-semibold">What&apos;s Included</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.details.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <FiCheckCircle className="flex-shrink-0 mt-0.5" style={{ color: service.glowColor }} size={13} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: `${service.glowColor}15`, border: `1px solid ${service.glowColor}30`, color: service.glowColor }}>
              <FiTool size={12} /> Turnaround: {service.details.turnaround}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22c55e' }}>
              <FiShield size={12} /> {service.details.warranty}
            </div>
          </div>
          <div className="flex gap-3 pt-1">
            <a href="tel:+919945981999"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: `linear-gradient(135deg,${service.glowColor},${service.glowColor}cc)`, boxShadow: `0 4px 20px ${service.glowColor}40` }}>
              <FiPhone size={15} /> Call Now
            </a>
            <a href="#contact" onClick={onClose}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <FiMail size={15} /> Get Quote
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Orbital geometry ───────────────────────────────────────────── */
// Canvas size
const W = 1100
const H = 780
const CX = W / 2   // 550
const CY = H / 2   // 390

// Orbit radii (dots live on this ellipse)
const ORX = 310
const ORY = 240

// Card radii (cards live further out)
const CRX = 460
const CRY = 355

function getAngle(i, n) {
  return (i / n) * 2 * Math.PI - Math.PI / 2   // start from top
}

/* ─── Main export ────────────────────────────────────────────────── */
export default function Services() {
  const [activeModal, setActiveModal] = useState(null)
  const [isMobile, setIsMobile]       = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1100)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const n = services.length

  return (
    <>
      <section id="services" className="relative py-16 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 65%)' }} />

        <div className="relative z-10 mx-auto px-4">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold mb-4">
            What We Do
          </motion.p>

          {/* ══ DESKTOP: full orbital canvas ══ */}
          {!isMobile && (
            <div style={{ width: W, maxWidth: '100%', margin: '0 auto', position: 'relative', height: H }}>

              {/* ── SVG layer: rings + connector lines ── */}
              <svg
                style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible' }}
                width={W} height={H}>

                {/* Outer decorative ring */}
                <ellipse cx={CX} cy={CY} rx={ORX + 30} ry={ORY + 30}
                  fill="none" stroke="rgba(56,189,248,0.06)" strokeWidth="1" strokeDasharray="5 12" />

                {/* Main orbit ellipse (where dots sit) */}
                <ellipse cx={CX} cy={CY} rx={ORX} ry={ORY}
                  fill="none" stroke="rgba(14,165,233,0.25)" strokeWidth="1.5" />

                {/* Inner rings */}
                <circle cx={CX} cy={CY} r={105}
                  fill="none" stroke="rgba(14,165,233,0.10)" strokeWidth="1" strokeDasharray="3 8" />
                <circle cx={CX} cy={CY} r={78}
                  fill="none" stroke="rgba(14,165,233,0.07)" strokeWidth="1" />

                {/* Pulsing ring */}
                <circle cx={CX} cy={CY} r={92}
                  fill="none" stroke="rgba(14,165,233,0.14)" strokeWidth="2">
                  <animate attributeName="r"       values="82;100;82" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="opacity"  values="0.14;0.04;0.14" dur="4s" repeatCount="indefinite" />
                </circle>

                {/* Connector lines: center → dot on orbit */}
                {services.map((svc, i) => {
                  const a  = getAngle(i, n)
                  const dx = CX + Math.cos(a) * ORX
                  const dy = CY + Math.sin(a) * ORY
                  const isHov = false
                  return (
                    <line key={i}
                      x1={CX} y1={CY} x2={dx} y2={dy}
                      stroke='rgba(14,165,233,0.20)'
                      strokeWidth={0.9}
                      strokeDasharray='4 8'
                    />
                  )
                })}
              </svg>

              {/* ── Center hub ── */}
              <div style={{
                position: 'absolute',
                left: CX - 86, top: CY - 86,
                width: 172, height: 172,
                borderRadius: '50%',
                background: 'radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 70%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 5, pointerEvents: 'none',
              }}>
                <div style={{
                  position: 'absolute', inset: 8, borderRadius: '50%',
                  background: 'rgba(4,8,26,0.92)',
                  border: '1.5px solid rgba(14,165,233,0.38)',
                  backdropFilter: 'blur(14px)',
                  boxShadow: '0 0 50px rgba(14,165,233,0.20) inset,0 0 50px rgba(14,165,233,0.14)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  {/* HUD dots */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 8 }}>
                    {[0,1,2,3].map(k => (
                      <motion.div key={k}
                        style={{ width: 6, height: 6, borderRadius: '50%', background: '#38bdf8' }}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, delay: k * 0.35 }} />
                    ))}
                  </div>
                  <span style={{ color: '#fff', fontSize: 24, fontWeight: 900, lineHeight: 1 }}>Our</span>
                  <span style={{ color: '#38bdf8', fontSize: 24, fontWeight: 900, lineHeight: 1, marginTop: 2, textShadow: '0 0 24px rgba(56,189,248,0.7)' }}>Services</span>
                  <span style={{ color: '#475569', fontSize: 9, marginTop: 7, textAlign: 'center', lineHeight: 1.4, padding: '0 10px' }}>
                    Eleven specialized verticals<br />from hardware to cloud
                  </span>
                </div>
              </div>

              {/* ── Orbital dots (on ellipse) ── */}
              {services.map((_, i) => {
                const a  = getAngle(i, n)
                const dx = CX + Math.cos(a) * ORX
                const dy = CY + Math.sin(a) * ORY
                return (
                  <motion.div key={i}
                    style={{
                      position: 'absolute',
                      left: dx - 6, top: dy - 6,
                      width: 12, height: 12,
                      borderRadius: '50%',
                      background: 'radial-gradient(circle,#bae6fd,#0ea5e9)',
                      boxShadow: '0 0 10px #0ea5e9,0 0 22px #0ea5e9aa',
                      zIndex: 4, pointerEvents: 'none',
                    }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.22, ease: 'easeInOut' }}
                  />
                )
              })}

              {/* ── Service cards (on outer card ellipse) ── */}
              {services.map((svc, i) => {
                const Icon  = svc.icon
                const a     = getAngle(i, n)
                const cardW = 178
                const cardH = 110   // approximate

                // Card center on the outer ellipse
                const cx = CX + Math.cos(a) * CRX
                const cy = CY + Math.sin(a) * CRY

                // Offset card so it doesn't overlap center — anchor from card center
                const left = cx - cardW / 2
                const top  = cy - cardH / 2

                const isHov = false

                return (
                  <motion.div key={i}
                    style={{ position: 'absolute', left, top, width: cardW, zIndex: 3, cursor: 'pointer' }}
                    initial={{ opacity: 0, scale: 0.75 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.5, ease: 'easeOut' }}
                    onClick={() => setActiveModal(svc)}
                  >
                    <div style={{
                      borderRadius: 16,
                      padding: '12px 14px',
                      position: 'relative',
                      overflow: 'hidden',
                      background: 'rgba(6,11,30,0.82)',
                      border: '1px solid rgba(56,189,248,0.15)',
                      backdropFilter: 'blur(18px)',
                      boxShadow: '0 4px 18px rgba(0,0,0,0.48)',
                    }}>
                      {/* Icon + label row */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                          background: `linear-gradient(135deg,${svc.iconBg}ee,${svc.iconBg}77)`,
                          boxShadow: `0 2px 8px ${svc.glowColor}38`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transform: 'scale(1)',
                        }}>
                          <Icon style={{ color: '#fff', width: 15, height: 15 }} />
                        </div>
                        <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, lineHeight: 1.3 }}>
                          {svc.label}
                        </span>
                      </div>
                      {/* Description */}
                      <p style={{ color: '#64748b', fontSize: 10, lineHeight: 1.5, marginBottom: 8 }}>
                        {svc.shortDesc}
                      </p>
                      {/* CTA */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontWeight: 700, color: svc.glowColor }}>
                        <span>Explore details</span>
                        <FiArrowRight style={{ width: 9, height: 9 }} />
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* ══ MOBILE: circle header + 2-col grid ══ */}
          {isMobile && (
            <div className="max-w-2xl mx-auto">
              {/* Circle title */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                className="mx-auto mb-10 flex flex-col items-center justify-center text-center"
                style={{ width: 172, height: 172, borderRadius: '50%', background: 'rgba(4,8,26,0.9)', border: '1.5px solid rgba(14,165,233,0.32)', backdropFilter: 'blur(14px)', boxShadow: '0 0 50px rgba(14,165,233,0.15) inset,0 0 30px rgba(14,165,233,0.08)' }}>
                <div className="mb-2 grid grid-cols-2 gap-1">
                  {[0,1,2,3].map(k => (
                    <motion.div key={k} className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                      animate={{ opacity: [0.3,1,0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: k * 0.3 }} />
                  ))}
                </div>
                <span className="text-2xl font-black text-white">Our</span>
                <span className="text-2xl font-black" style={{ color: '#38bdf8', textShadow: '0 0 20px rgba(56,189,248,0.5)' }}>Services</span>
                <span className="text-[9px] text-slate-500 mt-1 px-3 text-center">11 specialized verticals</span>
              </motion.div>

              {/* 2-col grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                {services.map((svc, i) => {
                  const Icon = svc.icon
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.45 }}
                      onClick={() => setActiveModal(svc)}
                      className="relative rounded-2xl p-4 cursor-pointer"
                      style={{ background: 'rgba(6,11,30,0.82)', border: '1px solid rgba(56,189,248,0.14)', backdropFilter: 'blur(16px)' }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: `linear-gradient(135deg,${svc.iconBg}ee,${svc.iconBg}77)`, boxShadow: `0 4px 12px ${svc.glowColor}35` }}>
                          <Icon className="text-white w-5 h-5" />
                        </div>
                        <h3 className="text-white font-bold text-sm leading-tight">{svc.label}</h3>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-3">{svc.shortDesc}</p>
                      <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: svc.glowColor }}>
                        <span>Explore details</span>
                        <FiArrowRight size={11} />
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12">
            <p className="text-slate-400 text-sm mb-4">Can&apos;t find what you need? Talk to our experts.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+919945981999"
                className="px-8 py-3.5 rounded-xl font-bold text-white text-sm flex items-center gap-2 transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#0ea5e9,#06b6d4)', boxShadow: '0 4px 20px rgba(6,182,212,0.35)' }}>
                <FiPhone size={16} /> +91 99459 81999
              </a>
              <a href="#contact"
                className="px-8 py-3.5 rounded-xl font-bold text-white text-sm flex items-center gap-2 transition-all hover:bg-white/10"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                <FiMail size={16} /> Get a Free Quote
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {activeModal && <ServiceModal service={activeModal} onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </>
  )
}