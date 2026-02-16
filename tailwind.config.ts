import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#0a0a1a',
          deeper: '#050510',
          purple: '#7c3aed',
          blue: '#3b82f6',
          teal: '#14b8a6',
          neon: '#22d3ee',
        },
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 50%, #14b8a6 100%)',
        'gradient-space': 'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(20, 184, 166, 0.2) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'system-ui', 'sans-serif'],
        body: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
