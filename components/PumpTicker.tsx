'use client'

import { motion } from 'framer-motion'

const tickerItems = [
  '🚀 TO THE MOON',
  '💎 DIAMOND HANDS',
  '🔥 $MOONX PUMPING',
  '🌕 WEN MOON? NOW.',
  '⚡ LFG',
  '💪 WAGMI',
  '📈 NEXT 100x',
  '🦍 APE IN',
  '✨ RUG-PROOF',
  '🎯 MOON MISSION',
]

export default function PumpTicker() {
  return (
    <div className="relative overflow-hidden border-y border-cyan-400/20 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-teal-500/10 py-3">
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <span
            key={i}
            className="font-display font-bold text-lg text-cyan-400/90"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
