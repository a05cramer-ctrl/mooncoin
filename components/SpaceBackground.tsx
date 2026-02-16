'use client'

import { motion } from 'framer-motion'

export default function SpaceBackground() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 3,
  }))

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-space-deeper via-space-dark to-space-deeper"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(124, 58, 237, 0.25) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 30% at 80% 60%, rgba(20, 184, 166, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 50%, rgba(34, 211, 238, 0.03) 0%, transparent 70%)
          `,
        }}
      />

      {/* Animated stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`p-${particle.id}`}
          className="absolute rounded-full bg-cyan-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
          }}
        />
      ))}

      {/* Nebula orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full -top-1/2 -left-1/4 blur-[120px] opacity-30"
        style={{ background: 'radial-gradient(circle, rgba(124, 58, 237, 0.6) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full -bottom-1/4 -right-1/4 blur-[100px] opacity-25"
        style={{ background: 'radial-gradient(circle, rgba(20, 184, 166, 0.5) 0%, transparent 70%)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </div>
  )
}
