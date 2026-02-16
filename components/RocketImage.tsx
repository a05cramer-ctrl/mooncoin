'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const imageFrameStyle = {
  background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(34, 211, 238, 0.2) 50%, rgba(20, 184, 166, 0.3) 100%)',
  boxShadow: '0 0 40px rgba(124, 58, 237, 0.2), 0 0 80px rgba(34, 211, 238, 0.1)',
}

export default function RocketImage() {
  return (
    <motion.section
      className="py-16 px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            className="relative rounded-2xl overflow-hidden p-1"
            style={imageFrameStyle}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass">
              <Image
                src="/rocket-launch.png"
                alt="Moon Coin rocket launching through space"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
          <motion.div
            className="relative rounded-2xl overflow-hidden p-1"
            style={imageFrameStyle}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden glass">
              <Image
                src="/rocket-galaxy.png"
                alt="Moon Coin rocket soaring through the galaxy"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
