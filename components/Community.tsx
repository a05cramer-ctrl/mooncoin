'use client'

import { motion } from 'framer-motion'

const memePlaceholders = [
  { id: 1, emoji: '🚀', label: 'WEN MOON' },
  { id: 2, emoji: '🌕', label: 'MOON GANG' },
  { id: 3, emoji: '💎', label: 'DIAMOND HANDS' },
  { id: 4, emoji: '🔥', label: 'LFG' },
  { id: 5, emoji: '👨‍🚀', label: 'WAGMI' },
  { id: 6, emoji: '📈', label: '100x INCOMING' },
]

export default function Community() {
  return (
    <section id="community" className="relative py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          The Crew
        </h2>
        <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
          Diamond hands only. NGMI if you sell. Join the moon mission — WAGMI.
        </p>

        {/* Meme gallery grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {memePlaceholders.map((meme, i) => (
            <motion.div
              key={meme.id}
              className="glass glass-hover rounded-xl p-6 aspect-square flex flex-col items-center justify-center border border-white/5"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -5, borderColor: 'rgba(34, 211, 238, 0.3)' }}
            >
              <span className="text-5xl mb-2">{meme.emoji}</span>
              <span className="text-gray-400 text-sm">{meme.label}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-300 mb-6 text-xl font-display font-semibold">
            Still here? APE IN. Don&apos;t miss the pump.
          </p>
          <motion.a
            href="#"
            className="inline-block px-8 py-4 rounded-xl font-display font-bold text-lg bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 text-white border-2 border-cyan-400/40 hover:border-cyan-400 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            🚀 BUY $MOONX — LFG
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
