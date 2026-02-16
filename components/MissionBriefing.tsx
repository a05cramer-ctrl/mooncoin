'use client'

import { motion } from 'framer-motion'

const manifesto = [
  {
    title: 'Decentralization',
    text: 'No dev wallets. No rug pulls. 100% community-owned. This is OUR moon mission.',
  },
  {
    title: 'Velocity',
    text: 'Solana speed. Sub-second trades. When the pump hits, you\'re already in.',
  },
  {
    title: 'Community',
    text: 'Diamond hands only. The crew that holds together, moons together. WAGMI.',
  },
  {
    title: 'Escape Velocity',
    text: 'We\'re not orbiting — we\'re LAUNCHING. Next stop: the actual moon. LFG.',
  },
]

export default function MissionBriefing() {
  return (
    <section id="mission" className="relative py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          Mission Briefing
        </h2>
        <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
          The alpha. Why $MOONX is the next 100x. Read this before you ape in.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {manifesto.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass glass-hover rounded-2xl p-6 border border-white/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="font-display font-semibold text-cyan-400 text-lg mb-3">
                {item.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
