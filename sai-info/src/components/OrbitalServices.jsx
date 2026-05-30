import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  FiCpu,
  FiCloud,
  FiShield,
  FiTool,
  FiX,
} from "react-icons/fi";

import OrbitGlobe from "./OrbitGlobe";
import FloatingParticles from "./FloatingParticles";

import "../styles/orbital.css";

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

const badges = [
  "10+ Years",
  "100+ Clients",
  "24/7 Support",
  "Pan India",
];

export default function OrbitalServices() {
  const [selected, setSelected] = useState(null);

  const isMobile =
    typeof window !== "undefined" &&
    window.innerWidth < 768;

  const SIZE = isMobile ? 420 : 850;

  const CX = SIZE / 2;
  const CY = SIZE / 2;

  const radius = isMobile ? 150 : 300;

return (
  <div className="relative flex justify-center items-center py-20 overflow-hidden">

    <div className="orbit-background-glow" />

    <div
      className="relative"
      style={{
        width: SIZE,
        height: SIZE,
      }}
    >

<FloatingParticles
  count={30}
  width={SIZE}
  height={SIZE}
/>


<svg
  className="absolute inset-0 orbit-ring"
  width={SIZE}
  height={SIZE}
>
  {[120, 180, 240, 300, 360].map((r, i) => (
    <circle
      key={i}
      cx={CX}
      cy={CY}
      r={isMobile ? r * 0.55 : r}
      fill="none"
      stroke="rgba(34,211,238,.12)"
      strokeWidth="1"
      strokeDasharray={i % 2 ? "10 12" : ""}
    />
  ))}
</svg>

<svg
  className="absolute inset-0"
  width={SIZE}
  height={SIZE}
>
  
  {services.map((service, index) => {
    const angle =
      (-90 + (360 / services.length) * index) *
      (Math.PI / 180);

    const x =
      CX + Math.cos(angle) * radius;

    const y =
      CY + Math.sin(angle) * radius;

    return (
      <path
        key={index}
        d={`
          M ${CX} ${CY}
          Q ${(CX + x) / 2}
          ${(CY + y) / 2 - 60}
          ${x}
          ${y}
        `}
        fill="none"
        stroke="rgba(34,211,238,.18)"
        strokeWidth="1.5"
      />
    );
  })}
</svg>

<div
  className="absolute"
  style={{
    left: CX,
    top: CY,
    transform:
      "translate(-50%,-50%)",
  }}
>
  <OrbitGlobe isMobile={isMobile} />
</div>

{badges.map((badge, i) => {
  const angle =
    (-45 + i * 90) *
    (Math.PI / 180);

  const x =
    CX + Math.cos(angle) * (radius + 110);

  const y =
    CY + Math.sin(angle) * (radius + 110);

  return (
    <motion.div
      key={badge}
      className="orbit-badge"
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4 + i,
        repeat: Infinity,
      }}
      style={{
        left: x,
        top: y,
      }}
    >
      {badge}
    </motion.div>
  );
})}

{services.map((service, index) => {
  const angle =
    (-90 + (360 / services.length) * index) *
    (Math.PI / 180);

  const x =
    CX + Math.cos(angle) * radius;

  const y =
    CY + Math.sin(angle) * radius;

  const Icon = service.icon;

  return (
    <motion.div
      key={service.title}
      className="absolute z-20"
      style={{
        left: x,
        top: y,
        transform:
          "translate(-50%,-50%)",
      }}
      whileHover={{
        scale: 1.08,
      }}
      onClick={() =>
        setSelected(service)
      }
    >
      <div className="service-card">
        <div
          className="service-icon"
          style={{
            background:
              service.color,
          }}
        >
          <Icon />
        </div>

        <h3>{service.title}</h3>

        <p>{service.desc}</p>
      </div>
    </motion.div>
  );
})}

</div>
<AnimatePresence>
  {selected && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelected(null)}
    >
      <motion.div
        className="relative bg-[#06111f] border border-cyan-400/30 rounded-2xl p-6 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
          onClick={() => setSelected(null)}
        >
          <FiX />
        </button>

        <h3 className="text-white text-xl font-bold mb-2">
          {selected.title}
        </h3>

        <p className="text-cyan-400 mb-4">
          {selected.desc}
        </p>

        <ul className="space-y-2">
          {selected.details.map((item, i) => (
            <li
              key={i}
              className="text-gray-300 text-sm"
            >
              • {item}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

</div>
);
}