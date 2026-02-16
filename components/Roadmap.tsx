'use client'

import { motion } from 'framer-motion'

const phases = [
  {
    phase: 1,
    title: 'Ignition',
    items: ['Token launch', 'Community formation', 'Initial LP locked'],
  },
  {
    phase: 2,
    title: 'Liftoff',
    items: ['CEX listings', 'Viral marketing', 'Influencer partnerships'],
  },
  {
    phase: 3,
    title: 'Lunar Orbit',
    items: ['DEX expansion', 'Staking rewards', 'NFT collection'],
  },
  {
    phase: 4,
    title: 'Deep Space',
    items: ['Cross-chain bridge', 'Ecosystem growth', 'MOON LANDING'],
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 px-6">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          Mission Phases
        </h2>
        <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
          The path to 100x. We&apos;re not stopping until we hit the moon. LFG.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-cyan-500 to-teal-500 -translate-x-1/2" />

          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              className={`relative flex items-start gap-8 mb-12 last:mb-0 ${
                i % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              {/* Rocket progress dot */}
              <div className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-cyan-400 -translate-x-1/2 mt-6 z-10 ring-4 ring-space-deeper" />

              <div className={`flex-1 ml-16 md:ml-0 ${i % 2 === 1 ? 'md:text-right' : ''}`}>
                <motion.div
                  className="glass rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all"
                  whileHover={{ scale: 1.02 }}
                >
                  <span className="text-cyan-400 font-display font-bold text-sm">
                    Phase {phase.phase}
                  </span>
                  <h3 className="font-display font-semibold text-xl mt-2 text-white">
                    {phase.title}
                  </h3>
                  <ul className={`mt-4 space-y-2 ${i % 2 === 1 ? 'md:ml-auto' : ''}`}>
                    {phase.items.map((item) => (
                      <li
                        key={item}
                        className={`text-gray-400 text-sm flex items-center gap-2 ${
                          i % 2 === 1 ? 'md:justify-end' : ''
                        }`}
                      >
                        <span className="text-cyan-400">▸</span> {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
