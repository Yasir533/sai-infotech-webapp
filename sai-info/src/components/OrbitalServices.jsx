import React, { useState, useEffect, useRef } from 'react'
import { FiCpu, FiTool, FiCloud, FiShield, FiX } from 'react-icons/fi'

const SERVICES = [
  {
    id: 'repair',
    title: 'Repair & Recovery',
    subtitle: 'Fast & Reliable Support',
    icon: FiCpu,
    color: '#3b82f6',
    iconBg: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
    position: 'top',
    details: ['Chip-level PCB repair','Data recovery from HDD/SSD','Motherboard fault detection','GPU & CPU reballing','On-site & walk-in service'],
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Automation',
    subtitle: 'Smart Automation Solutions',
    icon: FiTool,
    color: '#22c55e',
    iconBg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'left',
    details: ['Annual maintenance contracts','PLC & automation systems','Preventive maintenance','Industrial control systems','SCADA integration'],
  },
  {
    id: 'network',
    title: 'Network & Cloud',
    subtitle: 'Secure & Scalable Networks',
    icon: FiCloud,
    color: '#38bdf8',
    iconBg: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    position: 'right',
    details: ['LAN/WAN infrastructure','Cloud migration (AWS/Azure/GCP)','Enterprise WiFi deployment','Firewall & VPN setup','Network monitoring'],
  },
  {
    id: 'security',
    title: 'Security & AV',
    subtitle: 'Advanced Protection Always On',
    icon: FiShield,
    color: '#22c55e',
    iconBg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'bottom',
    details: ['CCTV system installation','Access control & biometrics','AV conference room setup','Remote surveillance','Security audit & compliance'],
  },
]

const BADGES = [
  { label: '10+ Yrs', sub: 'Experience', pos: { left: '16%', top: '20%' } },
  { label: 'Trusted by', sub: '100+ Clients', pos: { left: '72%', top: '14%' } },
  { label: 'ISO Certified', sub: 'Process', pos: { left: '12%', top: '73%' } },
  { label: 'Pan India', sub: 'Service', pos: { left: '72%', top: '74%' } },
]

