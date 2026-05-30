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
  { label: '10+ Yrs',     sub: 'Experience',    pos: { left: '16%', top: '20%' } },
  { label: 'Trusted by',  sub: '100+ Clients',  pos: { left: '72%', top: '14%' } },
  { label: 'ISO Certified', sub: 'Process',     pos: { left: '12%', top: '73%' } },
  { label: 'Pan India',   sub: 'Service',       pos: { left: '72%', top: '74%' } },
]

function AnimatedDot({ rx, ry, cx, cy, duration, startAngle, tiltDeg = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    let raf, t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const deg = ((startAngle + ((ts - t0) / 1000 / duration) * 360) % 360)
      const rad = deg * Math.PI / 180
      const tr = tiltDeg * Math.PI / 180
      const x0 = Math.cos(rad) * rx
      const y0 = Math.sin(rad) * ry
      const x = cx + x0 * Math.cos(tr) - y0 * Math.sin(tr)
      const y = cy + x0 * Math.sin(tr) + y0 * Math.cos(tr)
      if (ref.current) { ref.current.setAttribute('cx', x); ref.current.setAttribute('cy', y) }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [rx, ry, cx, cy, duration, startAngle, tiltDeg])
  return <circle ref={ref} r="5" fill="#22d3ee"
    style={{ filter: 'drop-shadow(0 0 6px #22d3ee) drop-shadow(0 0 12px #06b6d4)' }} />
}

