import React, { useState, useEffect, useRef } from 'react'
import { FiCpu, FiTool, FiCloud, FiShield, FiX, FiPhone, FiMail } from 'react-icons/fi'

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
@keyframes detailFadeIn {
  from { opacity: 0; transform: scale(0.93) translateY(6px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
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
.orbital-card:hover .orbital-card-inner {
  transform: scale(1.05);
  box-shadow: 0 8px 32px rgba(59,130,246,0.22), 0 2px 8px rgba(0,0,0,0.10);
}
`

function EarthStrip({ W, H }) {
  const ll = (lat, lon) => ({
    x: ((lon + 180) / 360) * W,
    y: ((90 - lat) / 180) * H,
  })
  const poly = (pts) =>
    pts.map(([la, lo]) => { const p = ll(la, lo); return `${p.x.toFixed(1)},${p.y.toFixed(1)}` }).join(' ')

  const continents = [
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
  ]

  const latGrid = [-60,-30,0,30,60]
  const lonGrid = [-150,-120,-90,-60,-30,0,30,60,90,120,150]

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display:'block', flexShrink:0 }}>
      <defs>
        <linearGradient id="oceanH" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0f4c8a"/>
          <stop offset="40%"  stopColor="#1558a0"/>
          <stop offset="70%"  stopColor="#0d3d6e"/>
          <stop offset="100%" stopColor="#0a2d52"/>
        </linearGradient>
        <linearGradient id="landG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#6aaa4a"/>
          <stop offset="60%"  stopColor="#4e8c32"/>
          <stop offset="100%" stopColor="#3a6b24"/>
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#oceanH)"/>
      {latGrid.map(la => {
        const y = ((90-la)/180)*H
        return <line key={`la${la}`} x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      })}
      {lonGrid.map(lo => {
        const x = ((lo+180)/360)*W
        return <line key={`lo${lo}`} x1={x} y1={0} x2={x} y2={H} stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/>
      })}
      <line x1={0} y1={H/2} x2={W} y2={H/2} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      {continents.map((pts,i) => (
        <polygon key={i} points={poly(pts)} fill="url(#landG)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6"/>
      ))}
      <ellipse cx={W*0.22} cy={H*0.28} rx={W*0.10} ry={H*0.025} fill="rgba(255,255,255,0.07)" transform={`rotate(-8,${W*0.22},${H*0.28})`}/>
      <ellipse cx={W*0.60} cy={H*0.38} rx={W*0.12} ry={H*0.022} fill="rgba(255,255,255,0.06)" transform={`rotate(5,${W*0.60},${H*0.38})`}/>
    </svg>
  )
}

function RotatingEarth({ size }) {
  return (
    <div style={{ position:'absolute', inset:0, borderRadius:'50%', overflow:'hidden', background:'#0a2d52' }}>
      <div className="earth-strip">
        <EarthStrip W={size} H={size}/>
        <EarthStrip W={size} H={size}/>
      </div>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(ellipse at 32% 35%, rgba(255,255,255,0.13) 0%, transparent 55%), radial-gradient(ellipse at 78% 60%, rgba(0,0,0,0.42) 0%, transparent 55%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'linear-gradient(to bottom, rgba(5,20,50,0.85) 0%, rgba(5,20,50,0.45) 15%, transparent 30%, transparent 70%, rgba(5,20,50,0.45) 85%, rgba(5,20,50,0.85) 100%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'radial-gradient(ellipse at 50% 50%, transparent 72%, rgba(80,160,255,0.32) 88%, rgba(40,120,255,0.60) 100%)', pointerEvents:'none' }}/>
    </div>
  )
}

const SERVICES = [
  { id:'repair',      title:'Repair & Recovery',        subtitle:'Fast & Reliable Support',       icon:FiCpu,    color:'#2563eb', iconBg:'linear-gradient(135deg,#1e3a8a,#2563eb)', position:'top',    details:['Chip-level PCB repair','Data recovery from HDD/SSD','Motherboard fault detection','GPU & CPU reballing','On-site & walk-in service'] },
  { id:'maintenance', title:'Maintenance & Automation', subtitle:'Smart Automation Solutions',    icon:FiTool,   color:'#ea580c', iconBg:'linear-gradient(135deg,#7c2d12,#ea580c)', position:'left',   details:['Annual maintenance contracts','PLC & automation systems','Preventive maintenance','Industrial control systems','SCADA integration'] },
  { id:'network',     title:'Network & Cloud',          subtitle:'Secure & Scalable Networks',    icon:FiCloud,  color:'#0284c7', iconBg:'linear-gradient(135deg,#0c4a6e,#0284c7)', position:'right',  details:['LAN/WAN infrastructure','Cloud migration (AWS/Azure/GCP)','Enterprise WiFi deployment','Firewall & VPN setup','Network monitoring'] },
  { id:'security',    title:'Security & AV',            subtitle:'Advanced Protection Always On', icon:FiShield, color:'#10b981', iconBg:'linear-gradient(135deg,#064e3b,#10b981)', position:'bottom', details:['CCTV system installation','Access control & biometrics','AV conference room setup','Remote surveillance','Security audit & compliance'] },
]

const BADGES = [
  { label:'10+ Yrs',       sub:'Experience',   pos:{ left: 120, top: 140 } },
  { label:'Trusted by',    sub:'100+ Clients', pos:{ left: 780, top:  94 } },
  { label:'ISO Certified', sub:'Process',      pos:{ left:  80, top: 622 } },
  { label:'Pan India',     sub:'Service',      pos:{ left: 780, top: 640 } },
]

const DESIGN_W = 900
const DESIGN_H = 780
const CX      = DESIGN_W / 2
const CY      = DESIGN_H / 2
const GLOBE_R = 155
const CW      = 265
const ICON_BOX= 60

// Perfect spacing for larger cards to avoid overlapping the globe
const CARD_POS = {
  top:    { x: CX,       y: CY - 275 },
  left:   { x: CX - 325, y: CY       },
  right:  { x: CX + 325, y: CY       },
  bottom: { x: CX,       y: CY + 275 },
}

const RINGS = [
  { rx:310, ry:124, tilt:-18, dash:'6 5', op:0.35, sw:1.5 },
  { rx:290, ry:104, tilt: 14, dash:'4 6', op:0.22, sw:1   },
  { rx:326, ry:142, tilt: -4, dash:'3 8', op:0.16, sw:1   },
  { rx:212, ry:212, tilt:  0, dash:'5 5', op:0.20, sw:1.2 },
]

// Desktop/Tablet Detail Panel — shown beside the card with zero-hover-gap padding and visual connector
function DetailPanel({ service, onClose }) {
  const isTop = service.position === 'top'
  const isBottom = service.position === 'bottom'
  const isLeft = service.position === 'left'
  const isRight = service.position === 'right'

  const PANEL_CONTENT_W = 420
  const GAP = 40 // Connector line gap

  const containerStyle = {
    position: 'absolute',
    zIndex: 50,
    animation: 'detailFadeIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
    pointerEvents: 'auto',

    ...(isTop && {
      top: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      paddingTop: GAP,
      width: PANEL_CONTENT_W,
      transformOrigin: 'top center',
    }),
    ...(isBottom && {
      bottom: '100%',
      left: '50%',
      transform: 'translateX(-50%)',
      paddingBottom: GAP,
      width: PANEL_CONTENT_W,
      transformOrigin: 'bottom center',
    }),
    ...(isLeft && {
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      paddingLeft: GAP,
      width: PANEL_CONTENT_W + GAP,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transformOrigin: 'left center',
    }),
    ...(isRight && {
      right: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      paddingRight: GAP,
      width: PANEL_CONTENT_W + GAP,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transformOrigin: 'right center',
    }),
  }

  const Connector = () => {
    if (isTop) {
      return (
        <div style={{ height: GAP, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' }}>
          <svg width="20" height={GAP}>
            <line x1="10" y1="0" x2="10" y2={GAP} stroke={service.color} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="10" cy="4" r="4" fill={service.color} style={{ filter: `drop-shadow(0 0 4px ${service.color}88)` }} />
            <path d="M 5,32 L 10,38 L 15,32" fill="none" stroke={service.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
    if (isBottom) {
      return (
        <div style={{ height: GAP, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'none' }}>
          <svg width="20" height={GAP}>
            <line x1="10" y1="0" x2="10" y2={GAP} stroke={service.color} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="10" cy={GAP - 4} r="4" fill={service.color} style={{ filter: `drop-shadow(0 0 4px ${service.color}88)` }} />
            <path d="M 5,8 L 10,2 L 15,8" fill="none" stroke={service.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
    if (isLeft) {
      return (
        <div style={{ width: GAP, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, pointerEvents: 'none' }}>
          <svg width={GAP} height="20">
            <line x1="0" y1="10" x2={GAP} y2="10" stroke={service.color} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx="4" cy="10" r="4" fill={service.color} style={{ filter: `drop-shadow(0 0 4px ${service.color}88)` }} />
            <path d="M 32,5 L 38,10 L 32,15" fill="none" stroke={service.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
    if (isRight) {
      return (
        <div style={{ width: GAP, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, pointerEvents: 'none' }}>
          <svg width={GAP} height="20">
            <line x1="0" y1="10" x2={GAP} y2="10" stroke={service.color} strokeWidth="2" strokeDasharray="3 3" />
            <circle cx={GAP - 4} cy="10" r="4" fill={service.color} style={{ filter: `drop-shadow(0 0 4px ${service.color}88)` }} />
            <path d="M 8,5 L 2,10 L 8,15" fill="none" stroke={service.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )
    }
    return null
  }

  const cardContent = (
    <div style={{
      background: 'rgba(255, 255, 255, 0.98)',
      border: `1.5px solid ${service.color}33`,
      borderRadius: 18,
      padding: '22px 24px',
      boxShadow: `0 15px 45px ${service.color}24, 0 3px 14px rgba(0,0,0,0.06)`,
      position: 'relative',
      width: PANEL_CONTENT_W,
      boxSizing: 'border-box',
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          background: 'rgba(15, 23, 42, 0.05)',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          color: '#64748b',
          width: 26,
          height: 26,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
          outline: 'none',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.1)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(15, 23, 42, 0.05)'}
      >
        <FiX style={{ width: 14, height: 14 }} />
      </button>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          background: service.iconBg,
          borderRadius: 10,
          width: 42,
          height: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: `0 4px 12px ${service.color}35`,
        }}>
          <service.icon style={{ color: '#fff', width: 20, height: 20 }} />
        </div>
        <div>
          <p style={{ color: '#0f172a', fontWeight: 800, fontSize: 17, margin: 0, lineHeight: 1.2 }}>{service.title}</p>
          <p style={{ color: service.color, fontSize: 13, fontWeight: 600, margin: '2px 0 0 0', lineHeight: 1.2 }}>{service.subtitle}</p>
        </div>
      </div>

      <div style={{ height: 1, background: `${service.color}22`, marginBottom: 14 }} />

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
        {service.details.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: service.color, marginTop: 6, flexShrink: 0 }} />
            <span style={{ color: '#334155', fontSize: 14, lineHeight: 1.4, fontWeight: 500 }}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <div style={containerStyle} onClick={e => e.stopPropagation()}>
      {(isTop || isBottom) && (
        <>
          {isBottom && <Connector />}
          {cardContent}
          {isTop && <Connector />}
        </>
      )}

      {isLeft && (
        <>
          <Connector />
          {cardContent}
        </>
      )}
      {isRight && (
        <>
          {cardContent}
          <Connector />
        </>
      )}
    </div>
  )
}

// Mobile details modal (unscaled viewport-relative layout)
function MobileDetailModal({ service, onClose }) {
  const Icon = service.icon
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        background: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          background: '#ffffff',
          borderRadius: '24px',
          padding: '28px 24px 24px 24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          position: 'relative',
          animation: 'detailFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          boxSizing: 'border-box',
        }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(15, 23, 42, 0.05)',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            color: '#64748b',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
        >
          <FiX style={{ width: 16, height: 16 }} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <div style={{
            background: service.iconBg,
            borderRadius: '14px',
            width: 52,
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: `0 4px 14px ${service.color}44`,
          }}>
            <Icon style={{ color: '#fff', width: 24, height: 24 }} />
          </div>
          <div>
            <h3 style={{ color: '#0f172a', fontWeight: 800, fontSize: '20px', margin: 0, lineHeight: 1.2 }}>{service.title}</h3>
            <p style={{ color: service.color, fontWeight: 600, fontSize: '14px', margin: '4px 0 0 0', lineHeight: 1.2 }}>{service.subtitle}</p>
          </div>
        </div>

        <div style={{ height: '1px', background: `${service.color}22`, marginBottom: 20 }} />

        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {service.details.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: service.color, marginTop: 7, flexShrink: 0 }} />
              <span style={{ color: '#334155', fontSize: '15px', lineHeight: 1.5, fontWeight: 500 }}>{item}</span>
            </li>
          ))}
        </ul>

        <div style={{ display: 'flex', gap: 12 }}>
          <a
            href="tel:+918310338544"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 0',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#fff',
              textDecoration: 'none',
              textAlign: 'center',
              background: service.color,
              boxShadow: `0 4px 14px ${service.color}40`,
            }}
          >
            Call Now
          </a>
          <a
            href="#contact"
            onClick={onClose}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 0',
              borderRadius: '14px',
              fontSize: '14px',
              fontWeight: 'bold',
              color: service.color,
              textDecoration: 'none',
              textAlign: 'center',
              background: `${service.color}12`,
              border: `1px solid ${service.color}25`,
            }}
          >
            Get Quote
          </a>
        </div>
      </div>
    </div>
  )
}

export default function OrbitalServices() {
  const [activeId, setActiveId]     = useState(null)
  const [hoveredId, setHoveredId]   = useState(null)
  const [containerW, setContainerW] = useState(780)
  const [isMobile, setIsMobile]     = useState(false)
  const outerRef = useRef(null)

  const visibleId = activeId || hoveredId
  const visibleService = SERVICES.find(s => s.id === visibleId) || null

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!document.getElementById('orbital-css')) {
      const el = document.createElement('style')
      el.id = 'orbital-css'
      el.textContent = CSS
      document.head.appendChild(el)
    }
    const node = outerRef.current
    if (!node) return
    const measure = () => setContainerW(node.offsetWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(node)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!activeId) return
    const handleClick = () => setActiveId(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [activeId])

  const scale   = Math.min(containerW, DESIGN_W) / DESIGN_W
  const scaledH = DESIGN_H * scale

  const globeOurPx      = 44
  const globeServicesPx = 50
  const globeSubPx      = 18
  const cardTitlePx     = 17
  const cardSubPx       = 13
  const badgeLabelPx    = 16
  const badgeSubPx      = 13

  return (
    <div ref={outerRef} style={{ width:'100%', overflow:'visible', padding:'16px 0', height: scaledH + 32, position: 'relative' }}>
      <div style={{
        width:           DESIGN_W,
        height:          DESIGN_H,
        transform:       `scale(${scale})`,
        transformOrigin: 'top center',
        marginLeft:      (containerW - DESIGN_W) / 2,
        position:        'relative',
        flexShrink:      0,
        userSelect:      'none',
        overflow:        'visible',
      }}>

        {/* Orbit rings + connector lines + anchor dots */}
        <svg style={{ position:'absolute', inset:0, pointerEvents:'none' }}
          width={DESIGN_W} height={DESIGN_H} viewBox={`0 0 ${DESIGN_W} ${DESIGN_H}`} overflow="visible">
          <defs>
            <radialGradient id="glowBg" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="rgba(96,165,250,0.18)"/>
              <stop offset="100%" stopColor="rgba(96,165,250,0)"/>
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={GLOBE_R+90} fill="url(#glowBg)"/>
          {RINGS.map((r,i) => (
            <ellipse key={i} cx={CX} cy={CY} rx={r.rx} ry={r.ry}
              fill="none" stroke={`rgba(96,165,250,${r.op})`}
              strokeWidth={r.sw} strokeDasharray={r.dash}
              transform={`rotate(${r.tilt},${CX},${CY})`}/>
          ))}
          {SERVICES.map(s => {
            const p = CARD_POS[s.position]
            return <line key={s.id} x1={CX} y1={CY} x2={p.x} y2={p.y}
              stroke="rgba(96,165,250,0.16)" strokeWidth="1" strokeDasharray="5 5"/>
          })}
          {SERVICES.map(s => {
            const p = CARD_POS[s.position]
            return <circle key={s.id+'-a'} cx={p.x} cy={p.y} r="5"
              fill={s.color} style={{ filter:`drop-shadow(0 0 5px ${s.color})` }}/>
          })}
        </svg>

        {/* Rotating Earth Globe */}
        <div style={{
          position:'absolute', zIndex:10,
          width:GLOBE_R*2, height:GLOBE_R*2,
          left:CX, top:CY,
          transform:'translate(-50%,-50%)',
          animation:'globeGlow 3.5s ease-in-out infinite',
          borderRadius:'50%', overflow:'hidden',
        }}>
          <RotatingEarth size={GLOBE_R*2}/>
          <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', zIndex:20, pointerEvents:'none' }}>
            <span style={{ color:'#fff', fontWeight:800, fontSize:globeOurPx, lineHeight:1.1, textShadow:'0 2px 14px rgba(0,0,0,0.85)' }}>Our</span>
            <span style={{ color:'#7dd3fc', fontWeight:800, fontSize:globeServicesPx, lineHeight:1.1, textShadow:'0 2px 14px rgba(0,0,0,0.85)' }}>Services</span>
            <div style={{ width:48, height:2.5, background:'#38bdf8', borderRadius:9999, margin:'4px 0' }}/>
            <span style={{ color:'rgba(255,255,255,0.85)', fontSize:globeSubPx, textAlign:'center', lineHeight:1.4, maxWidth:140, textShadow:'0 1px 8px rgba(0,0,0,0.9)', padding:'0 6px' }}>
              Drop-off, Walk-in,<br/>On-site & Pickup.
            </span>
          </div>
        </div>

        {/* Service Cards */}
        {SERVICES.map(s => {
          const pos  = CARD_POS[s.position]
          const Icon = s.icon
          const isActive = visibleId === s.id

          return (
            <div
              key={s.id}
              className="orbital-card"
              style={{ position:'absolute', zIndex: isActive ? 35 : 20, cursor:'pointer', left:pos.x, top:pos.y, transform:'translate(-50%,-50%)', width:CW }}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation()
                setActiveId(prev => prev === s.id ? null : s.id)
              }}
            >
              {/* Card Face */}
              <div
                className="orbital-card-inner"
                style={{
                  background: isActive ? `linear-gradient(135deg, #f0f7ff, #fff)` : '#fff',
                  border: isActive ? `1.5px solid ${s.color}55` : '1px solid rgba(59,130,246,0.15)',
                  borderRadius: 14,
                  padding: '12px 14px',
                  boxShadow: isActive
                    ? `0 8px 32px ${s.color}33, 0 2px 8px rgba(0,0,0,0.10)`
                    : '0 4px 24px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ background:s.iconBg, borderRadius:10, width:ICON_BOX, height:ICON_BOX, minWidth:ICON_BOX, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 14px ${s.color}44`, flexShrink:0 }}>
                  <Icon style={{ color:'#fff', width:26, height:26 }}/>
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ color:'#0f172a', fontWeight:700, fontSize:cardTitlePx, lineHeight:1.25, margin:0, overflowWrap:'break-word', wordBreak:'break-word' }}>{s.title}</p>
                  <p style={{ color:s.color, fontSize:cardSubPx, marginTop:3, fontWeight: 600, lineHeight:1.25, marginBottom:0, overflowWrap:'break-word' }}>{s.subtitle}</p>
                </div>
              </div>

              {/* Detail panel — shown on hover OR click on desktop/tablet */}
              {isActive && !isMobile && (
                <DetailPanel
                  service={s}
                  onClose={(e) => {
                    e && e.stopPropagation()
                    setActiveId(null)
                    setHoveredId(null)
                  }}
                />
              )}
            </div>
          )
        })}

        {/* Floating Badges */}
        {BADGES.map(b => (
          <div key={b.label} style={{ position:'absolute', zIndex:30, pointerEvents:'none', left:b.pos.left, top:b.pos.top, transform:'translate(-50%,-50%)' }}>
            <div style={{ background:'#fff', border:'1px solid rgba(59,130,246,0.22)', borderRadius:9999, padding:'6px 14px', textAlign:'center', animation:'badgePulse 3s ease-in-out infinite', whiteSpace:'nowrap', display:'inline-block' }}>
              <p style={{ color:'#2563eb', fontWeight:700, fontSize:badgeLabelPx, lineHeight:1.3, margin:0 }}>{b.label}</p>
              <p style={{ color:'#64748b', fontSize:badgeSubPx, lineHeight:1.3, margin:0 }}>{b.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Unscaled mobile detail overlay */}
      {isMobile && visibleService && (
        <MobileDetailModal
          service={visibleService}
          onClose={() => {
            setActiveId(null)
            setHoveredId(null)
          }}
        />
      )}
    </div>
  )
}