function AnimatedDot({ rx, ry, cx, cy, duration, startAngle, tiltDeg = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    let raf
    let t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const elapsed = (ts - t0) / 1000
      const deg = ((startAngle + (elapsed / duration) * 360) % 360)
      const rad = deg * Math.PI / 180
      // Apply tilt rotation around center
      const tiltRad = tiltDeg * Math.PI / 180
      const x0 = Math.cos(rad) * rx
      const y0 = Math.sin(rad) * ry
      // rotate point by tilt
      const x = cx + x0 * Math.cos(tiltRad) - y0 * Math.sin(tiltRad)
      const y = cy + x0 * Math.sin(tiltRad) + y0 * Math.cos(tiltRad)
      if (ref.current) {
        ref.current.setAttribute('cx', x)
        ref.current.setAttribute('cy', y)
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [rx, ry, cx, cy, duration, startAngle, tiltDeg])
  return (
    <circle ref={ref} r="5" fill="#22d3ee"
      style={{ filter: 'drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #06b6d4)' }} />
  )
}

export default function OrbitalServices() {
  const [selected, setSelected] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const S = isMobile ? 340 : 620
  const CX = S / 2
  const CY = S / 2

  // Ellipse radii for the rings
  const rings = isMobile
    ? [
        { rx: 155, ry: 62, tilt: -18, dash: '6 5', opacity: 0.35 },
        { rx: 140, ry: 52, tilt: 14,  dash: '4 6', opacity: 0.22 },
        { rx: 165, ry: 72, tilt: -4,  dash: '3 8', opacity: 0.16 },
        { rx: 105, ry: 105, tilt: 0,  dash: '5 5', opacity: 0.20 },
        { rx: 130, ry: 130, tilt: 0,  dash: '3 7', opacity: 0.12 },
      ]
    : [
        { rx: 285, ry: 114, tilt: -18, dash: '6 5', opacity: 0.35 },
        { rx: 265, ry: 94,  tilt: 14,  dash: '4 6', opacity: 0.22 },
        { rx: 300, ry: 130, tilt: -4,  dash: '3 8', opacity: 0.16 },
        { rx: 190, ry: 190, tilt: 0,   dash: '5 5', opacity: 0.20 },
        { rx: 215, ry: 215, tilt: 0,   dash: '3 7', opacity: 0.12 },
      ]

  // Card positions - outside the globe
  const dist = isMobile ? 148 : 272
  const cards = {
    top:    { x: CX,        y: CY - dist },
    left:   { x: CX - dist - (isMobile ? 10 : 20), y: CY },
    right:  { x: CX + dist + (isMobile ? 10 : 20), y: CY },
    bottom: { x: CX,        y: CY + dist },
  }

  const globeR = isMobile ? 105 : 195

  return (
    <div className="relative flex items-center justify-center w-full overflow-visible py-2 select-none">
      <div className="relative" style={{ width: S, height: S, maxWidth: '100%' }}>

        {/* SVG layer: rings + connectors + animated dots */}
        <svg className="absolute inset-0 pointer-events-none overflow-visible"
          width={S} height={S} viewBox={`0 0 ${S} ${S}`}>

          {/* Glow filter */}
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
          </defs>

          {/* Outer glow behind globe */}
          <circle cx={CX} cy={CY} r={globeR + (isMobile ? 30 : 60)}
            fill="url(#globeGlow)" />

          {/* Rings */}
          {rings.map((r, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
              fill="none"
              stroke={`rgba(34,211,238,${r.opacity})`}
              strokeWidth={i < 2 ? "1.5" : "1"}
              strokeDasharray={r.dash}
              transform={`rotate(${r.tilt},${CX},${CY})`} />
          ))}

          {/* Connector lines */}
          {SERVICES.map((s) => {
            const p = cards[s.position]
            return (
              <line key={s.id}
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke="rgba(34,211,238,0.15)" strokeWidth="1" strokeDasharray="4 4" />
            )
          })}

          {/* Animated dots on rings */}
          <AnimatedDot rx={rings[0].rx} ry={rings[0].ry} cx={CX} cy={CY} duration={11} startAngle={30}  tiltDeg={rings[0].tilt} />
          <AnimatedDot rx={rings[1].rx} ry={rings[1].ry} cx={CX} cy={CY} duration={15} startAngle={150} tiltDeg={rings[1].tilt} />
          <AnimatedDot rx={rings[2].rx} ry={rings[2].ry} cx={CX} cy={CY} duration={19} startAngle={270} tiltDeg={rings[2].tilt} />
          <AnimatedDot rx={rings[3].rx} ry={rings[3].ry} cx={CX} cy={CY} duration={8}  startAngle={80}  tiltDeg={0} />
          <AnimatedDot rx={rings[0].rx} ry={rings[0].ry} cx={CX} cy={CY} duration={11} startAngle={210} tiltDeg={rings[0].tilt} />

          {/* Small glowing connector dots at card ends */}
          {SERVICES.map((s) => {
            const p = cards[s.position]
            return <circle key={s.id+'-dot'} cx={p.x} cy={p.y} r="3"
              fill={s.color} style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
          })}
        </svg>

        {/* ── GLOBE ── */}
        <div className="absolute z-10 rounded-full flex flex-col items-center justify-center text-center overflow-hidden"
          style={{
            width: globeR * 2, height: globeR * 2,
            left: CX, top: CY,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(ellipse at 38% 32%, #0d2d54 0%, #071528 55%, #030d1a 100%)',
            boxShadow: `0 0 80px rgba(34,211,238,0.3), 0 0 160px rgba(34,211,238,0.1), inset 0 0 40px rgba(34,211,238,0.06)`,
            border: '1.5px solid rgba(34,211,238,0.35)',
          }}>

          {/* Grid SVG inside globe */}
          <svg className="absolute inset-0 opacity-40 pointer-events-none"
            width="100%" height="100%" viewBox="0 0 200 200">
            {/* Latitude lines */}
            {[30,55,80,100,120,145,170].map(y => (
              <line key={y} x1="5" y1={y} x2="195" y2={y}
                stroke="#22d3ee" strokeWidth="0.4" />
            ))}
            {/* Longitude ellipses */}
            {[15,35,55,75,100].map((rx2, i) => (
              <ellipse key={i} cx="100" cy="100" rx={rx2} ry="95"
                fill="none" stroke="#22d3ee" strokeWidth="0.4" />
            ))}
            {/* Continent shapes */}
            <ellipse cx="78"  cy="82"  rx="22" ry="16" fill="rgba(34,211,238,0.18)" />
            <ellipse cx="122" cy="75"  rx="26" ry="18" fill="rgba(34,211,238,0.15)" />
            <ellipse cx="138" cy="118" rx="18" ry="12" fill="rgba(34,211,238,0.12)" />
            <ellipse cx="68"  cy="128" rx="16" ry="11" fill="rgba(34,211,238,0.11)" />
            <ellipse cx="105" cy="148" rx="14" ry="9"  fill="rgba(34,211,238,0.09)" />
          </svg>

          {/* Center glow */}
          <div className="absolute inset-0 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(34,211,238,0.08) 0%, transparent 65%)' }} />

          {/* Text */}
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-white font-extrabold tracking-wide"
              style={{ fontSize: isMobile ? '1.15rem' : '2.1rem', lineHeight: 1.1 }}>
              Our
            </span>
            <span className="text-cyan-400 font-extrabold tracking-wide"
              style={{ fontSize: isMobile ? '1.25rem' : '2.25rem', lineHeight: 1.1 }}>
              Services
            </span>
            <div className="bg-cyan-400 rounded-full mt-2 mb-2"
              style={{ width: isMobile ? 36 : 64, height: 3 }} />
            <span className="text-gray-300 text-center leading-snug px-3"
              style={{ fontSize: isMobile ? '0.55rem' : '0.8rem', maxWidth: isMobile ? 100 : 180 }}>
              Drop-off, Walk-in,<br />On-site & Pickup.
            </span>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        {SERVICES.map((s) => {
          const pos = cards[s.position]
          const Icon = s.icon
          const isTopBottom = s.position === 'top' || s.position === 'bottom'
          const cardW = isMobile ? 110 : 200

          return (
            <div key={s.id}
              className="absolute z-20 cursor-pointer"
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)', width: cardW }}
              onClick={() => setSelected(s)}>
              <div className="rounded-xl flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:brightness-125"
                style={{
                  background: 'rgba(4,14,32,0.88)',
                  border: `1px solid ${s.color}44`,
                  padding: isMobile ? '7px 9px' : '12px 14px',
                  boxShadow: `0 0 24px ${s.color}22, 0 4px 20px rgba(0,0,0,0.4)`,
                  backdropFilter: 'blur(14px)',
                }}>
                {/* Icon */}
                <div className="rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: s.iconBg,
                    width: isMobile ? 36 : 58,
                    height: isMobile ? 36 : 58,
                    boxShadow: `0 0 16px ${s.color}88`,
                    minWidth: isMobile ? 36 : 58,
                  }}>
                  <Icon style={{ color: '#fff', width: isMobile ? 17 : 27, height: isMobile ? 17 : 27 }} />
                </div>
                <div>
                  <p className="text-white font-bold leading-tight"
                    style={{ fontSize: isMobile ? '0.62rem' : '0.95rem' }}>
                    {s.title}
                  </p>
                  <p style={{ color: s.color, fontSize: isMobile ? '0.52rem' : '0.74rem', marginTop: 2 }}>
                    {s.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* ── FLOATING BADGES ── */}
        {BADGES.map((b) => (
          <div key={b.label}
            className="absolute z-30 pointer-events-none"
            style={{ ...b.pos, transform: 'translate(-50%,-50%)' }}>
            <div className="rounded-lg text-center"
              style={{
                background: 'rgba(4,14,32,0.82)',
                border: '1px solid rgba(34,211,238,0.3)',
                padding: isMobile ? '4px 8px' : '6px 13px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 0 16px rgba(34,211,238,0.12)',
              }}>
              <p className="font-bold text-cyan-400"
                style={{ fontSize: isMobile ? '0.55rem' : '0.78rem', lineHeight: 1.25 }}>
                {b.label}
              </p>
              <p className="text-gray-300"
                style={{ fontSize: isMobile ? '0.48rem' : '0.68rem', lineHeight: 1.25 }}>
                {b.sub}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}>
          <div className="relative rounded-2xl p-6 md:p-8 w-full max-w-md"
            style={{
              background: '#05101f',
              border: `1px solid ${selected.color}55`,
              boxShadow: `0 0 60px ${selected.color}22`,
            }}
            onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelected(null)}>
              <FiX style={{ width: 20, height: 20 }} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-2xl flex items-center justify-center"
                style={{
                  background: selected.iconBg, width: 56, height: 56,
                  boxShadow: `0 0 20px ${selected.color}66`,
                }}>
                <selected.icon style={{ color: '#fff', width: 28, height: 28 }} />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{selected.title}</h3>
                <p style={{ color: selected.color }} className="text-sm mt-1">{selected.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {selected.details.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: selected.color }} />
                  <span className="text-gray-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}