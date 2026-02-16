'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#tokenomics', label: 'Tokenomics' },
  { href: '#roadmap', label: 'Roadmap' },
  { href: '#game', label: 'Play' },
  { href: '#community', label: 'Community' },
]

interface NavbarProps {
  moonClicks: number
  onMoonClick: () => void
}

export default function Navbar({ moonClicks, onMoonClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#"
          className="flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault()
            onMoonClick()
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-cyan-400/30 hover:ring-cyan-400/60 transition-all">
            <Image
              src="/logo.png"
              alt="Moon Coin"
              width={40}
              height={40}
              className="object-cover cursor-pointer"
              title="Click me 7 times..."
            />
          </div>
          <span className="font-display font-bold text-xl text-cyan-400 hidden sm:block">
            MOONX
          </span>
        </motion.a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-gray-400"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
