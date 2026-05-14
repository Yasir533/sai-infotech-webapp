import React, { useState } from 'react'
import {
  FiCpu, FiHardDrive, FiWifi, FiShield,
  FiMonitor, FiCloud, FiTool, FiServer,
  FiSpeaker, FiVideo, FiWind, FiX,
} from 'react-icons/fi'

const services = [
  { title: 'Chip Level Repair', desc: 'PCB, IC & SMD-level hardware repair', icon: FiCpu, color: '#3b82f6',
    details: ['PCB diagnosis & repair', 'IC replacement & soldering', 'SMD-level component repair', 'Motherboard fault detection', 'GPU & CPU reballing'] },
  { title: 'Data Recovery', desc: 'HDD/SSD recovery & backup solutions', icon: FiHardDrive, color: '#2563eb',
    details: ['Hard disk data recovery', 'SSD data restoration', 'RAID array recovery', 'Corrupted file retrieval', 'Backup solution setup'] },
  { title: 'Network Setup', desc: 'LAN/WAN, WiFi & enterprise connectivity', icon: FiWifi, color: '#9333ea',
    details: ['LAN/WAN infrastructure', 'WiFi network deployment', 'Enterprise connectivity', 'Network security setup', 'Firewall configuration'] },
  { title: 'Security & Access', desc: 'CCTV surveillance & access control systems', icon: FiShield, color: '#16a34a',
    details: ['CCTV system installation', 'Access control systems', 'Biometric setup', 'Security audit', 'Remote monitoring'] },
  { title: 'Wind Power Control', desc: 'Industrial automation & renewable energy', icon: FiWind, color: '#22c55e',
    details: ['Wind turbine control systems', 'Industrial automation', 'Renewable energy integration', 'SCADA systems', 'Energy monitoring'] },
  { title: 'AV Solutions', desc: 'Audio Visual systems & smart integration', icon: FiSpeaker, color: '#7c3aed',
    details: ['Conference room AV setup', 'Smart display systems', 'Audio system installation', 'Video conferencing', 'Digital signage'] },
  { title: 'CCTV Solutions', desc: 'Advanced surveillance & monitoring systems', icon: FiVideo, color: '#10b981',
    details: ['HD camera installation', 'NVR/DVR setup', 'Remote surveillance access', 'Night vision systems', 'Analytics & alerts'] },
  { title: 'IT Solution (IT Sales/Rentals)', desc: 'IT sales, rentals & display infrastructure', icon: FiMonitor, color: '#f97316',
    details: ['Laptop & desktop sales', 'IT equipment rentals', 'Display infrastructure', 'Hardware procurement', 'Asset management'] },
  { title: 'Cloud Products', desc: 'Cloud setup, migration & management', icon: FiCloud, color: '#0ea5e9',
    details: ['Cloud migration services', 'AWS/Azure/GCP setup', 'Cloud backup solutions', 'SaaS deployment', 'Cloud cost optimization'] },
  { title: 'Annual Maintenance', desc: 'Comprehensive AMC & preventive support', icon: FiTool, color: '#d946ef',
    details: ['Annual maintenance contracts', 'Preventive maintenance', 'On-site support visits', 'Priority response SLA', 'Hardware health checks'] },
  { title: 'Server Maintenance', desc: 'Server upkeep, health & preventive maintenance', icon: FiServer, color: '#2563eb',
    details: ['Server health monitoring', 'OS updates & patching', 'Hardware replacements', 'Performance tuning', 'Disaster recovery planning'] },
]

const radius = 270
const SIZE = 740
const CX = SIZE / 2
const CY = SIZE / 2

export default function OrbitalServices() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="relative hidden xl:flex items-center justify-center w-full">
      {/* Square SVG canvas — always centered, never crops */}
      <div className="relative" style={{ width: SIZE, height: SIZE, maxWidth: '100%' }}>

        {/* SVG: rings + connector lines */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={SIZE} height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >
          <circle cx={CX} cy={CY} r="260" fill="none" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="220" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="170" fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth="1" />

          {services.map((service, index) => {
            const angle = (-90 + (360 / services.length) * index) * (Math.PI / 180)
            const ex = CX + Math.cos(angle) * 262
            const ey = CY + Math.sin(angle) * 262
            const cx2 = CX + Math.cos(angle) * radius
            const cy2 = CY + Math.sin(angle) * radius
            return (
              <g key={service.title}>
                <line x1={ex} y1={ey} x2={cx2} y2={cy2}
                  stroke="rgba(56,189,248,0.7)" strokeWidth="1.5" />
                <circle cx={cx2} cy={cy2} r="5" fill="#22d3ee"
                  style={{ filter: 'drop-shadow(0 0 6px #22d3ee)' }} />
              </g>
            )
          })}
        </svg>

        {/* Center hub */}
        <div
          className="absolute z-10 w-[300px] h-[300px] rounded-full bg-[#06111f]/90 border border-cyan-400/30 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,255,255,0.15)]"
          style={{ left: CX, top: CY, transform: 'translate(-50%,-50%)' }}
        >
          <div className="flex gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
            <div className="w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <h2 className="text-white text-5xl font-extrabold leading-none">
            Our<span className="block text-cyan-400 mt-1">Services</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-400 rounded-full my-4" />
          <p className="text-gray-300 text-sm max-w-[200px] leading-relaxed">
            Eleven specialized verticals from chip-level hardware to cloud infrastructure.
          </p>
        </div>

        {/* Service cards */}
        {services.map((service, index) => {
          const angle = (-90 + (360 / services.length) * index) * (Math.PI / 180)
          const cx2 = CX + Math.cos(angle) * radius
          const cy2 = CY + Math.sin(angle) * radius
          const Icon = service.icon
          return (
            <div
              key={service.title}
              className="absolute z-20 cursor-pointer"
              style={{ left: cx2, top: cy2, transform: 'translate(-50%,-50%)' }}
              onClick={() => setSelected(service)}
            >
              <div className="w-[120px] bg-[#081120]/90 border border-cyan-400/20 rounded-xl p-2.5 backdrop-blur-xl shadow-[0_0_15px_rgba(0,255,255,0.08)] hover:border-cyan-400/60 hover:scale-105 transition-all duration-300">
                <div className="w-4 h-4 rounded-md flex items-center justify-center mb-1.5 shadow-sm"
                  style={{ background: service.color }}>
                  <Icon className="text-white w-2 h-2" />
                </div>
                <h3 className="text-white text-[10px] font-bold leading-tight">{service.title}</h3>
                <p className="text-gray-400 text-[9px] mt-1 leading-snug">{service.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setSelected(null)}>
          <div className="relative bg-[#06111f] border border-cyan-400/30 rounded-2xl p-8 w-[420px] shadow-[0_0_60px_rgba(0,255,255,0.2)]"
            onClick={e => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              onClick={() => setSelected(null)}>
              <FiX className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                style={{ background: selected.color }}>
                <selected.icon className="text-white w-7 h-7" />
              </div>
              <div>
                <h3 className="text-white text-xl font-bold">{selected.title}</h3>
                <p className="text-cyan-400 text-sm mt-0.5">{selected.desc}</p>
              </div>
            </div>
            <div className="w-full h-px bg-cyan-400/20 mb-5" />
            <ul className="space-y-3">
              {selected.details.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
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
