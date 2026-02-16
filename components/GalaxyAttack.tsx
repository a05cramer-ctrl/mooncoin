'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const GAME_WIDTH = 400
const GAME_HEIGHT = 500
const PLAYER_WIDTH = 48
const PLAYER_HEIGHT = 60
const BULLET_SPEED = 8
const ENEMY_SPEED_BASE = 1.5
const ENEMY_WIDTH = 30
const ENEMY_HEIGHT = 25

interface Bullet {
  x: number
  y: number
}

interface Enemy {
  x: number
  y: number
  width: number
  height: number
}

interface Star {
  x: number
  y: number
  speed: number
  size: number
}

function drawRocket(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, time: number) {
  const cx = x + w / 2

  // Rainbow exhaust
  const gradient = ctx.createLinearGradient(cx, y + h, cx, y + h + 25)
  const hueShift = (time / 30) % 360
  gradient.addColorStop(0, `hsl(${(40 + hueShift) % 360}, 100%, 70%)`)
  gradient.addColorStop(0.25, `hsl(${(60 + hueShift) % 360}, 100%, 60%)`)
  gradient.addColorStop(0.5, `hsl(${(120 + hueShift) % 360}, 100%, 60%)`)
  gradient.addColorStop(0.75, `hsl(${(220 + hueShift) % 360}, 100%, 60%)`)
  gradient.addColorStop(1, `hsl(${(280 + hueShift) % 360}, 100%, 60%)`)

  const flicker = 0.8 + Math.sin(time / 3) * 0.2
  const exhaustH = 25 * flicker

  ctx.save()
  ctx.globalAlpha = 0.9
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(cx - 10, y + h)
  ctx.quadraticCurveTo(cx - 14, y + h + exhaustH * 0.6, cx - 5, y + h + exhaustH)
  ctx.quadraticCurveTo(cx, y + h + exhaustH + 5, cx + 5, y + h + exhaustH)
  ctx.quadraticCurveTo(cx + 14, y + h + exhaustH * 0.6, cx + 10, y + h)
  ctx.closePath()
  ctx.fill()

  // Exhaust glow
  ctx.globalAlpha = 0.3
  ctx.shadowBlur = 20
  ctx.shadowColor = '#f97316'
  ctx.fill()
  ctx.shadowBlur = 0
  ctx.globalAlpha = 1
  ctx.restore()

  // Fins - left
  ctx.fillStyle = '#7c3aed'
  ctx.beginPath()
  ctx.moveTo(cx - w / 2 + 4, y + h - 5)
  ctx.lineTo(cx - w / 2 - 6, y + h + 5)
  ctx.lineTo(cx - w / 2 - 2, y + h - 15)
  ctx.closePath()
  ctx.fill()

  // Fins - right
  ctx.beginPath()
  ctx.moveTo(cx + w / 2 - 4, y + h - 5)
  ctx.lineTo(cx + w / 2 + 6, y + h + 5)
  ctx.lineTo(cx + w / 2 + 2, y + h - 15)
  ctx.closePath()
  ctx.fill()

  // Body - metallic silver gradient
  const bodyGrad = ctx.createLinearGradient(cx - w / 2, y, cx + w / 2, y)
  bodyGrad.addColorStop(0, '#94a3b8')
  bodyGrad.addColorStop(0.3, '#f1f5f9')
  bodyGrad.addColorStop(0.5, '#e2e8f0')
  bodyGrad.addColorStop(0.7, '#f1f5f9')
  bodyGrad.addColorStop(1, '#94a3b8')
  ctx.fillStyle = bodyGrad
  ctx.beginPath()
  ctx.moveTo(cx, y)
  ctx.quadraticCurveTo(cx + w / 2 + 2, y + h * 0.3, cx + w / 2, y + h)
  ctx.lineTo(cx - w / 2, y + h)
  ctx.quadraticCurveTo(cx - w / 2 - 2, y + h * 0.3, cx, y)
  ctx.closePath()
  ctx.fill()

  // Body outline purple/blue reflection
  ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Nose cone highlight
  const noseGrad = ctx.createLinearGradient(cx, y, cx, y + 15)
  noseGrad.addColorStop(0, 'rgba(255,255,255,0.7)')
  noseGrad.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = noseGrad
  ctx.beginPath()
  ctx.moveTo(cx, y)
  ctx.quadraticCurveTo(cx + 8, y + 8, cx + 5, y + 15)
  ctx.lineTo(cx - 5, y + 15)
  ctx.quadraticCurveTo(cx - 8, y + 8, cx, y)
  ctx.closePath()
  ctx.fill()

  // Window (blue glow)
  const windowY = y + h * 0.3
  ctx.beginPath()
  ctx.arc(cx, windowY, 6, 0, Math.PI * 2)
  const windowGrad = ctx.createRadialGradient(cx - 2, windowY - 2, 1, cx, windowY, 6)
  windowGrad.addColorStop(0, '#93c5fd')
  windowGrad.addColorStop(0.5, '#3b82f6')
  windowGrad.addColorStop(1, '#1e40af')
  ctx.fillStyle = windowGrad
  ctx.fill()
  ctx.strokeStyle = 'rgba(34, 211, 238, 0.8)'
  ctx.lineWidth = 1.5
  ctx.stroke()

  // Window shine
  ctx.beginPath()
  ctx.arc(cx - 2, windowY - 2, 2, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,255,255,0.7)'
  ctx.fill()

  // Bands on body
  ctx.strokeStyle = 'rgba(124, 58, 237, 0.3)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(cx - w / 2 + 3, y + h * 0.55)
  ctx.lineTo(cx + w / 2 - 3, y + h * 0.55)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx - w / 2 + 2, y + h * 0.7)
  ctx.lineTo(cx + w / 2 - 2, y + h * 0.7)
  ctx.stroke()
}

