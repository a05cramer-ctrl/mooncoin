'use client'

import { motion } from 'framer-motion'

export default function HypeBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-400/30 mb-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <span className="font-display font-bold text-sm text-green-400">
        LIVE — NEXT 100x INCOMING
      </span>
    </motion.div>
  )
}
