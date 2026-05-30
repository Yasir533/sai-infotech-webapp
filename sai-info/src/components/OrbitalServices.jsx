import React, { useState, useEffect } from 'react'
import { FiCpu, FiTool, FiCloud, FiShield, FiX } from 'react-icons/fi'

/* ─────────────────────────────────────────
   CSS injected once — all animations are
   pure CSS so they NEVER stutter on 4G phones
───────────────────────────────────────── */
const CSS = `
@keyframes orbitDot1 {
  from { offset-distance: 0% }
  to   { offset-distance: 100% }
}
@keyframes orbitDot2 {
  from { offset-distance: 40% }
  to   { offset-distance: 140% }
}
@keyframes orbitDot3 {
  from { offset-distance: 70% }
  to   { offset-distance: 170% }
}
@keyframes orbitDot4 {
  from { offset-distance: 20% }
  to   { offset-distance: 120% }
}
@keyframes orbitDot5 {
  from { offset-distance: 60% }
  to   { offset-distance: 160% }
}
@keyframes earthSpin {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
@keyframes badgePulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.18); }
  50%      { box-shadow: 0 0 0 6px rgba(59,130,246,0); }
}
@keyframes globeGlow {
  0%,100% { box-shadow: 0 0 40px 8px rgba(96,165,250,0.22), 0 0 0 3px rgba(96,165,250,0.30); }
  50%      { box-shadow: 0 0 70px 18px rgba(96,165,250,0.35), 0 0 0 3px rgba(96,165,250,0.45); }
}
.orbit-dot {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fff 0%, #38bdf8 55%, #0ea5e9 100%);
  box-shadow: 0 0 8px 3px #38bdf8, 0 0 18px 5px rgba(56,189,248,0.5);
  offset-rotate: 0deg;
}
.orbit-dot.sm {
  width: 7px;
  height: 7px;
}
.card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.card-hover:hover {
  transform: translate(-50%,-50%) scale(1.06);
}
`

