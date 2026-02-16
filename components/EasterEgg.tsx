'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface EasterEggProps {
  isActive: boolean
  onClose: () => void
}

export default function EasterEgg({ isActive, onClose }: EasterEggProps) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            className="relative glass rounded-3xl p-8 max-w-md text-center border-2 border-cyan-400/50"
            initial={{ scale: 0.5, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 60px rgba(34, 211, 238, 0.4), 0 0 100px rgba(124, 58, 237, 0.2)',
            }}
          >
            <div className="text-6xl mb-4 animate-bounce">🚀🌕✨</div>
            <h3 className="font-display text-2xl font-bold text-cyan-400 mb-2">
              You found the secret!
            </h3>
            <p className="text-gray-300 mb-6">
              You&apos;re a true moon mission member. WAGMI! 🚀
            </p>
            <motion.button
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-display font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              To the Moon!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
