import React, { useState, useMemo } from 'react'
import { FiCpu, FiCloud, FiShield, FiTool, FiX } from 'react-icons/fi'

const services = [
  {
    title: 'Repair & Recovery',
    desc: 'PCB, data & server recovery solutions',
    icon: FiCpu,
    color: '#3b82f6',
    details: [
      'PCB diagnosis & IC/SMD repair',
      'Hard disk & SSD data recovery',
      'RAID array & corrupted file retrieval',
      'Server health monitoring & hardware replacements',
      'Backup solution setup & disaster planning',
    ],
  },
  {
    title: 'Network & Cloud',
    desc: 'LAN/WAN, WiFi, cloud migration & infrastructure',
    icon: FiCloud,
    color: '#0ea5e9',
    details: [
      'LAN/WAN infrastructure & WiFi deployment',
      'Enterprise connectivity & firewall setup',
      'AWS/Azure/GCP setup & cloud migration',
      'Cloud backup solutions & cost optimization',
      'SaaS deployment & cloud management',
    ],
  },
  {
    title: 'Security & AV',
    desc: 'Surveillance, access control and AV integration',
    icon: FiShield,
    color: '#16a34a',
    details: [
      'CCTV installation & NVR/DVR setup',
      'Access control & biometric systems',
      'Remote monitoring & analytics',
      'Conference room AV & video conferencing',
      'Digital signage & smart display systems',
    ],
  },
  {
    title: 'Maintenance & Automation',
    desc: 'AMC, automation services & renewable energy',
    icon: FiTool,
    color: '#22c55e',
    details: [
      'Annual maintenance contracts & preventive checks',
      'On-site support visits & priority SLA',
      'Industrial automation & SCADA integration',
      'Renewable energy integration & monitoring',
      'Hardware procurement & asset management',
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
    () => (isMobile ? 125 : 265),
    [isMobile]
  )

  const SIZE = useMemo(
    () => (isMobile ? 380 : 700),
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
            r={isMobile ? 92 : 195}
            fill="none"
            stroke="rgba(34,211,238,0.25)"
            strokeWidth="1"
          />

          <circle
            cx={CX}
            cy={CY}
            r={isMobile ? 70 : 160}
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
            width: isMobile ? 115 : 220,
            height: isMobile ? 115 : 220,
            left: CX,
            top: CY,
            transform: 'translate(-50%,-50%)',
          }}
        >

          <h2 className="text-white text-xl md:text-4xl font-extrabold leading-none">
            Our

            <span className="block text-cyan-400 mt-1">
              Services
            </span>

          </h2>

          <div className="w-10 md:w-16 h-1 bg-cyan-400 rounded-full my-2 md:my-3" />

          <p className="text-gray-300 text-[9px] md:text-sm max-w-[120px] md:max-w-[180px] leading-relaxed px-2">
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

              <div className="w-[92px] md:w-[170px] bg-[#081120]/90 border border-cyan-400/20 rounded-2xl p-3 md:p-5 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.1)]">

                <div
                  className="w-8 h-8 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-2 md:mb-3"
                  style={{
                    background: service.color,
                  }}
                >
                  <Icon className="text-white w-4 h-4 md:w-6 md:h-6" />
                </div>

                <h3 className="text-white text-[10px] md:text-lg font-bold leading-tight">
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