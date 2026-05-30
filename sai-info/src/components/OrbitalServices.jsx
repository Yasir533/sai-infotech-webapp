import React, { useState, useEffect } from 'react'
import { FiCpu, FiTool, FiCloud, FiShield, FiX } from 'react-icons/fi'

/* ─────────────────────────────────────────────────────────────
   CSS — GPU-only animations, no JS, works on iOS & Android 4G
───────────────────────────────────────────────────────────── */
const CSS = `
@keyframes earthRotate {
  from { transform: translateX(0) }
  to   { transform: translateX(-50%) }
}
@keyframes badgePulse {
  0%,100% { box-shadow: 0 2px 12px rgba(59,130,246,0.14); }
  50%      { box-shadow: 0 2px 20px rgba(59,130,246,0.32); }
}
@keyframes globeGlow {
  0%,100% { box-shadow: 0 0 44px 10px rgba(96,165,250,0.24), 0 0 0 3px rgba(96,165,250,0.32); }
  50%      { box-shadow: 0 0 80px 22px rgba(96,165,250,0.38), 0 0 0 3px rgba(96,165,250,0.50); }
}
.earth-strip {
  display: flex;
  width: 200%;
  height: 100%;
  animation: earthRotate 32s linear infinite;
  will-change: transform;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
}
.card-hover {
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}
.card-hover:active {
  transform: scale(0.97);
}
@media (min-width: 768px) {
  .card-hover:hover {
    transform: translate(-50%,-50%) scale(1.06);
  }
}
`

