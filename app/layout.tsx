import type { Metadata } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Moon Coin ($MOONX) | Born on Earth. Destined for the Moon.',
  description: 'Moon Coin ($MOONX) - The next viral memecoin. Decentralization, velocity, community. Join the crew. Liquidity locked. Deflationary mechanics.',
  keywords: ['Moon Coin', 'MOONX', 'memecoin', 'crypto', 'Solana', 'decentralized', 'community'],
  openGraph: {
    title: 'Moon Coin ($MOONX) | Born on Earth. Destined for the Moon.',
    description: 'The next viral memecoin. Join the crew.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moon Coin ($MOONX) | Born on Earth. Destined for the Moon.',
    description: 'The next viral memecoin. Join the crew.',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  )
}
