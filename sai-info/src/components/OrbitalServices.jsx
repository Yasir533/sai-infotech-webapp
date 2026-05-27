import React, { useState, useMemo } from 'react'
import {
  FiCpu,
  FiHardDrive,
  FiWifi,
  FiShield,
  FiMonitor,
  FiCloud,
  FiTool,
  FiServer,
  FiSpeaker,
  FiVideo,
  FiWind,
  FiX,
} from 'react-icons/fi'

const services = [
  {
    title: 'Chip Level Repair',
    desc: 'PCB, IC & SMD-level hardware repair',
    icon: FiCpu,
    color: '#3b82f6',
    details: [
      'PCB diagnosis & repair',
      'IC replacement & soldering',
      'SMD-level component repair',
      'Motherboard fault detection',
      'GPU & CPU reballing',
    ],
  },
  {
    title: 'Data Recovery',
    desc: 'HDD/SSD recovery & backup solutions',
    icon: FiHardDrive,
    color: '#2563eb',
    details: [
      'Hard disk data recovery',
      'SSD data restoration',
      'RAID array recovery',
      'Corrupted file retrieval',
      'Backup solution setup',
    ],
  },
  {
    title: 'Data Central Management',
    desc: 'LAN/WAN, WiFi & enterprise connectivity',
    icon: FiWifi,
    color: '#9333ea',
    details: [
      'LAN/WAN infrastructure',
      'WiFi network deployment',
      'Enterprise connectivity',
      'Network security setup',
      'Firewall configuration',
    ],
  },
  {
    title: 'Security & Access',
    desc: 'CCTV surveillance & access control systems',
    icon: FiShield,
    color: '#16a34a',
    details: [
      'CCTV system installation',
      'Access control systems',
      'Biometric setup',
      'Security audit',
      'Remote monitoring',
    ],
  },
  {
    title: 'Wind Power Control',
    desc: 'Industrial automation & renewable energy',
    icon: FiWind,
    color: '#22c55e',
    details: [
      'Wind turbine control systems',
      'Industrial automation',
      'Renewable energy integration',
      'SCADA systems',
      'Energy monitoring',
    ],
  },
  {
    title: 'AV Solutions',
    desc: 'Audio Visual systems & smart integration',
    icon: FiSpeaker,
    color: '#7c3aed',
    details: [
      'Conference room AV setup',
      'Smart display systems',
      'Audio system installation',
      'Video conferencing',
      'Digital signage',
    ],
  },
  {
    title: 'CCTV Solutions',
    desc: 'Advanced surveillance & monitoring systems',
    icon: FiVideo,
    color: '#10b981',
    details: [
      'HD camera installation',
      'NVR/DVR setup',
      'Remote surveillance access',
      'Night vision systems',
      'Analytics & alerts',
    ],
  },
  {
    title: 'Automation Services',
    desc: 'IT sales, rentals & display infrastructure',
    icon: FiMonitor,
    color: '#f97316',
    details: [
      'Laptop & desktop sales',
      'IT equipment rentals',
      'Display infrastructure',
      'Hardware procurement',
      'Asset management',
    ],
  },
  {
    title: 'Cloud Products',
    desc: 'Cloud setup, migration & management',
    icon: FiCloud,
    color: '#0ea5e9',
    details: [
      'Cloud migration services',
      'AWS/Azure/GCP setup',
      'Cloud backup solutions',
      'SaaS deployment',
      'Cloud cost optimization',
    ],
  },
  {
    title: 'Annual Maintenance',
    desc: 'AMC & preventive support',
    icon: FiTool,
    color: '#d946ef',
    details: [
      'Annual maintenance contracts',
      'Preventive maintenance',
      'On-site support visits',
      'Priority response SLA',
      'Hardware health checks',
    ],
  },
  {
    title: 'Server Maintenance',
    desc: 'Server upkeep & maintenance',
    icon: FiServer,
    color: '#2563eb',
    details: [
      'Server health monitoring',
      'OS updates & patching',
      'Hardware replacements',
      'Performance tuning',
      'Disaster recovery planning',
    ],
  },
]