// Real globe SVG — sphere with curved lat/lon lines + continent blobs
function GlobeGraphic({ size }) {
  const R = size / 2
  const cx = R, cy = R
  // latitude lines (curved arcs projected onto sphere)
  const latLines = [-60, -30, 0, 30, 60]
  const lonCount = 9 // longitude lines

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 pointer-events-none" style={{ borderRadius: '50%' }}>
      <defs>
        <radialGradient id="sphereGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%"   stopColor="#0d3060" />
          <stop offset="45%"  stopColor="#071a38" />
          <stop offset="100%" stopColor="#020c1b" />
        </radialGradient>
        <radialGradient id="specular" cx="32%" cy="28%" r="45%">
          <stop offset="0%"   stopColor="rgba(100,200,255,0.18)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <clipPath id="sphereClip">
          <circle cx={cx} cy={cy} r={R - 1} />
        </clipPath>
      </defs>

      {/* Ocean base */}
      <circle cx={cx} cy={cy} r={R - 1} fill="url(#sphereGrad)" />

      <g clipPath="url(#sphereClip)">
        {/* Latitude lines — ellipses flattened by cos(lat) */}
        {latLines.map(lat => {
          const latRad = lat * Math.PI / 180
          const ry2 = Math.abs(Math.cos(latRad)) * R * 0.18
          const yPos = cy + Math.sin(latRad) * (R - 2)
          return ry2 > 1 ? (
            <ellipse key={lat} cx={cx} cy={yPos} rx={R - 2} ry={ry2}
              fill="none" stroke="rgba(34,211,238,0.35)" strokeWidth="0.7" />
          ) : null
        })}
        {/* Equator slightly brighter */}
        <ellipse cx={cx} cy={cy} rx={R - 2} ry={R * 0.18}
          fill="none" stroke="rgba(34,211,238,0.55)" strokeWidth="1" />

        {/* Longitude lines — vertical ellipses rotated */}
        {Array.from({ length: lonCount }).map((_, i) => {
          const angle = (i / lonCount) * 180
          return (
            <ellipse key={i} cx={cx} cy={cy} rx={R * 0.18} ry={R - 2}
              fill="none" stroke="rgba(34,211,238,0.28)" strokeWidth="0.7"
              transform={`rotate(${angle},${cx},${cy})`} />
          )
        })}

        {/* Continent blobs — styled like real continents */}
        {/* Americas */}
        <ellipse cx={cx * 0.62} cy={cy * 0.72} rx={R * 0.13} ry={R * 0.22}
          fill="rgba(0,180,220,0.22)" stroke="rgba(34,211,238,0.4)" strokeWidth="0.5" />
        {/* Europe/Africa */}
        <ellipse cx={cx * 1.05} cy={cy * 0.82} rx={R * 0.11} ry={R * 0.28}
          fill="rgba(0,180,220,0.20)" stroke="rgba(34,211,238,0.38)" strokeWidth="0.5" />
        {/* Asia */}
        <ellipse cx={cx * 1.30} cy={cy * 0.68} rx={R * 0.20} ry={R * 0.18}
          fill="rgba(0,180,220,0.22)" stroke="rgba(34,211,238,0.40)" strokeWidth="0.5" />
        {/* Australia */}
        <ellipse cx={cx * 1.35} cy={cy * 1.25} rx={R * 0.10} ry={R * 0.08}
          fill="rgba(0,180,220,0.18)" stroke="rgba(34,211,238,0.35)" strokeWidth="0.5" />
        {/* Antarctica hint */}
        <ellipse cx={cx} cy={cy * 1.82} rx={R * 0.55} ry={R * 0.08}
          fill="rgba(180,230,255,0.12)" />

        {/* Specular highlight */}
        <circle cx={cx} cy={cy} r={R - 1} fill="url(#specular)" />

        {/* Atmosphere rim */}
        <circle cx={cx} cy={cy} r={R - 2}
          fill="none" stroke="rgba(34,211,238,0.5)" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r={R - 1}
          fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="4" />
      </g>
    </svg>
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

  // ← smaller globe
  const globeR = isMobile ? 88 : 155

  const rings = isMobile
    ? [
        { rx: 152, ry: 60,  tilt: -18, dash: '6 5', opacity: 0.35 },
        { rx: 138, ry: 50,  tilt: 14,  dash: '4 6', opacity: 0.22 },
        { rx: 162, ry: 70,  tilt: -4,  dash: '3 8', opacity: 0.16 },
        { rx: 102, ry: 102, tilt: 0,   dash: '5 5', opacity: 0.20 },
        { rx: 125, ry: 125, tilt: 0,   dash: '3 7', opacity: 0.12 },
      ]
    : [
        { rx: 282, ry: 112, tilt: -18, dash: '6 5', opacity: 0.35 },
        { rx: 262, ry: 92,  tilt: 14,  dash: '4 6', opacity: 0.22 },
        { rx: 298, ry: 128, tilt: -4,  dash: '3 8', opacity: 0.16 },
        { rx: 188, ry: 188, tilt: 0,   dash: '5 5', opacity: 0.20 },
        { rx: 212, ry: 212, tilt: 0,   dash: '3 7', opacity: 0.12 },
      ]

  const dist = isMobile ? 145 : 265
  const cards = {
    top:    { x: CX,            y: CY - dist },
    left:   { x: CX - dist - (isMobile ? 8 : 18), y: CY },
    right:  { x: CX + dist + (isMobile ? 8 : 18), y: CY },
    bottom: { x: CX,            y: CY + dist },
  }

  return (
    <div className="relative flex items-center justify-center w-full overflow-visible py-2 select-none">
      <div className="relative" style={{ width: S, height: S, maxWidth: '100%' }}>

        {/* SVG: rings + connectors + dots */}
        <svg className="absolute inset-0 pointer-events-none overflow-visible"
          width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
          <defs>
            <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(34,211,238,0.28)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
          </defs>

          {/* Soft outer glow */}
          <circle cx={CX} cy={CY} r={globeR + (isMobile ? 40 : 72)} fill="url(#glowGrad)" />

          {/* Orbit rings */}
          {rings.map((r, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
              fill="none"
              stroke={`rgba(34,211,238,${r.opacity})`}
              strokeWidth={i < 2 ? "1.5" : "1"}
              strokeDasharray={r.dash}
              transform={`rotate(${r.tilt},${CX},${CY})`} />
          ))}

          {/* Connector lines */}
          {SERVICES.map(s => {
            const p = cards[s.position]
            return <line key={s.id} x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="rgba(34,211,238,0.13)" strokeWidth="1" strokeDasharray="4 4" />
          })}

          {/* Animated dots */}
          <AnimatedDot rx={rings[0].rx} ry={rings[0].ry} cx={CX} cy={CY} duration={11} startAngle={30}  tiltDeg={rings[0].tilt} />
          <AnimatedDot rx={rings[1].rx} ry={rings[1].ry} cx={CX} cy={CY} duration={15} startAngle={150} tiltDeg={rings[1].tilt} />
          <AnimatedDot rx={rings[2].rx} ry={rings[2].ry} cx={CX} cy={CY} duration={19} startAngle={270} tiltDeg={rings[2].tilt} />
          <AnimatedDot rx={rings[3].rx} ry={rings[3].ry} cx={CX} cy={CY} duration={8}  startAngle={80}  tiltDeg={0} />
          <AnimatedDot rx={rings[0].rx} ry={rings[0].ry} cx={CX} cy={CY} duration={11} startAngle={210} tiltDeg={rings[0].tilt} />

          {/* Dot at each card anchor */}
          {SERVICES.map(s => {
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
            boxShadow: `0 0 60px rgba(34,211,238,0.35), 0 0 120px rgba(34,211,238,0.12), inset 0 0 30px rgba(34,211,238,0.06)`,
            borderRadius: '50%',
          }}>
          <GlobeGraphic size={globeR * 2} />

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-white font-extrabold tracking-wide drop-shadow-lg"
              style={{ fontSize: isMobile ? '1rem' : '1.7rem', lineHeight: 1.1 }}>
              Our
            </span>
            <span className="text-cyan-400 font-extrabold tracking-wide drop-shadow-lg"
              style={{ fontSize: isMobile ? '1.1rem' : '1.85rem', lineHeight: 1.1 }}>
              Services
            </span>
            <div className="bg-cyan-400 rounded-full mt-1 mb-1"
              style={{ width: isMobile ? 28 : 50, height: 2.5 }} />
            <span className="text-gray-300 text-center leading-snug px-2 drop-shadow"
              style={{ fontSize: isMobile ? '0.48rem' : '0.68rem', maxWidth: isMobile ? 88 : 150 }}>
              Drop-off, Walk-in,<br />On-site & Pickup.
            </span>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        {SERVICES.map(s => {
          const pos = cards[s.position]
          const Icon = s.icon
          const cardW = isMobile ? 110 : 200
          return (
            <div key={s.id} className="absolute z-20 cursor-pointer"
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
                <div className="rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: s.iconBg,
                    width: isMobile ? 36 : 58, height: isMobile ? 36 : 58,
                    minWidth: isMobile ? 36 : 58,
                    boxShadow: `0 0 16px ${s.color}88`,
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
        {BADGES.map(b => (
          <div key={b.label} className="absolute z-30 pointer-events-none"
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
            onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelected(null)}>
              <FiX style={{ width: 20, height: 20 }} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-2xl flex items-center justify-center"
                style={{ background: selected.iconBg, width: 56, height: 56, boxShadow: `0 0 20px ${selected.color}66` }}>
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