/* ─────────────────────────────────────────────────────────────
   Earth strip — simplified continent shapes for mobile perf
   Desktop gets full detail, mobile gets lighter version
───────────────────────────────────────────────────────────── */
function EarthStrip({ W, H, simple }) {
  const ll = (lat, lon) => ({
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  })
  const poly = (pts) =>
    pts.map(([la, lo]) => { const p = ll(la, lo); return `${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join(' ')

  // Full continent set (desktop)
  const continentsFull = [
    [[71,28],[70,18],[65,14],[58,5],[55,8],[52,4],[50,2],[48,2],[43,-9],[36,5],[36,14],[38,16],[42,20],[44,28],[46,30],[48,38],[54,38],[60,30],[65,28],[68,22],[71,28]],
    [[58,5],[62,5],[65,14],[70,18],[71,28],[69,30],[65,28],[60,25],[58,28],[55,22],[54,8],[58,5]],
    [[37,10],[36,14],[30,32],[22,36],[10,42],[4,42],[-4,40],[-18,37],[-26,33],[-34,26],[-34,18],[-28,16],[-18,13],[-10,15],[4,-5],[-5,-13],[5,-5],[15,0],[20,17],[30,32],[37,10]],
    [[10,70],[15,80],[22,88],[28,96],[22,110],[10,110],[10,105],[0,103],[-5,105],[-8,120],[-8,140],[10,140],[20,121],[25,122],[35,121],[38,121],[42,130],[50,142],[55,135],[60,142],[65,142],[70,130],[72,110],[70,82],[65,60],[55,52],[45,40],[38,26],[38,36],[34,42],[25,55],[15,52],[10,65],[10,70]],
    [[23,68],[20,73],[15,74],[10,78],[8,77],[8,80],[8,77],[8,68],[10,66],[15,73],[18,73],[22,70],[23,68]],
    [[15,-88],[20,-88],[25,-80],[35,-76],[45,-66],[55,-60],[65,-64],[70,-80],[72,-90],[70,-130],[58,-136],[50,-125],[42,-124],[38,-122],[35,-120],[30,-116],[22,-105],[17,-100],[15,-88]],
    [[10,-63],[5,-53],[0,-50],[-5,-35],[-15,-39],[-25,-48],[-40,-62],[-55,-65],[-52,-70],[-38,-62],[-25,-44],[-5,-35],[10,-63]],
    [[-15,130],[-14,136],[-12,136],[-12,142],[-18,148],[-25,152],[-38,146],[-38,140],[-30,114],[-22,113],[-18,122],[-15,130]],
    [[60,-45],[65,-52],[70,-52],[76,-68],[82,-40],[78,-18],[72,-22],[65,-36],[60,-45]],
    [[32,130],[34,135],[36,138],[35,140],[34,138],[32,132],[32,130]],
    [[50,-5],[52,-4],[54,-3],[57,-2],[58,-3],[57,0],[54,0],[52,0],[50,-5]],
    [[-13,49],[-18,44],[-25,44],[-26,48],[-18,50],[-13,49]],
    [[0,108],[4,114],[7,116],[4,118],[0,116],[-4,114],[0,108]],
    [[5,96],[2,99],[-4,105],[-6,106],[-3,104],[0,102],[5,96]],
  ]

  // Simplified continent set (mobile) — fewer points, same look
  const continentsSimple = [
    // Europe
    [[70,20],[55,8],[43,-9],[36,8],[38,18],[46,32],[54,38],[65,28],[70,20]],
    // Africa
    [[37,10],[30,32],[4,42],[-34,22],[-18,13],[4,-8],[15,0],[30,32],[37,10]],
    // Asia
    [[10,70],[22,88],[10,110],[-8,130],[10,140],[50,142],[72,110],[70,82],[55,52],[38,28],[25,55],[10,70]],
    // India
    [[23,68],[8,77],[8,80],[18,73],[23,68]],
    // N America
    [[15,-88],[35,-76],[65,-64],[72,-90],[70,-130],[50,-125],[30,-116],[15,-88]],
    // S America
    [[10,-63],[0,-50],[-25,-48],[-55,-65],[-25,-44],[10,-63]],
    // Australia
    [[-15,130],[-12,142],[-25,152],[-38,140],[-30,114],[-15,130]],
    // Greenland
    [[62,-44],[76,-68],[82,-40],[72,-22],[62,-44]],
  ]

  const continents = simple ? continentsSimple : continentsFull
  const latGrid = [-60, -30, 0, 30, 60]
  const lonGrid = simple ? [-120, -60, 0, 60, 120] : [-150,-120,-90,-60,-30,0,30,60,90,120,150]

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display:'block', flexShrink:0 }}>
      <defs>
        <linearGradient id={`oceanH${simple?'m':'d'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0f4c8a"/>
          <stop offset="40%"  stopColor="#1558a0"/>
          <stop offset="70%"  stopColor="#0d3d6e"/>
          <stop offset="100%" stopColor="#0a2d52"/>
        </linearGradient>
        <linearGradient id={`landG${simple?'m':'d'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6aaa4a"/>
          <stop offset="60%"  stopColor="#4e8c32"/>
          <stop offset="100%" stopColor="#3a6b24"/>
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#oceanH${simple?'m':'d'})`}/>

      {latGrid.map(la => {
        const y = ((90 - la) / 180) * H
        return <line key={`la${la}`} x1={0} y1={y} x2={W} y2={y}
          stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      })}
      {lonGrid.map(lo => {
        const x = ((lo + 180) / 360) * W
        return <line key={`lo${lo}`} x1={x} y1={0} x2={x} y2={H}
          stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      })}
      <line x1={0} y1={H/2} x2={W} y2={H/2}
        stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>

      {continents.map((pts, i) => (
        <polygon key={i} points={poly(pts)}
          fill={`url(#landG${simple?'m':'d'})`}
          stroke="rgba(255,255,255,0.14)" strokeWidth="0.6"/>
      ))}

      {!simple && <>
        <ellipse cx={W*0.22} cy={H*0.28} rx={W*0.10} ry={H*0.025}
          fill="rgba(255,255,255,0.07)" transform={`rotate(-8,${W*0.22},${H*0.28})`}/>
        <ellipse cx={W*0.60} cy={H*0.38} rx={W*0.12} ry={H*0.022}
          fill="rgba(255,255,255,0.06)" transform={`rotate(5,${W*0.60},${H*0.38})`}/>
        <ellipse cx={W*0.80} cy={H*0.55} rx={W*0.08} ry={H*0.018}
          fill="rgba(255,255,255,0.06)" transform={`rotate(10,${W*0.80},${H*0.55})`}/>
      </>}
    </svg>
  )
}

function RotatingEarth({ size, simple }) {
  return (
    <div style={{
      position:'absolute', inset:0, borderRadius:'50%',
      overflow:'hidden', background:'#0a2d52',
    }}>
      <div className="earth-strip">
        <EarthStrip W={size} H={size} simple={simple}/>
        <EarthStrip W={size} H={size} simple={simple}/>
      </div>

      {/* Sphere shading */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        background:'radial-gradient(ellipse at 32% 35%, rgba(255,255,255,0.13) 0%, transparent 55%), radial-gradient(ellipse at 78% 60%, rgba(0,0,0,0.42) 0%, transparent 55%)',
        pointerEvents:'none',
      }}/>

      {/* Polar dark fade — hides equirectangular distortion */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        background:'linear-gradient(to bottom, rgba(5,20,50,0.85) 0%, rgba(5,20,50,0.45) 15%, transparent 30%, transparent 70%, rgba(5,20,50,0.45) 85%, rgba(5,20,50,0.85) 100%)',
        pointerEvents:'none',
      }}/>

      {/* Atmosphere rim */}
      <div style={{
        position:'absolute', inset:0, borderRadius:'50%',
        background:'radial-gradient(ellipse at 50% 50%, transparent 72%, rgba(80,160,255,0.32) 88%, rgba(40,120,255,0.60) 100%)',
        pointerEvents:'none',
      }}/>
    </div>
  )
}

