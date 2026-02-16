'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import SocialIcons from './SocialIcons'
import HypeBadge from './HypeBadge'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      <motion.div
        className="text-center z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <HypeBadge />
        {/* Mission patch logo */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <div
            className="relative rounded-full p-1"
            style={{
              background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(34, 211, 238, 0.3) 50%, rgba(20, 184, 166, 0.4) 100%)',
              boxShadow: '0 0 60px rgba(124, 58, 237, 0.4), 0 0 100px rgba(34, 211, 238, 0.2), inset 0 0 40px rgba(255,255,255,0.05)',
            }}
          >
            <motion.div
              className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image
                src="/logo.png"
                alt="Moon Coin - Mission Patch Logo"
                width={256}
                height={256}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </div>
          <motion.span
            className="block text-2xl md:text-3xl text-cyan-400/95 mt-4 font-display font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            $MOONX
          </motion.span>
        </motion.div>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-300 font-body max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Born on Earth. Destined for the Moon.
        </motion.p>
        <motion.p
          className="text-2xl md:text-3xl font-display font-bold mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            WEN MOON? NOW. LFG 🚀
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <motion.a
            href="#"
            className="px-8 py-4 rounded-xl font-display font-bold text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white border-2 border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 APE IN — BUY $MOONX
          </motion.a>
          <motion.a
            href="#"
            className="px-8 py-4 rounded-xl font-display font-semibold text-lg glass glass-hover text-cyan-400 border-cyan-400/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            View Chart
          </motion.a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <SocialIcons />
        </motion.div>
      </motion.div>

    </section>
  )
}
