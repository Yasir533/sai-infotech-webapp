import { motion } from "framer-motion";

export default function FloatingParticles({
  count = 25,
  width = 700,
  height = 700,
}) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 5 + 2,
    x: Math.random() * width,
    y: Math.random() * height,
    duration: Math.random() * 8 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            background: "#22d3ee",
            boxShadow:
              "0 0 10px rgba(34,211,238,.8), 0 0 20px rgba(34,211,238,.4)",
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}