/* ── Services & Badges data ────────────────────────────────── */
const SERVICES = [
  { id:'repair',      title:'Repair & Recovery',        subtitle:'Fast & Reliable Support',       icon:FiCpu,    color:'#2563eb', iconBg:'linear-gradient(135deg,#1e3a8a,#2563eb)', position:'top',    details:['Chip-level PCB repair','Data recovery from HDD/SSD','Motherboard fault detection','GPU & CPU reballing','On-site & walk-in service'] },
  { id:'maintenance', title:'Maintenance & Automation', subtitle:'Smart Automation Solutions',    icon:FiTool,   color:'#16a34a', iconBg:'linear-gradient(135deg,#14532d,#16a34a)', position:'left',   details:['Annual maintenance contracts','PLC & automation systems','Preventive maintenance','Industrial control systems','SCADA integration'] },
  { id:'network',     title:'Network & Cloud',          subtitle:'Secure & Scalable Networks',    icon:FiCloud,  color:'#0284c7', iconBg:'linear-gradient(135deg,#0c4a6e,#0284c7)', position:'right',  details:['LAN/WAN infrastructure','Cloud migration (AWS/Azure/GCP)','Enterprise WiFi deployment','Firewall & VPN setup','Network monitoring'] },
  { id:'security',    title:'Security & AV',            subtitle:'Advanced Protection Always On', icon:FiShield, color:'#16a34a', iconBg:'linear-gradient(135deg,#14532d,#16a34a)', position:'bottom', details:['CCTV system installation','Access control & biometrics','AV conference room setup','Remote surveillance','Security audit & compliance'] },
]

const BADGES = [
  { label:'10+ Yrs',       sub:'Experience',   side:'left'  },
  { label:'Trusted by',    sub:'100+ Clients', side:'right' },
  { label:'ISO Certified', sub:'Process',      side:'left'  },
  { label:'Pan India',     sub:'Service',      side:'right' },
]