export default function OrbitalServices() {

  const [selected, setSelected] = useState(null)

  const isMobile =
    typeof window !== 'undefined' &&
    window.innerWidth < 768

  // MOBILE FIX ONLY
  const radius = useMemo(
    () => (isMobile ? 118 : 230),
    [isMobile]
  )

  const SIZE = useMemo(
    () => (isMobile ? 340 : 620),
    [isMobile]
  )

  // MOBILE CENTERED / DESKTOP SAME
  const CX = isMobile ? SIZE / 2 : SIZE / 2 + 40
  const CY = SIZE / 2

  return (

    <div className="relative flex items-center justify-center md:justify-end w-full overflow-hidden px-2 md:pr-24 py-10">

      <div
        className="relative"
        style={{
          width: SIZE,
          height: SIZE,
          maxWidth: '100%',
        }}
      >

        {/* SVG Rings */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
        >

          <circle
            cx={CX}
            cy={CY}
            r={isMobile ? 118 : 220}
            fill="none"
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="1"
          />

          <circle
            cx={CX}
            cy={CY}
            r={isMobile ? 95 : 190}
            fill="none"
            stroke="rgba(34,211,238,0.15)"
            strokeWidth="1"
          />

          {services.map((service, index) => {

            const angle =
              (-90 + (360 / services.length) * index) *
              (Math.PI / 180)

            const ex =
              CX + Math.cos(angle) * radius

            const ey =
              CY + Math.sin(angle) * radius

            return (

              <g key={service.title}>

                <line
                  x1={ex}
                  y1={ey}
                  x2={ex}
                  y2={ey}
                  stroke="rgba(56,189,248,0.6)"
                  strokeWidth="1"
                />

                <circle
                  cx={ex}
                  cy={ey}
                  r="4"
                  fill="#22d3ee"
                />

              </g>
            )
          })}

        </svg>

        {/* CENTER */}
        <div
          className="absolute z-10 rounded-full bg-[#06111f]/90 border border-cyan-400/30 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(0,255,255,0.15)]"
          style={{
            width: isMobile ? 145 : 300,
            height: isMobile ? 145 : 300,
            left: CX,
            top: CY,
            transform: 'translate(-50%,-50%)',
          }}
        >

          <h2 className="text-white text-2xl md:text-5xl font-extrabold leading-none">
            Our

            <span className="block text-cyan-400 mt-1">
              Services
            </span>

          </h2>

          <div className="w-12 md:w-20 h-1 bg-cyan-400 rounded-full my-3" />

          <p className="text-gray-300 text-[10px] md:text-sm max-w-[150px] md:max-w-[200px] leading-relaxed px-2">
            Drop-off, Walk-in, On-site & Pickup.
          </p>

        </div>

        {/* SERVICE CARDS */}
        {services.map((service, index) => {

          const angle =
            (-90 + (360 / services.length) * index) *
            (Math.PI / 180)

          const cx2 =
            CX + Math.cos(angle) * radius

          const cy2 =
            CY + Math.sin(angle) * radius

          const Icon = service.icon

          return (

            <div
              key={service.title}
              className="absolute z-20 cursor-pointer"
              style={{
                left: cx2,
                top: cy2,
                transform: 'translate(-50%,-50%)',
              }}
              onClick={() => setSelected(service)}
            >

              <div className="w-[58px] md:w-[105px] bg-[#081120]/90 border border-cyan-400/20 rounded-xl p-2 backdrop-blur-xl shadow-[0_0_15px_rgba(0,255,255,0.08)]">

                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center mb-1"
                  style={{
                    background: service.color,
                  }}
                >
                  <Icon className="text-white w-3 h-3" />
                </div>

                <h3 className="text-white text-[7px] md:text-[13px] font-bold leading-tight">
                  {service.title}
                </h3>

              </div>

            </div>
          )
        })}

      </div>

      {/* MODAL */}
      {selected && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setSelected(null)}
        >

          <div
            className="relative bg-[#06111f] border border-cyan-400/30 rounded-2xl p-6 md:p-8 w-full max-w-md shadow-[0_0_60px_rgba(0,255,255,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => setSelected(null)}
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6">

              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{
                  background: selected.color,
                }}
              >
                <selected.icon className="text-white w-7 h-7" />
              </div>

              <div>
                <h3 className="text-white text-xl font-bold">
                  {selected.title}
                </h3>

                <p className="text-cyan-400 text-sm mt-1">
                  {selected.desc}
                </p>
              </div>

            </div>

            <ul className="space-y-3">

              {selected.details.map((item, i) => (

                <li
                  key={i}
                  className="flex items-start gap-3"
                >

                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5" />

                  <span className="text-gray-300 text-sm">
                    {item}
                  </span>

                </li>

              ))}

            </ul>

          </div>

        </div>

      )}

    </div>
  )
}