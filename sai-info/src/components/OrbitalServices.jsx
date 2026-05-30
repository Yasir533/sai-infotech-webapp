import React, { useState, useEffect, useRef, useCallback } from 'react'
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
  { label: '10+ Yrs',      sub: 'Experience',   pos: { left: '17%', top: '21%' } },
  { label: 'Trusted by',   sub: '100+ Clients', pos: { left: '73%', top: '15%' } },
  { label: 'ISO Certified',sub: 'Process',      pos: { left: '13%', top: '74%' } },
  { label: 'Pan India',    sub: 'Service',      pos: { left: '73%', top: '75%' } },
]

/* ── Single shared RAF loop for all dots ── */
function useOrbitDots(dots, CX, CY) {
  const refs = useRef([])
  useEffect(() => {
    let raf, t0 = null
    const step = (ts) => {
      if (!t0) t0 = ts
      const elapsed = (ts - t0) / 1000
      dots.forEach(({ rx, ry, duration, startAngle, tiltDeg = 0 }, i) => {
        const el = refs.current[i]
        if (!el) return
        const deg = ((startAngle + (elapsed / duration) * 360) % 360)
        const rad = deg * Math.PI / 180
        const tr  = tiltDeg * Math.PI / 180
        const x0  = Math.cos(rad) * rx
        const y0  = Math.sin(rad) * ry
        el.setAttribute('cx', CX + x0 * Math.cos(tr) - y0 * Math.sin(tr))
        el.setAttribute('cy', CY + x0 * Math.sin(tr) + y0 * Math.cos(tr))
      })
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [dots, CX, CY])
  return refs
}

/* ── Realistic SVG globe ── */
function GlobeGraphic({ size }) {
  const R  = size / 2
  const cx = R, cy = R
  const lats = [-65, -40, -15, 15, 40, 65]
  const lons = 10

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 pointer-events-none" style={{ borderRadius: '50%' }}>
      <defs>
        {/* Deep ocean gradient */}
        <radialGradient id="ocean" cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#f8fbff" />
          <stop offset="45%"  stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfd9f6" />
        </radialGradient>
        {/* Specular highlight */}
        <radialGradient id="spec" cx="30%" cy="25%" r="40%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        {/* Atmosphere glow */}
        <radialGradient id="atm" cx="50%" cy="50%" r="50%">
          <stop offset="85%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(11,116,209,0.18)" />
        </radialGradient>
        <clipPath id="sClip"><circle cx={cx} cy={cy} r={R - 1} /></clipPath>
      </defs>

      {/* Ocean */}
      <circle cx={cx} cy={cy} r={R - 1} fill="url(#ocean)" />

      <g clipPath="url(#sClip)">
        {/* Latitude lines — ellipses that flatten toward poles */}
        {lats.map(lat => {
          const φ   = lat * Math.PI / 180
          const ry2 = Math.abs(Math.cos(φ)) * R * 0.22
          const yc  = cy + Math.sin(φ) * (R * 0.97)
          return <ellipse key={lat} cx={cx} cy={yc} rx={R * 0.97} ry={ry2}
            fill="none" stroke="rgba(11,116,209,0.26)" strokeWidth="0.65" />
        })}
        {/* Equator brighter */}
        <ellipse cx={cx} cy={cy} rx={R * 0.97} ry={R * 0.22}
          fill="none" stroke="rgba(11,116,209,0.45)" strokeWidth="1.1" />

        {/* Longitude lines — thin vertical ellipses rotated */}
        {Array.from({ length: lons }).map((_, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={R * 0.22} ry={R * 0.97}
            fill="none" stroke="rgba(11,116,209,0.18)" strokeWidth="0.6"
            transform={`rotate(${i * (180 / lons)},${cx},${cy})`} />
        ))}

        {/* ── Continent silhouettes (approximate) ── */}
        {/* N. America */}
        <path d={`M${cx*0.52},${cy*0.52} c-10,-8 -18,2 -14,18 c4,16 18,22 28,14 c8,-6 8,-20 -14,-32z`}
          fill="rgba(11,116,209,0.10)" stroke="rgba(11,116,209,0.35)" strokeWidth="0.7" />
        {/* S. America */}
        <ellipse cx={cx*0.58} cy={cy*1.18} rx={R*0.10} ry={R*0.17}
          fill="rgba(11,116,209,0.10)" stroke="rgba(11,116,209,0.32)" strokeWidth="0.7" />
        {/* Europe */}
        <ellipse cx={cx*1.02} cy={cy*0.70} rx={R*0.09} ry={R*0.10}
          fill="rgba(11,116,209,0.10)" stroke="rgba(11,116,209,0.32)" strokeWidth="0.7" />
        {/* Africa */}
        <ellipse cx={cx*1.05} cy={cy*1.05} rx={R*0.10} ry={R*0.18}
          fill="rgba(11,116,209,0.10)" stroke="rgba(11,116,209,0.30)" strokeWidth="0.7" />
        {/* Asia (large) */}
        <path d={`M${cx*1.15},${cy*0.52} c20,-4 40,4 42,18 c2,14 -10,22 -28,20 c-18,-2 -36,-12 -34,-26 c2,-8 12,-10 20,-12z`}
          fill="rgba(11,116,209,0.10)" stroke="rgba(11,116,209,0.34)" strokeWidth="0.7" />
        {/* Australia */}
        <ellipse cx={cx*1.38} cy={cy*1.22} rx={R*0.10} ry={R*0.08}
          fill="rgba(11,116,209,0.08)" stroke="rgba(11,116,209,0.28)" strokeWidth="0.7" />

        {/* Specular highlight — makes it look 3-D */}
        <circle cx={cx} cy={cy} r={R - 1} fill="url(#spec)" />
      </g>

      {/* Atmosphere rim */}
      <circle cx={cx} cy={cy} r={R - 1} fill="url(#atm)" />
      <circle cx={cx} cy={cy} r={R - 1.5}
        fill="none" stroke="rgba(11,116,209,0.34)" strokeWidth="2" />
    </svg>
  )
}

export default function OrbitalServices() {
  const [selected, setSelected]   = useState(null)
  const [isMobile, setIsMobile]   = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  /* ── Sizes — slightly smaller than before ── */
  const S      = isMobile ? 310 : 560   // was 340 / 620
  const CX     = S / 2
  const CY     = S / 2
  const globeR = isMobile ? 80  : 140   // was 88 / 155

  const rings = isMobile
    ? [
        { rx:138, ry:55,  tilt:-18, dash:'6 5', op:0.35 },
        { rx:125, ry:46,  tilt: 14, dash:'4 6', op:0.22 },
        { rx:148, ry:64,  tilt: -4, dash:'3 8', op:0.16 },
        { rx: 94, ry:94,  tilt:  0, dash:'5 5', op:0.20 },
        { rx:114, ry:114, tilt:  0, dash:'3 7', op:0.12 },
      ]
    : [
        { rx:255, ry:102, tilt:-18, dash:'6 5', op:0.35 },
        { rx:238, ry: 86, tilt: 14, dash:'4 6', op:0.22 },
        { rx:270, ry:118, tilt: -4, dash:'3 8', op:0.16 },
        { rx:172, ry:172, tilt:  0, dash:'5 5', op:0.20 },
        { rx:194, ry:194, tilt:  0, dash:'3 7', op:0.12 },
      ]

  const dist = isMobile ? 132 : 242
  const cards = {
    top:    { x: CX,                y: CY - dist },
    left:   { x: CX - dist - (isMobile ? 6 : 14), y: CY },
    right:  { x: CX + dist + (isMobile ? 6 : 14), y: CY },
    bottom: { x: CX,                y: CY + dist },
  }

  /* single RAF loop — all 5 dots */
  const dotDefs = [
    { rx: rings[0].rx, ry: rings[0].ry, duration:11, startAngle: 30,  tiltDeg: rings[0].tilt },
    { rx: rings[1].rx, ry: rings[1].ry, duration:15, startAngle:150,  tiltDeg: rings[1].tilt },
    { rx: rings[2].rx, ry: rings[2].ry, duration:19, startAngle:270,  tiltDeg: rings[2].tilt },
    { rx: rings[3].rx, ry: rings[3].ry, duration: 8, startAngle: 80,  tiltDeg: 0 },
    { rx: rings[0].rx, ry: rings[0].ry, duration:11, startAngle:210,  tiltDeg: rings[0].tilt },
  ]
  const dotRefs = useOrbitDots(dotDefs, CX, CY)

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden py-2 select-none">
      {/* constrain width so it never bleeds off-screen */}
      <div className="relative mx-auto" style={{ width: S, height: S, maxWidth: '100%' }}>

        {/* ── SVG: rings + connectors + dots ── */}
        <svg className="absolute inset-0 pointer-events-none"
          width={S} height={S} viewBox={`0 0 ${S} ${S}`} overflow="visible">
          <defs>
            <radialGradient id="glowRing" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(34,211,238,0.25)" />
              <stop offset="100%" stopColor="rgba(34,211,238,0)" />
            </radialGradient>
          </defs>

          {/* Soft glow behind globe */}
          <circle cx={CX} cy={CY} r={globeR + (isMobile ? 36 : 64)} fill="url(#glowRing)" />

          {/* Orbit rings */}
          {rings.map((r, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
              fill="none"
              stroke={`rgba(34,211,238,${r.op})`}
              strokeWidth={i < 2 ? '1.5' : '1'}
              strokeDasharray={r.dash}
              transform={`rotate(${r.tilt},${CX},${CY})`} />
          ))}

          {/* Connector lines */}
          {SERVICES.map(s => {
            const p = cards[s.position]
            return <line key={s.id} x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="rgba(34,211,238,0.13)" strokeWidth="1" strokeDasharray="4 4" />
          })}

          {/* Animated dots — one circle element each, moved by shared RAF */}
          {dotDefs.map((_, i) => (
            <circle key={i} ref={el => dotRefs.current[i] = el} r="5" cx={CX} cy={CY}
              fill="#22d3ee"
              style={{ filter: 'drop-shadow(0 0 5px #22d3ee) drop-shadow(0 0 10px #06b6d4)' }} />
          ))}

          {/* Small anchor dots at card positions */}
          {SERVICES.map(s => {
            const p = cards[s.position]
            return <circle key={s.id+'-a'} cx={p.x} cy={p.y} r="3"
              fill={s.color} style={{ filter: `drop-shadow(0 0 4px ${s.color})` }} />
          })}
        </svg>

        {/* ── GLOBE ── */}
        <div className="absolute z-10 rounded-full overflow-hidden"
          style={{
            width: globeR * 2, height: globeR * 2,
            left: CX, top: CY,
            transform: 'translate(-50%,-50%)',
            boxShadow: `0 14px 34px rgba(15,23,42,0.08), 0 0 72px rgba(11,116,209,0.12)`,
          }}>
          <GlobeGraphic size={globeR * 2} />

          {/* Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="text-slate-900 font-extrabold drop-shadow-sm"
              style={{ fontSize: isMobile ? '0.95rem' : '1.55rem', lineHeight: 1.1 }}>Our</span>
            <span className="text-[#0b74d1] font-extrabold drop-shadow-sm"
              style={{ fontSize: isMobile ? '1.05rem' : '1.7rem',  lineHeight: 1.1 }}>Services</span>
            <div className="bg-[#0b74d1] rounded-full my-1"
              style={{ width: isMobile ? 26 : 46, height: 2.5 }} />
            <span className="text-slate-500 text-center leading-snug px-2"
              style={{ fontSize: isMobile ? '0.44rem' : '0.62rem', maxWidth: isMobile ? 80 : 135 }}>
              Drop-off, Walk-in,<br />On-site & Pickup.
            </span>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        {SERVICES.map(s => {
          const pos  = cards[s.position]
          const Icon = s.icon
          const cw   = isMobile ? 100 : 185
          return (
            <div key={s.id} className="absolute z-20 cursor-pointer"
              style={{ left: pos.x, top: pos.y, transform: 'translate(-50%,-50%)', width: cw }}
              onClick={() => setSelected(s)}>
              <div className="rounded-xl flex items-center gap-2 transition-transform duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.94)',
                  border: '1px solid rgba(148,163,184,0.22)',
                  padding: isMobile ? '6px 8px' : '11px 13px',
                  boxShadow: '0 12px 28px rgba(15,23,42,0.08)',
                  backdropFilter: 'blur(12px)',
                }}>
                <div className="rounded-xl flex-shrink-0 flex items-center justify-center"
                  style={{
                    background: s.iconBg,
                    width:    isMobile ? 33 : 52,
                    height:   isMobile ? 33 : 52,
                    minWidth: isMobile ? 33 : 52,
                    boxShadow: `0 10px 20px ${s.color}20`,
                  }}>
                  <Icon style={{ color:'#fff', width: isMobile ? 15 : 24, height: isMobile ? 15 : 24 }} />
                </div>
                <div>
                  <p className="text-slate-900 font-bold leading-tight"
                    style={{ fontSize: isMobile ? '0.58rem' : '0.88rem' }}>{s.title}</p>
                  <p style={{ color: '#64748b', fontSize: isMobile ? '0.48rem' : '0.68rem', marginTop:2 }}>
                    {s.subtitle}</p>
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
                background: 'rgba(255,255,255,0.92)',
                border: '1px solid rgba(148,163,184,0.22)',
                padding: isMobile ? '3px 7px' : '5px 11px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 10px 22px rgba(15,23,42,0.06)',
              }}>
              <p className="font-bold text-[#0b74d1]"
                style={{ fontSize: isMobile ? '0.52rem' : '0.72rem', lineHeight:1.25 }}>{b.label}</p>
              <p className="text-slate-500"
                style={{ fontSize: isMobile ? '0.44rem' : '0.62rem', lineHeight:1.25 }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}>
          <div className="relative rounded-2xl p-6 md:p-8 w-full max-w-md"
            style={{ background:'#ffffff', border:'1px solid rgba(148,163,184,0.22)', boxShadow:'0 20px 50px rgba(15,23,42,0.14)' }}
            onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelected(null)}>
              <FiX style={{ width:20, height:20 }} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="rounded-2xl flex items-center justify-center"
                style={{ background:selected.iconBg, width:56, height:56, boxShadow:`0 0 20px ${selected.color}66` }}>
                <selected.icon style={{ color:'#fff', width:28, height:28 }} />
              </div>
              <div>
                <h3 className="text-slate-900 text-xl font-bold">{selected.title}</h3>
                <p style={{ color:'#0b74d1' }} className="text-sm mt-1">{selected.subtitle}</p>
              </div>
            </div>
            <ul className="space-y-3">
              {selected.details.map((item,i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background:selected.color }} />
                  <span className="text-slate-600 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}