/* ── Desktop radial layout (unchanged) ──────────────────────── */
function DesktopLayout({ selected, setSelected }) {
  const S      = 560
  const CX     = S / 2
  const CY     = S / 2
  const globeR = 144

  const rings = [
    { rx:258, ry:103, tilt:-18, dash:'6 5', op:0.35, sw:1.5 },
    { rx:240, ry: 87, tilt: 14, dash:'4 6', op:0.22, sw:1   },
    { rx:272, ry:120, tilt: -4, dash:'3 8', op:0.16, sw:1   },
    { rx:174, ry:174, tilt:  0, dash:'5 5', op:0.20, sw:1.2 },
  ]

  const dist = 244
  const cardPos = {
    top:    { x: CX,         y: CY - dist },
    left:   { x: CX - dist - 12, y: CY },
    right:  { x: CX + dist + 12, y: CY },
    bottom: { x: CX,         y: CY + dist },
  }

  const badgePos = [
    { left:'15%',  top:'20%'    },
    { right:'12%', top:'14%'    },
    { left:'10%',  bottom:'22%' },
    { right:'12%', bottom:'20%' },
  ]

  return (
    <div className="relative mx-auto" style={{ width:S, height:S }}>
      <svg className="absolute inset-0 pointer-events-none"
        width={S} height={S} viewBox={`0 0 ${S} ${S}`} overflow="visible">
        <defs>
          <radialGradient id="glowBgD" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(96,165,250,0.18)"/>
            <stop offset="100%" stopColor="rgba(96,165,250,0)"/>
          </radialGradient>
        </defs>
        <circle cx={CX} cy={CY} r={globeR + 74} fill="url(#glowBgD)"/>
        {rings.map((r,i) => (
          <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
            fill="none" stroke={`rgba(96,165,250,${r.op})`}
            strokeWidth={r.sw} strokeDasharray={r.dash}
            transform={`rotate(${r.tilt},${CX},${CY})`}/>
        ))}
        {SERVICES.map(s => {
          const p = cardPos[s.position]
          return <line key={s.id} x1={CX} y1={CY} x2={p.x} y2={p.y}
            stroke="rgba(96,165,250,0.16)" strokeWidth="1" strokeDasharray="5 5"/>
        })}
        {SERVICES.map(s => {
          const p = cardPos[s.position]
          return <circle key={s.id+'-a'} cx={p.x} cy={p.y} r="4"
            fill={s.color} style={{ filter:`drop-shadow(0 0 5px ${s.color})` }}/>
        })}
      </svg>

      {/* Globe */}
      <div className="absolute z-10 rounded-full"
        style={{
          width:globeR*2, height:globeR*2,
          left:CX, top:CY,
          transform:'translate(-50%,-50%)',
          animation:'globeGlow 3.5s ease-in-out infinite',
          borderRadius:'50%', overflow:'hidden',
        }}>
        <RotatingEarth size={globeR*2} simple={false}/>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20"
          style={{ pointerEvents:'none' }}>
          <span style={{ color:'#fff', fontWeight:800, fontSize:'1.5rem', lineHeight:1.1, textShadow:'0 2px 14px rgba(0,0,0,0.85)' }}>Our</span>
          <span style={{ color:'#7dd3fc', fontWeight:800, fontSize:'1.65rem', lineHeight:1.1, textShadow:'0 2px 14px rgba(0,0,0,0.85)' }}>Services</span>
          <div style={{ width:48, height:2.5, background:'#38bdf8', borderRadius:9999, margin:'4px 0' }}/>
          <span style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.60rem', textAlign:'center', lineHeight:1.4, maxWidth:140, textShadow:'0 1px 8px rgba(0,0,0,0.9)', padding:'0 6px' }}>
            Drop-off, Walk-in,<br/>On-site & Pickup.
          </span>
        </div>
      </div>

      {/* Cards */}
      {SERVICES.map(s => {
        const pos = cardPos[s.position]
        const Icon = s.icon
        return (
          <div key={s.id} className="absolute z-20 cursor-pointer"
            style={{ left:pos.x, top:pos.y, transform:'translate(-50%,-50%)', width:192 }}
            onClick={() => setSelected(s)}>
            <div style={{ background:'#fff', border:'1px solid rgba(59,130,246,0.15)', borderRadius:16, padding:'13px 15px', boxShadow:'0 4px 24px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', gap:11, transition:'transform 0.22s, box-shadow 0.22s' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}>
              <div style={{ background:s.iconBg, borderRadius:12, width:54, height:54, minWidth:54, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 16px ${s.color}55` }}>
                <Icon style={{ color:'#fff', width:26, height:26 }}/>
              </div>
              <div>
                <p style={{ color:'#0f172a', fontWeight:700, fontSize:'0.88rem', lineHeight:1.25 }}>{s.title}</p>
                <p style={{ color:s.color, fontSize:'0.66rem', marginTop:2, lineHeight:1.25 }}>{s.subtitle}</p>
              </div>
            </div>
          </div>
        )
      })}

      {/* Badges */}
      {BADGES.map((b,i) => (
        <div key={b.label} className="absolute z-30 pointer-events-none"
          style={{ ...badgePos[i], transform:'translate(-50%,-50%)' }}>
          <div style={{ background:'#fff', border:'1px solid rgba(59,130,246,0.22)', borderRadius:10, padding:'6px 13px', textAlign:'center', animation:'badgePulse 3s ease-in-out infinite' }}>
            <p style={{ color:'#2563eb', fontWeight:700, fontSize:'0.72rem', lineHeight:1.3 }}>{b.label}</p>
            <p style={{ color:'#64748b', fontSize:'0.60rem', lineHeight:1.3 }}>{b.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Mobile vertical layout ─────────────────────────────────
   Globe in center, cards stacked above & below,
   left/right cards beside globe in a row — fits any phone
─────────────────────────────────────────────────────────── */
function MobileLayout({ selected, setSelected }) {
  const globeD = 200   // globe diameter px — fits all phones
  const globeR = globeD / 2

  const Card = ({ s }) => {
    const Icon = s.icon
    return (
      <div onClick={() => setSelected(s)}
        style={{ background:'#fff', border:'1px solid rgba(59,130,246,0.15)', borderRadius:12, padding:'10px 12px', boxShadow:'0 4px 18px rgba(59,130,246,0.10)', display:'flex', alignItems:'center', gap:10, cursor:'pointer', flex:1, minWidth:0 }}>
        <div style={{ background:s.iconBg, borderRadius:10, width:40, height:40, minWidth:40, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 12px ${s.color}55` }}>
          <Icon style={{ color:'#fff', width:20, height:20 }}/>
        </div>
        <div style={{ minWidth:0 }}>
          <p style={{ color:'#0f172a', fontWeight:700, fontSize:'0.75rem', lineHeight:1.2 }}>{s.title}</p>
          <p style={{ color:s.color, fontSize:'0.62rem', marginTop:2, lineHeight:1.2 }}>{s.subtitle}</p>
        </div>
      </div>
    )
  }

  const Badge = ({ b }) => (
    <div style={{ background:'#fff', border:'1px solid rgba(59,130,246,0.22)', borderRadius:8, padding:'4px 10px', textAlign:'center', animation:'badgePulse 3s ease-in-out infinite' }}>
      <p style={{ color:'#2563eb', fontWeight:700, fontSize:'0.62rem', lineHeight:1.3 }}>{b.label}</p>
      <p style={{ color:'#64748b', fontSize:'0.55rem', lineHeight:1.3 }}>{b.sub}</p>
    </div>
  )

  return (
    <div style={{ width:'100%', maxWidth:400, margin:'0 auto', padding:'12px 12px', display:'flex', flexDirection:'column', gap:10 }}>

      {/* Top card: Repair & Recovery */}
      <Card s={SERVICES[0]}/>

      {/* Badges row top */}
      <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
        <Badge b={BADGES[0]}/>
        <Badge b={BADGES[1]}/>
      </div>

      {/* Middle row: left card + globe + right card */}
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        {/* Left card */}
        <div style={{ flex:'0 0 auto', width:120 }}>
          <Card s={SERVICES[1]}/>
        </div>

        {/* Globe */}
        <div style={{
          flex:'0 0 auto',
          width:globeD, height:globeD,
          borderRadius:'50%', overflow:'hidden', position:'relative',
          animation:'globeGlow 3.5s ease-in-out infinite',
          flexShrink:0,
        }}>
          <RotatingEarth size={globeD} simple={true}/>
          <div style={{
            position:'absolute', inset:0, display:'flex', flexDirection:'column',
            alignItems:'center', justifyContent:'center', pointerEvents:'none',
          }}>
            <span style={{ color:'#fff', fontWeight:800, fontSize:'0.9rem', lineHeight:1.1, textShadow:'0 2px 10px rgba(0,0,0,0.9)' }}>Our</span>
            <span style={{ color:'#7dd3fc', fontWeight:800, fontSize:'1rem', lineHeight:1.1, textShadow:'0 2px 10px rgba(0,0,0,0.9)' }}>Services</span>
            <div style={{ width:30, height:2, background:'#38bdf8', borderRadius:9999, margin:'3px 0' }}/>
            <span style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.38rem', textAlign:'center', lineHeight:1.4, textShadow:'0 1px 6px rgba(0,0,0,0.9)' }}>
              Drop-off, Walk-in,<br/>On-site & Pickup.
            </span>
          </div>
        </div>

        {/* Right card */}
        <div style={{ flex:'0 0 auto', width:120 }}>
          <Card s={SERVICES[2]}/>
        </div>
      </div>

      {/* Badges row bottom */}
      <div style={{ display:'flex', justifyContent:'space-between', gap:8 }}>
        <Badge b={BADGES[2]}/>
        <Badge b={BADGES[3]}/>
      </div>

      {/* Bottom card: Security & AV */}
      <Card s={SERVICES[3]}/>
    </div>
  )
}

/* ── Main ───────────────────────────────────────────────────── */
export default function OrbitalServices() {
  const [selected, setSelected] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
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

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden py-4 select-none">
      {isMobile
        ? <MobileLayout selected={selected} setSelected={setSelected}/>
        : <DesktopLayout selected={selected} setSelected={setSelected}/>
      }

      {/* Modal — shared */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}>
          <div className="relative rounded-2xl p-6 w-full max-w-md"
            style={{ background:'#fff', border:`1.5px solid ${selected.color}33`, boxShadow:`0 8px 48px ${selected.color}22` }}
            onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-800"
              onClick={() => setSelected(null)}>
              <FiX style={{ width:20, height:20 }}/>
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ background:selected.iconBg, borderRadius:14, width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 22px ${selected.color}55` }}>
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
                  <div style={{ width:7, height:7, borderRadius:'50%', marginTop:5, flexShrink:0, background:selected.color }}/>
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