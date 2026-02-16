'use client'

import { motion } from 'framer-motion'
import ContractAddress from './ContractAddress'

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-white/5">
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-display font-bold text-2xl text-cyan-400/80 mb-6">
          $MOONX
        </p>
        <div className="flex justify-center mb-6 w-full px-4">
          <ContractAddress />
        </div>
        <p className="text-gray-500 text-sm">
          Born on Earth. Destined for the Moon. © {new Date().getFullYear()}
        </p>
      </motion.div>
    </footer>
  )
}
