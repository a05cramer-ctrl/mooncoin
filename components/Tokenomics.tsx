'use client'

import { motion } from 'framer-motion'

const tokenomics = [
  {
    title: 'Total Supply',
    value: '1,000,000,000',
    subtitle: '$MOONX',
    icon: '🌕',
  },
  {
    title: 'Fuel Burn',
    value: '2%',
    subtitle: 'Deflation mechanic per tx',
    icon: '🔥',
  },
  {
    title: 'Stabilized Orbit',
    value: '100%',
    subtitle: 'LP locked — RUG-PROOF',
    icon: '🔒',
  },
  {
    title: 'Crew Allocation',
    value: '90%',
    subtitle: 'Community share',
    icon: '👥',
  },
]

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-teal-400 bg-clip-text text-transparent">
          Tokenomics
        </h2>
        <p className="text-gray-400 text-center text-lg mb-16 max-w-2xl mx-auto">
          RUG-PROOF. Liquidity locked. Deflationary burn. Built different. 💎
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tokenomics.map((item, i) => (
            <motion.div
              key={item.title}
              className="glass rounded-2xl p-6 border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.05)',
              }}
            >
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="font-display font-semibold text-gray-300 text-sm uppercase tracking-wider mb-2">
                {item.title}
              </h3>
              <p className="text-2xl font-display font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {item.value}
              </p>
              <p className="text-gray-500 text-sm mt-1">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