export default function GalaxyAttack() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rocketImgRef = useRef<HTMLImageElement | null>(null)
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle')
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [highScore, setHighScore] = useState(0)
  const scoreRef = useRef(0)
  const starsRef = useRef<Star[]>([])
  const frameRef = useRef(0)
  const gameRef = useRef({
    playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
    playerY: GAME_HEIGHT - PLAYER_HEIGHT - 20,
    bullets: [] as Bullet[],
    enemies: [] as Enemy[],
    keys: { left: false, right: false, shoot: false },
    lastShot: 0,
    enemySpawnTimer: 0,
    lives: 3,
  })

  // Init stars
  if (starsRef.current.length === 0) {
    starsRef.current = Array.from({ length: 50 }, () => ({
      x: Math.random() * GAME_WIDTH,
      y: Math.random() * GAME_HEIGHT,
      speed: Math.random() * 2 + 0.5,
      size: Math.random() * 2 + 0.5,
    }))
  }

  const startGame = useCallback(() => {
    scoreRef.current = 0
    frameRef.current = 0
    gameRef.current = {
      playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
      playerY: GAME_HEIGHT - PLAYER_HEIGHT - 20,
      bullets: [],
      enemies: [],
      keys: { left: false, right: false, shoot: false },
      lastShot: 0,
      enemySpawnTimer: 0,
      lives: 3,
    }
    setScore(0)
    setLives(3)
    setGameState('playing')
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return
      if (e.code === 'ArrowLeft') gameRef.current.keys.left = true
      if (e.code === 'ArrowRight') gameRef.current.keys.right = true
      if (e.code === 'Space') {
        e.preventDefault()
        gameRef.current.keys.shoot = true
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') gameRef.current.keys.left = false
      if (e.code === 'ArrowRight') gameRef.current.keys.right = false
      if (e.code === 'Space') gameRef.current.keys.shoot = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    let animationId: number

    const gameLoop = () => {
      frameRef.current++
      const frame = frameRef.current
      const game = gameRef.current
      const stars = starsRef.current

      // Clear
      ctx.fillStyle = '#050510'
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Nebula background
      const nebulaGrad = ctx.createRadialGradient(GAME_WIDTH * 0.3, GAME_HEIGHT * 0.2, 0, GAME_WIDTH * 0.3, GAME_HEIGHT * 0.2, 200)
      nebulaGrad.addColorStop(0, 'rgba(124, 58, 237, 0.06)')
      nebulaGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = nebulaGrad
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      const nebulaGrad2 = ctx.createRadialGradient(GAME_WIDTH * 0.8, GAME_HEIGHT * 0.7, 0, GAME_WIDTH * 0.8, GAME_HEIGHT * 0.7, 150)
      nebulaGrad2.addColorStop(0, 'rgba(20, 184, 166, 0.05)')
      nebulaGrad2.addColorStop(1, 'transparent')
      ctx.fillStyle = nebulaGrad2
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

      // Stars - always scrolling
      stars.forEach((s) => {
        s.y += s.speed
        if (s.y > GAME_HEIGHT) {
          s.y = 0
          s.x = Math.random() * GAME_WIDTH
        }
        const alpha = 0.3 + Math.sin(frame / 20 + s.x) * 0.3
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fillRect(s.x, s.y, s.size, s.size)
      })

      if (gameState === 'idle') {
        // Draw idle rocket in center, gently bobbing
        const bob = Math.sin(frame / 30) * 6
        drawRocket(ctx, GAME_WIDTH / 2 - PLAYER_WIDTH / 2, GAME_HEIGHT / 2 - PLAYER_HEIGHT / 2 + bob, PLAYER_WIDTH, PLAYER_HEIGHT, frame)
        animationId = requestAnimationFrame(gameLoop)
        return
      }

      if (gameState !== 'playing') {
        animationId = requestAnimationFrame(gameLoop)
        return
      }

      // Move player
      if (game.keys.left) game.playerX = Math.max(0, game.playerX - 6)
      if (game.keys.right) game.playerX = Math.min(GAME_WIDTH - PLAYER_WIDTH, game.playerX + 6)

      // Shoot
      const now = Date.now()
      if (game.keys.shoot && now - game.lastShot > 150) {
        game.bullets.push({
          x: game.playerX + PLAYER_WIDTH / 2 - 2,
          y: game.playerY,
        })
        game.lastShot = now
      }

      // Move bullets
      game.bullets = game.bullets.filter((b) => {
        b.y -= BULLET_SPEED
        return b.y > 0
      })

      // Enemy speed scales with score
      const enemySpeed = ENEMY_SPEED_BASE + Math.min(scoreRef.current / 200, 3)
      const spawnRate = Math.max(15, 30 - Math.floor(scoreRef.current / 100))

      // Spawn enemies
      game.enemySpawnTimer++
      if (game.enemySpawnTimer > spawnRate) {
        game.enemySpawnTimer = 0
        game.enemies.push({
          x: Math.random() * (GAME_WIDTH - ENEMY_WIDTH),
          y: -ENEMY_HEIGHT,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
        })
      }

      // Move enemies
      game.enemies = game.enemies.filter((e) => {
        e.y += enemySpeed
        if (e.y > GAME_HEIGHT) return false

        // Check collision with player
        if (
          game.playerX < e.x + e.width &&
          game.playerX + PLAYER_WIDTH > e.x &&
          game.playerY < e.y + e.height &&
          game.playerY + PLAYER_HEIGHT > e.y
        ) {
          game.lives--
          setLives(game.lives)
          if (game.lives <= 0) {
            setHighScore((h) => Math.max(h, scoreRef.current))
            setGameState('gameover')
          }
          return false
        }
        return true
      })

      // Check bullet-enemy collision
      game.bullets = game.bullets.filter((bullet) => {
        const hit = game.enemies.findIndex(
          (e) =>
            bullet.x > e.x &&
            bullet.x < e.x + e.width &&
            bullet.y > e.y &&
            bullet.y < e.y + e.height
        )
        if (hit >= 0) {
          game.enemies.splice(hit, 1)
          scoreRef.current += 10
          setScore(scoreRef.current)
          return false
        }
        return true
      })

      // Draw bullets (cyan laser)
      game.bullets.forEach((b) => {
        ctx.fillStyle = '#22d3ee'
        ctx.shadowBlur = 8
        ctx.shadowColor = '#22d3ee'
        ctx.fillRect(b.x, b.y, 4, 14)
        ctx.shadowBlur = 0
      })

      // Draw enemies (alien spaceships)
      game.enemies.forEach((e) => {
        const ecx = e.x + e.width / 2
        const ecy = e.y + e.height / 2
        const w = e.width
        const h = e.height
        const wobble = Math.sin(frame / 10 + e.x) * 2

        // Engine glow underneath
        ctx.save()
        ctx.globalAlpha = 0.4 + Math.sin(frame / 5 + e.x) * 0.2
        const engineGlow = ctx.createRadialGradient(ecx, e.y + h + 2, 0, ecx, e.y + h + 2, 12)
        engineGlow.addColorStop(0, '#ef4444')
        engineGlow.addColorStop(0.5, 'rgba(239, 68, 68, 0.3)')
        engineGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = engineGlow
        ctx.fillRect(ecx - 12, e.y + h - 4, 24, 16)
        ctx.restore()

        // Saucer body (disc shape)
        const bodyGrad = ctx.createLinearGradient(ecx, e.y, ecx, e.y + h)
        bodyGrad.addColorStop(0, '#374151')
        bodyGrad.addColorStop(0.4, '#6b7280')
        bodyGrad.addColorStop(0.5, '#9ca3af')
        bodyGrad.addColorStop(0.6, '#6b7280')
        bodyGrad.addColorStop(1, '#374151')
        ctx.fillStyle = bodyGrad
        ctx.beginPath()
        ctx.ellipse(ecx + wobble, ecy + 3, w / 2 + 4, h * 0.3, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'
        ctx.lineWidth = 1
        ctx.stroke()

        // Dome (cockpit)
        const domeGrad = ctx.createRadialGradient(ecx + wobble - 2, ecy - 4, 1, ecx + wobble, ecy - 2, w * 0.28)
        domeGrad.addColorStop(0, '#86efac')
        domeGrad.addColorStop(0.5, '#22c55e')
        domeGrad.addColorStop(1, '#15803d')
        ctx.fillStyle = domeGrad
        ctx.beginPath()
        ctx.ellipse(ecx + wobble, ecy - 2, w * 0.28, h * 0.35, 0, Math.PI, 0)
        ctx.fill()

        // Dome shine
        ctx.beginPath()
        ctx.ellipse(ecx + wobble - 3, ecy - 6, 3, 2, -0.3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.fill()

        // Blinking lights on rim
        const lightCount = 4
        for (let i = 0; i < lightCount; i++) {
          const angle = (i / lightCount) * Math.PI + Math.PI
          const lx = ecx + wobble + Math.cos(angle) * (w / 2 + 2)
          const ly = ecy + 3 + Math.sin(angle) * (h * 0.25)
          const blink = Math.sin(frame / 6 + i * 2 + e.x) > 0
          ctx.beginPath()
          ctx.arc(lx, ly, 2, 0, Math.PI * 2)
          ctx.fillStyle = blink ? '#fbbf24' : '#ef4444'
          ctx.fill()
        }

        // Side prongs / weapons
        ctx.fillStyle = '#4b5563'
        ctx.fillRect(ecx + wobble - w / 2 - 6, ecy + 1, 7, 3)
        ctx.fillRect(ecx + wobble + w / 2 - 1, ecy + 1, 7, 3)

        // Red tips on prongs
        ctx.fillStyle = '#ef4444'
        ctx.fillRect(ecx + wobble - w / 2 - 6, ecy + 1, 2, 3)
        ctx.fillRect(ecx + wobble + w / 2 + 4, ecy + 1, 2, 3)
      })

      // Draw player rocket
      drawRocket(ctx, game.playerX, game.playerY, PLAYER_WIDTH, PLAYER_HEIGHT, frame)

      animationId = requestAnimationFrame(gameLoop)
    }

    gameLoop()

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      cancelAnimationFrame(animationId)
    }
  }, [gameState])

  const handleCanvasInteraction = useCallback((clientX: number, rect: DOMRect) => {
    if (gameState === 'idle') {
      startGame()
      return
    }
    if (gameState !== 'playing') return
    const x = (clientX - rect.left) / rect.width * GAME_WIDTH
    gameRef.current.keys.left = x < GAME_WIDTH * 0.35
    gameRef.current.keys.right = x > GAME_WIDTH * 0.65
    gameRef.current.keys.shoot = true
  }, [gameState, startGame])

  return (
    <motion.section
      id="game"
      className="py-24 px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-md mx-auto">
        <h2 className="font-display text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
          $MOONX Galaxy Attack
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Defend the moon! Click the rocket to start. Arrow keys + Space to play.
        </p>

        <div
          className="relative rounded-2xl overflow-hidden mx-auto"
          style={{
            background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.3) 0%, rgba(34, 211, 238, 0.2) 100%)',
            boxShadow: '0 0 40px rgba(124, 58, 237, 0.3)',
            padding: '4px',
          }}
        >
          <canvas
            ref={canvasRef}
            width={GAME_WIDTH}
            height={GAME_HEIGHT}
            className="block w-full rounded-xl bg-space-deeper cursor-pointer"
            style={{ maxWidth: '100%', aspectRatio: `${GAME_WIDTH}/${GAME_HEIGHT}` }}
            onTouchStart={(e) => {
              const touch = e.touches[0]
              const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
              handleCanvasInteraction(touch.clientX, rect)
            }}
            onTouchEnd={() => {
              gameRef.current.keys.left = false
              gameRef.current.keys.right = false
              gameRef.current.keys.shoot = false
            }}
            onClick={(e) => {
              const rect = (e.target as HTMLCanvasElement).getBoundingClientRect()
              handleCanvasInteraction(e.clientX, rect)
            }}
          />

          {/* Idle overlay - click rocket to start */}
          <AnimatePresence>
            {gameState === 'idle' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center rounded-xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.p
                  className="text-cyan-400 font-display font-bold text-lg mb-2"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  TAP THE ROCKET TO LAUNCH
                </motion.p>
                <p className="text-gray-500 text-xs">Arrow keys + Space | Tap to play</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Game over overlay */}
          <AnimatePresence>
            {gameState === 'gameover' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-space-deeper/90 rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-display text-3xl text-red-400 mb-2">GAME OVER</p>
                <p className="font-display text-cyan-400 text-xl mb-1">Score: {score}</p>
                <p className="text-gray-500 text-sm mb-6">High Score: {highScore}</p>
                <motion.button
                  onClick={startGame}
                  className="px-8 py-3 rounded-xl font-display font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  PLAY AGAIN
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* HUD */}
          {gameState === 'playing' && (
            <div className="absolute top-3 left-3 right-3 flex justify-between text-sm pointer-events-none">
              <span className="text-cyan-400 font-display font-bold">SCORE: {score}</span>
              <span className="text-orange-400 font-display font-bold">
                {'❤️'.repeat(Math.max(0, lives))}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
