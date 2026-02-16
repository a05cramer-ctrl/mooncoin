'use client'

const xIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

interface SocialIconsProps {
  className?: string
}

export default function SocialIcons({ className = '' }: SocialIconsProps) {
  const links = [
    { name: 'X', href: 'https://x.com/MoonCoin_Dev', icon: xIcon },
  ]

  return (
    <div className={`flex gap-6 ${className}`}>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full glass glass-hover flex items-center justify-center text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </div>
  )
}
