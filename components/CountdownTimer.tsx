'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CountdownTimer() {
  // Next burn: 7 days from now (example)
  const [targetDate] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    d.setHours(12, 0, 0, 0)
    return d
  })

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  if (!mounted) return null

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Mins' },
    { value: timeLeft.seconds, label: 'Secs' },
  ]

  return (
    <motion.div
      className="glass rounded-2xl p-6 border-cyan-400/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <p className="text-cyan-400 font-display font-bold text-sm uppercase tracking-wider mb-4">
        🔥 MEGA BURN IN — DON&apos;T MISS IT
      </p>
      <div className="flex gap-4 justify-center">
        {units.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl glass flex items-center justify-center mb-2">
              <span className="text-2xl md:text-3xl font-display font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {String(value).padStart(2, '0')}
              </span>
            </div>
            <span className="text-xs text-gray-400 uppercase">{label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
