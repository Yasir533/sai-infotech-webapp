import { motion } from "framer-motion";

export default function OrbitGlobe({ isMobile = false }) {
  return (
    <div
      className="absolute z-20"
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
        
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 globe-grid"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Second Layer */}
        <motion.div
          className="absolute inset-0 globe-grid opacity-40"
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Center Glow */}
        <div className="absolute inset-0 globe-core" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h2
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-white font-extrabold tracking-wide"
            style={{
              fontSize: isMobile ? "18px" : "34px",
            }}
          >
            OUR
          </motion.h2>

          <motion.h2
            animate={{
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
            className="text-cyan-400 font-extrabold tracking-wide"
            style={{
              fontSize: isMobile ? "20px" : "38px",
            }}
          >
            SERVICES
          </motion.h2>

          <div className="w-16 h-[2px] bg-cyan-400 rounded-full mt-2 mb-3" />

          <p
            className="text-gray-300"
            style={{
              fontSize: isMobile ? "10px" : "13px",
            }}
          >
            Smart IT Solutions
          </p>

          <p
            className="text-gray-400 mt-1"
            style={{
              fontSize: isMobile ? "8px" : "11px",
            }}
          >
            Walk-In • On-Site • Pickup
          </p>
        </div>
      </div>
    </div>
  );
}