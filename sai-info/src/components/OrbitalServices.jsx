import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiMonitor, FiTool, FiCamera, FiPackage, FiX, FiPhone, FiMail, FiCheckCircle } from 'react-icons/fi'

// ─── Import brand logos ───────────────────────────────────────────────────────
import dellLogo      from '../assets/brands/dell.png'
import hpLogo        from '../assets/brands/hp.png'
import lenovoLogo    from '../assets/brands/lenovo.png'
import asusLogo      from '../assets/brands/asus.png'
import acerLogo      from '../assets/brands/acer.png'
import intelLogo     from '../assets/brands/intel.png'
import microsoftLogo from '../assets/brands/microsoft.png'
import samsungLogo   from '../assets/brands/samsung.png'
import appleLogo     from '../assets/brands/apple.png'
import ciscoLogo     from '../assets/brands/cisco.png'
import awsLogo       from '../assets/brands/aws.png'
import azureLogo     from '../assets/brands/azure.png'
import googleCloudLogo from '../assets/brands/google-cloud.png'
import ubiquitiLogo  from '../assets/brands/ubiquiti.png'
import ruckusLogo    from '../assets/brands/ruckus.png'

const BRAND_LOGOS = [
  { name: 'Dell',         src: dellLogo },
  { name: 'HP',           src: hpLogo },
  { name: 'Lenovo',       src: lenovoLogo },
  { name: 'ASUS',         src: asusLogo },
  { name: 'Acer',         src: acerLogo },
  { name: 'Intel',        src: intelLogo },
  { name: 'Microsoft',    src: microsoftLogo },
  { name: 'Samsung',      src: samsungLogo },
  { name: 'Apple',        src: appleLogo },
  { name: 'Cisco',        src: ciscoLogo },
  { name: 'AWS',          src: awsLogo },
  { name: 'Azure',        src: azureLogo },
  { name: 'Google Cloud', src: googleCloudLogo },
  { name: 'Ubiquiti',     src: ubiquitiLogo },
  { name: 'Ruckus',       src: ruckusLogo },
]

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
  from { opacity: 0; transform: scale(0.95) translateY(12px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes brandSlide {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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
.brand-track {
  display: flex;
  align-items: center;
  animation: brandSlide 22s linear infinite;
  will-change: transform;
}
.brand-track:hover {
  animation-play-state: paused;
}
.brand-logo-item {
  flex-shrink: 0;
  margin: 0 10px;
  padding: 8px 14px;
  border-radius: 10px;
  background: #f1f5f9;
  border: 1px solid rgba(37,99,235,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.18s;
}
.brand-logo-item:hover {
  box-shadow: 0 2px 10px rgba(37,99,235,0.14);
  background: #fff;
}
.brand-logo-item img {
  height: 36px;
  width: auto;
  max-width: 80px;
  object-fit: contain;
  display: block;
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
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{ display:'block', flexShrink:0 }}>
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
      {latGrid.map(la => { const y = ((90-la)/180)*H; return <line key={`la${la}`} x1={0} y1={y} x2={W} y2={y} stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/> })}
      {lonGrid.map(lo => { const x = ((lo+180)/360)*W; return <line key={`lo${lo}`} x1={x} y1={0} x2={x} y2={H} stroke="rgba(255,255,255,0.09)" strokeWidth="0.8"/> })}
      <line x1={0} y1={H/2} x2={W} y2={H/2} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
      {continents.map((pts,i) => <polygon key={i} points={poly(pts)} fill="url(#landG)" stroke="rgba(255,255,255,0.14)" strokeWidth="0.6"/>)}
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

// ─── Brand logo slider ────────────────────────────────────────────────────────
function BrandSlider({ color }) {
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS]
  return (
    <div style={{ overflow:'hidden', width:'100%', position:'relative', borderRadius:10 }}>
      <div style={{ position:'absolute', left:0, top:0, bottom:0, width:36, background:'linear-gradient(to right, #fff, transparent)', zIndex:2, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', right:0, top:0, bottom:0, width:36, background:'linear-gradient(to left, #fff, transparent)', zIndex:2, pointerEvents:'none' }}/>
      <div className="brand-track">
        {logos.map((brand, i) => (
          <div key={i} className="brand-logo-item">
            <img src={brand.src} alt={brand.name} title={brand.name}/>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Desktop Full Modal (renders outside scaled container — no clipping) ──────
function DesktopModal({ service, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99998,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        /* paddingTop = navbar (~96px) + breathing room (20px) */
        padding: '116px 24px 24px 24px',
        background: 'rgba(15,23,42,0.45)',
        backdropFilter: 'blur(6px)',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          background: '#ffffff',
          borderRadius: 24,
          padding: '36px 40px 32px 40px',
          boxShadow: `0 30px 80px ${service.color}28, 0 8px 24px rgba(0,0,0,0.12)`,
          position: 'relative',
          animation: 'detailFadeIn 0.22s cubic-bezier(0.16,1,0.3,1) forwards',
          boxSizing: 'border-box',
          flexShrink: 0,
          border: `1.5px solid ${service.color}22`,
          marginBottom: 24,
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position:'absolute', top:18, right:18, background:'rgba(15,23,42,0.06)', border:'none', borderRadius:'50%', cursor:'pointer', color:'#64748b', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', outline:'none', fontSize:16 }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(15,23,42,0.12)'}
          onMouseLeave={e => e.currentTarget.style.background='rgba(15,23,42,0.06)'}
        >
          <FiX style={{ width:16, height:16 }}/>
        </button>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:18, marginBottom:20 }}>
          <div style={{ background:service.iconBg, borderRadius:16, width:60, height:60, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 6px 18px ${service.color}40` }}>
            <service.icon style={{ color:'#fff', width:28, height:28 }}/>
          </div>
          <div>
            <h2 style={{ color:'#0f172a', fontWeight:800, fontSize:24, margin:0, lineHeight:1.2 }}>{service.title}</h2>
            <p style={{ color:service.color, fontSize:15, fontWeight:600, margin:'4px 0 0 0', lineHeight:1.2 }}>{service.subtitle}</p>
          </div>
        </div>

        <div style={{ height:1, background:`${service.color}20`, marginBottom:22 }}/>

        {/* IT Products layout */}
        {service.hasBrands && service.offerings ? (
          <>
            <p style={{ color:'#64748b', fontWeight:700, fontSize:11, margin:'0 0 14px 0', textTransform:'uppercase', letterSpacing:'0.09em' }}>
              Product Offerings
            </p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'11px 20px', marginBottom:24 }}>
              {service.offerings.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                  <FiCheckCircle style={{ color:'#22c55e', width:16, height:16, flexShrink:0, marginTop:2 }}/>
                  <span style={{ color:'#334155', fontSize:14.5, lineHeight:1.45, fontWeight:500 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ height:1, background:`${service.color}15`, marginBottom:20 }}/>

            <p style={{ color:'#64748b', fontWeight:700, fontSize:11, margin:'0 0 14px 0', textTransform:'uppercase', letterSpacing:'0.09em' }}>
              Brands We Carry
            </p>
            <BrandSlider color={service.color}/>

            <div style={{ marginTop:28, display:'flex', gap:14 }}>
              <a href="tel:+917676952139" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'15px 0', borderRadius:14, fontSize:15, fontWeight:700, color:'#fff', textDecoration:'none', background:service.color, boxShadow:`0 4px 16px ${service.color}44` }}>
                <FiPhone style={{ width:16, height:16 }}/> Call Now
              </a>
              <a href="#contact" onClick={onClose} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'15px 0', borderRadius:14, fontSize:15, fontWeight:700, color:service.color, textDecoration:'none', background:`${service.color}10`, border:`1.5px solid ${service.color}30` }}>
                <FiMail style={{ width:16, height:16 }}/> Get Quote
              </a>
            </div>
          </>
        ) : (
          <>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px 0', display:'flex', flexDirection:'column', gap:13 }}>
              {service.details.map((item, i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                  <div style={{ width:9, height:9, borderRadius:'50%', background:service.color, marginTop:7, flexShrink:0 }}/>
                  <span style={{ color:'#334155', fontSize:15.5, lineHeight:1.5, fontWeight:500 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ display:'flex', gap:14 }}>
              <a href="tel:+917676952139" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'15px 0', borderRadius:14, fontSize:15, fontWeight:700, color:'#fff', textDecoration:'none', background:service.color, boxShadow:`0 4px 16px ${service.color}44` }}>
                <FiPhone style={{ width:16, height:16 }}/> Call Now
              </a>
              <a href="#contact" onClick={onClose} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'15px 0', borderRadius:14, fontSize:15, fontWeight:700, color:service.color, textDecoration:'none', background:`${service.color}10`, border:`1.5px solid ${service.color}30` }}>
                <FiMail style={{ width:16, height:16 }}/> Get Quote
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Mobile Detail Modal ──────────────────────────────────────────────────────
function MobileDetailModal({ service, onClose }) {
  const Icon = service.icon
  return (
    <div style={{ position:'fixed', inset:0, zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px', background:'rgba(15,23,42,0.6)', backdropFilter:'blur(8px)' }} onClick={onClose}>
      <div style={{ width:'100%', maxWidth:'460px', background:'#ffffff', borderRadius:'24px', padding:'28px 24px 24px 24px', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.35)', position:'relative', animation:'detailFadeIn 0.25s cubic-bezier(0.16,1,0.3,1) forwards', boxSizing:'border-box', maxHeight:'85vh', overflowY:'auto' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'absolute', top:16, right:16, background:'rgba(15,23,42,0.05)', border:'none', borderRadius:'50%', cursor:'pointer', color:'#64748b', width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <FiX style={{ width:16, height:16 }}/>
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
          <div style={{ background:service.iconBg, borderRadius:'14px', width:52, height:52, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, boxShadow:`0 4px 14px ${service.color}44` }}>
            <Icon style={{ color:'#fff', width:24, height:24 }}/>
          </div>
          <div>
            <h3 style={{ color:'#0f172a', fontWeight:800, fontSize:'20px', margin:0, lineHeight:1.2 }}>{service.title}</h3>
            <p style={{ color:service.color, fontWeight:600, fontSize:'14px', margin:'4px 0 0 0', lineHeight:1.2 }}>{service.subtitle}</p>
          </div>
        </div>
        <div style={{ height:'1px', background:`${service.color}22`, marginBottom:20 }}/>

        {service.hasBrands && service.offerings ? (
          <>
            <p style={{ color:'#64748b', fontWeight:700, fontSize:11, margin:'0 0 12px 0', textTransform:'uppercase', letterSpacing:'0.07em' }}>Product Offerings</p>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'9px 10px', marginBottom:20 }}>
              {service.offerings.map((item, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
                  <FiCheckCircle style={{ color:'#22c55e', width:14, height:14, flexShrink:0, marginTop:2 }}/>
                  <span style={{ color:'#334155', fontSize:13, lineHeight:1.4, fontWeight:500 }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ height:'1px', background:`${service.color}18`, marginBottom:14 }}/>
            <p style={{ color:'#64748b', fontWeight:700, fontSize:11, margin:'0 0 10px 0', textTransform:'uppercase', letterSpacing:'0.07em' }}>Brands We Carry</p>
            <BrandSlider color={service.color}/>
            <div style={{ marginTop:20, display:'flex', gap:12 }}>
              <a href="tel:+917676952139" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 0', borderRadius:'14px', fontSize:'14px', fontWeight:'bold', color:'#fff', textDecoration:'none', background:service.color, boxShadow:`0 4px 14px ${service.color}40` }}>
                <FiPhone style={{ width:15, height:15 }}/> Call Now
              </a>
              <a href="#contact" onClick={onClose} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 0', borderRadius:'14px', fontSize:'14px', fontWeight:'bold', color:service.color, textDecoration:'none', background:`${service.color}12`, border:`1px solid ${service.color}25` }}>
                <FiMail style={{ width:15, height:15 }}/> Get Quote
              </a>
            </div>
          </>
        ) : (
          <>
            <ul style={{ listStyle:'none', padding:0, margin:'0 0 24px 0', display:'flex', flexDirection:'column', gap:12 }}>
              {service.details.map((item, i) => (
                <li key={i} style={{ display:'flex', alignItems:'flex-start', gap:12 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:service.color, marginTop:7, flexShrink:0 }}/>
                  <span style={{ color:'#334155', fontSize:'15px', lineHeight:1.5, fontWeight:500 }}>{item}</span>
                </li>
              ))}
            </ul>
            <div style={{ display:'flex', gap:12 }}>
              <a href="tel:+917676952139" style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 0', borderRadius:'14px', fontSize:'14px', fontWeight:'bold', color:'#fff', textDecoration:'none', background:service.color, boxShadow:`0 4px 14px ${service.color}40` }}>
                <FiPhone style={{ width:15, height:15 }}/> Call Now
              </a>
              <a href="#contact" onClick={onClose} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'14px 0', borderRadius:'14px', fontSize:'14px', fontWeight:'bold', color:service.color, textDecoration:'none', background:`${service.color}12`, border:`1px solid ${service.color}25` }}>
                <FiMail style={{ width:15, height:15 }}/> Get Quote
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: 'itproducts',
    title: 'IT Products (Sales)',
    subtitle: 'Laptops, Desktops & IT Hardware',
    icon: FiMonitor,
    color: '#2563eb',
    iconBg: 'linear-gradient(135deg,#1e3a8a,#2563eb)',
    position: 'top',
    offerings: [
      'New & Refurbished Laptops',
      'Desktops & Workstations',
      'Servers & Storage Solutions',
      'Printers & Accessories',
      'Networking Equipment',
      'CCTV Equipment',
      'IT Peripherals',
      'Monitors & Displays',
    ],
    hasBrands: true,
    details: [],
  },
  {
    id: 'repair',
    title: 'Repair & Recovery',
    subtitle: 'Support & Repair Services',
    icon: FiTool,
    color: '#ea580c',
    iconBg: 'linear-gradient(135deg,#7c2d12,#ea580c)',
    position: 'left',
    offerings: null,
    hasBrands: false,
    details: [
      'Chip-Level PCB Repair',
      'Data Recovery from HDD/SSD',
      'Motherboard Fault Detection',
      'Hardware Troubleshooting',
      'On-Site & Walk-In Service',
    ],
  },
  {
    id: 'itsolutions',
    title: 'IT Solutions',
    subtitle: 'CCTV • Network • Security',
    icon: FiCamera,
    color: '#0284c7',
    iconBg: 'linear-gradient(135deg,#0c4a6e,#0284c7)',
    position: 'right',
    offerings: null,
    hasBrands: false,
    details: [
      'CCTV Installation & Monitoring',
      'Network Infrastructure Setup',
      'Firewall & VPN Configuration',
      'Access Control Systems',
      'Enterprise Wi-Fi Deployment',
    ],
  },
  {
    id: 'ewaste',
    title: 'E-Waste Solutions',
    subtitle: 'Sustainable IT Asset Disposal',
    icon: FiPackage,
    color: '#10b981',
    iconBg: 'linear-gradient(135deg,#064e3b,#10b981)',
    position: 'bottom',
    offerings: null,
    hasBrands: false,
    details: [
      'IT Asset Disposal & Buyback',
      'Certified Refurbished Devices',
      'Secure Data Destruction',
      'Recycling & Compliance',
      'Corporate E-Waste Management',
    ],
  },
]

const BADGES = [
  { label:'10+ Yrs',       sub:'Experience',   pos:{ left: 120, top: 140 } },
  { label:'Trusted by',    sub:'100+ Clients', pos:{ left: 780, top:  94 } },
  { label:'ISO Certified', sub:'Process',      pos:{ left:  80, top: 622 } },
  { label:'All Over Karnataka',     sub:'Service',      pos:{ left: 780, top: 640 } },
]

const DESIGN_W = 900
const DESIGN_H = 780
const CX       = DESIGN_W / 2
const CY       = DESIGN_H / 2
const GLOBE_R  = 155
const CW       = 265
const ICON_BOX = 60

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

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function OrbitalServices() {
  const navigate = useNavigate()
  const [activeId, setActiveId]     = useState(null)
  const [hoveredId, setHoveredId]   = useState(null)
  const [containerW, setContainerW] = useState(780)
  const [isMobile, setIsMobile]     = useState(false)
  const outerRef = useRef(null)

  // Only click (activeId) opens the modal — hover just highlights the card
  const visibleId      = activeId
  const visibleService = SERVICES.find(s => s.id === activeId) || null

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

  const cardTitlePx = 17
  const cardSubPx   = 13
  const badgeLabelPx = 16
  const badgeSubPx   = 13
  const globeOurPx      = 44
  const globeServicesPx = 50
  const globeSubPx      = 18

  const handleClose = () => {
    setActiveId(null)
    setHoveredId(null)
  }

  return (
    <div ref={outerRef} style={{ width:'100%', overflow:'visible', padding:'16px 0', height: scaledH + 32, position:'relative' }}>
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

        {/* Orbit rings + connectors + anchor dots */}
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

        {/* Service Cards — CLICK to open modal, hover just highlights */}
        {SERVICES.map(s => {
          const pos      = CARD_POS[s.position]
          const Icon     = s.icon
          const isActive = activeId === s.id
          const isHovered = hoveredId === s.id

          return (
            <div
              key={s.id}
              className="orbital-card"
              style={{ position:'absolute', zIndex:20, cursor:'pointer', left:pos.x, top:pos.y, transform:'translate(-50%,-50%)', width:CW }}
              onMouseEnter={() => setHoveredId(s.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation()

                if (s.id === 'itproducts') {
                navigate('/services/it-products-sales')
              } else if (s.id === 'ewaste') {
                navigate('/services/e-waste-management')
              } else if (s.id === 'repair') {
                navigate('/services/repair-recovery')
              } else if (s.id === 'itsolutions') {
                navigate('/services/it-solutions')
              } else {
                setActiveId(prev => prev === s.id ? null : s.id)
              }
              }}
            >
              <div className="orbital-card-inner" style={{
                background: isActive ? 'linear-gradient(135deg,#f0f7ff,#fff)' : isHovered ? 'linear-gradient(135deg,#f8fbff,#fff)' : '#fff',
                border: isActive ? `1.5px solid ${s.color}55` : isHovered ? `1.5px solid ${s.color}44` : '1px solid rgba(59,130,246,0.15)',
                borderRadius: 14,
                padding: '12px 14px',
                boxShadow: isActive
                  ? `0 8px 32px ${s.color}33, 0 2px 8px rgba(0,0,0,0.10)`
                  : isHovered
                  ? `0 6px 24px ${s.color}28, 0 2px 8px rgba(0,0,0,0.08)`
                  : '0 4px 24px rgba(59,130,246,0.12), 0 1px 4px rgba(0,0,0,0.08)',
                transform: isHovered && !isActive ? 'scale(1.04)' : 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.2s ease',
              }}>
                <div style={{ background:s.iconBg, borderRadius:10, width:ICON_BOX, height:ICON_BOX, minWidth:ICON_BOX, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 0 14px ${s.color}44`, flexShrink:0 }}>
                  <Icon style={{ color:'#fff', width:26, height:26 }}/>
                </div>
                <div style={{ minWidth:0 }}>
                  <p style={{ color:'#0f172a', fontWeight:700, fontSize:cardTitlePx, lineHeight:1.25, margin:0, overflowWrap:'break-word', wordBreak:'break-word' }}>{s.title}</p>
                  <p style={{ color:s.color, fontSize:cardSubPx, marginTop:3, fontWeight:600, lineHeight:1.25, marginBottom:0, overflowWrap:'break-word' }}>{s.subtitle}</p>
                  {isHovered && !isActive && (
                    <p style={{ color:'#94a3b8', fontSize:11, margin:'4px 0 0 0', fontWeight:500 }}>Click to explore</p>
                  )}
                </div>
              </div>
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

      {/* ── Modals rendered OUTSIDE the scaled div — no clipping, correct size ── */}
      {visibleService && isMobile && (
        <MobileDetailModal service={visibleService} onClose={handleClose}/>
      )}
      {visibleService && !isMobile && (
        <DesktopModal service={visibleService} onClose={handleClose}/>
      )}
    </div>
  )
}