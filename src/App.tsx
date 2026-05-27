import { useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import PhotoSlideshow from './components/PhotoSlideshow'
import PromiseLetter from './components/PromiseLetter'
import ThingsILove from './components/ThingsILove'
import PromisesForward from './components/PromisesForward'
import FinalSection from './components/FinalSection'
import RosePetals from './components/RosePetals'
import BackgroundMusic, { type BackgroundMusicHandle } from './components/BackgroundMusic'
import Landing from './components/Landing'

export default function App() {
  const [started, setStarted] = useState(false)
  const musicRef = useRef<BackgroundMusicHandle>(null)

  function handleStart() {
    musicRef.current?.play()
    setStarted(true)
  }

  return (
    <main className="relative">
      <RosePetals count={14} />
      <Hero />
      <Timeline />
      <PhotoSlideshow />
      <PromiseLetter />
      <ThingsILove />
      <PromisesForward />
      <FinalSection />
      <BackgroundMusic ref={musicRef} audioSrc={`${import.meta.env.BASE_URL}our-song.mp3`} />

      <AnimatePresence>
        {!started && <Landing key="landing" onStart={handleStart} />}
      </AnimatePresence>
    </main>
  )
}
