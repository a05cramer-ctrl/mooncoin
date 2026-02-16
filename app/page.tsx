'use client'

import { useState } from 'react'
import SpaceBackground from '@/components/SpaceBackground'
import Navbar from '@/components/Navbar'
import PumpTicker from '@/components/PumpTicker'
import Hero from '@/components/Hero'
import RocketImage from '@/components/RocketImage'
import MissionBriefing from '@/components/MissionBriefing'
import Tokenomics from '@/components/Tokenomics'
import CountdownTimer from '@/components/CountdownTimer'
import Roadmap from '@/components/Roadmap'
import GalaxyAttack from '@/components/GalaxyAttack'
import Community from '@/components/Community'
import Footer from '@/components/Footer'
import EasterEgg from '@/components/EasterEgg'

const EASTER_EGG_CLICKS = 7

export default function Home() {
  const [moonClicks, setMoonClicks] = useState(0)
  const [easterEggActive, setEasterEggActive] = useState(false)

  const handleMoonClick = () => {
    const next = moonClicks + 1
    setMoonClicks(next)
    if (next >= EASTER_EGG_CLICKS) {
      setEasterEggActive(true)
      setMoonClicks(0)
    }
  }

  return (
    <>
      <SpaceBackground />
      <Navbar moonClicks={moonClicks} onMoonClick={handleMoonClick} />
      <main>
        <PumpTicker />
        <Hero />
        <section className="px-6 pb-16">
          <div className="max-w-2xl mx-auto">
            <CountdownTimer />
          </div>
        </section>
        <GalaxyAttack />
        <RocketImage />
        <MissionBriefing />
        <Tokenomics />
        <Roadmap />
        <Community />
        <Footer />
      </main>
      <EasterEgg isActive={easterEggActive} onClose={() => setEasterEggActive(false)} />
    </>
  )
}