/* ── Real Earth SVG Globe ──────────────────────────────────
   Ocean = blue, continents = green/brown landmasses
   Latitude/longitude grid lines for realism
   Pure SVG, no images, no canvas
─────────────────────────────────────────────────────────── */
function EarthGlobe({ size }) {
  const R = size / 2
  // We use a simple equirectangular projection clipped to a circle
  // Landmass shapes in lat/lon → projected to x,y on the sphere face
  const project = (lat, lon) => {
    // Equirectangular → sphere face (orthographic projection, tilt 15°)
    const tilt = 15 * Math.PI / 180
    const phi = (lat * Math.PI) / 180
    const lam = (lon * Math.PI) / 180
    const x = Math.cos(phi) * Math.sin(lam)
    const y = Math.sin(phi) * Math.cos(tilt) - Math.cos(phi) * Math.cos(lam) * Math.sin(tilt)
    const z = Math.sin(phi) * Math.sin(tilt) + Math.cos(phi) * Math.cos(lam) * Math.cos(tilt)
    if (z < 0) return null
    return { x: R + x * (R - 2), y: R - y * (R - 2), z }
  }

  // Build SVG path for a polygon of lat/lon points
  const landPath = (pts) => {
    const visible = pts.map(([la, lo]) => project(la, lo))
    if (visible.every(p => !p)) return null
    let d = ''
    let first = true
    visible.forEach(p => {
      if (!p) return
      if (first) { d += `M${p.x.toFixed(1)},${p.y.toFixed(1)}`; first = false }
      else d += `L${p.x.toFixed(1)},${p.y.toFixed(1)}`
    })
    d += 'Z'
    return d
  }

  // Continents as dense lat/lon polygons
  const continents = [
    // EUROPE
    [[36,5],[43,-9],[48,2],[51,3],[54,8],[58,5],[62,5],[68,18],[70,25],[65,28],[60,25],[58,28],[55,22],[52,14],[50,12],[48,12],[46,14],[44,14],[42,16],[38,16],[36,14],[36,5]],
    // AFRICA
    [[37,10],[23,36],[4,42],[-4,40],[-18,37],[-26,33],[-34,26],[-34,18],[-18,13],[-5,10],[4,-5],[-5,-13],[5,-5],[15,0],[20,17],[30,32],[37,10]],
    // ASIA MAIN
    [[10,70],[15,80],[22,88],[28,96],[22,110],[10,110],[10,105],[0,103],[-5,105],[-8,120],[-8,140],[10,140],[20,121],[25,122],[35,121],[38,121],[42,130],[50,142],[55,135],[60,142],[65,142],[70,130],[72,110],[70,82],[65,60],[55,52],[45,40],[38,26],[38,36],[34,42],[25,55],[15,52],[10,65],[10,70]],
    // INDIA
    [[8,68],[13,80],[20,87],[23,92],[27,89],[28,97],[25,92],[22,88],[18,73],[8,77],[8,68]],
    // N AMERICA
    [[15,-88],[20,-88],[25,-80],[35,-76],[45,-66],[55,-60],[65,-64],[70,-80],[72,-90],[70,-130],[58,-136],[50,-125],[42,-124],[35,-121],[30,-116],[22,-105],[15,-88]],
    // S AMERICA
    [[10,-63],[5,-53],[0,-50],[-10,-37],[-25,-48],[-40,-62],[-55,-65],[-52,-70],[-40,-62],[-25,-44],[-5,-35],[10,-63]],
    // AUSTRALIA
    [[-15,130],[-14,136],[-12,136],[-12,142],[-18,148],[-25,152],[-38,146],[-38,140],[-30,114],[-22,113],[-18,122],[-15,130]],
    // GREENLAND
    [[60,-45],[65,-52],[70,-52],[76,-68],[82,-40],[78,-18],[70,-24],[65,-36],[60,-45]],
    // JAPAN rough
    [[32,130],[34,135],[36,138],[35,140],[34,138],[32,132],[32,130]],
    // UK
    [[50,-5],[52,-4],[54,-3],[58,-4],[58,-3],[57,0],[54,0],[52,0],[50,-5]],
  ]

  // Grid lines
  const latLines = [-60,-30,0,30,60]
  const lonLines = [-120,-60,0,60,120]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}
      style={{ position:'absolute', inset:0, borderRadius:'50%', overflow:'hidden' }}>
      <defs>
        {/* Ocean gradient — deep blue like real Earth */}
        <radialGradient id="ocean" cx="38%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#1a6fba"/>
          <stop offset="40%"  stopColor="#1558a0"/>
          <stop offset="80%"  stopColor="#0d3d6e"/>
          <stop offset="100%" stopColor="#0a2d52"/>
        </radialGradient>
        {/* Land gradient — warm green/brown */}
        <radialGradient id="land" cx="40%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#6aaa4a"/>
          <stop offset="50%"  stopColor="#4e8c32"/>
          <stop offset="100%" stopColor="#3a6b24"/>
        </radialGradient>
        {/* Specular highlight */}
        <radialGradient id="spec" cx="28%" cy="22%" r="35%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.38)"/>
          <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
        </radialGradient>
        {/* Atmosphere rim */}
        <radialGradient id="atm" cx="50%" cy="50%" r="50%">
          <stop offset="75%"  stopColor="rgba(0,0,0,0)"/>
          <stop offset="90%"  stopColor="rgba(100,180,255,0.30)"/>
          <stop offset="100%" stopColor="rgba(60,140,255,0.55)"/>
        </radialGradient>
        <clipPath id="globeClip">
          <circle cx={R} cy={R} r={R - 1}/>
        </clipPath>
      </defs>

      {/* Ocean base */}
      <circle cx={R} cy={R} r={R - 1} fill="url(#ocean)"/>

      <g clipPath="url(#globeClip)">
        {/* Grid lines (subtle) */}
        {latLines.map(la => {
          const pts = []
          for (let lo = -180; lo <= 180; lo += 4) {
            const p = project(la, lo)
            if (p) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          }
          return <polyline key={`la${la}`} points={pts.join(' ')}
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.7"/>
        })}
        {lonLines.map(lo => {
          const pts = []
          for (let la = -85; la <= 85; la += 4) {
            const p = project(la, lo)
            if (p) pts.push(`${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          }
          return <polyline key={`lo${lo}`} points={pts.join(' ')}
            fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.7"/>
        })}

        {/* Landmasses */}
        {continents.map((poly, i) => {
          const d = landPath(poly)
          return d ? <path key={i} d={d} fill="url(#land)"
            stroke="rgba(255,255,255,0.12)" strokeWidth="0.5"/> : null
        })}

        {/* Specular light reflection — makes it look 3D */}
        <circle cx={R} cy={R} r={R - 1} fill="url(#spec)"/>
      </g>

      {/* Atmosphere + rim glow */}
      <circle cx={R} cy={R} r={R - 1} fill="url(#atm)"/>
      <circle cx={R} cy={R} r={R - 1.5} fill="none"
        stroke="rgba(100,180,255,0.60)" strokeWidth="2.5"/>
    </svg>
  )
}

/* ── Data ─────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'repair',
    title: 'Repair & Recovery',
    subtitle: 'Fast & Reliable Support',
    icon: FiCpu,
    color: '#2563eb',
    iconBg: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
    position: 'top',
    details: ['Chip-level PCB repair','Data recovery from HDD/SSD','Motherboard fault detection','GPU & CPU reballing','On-site & walk-in service'],
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Automation',
    subtitle: 'Smart Automation Solutions',
    icon: FiTool,
    color: '#16a34a',
    iconBg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'left',
    details: ['Annual maintenance contracts','PLC & automation systems','Preventive maintenance','Industrial control systems','SCADA integration'],
  },
  {
    id: 'network',
    title: 'Network & Cloud',
    subtitle: 'Secure & Scalable Networks',
    icon: FiCloud,
    color: '#0284c7',
    iconBg: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    position: 'right',
    details: ['LAN/WAN infrastructure','Cloud migration (AWS/Azure/GCP)','Enterprise WiFi deployment','Firewall & VPN setup','Network monitoring'],
  },
  {
    id: 'security',
    title: 'Security & AV',
    subtitle: 'Advanced Protection Always On',
    icon: FiShield,
    color: '#16a34a',
    iconBg: 'linear-gradient(135deg,#14532d,#16a34a)',
    position: 'bottom',
    details: ['CCTV system installation','Access control & biometrics','AV conference room setup','Remote surveillance','Security audit & compliance'],
  },
]

const BADGES = [
  { label: '10+ Yrs',      sub: 'Experience',    pos: { left: '15%', top: '20%' } },
  { label: 'Trusted by',   sub: '100+ Clients',  pos: { right:'12%', top: '14%' } },
  { label: 'ISO Certified',sub: 'Process',        pos: { left: '10%', bottom:'22%' } },
  { label: 'Pan India',    sub: 'Service',        pos: { right:'12%', bottom:'20%' } },
]

export default function OrbitalServices() {
  const [selected, setSelected] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Inject CSS once
    if (!document.getElementById('orbital-css')) {
      const el = document.createElement('style')
      el.id = 'orbital-css'
      el.textContent = CSS
      document.head.appendChild(el)
    }
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const S      = isMobile ? 320 : 560
  const CX     = S / 2
  const CY     = S / 2
  const globeR = isMobile ? 82 : 144   // diameter = 164 / 288

  /* Orbit ring definitions */
  const rings = isMobile ? [
    { rx:140, ry:56,  tilt:-18, dash:'6 5',  op:0.38, sw:1.5 },
    { rx:126, ry:46,  tilt: 14, dash:'4 6',  op:0.24, sw:1   },
    { rx:150, ry:65,  tilt: -4, dash:'3 8',  op:0.18, sw:1   },
    { rx: 96, ry:96,  tilt:  0, dash:'5 5',  op:0.22, sw:1.2 },
  ] : [
    { rx:258, ry:103, tilt:-18, dash:'6 5',  op:0.38, sw:1.5 },
    { rx:240, ry: 88, tilt: 14, dash:'4 6',  op:0.24, sw:1   },
    { rx:272, ry:120, tilt: -4, dash:'3 8',  op:0.18, sw:1   },
    { rx:174, ry:174, tilt:  0, dash:'5 5',  op:0.22, sw:1.2 },
  ]

  /* Card positions */
  const dist = isMobile ? 134 : 244
  const cardPos = {
    top:    { x: CX,              y: CY - dist },
    left:   { x: CX - dist - (isMobile?4:12), y: CY },
    right:  { x: CX + dist + (isMobile?4:12), y: CY },
    bottom: { x: CX,              y: CY + dist },
  }

  /* CSS motion-path dots — one per ring, pure CSS animation */
  // We encode each ring as an SVG ellipse path string for offset-path
  const makePath = (rx, ry, tilt, cx, cy) => {
    // SVG ellipse as a path: two arcs
    const t = tilt * Math.PI / 180
    // We rotate the ellipse by using transform on the element, offset-path stays axis-aligned
    return `path('M ${cx + rx},${cy} A ${rx},${ry} 0 1 1 ${cx - rx},${cy} A ${rx},${ry} 0 1 1 ${cx + rx},${cy}')`
  }

  const dotConfigs = [
    { ring: 0, dur: '11s',  delay: '0s',    anim: 'orbitDot1' },
    { ring: 1, dur: '15s',  delay: '-3s',   anim: 'orbitDot2' },
    { ring: 2, dur: '19s',  delay: '-7s',   anim: 'orbitDot3' },
    { ring: 3, dur: '8s',   delay: '-2s',   anim: 'orbitDot4' },
    { ring: 0, dur: '11s',  delay: '-5.5s', anim: 'orbitDot5' },
  ]

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden py-4 select-none">
      <div className="relative mx-auto" style={{ width: S, height: S, maxWidth: '100%' }}>

        {/* ── SVG: rings + connector lines + anchor dots ── */}
        <svg className="absolute inset-0 pointer-events-none"
          width={S} height={S} viewBox={`0 0 ${S} ${S}`} overflow="visible">
          <defs>
            <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(96,165,250,0.18)"/>
              <stop offset="100%" stopColor="rgba(96,165,250,0)"/>
            </radialGradient>
          </defs>

          {/* Soft glow halo behind globe */}
          <circle cx={CX} cy={CY} r={globeR + (isMobile?40:70)} fill="url(#glowBg)"/>

          {/* Orbit rings */}
          {rings.map((r, i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
              fill="none"
              stroke={`rgba(96,165,250,${r.op})`}
              strokeWidth={r.sw}
              strokeDasharray={r.dash}
              transform={`rotate(${r.tilt},${CX},${CY})`}/>
          ))}

          {/* Connector dashed lines from globe center to cards */}
          {SERVICES.map(s => {
            const p = cardPos[s.position]
            return <line key={s.id} x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="rgba(96,165,250,0.18)" strokeWidth="1" strokeDasharray="5 5"/>
          })}

          {/* Anchor dots at card positions */}
          {SERVICES.map(s => {
            const p = cardPos[s.position]
            return <circle key={s.id+'-a'} cx={p.x} cy={p.y} r="4"
              fill={s.color}
              style={{ filter:`drop-shadow(0 0 5px ${s.color})` }}/>
          })}
        </svg>

        {/* ── CSS-animated orbit dots (no JS RAF = smooth on 4G) ── */}
        {dotConfigs.map((dc, i) => {
          const r = rings[dc.ring]
          const pathStr = makePath(r.rx, r.ry, r.tilt, CX, CY)
          return (
            <div key={i}
              className={`orbit-dot${isMobile?' sm':''}`}
              style={{
                offsetPath: pathStr,
                animation: `${dc.anim} ${dc.dur} linear ${dc.delay} infinite`,
                transform: `rotate(${r.tilt}deg)`,
              }}/>
          )
        })}

        {/* ── EARTH GLOBE ── */}
        <div className="absolute z-10 rounded-full overflow-hidden"
          style={{
            width: globeR * 2,
            height: globeR * 2,
            left: CX,
            top: CY,
            transform: 'translate(-50%,-50%)',
            animation: 'globeGlow 3s ease-in-out infinite',
          }}>
          <EarthGlobe size={globeR * 2}/>

          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10"
            style={{ background:'rgba(0,0,0,0)' }}>
            <span style={{
              color:'#fff',
              fontWeight:800,
              fontSize: isMobile ? '0.95rem' : '1.5rem',
              lineHeight:1.1,
              textShadow:'0 2px 12px rgba(0,0,0,0.7)',
            }}>Our</span>
            <span style={{
              color:'#7dd3fc',
              fontWeight:800,
              fontSize: isMobile ? '1.05rem' : '1.65rem',
              lineHeight:1.1,
              textShadow:'0 2px 12px rgba(0,0,0,0.7)',
            }}>Services</span>
            <div style={{
              width: isMobile ? 28 : 48,
              height: 2.5,
              background:'#38bdf8',
              borderRadius: 9999,
              margin:'4px 0',
            }}/>
            <span style={{
              color:'rgba(255,255,255,0.82)',
              fontSize: isMobile ? '0.44rem' : '0.60rem',
              textAlign:'center',
              lineHeight:1.4,
              maxWidth: isMobile ? 82 : 140,
              textShadow:'0 1px 6px rgba(0,0,0,0.8)',
              padding:'0 6px',
            }}>
              Drop-off, Walk-in,<br/>On-site & Pickup.
            </span>
          </div>
        </div>

        {/* ── SERVICE CARDS ── */}
        {SERVICES.map(s => {
          const pos  = cardPos[s.position]
          const Icon = s.icon
          const cw   = isMobile ? 106 : 192
          return (
            <div key={s.id}
              className="absolute z-20 cursor-pointer card-hover"
              style={{
                left: pos.x,
                top: pos.y,
                transform: 'translate(-50%,-50%)',
                width: cw,
              }}
              onClick={() => setSelected(s)}>
              <div style={{
                background: '#ffffff',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: isMobile ? 10 : 16,
                padding: isMobile ? '7px 9px' : '13px 15px',
                boxShadow: '0 4px 24px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                display:'flex',
                alignItems:'center',
                gap: isMobile ? 7 : 11,
              }}>
                <div style={{
                  background: s.iconBg,
                  borderRadius: isMobile ? 8 : 12,
                  width: isMobile ? 34 : 54,
                  height: isMobile ? 34 : 54,
                  minWidth: isMobile ? 34 : 54,
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  boxShadow: `0 0 16px ${s.color}55`,
                }}>
                  <Icon style={{ color:'#fff', width: isMobile ? 16 : 26, height: isMobile ? 16 : 26 }}/>
                </div>
                <div>
                  <p style={{
                    color: '#0f172a',
                    fontWeight:700,
                    fontSize: isMobile ? '0.58rem' : '0.88rem',
                    lineHeight:1.25,
                  }}>{s.title}</p>
                  <p style={{
                    color: s.color,
                    fontSize: isMobile ? '0.46rem' : '0.66rem',
                    marginTop:2,
                    lineHeight:1.25,
                  }}>{s.subtitle}</p>
                </div>
              </div>
            </div>
          )
        })}

        {/* ── FLOATING BADGES ── */}
        {BADGES.map(b => (
          <div key={b.label} className="absolute z-30 pointer-events-none"
            style={{ ...b.pos, transform:'translate(-50%,-50%)' }}>
            <div style={{
              background:'#ffffff',
              border:'1px solid rgba(59,130,246,0.22)',
              borderRadius: isMobile ? 8 : 10,
              padding: isMobile ? '4px 8px' : '6px 13px',
              textAlign:'center',
              boxShadow:'0 2px 12px rgba(59,130,246,0.12)',
              animation:'badgePulse 3s ease-in-out infinite',
            }}>
              <p style={{
                color:'#2563eb',
                fontWeight:700,
                fontSize: isMobile ? '0.52rem' : '0.72rem',
                lineHeight:1.3,
              }}>{b.label}</p>
              <p style={{
                color:'#64748b',
                fontSize: isMobile ? '0.44rem' : '0.60rem',
                lineHeight:1.3,
              }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── MODAL ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}>
          <div className="relative rounded-2xl p-6 md:p-8 w-full max-w-md"
            style={{
              background:'#fff',
              border:`1.5px solid ${selected.color}33`,
              boxShadow:`0 8px 48px ${selected.color}22, 0 2px 16px rgba(0,0,0,0.10)`,
            }}
            onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              onClick={() => setSelected(null)}>
              <FiX style={{ width:20, height:20 }}/>
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div style={{
                background: selected.iconBg,
                borderRadius:14,
                width:56, height:56,
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:`0 0 22px ${selected.color}55`,
              }}>
                <selected.icon style={{ color:'#fff', width:28, height:28 }}/>
              </div>
              <div>
                <h3 style={{ color:'#0f172a', fontSize:'1.2rem', fontWeight:700 }}>{selected.title}</h3>
                <p style={{ color:selected.color, fontSize:'0.85rem', marginTop:3 }}>{selected.subtitle}</p>
              </div>
            </div>
            <ul style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {selected.details.map((item,i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <div style={{
                    width:7, height:7, borderRadius:'50%', marginTop:5, flexShrink:0,
                    background:selected.color,
                  }}/>
                  <span style={{ color:'#334155', fontSize:'0.9rem' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}