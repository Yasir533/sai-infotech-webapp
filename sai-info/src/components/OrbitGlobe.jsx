import { motion } from "framer-motion";

export default function OrbitGlobe({ isMobile = false }) {
  return (
    <div
      className="relative z-20"
      style={{
        width: isMobile ? 140 : 280,
        height: isMobile ? 140 : 280,
      }}
    >
      {/* Outer Glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(34,211,238,0.08) 45%, transparent 75%)",
          filter: "blur(20px)",
        }}
      />

      {/* Globe Container */}
      <div className="relative w-full h-full rounded-full overflow-hidden globe-border">

        <div className="absolute inset-0 globe-halo" />

        <div className="absolute inset-0 globe-planet-shadow" />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 globe-grid"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Second Layer */}
        <motion.div
          className="absolute inset-0 globe-grid opacity-40"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Center Glow */}
        <div className="absolute inset-0 globe-core" />

        {/* World Map Overlay */}
        <svg
          className="absolute inset-0 w-full h-full globe-map"
          viewBox="0 0 280 280"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <g fill="rgba(0,200,255,0.22)" stroke="rgba(0,102,255,0.28)" strokeWidth="1">
            <path d="M54 100c10-18 28-28 42-22 8 3 14 10 18 18-8 8-22 14-34 18-10 4-18 4-26 0-7-4-9-8 0-14z" />
            <path d="M100 141c9-6 22-8 33-4 8 3 14 9 15 16 1 7-4 14-12 18-11 5-25 4-34-2-9-5-11-19-2-28z" />
            <path d="M151 79c10-8 25-12 38-10 10 1 18 6 23 13-5 9-15 16-26 20-13 5-24 4-34-1-8-5-12-12-1-22z" />
            <path d="M184 133c10-5 24-6 34-2 10 4 17 12 18 20-6 8-18 14-31 16-13 2-26-1-34-8-7-7-4-18 13-26z" />
            <path d="M143 184c7-4 15-5 22-2 6 2 12 8 12 14 0 7-5 13-13 16-9 4-20 3-27-1-8-5-9-19 6-27z" />
            <path d="M74 185c6-4 13-5 20-3 6 2 10 7 11 12 0 7-4 12-11 15-8 3-18 2-24-2-6-4-7-15 4-22z" />
          </g>
        </svg>

        <motion.div
          className="absolute inset-0 globe-latlong"
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />

        <motion.div
          className="absolute inset-0 globe-latlong globe-latlong-alt"
          animate={{ rotate: -360 }}
          transition={{ duration: 72, repeat: Infinity, ease: "linear" }}
          aria-hidden="true"
        />

        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.h2
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-white font-extrabold tracking-wide"
            style={{ fontSize: isMobile ? "18px" : "34px" }}
          >
            OUR
          </motion.h2>

          <motion.h2
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-cyan-400 font-extrabold tracking-wide"
            style={{ fontSize: isMobile ? "20px" : "38px" }}
          >
            SERVICES
          </motion.h2>

          <div className="w-16 h-[2px] bg-cyan-400 rounded-full mt-2 mb-3" />

          <p
            className="text-gray-300"
            style={{ fontSize: isMobile ? "10px" : "13px" }}
          >
            Smart IT Solutions
          </p>

          <p
            className="text-gray-400 mt-1"
            style={{ fontSize: isMobile ? "8px" : "11px" }}
          >
            Walk-In • On-Site • Pickup
          </p>
        </div>
      </div>
    </div>
  );
}