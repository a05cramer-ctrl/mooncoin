'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const PLACEHOLDER_ADDRESS = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'

export default function ContractAddress() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(PLACEHOLDER_ADDRESS)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers or non-HTTPS
      const input = document.createElement('input')
      input.value = PLACEHOLDER_ADDRESS
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      document.body.removeChild(input)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <motion.div
      className="glass rounded-xl p-4 flex items-center gap-3 w-full max-w-md min-w-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <span className="text-gray-400 text-sm font-mono truncate flex-1 min-w-0">
        {PLACEHOLDER_ADDRESS}
      </span>
      <motion.button
        type="button"
        onClick={copyToClipboard}
        className="px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/30 transition-colors shrink-0"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {copied ? '✓ Copied!' : 'Copy'}
      </motion.button>
    </motion.div>
  )
}
