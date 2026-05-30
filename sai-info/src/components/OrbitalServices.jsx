import React, { useState, useEffect, useRef } from 'react'
import { FiCpu, FiTool, FiCloud, FiShield, FiX } from 'react-icons/fi'

const SERVICES = [
  {
    id: 'repair',
    title: 'Repair & Recovery',
    subtitle: 'Fast & Reliable Support',
    icon: FiCpu,
    color: '#3b82f6',
    bg: 'linear-gradient(135deg,#1e3a8a,#1d4ed8)',
    position: 'top',
    details: [
      'Chip-level PCB repair',
      'Data recovery from HDD/SSD',
      'Motherboard fault detection',
      'GPU & CPU reballing',
      'On-site & walk-in service',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Automation',
    subtitle: 'Smart Automation Solutions',
    icon: FiTool,
    color: '#22c55e',
    bg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'left',
    details: [
      'Annual maintenance contracts',
      'PLC & automation systems',
      'Preventive maintenance',
      'Industrial control systems',
      'SCADA integration',
    ],
  },
  {
    id: 'network',
    title: 'Network & Cloud',
    subtitle: 'Secure & Scalable Networks',
    icon: FiCloud,
    color: '#38bdf8',
    bg: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    position: 'right',
    details: [
      'LAN/WAN infrastructure',
      'Cloud migration (AWS/Azure/GCP)',
      'Enterprise WiFi deployment',
      'Firewall & VPN setup',
      'Network monitoring',
    ],
  },
  {
    id: 'security',
    title: 'Security & AV',
    subtitle: 'Advanced Protection Always On',
    icon: FiShield,
    color: '#22c55e',
    bg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'bottom',
    details: [
      'CCTV system installation',
      'Access control & biometrics',
      'AV conference room setup',
      'Remote surveillance',
      'Security audit & compliance',
    ],
  },
]

const BADGES = [
  { label: '10+ Yrs', sub: 'Experience', x: '18%', y: '22%' },
  { label: 'Trusted by', sub: '100+ Clients', x: '74%', y: '16%' },
  { label: 'ISO Certified', sub: 'Process', x: '14%', y: '72%' },
  { label: 'Pan India', sub: 'Service', x: '74%', y: '74%' },
]

// Animated orbit dot
function OrbitDot({ rx, ry, cx, cy, duration, startAngle = 0 }) {
  const ref = useRef(null)
  useEffect(() => {
    let frame
    let start = null
    const animate = (ts) => {
      if (!start) start = ts
      const elapsed = (ts - start) / 1000
      const angle = ((startAngle + (elapsed / duration) * 360) % 360) * (Math.PI / 180)
      const x = cx + Math.cos(angle) * rx
      const y = cy + Math.sin(angle) * ry
      if (ref.current) {
        ref.current.setAttribute('cx', x)
        ref.current.setAttribute('cy', y)
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [rx, ry, cx, cy, duration, startAngle])

  return <circle ref={ref} r="4" fill="#22d3ee" style={{ filter: 'drop-shadow(0 0 4px #22d3ee)' }} />
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

  const SIZE = isMobile ? 320 : 600
  const CX = SIZE / 2
  const CY = SIZE / 2

  // Card positions: top, left, right, bottom
  const cardPositions = {
    top:    { x: CX,            y: CY - (isMobile ? 128 : 240) },
    left:   { x: CX - (isMobile ? 128 : 245), y: CY },
    right:  { x: CX + (isMobile ? 128 : 245), y: CY },
    bottom: { x: CX,            y: CY + (isMobile ? 128 : 240) },
  }

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden py-4 md:py-8 select-none">
      <div className="relative" style={{ width: SIZE, height: SIZE, maxWidth: '100%' }}>

        {/* SVG: rings + orbit dots + connector lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          overflow="visible"
        >
          {/* Outer rings — elliptical to look 3D */}
          <ellipse cx={CX} cy={CY} rx={isMobile ? 148 : 280} ry={isMobile ? 60 : 110}
            fill="none" stroke="rgba(34,211,238,0.20)" strokeWidth="1.5"
            strokeDasharray="6 5" transform={`rotate(-20,${CX},${CY})`} />
          <ellipse cx={CX} cy={CY} rx={isMobile ? 138 : 260} ry={isMobile ? 50 : 90}
            fill="none" stroke="rgba(34,211,238,0.13)" strokeWidth="1"
            strokeDasharray="4 6" transform={`rotate(15,${CX},${CY})`} />
          <ellipse cx={CX} cy={CY} rx={isMobile ? 155 : 295} ry={isMobile ? 70 : 130}
            fill="none" stroke="rgba(56,189,248,0.10)" strokeWidth="1"
            strokeDasharray="3 8" transform={`rotate(-5,${CX},${CY})`} />
          {/* Circular rings */}
          <circle cx={CX} cy={CY} r={isMobile ? 80 : 150}
            fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth="1" strokeDasharray="5 5" />
          <circle cx={CX} cy={CY} r={isMobile ? 110 : 205}
            fill="none" stroke="rgba(34,211,238,0.10)" strokeWidth="1" strokeDasharray="3 7" />

          {/* Connector lines from center to cards */}
          {SERVICES.map((s) => {
            const p = cardPositions[s.position]
            return (
              <line key={s.id}
                x1={CX} y1={CY} x2={p.x} y2={p.y}
                stroke="rgba(34,211,238,0.18)" strokeWidth="1" strokeDasharray="4 4" />
            )
          })}

          {/* Animated orbit dots */}
          <OrbitDot rx={isMobile ? 148 : 280} ry={isMobile ? 60 : 110}
            cx={CX} cy={CY} duration={12} startAngle={0} />
          <OrbitDot rx={isMobile ? 138 : 260} ry={isMobile ? 50 : 90}
            cx={CX} cy={CY} duration={16} startAngle={120} />
          <OrbitDot rx={isMobile ? 155 : 295} ry={isMobile ? 70 : 130}
            cx={CX} cy={CY} duration={20} startAngle={240} />
          <OrbitDot rx={isMobile ? 80 : 150} ry={isMobile ? 80 : 150}
            cx={CX} cy={CY} duration={9} startAngle={60} />
        </svg>

        {/* Globe CENTER */}
        <div
          className="absolute z-10 rounded-full flex flex-col items-center justify-center text-center"
          style={{
            width: isMobile ? 130 : 240,
            height: isMobile ? 130 : 240,
            left: CX,
            top: CY,
            transform: 'translate(-50%,-50%)',
            background: 'radial-gradient(ellipse at 35% 35%, #0f2f5a 0%, #050f1e 70%)',
            boxShadow: '0 0 60px rgba(34,211,238,0.25), 0 0 120px rgba(34,211,238,0.08), inset 0 0 30px rgba(34,211,238,0.05)',
            border: '1px solid rgba(34,211,238,0.3)',
          }}
        >
          {/* Globe grid lines SVG overlay */}
          <svg
            className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
            width="100%" height="100%"
            viewBox="0 0 240 240"
            style={{ borderRadius: '50%' }}
          >
            {/* Latitude lines */}
            {[40, 80, 120, 160, 200].map(y => (
              <line key={y} x1="20" y1={y} x2="220" y2={y}
                stroke="#22d3ee" strokeWidth="0.5" opacity="0.6" />
            ))}
            {/* Longitude curves */}
            {[60, 90, 120, 150, 180].map(x => (
              <ellipse key={x} cx="120" cy="120" rx={x - 60} ry="100"
                fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
            ))}
            {/* Continent blobs */}
            <ellipse cx="90" cy="100" rx="25" ry="18" fill="rgba(34,211,238,0.15)" />
            <ellipse cx="140" cy="90" rx="30" ry="20" fill="rgba(34,211,238,0.12)" />
            <ellipse cx="155" cy="135" rx="20" ry="14" fill="rgba(34,211,238,0.10)" />
            <ellipse cx="80" cy="145" rx="18" ry="12" fill="rgba(34,211,238,0.09)" />
          </svg>

          <h2 className="text-white font-extrabold leading-none relative z-10"
            style={{ fontSize: isMobile ? '1.1rem' : '2rem' }}>
            Our
            <span className="block text-cyan-400" style={{ fontSize: isMobile ? '1.2rem' : '2.1rem' }}>
              Services
            </span>
          </h2>
          <div className="bg-cyan-400 rounded-full my-1 relative z-10"
            style={{ width: isMobile ? 30 : 56, height: 3 }} />
          <p className="text-gray-300 leading-snug relative z-10 px-2"
            style={{ fontSize: isMobile ? '0.55rem' : '0.78rem', maxWidth: isMobile ? 90 : 160 }}>
            Drop-off, Walk-in,<br />On-site & Pickup.
          </p>
        </div>

        {/* SERVICE CARDS */}
        {SERVICES.map((service) => {
          const pos = cardPositions[service.position]
          const Icon = service.icon
          const isTopBottom = service.position === 'top' || service.position === 'bottom'
          const cardW = isMobile ? 90 : 170
          const cardH = isMobile ? 64 : 'auto'

          return (
            <div
              key={service.id}
              className="absolute z-20 cursor-pointer"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%,-50%)',
                width: cardW,
              }}
              onClick={() => setSelected(service)}
            >
              <div
                className="rounded-xl border flex items-center gap-2 transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(6,17,31,0.92)',
                  borderColor: service.color + '55',
                  padding: isMobile ? '6px 8px' : '10px 14px',
                  boxShadow: `0 0 20px ${service.color}22`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="rounded-lg flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: service.bg,
                    width: isMobile ? 28 : 44,
                    height: isMobile ? 28 : 44,
                    boxShadow: `0 0 12px ${service.color}66`,
                  }}
                >
                  <Icon style={{ color: '#fff', width: isMobile ? 14 : 22, height: isMobile ? 14 : 22 }} />
                </div>
                <div>
                  <p className="text-white font-bold leading-tight"
                    style={{ fontSize: isMobile ? '0.58rem' : '0.9rem' }}>
                    {service.title}
                  </p>
                  <p className="text-gray-400 leading-tight mt-0.5"
                    style={{ fontSize: isMobile ? '0.5rem' : '0.72rem' }}>
                    {service.subtitle}
                  </p>
                </div>
              </div>
            </div>
          )
        })}

        {/* FLOATING BADGES */}
        {BADGES.map((badge) => (
          <div
            key={badge.label}
            className="absolute z-30 pointer-events-none"
            style={{ left: badge.x, top: badge.y, transform: 'translate(-50%,-50%)' }}
          >
            <div
              className="rounded-lg text-center"
              style={{
                background: 'rgba(6,17,31,0.85)',
                border: '1px solid rgba(34,211,238,0.25)',
                padding: isMobile ? '3px 6px' : '5px 10px',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 0 12px rgba(34,211,238,0.1)',
              }}
            >
              <p className="text-cyan-400 font-bold"
                style={{ fontSize: isMobile ? '0.5rem' : '0.75rem', lineHeight: 1.2 }}>
                {badge.label}
              </p>
              <p className="text-gray-300"
                style={{ fontSize: isMobile ? '0.45rem' : '0.65rem', lineHeight: 1.2 }}>
                {badge.sub}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative rounded-2xl p-6 md:p-8 w-full max-w-md"
            style={{
              background: '#06111f',
              border: '1px solid rgba(34,211,238,0.3)',
              boxShadow: '0 0 60px rgba(0,255,255,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelected(null)}
            >
              <FiX style={{ width: 20, height: 20 }} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{
                  background: selected.bg,
                  width: 56, height: 56,
                  boxShadow: `0 0 20px ${selected.color}66`,
                }}
              >
                <selected.icon style={{ color: '#fff', width: 28, height: 28 }} />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{selected.title}</h3>
                <p className="text-cyan-400 text-sm mt-1">{selected.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {selected.details.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
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